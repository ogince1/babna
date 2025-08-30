import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { moroccanCities, City } from '../../data/cities';
import { useApp } from '../../context/AppContext';

interface CitySelectorProps {
  selectedCity?: string;
  onCitySelect: (city: string) => void;
  placeholder?: string;
  className?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  onCitySelect,
  placeholder = "Choisir une ville",
  className = ""
}) => {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filtrer les villes selon le terme de recherche
  const filteredCities = moroccanCities.filter(city => {
    const searchLower = searchTerm.toLowerCase();
    return (
      city.name.toLowerCase().includes(searchLower) ||
      city.nameAr.includes(searchTerm) ||
      city.region.toLowerCase().includes(searchLower)
    );
  });

  const selectedCityData = moroccanCities.find(city => city.name === selectedCity);

  const handleCitySelect = (city: City) => {
    onCitySelect(city.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-gray-400" />
          <span className={selectedCity ? 'text-gray-900' : 'text-gray-500'}>
            {selectedCity 
              ? (language === 'ar' ? selectedCityData?.nameAr : selectedCityData?.name) || selectedCity
              : language === 'ar' ? 'اختر مدينة' : placeholder
            }
          </span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Barre de recherche */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث عن مدينة...' : 'Rechercher une ville...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>

          {/* Liste des villes */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        {language === 'ar' ? city.nameAr : city.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === 'ar' ? city.descriptionAr : city.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {city.region}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-gray-500">
                {language === 'ar' ? 'لا توجد مدن تطابق البحث' : 'Aucune ville trouvée'}
              </div>
            )}
          </div>

          {/* Statistiques */}
          <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
            {language === 'ar' 
              ? `${filteredCities.length} مدينة من أصل ${moroccanCities.length}`
              : `${filteredCities.length} villes sur ${moroccanCities.length}`
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySelector;
