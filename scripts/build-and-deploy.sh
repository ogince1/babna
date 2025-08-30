#!/bin/bash

# Script de build et déploiement pour Babna.ma
# Ce script configure l'application pour éviter les erreurs 404

echo "🚀 Début du build et déploiement de Babna.ma..."

# 1. Nettoyer le dossier dist
echo "🧹 Nettoyage du dossier dist..."
rm -rf dist

# 2. Build de l'application
echo "🔨 Build de l'application..."
npm run build

# 3. Vérifier que le build a réussi
if [ ! -d "dist" ]; then
    echo "❌ Erreur: Le build a échoué"
    exit 1
fi

# 4. Copier les fichiers de configuration pour le routage
echo "📁 Copie des fichiers de configuration..."

# Copier _redirects pour Netlify
if [ -f "public/_redirects" ]; then
    cp public/_redirects dist/
    echo "✅ _redirects copié"
fi

# Copier .htaccess pour Apache
if [ -f "public/.htaccess" ]; then
    cp public/.htaccess dist/
    echo "✅ .htaccess copié"
fi

# 5. Créer un fichier vercel.json pour Vercel
echo "📝 Création de vercel.json..."
cat > dist/vercel.json << 'EOF'
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
EOF
echo "✅ vercel.json créé"

# 6. Créer un fichier netlify.toml pour Netlify
echo "📝 Création de netlify.toml..."
cat > dist/netlify.toml << 'EOF'
[build]
  publish = "."
  command = "echo 'Build already done'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
EOF
echo "✅ netlify.toml créé"

# 7. Vérifier la structure du build
echo "📊 Structure du build:"
ls -la dist/

echo "🎉 Build terminé avec succès !"
echo "📁 Le dossier dist est prêt pour le déploiement"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Pour Netlify: glisser-déposer le dossier dist/"
echo "2. Pour Vercel: connecter le repository GitHub"
echo "3. Pour Apache: copier le contenu de dist/ vers /var/www/babna/"
echo "4. Pour Nginx: utiliser le fichier nginx.conf fourni"
