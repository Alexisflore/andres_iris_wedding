#!/usr/bin/env node

// Charger les variables d'environnement depuis .env.local
require('dotenv').config({ path: '.env.local' });

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadHeroImage() {
  const imagePath = process.argv[2];

  if (!imagePath) {
    console.error('❌ Veuillez fournir le chemin vers l\'image');
    console.log('Usage: node scripts/upload-hero-image.js <chemin-vers-image>');
    process.exit(1);
  }

  if (!fs.existsSync(imagePath)) {
    console.error(`❌ L'image n'existe pas: ${imagePath}`);
    process.exit(1);
  }

  // Vérifier que le token Vercel Blob est configuré
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Token Vercel Blob manquant!');
    console.error('Assurez-vous d\'avoir configuré BLOB_READ_WRITE_TOKEN dans .env.local');
    process.exit(1);
  }

  try {
    console.log('📤 Upload de l\'image en cours...');
    
    // Lire le fichier
    const fileBuffer = fs.readFileSync(imagePath);
    const fileName = `hero-images/${Date.now()}-${path.basename(imagePath)}`;
    
    // Upload vers Vercel Blob
    const { url } = await put(fileName, fileBuffer, { 
      access: 'public',
      contentType: getContentType(imagePath)
    });

    console.log('✅ Image uploadée avec succès!');
    console.log(`📍 URL: ${url}`);

    // Mettre à jour le fichier de configuration
    updateConfigFile(url);

    console.log('✅ Fichier de configuration mis à jour!');
    console.log('🚀 Vous pouvez maintenant voir votre image sur la page d\'accueil.');

    return url;
  } catch (error) {
    console.error('❌ Erreur lors de l\'upload:', error.message);
    process.exit(1);
  }
}

function updateConfigFile(imageUrl) {
  const configPath = path.join(process.cwd(), 'lib', 'config.ts');
  
  const newConfigContent = `// Configuration des assets
export const HERO_IMAGE_URL = "${imageUrl}";

// Cette URL a été générée automatiquement par le script upload-hero-image.js
// Généré le: ${new Date().toLocaleString('fr-FR')}`;

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
  uploadHeroImage();
}

module.exports = { uploadHeroImage }; 