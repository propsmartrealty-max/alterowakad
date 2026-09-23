const https = require('https');
const fs = require('fs');

const url = 'https://www.lodhagroup.com/projects/residential-property-in-pune/lodha-altero-wakad';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
    return;
  }
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('HTML size:', data.length);
    fs.writeFileSync('lodha_full.html', data);

    // Extract all image sources
    const imgMatches = [...data.matchAll(/(?:src|srcset|data-src|data-lazy|href)=["']([^"']+\.(?:jpg|jpeg|png|webp|svg))["']/gi)];
    const urls = [...new Set(imgMatches.map(m => m[1]))];
    console.log(`Found ${urls.length} images/assets.`);
    fs.writeFileSync('extracted_urls.json', JSON.stringify(urls, null, 2));

    // Also look specifically for gallery, floor plans, amenities
    const sections = ['floor', 'plan', 'layout', 'gallery', 'amenit', 'sanctuary', 'overview'];
    sections.forEach(sec => {
      const regex = new RegExp(`[^<>]*${sec}[^<>]*`, 'gi');
      const matches = data.match(regex) || [];
      console.log(`Matches for '${sec}': ${matches.length}`);
    });
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
