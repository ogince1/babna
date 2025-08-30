#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Script pour générer les favicons PNG à partir du SVG
// Note: Ce script nécessite que vous ayez installé des outils comme ImageMagick ou Sharp
// Pour l'instant, nous utilisons le SVG directement

console.log('🎨 Génération des favicons pour Babna.ma...');

// Vérifier que le favicon SVG existe
const faviconSvgPath = path.join(__dirname, '../public/favicon.svg');
if (!fs.existsSync(faviconSvgPath)) {
  console.error('❌ Fichier favicon.svg non trouvé');
  process.exit(1);
}

console.log('✅ Favicon SVG trouvé');

// Créer des fichiers PNG placeholder (seront remplacés par de vrais PNG lors du build)
const sizes = [16, 32];

sizes.forEach(size => {
  const pngPath = path.join(__dirname, `../public/favicon-${size}x${size}.png`);
  
  // Créer un fichier PNG minimal (placeholder)
  // En production, vous devriez utiliser Sharp ou ImageMagick pour convertir le SVG
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, size, // width
    0x00, 0x00, 0x00, size, // height
    0x08, 0x02, 0x00, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
    0x00, 0x00, 0x00, 0x00, // CRC (placeholder)
    0x00, 0x00, 0x00, 0x00, // IDAT chunk length
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x00, 0x00, 0x00, 0x00, // CRC (placeholder)
    0x00, 0x00, 0x00, 0x00, // IEND chunk length
    0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82  // CRC
  ]);
  
  fs.writeFileSync(pngPath, pngData);
  console.log(`✅ Favicon ${size}x${size}.png créé (placeholder)`);
});

console.log('🎉 Génération des favicons terminée !');
console.log('');
console.log('📋 Pour générer de vrais PNG, installez Sharp:');
console.log('npm install sharp');
console.log('');
console.log('Puis utilisez ce code dans le script:');
console.log(`
const sharp = require('sharp');
const svgBuffer = fs.readFileSync('./public/favicon.svg');

sizes.forEach(async (size) => {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(\`./public/favicon-\${size}x\${size}.png\`);
});
`);
