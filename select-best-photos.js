const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

const downloadsDir = '/Users/m1pro/Downloads';
const uploadsDir = '/Users/m1pro/.gemini/antigravity-ide/brain/6015178b-0d31-4bd9-9529-36e4ceb50f81';
const outputDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images/best_processed';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Group Downloads by date prefix (e.g., photo_YYYY-MM-DD HH)
const files = fs.readdirSync(downloadsDir).filter(f => f.startsWith('photo_') && f.endsWith('.jpeg'));

const groups = {};
files.forEach(file => {
  // photo_2025-09-04 15.30.28.jpeg
  // let's group by date and hour to be safe, or maybe just the day if they are distinct
  // Actually, some days have multiple times (e.g. 21.34 and 21.19)
  // Let's group by the first 19 chars: "photo_2025-09-04 15" (up to hour)
  // or maybe group by the exact minute if they are bursts. Let's group by up to the minute: "photo_2025-09-04 15.30"
  const match = file.match(/photo_(\d{4}-\d{2}-\d{2} \d{2}\.\d{2})/);
  if (match) {
    const key = match[1];
    if (!groups[key]) groups[key] = [];
    groups[key].push(file);
  } else {
    groups[file] = [file];
  }
});

const bestPhotos = [];
for (const key in groups) {
  const groupFiles = groups[key];
  // pick largest file size
  let best = groupFiles[0];
  let maxSize = 0;
  for (const f of groupFiles) {
    const size = fs.statSync(path.join(downloadsDir, f)).size;
    if (size > maxSize) {
      maxSize = size;
      best = f;
    }
  }
  bestPhotos.push(path.join(downloadsDir, best));
}

// 2. Add chat uploads (unique by hash to avoid duplicates)
const chatFiles = fs.readdirSync(uploadsDir).filter(f => f.startsWith('media__') && f.endsWith('.jpg'));
const seenHashes = new Set();
const uniqueChatUploads = [];

chatFiles.forEach(f => {
  const fullPath = path.join(uploadsDir, f);
  const buf = fs.readFileSync(fullPath);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  if (!seenHashes.has(hash)) {
    seenHashes.add(hash);
    uniqueChatUploads.push(fullPath);
  }
});

// We prefer chat uploads as they were explicitly attached
const allSelected = [...uniqueChatUploads, ...bestPhotos];

async function processAll() {
  let index = 1;
  const processedHashes = new Set(); // to avoid duplicates between downloads and chat
  
  for (const file of allSelected) {
    const buf = fs.readFileSync(file);
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    if (processedHashes.has(hash)) continue;
    processedHashes.add(hash);
    
    const outputPath = path.join(outputDir, `${index}.jpg`);
    
    try {
      await sharp(file)
        .resize(1200, null, { withoutEnlargement: true })
        .modulate({ saturation: 1.15 })
        .linear(1.15, -15) 
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(outputPath);
      console.log(`Processed -> ${index}.jpg`);
      index++;
    } catch (e) {
      console.error('Error on', file, e);
    }
  }
  console.log(`Done! Created ${index - 1} best photos.`);
}

processAll();
