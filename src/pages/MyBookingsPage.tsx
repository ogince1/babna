import React from 'react';
import SEOManager from '../components/SEO/SEOManager';
import { useApp } from '../context/AppContext';

const MyBookingsPage: React.FC = () => {
  const { currentLanguage } = useApp();

  const seoData = {
    title: currentLanguage === 'ar' 
      ? 'حجوزاتي | Babna.ma'
      : 'Mes réservations | Babna.ma',
    description: currentLanguage === 'ar'
      ? 'عرض وإدارة حجوزاتك في Babna.ma'
      : 'Consultez et gérez vos réservations sur Babna.ma',
    canonical: '/my-bookings'
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
          {currentLanguage === 'ar' ? 'حجوزاتي' : 'Mes réservations'}
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-600">
            {currentLanguage === 'ar' 
              ? 'لا توجد حجوزات حالياً'
              : 'Vous n\'avez pas encore de réservations.'
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

export default MyBookingsPage;

