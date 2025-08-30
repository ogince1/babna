import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import CitySelector from '../Properties/CitySelector';
import { SearchFilters } from '../../types';
import { cityNameToSlug } from '../../utils/cityUtils';

interface SearchSectionProps {
  onSearch?: (filters: SearchFilters) => void;
}

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

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
              {/* Destination */}
              <div className="relative">
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
              <div>
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
              <div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  {t('guests', language)}
                </label>
                <select
                  value={filters.guests}
                  onChange={(e) => setFilters({ ...filters, guests: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                >
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {language === 'ar' ? 'شخص' : (i === 0 ? 'personne' : 'personnes')}
                    </option>
                  ))}
                </select>
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