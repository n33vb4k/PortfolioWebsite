# Portfolio Website

A single-page portfolio site built with React, TypeScript, Vite, and Tailwind CSS. Features a WebGL aurora background, animated spotlight cards, scroll-triggered reveal animations, and a GSAP-powered staggered project grid.

**Live:** Deployed on Vercel

## Tech Stack

- **React 18** + **TypeScript** — component-driven UI with full type safety
- **Vite** — fast dev server with HMR and optimised production builds
- **Tailwind CSS** — utility-first styling with a custom Discord-style gray palette and dark mode (`class` strategy)
- **GSAP / ScrollTrigger** — scroll-triggered fade and slide animations on the Projects page
- **Motion (Framer Motion v11)** — per-word blur-in text and shimmer animations on the Home hero
- **OGL** — WebGL aurora background effect
- **Formspree** — serverless contact form submission
- **Vercel Analytics** — page-view tracking

## Sections

| Section | Description |
|---------|-------------|
| **Home** | Hero with WebGL aurora background, blur-in heading, shiny subtitle, skills chips, and a magnetic CTA button |
| **Projects** | Featured project card + 3-column grid of project cards — each wrapped in a SpotlightCard with mouse-tracked glow, and staggered scroll-reveal via GSAP AnimatedContent |
| **Contact** | Contact form (Formspree) and social links in SpotlightCards |

## ReactBits UI Components

Copy-paste components from [reactbits.dev](https://reactbits.dev) living in `src/components/ui/`:

| Component | Purpose |
|-----------|---------|
| `Aurora` | WebGL aurora background (OGL) |
| `BlurText` | Per-word blur-in animation (Motion) |
| `ShinyText` | Shimmer gradient text (Motion) |
| `Magnet` | Magnetic hover-pull effect (vanilla React) |
| `SpotlightCard` | Mouse-tracked spotlight glow card |
| `AnimatedContent` | Scroll-triggered slide + fade entrance (GSAP) |
| `FadeContent` | Scroll-triggered fade (+ optional blur) entrance (GSAP) |
| `SplashCursor` | WebGL fluid cursor trail (present but unused) |

## Getting Started

```bash
cd portfoliosite
npm install
npm run dev        # start dev server with HMR
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check with `tsc`, then build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |
| `vercel` | Deploy preview to Vercel |
| `vercel --prod` | Deploy to production |

## Project Structure

```
portfoliosite/
├── public/images/         # Static project images
├── src/
│   ├── components/
│   │   ├── ProjectCard.tsx    # Card wrapping SpotlightCard
│   │   ├── SideBar.tsx        # Fixed left nav with smooth-scroll + theme toggle
│   │   └── ui/                # ReactBits components (copy-paste, not npm)
│   ├── pages/
│   │   ├── Home.tsx           # Hero section
│   │   ├── Projects.tsx       # Project grid (data inline)
│   │   ├── Contact.tsx        # Form + social links
│   │   └── Links.tsx          # (unused)
│   ├── App.tsx                # Root — ref-based scrolling, no React Router
│   ├── index.css              # Tailwind layers + reusable component classes
│   └── main.tsx               # Entry point
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Navigation

No React Router — navigation uses `useRef` + `scrollIntoView({ behavior: 'smooth' })`. To add a new section:

1. Create a page component in `src/pages/`
2. Add a `useRef` + case in `App.tsx`
3. Add an icon + click handler in `SideBar.tsx`
