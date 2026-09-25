/**
 * Lodha Altero Wakad — High-Performance Edge-Aware Service Worker
 * Provides offline resilience, instant floor plan caching, and 100/100 Core Web Vitals caching.
 */

const CACHE_NAME = 'lodha-altero-v2.8';
const OFFLINE_URL = '/';

const PRECACHE_ASSETS = [
  '/',
  '/styles.css',
  '/script.js',
  '/manifest.webmanifest',
  '/assets/hero_mobile.jpg',
  '/assets/hero_banner.jpg',
  '/assets/favicon.svg',
  '/assets/favicon-32x32.png',
  '/assets/apple-touch-icon.png',
  '/assets/logos/lodha_altero_partner_logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-caching non-fatal issue:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Bypass non-GET and edge indexing endpoints
  if (request.method !== 'GET' || url.pathname.startsWith('/_edge/')) {
    return;
  }

  // Network-first strategy for navigation / HTML requests
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallback = await caches.match(OFFLINE_URL);
          return fallback || new Response('Offline - Lodha Altero Wakad', { status: 503, headers: { 'Content-Type': 'text/plain' } });
        })
    );
    return;
  }

  // Cache-first for images, fonts, styles, scripts
  if (/\.(jpg|jpeg|webp|png|svg|woff2|woff|css|js)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Revalidate in background
          fetch(request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default fetch
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    })
  );
});
