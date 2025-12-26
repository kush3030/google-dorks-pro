# Deployment Guide

This guide covers various options for deploying Dork Scanner Pro to production.

## Quick Deploy Options

### 1. Vercel (Recommended) ⚡

Vercel is the easiest and fastest option (made by the creators of Next.js).

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Features:**
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Preview deployments
- ✅ Free tier available

**One-Command Deploy:**
```bash
npm install -g vercel
vercel
```

### 2. Netlify 🌐

Another excellent option with great free tier.

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select repository
5. Build settings will auto-detect Next.js
6. Click "Deploy"

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`

### 3. GitHub Pages 📄

Free hosting directly from your repository.

**Steps:**
1. Install adapter:
   ```bash
   npm install --save-dev @vercel/next-on-pages
   ```

2. Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

3. Build and deploy:
   ```bash
   npm run build
   npx gh-pages -d out
   ```

**Note:** GitHub Pages requires static export (some features may not work).

### 4. Docker 🐳

For self-hosting or cloud deployment.

**Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

**Build and run:**
```bash
docker build -t dork-scanner-pro .
docker run -p 3000:3000 dork-scanner-pro
```

## Cloud Platforms

### AWS (Amplify)
1. Push code to GitHub
2. Go to AWS Amplify
3. Connect repository
4. Deploy

### Google Cloud Platform (Cloud Run)
```bash
gcloud run deploy dork-scanner-pro \
  --source . \
  --platform managed \
  --region us-central1
```

### Azure (Static Web Apps)
```bash
az staticwebapp create \
  --name dork-scanner-pro \
  --resource-group myResourceGroup \
  --source https://github.com/your-username/google-dorks-pro \
  --location "centralus" \
  --branch main \
  --app-location "/" \
  --output-location ".next"
```

### Railway 🚂
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway auto-detects Next.js and deploys

## Self-Hosting

### VPS (DigitalOcean, Linode, Vultr)

**Prerequisites:**
- Ubuntu 22.04 LTS server
- Domain name (optional)

**Setup Steps:**

1. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd google-dorks-pro
   npm install
   npm run build
   ```

3. **Install PM2 (process manager):**
   ```bash
   npm install -g pm2
   pm2 start npm --name "dork-scanner" -- start
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx (reverse proxy):**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/dork-scanner
   ```

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

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

   ```bash
   sudo ln -s /etc/nginx/sites-available/dork-scanner /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Setup SSL (optional but recommended):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Environment Variables

For production deployments, you may want to set:

```bash
# .env.production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Build Optimization

### Production Build
```bash
npm run build
npm start
```

### Analyze Bundle Size
```bash
npm install --save-dev @next/bundle-analyzer

# In next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

## Performance Optimization

### 1. Enable Compression
Most platforms enable this by default, but for self-hosting:

```javascript
// next.config.ts
const nextConfig = {
  compress: true,
  // ... other config
};
```

### 2. Image Optimization
Already configured with Next.js Image component.

### 3. Caching Headers
Automatic with Next.js on Vercel/Netlify.

For custom servers, add to nginx:
```nginx
location /_next/static {
    alias /path/to/app/.next/static;
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

## Monitoring

### Free Options
- **Vercel Analytics**: Built-in if deployed on Vercel
- **Google Analytics**: Add to `layout.tsx`
- **Plausible**: Privacy-friendly analytics

### Setup Example (Google Analytics):
```typescript
// src/app/layout.tsx
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

## Security Considerations

### 1. Rate Limiting
Implement rate limiting to prevent abuse:

```bash
npm install express-rate-limit
```

### 2. Security Headers
Add to `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### 3. Content Security Policy
Restrict what resources can load:
```typescript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
}
```

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Memory Issues
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

## Backup

### Database (if added later)
```bash
# MongoDB
mongodump --uri="mongodb://localhost/dorks" --out=/backup/

# PostgreSQL
pg_dump dbname > backup.sql
```

### Code
Always keep your code in version control (Git).

## Scaling

### Horizontal Scaling
Deploy to multiple regions with:
- Vercel: Automatic edge network
- Cloudflare: Workers + KV
- AWS: CloudFront + Lambda@Edge

### Load Balancing
For high traffic, use:
- Nginx load balancer
- AWS ELB
- Google Cloud Load Balancer

---

## Recommended Setup

For most users:
1. **Development**: Local with `npm run dev`
2. **Production**: Vercel (free tier is generous)
3. **Custom Domain**: Add via platform settings
4. **Analytics**: Vercel Analytics or Plausible
5. **Monitoring**: Platform-provided tools

**Cost**: $0/month for most use cases!

---

Need help? Check the [README.md](README.md) or open an issue on GitHub.
