const fs = require('fs');
const path = require('path');

const projectRoot = 'a:\\Roam_Drive01\\Assets\\Competition\\Hackathon\\International AI Builder Congress 2026\\Repository\\vorsha';
const othersFontDir = path.join(projectRoot, 'others', 'font');
const othersLogoDir = path.join(projectRoot, 'others', 'logo');

const mobileAssetsDir = path.join(projectRoot, 'mobile', 'assets');
const mobileFontsDir = path.join(mobileAssetsDir, 'fonts');
const mobileImagesDir = path.join(mobileAssetsDir, 'images');

if (!fs.existsSync(mobileFontsDir)) {
  fs.mkdirSync(mobileFontsDir, { recursive: true });
}
if (!fs.existsSync(mobileImagesDir)) {
  fs.mkdirSync(mobileImagesDir, { recursive: true });
}

// 1. Copy fonts
const fontFiles = fs.readdirSync(othersFontDir);
fontFiles.forEach(file => {
  const src = path.join(othersFontDir, file);
  const dest = path.join(mobileFontsDir, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied font: ${file} -> ${dest}`);
});

// 2. Copy SVG logos
const logoFiles = fs.readdirSync(othersLogoDir);
logoFiles.forEach(file => {
  const src = path.join(othersLogoDir, file);
  const dest = path.join(mobileImagesDir, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied logo SVG: ${file} -> ${dest}`);
});

// 3. Extract embedded PNG from color.svg and white.svg
function extractPngFromSvg(svgPath, outPngPath) {
  const content = fs.readFileSync(svgPath, 'utf8');
  // Match data:image/png;base64,([A-Za-z0-9+/=]+)
  // Note: in SVG there might be mask image and color image. We want the main image data.
  const regex = /xlink:href="data:image\/png;base64,([A-Za-z0-9+/=\s]+)"/g;
  let match;
  let lastData = null;
  while ((match = regex.exec(content)) !== null) {
    lastData = match[1].replace(/\s+/g, '');
  }
  if (lastData) {
    const buffer = Buffer.from(lastData, 'base64');
    fs.writeFileSync(outPngPath, buffer);
    console.log(`Extracted PNG (${buffer.length} bytes) to: ${outPngPath}`);
    return true;
  }
  console.log(`No base64 PNG found in ${svgPath}`);
  return false;
}

const colorSvgPath = path.join(othersLogoDir, 'color.svg');
const whiteSvgPath = path.join(othersLogoDir, 'white.svg');

extractPngFromSvg(colorSvgPath, path.join(mobileImagesDir, 'logo.png'));
extractPngFromSvg(colorSvgPath, path.join(mobileImagesDir, 'icon.png'));
extractPngFromSvg(colorSvgPath, path.join(mobileImagesDir, 'adaptive-icon.png'));
extractPngFromSvg(colorSvgPath, path.join(mobileImagesDir, 'splash-icon.png'));
extractPngFromSvg(colorSvgPath, path.join(mobileImagesDir, 'favicon.png'));
extractPngFromSvg(whiteSvgPath, path.join(mobileImagesDir, 'logo-white.png'));

console.log('Assets setup completed successfully!');

