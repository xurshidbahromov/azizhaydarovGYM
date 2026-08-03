const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = '/Users/m1pro/.gemini/antigravity-ide/brain/6015178b-0d31-4bd9-9529-36e4ceb50f81';
const publicDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public';

const imagesToProcess = [
  { prefix: 'hero_bg_realistic_', dest: path.join(publicDir, 'hero-bg.jpg') },
  { prefix: 'facility_cardio_realistic_', dest: path.join(publicDir, 'images', 'facility-cardio.jpg') },
  { prefix: 'facility_strength_realistic_', dest: path.join(publicDir, 'images', 'facility-strength.jpg') },
  { prefix: 'facility_functional_realistic_', dest: path.join(publicDir, 'images', 'facility-functional.jpg') },
  { prefix: 'facility_nutrition_realistic_', dest: path.join(publicDir, 'images', 'facility-nutrition.jpg') },
  { prefix: 'facility_locker_realistic_', dest: path.join(publicDir, 'images', 'facility-locker.jpg') },
  // Let's also use strength for programs bg and recovery for about images to complete the set
  { prefix: 'facility_strength_realistic_', dest: path.join(publicDir, 'programs-bg.jpg') },
  { prefix: 'facility_locker_realistic_', dest: path.join(publicDir, 'images', 'facility-recovery.jpg') }
];

async function run() {
  const allFiles = fs.readdirSync(brainDir);
  
  for (const item of imagesToProcess) {
    const matchedFiles = allFiles
      .filter(f => f.startsWith(item.prefix) && f.endsWith('.png'))
      .sort((a, b) => {
        // sort by timestamp descending
        const tsA = parseInt(a.split('_').pop().replace('.png', ''));
        const tsB = parseInt(b.split('_').pop().replace('.png', ''));
        return tsB - tsA;
      });
      
    if (matchedFiles.length > 0) {
      const sourceFile = path.join(brainDir, matchedFiles[0]);
      console.log(`Processing ${matchedFiles[0]} -> ${item.dest}`);
      await sharp(sourceFile)
        .jpeg({ quality: 90 })
        .toFile(item.dest);
    } else {
      console.log(`No file found for prefix ${item.prefix}`);
    }
  }
}

run();
