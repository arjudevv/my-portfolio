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
4. **CRITICAL**: Before clicking "Deploy":
   - Click "Configure Project" (or "..." menu → "Settings")
   - Find "Root Directory" section
   - Click "Edit" and enter: `apps/web`
   - Click "Save"
5. Click "Deploy"

**⚠️ If you skip step 4, the build will fail!**

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
- ✅ **Automatic deployments on every git push** (no manual steps needed!)
- ✅ Preview deployments for pull requests

**After initial setup, just push to GitHub and your site updates automatically!**

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
For automatic deployment workflow, see [AUTOMATIC_DEPLOYMENTS.md](./AUTOMATIC_DEPLOYMENTS.md)

