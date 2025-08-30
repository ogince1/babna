import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Bed, Bath, Users, Heart, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import SEOManager from '../components/SEO/SEOManager';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import PropertyMap from '../components/Properties/PropertyMap';
import { useApp } from '../context/AppContext';
import { supabaseHelpers } from '../lib/supabase';

const PropertyDetailPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { language, isAuthenticated } = useApp();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (propertyId) {
        try {
          console.log('🔄 Chargement de la propriété:', propertyId);
          const data = await supabaseHelpers.getPropertyById(propertyId);
          console.log('✅ Propriété chargée:', data);
          setProperty(data);
        } catch (error) {
          console.error('❌ Erreur lors du chargement de la propriété:', error);
          setProperty(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProperty();
  }, [propertyId]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      // Rediriger vers la page de connexion
      navigate('/?login=true');
      return;
    }
    setShowBookingForm(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez implémenter la logique de réservation
    console.log('Booking data:', bookingData);
    alert('Réservation en cours de traitement...');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la propriété...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'الخاصية غير موجودة' : 'Propriété non trouvée'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'الخاصية التي تبحث عنها غير موجودة' : 'La propriété que vous recherchez n\'existe pas'}
          </p>
        </div>
      </div>
    );
  }

  const seoData = {
            title: `${property.title} - ${property.city} | Babna.ma`,
    description: property.description,
    keywords: `location appartements, ${property.city}, Maroc, ${property.property_type}`,
    canonical: `/appartements/${propertyId}`
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
        
        {/* Header avec bouton retour */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{language === 'ar' ? 'العودة' : 'Retour'}</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={property.images?.[selectedImage] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={property.title}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {property.images?.slice(0, 4).map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 1}`}
                className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-opacity ${
                  selectedImage === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.city}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span>{property.rating || 4.5}</span>
                    <span className="ml-1">({property.reviews_count || 0} {language === 'ar' ? 'تقييم' : 'avis'})</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{property.price} MAD</div>
                <div className="text-gray-600">{language === 'ar' ? 'ليلة' : 'par nuit'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Bed className="h-5 w-5 text-gray-600 mr-2" />
                <span>{property.bedrooms} {language === 'ar' ? 'غرفة نوم' : 'chambres'}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 text-gray-600 mr-2" />
                <span>{property.bathrooms} {language === 'ar' ? 'حمام' : 'salles de bain'}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-600 mr-2" />
                <span>{property.max_guests} {language === 'ar' ? 'شخص' : 'personnes max'}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'ar' ? 'الوصف' : 'Description'}
              </h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'ar' ? 'المرافق' : 'Équipements'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Carte de localisation */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'ar' ? 'الموقع' : 'Localisation'}
              </h2>
                              <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">{property.address}</span>
                  </div>
                  <PropertyMap
                    properties={[property]}
                    selectedProperty={property}
                    height="300px"
                  />
                </div>
            </div>
          </div>

          {/* Carte de réservation */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-orange-600">
                  {property.price} MAD
                </span>
                <span className="text-gray-500 ml-1">
                  {language === 'ar' ? 'لليلة الواحدة' : '/nuit'}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'التقييم' : 'Note'}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1">{property.rating || 0}</span>
                    <span className="text-gray-500 ml-1">({property.reviews_count || 0})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'الموقع' : 'Localisation'}
                  </span>
                  <span className="text-gray-900">{property.city}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'الضيوف الأقصى' : 'Voyageurs max'}
                  </span>
                  <span className="text-gray-900">{property.max_guests}</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/reserver/${property.id}`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {language === 'ar' ? 'احجز الآن' : 'Réserver maintenant'}
              </button>

              <div className="mt-4 text-center text-sm text-gray-600">
                {language === 'ar' 
                  ? 'لا توجد رسوم إضافية'
                  : 'Aucuns frais supplémentaires'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;

