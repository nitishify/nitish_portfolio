/**
 * POST /api/chat — streams an AI answer about Nitish as plain text.
 *
 * Runs as a Vercel Function (Node.js runtime). API keys stay on the server — set them in
 * Vercel → Project → Settings → Environment Variables:
 *
 *   GEMINI_API_KEY     Free key from aistudio.google.com (default provider, free tier)
 *   GEMINI_MODEL       Optional, default gemini-3.8-flash
 *   ANTHROPIC_API_KEY  Optional paid backup (Claude), used if Gemini fails or hits its free limit
 *   CHAT_MODEL         Optional Claude model, default claude-haiku-5-5
 *   CHAT_PROVIDER      Optional: "gemini" or "claude" to force one provider
 */
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { buildSystemPrompt } from './_lib/knowledge.js';

// Free-tier models, tried in order: a busy (503) or missing model falls through to the next one.
// Flash-Lite first: it's fast, less often overloaded, and plenty for questions about a profile.
const GEMINI_MODELS = [
  ...new Set([process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-3.6-flash']),
];
const CLAUDE_MODEL = process.env.CHAT_MODEL || 'claude-haiku-5-5';

const MAX_TURNS = 12; // messages of history sent to the model
const MAX_CHARS = 1000; // per visitor message
const MAX_OUTPUT_TOKENS = 1024; // answers are meant to be short
const RATE_LIMIT = 15; // messages per IP per window
const RATE_WINDOW_MS = 10 * 60 * 1000;

const SYSTEM = buildSystemPrompt();

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type Provider = (messages: ChatMessage[], signal: AbortSignal) => AsyncGenerator<string>;

// ---------- Providers ----------

/** Google Gemini (free tier). Tries the main model, then a lighter one if it's unavailable. */
const gemini: Provider = async function* (messages, signal) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const contents = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  let lastError: unknown;
  for (const model of GEMINI_MODELS) {
    let started = false;
    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM,
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
          abortSignal: signal,
        },
      });
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          started = true;
          yield text;
        }
      }
      return;
    } catch (err) {
      if (started) throw err; // can't switch models halfway through an answer
      lastError = err;
      console.warn(`gemini ${model} failed:`, (err as Error).message);
    }
  }
  throw lastError;
};

/** Anthropic Claude (paid backup). */
const claude: Provider = async function* (messages, signal) {
  const client = new Anthropic();
  const stream = client.messages.stream(
    {
      model: CLAUDE_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      output_config: { effort: 'low' }, // quick, conversational replies
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages,
    },
    { signal },
  );
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') yield event.delta.text;
  }
  const final = await stream.finalMessage();
  if (final.stop_reason === 'refusal') {
    yield "Sorry, I can't help with that. Ask me about Nitish's experience, projects or skills.";
  }
};

function providers(): Provider[] {
  const available: [string, Provider][] = [];
  if (process.env.GEMINI_API_KEY) available.push(['gemini', gemini]);
  if (process.env.ANTHROPIC_API_KEY) available.push(['claude', claude]);
  const forced = process.env.CHAT_PROVIDER?.toLowerCase();
  if (forced) available.sort(([a], [b]) => Number(b === forced) - Number(a === forced));
  return available.map(([, p]) => p);
}

// ---------- Request handling ----------

// Best-effort, per-instance limiter. It resets when the function cold-starts.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const out: ChatMessage[] = [];
  for (const m of (body as { messages: unknown[] }).messages) {
    if (!m || typeof m !== 'object') return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const text = content.trim();
    if (!text) continue;
    out.push({ role, content: text.slice(0, role === 'user' ? MAX_CHARS : 4000) });
  }
  const trimmed = out.slice(-MAX_TURNS);
  while (trimmed.length && trimmed[0].role !== 'user') trimmed.shift();
  if (!trimmed.length || trimmed[trimmed.length - 1].role !== 'user') return null;
  return trimmed;
}

const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), { status, headers: { 'content-type': 'application/json' } });

export async function POST(request: Request): Promise<Response> {
  const chain = providers();
  if (!chain.length) return json(503, 'The assistant is not configured yet.');

  // Only accept calls from this site's own pages.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return json(403, 'Forbidden');

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return json(429, 'Too many messages. Please try again in a few minutes.');

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    /* falls through to 400 */
  }
  if (!messages) return json(400, 'Invalid request.');
  const history = messages;

  const abort = new AbortController();
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sent = false;
      for (const provider of chain) {
        try {
          for await (const text of provider(history, abort.signal)) {
            sent = true;
            controller.enqueue(encoder.encode(text));
          }
          break;
        } catch (err) {
          console.error('chat provider failed:', err instanceof Error ? err.message : err);
          if (sent || abort.signal.aborted) break; // don't start a second answer mid-way
        }
      }
      if (!sent && !abort.signal.aborted) {
        controller.enqueue(encoder.encode('Sorry, the assistant is busy right now. Please try again in a minute, or use the contact form below.'));
      }
      controller.close();
    },
    cancel() {
      abort.abort();
    },
  });

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}
