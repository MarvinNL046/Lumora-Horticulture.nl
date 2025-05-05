# Deploying Lumora Horticulture to Netlify

This document provides instructions for deploying the Lumora Horticulture website to Netlify.

## Prerequisites

- Netlify account (sign up at [netlify.com](https://www.netlify.com) if you don't have one)
- Node.js and npm installed locally
- Git repository for your project (optional but recommended)

## Deployment Options

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Login to Netlify:**
   ```bash
   npx netlify login
   ```

2. **Initialize your site:**
   ```bash
   npx netlify init
   ```
   This will guide you through linking your local project to a Netlify site.

3. **Deploy a preview:**
   ```bash
   npm run netlify:deploy
   ```
   This will create a draft URL where you can preview your site.

4. **Deploy to production:**
   ```bash
   npm run netlify:deploy:prod
   ```
   This deploys your site to the main Netlify URL.

### Option 2: Deploy via Netlify Dashboard

1. Log in to your Netlify account
2. Click "New site from Git" or "Import an existing project"
3. Connect to your Git provider and select your repository
4. Configure build settings:
   - Build command: `npm ci && npm run build` (ensures dependencies are properly installed)
   - Publish directory: `.next`
5. Click "Deploy site"

## Configuration Files

This project includes two Netlify configuration files:

- `netlify.toml` - Main configuration for deployment settings
- `netlify.ci.toml` - CI/CD configuration for deployment

## Environment Variables

### Basic Environment Variables
The following environment variables are set in the `.env.production` file:
- `NEXT_PUBLIC_DEFAULT_LOCALE`: Sets the default locale for the site
- `NEXT_PUBLIC_SITE_NAME`: Sets the site name
- `NEXT_PUBLIC_SITE_URL`: Sets the production URL

### EmailJS Environment Variables
For the contact forms to work correctly, you need to set up EmailJS environment variables:
- See the `NETLIFY-ENV-SETUP.md` file for detailed instructions on setting up these variables

For all environment variables, add them through the Netlify dashboard:
1. Go to Site settings > Build & deploy > Environment
2. Add variables as needed

## Troubleshooting Common Issues

### Dependencies Not Installing
If you see errors related to missing modules:
- Ensure you're using `npm ci && npm run build` as the build command in Netlify
- Check that your package-lock.json is committed to the repository

### Build Process Errors
- If you encounter build errors, check Netlify logs in the dashboard
- For local debugging, run `npx netlify build --debug`
- Make sure your Next.js configuration is compatible with Netlify deployment

### Contact Form Not Working
- Verify the EmailJS environment variables are set correctly in Netlify (see NETLIFY-ENV-SETUP.md)
- Check browser console on the deployed site for any errors

## Continuous Deployment

Once set up with a Git repository, Netlify will automatically deploy when you push changes to your main branch.

## Custom Domain

To set up a custom domain:
1. Go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS settings
