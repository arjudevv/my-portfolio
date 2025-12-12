# Automatic Deployment Workflow

## How Automatic Deployments Work

When you connect your GitHub repository to Vercel, **automatic deployments are enabled by default**. Here's how it works:

### Production Deployments (Main Branch)

```bash
# 1. Make changes to your code
# 2. Commit and push to main branch
git add .
git commit -m "Update portfolio design"
git push origin main

# 3. Vercel automatically:
#    - Detects the push
#    - Builds your Next.js app
#    - Deploys to production
#    - Updates your live site at arjunraju.in
```

**Result**: Your live site updates automatically within 1-2 minutes! 🚀

### Preview Deployments (Other Branches)

```bash
# 1. Create a feature branch
git checkout -b feature/new-section

# 2. Make changes and push
git add .
git commit -m "Add new projects section"
git push origin feature/new-section

# 3. Vercel automatically:
#    - Creates a preview deployment
#    - Gives you a unique URL like: https://portfolio-abc123.vercel.app
#    - You can test changes before merging
```

**Result**: Get a preview URL to test changes without affecting production!

### Pull Request Deployments

1. Create a pull request on GitHub
2. Vercel automatically creates a preview deployment
3. The preview URL appears as a comment on your PR
4. Reviewers can test the changes
5. When you merge, it automatically deploys to production

## Verify Your Setup

1. **Check Vercel Dashboard**:
   - Go to your project → Settings → Git
   - Verify your repository is connected
   - Check that "Automatic deployments" is ON

2. **Test It**:
   ```bash
   # Make a small change
   echo "<!-- Test -->" >> apps/web/src/app/page.tsx
   git add . && git commit -m "Test auto-deploy" && git push
   ```
   
   Watch your Vercel dashboard - you should see a new deployment start automatically!

## Deployment Status

Check deployment status:
- **Vercel Dashboard**: See all deployments with build logs
- **GitHub**: Deployment status appears as checks on commits
- **Email**: Get notified when deployments complete

## Common Workflows

### Daily Development
```bash
# Work on feature branch
git checkout -b feature/update-about
# ... make changes ...
git push origin feature/update-about
# Get preview URL, test it, then merge to main
```

### Quick Fixes
```bash
# Fix directly on main (for urgent fixes)
git checkout main
# ... fix the issue ...
git commit -m "Fix: resolve build error"
git push origin main
# Site updates automatically in 1-2 minutes
```

### Scheduled Updates
- Push to main anytime
- Vercel handles the rest automatically
- No manual deployment needed!

## Troubleshooting

### Deployments Not Triggering?

1. **Check Git Connection**:
   - Go to Vercel → Settings → Git
   - Verify repository is connected
   - Reconnect if needed

2. **Check Branch Settings**:
   - Ensure "Production Branch" is set to `main`
   - Verify you're pushing to the correct branch

3. **Check Vercel Dashboard**:
   - Look for any error messages
   - Check build logs for issues

### Build Failures?

- Check the build logs in Vercel dashboard
- Fix any TypeScript or build errors
- Push again - it will automatically retry

## Pro Tips

1. **Use Preview Deployments**: Test changes on feature branches before merging
2. **Monitor Build Times**: Keep builds under 5 minutes for faster deployments
3. **Use Deploy Hooks**: Integrate with other services if needed
4. **Set Up Notifications**: Get Slack/email alerts for deployment status

---

**That's it!** Once connected, every `git push` automatically deploys your site. No manual steps needed! 🎉

