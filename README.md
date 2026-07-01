# Arjun — Developer Portfolio

Interactive 3D portfolio built with Next.js, React Three Fiber, GSAP, and Framer Motion.

## Live Site

**https://arjudevv.github.io/my-portfolio/**

> If the link shows a 404, complete the one-time GitHub Pages setup below (takes ~30 seconds).

## Enable GitHub Pages (one-time)

GitHub Pages must be enabled once before the deploy workflow can publish the site.

1. Open **[Repository Settings → Pages](https://github.com/arjudevv/my-portfolio/settings/pages)**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Save (no branch selection needed — the workflow handles deployment)

If GitHub Actions source is unavailable, use the fallback:

1. Set **Source** to **Deploy from a branch**
2. Branch: `gh-pages`, folder: `/ (root)`

The site will be live at **https://arjudevv.github.io/my-portfolio/** within 1–2 minutes.

## Vercel

Vercel is connected to this repo. The root `vercel.json` configures the monorepo to build from `apps/web`.

If Vercel builds still fail, verify in [Vercel Project Settings](https://vercel.com/dashboard):

- **Root Directory:** `apps/web` (or leave blank to use root `vercel.json`)
- **Framework:** Next.js
- **Output Directory:** `out` (static export)

## Development

```bash
cd apps/web
npm install
npm run dev
```

See [apps/web/README.md](apps/web/README.md) for full documentation.

## Deployment

- **GitHub Pages** — automatic on push to `main` (`.github/workflows/deploy-github-pages.yml`)
- **Firebase Hosting** — optional; see `apps/web/README.md`
