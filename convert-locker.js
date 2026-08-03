const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const src = '/Users/m1pro/.gemini/antigravity-ide/brain/6015178b-0d31-4bd9-9529-36e4ceb50f81/facility_locker_notext_realistic_1785737191269.png';
const dest = '/Users/m1pro/Documents/Full Stack Middle/AzizHaydarovGYM/public/images/facility-locker.jpg';

sharp(src)
  .jpeg({ quality: 90 })
  .toFile(dest)
  .then(() => console.log('Successfully updated locker room image'))
  .catch(err => console.error(err));
