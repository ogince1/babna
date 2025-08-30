import React from 'react';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';
import { useApp } from '../../context/AppContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();
  const { currentPathWithoutLanguage, navigateToLocalized } = useMultilingualRoute();

  const handleLanguageChange = (newLanguage: 'fr' | 'ar' | 'en' | 'es') => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      // Naviguer vers la même page avec la nouvelle langue
      const newPath = `/${newLanguage}${currentPathWithoutLanguage}`;
      navigateToLocalized(newPath, { replace: true });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <button
        onClick={() => handleLanguageChange('fr')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'fr'
            ? 'bg-orange-100 text-orange-700'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        FR
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => handleLanguageChange('ar')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'ar'
            ? 'bg-orange-100 text-orange-700'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        AR
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'en'
            ? 'bg-orange-100 text-orange-700'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          language === 'es'
            ? 'bg-orange-100 text-orange-700'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
