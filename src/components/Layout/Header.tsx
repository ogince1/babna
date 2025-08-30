import React from 'react';
import { Menu, Search, User, Globe, Heart, Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';
import { t, languages } from '../../utils/i18n';

interface HeaderProps {
  onMenuClick: () => void;
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLoginClick }) => {
  const { user, language, setLanguage, isAuthenticated, logout, forceLogout } = useApp();
  const navigate = useNavigate();
  const { navigateTo } = useMultilingualRoute();

  const handleFavoritesClick = () => {
    if (isAuthenticated) {
      navigateTo('/favoris');
    } else {
      onLoginClick();
    }
  };

  const handleBookingsClick = () => {
    if (isAuthenticated) {
      navigateTo('/voyageur/reservations');
    } else {
      onLoginClick();
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profil');
    } else {
      onLoginClick();
    }
  };

  const handleLogout = async () => {
    try {
      console.log('🔄 Header: Début de la déconnexion...');
      await logout();
      console.log('✅ Header: Déconnexion réussie, redirection...');
      navigateTo('/');
    } catch (error) {
      console.error('❌ Header: Erreur lors de la déconnexion:', error);
    }
  };

  const handleForceLogout = async () => {
    try {
      console.log('🔄 Header: Début de la déconnexion forcée...');
      await forceLogout();
      console.log('✅ Header: Déconnexion forcée réussie, redirection...');
      navigateTo('/');
    } catch (error) {
      console.error('❌ Header: Erreur lors de la déconnexion forcée:', error);
    }
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-100 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
                                  <div className="flex items-center">
                        <img src="/logo.svg" alt="Babna.ma" className="h-12" />
                      </div>
          </div>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder', language)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={handleFavoritesClick}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  title={t('favorites', language)}
                >
                  <Heart className="h-6 w-6" />
                </button>
                <button 
                  onClick={handleBookingsClick}
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                  title={t('bookings', language)}
                >
                  <Calendar className="h-6 w-6" />
                </button>
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                  title={t('profile', language)}
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                  title={t('logout', language)}
                >
                  <LogOut className="h-6 w-6" />
                </button>
                <button 
                  onClick={handleForceLogout}
                  className="p-2 text-gray-600 hover:text-red-700 transition-colors"
                  title="Déconnexion forcée"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <button 
                onClick={onLoginClick}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                {t('login', language)}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="w-full relative">
          <input
            type="text"
            placeholder={t('searchPlaceholder', language)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;