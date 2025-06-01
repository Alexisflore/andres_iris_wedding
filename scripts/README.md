# Scripts

## Upload d'image heroïque

### Utilisation

Pour changer l'image d'accueil de la page principale :

1. **Assurez-vous d'avoir les variables d'environnement Vercel Blob configurées** :
   ```bash
   # Dans votre fichier .env.local
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```

2. **Exécutez le script avec le chemin vers votre image** :
   ```bash
   node scripts/upload-hero-image.js /chemin/vers/votre/image.jpg
   ```

3. **C'est tout !** Le script va :
   - Uploader l'image vers Vercel Blob
   - Mettre à jour automatiquement le fichier `lib/config.ts`
   - L'image apparaîtra sur la page d'accueil lors du prochain build/refresh

### Formats supportés

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.svg`

### Exemple complet

```bash
# Exemple avec une image locale
node scripts/upload-hero-image.js ./images/couple-photo.jpg

# Sortie attendue :
# 📤 Upload de l'image en cours...
# ✅ Image uploadée avec succès!
# 📍 URL: https://xyz.public.blob.vercel-storage.com/hero-images/1234567890-couple-photo.jpg
# ✅ Fichier de configuration mis à jour!
# 🚀 Vous pouvez maintenant voir votre image sur la page d'accueil.
```

### Remarques

- L'image sera stockée dans le dossier `hero-images/` sur Vercel Blob
- Le nom du fichier inclut un timestamp pour éviter les conflits
- L'ancienne URL sera remplacée dans la configuration 