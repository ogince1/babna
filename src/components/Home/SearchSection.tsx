import React, { useState } from 'react';
import { Search, Calendar, Users, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import CitySelector from '../Properties/CitySelector';
import { SearchFilters } from '../../types';
import { cityNameToSlug } from '../../utils/cityUtils';

interface SearchSectionProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface GuestSelectorProps {
  value: number;
  onChange: (value: number) => void;
  language: string;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ value, onChange, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    adults: 1,
    children: 0,
    babies: 0,
    pets: 0
  });

  const totalGuests = guestDetails.adults + guestDetails.children + guestDetails.babies;

  const updateGuestDetails = (type: keyof typeof guestDetails, newValue: number) => {
    const newDetails = { ...guestDetails, [type]: Math.max(0, newValue) };
    
    // S'assurer qu'il y a au moins 1 adulte
    if (type === 'adults' && newValue < 1) {
      newDetails.adults = 1;
    }
    
    setGuestDetails(newDetails);
    const total = newDetails.adults + newDetails.children + newDetails.babies;
    onChange(total);
  };

  const getDisplayText = () => {
    if (totalGuests === 1) {
      return language === 'ar' ? '1 شخص' : '1 personne';
    }
    return language === 'ar' ? `${totalGuests} أشخاص` : `${totalGuests} personnes`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 text-left flex items-center justify-between"
      >
        <span>{getDisplayText()}</span>
        <Users className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
          {/* Adultes */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {language === 'ar' ? 'بالغين' : 'Adultes'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? '13 سنة وما فوق' : '13 ans et plus'}
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button
                type="button"
                onClick={() => updateGuestDetails('adults', guestDetails.adults - 1)}
                disabled={guestDetails.adults <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-medium text-gray-900">{guestDetails.adults}</span>
              <button
                type="button"
                onClick={() => updateGuestDetails('adults', guestDetails.adults + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Enfants */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {language === 'ar' ? 'أطفال' : 'Enfants'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? 'من 2 إلى 12 سنة' : 'De 2 à 12 ans'}
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button
                type="button"
                onClick={() => updateGuestDetails('children', guestDetails.children - 1)}
                disabled={guestDetails.children <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-medium text-gray-900">{guestDetails.children}</span>
              <button
                type="button"
                onClick={() => updateGuestDetails('children', guestDetails.children + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Bébés */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {language === 'ar' ? 'رضع' : 'Bébés'}
              </div>
              <div className="text-sm text-gray-500">
                {language === 'ar' ? 'أقل من سنتين' : '- de 2 ans'}
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button
                type="button"
                onClick={() => updateGuestDetails('babies', guestDetails.babies - 1)}
                disabled={guestDetails.babies <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-medium text-gray-900">{guestDetails.babies}</span>
              <button
                type="button"
                onClick={() => updateGuestDetails('babies', guestDetails.babies + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Animaux domestiques */}
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <div className="font-medium text-gray-900">
                {language === 'ar' ? 'حيوانات أليفة' : 'Animaux domestiques'}
              </div>
              <div className="text-sm text-blue-600 underline cursor-pointer hover:text-blue-700">
                {language === 'ar' ? 'هل تسافر مع حiوان مساعد؟' : 'Vous voyagez avec un animal d\'assistance ?'}
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button
                type="button"
                onClick={() => updateGuestDetails('pets', guestDetails.pets - 1)}
                disabled={guestDetails.pets <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-medium text-gray-900">{guestDetails.pets}</span>
              <button
                type="button"
                onClick={() => updateGuestDetails('pets', guestDetails.pets + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (filters.city) {
      // Convertir le nom de la ville en slug pour l'URL SEO-friendly
      const citySlug = cityNameToSlug(filters.city);
      
      // Rediriger vers la page de la ville sans paramètres pour un meilleur SEO
      const url = `/appartements/ville/${citySlug}`;
      navigate(url);
    } else {
      // Si aucune ville n'est sélectionnée, rediriger vers la page générale
      navigate('/appartements');
    }
  };

  return (
    <div className={`bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('welcomeTitle', language)}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            {t('welcomeSubtitle', language)}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end">
              {/* Destination */}
              <div className="relative flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الوجهة' : 'Destination'}
                </label>
                <CitySelector
                  selectedCity={filters.city}
                  onCitySelect={(city) => setFilters({ ...filters, city })}
                  placeholder={language === 'ar' ? 'اختر مدينة' : 'Choisir une ville'}
                />
              </div>

              {/* Check-in */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {t('checkIn', language)}
                </label>
                <input
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                />
              </div>

              {/* Check-out */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {t('checkOut', language)}
                </label>
                <input
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                />
              </div>

              {/* Guests */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  {t('guests', language)}
                </label>
                <GuestSelector
                  value={filters.guests}
                  onChange={(value) => setFilters({ ...filters, guests: value })}
                  language={language}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>{t('search', language)}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;