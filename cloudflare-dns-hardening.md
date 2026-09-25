# Cloudflare DNS Hardening, Advanced HTML Worker & Google #1 Spot Optimization

This document outlines the ultra-hardened configuration for **Lodha Altero Wakad** on Cloudflare and Google Search Console to achieve Google ranking #1 across Pune real estate.

---

## 1. Cloudflare DNS & Proxy Configuration (Orange Cloud)

To get maximum edge caching, DDoS protection, sub-15ms Time to First Byte (TTFB), and full Cloudflare Worker execution:

### DNS Records Table (In Cloudflare Zone: `newlaunches.in`)
| Type | Name | Content / Target | Proxy Status | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `altero` | `alterowakad.pages.dev` | **Proxied (Orange Cloud)** | Auto | **Primary Canonical Production Host** |
| **CNAME** | `www.altero` | `alterowakad.pages.dev` | **Proxied (Orange Cloud)** | Auto | Subdomain WWW alias (301 to altero) |
| **TXT** | `altero` | `google-site-verification=7GXqitp4hGBCcyWfSC0SwGGKINHqogR716eQEiD0vWA` | DNS Only (Grey Cloud) | Auto | GSC Verification Token 1 |
| **TXT** | `altero` | `google-site-verification=QFK7VqRHrq-mZJgA2maflTA7RLYKX1hvCK8B2djWkqI` | DNS Only (Grey Cloud) | Auto | GSC Verification Token 2 |
| **TXT** | `_indexnow.altero` | `e9a3b8c7d6e54f3a2b1c0d9e8f7a6b5c` | DNS Only (Grey Cloud) | Auto | Real-Time IndexNow Verification Key |

> **Subdomain Edge Architecture**: Requests to `https://altero.newlaunches.in/` are intercepted by Cloudflare Edge POPs in Mumbai/Pune (`BOM`/`MRS`), terminating TLS 1.3 in <5ms, executing `_worker.js`, and serving cached responses to Googlebot. Staging link `https://alterowakad.pages.dev/` is strictly hardened with `noindex, nofollow` and canonical tags pointing to `https://altero.newlaunches.in/`.

---

## 2. Cloudflare SSL/TLS Hardening

Navigate to **SSL/TLS** in your Cloudflare dashboard:
- **Encryption Mode**: `Full (Strict)` (prevents man-in-the-middle attacks between Cloudflare and origin).
- **Edge Certificates**:
  - **Always Use HTTPS**: `ON`
  - **HTTP Strict Transport Security (HSTS)**:
    - Status: `Enabled`
    - Max Age: `6 months (or 1 year)`
    - Include subdomains: `ON`
    - Preload: `ON`
  - **Minimum TLS Version**: `TLS 1.2` (Recommended: `TLS 1.3`)
  - **Opportunistic Encryption**: `ON`
  - **TLS 1.3**: `ON`
  - **Automatic HTTPS Rewrites**: `ON`

---

## 3. Speed, Caching & Core Web Vitals Hardening (100/100 CWV)

In Cloudflare **Speed** and **Caching** menus:
- **HTTP/3 (with QUIC)**: `ON` (Zero-latency connection establishment for mobile users in Pune).
- **0-RTT Connection Resumption**: `ON` (Accelerates repeat visits).
- **Early Hints (103)**: `ON` (Worker already transmits preloads for `hero_banner.jpg` & `styles.css`).
- **Brotli Compression**: `ON` (Reduces HTML/CSS payload by up to 28% compared to standard Gzip).
- **Tiered Cache**: `Smart Tiered Cache (ON)` (Routes requests through regional cache hubs like Mumbai `BOM` for ultra-fast local Pune delivery).

---

## 4. WAF & Googlebot Protection Rule

To ensure Googlebot and search crawlers never get challenged, throttled, or delayed:
1. Go to **Security** -> **WAF** -> **Custom rules**.
2. Click **Create rule**:
   - Rule Name: `Allow Verified Search Engine Bots`
   - Field: `Verified Bot` -> Equals -> `Yes` (Expression: `cf.client.bot`)
   - Action: `Skip` -> Check all security components (WAF, Rate Limiting, Managed Challenge).
3. Save and deploy.

---

## 5. Deployment Options

### Option A: Cloudflare Pages (Git Integrated - Recommended)
1. In Cloudflare Dashboard, go to **Workers & Pages** -> **Create application** -> **Pages**.
2. Connect to GitHub repository: `propsmartrealty-max/lodhaalterowakad`.
3. Set Build settings:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `.`
4. Click **Save and Deploy**. Cloudflare automatically picks up `_worker.js`, `_headers`, and `_redirects`.

### Option B: Deploy via Wrangler CLI using Global Key or API Token
Set environment variables:
```bash
# Using Cloudflare Global API Key
export CLOUDFLARE_EMAIL="your-cloudflare-account@email.com"
export CLOUDFLARE_API_KEY="your_global_api_key_here"

# OR using Cloudflare API Token (Recommended)
export CLOUDFLARE_API_TOKEN="your_api_token_here"

# Deploy to Cloudflare Workers
npx wrangler deploy
```

---

## 6. Google Search Console & Google.com #1 Spot Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add Property -> URL Prefix (or Domain).
3. Verification options:
   - **HTML Tag**: Replace `GSC_VERIFICATION_TOKEN_LODHA_ALTERO` in `index.html` with your token.
   - **HTML File**: Cloudflare Worker automatically responds with `200 OK` to any `/google<hash>.html` request automatically.
   - **DNS TXT Record**: Add the TXT record in Cloudflare DNS.
4. **Submit Sitemap**: In Search Console, navigate to **Sitemaps** -> Submit `https://<your-domain>/sitemap.xml`.
5. **URL Inspection**: Inspect the root URL and click **Request Indexing**.
