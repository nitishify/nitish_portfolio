// Prints resume/resume.html to public/resume.pdf using a locally installed Chrome or Edge.
// Usage: npm run resume
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const input = resolve(here, 'resume.html');
const output = resolve(here, '..', 'public', 'resume.pdf');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const browser = candidates.find(p => existsSync(p));
if (!browser) {
  console.error('No Chrome/Edge found. Set CHROME_PATH to your browser executable.');
  process.exit(1);
}

// A throwaway profile keeps the run isolated from your normal browser session.
const profile = mkdtempSync(join(tmpdir(), 'resume-'));
try {
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=6000', // let web fonts load
    `--print-to-pdf=${output}`,
    pathToFileURL(input).href,
  ], { stdio: 'inherit' });
} finally {
  rmSync(profile, { recursive: true, force: true });
}
console.log(`Resume written to ${output}`);
