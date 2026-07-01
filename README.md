# Arjun — Developer Portfolio

Interactive 3D portfolio built with Next.js, React Three Fiber, GSAP, and Framer Motion.

## Live Site

**https://arjudevv.github.io/my-portfolio/**

> If the link shows a 404, complete the one-time GitHub Pages setup below (takes ~30 seconds).

## Enable GitHub Pages (one-time)

The site is built and deployed automatically to the `gh-pages` branch on every push to `main`. To make it publicly accessible:

1. Open **[Repository Settings → Pages](https://github.com/arjudevv/my-portfolio/settings/pages)**
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**
3. Set **Branch** to `gh-pages` and folder to `/ (root)`
4. Click **Save**

GitHub will publish the site within 1–2 minutes at the URL above.

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
