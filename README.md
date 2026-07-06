# Navigation Demo App

A Next.js App Router + TypeScript + Tailwind CSS demo application showcasing different navigation patterns with interactive comparison modes.

## Features

- **4 Navigation Patterns** — Multiple design approaches (Pattern A, B, C, D)
- **Three View Modes**:
  - **Overview** — Thumbnail grid of all patterns
  - **Single View** — Full interactive view of one pattern with body content
  - **Compare** — Side-by-side comparison of any two patterns
- **Responsive Design** — Mobile-first layout with Tailwind CSS
- **Placeholder Components** — Ready for design integration from Figma

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app supports hot reload.

## Project Structure

```
.
├── app/
│   └── page.tsx                 # Main entry point with mode switcher
├── components/
│   ├── navs/
│   │   ├── pattern-a/
│   │   ├── pattern-b/
│   │   ├── pattern-c/
│   │   └── pattern-d/           # Navigation pattern components
│   ├── body/
│   │   └── GridBody.tsx         # Shared responsive card grid
│   └── modes/
│       ├── Overview.tsx         # Thumbnail gallery view
│       ├── SingleView.tsx       # Single pattern + body
│       └── CompareView.tsx      # Side-by-side comparison
├── lib/
│   └── navPatterns.ts           # Navigation patterns config
└── vercel.json                  # Vercel deployment config
```

## Navigation Patterns

Each pattern is a separate component in `components/navs/pattern-{a,b,c,d}/`:

- **Pattern A** — Horizontal top navigation with dropdown menus
- **Pattern B** — Vertical sidebar navigation
- **Pattern C** — Tab-based navigation
- **Pattern D** — Bottom navigation with icons

Patterns currently render as placeholders. Replace components with designs from Figma as they're ready.

## Body Content

`GridBody.tsx` provides a responsive 3-column card grid (1 column on mobile, 2 on tablet). This component is shared across all patterns so navigation is the only variable.

## Deployment

### Vercel (Recommended)

1. Create a new repository on GitHub named `navigation-demo-app`
2. Push this branch: `git push -u origin main`
3. Import the repository in Vercel Dashboard
4. Deploy — Vercel auto-detects Next.js and builds with optimal settings

```bash
git remote add origin https://github.com/<your-username>/navigation-demo-app.git
git push -u origin main
```

### Manual Build

```bash
npm run build
npm run start
```

Production build runs on port 3000 by default.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
