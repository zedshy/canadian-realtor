# 🚀 Deployment Guide

This guide covers deploying your Canadian Realtor website to various platforms.

## 📋 Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Updated all contact information
- [ ] Replaced placeholder property data with real listings
- [ ] Added your own images (or kept Unsplash URLs configured)
- [ ] Customized the city/location in hero text
- [ ] Updated branding (logo, colors, copy)
- [ ] Tested all forms locally
- [ ] Set up environment variables (if using integrations)
- [ ] Reviewed and updated metadata in `app/layout.tsx`

---

## 🌐 Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and is made by the creators of Next.js.

### Method 1: Deploy via Vercel Dashboard

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Repository**
   - Click "Add New Project"
   - Select `zedshy/canadian-realtor` from your GitHub repositories
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. **Environment Variables** (Optional)
   - Add any API keys if you've set up integrations:
   ```
   HUBSPOT_API_KEY=your_key
   OPENAI_API_KEY=your_key
   SENDGRID_API_KEY=your_key
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd canadian-realtor
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - What's your project's name? canadian-realtor
# - In which directory is your code located? ./

# Deploy to production
vercel --prod
```

### Custom Domain on Vercel

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `www.yourrealtor.ca`)
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

---

## 🔷 Deploy to Netlify

### Via Netlify Dashboard

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select `zedshy/canadian-realtor`

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add any API keys needed

5. **Deploy**
   - Click "Deploy site"
   - Site will be live at `random-name.netlify.app`
   - You can change this in Site settings

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

---

## ☁️ Deploy to Railway

Railway is great for full-stack applications with databases.

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `zedshy/canadian-realtor`

3. **Configuration**
   - Railway auto-detects Next.js
   - No additional config needed

4. **Environment Variables**
   - Add in the Variables tab

5. **Deploy**
   - Automatic on every push to main branch

---

## 🐳 Deploy with Docker

### Dockerfile

Create a `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### Build and Run

```bash
# Build image
docker build -t canadian-realtor .

# Run container
docker run -p 3000:3000 canadian-realtor
```

---

## 🌍 Deploy to Custom VPS (DigitalOcean, AWS, etc.)

### Prerequisites

- Ubuntu 20.04+ server
- Domain pointed to server IP
- SSH access

### Installation Steps

```bash
# 1. Connect to server
ssh root@your-server-ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 4. Install PM2 (process manager)
npm install -g pm2

# 5. Clone repository
cd /var/www
git clone https://github.com/zedshy/canadian-realtor.git
cd canadian-realtor

# 6. Install dependencies
npm install

# 7. Build application
npm run build

# 8. Start with PM2
pm2 start npm --name "canadian-realtor" -- start

# 9. Configure PM2 to start on boot
pm2 startup
pm2 save

# 10. Install and configure Nginx
apt install -y nginx

# 11. Create Nginx configuration
nano /etc/nginx/sites-available/canadian-realtor

# Add this configuration:
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 12. Enable site
ln -s /etc/nginx/sites-available/canadian-realtor /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 13. Install SSL with Let's Encrypt
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts for SSL setup
```

### Update Deployment

```bash
cd /var/www/canadian-realtor
git pull origin main
npm install
npm run build
pm2 restart canadian-realtor
```

---

## 🔒 Environment Variables Setup

Create a `.env.local` file (never commit this!):

```env
# CRM Integration
HUBSPOT_API_KEY=your_hubspot_key
SALESFORCE_API_KEY=your_salesforce_key
PIPEDRIVE_API_KEY=your_pipedrive_key

# AI Services
OPENAI_API_KEY=your_openai_key

# Email Services
SENDGRID_API_KEY=your_sendgrid_key
MAILCHIMP_API_KEY=your_mailchimp_key

# SMS Services
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Database (if needed)
DATABASE_URL=your_database_connection_string

# NextAuth (if adding authentication)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_a_secret_key
```

**Generate NextAuth Secret:**
```bash
openssl rand -base64 32
```

---

## 📊 Post-Deployment Setup

### 1. Google Analytics

Add to `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

### 2. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 3. Monitoring

**Vercel Analytics** (if on Vercel):
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// In return:
<Analytics />
```

**Sentry for Error Tracking:**
```bash
npm install @sentry/nextjs
```

### 4. Performance

Test your site:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Vercel/Netlify:**
- Automatically deploys on every push to `main`
- Preview deployments for pull requests

**GitHub Actions** (for custom servers):

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/canadian-realtor
            git pull origin main
            npm install
            npm run build
            pm2 restart canadian-realtor
```

---

## 🆘 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Memory Issues on Server

Increase Node.js memory:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Images Not Loading

Make sure `next.config.ts` includes:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

---

## 📱 Mobile Testing

Test on real devices:
- iOS Safari
- Android Chrome
- Test forms and interactions
- Check loading speed on 3G/4G

---

## ✅ Launch Checklist

Before going live:

- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] All forms tested and working
- [ ] Analytics set up
- [ ] Error tracking configured
- [ ] Sitemap submitted to Google
- [ ] robots.txt configured
- [ ] 404 page working
- [ ] All images optimized
- [ ] Mobile responsive tested
- [ ] Page speed optimized (score 90+)
- [ ] Contact information correct
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] Cookie consent (if required)

---

**Need help?** Check the main [README.md](./README.md) or open an issue on GitHub.

