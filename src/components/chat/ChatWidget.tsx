import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, RotateCcw, Sparkles, X } from 'lucide-react';
import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { profile } from '../../data/profile';
import './Chat.css';

type Msg = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'What does Nitish work on right now?',
  'Tell me about Ringopus',
  'What is his AWS experience?',
  'Is he open to new roles?',
];

const GREETING = `Hi! I'm an AI assistant that knows about ${profile.firstName}'s experience, projects and skills. What would you like to know?`;

/** Renders the small subset of markdown the assistant uses: **bold**, bullet lines and links. */
function inline(raw: string): ReactNode[] {
  const text = raw.replace(/`([^`]+)`/g, '$1'); // the model sometimes wraps paths in code ticks
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|\/projects\/[\w-]+|\/resume\.pdf)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,]+$/, '');
      return (
        <Fragment key={i}>
          <a href={href} target="_blank" rel="noreferrer">{href}</a>
          {part.slice(href.length)}
        </Fragment>
      );
    }
    if (/^\/(projects\/[\w-]+|resume\.pdf)$/.test(part)) {
      return <a key={i} href={part} {...(part.endsWith('.pdf') ? { target: '_blank', rel: 'noreferrer' } : {})}>{part}</a>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Rich({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={`ul${blocks.length}`}>{list.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>);
    list = [];
  };
  for (const line of text.split('\n')) {
    const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (bullet) {
      list.push(bullet[1]);
    } else {
      flush();
      if (line.trim()) blocks.push(<p key={`p${blocks.length}`}>{inline(line)}</p>);
    }
  }
  flush();
  return <>{blocks}</>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const history: Msg[] = [...messages, { role: 'user', content: question }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const setReply = (content: string) =>
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReply(data?.error ?? 'Sorry, the assistant is unavailable right now. Please use the contact form below.');
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
      if (!reply.trim()) setReply('Sorry, I could not answer that. Please try asking another way.');
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setReply('Sorry, I could not connect. Please check your internet and try again.');
      }
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setBusy(false);
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="chat-launcher"
            onClick={() => setOpen(true)}
            aria-label={`Ask AI about ${profile.firstName}`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ y: -3 }}
          >
            <Sparkles size={18} />
            <span>Ask AI about me</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            className="chat-panel"
            role="dialog"
            aria-label={`Chat with an AI assistant about ${profile.firstName}`}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <header className="chat-head">
              <img src={profile.photo} alt="" className="chat-avatar" />
              <div className="chat-title">
                <b>Ask about {profile.firstName}</b>
                <span><i className="chat-dot" /> AI assistant · answers from his portfolio</span>
              </div>
              {messages.length > 0 && (
                <button className="chat-icon" onClick={reset} aria-label="Start a new chat" title="New chat">
                  <RotateCcw size={16} />
                </button>
              )}
              <button className="chat-icon" onClick={() => setOpen(false)} aria-label="Close chat" title="Close">
                <X size={18} />
              </button>
            </header>

            <div className="chat-body" ref={listRef} aria-live="polite">
              <div className="chat-msg bot"><Rich text={GREETING} /></div>
              {messages.length === 0 && (
                <div className="chat-suggest">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)}>{s}</button>
                  ))}
                </div>
              )}
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i} className="chat-msg me">{m.content}</div>
                ) : (
                  <div key={i} className="chat-msg bot">
                    {m.content ? <Rich text={m.content} /> : <span className="chat-typing" aria-label="Typing"><i /><i /><i /></span>}
                  </div>
                ),
              )}
            </div>

            <form className="chat-form" onSubmit={onSubmit}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about projects, skills, experience…"
                rows={1}
                maxLength={1000}
                aria-label="Your question"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
                <ArrowUp size={18} />
              </button>
            </form>
            <p className="chat-note">AI can make mistakes. For anything important, contact {profile.firstName} directly.</p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
