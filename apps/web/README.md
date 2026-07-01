# Arjun — Interactive 3D Developer Portfolio

Award-winning interactive portfolio built with Next.js, React Three Fiber, GSAP, and Framer Motion. A cinematic single-page experience showcasing Android development expertise.

## Tech Stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4
- **3D:** React Three Fiber, Three.js, Postprocessing, Spline
- **Animation:** Framer Motion, GSAP, Lenis, Motion One
- **UI:** Shadcn-style components, Lucide Icons
- **Deployment:** GitHub Pages, Firebase Hosting (static export)

## Live Site

**GitHub Pages:** [https://arjudevv.github.io/my-portfolio/](https://arjudevv.github.io/my-portfolio/)

Deployed automatically on every push to `main` via GitHub Actions.

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
| `npm run build` | Production static export to `out/` |
| `npm run lint` | Run ESLint |
| `npm start` | Serve production build (non-static) |

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

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://arjun.dev
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Optional Google Analytics
```

## GitHub Pages Deployment

The site deploys automatically when you push to `main`. The workflow is at `.github/workflows/deploy-github-pages.yml`.

**Live URL:** https://arjudevv.github.io/my-portfolio/

To build locally for GitHub Pages:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://arjudevv.github.io/my-portfolio npm run build
```

## Firebase Hosting Deployment

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```
   - Public directory: `out`
   - Single-page app: Yes
   - Overwrite `firebase.json`: No (already configured)

3. Update `.firebaserc` with your Firebase project ID.

4. Build and deploy:
   ```bash
   npm run build
   firebase deploy
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
