const sharp = require('sharp');
const fs = require('fs');

async function cropText(file) {
  try {
    const metadata = await sharp(file).metadata();
    
    // We'll crop the top 20% of the image which usually contains the generated text "THE GYM" or "REACH YOUR GOALS"
    const cropHeight = Math.floor(metadata.height * 0.8);
    const topOffset = metadata.height - cropHeight;
    
    const tempFile = file.replace('.jpg', '_cropped.jpg');
    
    await sharp(file)
      .extract({ left: 0, top: topOffset, width: metadata.width, height: cropHeight })
      .toFile(tempFile);
      
    // Overwrite the original
    fs.renameSync(tempFile, file);
    console.log(`Successfully cropped ${file}`);
  } catch (err) {
    console.error(`Error cropping ${file}:`, err);
  }
}

async function run() {
  const publicDir = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images';
  await cropText(`${publicDir}/facility-nutrition.jpg`);
  await cropText(`${publicDir}/facility-cardio.jpg`);
  // Not cropping strength or functional as their text might not be as intrusive at the top, but let's do strength just in case
  await cropText(`${publicDir}/facility-strength.jpg`);
}

run();
