import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MultilingualMeta from '../components/SEO/MultilingualMeta';
import PropertyCard from '../components/Properties/PropertyCard';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import FAQSection from '../components/Content/FAQSection';
import TestimonialsSection from '../components/Content/TestimonialsSection';
import { useApp } from '../context/AppContext';
import { supabaseHelpers } from '../lib/supabase';
import { slugToCityName } from '../utils/cityUtils';
import { moroccanCities } from '../data/cities';

const CityPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [searchParams] = useSearchParams();
  const { language } = useApp();
  const [cityProperties, setCityProperties] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityProperties = async () => {
      if (citySlug) {
        // Récupérer les données de la ville depuis le slug
        const cityName = slugToCityName(citySlug);
        const cityData = moroccanCities.find(city => city.id === citySlug);
        
        if (cityData) {
          setCityData(cityData);
          
          try {
            // Récupérer toutes les propriétés depuis Supabase
            const allProperties = await supabaseHelpers.getProperties();
            
            // Filtrer les propriétés par ville
            const filtered = allProperties.filter((property: any) => 
              property.city.toLowerCase() === cityData.name.toLowerCase()
            );
            
            setCityProperties(filtered);
          } catch (error) {
            console.error('Error fetching city properties:', error);
            setCityProperties([]);
          }
        } else {
          setCityData(null);
          setCityProperties([]);
        }
        
        setLoading(false);
      }
    };

    fetchCityProperties();
  }, [citySlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des propriétés...</p>
        </div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المدينة غير موجودة' : 'Ville non trouvée'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'المدينة التي تبحث عنها غير موجودة' : 'La ville que vous recherchez n\'existe pas'}
          </p>
        </div>
      </div>
    );
  }

  // Récupérer les paramètres de recherche de l'URL
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  const seoData = {
    title: language === 'ar' 
      ? `شقق للكراء اليومي في ${cityData.nameAr} | Babna.ma`
      : language === 'en'
      ? `Daily Apartment Rentals in ${cityData.name} | Babna.ma`
      : language === 'es'
      ? `Alquiler de Apartamentos Diarios en ${cityData.name} | Babna.ma`
      : `Appartements à louer à ${cityData.name} | Babna.ma`,
    description: language === 'ar' 
      ? `اكتشف شقق مفروشة للكراء في ${cityData.nameAr}. ${cityData.descriptionAr}`
      : language === 'en'
      ? `Discover furnished apartments for rent in ${cityData.name}. ${cityData.description}`
      : language === 'es'
      ? `Descubre apartamentos amueblados para alquilar en ${cityData.name}. ${cityData.description}`
      : `Découvrez des appartements meublés à louer à ${cityData.name}. ${cityData.description}`,
    keywords: language === 'ar'
      ? `شقق للكراء اليومي, شقق مفروشة, كراء يومي, ${cityData.nameAr}, المغرب`
      : `location appartements, appartements meublés, location journalière, ${cityData.name}, Maroc`,
    canonical: `/appartements/ville/${citySlug}`
  };

  return (
    <>
      <MultilingualMeta
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={seoData.canonical}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' 
                ? `شقق للكراء اليومي في ${cityData.nameAr}`
                : language === 'en'
                ? `Daily Apartment Rentals in ${cityData.name}`
                : language === 'es'
                ? `Alquiler de Apartamentos Diarios en ${cityData.name}`
                : `Appartements à louer à ${cityData.name}`
              }
            </h1>
            {checkIn && checkOut && (
              <p className="text-gray-600 mt-2">
                {language === 'ar' 
                  ? `من ${checkIn} إلى ${checkOut}`
                  : `Du ${checkIn} au ${checkOut}`
                }
                {guests && (
                  <span>
                    {language === 'ar' 
                      ? ` • ${guests} ${parseInt(guests) === 1 ? 'شخص' : 'أشخاص'}`
                      : ` • ${guests} ${parseInt(guests) === 1 ? 'personne' : 'personnes'}`
                    }
                  </span>
                )}
              </p>
            )}
          </div>
          <div className="text-gray-600">
            {cityProperties.length} {language === 'ar' ? 'سكن' : 'logements'} {language === 'ar' ? 'موجود' : 'trouvés'}
          </div>
        </div>
        
        {cityProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityProperties.map((property: any) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'لا توجد خصائص متاحة في هذه المدينة حالياً'
                : 'Aucune propriété disponible dans cette ville pour le moment'
              }
            </p>
          </div>
        )}
        
        {/* Contenu unique pour améliorer le SEO */}
        <div className="mt-16 space-y-12">
          <FAQSection category="city" relatedTo={citySlug} />
          <TestimonialsSection city={cityData.name} limit={6} />
        </div>
      </div>
    </>
  );
};

export default CityPage;
