#!/usr/bin/env node

// Charger les variables d'environnement depuis .env.local
require('dotenv').config({ path: '.env.local' });

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadHeroImages() {
  const imagePaths = process.argv.slice(2);

  if (imagePaths.length === 0) {
    console.error('❌ Veuillez fournir le chemin vers au moins une image');
    console.log('Usage: node scripts/upload-hero-images.js <image1> <image2> <image3> <image4>');
    console.log('Exemple: node scripts/upload-hero-images.js ./photo1.jpg ./photo2.jpg ./photo3.jpg ./photo4.jpg');
    process.exit(1);
  }

  if (imagePaths.length > 4) {
    console.error('❌ Maximum 4 images autorisées pour le carrousel');
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
    console.log(`📤 Upload de ${imagePaths.length} image(s) en cours...`);
    
    const uploadedUrls = [];
    const timestamp = Date.now();

    for (let i = 0; i < imagePaths.length; i++) {
      const imagePath = imagePaths[i];
      console.log(`  📷 Upload de ${path.basename(imagePath)} (${i + 1}/${imagePaths.length})`);
      
      // Lire le fichier
      const fileBuffer = fs.readFileSync(imagePath);
      const fileName = `hero-images/${timestamp}-${i + 1}-${path.basename(imagePath)}`;
      
      // Upload vers Vercel Blob
      const { url } = await put(fileName, fileBuffer, { 
        access: 'public',
        contentType: getContentType(imagePath)
      });

      uploadedUrls.push(url);
      console.log(`  ✅ Image ${i + 1} uploadée: ${url}`);
    }

    console.log('\n🎉 Toutes les images ont été uploadées avec succès!');
    
    // Mettre à jour le fichier de configuration
    updateConfigFile(uploadedUrls);

    console.log('✅ Fichier de configuration mis à jour!');
    console.log('🚀 Vous pouvez maintenant voir votre carrousel sur la page d\'accueil.');

    return uploadedUrls;
  } catch (error) {
    console.error('❌ Erreur lors de l\'upload:', error.message);
    process.exit(1);
  }
}

function updateConfigFile(imageUrls) {
  const configPath = path.join(process.cwd(), 'lib', 'config.ts');
  
  // Compléter avec des placeholders si moins de 4 images
  const completeUrls = [...imageUrls];
  while (completeUrls.length < 4) {
    completeUrls.push(`/placeholder.svg?height=600&width=1200&text=Photo+${completeUrls.length + 1}`);
  }
  
  const urlsString = completeUrls.map(url => `  "${url}",`).join('\n');
  
  const newConfigContent = `// Configuration des assets
export const HERO_IMAGES = [
${urlsString}
];

// Après avoir uploadé vos images avec le script, remplacez ces URLs
// ${imageUrls.length} image(s) uploadée(s) le ${new Date().toLocaleString('fr-FR')}

// Compatibilité avec l'ancienne configuration
export const HERO_IMAGE_URL = HERO_IMAGES[0];`;

  fs.writeFileSync(configPath, newConfigContent, 'utf8');
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
  uploadHeroImages();
}

module.exports = { uploadHeroImages }; 