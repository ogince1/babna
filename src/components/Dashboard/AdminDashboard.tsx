import React from 'react';
import { Users, Home, TrendingUp, Check, X, Eye, Settings, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { t } from '../../utils/i18n';
import { properties, users, bookings } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const stats = {
    totalUsers: users.length,
    totalProperties: properties.length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, booking) => sum + (booking.totalPrice * 0.15), 0),
    pendingProperties: properties.filter(p => !p.isApproved).length
  };

  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp, path: '/admin' },
    { id: 'properties', label: 'Biens immobiliers', icon: Home, path: '/admin/proprietes' },
    { id: 'users', label: t('users', language), icon: Users, path: '/admin/utilisateurs' },
    { id: 'approvals', label: t('pendingApprovals', language), icon: Check, path: '/admin/approbations' },
    { id: 'profile', label: 'Profil', icon: Settings, path: '/admin/profil' }
  ];



  return (
    <div className={`p-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
        <p className="text-gray-600 mt-1">Gestion de la plateforme Babna.ma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Biens</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Réservations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Commission</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} MAD</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <Check className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingProperties}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu de navigation admin */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Bienvenue dans le tableau de bord administrateur
            </h3>
            <p className="text-gray-600 mb-6">
              Utilisez le menu ci-dessus pour naviguer entre les différentes sections
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.slice(1).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-orange-600" />
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;