const fs = require('fs');
const path = require('path');

console.log('🔧 RÉGÉNÉRATION DU SITEMAP.XML');
console.log('================================');

// Contenu du sitemap corrigé
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Page d'accueil - Français -->
  <url>
    <loc>https://babna.ma/fr/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Page d'accueil - Arabe -->
  <url>
    <loc>https://babna.ma/ar/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Page d'accueil - Anglais -->
  <url>
    <loc>https://babna.ma/en/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Page d'accueil - Espagnol -->
  <url>
    <loc>https://babna.ma/es/</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Appartements - Français -->
  <url>
    <loc>https://babna.ma/fr/appartements</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Appartements - Arabe -->
  <url>
    <loc>https://babna.ma/ar/appartements</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Appartements - Anglais -->
  <url>
    <loc>https://babna.ma/en/appartements</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Appartements - Espagnol -->
  <url>
    <loc>https://babna.ma/es/appartements</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Marrakech - Français -->
  <url>
    <loc>https://babna.ma/fr/appartements/ville/marrakech</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements/ville/marrakech"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Marrakech - Arabe -->
  <url>
    <loc>https://babna.ma/ar/appartements/ville/marrakech</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements/ville/marrakech"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Marrakech - Anglais -->
  <url>
    <loc>https://babna.ma/en/appartements/ville/marrakech</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements/ville/marrakech"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Marrakech - Espagnol -->
  <url>
    <loc>https://babna.ma/es/appartements/ville/marrakech</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/appartements/ville/marrakech"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/appartements/ville/marrakech"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog - Français -->
  <url>
    <loc>https://babna.ma/fr/blog</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/blog"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/blog"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/blog"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/blog"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog - Arabe -->
  <url>
    <loc>https://babna.ma/ar/blog</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/blog"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/blog"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/blog"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/blog"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog - Anglais -->
  <url>
    <loc>https://babna.ma/en/blog</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/blog"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/blog"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/blog"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/blog"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog - Espagnol -->
  <url>
    <loc>https://babna.ma/es/blog</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/blog"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/blog"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/blog"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/blog"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Guides de voyage - Français -->
  <url>
    <loc>https://babna.ma/fr/guides</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/guides"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/guides"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/guides"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/guides"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Guides de voyage - Arabe -->
  <url>
    <loc>https://babna.ma/ar/guides</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/guides"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/guides"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/guides"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/guides"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Guides de voyage - Anglais -->
  <url>
    <loc>https://babna.ma/en/guides</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/guides"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/guides"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/guides"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/guides"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Guides de voyage - Espagnol -->
  <url>
    <loc>https://babna.ma/es/guides</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://babna.ma/es/guides"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://babna.ma/fr/guides"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://babna.ma/ar/guides"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://babna.ma/en/guides"/>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
</urlset>`;

// Chemin du fichier sitemap
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

try {
  // Écrire le nouveau sitemap
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ Sitemap régénéré avec succès !');
  console.log('📍 Fichier :', sitemapPath);
  
  // Vérifier le contenu
  const fileContent = fs.readFileSync(sitemapPath, 'utf8');
  const lines = fileContent.split('\n');
  
  console.log('📊 Statistiques :');
  console.log(`   - Lignes totales : ${lines.length}`);
  console.log(`   - URLs : ${(lines.length - 3) / 10}`); // 10 lignes par URL
  
  console.log('');
  console.log('🔍 Vérification du formatage :');
  console.log('   - Première ligne :', lines[0].trim());
  console.log('   - Dernière ligne :', lines[lines.length - 1].trim());
  
  console.log('');
  console.log('💡 Si le problème persiste :');
  console.log('   1. Videz le cache de votre navigateur');
  console.log('   2. Rechargez la page avec Ctrl+F5 (ou Cmd+Shift+R)');
  console.log('   3. Vérifiez que le serveur a bien mis à jour le fichier');
  
} catch (error) {
  console.error('❌ Erreur lors de la régénération :', error);
}
