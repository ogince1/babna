import React, { useState, useEffect } from 'react';
import { Star, MapPin, Bed, Bath, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import { supabaseHelpers } from '../../lib/supabase';

interface FeaturedPropertiesProps {
  onPropertySelect: (property: any) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ onPropertySelect }) => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await supabaseHelpers.getProperties();
        setProperties(data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const featuredProperties = properties.slice(0, 3);

  const handlePropertyClick = (property: any) => {
    onPropertySelect(property);
  };

  const handleViewAll = () => {
    navigate('/appartements');
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des propriétés...</p>
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'لا توجد خصائص متاحة' : 'Aucune propriété disponible'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'ar' ? 'تحقق مرة أخرى لاحقاً' : 'Vérifiez plus tard'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الخصائص المميزة' : 'Logements populaires'}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اكتشف أفضل الخصائص المختارة بعناية من قبل مسافرينا'
              : 'Découvrez nos logements les mieux notés par nos voyageurs'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => handlePropertyClick(property)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={property.images?.[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-md">
                  {property.price} MAD/{language === 'ar' ? 'ليلة' : 'nuit'}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{property.rating || 4.5}</span>
                    <span className="text-sm text-gray-500">({property.reviews_count || 0} {language === 'ar' ? 'تقييم' : 'avis'})</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.city}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms} {language === 'ar' ? 'غرفة نوم' : 'chambres'}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} {language === 'ar' ? 'حمام' : 'salles de bain'}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {property.max_guests} {language === 'ar' ? 'شخص' : 'personnes'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewAll}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            {language === 'ar' ? 'عرض جميع الخصائص' : 'Voir tous les logements'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;