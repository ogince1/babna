import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEOManager from '../components/SEO/SEOManager';
import PropertyCard from '../components/Properties/PropertyCard';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { supabaseHelpers } from '../lib/supabase';
import { getTagById } from '../data/tags';

const TagPage: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  const { language } = useApp();
  const [tagProperties, setTagProperties] = useState<any[]>([]);
  const [tagData, setTagData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTagProperties = async () => {
      if (tagSlug) {
        // Récupérer les données du tag
        const tag = getTagById(tagSlug);
        
        if (tag) {
          setTagData(tag);
          
          try {
            // Récupérer toutes les propriétés depuis Supabase
            const allProperties = await supabaseHelpers.getProperties();
            
            // Filtrer les propriétés par tag
            const filtered = allProperties.filter(property => {
              // Vérifier si la propriété a le tag recherché
              return property.tags && property.tags.includes(tagSlug);
            });
            
            setTagProperties(filtered);
          } catch (error) {
            console.error('Error fetching tag properties:', error);
            setTagProperties([]);
          }
        } else {
          setTagData(null);
          setTagProperties([]);
        }
        
        setLoading(false);
      }
    };

    fetchTagProperties();
  }, [tagSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'ar' ? 'جاري تحميل العقارات...' : 'Chargement des propriétés...'}
          </p>
        </div>
      </div>
    );
  }

  if (!tagData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المعلم غير موجود' : 'Attraction non trouvée'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'المعلم الذي تبحث عنه غير موجود'
              : 'L\'attraction que vous recherchez n\'existe pas'
            }
          </p>
        </div>
      </div>
    );
  }

  const seoData = {
    title: language === 'ar' 
      ? `شقق للكراء اليومي قرب ${tagData.nameAr} | Babna.ma`
      : language === 'en'
      ? `Daily Apartment Rentals near ${tagData.name} | Babna.ma`
      : language === 'es'
      ? `Alquiler de Apartamentos Diarios cerca de ${tagData.name} | Babna.ma`
      : `Appartements à louer près de ${tagData.name} | Babna.ma`,
    description: language === 'ar' 
      ? `اكتشف شقق مفروشة للكراء قرب ${tagData.nameAr}. ${tagData.descriptionAr}`
      : language === 'en'
      ? `Discover furnished apartments for rent near ${tagData.name}. ${tagData.description}`
      : language === 'es'
      ? `Descubre apartamentos amueblados para alquilar cerca de ${tagData.name}. ${tagData.description}`
      : `Découvrez des appartements meublés à louer près de ${tagData.name}. ${tagData.description}`,
    keywords: language === 'ar'
      ? `شقق للكراء اليومي, شقق مفروشة, كراء يومي, ${tagData.nameAr}, المغرب`
      : `location appartements, appartements meublés, location journalière, ${tagData.name}, Maroc`,
    canonical: `/appartements/tag/${tagSlug}`
  };

  return (
    <>
      <SEOManager
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={seoData.canonical}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* En-tête de la page */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{tagData.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? tagData.nameAr : tagData.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' ? tagData.descriptionAr : tagData.description}
          </p>
          <div className="mt-4">
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {language === 'ar' ? tagData.categoryAr : tagData.category}
            </span>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {language === 'ar' 
              ? `شقق للكراء اليومي قرب ${tagData.nameAr}`
              : language === 'en'
              ? `Daily Apartment Rentals near ${tagData.name}`
              : language === 'es'
              ? `Alquiler de Apartamentos Diarios cerca de ${tagData.name}`
              : `Appartements à louer près de ${tagData.name}`
            }
          </h2>
          
          {tagProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد عقارات متاحة' : 'Aucune propriété disponible'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'Aucun appartement n\'est actuellement disponible près de cette attraction'
                  : 'Aucun appartement n\'est actuellement disponible près de cette attraction'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tagProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onPropertySelect={() => {}}
                />
              ))}
            </div>
          )}
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-gray-50 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {language === 'ar' ? 'معلومات إضافية' : 'Informations supplémentaires'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'الموقع' : 'Localisation'}
              </h4>
              <p className="text-gray-600">
                {language === 'ar' ? tagData.categoryAr : tagData.category}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'عدد العقارات المتاحة' : 'Propriétés disponibles'}
              </h4>
              <p className="text-gray-600">
                {tagProperties.length} {language === 'ar' ? 'عقار' : 'propriété(s)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagPage;
