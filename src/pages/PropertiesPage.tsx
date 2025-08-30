import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOManager from '../components/SEO/SEOManager';
import PropertyCard from '../components/Properties/PropertyCard';
import PropertyMap from '../components/Properties/PropertyMap';
import CitySelector from '../components/Properties/CitySelector';
import { useApp } from '../context/AppContext';
import { supabase, supabaseHelpers } from '../lib/supabase';
import { Property } from '../types';
import { Map, List, Filter } from 'lucide-react';

interface PropertiesPageProps {
  onPropertySelect: (property: Property) => void;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({ onPropertySelect }) => {
  const { language } = useApp();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupérer les paramètres de recherche depuis l'URL
  useEffect(() => {
    const cityFromParams = searchParams.get('city');
    const checkInFromParams = searchParams.get('checkIn');
    const checkOutFromParams = searchParams.get('checkOut');
    const guestsFromParams = searchParams.get('guests');
    
    if (cityFromParams) {
      setSelectedCity(cityFromParams);
    }
    
    // Ici vous pouvez ajouter la logique pour gérer les autres paramètres
    // comme les dates de check-in/check-out et le nombre de voyageurs
  }, [searchParams]);

  // Charger les propriétés depuis Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log('🔄 Début du chargement des propriétés...');
        setLoading(true);
        
        console.log('📞 Appel de supabaseHelpers.getProperties()...');
        const data = await supabaseHelpers.getProperties();
        console.log('✅ Données reçues:', data?.length || 0, 'propriétés');
        
        setProperties(data || []);
        console.log('✅ Propriétés définies dans le state');
      } catch (error) {
        console.error('❌ Erreur lors du chargement des propriétés:', error);
        setProperties([]);
      } finally {
        console.log('🏁 Fin du chargement, setLoading(false)');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filtrer les propriétés selon la ville sélectionnée
  const filteredProperties = selectedCity 
    ? properties.filter(property => (property as any).city === selectedCity)
    : properties;

  const seoData = {
    title: language === 'ar' 
      ? 'شقق للكراء اليومي في المغرب | جميع المدن'
      : language === 'en'
      ? 'Daily Apartment Rentals in Morocco | All Cities'
      : language === 'es'
      ? 'Alquiler de Apartamentos Diarios en Marruecos | Todas las Ciudades'
      : 'Appartements à louer par jour au Maroc | Toutes les villes',
    description: language === 'ar'
      ? 'اكتشف جميع الشقق المفروشة للكراء اليومي في المغرب. مراكش، الدار البيضاء، فاس، الرباط، أكادير، طنجة.'
      : language === 'en'
      ? 'Discover all furnished apartments for daily rental in Morocco. Marrakech, Casablanca, Fes, Rabat, Agadir, Tangier.'
      : language === 'es'
      ? 'Descubre todos los apartamentos amueblados para alquiler diario en Marruecos. Marrakech, Casablanca, Fez, Rabat, Agadir, Tánger.'
      : 'Découvrez tous nos appartements meublés à louer par jour au Maroc. Marrakech, Casablanca, Fès, Rabat, Agadir, Tanger.',
    keywords: language === 'ar'
      ? 'شقق للكراء اليومي, شقق مفروشة, كراء يومي, المغرب, جميع المدن'
      : language === 'en'
      ? 'daily apartment rentals, furnished apartments, daily rental, Morocco, all cities'
      : language === 'es'
      ? 'alquiler de apartamentos diarios, apartamentos amueblados, alquiler diario, Marruecos, todas las ciudades'
      : 'location appartements, appartements meublés, location journalière, Maroc, toutes les villes',
    canonical: '/appartements'
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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري تحميل العقارات...' : 'Chargement des propriétés...'}
            </p>
          </div>
        ) : (
          <>
            {/* Header avec contrôles */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language === 'ar' 
                    ? 'شقق للكراء اليومي في المغرب'
                    : language === 'en'
                    ? 'Daily Apartment Rentals in Morocco'
                    : language === 'es'
                    ? 'Alquiler de Apartamentos Diarios en Marruecos'
                    : 'Appartements à louer par jour au Maroc'
                  }
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredProperties.length} {language === 'ar' ? 'عقار متاح' : 'logements disponibles'}
                  {selectedCity && ` ${language === 'ar' ? 'في' : 'à'} ${selectedCity}`}
                </p>
              </div>
              
              {/* Contrôles de vue et filtres */}
              <div className="flex items-center space-x-4">
                {/* Sélecteur de ville */}
                <CitySelector
                  selectedCity={selectedCity}
                  onCitySelect={setSelectedCity}
                  className="w-64"
                />
                
                {/* Bouton filtres */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  <span>{language === 'ar' ? 'تصفية' : 'Filtres'}</span>
                </button>
                
                {/* Boutons de vue */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="h-5 w-5" />
                    <span>{language === 'ar' ? 'قائمة' : 'Liste'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                      viewMode === 'map' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Map className="h-5 w-5" />
                    <span>{language === 'ar' ? 'خريطة' : 'Carte'}</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">
                {language === 'ar' 
                  ? 'مزايا الكراء اليومي'
                  : 'Avantages de la location journalière'
                }
              </h2>
              <ul className="text-blue-800 space-y-1">
                <li>• {language === 'ar' ? 'مرونة في التواريخ' : 'Flexibilité des dates'}</li>
                <li>• {language === 'ar' ? 'أسعار تنافسية' : 'Prix compétitifs'}</li>
                <li>• {language === 'ar' ? 'راحة مضمونة' : 'Confort garanti'}</li>
                <li>• {language === 'ar' ? 'خدمة 24/7' : 'Service 24/7'}</li>
              </ul>
            </div>
            
            {/* Contenu selon le mode de vue */}
            {viewMode === 'list' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={(property) => {
                      setSelectedProperty(property);
                      onPropertySelect(property);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Carte interactive */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {language === 'ar' ? 'خريطة العقارات' : 'Carte des propriétés'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {language === 'ar' 
                        ? 'انقر على أي علامة لرؤية تفاصيل العقار'
                        : 'Cliquez sur un marqueur pour voir les détails de la propriété'
                      }
                    </p>
                  </div>
                  <PropertyMap
                    properties={filteredProperties}
                    selectedProperty={selectedProperty}
                    onPropertySelect={(property) => {
                      setSelectedProperty(property);
                      onPropertySelect(property);
                    }}
                    height="600px"
                  />
                </div>
                
                {/* Propriété sélectionnée sur la carte */}
                {selectedProperty && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {language === 'ar' ? 'العقار المحدد' : 'Propriété sélectionnée'}
                    </h3>
                    <PropertyCard
                      property={selectedProperty}
                      onSelect={onPropertySelect}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PropertiesPage;

