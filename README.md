# Nitish Raj — Portfolio

Personal portfolio of **Nitish Raj**, Full Stack Developer (Python · Django · FastAPI · React · AWS).

Built with **React 18 + TypeScript + Vite**, animated with **Framer Motion**, icons from **Lucide** and **react-icons** (official brand logos).

## Features

- Intro preloader with an animated **NR** monogram
- Hero with an interactive particle network, aurora gradients, a cursor spotlight and an **orbit of tech logos** whose core morphs between technologies
- Live "typing" FastAPI code card and a deploy-status card floating around the orbit
- Letter-by-letter name reveal, typewriter roles, magnetic buttons and count-up stats
- About section with a 3D-tilt photo card and floating badges
- Filterable project cards with animated covers and a case-study modal (architecture flow, highlights, stack)
- Experience timeline that fills as you scroll
- Skill cards with brand logos and proficiency bars
- Contact links, one-click copy email and a message form that opens the visitor's mail app
- Dark / light theme (remembered), scroll progress bar, back-to-top progress ring, cursor glow
- Fully responsive, respects `prefers-reduced-motion`, SEO meta + JSON-LD

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

## Editing content

All text lives in `src/data/` — no component changes needed:

| File | What it holds |
| --- | --- |
| `src/data/profile.ts` | Name, roles, contact links, stats, education |
| `src/data/experience.ts` | Jobs and bullet points |
| `src/data/projects.ts` | Projects, filters, architecture flows |
| `src/data/tech.tsx` | Tech logos/colours, hero orbit order, skill groups |

### Lottie animations

Animations live in `public/lottie/` as `.lottie` files (free assets from [LottieFiles](https://lottiefiles.com)) and play through `src/components/ui/Lottie.tsx`, which loads the player only when an animation nears the viewport:

```tsx
<Lottie name="rocket" className="f-rocket" />          // any file in public/lottie
<SectionHeading ... lottie="dev-skills" />              // illustration beside a section title
```

To add one: download the **dotLottie** file from LottieFiles, drop it in `public/lottie/`, and reference it by name.

Static files go in `public/`:

- `public/photo.jpg` — your portrait (4:5, at least 800×1000)
- `public/resume.pdf` — your résumé (used by every "Download" button)

### Résumé

The résumé is written in `resume/resume.html` (one-page, ATS-friendly). After editing it, regenerate the PDF:

```bash
npm run resume     # prints resume/resume.html → public/resume.pdf with headless Chrome/Edge
```

## Project structure

```
src/
├── App.tsx                 # page composition
├── main.tsx                # entry
├── data/                   # all content
├── hooks/                  # useTheme, useTypewriter
├── styles/global.css       # design tokens, buttons, utilities
└── components/
    ├── hero/               # Hero, TechOrbit, CodeCard, ParticleField
    ├── layout/             # Navbar, Preloader, Footer, CursorGlow, BackToTop
    ├── sections/           # About, Projects, ProjectModal, Experience, Skills, Education, Contact
    └── ui/                 # Reveal, CountUp, Magnetic, SectionHeading, TechIcon
```

## Deploy (free)

**Vercel** — import the GitHub repo at vercel.com → framework *Vite* → Deploy.

**Netlify** — build command `npm run build`, publish directory `dist`.
