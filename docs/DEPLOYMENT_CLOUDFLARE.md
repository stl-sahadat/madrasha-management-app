# Cloudflare Pages & Workers Deployment Guide

## Overview

The **Madrasa Management System** is configured for instant, zero-downtime deployment on Cloudflare's ultra-fast global edge network.

- **Live Production URL:** [`https://madrasha-management.pages.dev`](https://madrasha-management.pages.dev)
- **Deployment Platform:** Cloudflare Pages (Static Edge Assets + Edge Routing)
- **Framework Target:** Vite + React + Tailwind CSS
- **Branch:** `main`

---

## 1. Prerequisites

- Cloudflare Account
- Node.js 18+ (tested on Node 20 / 22 / 24)
- Cloudflare Wrangler CLI (`wrangler >= 4.162.0`)

Verify authentication:
```bash
npx wrangler whoami
```

---

## 2. Fast Build & Deployment Steps

### Step 2.1: Build Production Assets
Run the optimized Vite bundler to produce production-ready static assets in `dist/`:
```bash
npm run build # builds next.js if fullstack
# OR for Edge Cloudflare Pages:
npx vite build
```

### Step 2.2: Ensure SPA Routing (_redirects)
Cloudflare Pages requires a `_redirects` file at the root of the output directory to enable clean client-side SPA routing:
```bash
echo "/*    /index.html   200" > dist/_redirects
```

### Step 2.3: Deploy to Cloudflare Pages
Deploy directly using wrangler with project name `madrasha-management`:
```bash
npx wrangler pages deploy dist --project-name=madrasha-management --branch=main
```

---

## 3. Custom Domain Configuration

To map a custom domain (e.g. `madrasha.yourdomain.com`):
1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** > **Pages** > **madrasha-management**.
3. Click on the **Custom domains** tab.
4. Click **Set up a custom domain** and enter your desired subdomain or root domain.
5. Cloudflare will automatically provision SSL certificates and route traffic.

---

## 4. Continuous Deployment with GitHub

When connected to GitHub repository `stl-sahadat/madrasha-management-app`:
1. Cloudflare Pages automatically detects every push to `main`.
2. Build command: `npx vite build`
3. Build output directory: `dist`
4. Root directory: `/`
