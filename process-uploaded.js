const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const inputDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images/uploaded';
const outputDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images/final';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
    console.log(`Found ${files.length} uploaded images.`);
    
    let index = 1;
    const seenHashes = new Set();
    
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      
      // Calculate hash to avoid duplicates
      const fileBuffer = fs.readFileSync(inputPath);
      const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
      
      if (seenHashes.has(hash)) {
        console.log(`Skipping duplicate: ${file}`);
        continue;
      }
      seenHashes.add(hash);
      
      const outputPath = path.join(outputDir, `${index}.jpg`);
      
      // Premium cinematic montage
      await sharp(inputPath)
        .resize(1200, null, { withoutEnlargement: true })
        .modulate({ saturation: 1.15 })
        .linear(1.15, -15) 
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(outputPath);
        
      console.log(`Processed ${file} -> ${index}.jpg`);
      index++;
    }
    
    console.log(`Finished processing. Created ${index - 1} unique images.`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
