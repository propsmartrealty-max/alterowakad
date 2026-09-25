/**
 * Lodha Altero Wakad — Ultra-Hardened Cloudflare Advanced Tech HTML Edge Worker
 * 
 * Capabilities:
 * 1. Edge SEO Acceleration & Crawler Routing (Googlebot, Bingbot, Social)
 * 2. Clean URL Routing & Dynamic HTMLRewriter for Articles & Floor Plans
 * 3. 100/100 Core Web Vitals Optimization (103 Early Hints, Brotli/Zstd, Cache Headers)
 * 4. Military-Grade Security Headers (HSTS Preload, CSP, Frame/MIME Protection)
 * 5. Google Search Console Automated Verification Endpoint Handler
 * 6. Automated Search Engine Indexing Ping Handler (Google & Bing IndexNow)
 * 7. Canonical 301 Normalization (http -> https, /index.html -> /)
 */

import {
  PROGRAMMATIC_PAGES,
  resolveProgrammaticPage,
  getAllProgrammaticSlugs,
  getProgrammaticSitemapChunk,
  getProgrammaticSitemapIndex,
  getMasterSitemapIndex,
  renderProgrammaticPage,
  renderProgrammaticMarkdown
} from './programmatic_data.js';

const STATIC_EXTENSIONS = /\.(jpg|jpeg|webp|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|pdf|json|xml|txt|webmanifest)$/i;

// Verified Google, Bing & Global Search Engine Crawler User-Agents
const SEARCH_CRAWLER_REGEX = /googlebot|google-inspectiontool|googleother|storebot-google|google-read-aloud|google-safety|mediapartners-google|adsbot-google|feedfetcher-google|bingbot|bingpreview|msnbot|adidxbot|duckduckbot|slurp|baiduspider|yandexbot|applebot|applebot-extended|yandex|seznam|naverbot|qwantify|sogou|coccoc|ecosia|daum/i;
const AI_CRAWLER_REGEX = /gptbot|chatgpt-user|oai-searchbot|perplexitybot|claudebot|claude-web|anthropic-ai|google-extended|cohere-ai|meta-externalagent|meta-externalfetch|bytespider|diffbot|ccbot|amazonbot|deepseek|mistralai|grok|xai|timpibot/i;
const SOCIAL_CRAWLER_REGEX = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|pinterest|slackbot|discordbot|skypeuripreview|viber|vkshare/i;

// IndexNow Verification Key for Instant Search Engine Crawl Notifications
const INDEXNOW_KEY = 'e9a3b8c7d6e54f3a2b1c0d9e8f7a6b5c';

