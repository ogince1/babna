import React from 'react';
import { X, Home, Building2, BarChart3, Users, Settings, Calendar, Heart, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';
import { t } from '../../utils/i18n';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, language, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { navigateTo, currentPathWithoutLanguage } = useMultilingualRoute();

  const menuItems = [
    { id: 'home', path: '/', icon: Home, label: t('home', language) },
    { id: 'properties', path: '/appartements', icon: Building2, label: t('properties', language) },
    ...(user?.role === 'owner' ? [
      { id: 'owner-dashboard', path: '/proprietaire/dashboard', icon: BarChart3, label: language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord' },
      { id: 'my-properties', path: '/proprietaire/proprietes', icon: Building2, label: language === 'ar' ? 'خصائصي' : 'Mes propriétés' },
      { id: 'owner-bookings', path: '/proprietaire/reservations', icon: Calendar, label: language === 'ar' ? 'الحجوزات' : 'Réservations' }
    ] : []),
    ...(user?.role === 'admin' ? [
      { id: 'admin-dashboard', path: '/admin/dashboard', icon: BarChart3, label: language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord' },
      { id: 'admin-users', path: '/admin/utilisateurs', icon: Users, label: language === 'ar' ? 'المستخدمين' : 'Utilisateurs' },
      { id: 'admin-approvals', path: '/admin/approbations', icon: Building2, label: language === 'ar' ? 'الموافقات' : 'Approbations' }
    ] : []),
    ...(user?.role === 'client' ? [
      { id: 'client-dashboard', path: '/client/dashboard', icon: BarChart3, label: language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord' },
      { id: 'my-bookings', path: '/mes-reservations', icon: Calendar, label: t('bookings', language) },
      { id: 'favorites', path: '/favoris', icon: Heart, label: 'Favoris' }
    ] : []),
    { id: 'profile', path: '/profil', icon: Settings, label: t('profile', language) }
  ];

  const handleNavigation = (path: string) => {
    navigateTo(path);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigateTo('/');
      onClose();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isCurrentPage = (path: string) => {
    return currentPathWithoutLanguage === path;
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:shadow-none ${language === 'ar' ? 'rtl' : 'ltr'}`}
      >
        {/* Header mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isCurrentPage(item.path)
                    ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          
          {/* Bouton de déconnexion */}
          {user && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">{t('logout', language)}</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;