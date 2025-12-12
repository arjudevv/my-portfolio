# Quick Start: Deploy to arjunraju.in

## Fastest Method (5 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

### 2. Deploy on Vercel
1. Go to https://vercel.com and sign up (free)
2. Click "Add New Project"
3. Import your GitHub repository
4. **CRITICAL**: Before deploying, click "Configure Project" or go to Settings → General
5. Set **Root Directory** to `apps/web` and click "Save"
6. Click "Deploy"

### 3. Add Your Domain
1. In Vercel project → Settings → Domains
2. Add `arjunraju.in` and `www.arjunraju.in`
3. Copy the DNS records shown

### 4. Update GoDaddy DNS
1. Login to GoDaddy → My Products → DNS
2. Add the DNS records from Vercel (usually A and CNAME records)
3. Wait 5-30 minutes for DNS to propagate

### 5. Done! 🎉
Your site will be live at https://arjunraju.in

---

**Note**: Vercel automatically handles:
- ✅ SSL certificates (HTTPS)
- ✅ CDN (fast global delivery)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

