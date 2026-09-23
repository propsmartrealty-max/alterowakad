const fs = require('fs');
const zlib = require('zlib');

try {
  const buffer = fs.readFileSync('lodha_full.html');
  const decompressed = zlib.gunzipSync(buffer).toString('utf-8');
  console.log('Successfully decompressed HTML! Length:', decompressed.length);
  fs.writeFileSync('lodha_decompressed.html', decompressed);

  // Extract all images
  const imgMatches = [...decompressed.matchAll(/(?:src|srcset|data-src|data-lazy|href)=["']([^"']+\.(?:jpg|jpeg|png|webp|svg)[^"']*)["']/gi)];
  const urls = [...new Set(imgMatches.map(m => m[1]))];
  console.log(`Found ${urls.length} images/assets in official Lodha page:`);
  console.log(urls.slice(0, 30));

  fs.writeFileSync('lodha_extracted_assets.json', JSON.stringify(urls, null, 2));

  // Search for floor plan, gallery, layout keywords in decompressed HTML
  ['floor', 'plan', 'layout', 'gallery', 'amenit', 'sanctuary', 'overview', 'bhk'].forEach(kw => {
    const count = (decompressed.match(new RegExp(kw, 'gi')) || []).length;
    console.log(`Keyword '${kw}' count: ${count}`);
  });
} catch (e) {
  console.error('Decompression error:', e.message);
}
