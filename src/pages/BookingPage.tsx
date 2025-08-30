import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, MapPin, Star, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SEOManager from '../components/SEO/SEOManager';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import PropertyTags from '../components/Properties/PropertyTags';
import { supabase } from '../lib/supabase';

interface BookingFormData {
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  message: string;
}

const BookingPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { user, language } = useApp();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    check_in: '',
    check_out: '',
    guests: 1,
    total_price: 0,
    message: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .eq('is_available', true)
          .eq('is_approved', true)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          alert(language === 'ar' ? 'العقار غير متاح للكراء' : 'Cette propriété n\'est pas disponible');
          navigate('/appartements');
          return;
        }

        setProperty(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la propriété:', error);
        alert(language === 'ar' ? 'حدث خطأ أثناء تحميل العقار' : 'Erreur lors du chargement de la propriété');
        navigate('/appartements');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, language, navigate]);

  const calculateTotalPrice = (checkIn: string, checkOut: string, guests: number) => {
    if (!checkIn || !checkOut || !property) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return nights * property.price;
  };

  const handleDateChange = (field: 'check_in' | 'check_out', value: string) => {
    const newFormData = { ...formData, [field]: value };
    
    // Calculer le prix total
    const total = calculateTotalPrice(
      field === 'check_in' ? value : formData.check_in,
      field === 'check_out' ? value : formData.check_out,
      formData.guests
    );
    
    setFormData({ ...newFormData, total_price: total });
  };

  const handleGuestsChange = (value: number) => {
    const total = calculateTotalPrice(formData.check_in, formData.check_out, value);
    setFormData({ ...formData, guests: value, total_price: total });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Vous devez être connecté pour réserver');
      navigate('/login');
      return;
    }

    if (!property || !propertyId) {
      alert(language === 'ar' ? 'العقار غير متاح' : 'Propriété non disponible');
      return;
    }

    if (formData.check_in >= formData.check_out) {
      alert(language === 'ar' ? 'تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول' : 'La date de départ doit être après la date d\'arrivée');
      return;
    }

    setBooking(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            property_id: propertyId,
            user_id: user.id,
            check_in: formData.check_in,
            check_out: formData.check_out,
            guests: formData.guests,
            total_price: formData.total_price,
            message: formData.message,
            status: 'pending' // En attente d'approbation du propriétaire
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      alert(language === 'ar' 
        ? 'تم إرسال طلب الحجز بنجاح! سيتم إعلامك عند موافقة المالك.'
        : 'Demande de réservation envoyée avec succès ! Vous serez notifié de la réponse du propriétaire.'
      );
      
      navigate('/voyageur/reservations');
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء إرسال طلب الحجز'
        : 'Une erreur est survenue lors de l\'envoi de la demande'
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'ar' ? 'جاري تحميل العقار...' : 'Chargement de la propriété...'}
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">
            {language === 'ar' ? 'العقار غير موجود' : 'Propriété non trouvée'}
          </p>
        </div>
      </div>
    );
  }

  const seoData = {
    title: language === 'ar' 
      ? `حجز ${property.title} | Babna.ma`
      : `Réserver ${property.title} | Babna.ma`,
    description: language === 'ar'
      ? `احجز ${property.title} في ${property.city}`
      : `Réservez ${property.title} à ${property.city}`,
    keywords: language === 'ar'
      ? 'حجز عقار, كراء, Babna.ma'
      : 'réserver propriété, location, Babna.ma'
  };

  return (
    <>
      <SEOManager
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informations de la propriété */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'تفاصيل العقار' : 'Détails de la propriété'}
            </h1>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.city}, {property.address}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-orange-600">
                  {property.price} MAD
                </span>
                <span className="text-gray-500">
                  {language === 'ar' ? 'لليلة الواحدة' : '/nuit'}
                </span>
                {property.rating > 0 && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{property.rating} ({property.reviews_count} {language === 'ar' ? 'تقييم' : 'avis'})</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span>🛏️ {property.bedrooms} {language === 'ar' ? 'غرف' : 'chambres'}</span>
                <span>🚿 {property.bathrooms} {language === 'ar' ? 'حمامات' : 'sdb'}</span>
                <span>👥 {property.max_guests} {language === 'ar' ? 'ضيوف' : 'voyageurs max'}</span>
              </div>

              {property.tags && property.tags.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {language === 'ar' ? 'المعالم السياحية القريبة' : 'Attractions à proximité'}
                  </h3>
                  <PropertyTags tagIds={property.tags} maxDisplay={5} />
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'الوصف' : 'Description'}
                </h3>
                <p className="text-gray-600">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {language === 'ar' ? 'المرافق' : 'Équipements'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Formulaire de réservation */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'حجز العقار' : 'Réserver cette propriété'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'تاريخ الوصول' : 'Date d\'arrivée'}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.check_in}
                      onChange={(e) => handleDateChange('check_in', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'تاريخ المغادرة' : 'Date de départ'}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      min={formData.check_in || new Date().toISOString().split('T')[0]}
                      value={formData.check_out}
                      onChange={(e) => handleDateChange('check_out', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Nombre de voyageurs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'عدد المسافرين' : 'Nombre de voyageurs'}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => handleGuestsChange(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {Array.from({ length: property.max_guests }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {language === 'ar' ? 'شخص' : num === 1 ? 'personne' : 'personnes'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message au propriétaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'رسالة للمالك (اختياري)' : 'Message au propriétaire (optionnel)'}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={language === 'ar' ? 'أخبر المالك عن سبب زيارتك أو أي طلبات خاصة...' : 'Dites au propriétaire pourquoi vous visitez ou vos demandes spéciales...'}
                />
              </div>

              {/* Résumé du prix */}
              {formData.total_price > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">
                    {language === 'ar' ? 'ملخص الحجز' : 'Résumé de la réservation'}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {property.price} MAD × {Math.ceil((new Date(formData.check_out).getTime() - new Date(formData.check_in).getTime()) / (1000 * 60 * 60 * 24))} {language === 'ar' ? 'ليلة' : 'nuits'}
                      </span>
                      <span className="font-medium">{formData.total_price} MAD</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>{language === 'ar' ? 'المجموع' : 'Total'}</span>
                      <span className="text-orange-600">{formData.total_price} MAD</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bouton de réservation */}
              <button
                type="submit"
                disabled={booking || formData.total_price === 0}
                className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {booking ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {language === 'ar' ? 'جاري إرسال الطلب...' : 'Envoi en cours...'}
                  </>
                ) : (
                  <>
                    <DollarSign className="h-5 w-5 mr-2" />
                    {language === 'ar' ? 'إرسال طلب الحجز' : 'Envoyer la demande de réservation'}
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                {language === 'ar' 
                  ? 'سيتم إرسال طلب الحجز إلى المالك للموافقة عليه'
                  : 'Votre demande sera envoyée au propriétaire pour approbation'
                }
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
