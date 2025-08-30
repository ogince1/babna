import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SEOManager from '../components/SEO/SEOManager';
import PropertyCard from '../components/Properties/PropertyCard';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import { useApp } from '../context/AppContext';
import { getTypeBySlug } from '../data/seoData';
import { properties } from '../data/mockData';
import { Property } from '../types';

const TypePage: React.FC = () => {
  const { typeSlug } = useParams<{ typeSlug: string }>();
  const { currentLanguage } = useApp();
  const [typeProperties, setTypeProperties] = useState<Property[]>([]);
  const [typeData, setTypeData] = useState<any>(null);

  useEffect(() => {
    if (typeSlug) {
      const data = getTypeBySlug(typeSlug);
      setTypeData(data);
      
      // Filtrer les propriétés par type (logique simplifiée pour l'exemple)
      let filtered = properties;
      
      switch (typeSlug) {
        case 'pas-cher':
          filtered = properties.filter(property => property.price < 500);
          break;
        case 'luxe':
          filtered = properties.filter(property => property.price > 800);
          break;
        case 'plage':
          filtered = properties.filter(property => 
            property.location.city.toLowerCase() === 'agadir'
          );
          break;
        case 'famille':
          filtered = properties.filter(property => property.maxGuests >= 4);
          break;
        default:
          filtered = properties;
      }
      
      setTypeProperties(filtered);
    }
  }, [typeSlug]);

  if (!typeData) {
    return <div className="p-8 text-center">Type non trouvé</div>;
  }

  const seoData = {
    title: currentLanguage === 'ar' ? typeData.title.ar : typeData.title.fr,
    description: currentLanguage === 'ar' ? typeData.description.ar : typeData.description.fr,
    keywords: currentLanguage === 'ar'
      ? `شقق ${typeData.name.ar}, شقق للكراء, كراء يومي, المغرب`
      : `appartements ${typeData.name.fr}, location appartements, location journalière, Maroc`,
    canonical: `/appartements/type/${typeSlug}`
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
            {currentLanguage === 'ar' ? typeData.h1.ar : typeData.h1.fr}
          </h1>
          <div className="text-gray-600">
            {typeProperties.length} logements trouvés
          </div>
        </div>
        
        {typeProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {typeProperties.map((property) => (
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
                ? 'لا توجد شقق متاحة حالياً من هذا النوع'
                : 'Aucun appartement disponible actuellement de ce type'
              }
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TypePage;
