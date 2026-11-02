import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, Check, Copy, Loader2, Mail, MessageSquareText, Phone, Send } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { useState, type FormEvent } from 'react';
import { profile } from '../../data/profile';
import { Lottie } from '../ui/Lottie';
import { Reveal } from '../ui/Reveal';
import { SideArt } from '../ui/SideArt';
import { SectionHeading } from '../ui/SectionHeading';
import './Contact.css';

const LINKS = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { icon: FaLinkedinIn, label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { icon: FaGithub, label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get('name') ?? '').trim();
    const email = String(f.get('email') ?? '').trim();
    const company = String(f.get('company') ?? '').trim();
    const message = String(f.get('message') ?? '').trim();
    const subject = `Opportunity for ${profile.firstName}${company ? ` — ${company}` : ''}`;

    // No key configured yet: open the visitor's email app instead.
    if (!profile.web3formsKey) {
      const body = `${message}\n\n— ${name}${company ? `, ${company}` : ''}${email ? `\n${email}` : ''}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    // Web3Forms renders every non-reserved key as a labelled row, in this order.
    const receivedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short',
    });
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `🚀 New message from ${name}${company ? ` (${company})` : ''} — ${profile.brand}`,
          from_name: `${profile.brand} · Portfolio`,
          replyto: email,
          '👤 Name': name,
          '📧 Email': email,
          '🏢 Company': company || '—',
          '💬 Message': message,
          '🕒 Received': `${receivedAt} IST`,
          '🌐 Sent from': window.location.origin,
          botcheck: f.get('botcheck') ? true : '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section" id="contact">
      <SideArt left="radar" right="plane" />
      <div className="container">
        <div className="contact glass">
          <div className="contact-bg" aria-hidden>
            <span className="cb1" />
            <span className="cb2" />
          </div>

          <SectionHeading
            icon={MessageSquareText}
            eyebrow="Contact"
            title="Let's Build Something"
            highlight="Great Together"
            sub="Open to Full Stack, Python and Backend Developer roles — remote, hybrid or on-site. I usually reply within a day."
            lottie="robot-hi"
          />

          <div className="contact-grid">
            <Reveal className="c-links">
              {LINKS.map(({ icon: Icon, label, value, href, external }) => (
                <a key={label} className="c-link" href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                  <span className="c-ico"><Icon size={20} /></span>
                  <span className="c-txt"><small>{label}</small><b>{value}</b></span>
                  <ArrowUpRight size={18} className="c-arrow" />
                </a>
              ))}
              <button className="copy-btn" onClick={copy} type="button">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <Check size={16} /> Email copied!
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <Copy size={16} /> Copy email address
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Reveal>

            <Reveal delay={0.1}>
              <form className="c-form" onSubmit={submit} onChange={() => status !== 'sending' && status !== 'idle' && setStatus('idle')}>
                <div className="row2">
                  <label className="field"><span>Your name</span><input name="name" required placeholder="Jane from Acme" /></label>
                  <label className="field"><span>Your email</span><input name="email" type="email" required={!!profile.web3formsKey} placeholder="jane@acme.com" /></label>
                </div>
                <label className="field"><span>Company</span><input name="company" placeholder="Acme Inc." /></label>
                <label className="field"><span>Message</span><textarea name="message" rows={5} required placeholder="Hi Nitish, we're hiring a Full Stack Developer…" /></label>
                {/* Spam trap: hidden from people, bots tick it */}
                <input type="checkbox" name="botcheck" className="botcheck" tabIndex={-1} autoComplete="off" aria-hidden />
                <div className="form-foot">
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? <><Loader2 className="spin" /> Sending…</> : <><Send /> Send Message</>}
                  </button>
                  <AnimatePresence>
                    {status === 'sent' && (
                      <motion.span className="form-msg ok" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                        <Lottie name="success" loop={false} className="form-check" /> Thanks! Your message is on its way.
                      </motion.span>
                    )}
                    {status === 'error' && (
                      <motion.span className="form-msg err" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                        <AlertCircle size={18} /> Couldn't send — please email me directly.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
