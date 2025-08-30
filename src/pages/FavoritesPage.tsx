import React from 'react';
import SEOManager from '../components/SEO/SEOManager';
import { useApp } from '../context/AppContext';

const FavoritesPage: React.FC = () => {
  const { currentLanguage } = useApp();

  const seoData = {
    title: currentLanguage === 'ar' 
      ? 'المفضلة | Babna.ma'
      : 'Mes favoris | Babna.ma',
    description: currentLanguage === 'ar'
      ? 'عرض شققك المفضلة في Babna.ma'
      : 'Consultez vos appartements favoris sur Babna.ma',
    canonical: '/favorites'
  };

  return (
    <>
      <SEOManager
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {currentLanguage === 'ar' ? 'المفضلة' : 'Mes favoris'}
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-600">
            {currentLanguage === 'ar' 
              ? 'لا توجد شقق في المفضلة حالياً'
              : 'Aucun logement dans vos favoris pour le moment.'
            }
          </p>
          <button 
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {currentLanguage === 'ar' ? 'اكتشف شققنا' : 'Découvrir nos logements'}
          </button>
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;

