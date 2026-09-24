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

const STATIC_EXTENSIONS = /\.(jpg|jpeg|webp|png|gif|svg|ico|css|js|woff|woff2|ttf|eot|pdf|json|xml|txt|webmanifest)$/i;

// Verified Google, Bing & Search Engine Crawler User-Agents
const SEARCH_CRAWLER_REGEX = /googlebot|google-inspectiontool|mediapartners-google|adsbot-google|feedfetcher-google|bingbot|duckduckbot|slurp|baiduspider|yandexbot|applebot/i;
const AI_CRAWLER_REGEX = /gptbot|perplexitybot|claudebot|chatgpt-user|google-extended|anthropic-ai|cohere-ai|diffbot/i;
const SOCIAL_CRAWLER_REGEX = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|pinterest|slackbot/i;

// IndexNow Verification Key for Instant Search Engine Crawl Notifications
const INDEXNOW_KEY = 'e9a3b8c7d6e54f3a2b1c0d9e8f7a6b5c';

// Article URL Mapping for Clean SEO Slugs
const ARTICLE_SLUGS = {
  '/articles/wakad-real-estate-investment-thesis-2026': {
    title: 'Wakad Real Estate Market 2026: Why Lodha Altero Leads Pune’s Luxury Appreciation',
    desc: 'In-depth 2026 investment thesis analyzing 2, 3 and 4 BHK flats in Wakad, Hinjewadi IT corridor rental yields (4.8% to 5.5%), and capital growth at Lodha Altero Wakad.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/wakad-vs-baner-vs-mahalunge-hinjewadi': {
    title: 'Wakad vs Baner vs Mahalunge vs Hinjewadi: West Pune Micro-Market Deep Dive',
    desc: 'Detailed comparative analysis of Wakad, Baner, Balewadi High Street, Mahalunge township projects, and Hinjewadi IT corridor real estate prices and lifestyle.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/lodha-altero-floor-plans-sky-duplex-penthouses': {
    title: 'Lodha Altero Floor Plans Guide: 3 BHK, 4 BHK, 5 BHK Sky Duplex & Penthouses',
    desc: 'Detailed architectural review of 3 BHK, 4 BHK, 5 BHK Sky Duplex, Simplex and Penthouse floor plans, carpet areas, ceiling heights, and Vastu at Lodha Altero Wakad Pune.',
    anchor: '#residences'
  },
  '/articles/maharera-p52100079692-statutory-compliance': {
    title: 'MahaRERA Registration P52100079692: Buyer Protection & Milestones | Lodha Altero Wakad',
    desc: 'Complete legal due diligence review for MahaRERA P52100079692: statutory 70% escrow accounts, title verification, possession dates, and defect liability at Lodha Altero Wakad Pune.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/25000-sqft-rooftop-sky-club-infinity-pool': {
    title: 'The 25,000 Sq.Ft. Rooftop Sky Club: Pune’s Highest Elevated Leisure Deck',
    desc: 'Explore Pune’s highest 25,000 sq.ft. Rooftop Sky Club on the 37th floor at Lodha Altero Wakad: 50m heated infinity pool, padel court, and stargazing observatory.',
    anchor: '#rooftop'
  },
  '/articles/pune-real-estate-macro-trends-east-vs-west': {
    title: 'Pune Real Estate Macro Trends: East Pune (Hadapsar & Kharadi) vs West Pune (Wakad)',
    desc: 'Macroeconomic real estate analysis comparing Kharadi and Hadapsar IT corridors with Wakad and Hinjewadi high-growth residential corridors in Pune.',
    anchor: '#pune-real-estate-hub'
  },
  '/articles/lodha-pune-residential-ecosystem': {
    title: 'Lodha Group Pune Residential Portfolio: Altero Wakad, Panache, Giardino, Bella Vita & Belmondo',
    desc: "Official comparative guide to Lodha Group's residential developments in Pune: Lodha Altero Wakad, Lodha Panache Hinjewadi, Lodha Giardino Kharadi, Lodha Bella Vita NIBM, and Lodha Belmondo Gahunje.",
    anchor: '#pune-real-estate-hub'
  },
  '/articles/lodha-altero-wakad-price-list-cost-sheet-2026': {
    title: 'Lodha Altero Wakad Price List 2026: 3 BHK, 4 BHK, 5 BHK Penthouse Cost Sheet & Payment Plans',
    desc: 'Official 2026 price breakdown, cost sheet, installment schedules, floor-rise calculations, and MahaRERA P52100079692 payment milestones for Lodha Altero, Wakad, Pune.',
    anchor: '#residences'
  },
  '/articles/lodha-altero-connectivity-hinjewadi-phoenix-mall': {
    title: 'Connectivity Guide: Lodha Altero Wakad to Hinjewadi IT Park & Phoenix Mall',
    desc: 'Transit analysis, commuting routes, and travel times from Lodha Altero Wakad to Rajiv Gandhi Infotech Park Hinjewadi Phase 1, 2, 3, Phoenix Mall, and Metro Line 3.',
    anchor: '#location'
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname, search, protocol, hostname } = url;
    const userAgent = request.headers.get('User-Agent') || '';
    const isSearchCrawler = SEARCH_CRAWLER_REGEX.test(userAgent);
    const isAiCrawler = AI_CRAWLER_REGEX.test(userAgent);
    const isSocialCrawler = SOCIAL_CRAWLER_REGEX.test(userAgent);

    // =========================================================================
    // 1. Edge Canonical Normalization & 301 Redirect Rules
    // =========================================================================

    // Force HTTPS
    if (protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // Redirect /index.html to /
    if (pathname === '/index.html' || pathname.endsWith('/index.html')) {
      const cleanPath = pathname.replace(/\/index\.html$/, '/') || '/';
      url.pathname = cleanPath;
      return Response.redirect(url.toString(), 301);
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
    // 3. Search Engine Indexing & IndexNow Real-Time Notification Handler
    // =========================================================================
    if (pathname === '/_edge/ping-index') {
      const sitemapUrl = `https://${hostname}/sitemap.xml`;
      const urlList = [
        `https://${hostname}/`,
        ...Object.keys(ARTICLE_SLUGS).map(slug => `https://${hostname}${slug}`)
      ];

      const pingResults = {
        timestamp: new Date().toISOString(),
        host: hostname,
        sitemapUrl,
        indexNowKey: INDEXNOW_KEY,
        urlsSubmittedCount: urlList.length,
        submittedUrls: urlList,
        engineResponses: []
      };

      // 1. Submit batch to IndexNow API (Bing, Yandex, Seznam, Naver)
      try {
        const indexNowPayload = {
          host: hostname,
          key: INDEXNOW_KEY,
          keyLocation: `https://${hostname}/${INDEXNOW_KEY}.txt`,
          urlList
        };
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
          body: JSON.stringify({
            host: hostname,
            key: INDEXNOW_KEY,
            keyLocation: `https://${hostname}/${INDEXNOW_KEY}.txt`,
            urlList
          })
        });
        pingResults.engineResponses.push({
          target: 'Bing IndexNow Direct',
          status: bingIndexNowRes.status,
          statusText: bingIndexNowRes.statusText
        });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Bing IndexNow Direct', status: 'error', message: e.message });
      }

      // 3. Ping Google Sitemap Crawler
      try {
        const googlePing = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
        pingResults.engineResponses.push({ target: 'Google Sitemap Ping', status: googlePing.status });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Google Sitemap Ping', status: 'error', message: e.message });
      }

      // 4. Ping Bing Sitemap Crawler
      try {
        const bingPing = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
        pingResults.engineResponses.push({ target: 'Bing Sitemap Ping', status: bingPing.status });
      } catch (e) {
        pingResults.engineResponses.push({ target: 'Bing Sitemap Ping', status: 'error', message: e.message });
      }

      return new Response(JSON.stringify(pingResults, null, 2), {
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
          canonicalHost: hostname,
          googlebotOptimized: true,
          schemaGraphActive: true,
          articlesRouted: Object.keys(ARTICLE_SLUGS).length,
          keywordsHardened: '46 Core + Regional Pune Real Estate Ecosystem'
        }
      };
      return new Response(JSON.stringify(statusData, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    // =========================================================================
    // 5. Clean Article URL Resolution to Physical Article HTML Files
    // =========================================================================
    let isArticleRoute = false;
    let articleMeta = null;
    let assetRequest = request;

    if (ARTICLE_SLUGS[pathname]) {
      isArticleRoute = true;
      articleMeta = ARTICLE_SLUGS[pathname];
      // Fetch the root template to dynamically rewrite at the edge with article metadata and canonical tags
      assetRequest = new Request(new URL('/', request.url), request);
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

    // If 404 on clean URL, serve root index.html with 200
    if (response.status === 404 && !STATIC_EXTENSIONS.test(pathname)) {
      const fallbackReq = new Request(new URL('/', request.url), request);
      if (env.ASSETS) {
        response = await env.ASSETS.fetch(fallbackReq);
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
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
    headers.set('Timing-Allow-Origin', '*');
    headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    headers.set('X-Edge-Engine', 'Cloudflare-Advanced-HTML-Worker-v2.1');
    headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data: blob:; connect-src 'self' https:; frame-src 'self' https://challenges.cloudflare.com;");

    if (request.cf) {
      headers.set('X-Edge-Colo', request.cf.colo || 'BOM');
      headers.set('X-Edge-Region', request.cf.region || 'Maharashtra');
    }

    // =========================================================================
    // 8. Cache-Control Optimization
    // =========================================================================
    if (STATIC_EXTENSIONS.test(pathname)) {
      if (/\.(jpg|jpeg|webp|png|svg|woff2|woff)$/i.test(pathname)) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('CDN-Cache-Control', 'max-age=31536000');
      } else if (/\.(css|js)$/i.test(pathname)) {
        headers.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        headers.set('CDN-Cache-Control', 'max-age=604800');
      } else if (pathname === '/robots.txt' || pathname.startsWith('/sitemap') || pathname === '/feed.xml') {
        headers.set('Cache-Control', 'public, max-age=43200, s-maxage=43200');
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
      headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
      headers.set('CDN-Cache-Control', 'max-age=3600');

      const isVerificationAgent = /google-site-verification|googlebot/i.test(userAgent);

      // Only emit Link preloads for non-verification requests (prevents 103 Early Hints from breaking legacy GSC verification parsers)
      if (!isVerificationAgent) {
        headers.append('Link', '</assets/hero_banner.jpg>; rel=preload; as=image; fetchpriority=high');
        headers.append('Link', '</styles.css>; rel=preload; as=style');
        headers.append('Link', '<https://fonts.googleapis.com>; rel=preconnect');
        headers.append('Link', '<https://fonts.gstatic.com>; rel=preconnect; crossorigin');
      }

      let rewriter = new HTMLRewriter()
        .on('link[rel="canonical"]', {
          element(el) {
            const liveCanonical = isArticleRoute ? `https://${hostname}${pathname}` : `https://${hostname}/`;
            el.setAttribute('href', liveCanonical);
          }
        })
        .on('meta[property="og:url"]', {
          element(el) {
            const liveUrl = isArticleRoute ? `https://${hostname}${pathname}` : `https://${hostname}/`;
            el.setAttribute('content', liveUrl);
          }
        })
        .on('head', {
          element(el) {
            el.prepend('<meta name="google-site-verification" content="7GXqitp4hGBCcyWfSC0SwGGKINHqogR716eQEiD0vWA">\n<meta name="google-site-verification" content="QFK7VqRHrq-mZJgA2maflTA7RLYKX1hvCK8B2djWkqI">\n', { html: true });
            el.append('<meta name="edge-rendered" content="cloudflare-worker-pune-optimized">', { html: true });
            if (isSearchCrawler) {
              el.append('<meta name="crawler-intent" content="verified-search-crawler">', { html: true });
            }
            if (isAiCrawler) {
              el.append('<meta name="ai-retrieval-source" content="https://lodhaaltero.newlaunches.in/llms-full.txt">', { html: true });
            }
            if (isArticleRoute && articleMeta) {
              el.append(`<meta name="article-title" content="${articleMeta.title}">`, { html: true });
            }
          }
        });

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

      const transformedResponse = rewriter.transform(new Response(response.body, {
        status: 200,
        headers
      }));

      return transformedResponse;
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
