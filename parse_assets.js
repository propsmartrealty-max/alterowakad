const fs = require('fs');

const files = ['lodha_real.html', 'lodha_amenities.html', 'lodha_location.html', 'lodha_gallery.html'];
const allImages = new Set();
const allContent = {};

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  allContent[f] = content;

  // Extract all images
  const matches = content.matchAll(/(?:src|srcset|data-src|data-lazy|href)=["']([^"']+\.(?:jpg|jpeg|png|webp|svg)[^"']*)["']/gi);
  for (const m of matches) {
    let raw = m[1].trim();
    if (raw.startsWith('//')) raw = 'https:' + raw;
    else if (raw.startsWith('/')) raw = 'https://www.lodhagroup.com' + raw;
    allImages.add(raw);
  }
});

const imageList = [...allImages];
console.log(`Total unique image assets found across Lodha Altero pages: ${imageList.length}`);

// Categorize images
const alteroSpecific = imageList.filter(u => /altero|wakad|pune/i.test(u));
const galleryImages = imageList.filter(u => /gallery|project|amenit|banner|spotlight|floor|plan|layout|spec/i.test(u));

console.log('\n--- Altero & Wakad specific images ---');
console.log(alteroSpecific);

console.log('\n--- Gallery / Amenity / Project images ---');
console.log(galleryImages.slice(0, 40));

fs.writeFileSync('lodha_parsed_assets.json', JSON.stringify({
  alteroSpecific,
  galleryImages,
  allImages: imageList
}, null, 2));
