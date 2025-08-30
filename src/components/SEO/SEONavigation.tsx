import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { seoData } from '../../data/seoData';

const SEONavigation: React.FC = () => {
  const { language } = useApp();
  
  const getPropertyText = () => {
    return language === 'ar' ? 'شقق للكراء اليومي' : 
           language === 'en' ? 'Properties' : 
           language === 'es' ? 'Propiedades' : 
           'Appartements';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {language === 'ar' ? 'تصفح حسب المدينة' : 
         language === 'en' ? 'Browse by City' : 
         language === 'es' ? 'Navegar por Ciudad' : 
         'Parcourir par ville'}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {seoData.cities.map((city) => (
          <Link
            key={city.slug}
            to={`/appartements/ville/${city.slug}`}
            className="block p-3 text-center bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <div className="font-medium text-gray-900">
              {language === 'ar' ? city.name.ar : city.name.fr}
            </div>
            <div className="text-sm text-gray-600">
              {getPropertyText()}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
        {language === 'ar' ? 'تصفح حسب النوع' : 
         language === 'en' ? 'Browse by Type' : 
         language === 'es' ? 'Navegar por Tipo' : 
         'Parcourir par type'}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {seoData.types.map((type) => (
          <Link
            key={type.slug}
            to={`/appartements/type/${type.slug}`}
            className="block p-3 text-center bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <div className="font-medium text-gray-900">
              {language === 'ar' ? type.name.ar : type.name.fr}
            </div>
            <div className="text-sm text-gray-600">
              {getPropertyText()}
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
        {language === 'ar' ? 'أماكن مميزة' : 
         language === 'en' ? 'Popular Places' : 
         language === 'es' ? 'Lugares Populares' : 
         'Lieux populaires'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {seoData.places.map((place) => (
          <Link
            key={place.slug}
            to={`/appartements/lieu/${place.slug}`}
            className="block p-3 text-center bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <div className="font-medium text-gray-900">
              {language === 'ar' ? place.name.ar : place.name.fr}
            </div>
            <div className="text-sm text-gray-600">
              {getPropertyText()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SEONavigation;
