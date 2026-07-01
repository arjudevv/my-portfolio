# Arjun — Interactive 3D Developer Portfolio

Award-winning interactive portfolio built with Next.js, React Three Fiber, GSAP, and Framer Motion. A cinematic single-page experience showcasing Android development expertise.

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4
- **3D:** React Three Fiber, Three.js, Postprocessing, Spline
- **Animation:** Framer Motion, GSAP, Lenis, Motion One
- **UI:** Shadcn-style components, Lucide Icons
- **Deployment:** Vercel

## Getting Started

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm start` | Serve production build |

## Vercel Deployment

This app lives in a monorepo. In [Vercel project settings](https://vercel.com/dashboard), set **Root Directory** to `apps/web`.

Pushes to `main` deploy automatically.

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Optional Google Analytics
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── animations/       # GSAP scroll choreography
├── components/
│   ├── sections/     # Portfolio sections (Hero, About, etc.)
│   ├── ui/           # Reusable UI primitives
│   ├── loading/      # Intro loader
│   ├── cursor/       # Custom cursor
│   └── providers/    # Lenis, Sound, App providers
├── content/          # Site copy, projects, skills data
├── three/            # R3F scene manager & 3D content
├── hooks/            # Custom React hooks
├── lib/              # Utilities
└── types/            # TypeScript interfaces
```

## Performance Notes

- Single WebGL canvas with scroll-driven scene states
- Dynamic imports for 3D components and Spline
- Mobile quality tiers via `PolishContext`
- `prefers-reduced-motion` disables Lenis, loader, cursor, and heavy postprocessing
- Images use SVG placeholders; replace with optimized WebP/AVIF for production

## Credits

- Design inspiration: Awwwards, Linear, Stripe, Bruno Simon
- Fonts: Space Grotesk, Inter (Google Fonts)
- 3D: React Three Fiber ecosystem, Spline

## License

See repository LICENSE file.
