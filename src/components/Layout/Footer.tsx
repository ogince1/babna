import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';
import { t } from '../../utils/i18n';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { language, setLanguage } = useApp();
  const { currentPathWithoutLanguage, navigateToLocalized } = useMultilingualRoute();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const handleLanguageChange = (newLanguage: 'fr' | 'ar' | 'en' | 'es') => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      const newPath = `/${newLanguage}${currentPathWithoutLanguage}`;
      navigateToLocalized(newPath, { replace: true });
      setIsLanguageDropdownOpen(false);
    }
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="lg:col-span-1">
                                    <div className="flex items-center mb-4">
                          <img src="/logo-white.svg" alt="Babna.ma" className="h-8 mr-2" />
                        </div>
            <p className="text-gray-300 text-sm mb-4">
              {t('footer.description', language)}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks', language)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to={`/${language}/appartements`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.properties', language)}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/blog`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.blog', language)}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/guides`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('nav.travelGuides', language)}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/contact`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('footer.contact', language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support', language)}</h3>
            <ul className="space-y-2">
              <li>
                <Link to={`/${language}/faq`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('footer.faq', language)}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/help`} className="text-gray-300 hover:text-white transition-colors text-sm">
                  {t('footer.help', language)}
                </Link>
              </li>
              <li>
                <a href="mailto:support@babna.ma" className="text-gray-300 hover:text-white transition-colors text-sm">
                  support@babna.ma
                </a>
              </li>
            </ul>
          </div>

          {/* Langue et contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.language', language)}</h3>
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full"
              >
                <span>{currentLanguage?.flag}</span>
                <span className="text-sm">{currentLanguage?.name}</span>
                <svg className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'fr' | 'ar' | 'en' | 'es')}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm w-full hover:bg-gray-700 transition-colors ${
                        lang.code === language ? 'bg-gray-700' : ''
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section légale */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Babna.ma. {t('footer.allRightsReserved', language)}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to={`/${language}/mentions-legales`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.legalNotice', language)}
              </Link>
              <Link to={`/${language}/politique-confidentialite`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.privacyPolicy', language)}
              </Link>
              <Link to={`/${language}/conditions-utilisation`} className="text-gray-400 hover:text-white transition-colors">
                {t('footer.termsOfService', language)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
