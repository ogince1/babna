import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEOManager from '../components/SEO/SEOManager';
import PropertyCard from '../components/Properties/PropertyCard';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { getPlaceBySlug } from '../data/seoData';
import { properties } from '../data/mockData';
import { Property } from '../types';

const PlacePage: React.FC = () => {
  const { placeSlug } = useParams<{ placeSlug: string }>();
  const { currentLanguage } = useApp();
  const [placeProperties, setPlaceProperties] = useState<Property[]>([]);
  const [placeData, setPlaceData] = useState<any>(null);

  useEffect(() => {
    if (placeSlug) {
      const data = getPlaceBySlug(placeSlug);
      setPlaceData(data);
      
      // Filtrer les propriétés par lieu (logique simplifiée pour l'exemple)
      let filtered = properties;
      
      if (data) {
        // Filtrer par ville du lieu
        filtered = properties.filter(property => 
          property.location.city.toLowerCase() === data.city
        );
      }
      
      setPlaceProperties(filtered);
    }
  }, [placeSlug]);

  if (!placeData) {
    return <div className="p-8 text-center">Lieu non trouvé</div>;
  }

  const seoData = {
    title: currentLanguage === 'ar' ? placeData.title.ar : placeData.title.fr,
    description: currentLanguage === 'ar' ? placeData.description.ar : placeData.description.fr,
    keywords: currentLanguage === 'ar'
      ? `شقق للكراء, شقق مفروشة, كراء يومي, ${placeData.name.ar}, المغرب`
      : `location appartements, appartements meublés, location journalière, ${placeData.name.fr}, Maroc`,
    canonical: `/appartements/lieu/${placeSlug}`
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentLanguage === 'ar' ? placeData.h1.ar : placeData.h1.fr}
          </h1>
          <div className="text-gray-600">
            {placeProperties.length} logements trouvés
          </div>
        </div>
        
        {placeProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeProperties.map((property) => (
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
              {currentLanguage === 'ar' 
                ? 'لا توجد شقق متاحة حالياً في هذا المكان'
                : 'Aucun appartement disponible actuellement dans ce lieu'
              }
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PlacePage;