// Article URL Mapping for Clean SEO Slugs
const ARTICLE_SLUGS = {
  '/articles/wakad-real-estate-investment-thesis-2026': {
    title: 'Lodha Altero Wakad: Real Estate Investment Thesis & Rental Yields 2026',
    desc: 'In-depth 2026 investment thesis analyzing 2, 3 and 4 BHK flats in Wakad, Hinjewadi IT corridor rental yields (4.8% to 5.5%), and capital growth at Lodha Altero Wakad.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/wakad-vs-baner-vs-mahalunge-hinjewadi': {
    title: 'Lodha Altero Wakad vs Baner vs Mahalunge vs Hinjewadi: West Pune Luxury Comparison',
    desc: 'Detailed comparative analysis of Wakad, Baner, Balewadi High Street, Mahalunge township projects, and Hinjewadi IT corridor real estate prices vs Lodha Altero Wakad.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/lodha-altero-floor-plans-sky-duplex-penthouses': {
    title: 'Lodha Altero Wakad Floor Plans: 3, 4 & 5 BHK Sky Duplex & Penthouse Layouts',
    desc: 'Detailed architectural review of 3 BHK, 4 BHK, 5 BHK Sky Duplex, Simplex and Penthouse floor plans, carpet areas, ceiling heights, and Vastu at Lodha Altero Wakad Pune.',
    anchor: '#residences'
  },
  '/articles/maharera-p52100079692-statutory-compliance': {
    title: 'Lodha Altero Wakad MahaRERA P52100079692: Statutory Compliance & Escrow Protection',
    desc: 'Complete legal due diligence review for MahaRERA P52100079692: statutory 70% escrow accounts, title verification, possession dates, and defect liability at Lodha Altero Wakad Pune.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/25000-sqft-rooftop-sky-club-infinity-pool': {
    title: 'Lodha Altero Wakad: 25,000 Sq.Ft. Rooftop Sky Club & Heated Infinity Pool',
    desc: 'Explore Pune’s highest 25,000 sq.ft. Rooftop Sky Club on the 37th floor at Lodha Altero Wakad: 50m heated infinity pool, padel court, and stargazing observatory.',
    anchor: '#rooftop'
  },
  '/articles/pune-real-estate-macro-trends-east-vs-west': {
    title: 'Lodha Altero Wakad vs East Pune: Macro Real Estate Growth & Capital Appreciation',
    desc: 'Macroeconomic real estate analysis comparing Kharadi and Hadapsar IT corridors with Lodha Altero Wakad and Hinjewadi high-growth residential corridors in Pune.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/lodha-pune-residential-ecosystem': {
    title: 'Lodha Altero Wakad in Lodha Pune Ecosystem: Altero, Panache, Giardino & Belmondo',
    desc: "Official comparative guide to Lodha Group's residential developments in Pune: Lodha Altero Wakad, Lodha Panache Hinjewadi, Lodha Giardino Kharadi, Lodha Bella Vita NIBM, and Lodha Belmondo Gahunje.",
    anchor: '#pune-real-estate-hub'
  },
  '/articles/lodha-altero-wakad-price-list-cost-sheet-2026': {
    title: 'Lodha Altero Wakad Price List 2026: Cost Sheet, Payment Plans & Milestone Breakdown',
    desc: 'Official 2026 price breakdown, cost sheet, installment schedules, floor-rise calculations, and MahaRERA P52100079692 payment milestones for Lodha Altero, Wakad, Pune.',
    anchor: '#residences'
  },
  '/articles/lodha-altero-connectivity-hinjewadi-phoenix-mall': {
    title: 'Connectivity Guide: Lodha Altero Wakad to Hinjewadi IT Park & Phoenix Mall',
    desc: 'Transit analysis, commuting routes, and travel times from Lodha Altero Wakad to Rajiv Gandhi Infotech Park Hinjewadi Phase 1, 2, 3, Phoenix Mall, and Metro Line 3.',
    anchor: '#location'
  },
  '/articles/wakad-hinjewadi-luxury-3bhk-4bhk-5bhk-carpet-area-analysis': {
    title: 'Lodha Altero Wakad: Luxury 3, 4 & 5 BHK Big Carpet Area Analysis',
    desc: 'Architectural breakdown of 1,185 - 3,416 sq.ft. carpet layouts, 10.5 ft ceiling clearances, 3-side open residences, and Mivan formwork at Lodha Altero Wakad.',
    anchor: '#residences'
  },
  '/articles/pune-luxury-real-estate-market-report-wakad-hinjewadi-baner': {
    title: 'Pune Luxury Real Estate Market Report 2026–2030: Wakad, Hinjewadi & Baner',
    desc: 'Comprehensive 2026–2030 Pune luxury real estate report examining capital appreciation (9.6% CAGR), 4.8%-5.5% rental yields, Metro Line 3, and Lodha Altero Wakad.',
    anchor: '#pune-real-estate-hub'
  }
};

// ─── CANONICAL & STAGING DOMAIN AUTHORITY ───────────────────────────────────
// Primary Canonical Host: altero.newlaunches.in (Hardened Production Subdomain)
// Staging Origin:         alterowakad.pages.dev (Hardened Staging Link)
// Scrapped Subdomains:    lodhaaltero.newlaunches.in, www.lodhaaltero.newlaunches.in,
//                         lodhaalterowakad.pages.dev, www.altero.newlaunches.in
// Any scrapped or unrecognized host MUST permanently 301-redirect to canonical.
// "Lodha Altero Wakad" brand identity is kept 100% across all website content, metadata & schema.
const CANONICAL_HOST = 'altero.newlaunches.in';
const STAGING_HOST = 'alterowakad.pages.dev';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, search, protocol, hostname } = url;
    const userAgent = request.headers.get('User-Agent') || '';
    const isSearchCrawler = SEARCH_CRAWLER_REGEX.test(userAgent);
    const isAiCrawler = AI_CRAWLER_REGEX.test(userAgent);
    const isSocialCrawler = SOCIAL_CRAWLER_REGEX.test(userAgent);
    const isGetRequest = request.method === 'GET';
    const isNoCacheQuery = url.searchParams.has('nocache') || url.searchParams.has('purge');

    // ── STEP 0: SUBDOMAIN & STAGING LOCKDOWN GATE ────────────────────────────
    // 1. Scrapped subdomains & staging links:
    // Permanently 301 redirect any scrapped lodha subdomain, legacy staging link,
    // www subdomain, or unknown host to canonical production: https://altero.newlaunches.in
    if (hostname !== CANONICAL_HOST && hostname !== STAGING_HOST) {
      return Response.redirect(`https://${CANONICAL_HOST}${pathname}${search}`, 301);
    }

    // 2. Staging Link Hardening (alterowakad.pages.dev):
    // Search engine crawlers (Googlebot, Bingbot, etc.) attempting to crawl staging
    // MUST immediately 301-redirect to canonical production to prevent index fragmentation.
    if (hostname === STAGING_HOST && (isSearchCrawler || isAiCrawler || isSocialCrawler)) {
      return Response.redirect(`https://${CANONICAL_HOST}${pathname}${search}`, 301);
    }

    // 3. Force HTTPS on all allowed hosts
    if (protocol === 'http:') {
      return Response.redirect(`https://${hostname}${pathname}${search}`, 301);
    }

    // Geo & NRI Visitor Intelligence (Sanitized against injection)
    const rawCountry = request.cf?.country || 'IN';
    const rawCity = request.cf?.city || 'Pune';
    const viewerCountry = String(rawCountry).replace(/[^A-Z]/g, '').slice(0, 2) || 'IN';
    const viewerCity = String(rawCity).replace(/[^a-zA-Z0-9\s.-]/g, '').slice(0, 50) || 'Pune';
    const acceptsMarkdown = request.headers.get('Accept')?.includes('text/markdown') || false;
    const isMarkdownPath = pathname.endsWith('.md');
    const cleanMdPath = pathname.replace(/\.md$/, '');

    // Audience segmentation for edge cache isolation (prevents crawler vs domestic vs NRI banner cross-contamination)
    const audienceSegment = (isSearchCrawler || isAiCrawler) ? 'crawler' : (viewerCountry === 'IN' ? 'in' : `nri-${viewerCountry.toLowerCase()}`);

    // Cloudflare Edge Cache API (caches.default) for 0ms edge memory hits
    const cache = (typeof caches !== 'undefined' && caches.default) ? caches.default : null;
    
    // Normalize cache key by removing non-functional tracking query parameters (utm_*, fbclid, gclid, etc.)
    const cleanCacheUrl = new URL(url.toString());
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'utm_source_platform',
      'fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid', 'twclid', 'li_fat_id', 'ttclid', 'yclid',
      '_ga', '_gl', 'mc_cid', 'mc_eid', 'ref', 'source', 'trk', 's_kwcid', 'dclid'
    ];
    trackingParams.forEach(p => cleanCacheUrl.searchParams.delete(p));
    cleanCacheUrl.searchParams.set('__cf_aud', audienceSegment);
    cleanCacheUrl.searchParams.sort();
    const cacheKey = new Request(cleanCacheUrl.toString(), request);

    if (cache && isGetRequest && !isNoCacheQuery && !pathname.startsWith('/_edge/')) {
      const cached = await cache.match(cacheKey);
      if (cached) {
        const cachedRes = new Response(cached.body, cached);
        cachedRes.headers.set('X-Edge-Cache', 'HIT');
        return cachedRes;
      }
    } else if (cache && isNoCacheQuery) {
      try {
        await cache.delete(cacheKey);
      } catch (e) {}
    }

    // =========================================================================
    // 1. Edge Canonical Normalization & 301 Redirect Rules
    // =========================================================================

    // Redirect /index.html to /
    if (pathname === '/index.html' || pathname.endsWith('/index.html')) {
      const cleanPath = pathname.replace(/\/index\.html$/, '/') || '/';
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
    }

    // Category & Directory Root Normalization to Master Showcase Anchors
    const DIRECTORY_REDIRECTS = {
      '/articles': '/#pune-real-estate-hub',
      '/articles/': '/#pune-real-estate-hub',
      '/residences': '/#residences',
      '/residences/': '/#residences',
      '/amenities': '/#amenities',
      '/amenities/': '/#amenities',
      '/pricing': '/#calculator',
      '/pricing/': '/#calculator',
      '/transit': '/#location',
      '/transit/': '/#location',
      '/location': '/#location',
      '/location/': '/#location',
      '/rooftop': '/#rooftop',
      '/rooftop/': '/#rooftop',
      '/gallery': '/#gallery',
      '/gallery/': '/#gallery',
      '/calculator': '/#calculator',
      '/calculator/': '/#calculator',
      '/compare': '/#pune-real-estate-hub',
      '/compare/': '/#pune-real-estate-hub',
      '/nri': '/#contact',
      '/nri/': '/#contact',
      '/investment': '/#pune-real-estate-hub',
      '/investment/': '/#pune-real-estate-hub',
      '/vastu': '/#residences',
      '/vastu/': '/#residences',
      '/schools': '/#location',
      '/schools/': '/#location',
      '/healthcare': '/#location',
      '/healthcare/': '/#location',
      '/contact': '/#contact',
      '/contact/': '/#contact',
      '/sitemap': '/sitemap_index.xml',
      '/sitemap/': '/sitemap_index.xml',
      '/sitemaps': '/sitemap_index.xml',
      '/sitemaps/': '/sitemap_index.xml',
      '/sitemap_index': '/sitemap_index.xml',
      '/sitemap_index/': '/sitemap_index.xml',
      '/sitemap-index': '/sitemap_index.xml',
      '/sitemap-index/': '/sitemap_index.xml'
    };
    if (DIRECTORY_REDIRECTS[pathname]) {
      return Response.redirect(`https://${CANONICAL_HOST}${DIRECTORY_REDIRECTS[pathname]}`, 301);
    }

    // RFC 9116 security.txt Canonical 301 Redirect
    if (pathname === '/security.txt') {
      return Response.redirect(`https://${CANONICAL_HOST}/.well-known/security.txt`, 301);
    }

    // Trailing slash 301 normalization (eliminates duplicate URLs in Google Search Console)
    if (pathname.length > 1 && pathname.endsWith('/') && !DIRECTORY_REDIRECTS[pathname]) {
      return Response.redirect(`https://${CANONICAL_HOST}${pathname.slice(0, -1)}${search}`, 301);
    }

    // =========================================================================
    // 2. Google Search Console & IndexNow Verification Key Handlers
    // =========================================================================
    if (/^\/google[a-zA-Z0-9_\-]+\.html$/i.test(pathname)) {
      const filename = pathname.replace(/^\//, '');
      return new Response(`google-site-verification: ${filename}`, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
          'X-Robots-Tag': 'noindex'
        }
      });
    }

    // IndexNow Key Verification Endpoint
    if (pathname === `/${INDEXNOW_KEY}.txt` || /^\/[a-f0-9]{32}\.txt$/i.test(pathname)) {
      return new Response(INDEXNOW_KEY, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
          'X-Robots-Tag': 'noindex'
        }
      });
    }

    // =========================================================================
    // 3. Dynamic Markdown Mirror for AI Agents (ChatGPT, Perplexity, Claude)
    // =========================================================================
    if (pathname === '/index.md' || (pathname === '/' && acceptsMarkdown)) {
      let mdText = '';
      try {
        const fullTxtReq = new Request(new URL('/llms-full.txt', request.url), request);
        const fullTxtRes = env.ASSETS ? await env.ASSETS.fetch(fullTxtReq) : await fetch(fullTxtReq);
        mdText = await fullTxtRes.text();
      } catch (e) {
        mdText = '# Lodha Altero Wakad Pune\nMahaRERA: P52100079692\nOfficial Website: https://altero.newlaunches.in/';
      }

      const mdRes = new Response(mdText, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
          'CDN-Cache-Control': 'max-age=86400',
          'X-Robots-Tag': 'index, follow',
          'Cache-Tag': 'lodha-altero-markdown, lodha-altero-root',
          'Vary': 'Accept'
        }
      });
      if (cache && isGetRequest && !isNoCacheQuery && ctx?.waitUntil) {
        ctx.waitUntil(cache.put(cacheKey, mdRes.clone()));
      }
      return mdRes;
    }

    if (isMarkdownPath || acceptsMarkdown) {
      const progDataForMd = PROGRAMMATIC_PAGES[cleanMdPath] || resolveProgrammaticPage(cleanMdPath);
      if (progDataForMd) {
        const mdText = renderProgrammaticMarkdown(url, progDataForMd);
        const mdRes = new Response(mdText, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
            'CDN-Cache-Control': 'max-age=86400',
            'X-Robots-Tag': 'index, follow',
            'Cache-Tag': `lodha-altero-markdown, lodha-altero-${progDataForMd.categorySlug || 'general'}`,
            'Vary': 'Accept'
          }
        });
        if (cache && isGetRequest && !isNoCacheQuery && ctx?.waitUntil) {
          ctx.waitUntil(cache.put(cacheKey, mdRes.clone()));
        }
        return mdRes;
      }
    }

    // =========================================================================
    // 3b. Dynamic Domain-Aware Robots.txt & Static Sitemaps Normalization
    // =========================================================================
    if (pathname === '/robots.txt') {
      let robotsContent = '';
      try {
        const robReq = new Request(new URL('/robots.txt', request.url), request);
        const robRes = env.ASSETS ? await env.ASSETS.fetch(robReq) : await fetch(robReq);
        robotsContent = await robRes.text();
      } catch (e) {
        robotsContent = `User-agent: *\nAllow: /\nSitemap: https://${CANONICAL_HOST}/sitemap.xml`;
      }

      return new Response(robotsContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=43200, s-maxage=43200',
          'X-Robots-Tag': hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow'
        }
      });
    }

    // Master Unified Sitemap Index (GSC & Bingbot discovery for all 11,055 URLs)
    const MASTER_SITEMAP_INDEX_PATHS = new Set([
      '/sitemap_index.xml',
      '/sitemap-index.xml',
      '/sitemaps/sitemap_index.xml',
      '/sitemaps/sitemap-index.xml',
      '/sitemap.xml'
    ]);

    if (MASTER_SITEMAP_INDEX_PATHS.has(pathname)) {
      const masterIndexXml = getMasterSitemapIndex(CANONICAL_HOST);
      return new Response(masterIndexXml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=43200, s-maxage=43200',
          'X-Robots-Tag': hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow'
        }
      });
    }

    if (pathname === '/sitemap-core.xml' || pathname === '/sitemap-articles.xml' || pathname === '/sitemap-images.xml') {
      try {
        const sitemapReq = new Request(new URL(pathname, request.url), request);
        const sitemapRes = env.ASSETS ? await env.ASSETS.fetch(sitemapReq) : await fetch(sitemapReq);
        const sitemapText = await sitemapRes.text();
        return new Response(sitemapText, {
          status: 200,
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=43200, s-maxage=43200',
            'X-Robots-Tag': hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow'
          }
        });
      } catch (e) {
        // Fall back to asset fetch
      }
    }

    // =========================================================================
    // 4. Search Engine Indexing & IndexNow Real-Time Notification Handler
    // =========================================================================
    if (pathname === '/_edge/ping-index' || pathname === '/_edge/indexnow-ping') {
      // Cooldown guard: Prevent 429 Too Many Requests from Bing and IndexNow APIs
      const now = Date.now();
      const isForce = url.searchParams.has('force');
      if (env && env.ALTERO_LEADS_KV && !isForce) {
        try {
          const lastPingRaw = await env.ALTERO_LEADS_KV.get('indexnow:last_ping_ts');
          if (lastPingRaw) {
            const elapsedSec = Math.floor((now - parseInt(lastPingRaw, 10)) / 1000);
            if (elapsedSec < 900) { // 15-minute cooldown period
              return new Response(JSON.stringify({
                status: 'cooldown_active',
                message: `IndexNow cooldown active to prevent HTTP 429 Too Many Requests. Next ping allowed in ${900 - elapsedSec}s. Use ?force=true to override.`,
                elapsedSeconds: elapsedSec,
                cooldownPeriodSeconds: 900
              }, null, 2), {
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
              });
            }
          }
          await env.ALTERO_LEADS_KV.put('indexnow:last_ping_ts', now.toString(), { expirationTtl: 1800 });
        } catch (kvErr) {
          console.error('KV Cooldown Error:', kvErr);
        }
      }

      const allSlugs = getAllProgrammaticSlugs();
      const limitParam = parseInt(url.searchParams.get('limit') || '1000', 10);
      const batchLimit = Math.min(Math.max(limitParam, 50), 10000);
      const selectedProgrammaticUrls = allSlugs.slice(0, batchLimit).map(slug => `https://${CANONICAL_HOST}${slug}`);
      const urlList = [
        `https://${CANONICAL_HOST}/`,
        ...Object.keys(ARTICLE_SLUGS).map(slug => `https://${CANONICAL_HOST}${slug}`),
        ...selectedProgrammaticUrls
      ];

      const sitemapIndexUrl = `https://${CANONICAL_HOST}/sitemap_index.xml`;
      const sitemapCoreUrl = `https://${CANONICAL_HOST}/sitemap-core.xml`;
      const sitemapProgrammaticUrl = `https://${CANONICAL_HOST}/sitemap-programmatic.xml`;
      const pingResults = {
        timestamp: new Date().toISOString(),
        host: CANONICAL_HOST,
        sitemapIndexUrl,
        sitemapCoreUrl,
        sitemapProgrammaticUrl,
        indexNowKey: INDEXNOW_KEY,
        urlsSubmittedCount: urlList.length,
        submittedUrlsSample: urlList.slice(0, 10),
        engineResponses: []
      };

      const indexNowPayload = {
        host: CANONICAL_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${CANONICAL_HOST}/${INDEXNOW_KEY}.txt`,
        urlList
      };

      // 1. Submit batch to IndexNow Global Hub (Bing, Yandex, Seznam, Naver)
      try {
        const indexNowRes = await fetch('https://api.indexnow.org/IndexNow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(indexNowPayload)
        });
        pingResults.engineResponses.push({
          target: 'IndexNow Global Hub (api.indexnow.org)',
          status: indexNowRes.status,
          statusText: indexNowRes.statusText
        });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'IndexNow Global Hub', status: 'error', message: e.message });
      }

      // 2. Submit directly to Bing IndexNow
      try {
        const bingIndexNowRes = await fetch('https://www.bing.com/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(indexNowPayload)
        });
        pingResults.engineResponses.push({
          target: 'Bing IndexNow Direct',
          status: bingIndexNowRes.status,
          statusText: bingIndexNowRes.statusText
        });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Bing IndexNow Direct', status: 'error', message: e.message });
      }

      // 3. Submit directly to Yandex IndexNow
      try {
        const yandexRes = await fetch('https://yandex.com/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(indexNowPayload)
        });
        pingResults.engineResponses.push({
          target: 'Yandex IndexNow Direct',
          status: yandexRes.status,
          statusText: yandexRes.statusText
        });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Yandex IndexNow Direct', status: 'error', message: e.message });
      }

      // 4. Ping Google Sitemap Crawler (Master Index + Core Sitemaps)
      try {
        const googlePing1 = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapIndexUrl)}`);
        const googlePing2 = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapCoreUrl)}`);
        pingResults.engineResponses.push({ target: 'Google Sitemap Ping (Master Index)', status: googlePing1.status });
        pingResults.engineResponses.push({ target: 'Google Sitemap Ping (Core)', status: googlePing2.status });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Google Sitemap Ping', status: 'error', message: e.message });
      }

      // 5. Ping Bing Sitemap Crawler (Master Index + Core Sitemaps)
      try {
        const bingPing1 = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapIndexUrl)}`);
        const bingPing2 = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapCoreUrl)}`);
        pingResults.engineResponses.push({ target: 'Bing Sitemap Ping (Master Index)', status: bingPing1.status });
        pingResults.engineResponses.push({ target: 'Bing Sitemap Ping (Core)', status: bingPing2.status });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Bing Sitemap Ping', status: 'error', message: e.message });
      }

      return new Response(JSON.stringify(pingResults, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    // =========================================================================
    // 3b. Edge Cache Purge Endpoint
    // =========================================================================
    if (pathname === '/_edge/purge-cache') {
      if (cache) {
        try {
          const audienceList = ['in', 'crawler', 'nri-us', 'nri-ae', 'nri-gb', 'nri-sg', 'nri-au', 'nri-ca', 'nri-de', 'nri-qa', 'nri-sa', 'nri-kw', 'nri-om'];
          const buildAudienceKeys = (baseUri) => {
            const list = [new Request(baseUri)];
            for (const aud of audienceList) {
              const u = new URL(baseUri);
              u.searchParams.set('__cf_aud', aud);
              list.push(new Request(u.toString()));
            }
            return list;
          };

          const targetUrls = [
            `https://${hostname}/`,
            'https://altero.newlaunches.in/',
            'https://alterowakad.pages.dev/',
            ...Object.keys(ARTICLE_SLUGS).flatMap(slug => [
              `https://${hostname}${slug}`,
              `https://${hostname}${slug}/`,
              `https://altero.newlaunches.in${slug}`,
              `https://altero.newlaunches.in${slug}/`
            ])
          ];

          const allPurgeRequests = targetUrls.flatMap(u => buildAudienceKeys(u));
          await Promise.allSettled(allPurgeRequests.map(r => cache.delete(r)));
        } catch (e) {}
      }
      return new Response(JSON.stringify({ status: 'purged', timestamp: new Date().toISOString() }, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    // =========================================================================
    // 4. Edge Diagnostics & Health Endpoint
    // =========================================================================
    if (pathname === '/_edge/health' || pathname === '/_edge/status') {
      const cf = request.cf || {};
      const statusData = {
        status: 'online',
        project: 'Lodha Altero Wakad',
        timestamp: new Date().toISOString(),
        edge: {
          colo: cf.colo || 'LOCAL',
          city: cf.city || 'Pune/Mumbai Hub',
          country: cf.country || 'IN',
          asn: cf.asn,
          httpProtocol: cf.httpProtocol,
          tlsVersion: cf.tlsVersion,
          tlsCipher: cf.tlsCipher,
          isCrawler: isSearchCrawler || isSocialCrawler
        },
        seo: {
          canonicalHost: CANONICAL_HOST,
          stagingHost: STAGING_HOST,
          currentHost: hostname,
          googlebotOptimized: true,
          schemaGraphActive: true,
          articlesRouted: Object.keys(ARTICLE_SLUGS).length,
          programmaticPagesActive: getAllProgrammaticSlugs().length,
          keywordsHardened: '46 Core + Regional Pune Real Estate Ecosystem + 10,000+ Programmatic Clusters'
        }
      };
      return new Response(JSON.stringify(statusData, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    // =========================================================================
    // 4b. AI Search Unified Knowledge Graph API (Gemini, Perplexity, SearchGPT)
    // =========================================================================
    if (pathname === '/_edge/knowledge-graph.json') {
      const kgPayload = {
        "@context": "https://schema.org",
        "@type": "ApartmentComplex",
        "name": "Lodha Altero Wakad",
        "alternateName": "Lodha Wakad Pune",
        "url": `https://${CANONICAL_HOST}/`,
        "developer": {
          "@type": "RealEstateDeveloper",
          "name": "Lodha Group (Macrotech Developers Ltd)",
          "url": "https://www.lodhagroup.com"
        },
        "statutoryCompliance": {
          "authority": "Maharashtra Real Estate Regulatory Authority (MahaRERA)",
          "registrationNumber": "P52100079692",
          "verificationUrl": "https://maharera.maharashtra.gov.in",
          "escrowPercentage": "70% Ring-Fenced Section 4(2)(l)(D)"
        },
        "geoCoordinates": {
          "latitude": 18.5902448,
          "longitude": 73.7718644,
          "googleMapsCid": "6038659290505691842",
          "googleMapsUrl": "https://maps.google.com/?cid=6038659290505691842",
          "googlePlaceUrl": "https://www.google.com/maps/place/Lodha+Altero+Gallery/@18.5902448,73.7692895,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b9004e99e127:0x53cda0a16a3442c2!8m2!3d18.5902448!4d73.7718644!16s%2Fg%2F11ly_c7xw0",
          "googleKgmid": "/g/11ly_c7xw0",
          "region": "PCMC West Pune",
          "address": "Behind Croma Electronics, Datta Mandir Road, Kaspate Wasti, Wakad, Pune 411057"
        },
        "typologies": [
          { "type": "3 BHK Grande", "carpetSqFt": "1185 - 1396", "priceInr": 20900000, "priceUsd": 241600, "priceAed": 912600 },
          { "type": "3.5 BHK Royal Suite with Study", "carpetSqFt": "1450", "priceInr": 24500000, "priceUsd": 283200, "priceAed": 1070000 },
          { "type": "4 BHK Imperial Haven", "carpetSqFt": "1559 - 2105", "priceInr": 31500000, "priceUsd": 364100, "priceAed": 1375000 },
          { "type": "5 BHK Sky Penthouse", "carpetSqFt": "2600 - 3416", "priceInr": 52500000, "priceUsd": 606900, "priceAed": 2293000 }
        ],
        "amenityHighlights": [
          "25,000 sq.ft. Rooftop Sanctuary on 37th Floor (~120m height)",
          "50m Temperature-Regulated Heated Infinity Sky Pool",
          "Tournament-Grade Rooftop Glass Padel Tennis Court",
          "Computerized Stargazing Celestial Observatory",
          "400m Cushioned Sky Jogging Loop suspended above skyline",
          "Mivan Monolithic RCC Aluminum Formwork with 38 dB Acoustic Fenestrations"
        ],
        "canonicalCorridorsCount": getAllProgrammaticSlugs().length,
        "programmaticCorridors": Object.keys(PROGRAMMATIC_PAGES).map(slug => ({
          "slug": slug,
          "url": `https://${CANONICAL_HOST}${slug}`,
          "category": PROGRAMMATIC_PAGES[slug].category,
          "title": PROGRAMMATIC_PAGES[slug].title
        })),
        "lastUpdated": new Date().toISOString()
      };

      return new Response(JSON.stringify(kgPayload, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
          'Access-Control-Allow-Origin': '*',
          'X-Robots-Tag': 'index, follow'
        }
      });
    }

    // =========================================================================
    // 4c. Edge-Native Lead Intake Webhook with Spam Mitigation
    // =========================================================================
    if (pathname === '/_edge/submit-lead') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json().catch(() => ({}));

          // Silent Bot Honeypot: Automated spambots filling hidden honeypot fields get filtered silently
          if (body.company_website || body.fax_number || body.url_source || body.website_url) {
            return new Response(JSON.stringify({
              success: true,
              leadId: 'ALT-' + Date.now().toString(36).toUpperCase(),
              message: 'Priority allocation registered under MahaRERA P52100079692.'
            }), {
              status: 200,
              headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
            });
          }

          // Input sanitization against XSS, HTML tag injection, CRLF injection & command characters
          const sanitize = (str, maxLen = 120) => {
            return String(str || '')
              .replace(/<[^>]*>?/gm, '')
              .replace(/[<>\"\'&;`\\]/g, '')
              .replace(/[\r\n\t]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, maxLen);
          };

          const name = sanitize(body.name || 'Valued Patron', 80) || 'Valued Patron';
          const phone = String(body.phone || body.mobile || '').replace(/[^\d+ ]/g, '').slice(0, 25).trim();

          // Strict RFC email validation to eliminate email header injection
          const rawEmail = String(body.email || '').trim().toLowerCase();
          const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
          const email = (emailRegex.test(rawEmail) && rawEmail.length <= 100) ? rawEmail : '';

          const typology = sanitize(body.typology || '3/4 BHK Luxury Residence', 60);
          const intent = sanitize(body.intent || 'VIP Site Visit & Floor Plans', 80);
          const source = sanitize(body.source || 'Website Showcase', 80);

          if (!phone || phone.replace(/\D/g, '').length < 8) {
            return new Response(JSON.stringify({ success: false, error: 'Valid phone number required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
            });
          }

          // 1. Edge Rate Limiter (Max 5 submissions per 60s per client IP)
          const rawClientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
          const clientIp = rawClientIp.replace(/[^\w.:]/g, '').slice(0, 45);
          if (env && env.ALTERO_LEADS_KV) {
            const rlKey = `rl:${clientIp}`;
            const currentHits = parseInt(await env.ALTERO_LEADS_KV.get(rlKey) || '0', 10);
            if (currentHits >= 5) {
              return new Response(JSON.stringify({
                success: false,
                error: 'Submission rate limit reached. Please connect directly via WhatsApp: +91 77440 09295'
              }), {
                status: 429,
                headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
              });
            }
            await env.ALTERO_LEADS_KV.put(rlKey, (currentHits + 1).toString(), { expirationTtl: 60 });
          }

          const leadId = 'ALT-' + Date.now().toString(36).toUpperCase();
          const edgeTimestamp = new Date().toISOString();

          const leadRecord = {
            id: leadId,
            name,
            phone,
            email: email || 'Not Provided',
            typology,
            intent,
            source,
            timestamp: edgeTimestamp,
            ipCountry: viewerCountry,
            ipCity: viewerCity,
            clientIp
          };

          // 2. Persist Lead into Cloudflare Distributed KV Storage
          if (env && env.ALTERO_LEADS_KV) {
            const kvPromise = (async () => {
              try {
                await env.ALTERO_LEADS_KV.put(`lead:${leadId}`, JSON.stringify(leadRecord), {
                  metadata: { name, phone, timestamp: edgeTimestamp }
                });
                const recentRaw = await env.ALTERO_LEADS_KV.get('index:recent_leads');
                const recentList = recentRaw ? JSON.parse(recentRaw) : [];
                recentList.unshift(leadId);
                await env.ALTERO_LEADS_KV.put('index:recent_leads', JSON.stringify(recentList.slice(0, 100)));
              } catch (kvErr) {
                console.error('KV Storage Error:', kvErr);
              }
            })();
            if (ctx && ctx.waitUntil) ctx.waitUntil(kvPromise);
          }

          // Standardize phone for email & WhatsApp notification
          const formattedPhone = (phone.startsWith('+'))
            ? phone
            : (phone.length === 10 && /^[6-9]/.test(phone) ? `+91 ${phone}` : `+${phone}`);

          // 3. Asynchronously dispatch lead notification email to propsmartrealty@gmail.com
          const emailPayload = {
            _subject: `New VIP Lead [${leadId}]: Lodha Altero Wakad - ${name} (${formattedPhone})`,
            _replyto: (email && email.includes('@')) ? email : 'propsmartrealty@gmail.com',
            _template: 'table',
            _captcha: 'false',
            Project: 'Lodha Altero Wakad, Pune',
            MahaRERA: 'P52100079692',
            Lead_ID: leadId,
            Full_Name: name,
            Phone_Number: formattedPhone,
            Email: email || 'Not Provided',
            Preferred_Typology: typology,
            Pre_Text_Intention: intent,
            Visitor_Geo: `${viewerCity}, ${viewerCountry}`,
            Source_Page: source,
            Timestamp: edgeTimestamp,
            Direct_WhatsApp: `https://wa.me/917744009295?text=${encodeURIComponent(`Hi ${name}, confirming your enquiry for Lodha Altero Wakad [Ref: ${leadId}].`)}`
          };

          const emailPromise = fetch('https://formsubmit.co/ajax/propsmartrealty@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(emailPayload)
          }).catch(e => {
            console.error('Email dispatch error:', e);
          });

          if (ctx && ctx.waitUntil) {
            ctx.waitUntil(emailPromise);
          }

          // 2. Construct formatted WhatsApp deep link with customer pre-text intention
          const waMessage = `Hi Lodha Altero Wakad Concierge,

I am inquiring regarding Lodha Altero Wakad:
• Reference ID: ${leadId}
• Name: ${name}
• Phone: ${formattedPhone}
• Preferred Typology: ${typology}
• My Intention: ${intent}
• Location: ${viewerCity}, ${viewerCountry}

Please connect me with the sales director and share official MahaRERA P52100079692 floor plans, cost sheet, and schedule my VIP site visit.`;

          const whatsappRedirectUrl = `https://wa.me/917744009295?text=${encodeURIComponent(waMessage)}`;

          return new Response(JSON.stringify({
            success: true,
            leadId,
            edgeTimestamp,
            country: viewerCountry,
            city: viewerCity,
            emailDispatchedTo: 'propsmartrealty@gmail.com',
            whatsappRedirectUrl,
            message: 'Priority allocation registered under MahaRERA P52100079692. Lead sent to propsmartrealty@gmail.com.'
          }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: 'Failed to process lead' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' }
          });
        }
      }
    }

    // Unmatched _edge endpoints return authoritative 404 JSON response
    if (pathname.startsWith('/_edge/')) {
      return new Response(JSON.stringify({ error: 'Not Found', message: 'Unknown Edge API endpoint' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // =========================================================================
    // 5. Dynamic Programmatic XML Sitemap Generation (10,000+ routes)
    // =========================================================================
    if (pathname === '/sitemap-programmatic.xml' || pathname === '/sitemaps/sitemap-programmatic.xml' || pathname === '/sitemap-programmatic-index.xml') {
      const sitemapIndexXml = getProgrammaticSitemapIndex(CANONICAL_HOST);
      return new Response(sitemapIndexXml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=43200, s-maxage=43200',
          'X-Robots-Tag': hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow'
        }
      });
    }

    const chunkMatch = pathname.match(/^\/sitemaps\/programmatic-([1-6])\.xml$/);
    if (chunkMatch) {
      const chunkIdx = parseInt(chunkMatch[1], 10);
      const chunkXml = getProgrammaticSitemapChunk(chunkIdx, CANONICAL_HOST);
      return new Response(chunkXml, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=43200, s-maxage=43200',
          'X-Robots-Tag': hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow'
        }
      });
    }

    // =========================================================================
    // 6. Dynamic Programmatic SEO Page Edge Rendering (10,000+ routes)
    // =========================================================================
    const progData = PROGRAMMATIC_PAGES[pathname] || resolveProgrammaticPage(pathname);
    if (progData) {
      const pageHtml = renderProgrammaticPage(url, progData);
      const progHeaders = new Headers();
      progHeaders.set('Content-Type', 'text/html; charset=utf-8');
      progHeaders.set('Cache-Control', 'public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800');
      progHeaders.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400, stale-if-error=604800');
      progHeaders.set('Vary', 'Accept-Encoding, Accept, cf-ipcountry');
      progHeaders.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
      progHeaders.set('X-Content-Type-Options', 'nosniff');
      progHeaders.set('X-Frame-Options', 'SAMEORIGIN');
      progHeaders.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
      progHeaders.set('Cross-Origin-Resource-Policy', 'same-origin');
      progHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      progHeaders.set('X-Permitted-Cross-Domain-Policies', 'none');
      progHeaders.set('X-DNS-Prefetch-Control', 'on');
      if (hostname === STAGING_HOST) {
        progHeaders.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
        progHeaders.set('X-Environment', 'staging');
      } else {
        progHeaders.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        progHeaders.set('X-Environment', 'production');
      }

      progHeaders.set('X-Edge-Engine', 'Cloudflare-Ultra-Hardened-Edge-Worker-v2.8');
      progHeaders.set('X-Canonical-Host', CANONICAL_HOST);
      progHeaders.set('X-Staging-Host', STAGING_HOST);
      progHeaders.set('X-Subdomain-Hardening', 'Enforced-altero.newlaunches.in-and-alterowakad.pages.dev');
      progHeaders.set('X-Edge-Cache', 'MISS');
      progHeaders.set('Cache-Tag', `lodha-altero-programmatic, lodha-altero-${progData.categorySlug || 'general'}`);
      progHeaders.set('X-Viewer-Country', viewerCountry);
      progHeaders.set('X-Viewer-City', viewerCity);

      // Global NRI Localization: Dynamic currency hint & audience context
      const currencyMap = {
        US: 'USD', AE: 'AED', GB: 'GBP', SG: 'SGD', AU: 'AUD', CA: 'CAD',
        DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR',
        QA: 'QAR', SA: 'SAR', KW: 'KWD', OM: 'OMR', BH: 'BHD', JP: 'JPY'
      };
      const currencyHint = currencyMap[viewerCountry] || 'INR';
      progHeaders.set('X-Currency-Hint', currencyHint);
      progHeaders.set('X-Target-Audience', viewerCountry === 'IN' ? 'Domestic-India' : `Global-NRI-${viewerCountry}`);

      // Military-Grade Content Security Policy & Privacy Directives
      progHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data: blob:; connect-src 'self' https:; frame-src 'self' https://challenges.cloudflare.com; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://formsubmit.co; upgrade-insecure-requests;");
      progHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), autoplay=(), fullscreen=(self), browsing-topics=(), interest-cohort=(), screen-wake-lock=()');

      if (request.cf) {
        progHeaders.set('X-Edge-Colo', request.cf.colo || 'BOM');
        progHeaders.set('X-Edge-Region', request.cf.region || 'Maharashtra');
        if (request.cf.verifiedBot) {
          progHeaders.set('X-Verified-Bot', 'Cloudflare-Verified-Search-Crawler');
        }
      }

      // Preload critical assets with responsive mobile and desktop viewports
      const isVerificationAgent = /google-site-verification|googlebot/i.test(userAgent);
      if (!isVerificationAgent) {
        progHeaders.append('Link', '</assets/hero_mobile.jpg>; rel=preload; as=image; media="(max-width: 767px)"; fetchpriority=high');
        progHeaders.append('Link', '</assets/hero_banner.jpg>; rel=preload; as=image; media="(min-width: 768px)"; fetchpriority=high');
        progHeaders.append('Link', '</styles.css>; rel=preload; as=style');
        progHeaders.append('Link', '<https://fonts.googleapis.com>; rel=preconnect');
        progHeaders.append('Link', '<https://fonts.gstatic.com>; rel=preconnect; crossorigin');
      }

      const progResponse = new Response(pageHtml, {
        status: 200,
        headers: progHeaders
      });

      if (cache && isGetRequest && !isNoCacheQuery && ctx && ctx.waitUntil) {
        ctx.waitUntil(cache.put(cacheKey, progResponse.clone()));
      }

      return progResponse;
    }

    // =========================================================================
    // 7. Clean Article URL Resolution to Physical Article HTML Files
    // =========================================================================
    let isArticleRoute = false;
    let articleMeta = null;
    let assetRequest = request;

    const cleanArticleSlug = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    if (ARTICLE_SLUGS[cleanArticleSlug]) {
      isArticleRoute = true;
      articleMeta = ARTICLE_SLUGS[cleanArticleSlug];
      // Fetch directory path with trailing slash directly from env.ASSETS (resolves immediately to articles/<slug>/index.html)
      assetRequest = new Request(new URL(`${cleanArticleSlug}/`, request.url), request);
    } else if (pathname !== '/' && !STATIC_EXTENSIONS.test(pathname) && !pathname.startsWith('/_edge/') && !pathname.startsWith('/sitemap')) {
      // Return authoritative 404 Not Found for non-existent routes to prevent Soft 404 penalties
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404: Page Not Found | Lodha Altero Wakad</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-[#0C0A09] text-stone-200 font-sans min-h-screen flex items-center justify-center p-6 text-center">
  <div class="max-w-md space-y-6">
    <div class="inline-block p-4 border border-amber-600/30 rounded-2xl bg-amber-950/20">
      <span class="text-amber-400 font-serif text-6xl font-light">404</span>
    </div>
    <h1 class="font-serif text-3xl text-white">Residence Not Found</h1>
    <p class="text-stone-400 text-sm leading-relaxed">
      The requested floor plan, corridor guide, or document does not exist. Please visit our official showcase.
    </p>
    <div class="pt-4">
      <a href="/" class="inline-block bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 font-bold px-6 py-3 rounded-lg hover:brightness-110 transition-all text-xs tracking-wider uppercase">
        Return to Official Showcase
      </a>
    </div>
  </div>
</body>
</html>`,
        {
          status: 404,
          statusText: 'Not Found',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Robots-Tag': 'noindex, nofollow, noarchive',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
            'X-Canonical-Host': CANONICAL_HOST,
            'X-Staging-Host': STAGING_HOST,
            'X-Edge-Engine': 'Cloudflare-Ultra-Hardened-Edge-Worker-v2.8'
          }
        }
      );
    }

    // =========================================================================
    // 6. Asset Fetching (Pages / Worker Static Storage)
    // =========================================================================
    let response;
    try {
      if (env.ASSETS) {
        response = await env.ASSETS.fetch(assetRequest);
      } else {
        response = await fetch(assetRequest);
      }
    } catch (err) {
      return new Response('Edge Gateway Temporary Error', { status: 502 });
    }

    // Prevent Soft 404: If 404 on unknown clean URL, serve root index.html with genuine 404 status and noindex
    if (response.status === 404 && !STATIC_EXTENSIONS.test(pathname)) {
      const fallbackReq = new Request(new URL('/', request.url), request);
      if (env.ASSETS) {
        const notFoundRes = await env.ASSETS.fetch(fallbackReq);
        const notFoundHeaders = new Headers(notFoundRes.headers);
        notFoundHeaders.set('X-Robots-Tag', 'noindex, nofollow');
        notFoundHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        notFoundHeaders.set('X-Canonical-Host', CANONICAL_HOST);
        notFoundHeaders.set('X-Staging-Host', STAGING_HOST);
        return new Response(notFoundRes.body, {
          status: 404,
          statusText: 'Not Found',
          headers: notFoundHeaders
        });
      }
    }

    const headers = new Headers(response.headers);
    const contentType = headers.get('Content-Type') || '';

    // =========================================================================
    // 7. Security & Performance Headers (Google SEO Factor)
    // =========================================================================
    headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=(), autoplay=(), fullscreen=(self), browsing-topics=(), interest-cohort=(), screen-wake-lock=()');
    headers.set('Timing-Allow-Origin', '*');
    headers.set('X-Permitted-Cross-Domain-Policies', 'none');
    headers.set('X-DNS-Prefetch-Control', 'on');

    // ── STAGING & PRODUCTION SUBDOMAIN HARDENING ──
    if (hostname === STAGING_HOST) {
      headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      headers.set('X-Environment', 'staging');
    } else {
      headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      headers.set('X-Environment', 'production');
    }

    headers.set('X-Edge-Engine', 'Cloudflare-Ultra-Hardened-Edge-Worker-v2.8');
    headers.set('Cache-Tag', 'lodha-altero-main, lodha-altero-root, lodha-altero-pune');
    headers.set('X-Viewer-Country', viewerCountry);
    headers.set('X-Viewer-City', viewerCity);

    // Global NRI Localization: Dynamic currency hint & audience context
    const currencyMap = {
      US: 'USD', AE: 'AED', GB: 'GBP', SG: 'SGD', AU: 'AUD', CA: 'CAD',
      DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR',
      QA: 'QAR', SA: 'SAR', KW: 'KWD', OM: 'OMR', BH: 'BHD', JP: 'JPY'
    };
    const currencyHint = currencyMap[viewerCountry] || 'INR';
    headers.set('X-Currency-Hint', currencyHint);
    headers.set('X-Target-Audience', viewerCountry === 'IN' ? 'Domestic-India' : `Global-NRI-${viewerCountry}`);

    // ── CANONICAL AUTHORITY SIGNALS ── Force canonical host on every response
    headers.set('X-Canonical-Host', CANONICAL_HOST);
    headers.set('X-Staging-Host', STAGING_HOST);
    headers.set('X-Subdomain-Hardening', 'Enforced-altero.newlaunches.in-and-alterowakad.pages.dev');
    headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data: blob:; connect-src 'self' https:; frame-src 'self' https://challenges.cloudflare.com; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://formsubmit.co; upgrade-insecure-requests;");

    if (request.cf) {
      headers.set('X-Edge-Colo', request.cf.colo || 'BOM');
      headers.set('X-Edge-Region', request.cf.region || 'Maharashtra');
      if (request.cf.verifiedBot) {
        headers.set('X-Verified-Bot', 'Cloudflare-Verified-Search-Crawler');
      }
    }

    // =========================================================================
    // 8. Cache-Control Optimization
    // =========================================================================
    if (STATIC_EXTENSIONS.test(pathname)) {
      if (/\.(jpg|jpeg|webp|png|svg|woff2|woff)$/i.test(pathname)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('CDN-Cache-Control', 'max-age=31536000');
      } else if (pathname === '/sw.js') {
        headers.set('Cache-Control', 'public, max-age=0, must-revalidate, no-cache');
        headers.set('CDN-Cache-Control', 'max-age=0, no-cache, no-store');
        headers.set('Cloudflare-CDN-Cache-Control', 'max-age=0, no-cache, no-store');
        headers.set('Service-Worker-Allowed', '/');
        headers.set('Content-Type', 'application/javascript; charset=utf-8');
      } else if (pathname === '/manifest.webmanifest' || pathname === '/site.webmanifest') {
        headers.set('Content-Type', 'application/manifest+json; charset=utf-8');
        headers.set('Cache-Control', 'public, max-age=86400');
      } else if (/\.(css|js)$/i.test(pathname)) {
        headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        headers.set('CDN-Cache-Control', 'max-age=604800');
      } else if (pathname === '/robots.txt' || pathname.startsWith('/sitemap') || pathname === '/feed.xml' || pathname === '/llms.txt' || pathname === '/llms-full.txt' || pathname === '/.well-known/security.txt') {
        headers.set('Cache-Control', 'public, max-age=43200, s-maxage=43200');
        if (pathname.startsWith('/sitemap') && pathname.endsWith('.xml')) {
          headers.set('Content-Type', 'application/xml; charset=utf-8');
          headers.set('X-Robots-Tag', hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow');
        } else if (pathname === '/robots.txt') {
          headers.set('Content-Type', 'text/plain; charset=utf-8');
          headers.set('X-Robots-Tag', hostname === CANONICAL_HOST ? 'index, follow' : 'noindex, nofollow');
        } else if (pathname === '/feed.xml') {
          headers.set('Content-Type', 'application/rss+xml; charset=utf-8');
        } else if (pathname === '/llms.txt' || pathname === '/llms-full.txt' || pathname === '/.well-known/security.txt') {
          headers.set('Content-Type', 'text/plain; charset=utf-8');
          headers.set('Access-Control-Allow-Origin', '*');
        }
      }
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    // =========================================================================
    // 9. HTML Stream Transformation via Cloudflare HTMLRewriter
    // =========================================================================
    if (contentType.includes('text/html')) {
      headers.set('Cache-Control', 'public, max-age=0, s-maxage=604800, stale-while-revalidate=86400, stale-if-error=604800');
      headers.set('CDN-Cache-Control', 'max-age=604800, stale-while-revalidate=86400, stale-if-error=604800');
      headers.set('Vary', 'Accept-Encoding, Accept, cf-ipcountry');

      const isVerificationAgent = /google-site-verification|googlebot/i.test(userAgent);

      // Only emit Link preloads for non-verification requests (prevents 103 Early Hints from breaking legacy GSC verification parsers)
      if (!isVerificationAgent) {
        headers.append('Link', '</assets/hero_mobile.jpg>; rel=preload; as=image; media="(max-width: 767px)"; fetchpriority=high');
        headers.append('Link', '</assets/hero_banner.jpg>; rel=preload; as=image; media="(min-width: 768px)"; fetchpriority=high');
        headers.append('Link', '</styles.css>; rel=preload; as=style');
        headers.append('Link', '<https://fonts.googleapis.com>; rel=preconnect');
        headers.append('Link', '<https://fonts.gstatic.com>; rel=preconnect; crossorigin');
      }

      let rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', {
          element(el) {
            const liveCanonical = isArticleRoute ? `https://${CANONICAL_HOST}${cleanArticleSlug}` : `https://${CANONICAL_HOST}/`;
            el.setAttribute('href', liveCanonical);
          }
        })
        .on('meta[property="og:url"]', {
          element(el) {
            const liveUrl = isArticleRoute ? `https://${CANONICAL_HOST}${cleanArticleSlug}` : `https://${CANONICAL_HOST}/`;
            el.setAttribute('content', liveUrl);
          }
        })
        .on('meta[property="og:image"]', {
          element(el) {
            el.setAttribute('content', `https://${CANONICAL_HOST}/assets/hero_banner.jpg`);
          }
        })
        .on('meta[name="twitter:image"]', {
          element(el) {
            el.setAttribute('content', `https://${CANONICAL_HOST}/assets/hero_banner.jpg`);
          }
        })
        .on('meta[name="twitter:url"]', {
          element(el) {
            const liveUrl = isArticleRoute ? `https://${CANONICAL_HOST}${cleanArticleSlug}` : `https://${CANONICAL_HOST}/`;
            el.setAttribute('content', liveUrl);
          }
        })
        .on('head', {
          element(el) {
            el.prepend('<meta name="google-site-verification" content="7GXqitp4hGBCcyWfSC0SwGGKINHqogR716eQEiD0vWA">\n<meta name="google-site-verification" content="QFK7VqRHrq-mZJgA2maflTA7RLYKX1hvCK8B2djWkqI">\n', { html: true });
            el.append('<meta name="edge-rendered" content="cloudflare-worker-pune-optimized">', { html: true });
            el.append(`<meta name="viewer-country" content="${viewerCountry}">`, { html: true });
            el.append(`<meta name="viewer-city" content="${viewerCity}">`, { html: true });
            const markdownUrl = isArticleRoute ? `https://${CANONICAL_HOST}${cleanArticleSlug}.md` : `https://${CANONICAL_HOST}/index.md`;
            el.append(`<link rel="alternate" type="text/markdown" href="${markdownUrl}">`, { html: true });
            el.append(`<link rel="alternate" type="application/json" href="https://${CANONICAL_HOST}/_edge/knowledge-graph.json" title="Semantic Knowledge Graph">`, { html: true });
            el.append(`<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": [
        "/articles/lodha-altero-wakad-price-list-cost-sheet-2026",
        "/articles/lodha-altero-connectivity-hinjewadi-phoenix-mall",
        "/articles/lodha-altero-floor-plans-sky-duplex-penthouses",
        "/articles/maharera-p52100079692-statutory-compliance",
        "/articles/25000-sqft-rooftop-sky-club-infinity-pool",
        "/articles/wakad-real-estate-investment-thesis-2026",
        "/articles/wakad-vs-baner-vs-mahalunge-hinjewadi",
        "/articles/pune-real-estate-macro-trends-east-vs-west",
        "/articles/lodha-pune-residential-ecosystem",
        "/articles/wakad-hinjewadi-luxury-3bhk-4bhk-5bhk-carpet-area-analysis",
        "/articles/pune-luxury-real-estate-market-report-wakad-hinjewadi-baner",
        "/residences/3-bhk-luxury-wakad",
        "/pricing/lodha-wakad-cost-sheet",
        "/transit/hinjewadi-it-park-commute"
      ],
      "eagerness": "moderate"
    }
  ],
  "prefetch": [
    {
      "source": "document",
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": "/_edge/*" } }
        ]
      },
      "eagerness": "conservative"
    }
  ]
}
</script>`, { html: true });
            if (isSearchCrawler) {
              el.append('<meta name="crawler-intent" content="verified-search-crawler">', { html: true });
            }
            if (isAiCrawler) {
              el.append(`<meta name="ai-retrieval-source" content="https://${CANONICAL_HOST}/llms-full.txt">`, { html: true });
            }
            if (isArticleRoute && articleMeta) {
              el.append(`<meta name="article-title" content="${articleMeta.title}">`, { html: true });
            }
          }
        });

      if (viewerCountry !== 'IN' && !isSearchCrawler && !isAiCrawler) {
        const COUNTRY_NAMES = {
          'US': 'United States • $ USD',
          'AE': 'UAE & Dubai • AED د.إ',
          'GB': 'United Kingdom • £ GBP',
          'SG': 'Singapore • S$ SGD',
          'AU': 'Australia • A$ AUD',
          'CA': 'Canada • C$ CAD',
          'DE': 'Germany & EU • € EUR',
          'QA': 'Qatar • QAR ر.ق',
          'SA': 'Saudi Arabia • SAR ر.س',
          'KW': 'Kuwait • KWD د.ك',
          'OM': 'Oman • OMR ر.ع'
        };
        const countryLabel = COUNTRY_NAMES[viewerCountry] || `${viewerCountry} • Global NRI Desk`;
        rewriter = rewriter.on('body', {
          element(el) {
            const nriStrip = `
<div id="nri-concierge-strip" style="background: linear-gradient(90deg, #141210 0%, #1f1b16 100%); border-bottom: 1px solid rgba(212,175,55,0.35); color: #FAF7F2; padding: 10px 20px; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 99999;">
  <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
    <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#22c55e;"></span>
    <span><strong>Global NRI Priority Desk (${countryLabel}):</strong> Direct Builder Inventory for Lodha Altero Wakad, Zero Stamp Surcharge, Virtual 3D Walkthroughs &amp; Complete FEMA Repatriation Compliance.</span>
  </div>
  <div style="display: flex; align-items: center; gap: 12px; margin-left: 12px; flex-shrink: 0;">
    <a href="https://wa.me/917744009295?text=Hello%20Lodha%20Altero%20Concierge%2C%20I%20am%20an%20NRI%20investor%20from%20${viewerCountry}.%20Please%20share%20floor%20plans%2C%20inventory%20and%20NRI%20payment%20schedules." target="_blank" rel="noopener noreferrer" style="color: #D4AF37; text-decoration: none; font-weight: 600; font-size: 12px; border: 1px solid rgba(212,175,55,0.4); padding: 5px 12px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px; background: rgba(212,175,55,0.08);">Connect with NRI Director &rarr;</a>
    <button onclick="document.getElementById('nri-concierge-strip').style.display='none'" style="background: none; border: none; color: #a8a29e; font-size: 16px; cursor: pointer; line-height: 1; padding: 0 4px;" aria-label="Dismiss">&times;</button>
  </div>
</div>`;
            el.prepend(nriStrip, { html: true });
          }
        });
      }

      // If viewing an article URL, ensure page title and meta description match exactly
      if (isArticleRoute && articleMeta) {
        const fullTitle = articleMeta.title.includes('Lodha Altero') 
          ? articleMeta.title 
          : `${articleMeta.title} | Lodha Altero Wakad`;

        rewriter = rewriter
          .on('title', {
            element(el) {
              el.setInnerContent(fullTitle);
            }
          })
          .on('meta[name="description"]', {
            element(el) {
              el.setAttribute('content', articleMeta.desc);
            }
          })
          .on('meta[property="og:title"]', {
            element(el) {
              el.setAttribute('content', fullTitle);
            }
          })
          .on('meta[property="og:description"]', {
            element(el) {
              el.setAttribute('content', articleMeta.desc);
            }
          });
      }

      headers.set('X-Edge-Cache', 'MISS');

      const transformedResponse = rewriter.transform(new Response(response.body, {
        status: 200,
        headers
      }));

      // Cache HTML at the Cloudflare Edge PoP for instantaneous subsequent hits
      if (cache && isGetRequest && ctx && ctx.waitUntil) {
        ctx.waitUntil(cache.put(cacheKey, transformedResponse.clone()));
      }

      return transformedResponse;
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
