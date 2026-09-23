const fs = require('fs');
const { execSync } = require('child_process');

const queue = JSON.parse(fs.readFileSync('downloads_queue.json', 'utf8'));

queue.forEach((item, idx) => {
  try {
    console.log(`[${idx+1}/${queue.length}] Downloading ${item.dest}...`);
    execSync(`curl -sL --compressed -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" "${item.url}" -o "${item.dest}"`, { timeout: 20000 });
    const stat = fs.statSync(item.dest);
    console.log(`  -> Saved ${item.dest} (${stat.size} bytes)`);
  } catch (err) {
    console.error(`  -> Failed ${item.dest}:`, err.message);
  }
});
