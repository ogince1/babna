import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

const SEOManager: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website'
}) => {
  useEffect(() => {
    // Mise à jour du titre de la page
    document.title = title;
  }, [title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Babna.ma" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Autres meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="fr, ar" />
      <meta name="author" content="Babna.ma" />
    </Helmet>
  );
};

export default SEOManager;

