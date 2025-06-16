#!/usr/bin/env node

// Charger les variables d'environnement depuis .env.local
require('dotenv').config({ path: '.env.local' });

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadVenueImages() {
  const imagePaths = process.argv.slice(2);

  if (imagePaths.length === 0) {
    console.error('❌ Veuillez fournir le chemin vers au moins une image');
    console.log('Usage: node scripts/upload-venue-images.js <image1> <image2> <image3>');
    console.log('Exemple: node scripts/upload-venue-images.js ./dataset/Castle/image1.jpg ./dataset/Castle/image2.jpg');
    process.exit(1);
  }

  // Vérifier que tous les fichiers existent
  for (const imagePath of imagePaths) {
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ L'image n'existe pas: ${imagePath}`);
      process.exit(1);
    }
  }

  // Vérifier que le token Vercel Blob est configuré
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Token Vercel Blob manquant!');
    console.error('Assurez-vous d\'avoir configuré BLOB_READ_WRITE_TOKEN dans .env.local');
    process.exit(1);
  }

  try {
    console.log(`📤 Upload de ${imagePaths.length} image(s) du château en cours...`);
    
    const uploadedUrls = [];
    const timestamp = Date.now();

    for (let i = 0; i < imagePaths.length; i++) {
      const imagePath = imagePaths[i];
      console.log(`  🏰 Upload de ${path.basename(imagePath)} (${i + 1}/${imagePaths.length})`);
      
      // Lire le fichier
      const fileBuffer = fs.readFileSync(imagePath);
      const fileName = `venue-images/${timestamp}-${i + 1}-${path.basename(imagePath)}`;
      
      // Upload vers Vercel Blob
      const { url } = await put(fileName, fileBuffer, { 
        access: 'public',
        contentType: getContentType(imagePath)
      });

      uploadedUrls.push(url);
      console.log(`  ✅ Image ${i + 1} uploadée: ${url}`);
    }

    console.log('\n🎉 Toutes les images du château ont été uploadées avec succès!');
    
    // Mettre à jour le fichier de configuration
    updateConfigFile(uploadedUrls);

    console.log('✅ Fichier de configuration mis à jour!');
    console.log('🚀 Vous pouvez maintenant voir les images du château sur la page lieu.');

    return uploadedUrls;
  } catch (error) {
    console.error('❌ Erreur lors de l\'upload:', error.message);
    process.exit(1);
  }
}

function updateConfigFile(imageUrls) {
  const configPath = path.join(process.cwd(), 'lib', 'config.ts');
  
  // Lire le fichier existant
  let existingContent = '';
  if (fs.existsSync(configPath)) {
    existingContent = fs.readFileSync(configPath, 'utf8');
  }

  // Créer la section des images du venue
  const venueImagesConfig = `
// Images du château/lieu
export const VENUE_IMAGES = {
  main: "${imageUrls[0] || '/placeholder.svg?height=500&width=900'}",
  gallery: [
${imageUrls.slice(1).map(url => `    "${url}",`).join('\n')}
  ]
};

// Images du château uploadées le ${new Date().toLocaleString('fr-FR')}`;

  // Si le fichier contient déjà des images venue, les remplacer
  if (existingContent.includes('VENUE_IMAGES')) {
    const newContent = existingContent.replace(
      /\/\/ Images du château\/lieu[\s\S]*?(?=\/\/|export const HERO|$)/m,
      venueImagesConfig + '\n\n'
    );
    fs.writeFileSync(configPath, newContent, 'utf8');
  } else {
    // Ajouter à la fin du fichier existant
    const newContent = existingContent + '\n' + venueImagesConfig;
    fs.writeFileSync(configPath, newContent, 'utf8');
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  return contentTypes[ext] || 'image/jpeg';
}

if (require.main === module) {
  uploadVenueImages();
}

module.exports = { uploadVenueImages }; 