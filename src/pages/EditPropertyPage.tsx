import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SEOManager from '../components/SEO/SEOManager';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import CitySelector from '../components/Properties/CitySelector';
import TagSelector from '../components/Properties/TagSelector';
import { supabase } from '../lib/supabase';

interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  city: string;
  address: string;
  lat: number;
  lng: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  property_type: 'apartment' | 'villa' | 'riad' | 'studio';
  tags: string[];
}

const EditPropertyPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { language, user } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    price: 0,
    city: '',
    address: '',
    lat: 0,
    lng: 0,
    images: [],
    amenities: [],
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    property_type: 'apartment',
    tags: []
  });

  const amenitiesOptions = [
    'WiFi',
    'Climatisation',
    'Cuisine équipée',
    'Parking',
    'Balcon',
    'Terrasse',
    'Piscine',
    'Jardin',
    'Salle de sport',
    'Spa',
    'Chauffage',
    'Machine à laver',
    'Sèche-cheveux',
    'Télévision',
    'Netflix',
    'Petit-déjeuner inclus'
  ];

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId || !user) return;

      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', propertyId)
          .eq('owner_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          alert(language === 'ar' ? 'العقار غير موجود' : 'Propriété non trouvée');
          navigate('/proprietaire/dashboard');
          return;
        }

        setProperty(data);
        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || 0,
          city: data.city || '',
          address: data.address || '',
          lat: data.lat || 0,
          lng: data.lng || 0,
          images: data.images || [],
          amenities: data.amenities || [],
          bedrooms: data.bedrooms || 1,
          bathrooms: data.bathrooms || 1,
          max_guests: data.max_guests || 2,
          property_type: data.property_type || 'apartment',
          tags: data.tags || []
        });
      } catch (error) {
        console.error('Erreur lors de la récupération de la propriété:', error);
        alert(language === 'ar' ? 'حدث خطأ أثناء تحميل العقار' : 'Erreur lors du chargement de la propriété');
        navigate('/proprietaire/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, user, language, navigate]);

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageAdd = (imageUrl: string) => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !propertyId) {
      alert(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Vous devez être connecté');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from('properties')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', propertyId)
        .eq('owner_id', user.id);

      if (error) {
        throw error;
      }

      alert(language === 'ar' 
        ? 'تم تحديث العقار بنجاح!'
        : 'Propriété mise à jour avec succès !'
      );
      
      navigate('/proprietaire/dashboard');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la propriété:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء تحديث العقار'
        : 'Une erreur est survenue lors de la mise à jour de la propriété'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !propertyId) return;

    const confirmDelete = window.confirm(
      language === 'ar' 
        ? 'هل أنت متأكد من حذف هذا العقار؟'
        : 'Êtes-vous sûr de vouloir supprimer cette propriété ?'
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)
        .eq('owner_id', user.id);

      if (error) {
        throw error;
      }

      alert(language === 'ar' 
        ? 'تم حذف العقار بنجاح!'
        : 'Propriété supprimée avec succès !'
      );
      
      navigate('/proprietaire/dashboard');
    } catch (error) {
      console.error('Erreur lors de la suppression de la propriété:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء حذف العقار'
        : 'Une erreur est survenue lors de la suppression de la propriété'
      );
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

  const seoData = {
    title: language === 'ar' 
      ? 'تعديل العقار | Babna.ma'
      : 'Modifier la propriété | Babna.ma',
    description: language === 'ar'
      ? 'عدّل معلومات عقارك على منصة Babna.ma'
      : 'Modifiez les informations de votre propriété sur Babna.ma',
    keywords: language === 'ar'
      ? 'تعديل عقار, كراء عقارات, Babna.ma'
      : 'modifier propriété, location appartements, Babna.ma'
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
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'تعديل العقار' : 'Modifier la propriété'}
            </h1>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              {language === 'ar' ? 'حذف العقار' : 'Supprimer'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'عنوان العقار' : 'Titre de la propriété'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={language === 'ar' ? 'مثال: شقة فاخرة في وسط المدينة' : 'Ex: Appartement luxueux au centre-ville'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'السعر لليلة الواحدة (درهم)' : 'Prix par nuit (DH)'}
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'وصف العقار' : 'Description'}
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder={language === 'ar' ? 'وصف مفصل للعقار...' : 'Description détaillée de la propriété...'}
              />
            </div>

            {/* Localisation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'المدينة' : 'Ville'}
                </label>
                <CitySelector
                  selectedCity={formData.city}
                  onCitySelect={(city) => handleInputChange('city', city)}
                  placeholder={language === 'ar' ? 'اختر مدينة' : 'Choisir une ville'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'العنوان' : 'Adresse'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={language === 'ar' ? 'العنوان الكامل' : 'Adresse complète'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'نوع العقار' : 'Type de propriété'}
                </label>
                <select
                  required
                  value={formData.property_type}
                  onChange={(e) => handleInputChange('property_type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="apartment">{language === 'ar' ? 'شقة' : 'Appartement'}</option>
                  <option value="villa">{language === 'ar' ? 'فيلا' : 'Villa'}</option>
                  <option value="riad">{language === 'ar' ? 'رياض' : 'Riad'}</option>
                  <option value="studio">{language === 'ar' ? 'استوديو' : 'Studio'}</option>
                </select>
              </div>
            </div>

            {/* Capacité */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'عدد الغرف' : 'Chambres'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'عدد الحمامات' : 'Salles de bain'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الضيوف الأقصى' : 'Voyageurs max'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.max_guests}
                  onChange={(e) => handleInputChange('max_guests', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Coordonnées GPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => handleInputChange('lat', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="31.6295"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => handleInputChange('lng', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="-8.0080"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'روابط الصور' : 'Liens des images'}
              </label>
              <div className="space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[index] = e.target.value;
                        handleInputChange('images', newImages);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      {language === 'ar' ? 'حذف' : 'Supprimer'}
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleImageAdd('')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  {language === 'ar' ? 'إضافة صورة' : 'Ajouter une image'}
                </button>
              </div>
            </div>

            {/* Équipements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'المرافق' : 'Équipements'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenitiesOptions.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags d'attractions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'المعالم السياحية القريبة' : 'Attractions touristiques à proximité'}
              </label>
              <TagSelector
                selectedTags={formData.tags}
                onTagsChange={(tags) => handleInputChange('tags', tags)}
                placeholder={language === 'ar' ? 'اختر المعالم السياحية القريبة' : 'Sélectionner les attractions à proximité'}
                maxTags={8}
              />
            </div>

            {/* Boutons de soumission */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/proprietaire/dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                {language === 'ar' ? 'إلغاء' : 'Annuler'}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {saving 
                  ? (language === 'ar' ? 'جاري الحفظ...' : 'Sauvegarde en cours...')
                  : (language === 'ar' ? 'حفظ التغييرات' : 'Sauvegarder les modifications')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPropertyPage;
