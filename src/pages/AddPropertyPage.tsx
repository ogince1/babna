import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AddPropertyPage: React.FC = () => {
  const { language, user } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    
    if (!user) {
      alert(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Vous devez être connecté');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([
          {
            ...formData,
            owner_id: user.id,
            is_available: true,
            is_approved: false, // En attente d'approbation
            rating: 0,
            reviews_count: 0
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      alert(language === 'ar' 
        ? 'تم إضافة العقار بنجاح! سيتم مراجعته قريباً.'
        : 'Propriété ajoutée avec succès ! Elle sera examinée prochainement.'
      );
      
      navigate('/proprietaire/dashboard');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la propriété:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء إضافة العقار'
        : 'Une erreur est survenue lors de l\'ajout de la propriété'
      );
    } finally {
      setLoading(false);
    }
  };

  const seoData = {
    title: language === 'ar' 
      ? 'إضافة عقار جديد | Babna.ma'
      : 'Ajouter une propriété | Babna.ma',
    description: language === 'ar'
      ? 'أضف عقارك للكراء على منصة Babna.ma'
      : 'Ajoutez votre propriété à louer sur Babna.ma',
    keywords: language === 'ar'
      ? 'إضافة عقار, كراء عقارات, Babna.ma'
      : 'ajouter propriété, location appartements, Babna.ma'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'ar' ? 'إضافة عقار جديد' : 'Ajouter une propriété'}
          </h1>

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

            {/* Bouton de soumission */}
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
                disabled={loading}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {loading 
                  ? (language === 'ar' ? 'جاري الإضافة...' : 'Ajout en cours...')
                  : (language === 'ar' ? 'إضافة العقار' : 'Ajouter la propriété')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPropertyPage;
