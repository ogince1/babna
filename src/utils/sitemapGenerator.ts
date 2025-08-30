import { seoData, getAllCitySlugs, getAllTypeSlugs, getAllPlaceSlugs } from '../data/seoData';
import { getAllTagIds } from '../data/tags';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): SitemapUrl[] => {
  const baseUrl = 'https://babna.ma';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Pages principales
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/appartements`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/appartements/jour`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    }
  ];

  // Pages par ville
  getAllCitySlugs().forEach(citySlug => {
    urls.push({
      loc: `${baseUrl}/appartements/ville/${citySlug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    });
  });

  // Pages par type
  getAllTypeSlugs().forEach(typeSlug => {
    urls.push({
      loc: `${baseUrl}/appartements/type/${typeSlug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7
    });
  });

  // Pages par lieu
  getAllPlaceSlugs().forEach(placeSlug => {
    urls.push({
      loc: `${baseUrl}/appartements/lieu/${placeSlug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.6
    });
  });

  // Pages par tag
  getAllTagIds().forEach(tagId => {
    urls.push({
      loc: `${baseUrl}/appartements/tag/${tagId}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.5
    });
  });

  return urls;
};

export const generateSitemapXML = (): string => {
  const urls = generateSitemap();
  
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
};

// Fonction pour sauvegarder le sitemap (à utiliser côté serveur)
export const saveSitemap = async (): Promise<void> => {
  try {
    const sitemapXML = generateSitemapXML();
    // Ici vous pouvez implémenter la logique pour sauvegarder le fichier
    // Par exemple, avec Node.js fs.writeFileSync
    console.log('Sitemap généré avec succès');
    console.log(sitemapXML);
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
  }
};

