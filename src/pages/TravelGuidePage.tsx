import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, User, BookOpen, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { contentService } from '../services/contentService';
import { TravelGuide } from '../types/content';
import MultilingualMeta from '../components/SEO/MultilingualMeta';
import Breadcrumbs from '../components/SEO/Breadcrumbs';

const TravelGuidePage: React.FC = () => {
  const { language } = useApp();
  const [travelGuides, setTravelGuides] = useState<TravelGuide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTravelGuides = async () => {
      setLoading(true);
      try {
        const data = await contentService.getTravelGuides();
        setTravelGuides(data);
      } catch (error) {
        console.error('Erreur lors du chargement des guides:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTravelGuides();
  }, []);

  const seoData = {
    title: language === 'ar' 
      ? 'دليل السفر في المغرب | أفضل المدن والمعالم'
      : language === 'en'
      ? 'Morocco Travel Guide | Best Cities & Attractions'
      : language === 'es'
      ? 'Guía de Viajes en Marruecos | Mejores Ciudades y Atracciones'
      : 'Guide de voyage au Maroc | Meilleures villes et attractions',
    description: language === 'ar'
      ? 'دليل شامل للسفر في المغرب. اكتشف أفضل المدن والمعالم السياحية مع نصائح مفيدة.'
      : language === 'en'
      ? 'Complete travel guide to Morocco. Discover the best cities and tourist attractions with helpful tips.'
      : language === 'es'
      ? 'Guía completa de viajes en Marruecos. Descubre las mejores ciudades y atracciones turísticas con consejos útiles.'
      : 'Guide complet de voyage au Maroc. Découvrez les meilleures villes et attractions touristiques avec des conseils utiles.',
    keywords: language === 'ar'
      ? 'دليل المغرب, السياحة في المغرب, مراكش, فاس, الدار البيضاء, الرباط'
      : language === 'en'
      ? 'Morocco guide, Morocco tourism, Marrakech, Fes, Casablanca, Rabat'
      : language === 'es'
      ? 'guía Marruecos, turismo Marruecos, Marrakech, Fez, Casablanca, Rabat'
      : 'guide Maroc, tourisme Maroc, Marrakech, Fès, Casablanca, Rabat'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    const locales = {
      fr: 'fr-FR',
      ar: 'ar-MA',
      en: 'en-US',
      es: 'es-ES'
    };

    return date.toLocaleDateString(locales[language as keyof typeof locales] || 'fr-FR', options);
  };

  const getCityName = (citySlug: string) => {
    const cityNames = {
      marrakech: {
        fr: 'Marrakech',
        ar: 'مراكش',
        en: 'Marrakech',
        es: 'Marrakech'
      },
      fes: {
        fr: 'Fès',
        ar: 'فاس',
        en: 'Fes',
        es: 'Fez'
      },
      casablanca: {
        fr: 'Casablanca',
        ar: 'الدار البيضاء',
        en: 'Casablanca',
        es: 'Casablanca'
      },
      rabat: {
        fr: 'Rabat',
        ar: 'الرباط',
        en: 'Rabat',
        es: 'Rabat'
      },
      tangier: {
        fr: 'Tanger',
        ar: 'طنجة',
        en: 'Tangier',
        es: 'Tánger'
      },
      agadir: {
        fr: 'Agadir',
        ar: 'أكادير',
        en: 'Agadir',
        es: 'Agadir'
      }
    };

    return cityNames[citySlug as keyof typeof cityNames]?.[language as keyof typeof cityNames.marrakech] || citySlug;
  };

  if (loading) {
    return (
      <>
        <MultilingualMeta
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          canonical="/guides"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs />
          
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MultilingualMeta
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/guides"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'دليل السفر في المغرب' : 
             language === 'en' ? 'Morocco Travel Guide' : 
             language === 'es' ? 'Guía de Viajes en Marruecos' : 
             'Guide de voyage au Maroc'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' ? 'اكتشف أفضل المدن والمعالم السياحية في المغرب' : 
             language === 'en' ? 'Discover the best cities and tourist attractions in Morocco' : 
             language === 'es' ? 'Descubre las mejores ciudades y atracciones turísticas de Marruecos' : 
             'Découvrez les meilleures villes et attractions touristiques du Maroc'}
          </p>
        </div>

        {/* Guides */}
        {travelGuides.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'لا توجد أدلة متاحة' : 
               language === 'en' ? 'No guides available' : 
               language === 'es' ? 'No hay guías disponibles' : 
               'Aucun guide disponible'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'Revenez bientôt pour de nouveaux guides' : 
               language === 'en' ? 'Come back soon for new guides' : 
               language === 'es' ? 'Vuelve pronto para nuevas guías' : 
               'Revenez bientôt pour de nouveaux guides'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelGuides.map((guide) => (
              <article key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={guide.featuredImage}
                  alt={guide.title[language as keyof typeof guide.title] || guide.title.fr}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{getCityName(guide.citySlug)}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(guide.publishedAt)}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {guide.title[language as keyof typeof guide.title] || guide.title.fr}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {guide.description[language as keyof typeof guide.description] || guide.description.fr}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {guide.author}
                      </span>
                    </div>
                    
                    <button className="flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm">
                      {language === 'ar' ? 'اقرأ الدليل' : 
                       language === 'en' ? 'Read guide' : 
                       language === 'es' ? 'Leer guía' : 
                       'Lire le guide'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  {guide.sections && guide.sections.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>
                          {language === 'ar' ? `${guide.sections.length} قسم` : 
                           language === 'en' ? `${guide.sections.length} sections` : 
                           language === 'es' ? `${guide.sections.length} secciones` : 
                           `${guide.sections.length} sections`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TravelGuidePage;
