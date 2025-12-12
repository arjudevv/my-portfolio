# Deployment Guide for arjunraju.in

This guide will help you deploy your portfolio to your custom domain `arjunraju.in`.

## Option 1: Deploy with Vercel (Recommended for Next.js)

Vercel is the easiest and most optimized platform for Next.js applications.

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub, GitLab, or Bitbucket
2. If not already done, initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login (free account works)
2. Click "Add New Project"
3. Import your repository
4. **CRITICAL STEP**: Before clicking "Deploy", you MUST set the Root Directory:
   - Click "Configure Project" or the "..." menu → "Settings"
   - Scroll to "Root Directory" section
   - Click "Edit" 
   - Enter: `apps/web`
   - Click "Save"
5. Vercel will auto-detect Next.js and configure everything automatically:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (runs from apps/web directory)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (runs from apps/web directory)
6. Click "Deploy"

**Important**: If you don't set the Root Directory to `apps/web`, the build will fail with "No such file or directory" error. This is the most common issue with monorepo deployments.

### Step 3: Add Custom Domain

1. After deployment, go to your project settings
2. Navigate to "Domains" section
3. Click "Add Domain"
4. Enter `arjunraju.in` and `www.arjunraju.in`
5. Vercel will provide DNS records to configure

### Step 4: Configure DNS in GoDaddy

1. Log in to your GoDaddy account
2. Go to "My Products" → "DNS" for your domain
3. Add/Update the following DNS records:

   **For root domain (arjunraju.in):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)
   - TTL: 600

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com` (or the CNAME provided by Vercel)
   - TTL: 600

   **Alternative (easier):**
   - Vercel provides specific DNS records in the domain settings
   - Copy the exact records from Vercel and add them to GoDaddy

4. Wait 24-48 hours for DNS propagation (usually much faster, often within minutes)

### Step 5: SSL Certificate

- Vercel automatically provisions SSL certificates via Let's Encrypt
- Your site will be available at `https://arjunraju.in` automatically

### Step 6: Automatic Deployments (Already Enabled!)

**Good news**: Automatic deployments are **already enabled by default** when you connect a Git repository to Vercel! 🎉

#### How It Works

1. **Automatic Production Deployments**
   - Every push to your `main` (or `master`) branch automatically triggers a new production deployment
   - Vercel builds and deploys your site automatically
   - Your live site at `arjunraju.in` updates within 1-2 minutes

2. **Preview Deployments**
   - Every push to other branches creates a preview deployment
   - You get a unique URL for each branch/PR to test changes
   - Perfect for testing before merging to main

3. **Pull Request Deployments**
   - Every pull request gets its own preview deployment
   - Share the preview URL with team members for review
   - Comments and feedback can be added directly on the preview

#### Verify Automatic Deployments Are Enabled

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Git**
3. You should see your connected repository listed
4. Under "Production Branch", ensure it's set to `main` (or your default branch)
5. The "Automatic deployments" toggle should be **ON** (this is the default)

#### Configure Deployment Settings (Optional)

You can customize deployment behavior in **Settings** → **Git**:

- **Production Branch**: Which branch deploys to production (default: `main`)
- **Automatic deployments**: Toggle automatic deployments on/off
- **Ignore Build Step**: Skip builds for certain commits (useful for docs-only changes)
- **Deploy Hooks**: Create webhooks for external integrations

#### Test Automatic Deployment

To test that automatic deployments work:

```bash
# Make a small change to your code
echo "<!-- Test deployment -->" >> apps/web/src/app/page.tsx

# Commit and push
git add .
git commit -m "Test automatic deployment"
git push
```

Within 1-2 minutes, you should see:
1. A new deployment appear in your Vercel dashboard
2. The deployment status (Building → Ready)
3. Your live site updated with the changes

#### Deployment Notifications

Vercel can notify you about deployments via:
- **Email**: Automatic email notifications for deployment status
- **Slack**: Connect your Slack workspace in Settings → Integrations
- **GitHub**: Deployment status appears as checks on your commits/PRs

#### View Deployment History

- Go to your project dashboard
- Click on the **Deployments** tab
- See all deployments with:
  - Commit message and author
  - Build time and status
  - Preview URLs for branch deployments
  - Ability to redeploy or rollback

---

## Option 2: Deploy with Netlify

### Step 1: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your repository
4. Configure build settings:
   - **Base directory**: `apps/web`
   - **Build command**: `npm run build`
   - **Publish directory**: `apps/web/.next`
   - **Install command**: `cd apps/web && npm install`

### Step 2: Add Custom Domain

1. Go to Site settings → Domain management
2. Add custom domain: `arjunraju.in`
3. Follow Netlify's DNS configuration instructions

### Step 3: Configure DNS in GoDaddy

Add the DNS records provided by Netlify (usually A or CNAME records)

---

## Option 3: Self-Hosting (VPS/Cloud Server)

If you prefer to host on your own server:

### Requirements
- VPS (DigitalOcean, AWS EC2, Linode, etc.)
- Node.js 18+ installed
- PM2 or similar process manager
- Nginx as reverse proxy

### Steps

1. **Build the application:**
   ```bash
   cd apps/web
   npm install
   npm run build
   ```

2. **Run with PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx:**
   Create `/etc/nginx/sites-available/arjunraju.in`:
   ```nginx
   server {
       listen 80;
       server_name arjunraju.in www.arjunraju.in;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d arjunraju.in -d www.arjunraju.in
   ```

5. **Configure DNS in GoDaddy:**
   - Add A record pointing to your server's IP address

---

## Recommended: Vercel

For a Next.js portfolio, **Vercel is highly recommended** because:
- ✅ Zero configuration needed
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Free tier is generous
- ✅ Optimized for Next.js performance
- ✅ Easy custom domain setup

---

## Troubleshooting

### DNS Not Working
- Wait 24-48 hours for DNS propagation
- Use `dig arjunraju.in` or `nslookup arjunraju.in` to check DNS
- Clear your DNS cache: `sudo dscacheutil -flushcache` (macOS)

### SSL Certificate Issues
- Vercel/Netlify handle this automatically
- For self-hosting, ensure port 80 is open for Let's Encrypt verification

### Build Errors

#### "No such file or directory" Error
If you see `cd: apps/web: No such file or directory`:

1. **Verify your GitHub repository structure:**
   - Check that your repo has the `apps/web` directory
   - Make sure you've pushed all files: `git add . && git commit -m "..." && git push`

2. **Set Root Directory in Vercel (RECOMMENDED):**
   - Go to your Vercel project → Settings → General
   - Find "Root Directory" section
   - Click "Edit" and set it to `apps/web`
   - Save and redeploy
   - This tells Vercel to treat `apps/web` as the project root

3. **Alternative: Update vercel.json**
   - If your repo structure is different, update `vercel.json` paths accordingly
   - Or remove `vercel.json` and configure everything in Vercel UI

#### Other Build Errors
- Check that all dependencies are in `package.json`
- Ensure Node.js version matches (check `.nvmrc` or `package.json` engines)
- Review build logs in deployment platform

---

## Next Steps After Deployment

1. Test your site at `https://arjunraju.in`
2. Set up automatic deployments (Vercel/Netlify do this automatically)
3. Configure environment variables if needed
4. Set up monitoring/analytics
5. Test on mobile devices
6. Submit to search engines (Google Search Console)

