import React from 'react';
import MultilingualMeta from '../components/SEO/MultilingualMeta';
import SearchSection from '../components/Home/SearchSection';
import FeaturedProperties from '../components/Home/FeaturedProperties';
import SEONavigation from '../components/SEO/SEONavigation';
import TagsGrid from '../components/Home/TagsGrid';
import FAQSection from '../components/Content/FAQSection';
import TestimonialsSection from '../components/Content/TestimonialsSection';
import { useApp } from '../context/AppContext';
import { Property } from '../types';

interface HomePageProps {
  onPropertySelect: (property: Property) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPropertySelect }) => {
  const { language } = useApp();

  const seoData = {
            title: language === 'ar'
          ? 'شقق للكراء اليومي في المغرب | Babna.ma'
          : language === 'en'
          ? 'Daily Apartment Rentals in Morocco | Babna.ma'
          : language === 'es'
          ? 'Alquiler de Apartamentos Diarios en Marruecos | Babna.ma'
          : 'Location d\'appartements meublés par jour au Maroc | Babna.ma',
    description: language === 'ar'
      ? 'اكتشف أفضل الشقق المفروشة للكراء اليومي في المغرب. أسعار تنافسية، راحة مضمونة، خدمة 24/7.'
      : language === 'en'
      ? 'Discover the best furnished apartments for daily rental in Morocco. Competitive prices, guaranteed comfort, 24/7 service.'
      : language === 'es'
      ? 'Descubre los mejores apartamentos amueblados para alquiler diario en Marruecos. Precios competitivos, comodidad garantizada, servicio 24/7.'
      : 'Découvrez les meilleurs appartements meublés à louer par jour au Maroc. Prix compétitifs, confort garanti, service 24/7.',
    keywords: language === 'ar'
      ? 'شقق للكراء اليومي, شقق مفروشة, كراء يومي, المغرب, مراكش, الدار البيضاء, فاس, الرباط'
      : language === 'en'
      ? 'daily apartment rentals, furnished apartments, daily rental, Morocco, Marrakech, Casablanca, Fes, Rabat'
      : language === 'es'
      ? 'alquiler de apartamentos diarios, apartamentos amueblados, alquiler diario, Marruecos, Marrakech, Casablanca, Fez, Rabat'
      : 'location appartements, appartements meublés, location journalière, Maroc, Marrakech, Casablanca, Fès, Rabat'
  };

  return (
    <>
      <MultilingualMeta
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/"
      />
      
      <div>
        <SearchSection />
        <SEONavigation />
        <TagsGrid />
        <FeaturedProperties onPropertySelect={onPropertySelect} />
        
        {/* Contenu unique pour améliorer le SEO */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FAQSection category="general" />
            <TestimonialsSection limit={3} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
