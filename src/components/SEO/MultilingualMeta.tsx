import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';

interface MultilingualMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  canonical?: string;
}

const MultilingualMeta: React.FC<MultilingualMetaProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  type = 'website',
  canonical
}) => {
  const { language } = useApp();
  const location = useLocation();
  const { currentPathWithLanguage } = useMultilingualRoute();

  const baseUrl = 'https://babna.ma';
  const currentUrl = canonical || `${baseUrl}${currentPathWithLanguage}`;
  const alternateUrls = {
    fr: `${baseUrl}/fr${location.pathname.replace(/^\/(fr|ar|en|es)/, '')}`,
    ar: `${baseUrl}/ar${location.pathname.replace(/^\/(fr|ar|en|es)/, '')}`,
    en: `${baseUrl}/en${location.pathname.replace(/^\/(fr|ar|en|es)/, '')}`,
    es: `${baseUrl}/es${location.pathname.replace(/^\/(fr|ar|en|es)/, '')}`
  };

  return (
    <Helmet>
      {/* Balises de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="language" content={language} />
      
      {/* URL canonique */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Balises hreflang pour le SEO multilingue */}
      <link rel="alternate" hreflang="fr" href={alternateUrls.fr} />
      <link rel="alternate" hreflang="ar" href={alternateUrls.ar} />
      <link rel="alternate" hreflang="en" href={alternateUrls.en} />
      <link rel="alternate" hreflang="es" href={alternateUrls.es} />
      <link rel="alternate" hreflang="x-default" href={alternateUrls.fr} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:locale" content={
        language === 'fr' ? 'fr_FR' : 
        language === 'ar' ? 'ar_MA' : 
        language === 'en' ? 'en_US' : 
        'es_ES'
      } />
      <meta property="og:locale:alternate" content={
        language === 'fr' ? 'ar_MA,en_US,es_ES' : 
        language === 'ar' ? 'fr_FR,en_US,es_ES' : 
        language === 'en' ? 'fr_FR,ar_MA,es_ES' : 
        'fr_FR,ar_MA,en_US'
      } />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      
      {/* Direction du texte pour l'arabe */}
      {language === 'ar' && (
        <meta name="text-direction" content="rtl" />
      )}
    </Helmet>
  );
};

export default MultilingualMeta;
