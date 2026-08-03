const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images/gym_photos';
const outputDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images/processed';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
  try {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
    
    console.log(`Found ${files.length} images to process.`);
    
    let index = 1;
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      // We will name them 1.jpg, 2.jpg, ... up to N.jpg for easy usage
      const outputPath = path.join(outputDir, `${index}.jpg`);
      
      await sharp(inputPath)
        .resize(1200, null, { withoutEnlargement: true }) // resize width to 1200 max
        .modulate({ saturation: 1.15 }) // slightly boost colors
        .linear(1.15, -15) // increase contrast by 1.15x, decrease brightness slightly (-15)
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(outputPath);
        
      console.log(`Processed ${file} -> ${index}.jpg`);
      index++;
    }
    
    console.log('Finished processing all images.');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

processImages();
