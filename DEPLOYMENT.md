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
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `apps/web` (since this is a monorepo)
   - **Build Command**: `cd apps/web && npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `cd apps/web && npm install`
5. Click "Deploy"

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

