#!/usr/bin/env node

// Charger les variables d'environnement depuis .env.local
require('dotenv').config({ path: '.env.local' });

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadStyleImages() {
  const imagePaths = ['dataset/Madame.jpeg', 'dataset/Monsieur.jpeg'];

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
    console.log(`📤 Upload des images de style en cours...`);
    
    const uploadedUrls = {};
    const timestamp = Date.now();

    for (const imagePath of imagePaths) {
      const imageName = path.basename(imagePath, '.jpeg').toLowerCase();
      console.log(`  📷 Upload de ${path.basename(imagePath)} (${imageName})`);
      
      // Lire le fichier
      const fileBuffer = fs.readFileSync(imagePath);
      const fileName = `style-images/${timestamp}-${path.basename(imagePath)}`;
      
      // Upload vers Vercel Blob
      const { url } = await put(fileName, fileBuffer, { 
        access: 'public',
        contentType: 'image/jpeg'
      });

      uploadedUrls[imageName] = url;
      console.log(`  ✅ Image ${imageName} uploadée: ${url}`);
    }

    console.log('\n🎉 Toutes les images de style ont été uploadées avec succès!');
    
    // Mettre à jour le fichier de configuration
    updateConfigFile(uploadedUrls);

    console.log('✅ Fichier de configuration mis à jour!');
    console.log('🚀 Vous pouvez maintenant voir vos images de style sur la page thème.');

    return uploadedUrls;
  } catch (error) {
    console.error('❌ Erreur lors de l\'upload:', error.message);
    process.exit(1);
  }
}

function updateConfigFile(imageUrls) {
  const configPath = path.join(process.cwd(), 'lib', 'config.ts');
  
  // Lire le contenu actuel
  let currentContent = '';
  if (fs.existsSync(configPath)) {
    currentContent = fs.readFileSync(configPath, 'utf8');
  }

  // Ajouter la section des images de style
  const styleImagesSection = `

// Images de style pour la page thème
export const STYLE_IMAGES = {
  men: "${imageUrls.monsieur}",
  women: "${imageUrls.madame}",
};

// Images de style uploadées le ${new Date().toLocaleString('fr-FR')}`;

  // Si la section existe déjà, la remplacer
  if (currentContent.includes('STYLE_IMAGES')) {
    const updatedContent = currentContent.replace(
      /\/\/ Images de style pour la page thème[\s\S]*?\/\/ Images de style uploadées le.*$/,
      styleImagesSection.trim()
    );
    fs.writeFileSync(configPath, updatedContent, 'utf8');
  } else {
    // Sinon, l'ajouter à la fin
    fs.writeFileSync(configPath, currentContent + styleImagesSection, 'utf8');
  }
}

if (require.main === module) {
  uploadStyleImages();
}

module.exports = { uploadStyleImages }; 