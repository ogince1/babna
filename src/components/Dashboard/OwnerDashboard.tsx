import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, DollarSign, Home, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import { properties, bookings } from '../../data/mockData';

const OwnerDashboard: React.FC = () => {
  const { user, language } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  // Filter data for current owner
  const ownerProperties = properties.filter(p => p.ownerId === user?.id);
  const ownerBookings = bookings.filter(b => 
    ownerProperties.some(p => p.id === b.propertyId)
  );

  const stats = {
    totalProperties: ownerProperties.length,
    totalBookings: ownerBookings.length,
    totalEarnings: ownerBookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
    occupancyRate: 75
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
    { id: 'properties', label: t('myProperties', language), icon: Home },
    { id: 'bookings', label: t('bookings', language), icon: Calendar },
    { id: 'earnings', label: t('earnings', language), icon: DollarSign }
  ];

  return (
    <div className={`p-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Propriétaire</h1>
          <p className="text-gray-600 mt-1">Bienvenue, {user?.name}</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
          <Plus className="h-5 w-5" />
          <span>{t('addProperty', language)}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mes biens</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Réservations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()} MAD</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux d'occupation</p>
              <p className="text-2xl font-bold text-gray-900">{stats.occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Réservations récentes</h3>
                <div className="space-y-4">
                  {ownerBookings.slice(0, 5).map((booking) => {
                    const property = properties.find(p => p.id === booking.propertyId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{property?.title}</p>
                          <p className="text-sm text-gray-600">
                            {booking.checkIn} - {booking.checkOut} • {booking.guests} personne{booking.guests > 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{booking.totalPrice} MAD</p>
                          <p className={`text-sm ${
                            booking.status === 'confirmed' ? 'text-green-600' : 
                            booking.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {booking.status === 'confirmed' ? 'Confirmé' : 
                             booking.status === 'pending' ? 'En attente' : 'Annulé'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Mes biens ({ownerProperties.length})</h3>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Ajouter un bien</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ownerProperties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-lg mb-2">{property.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{property.location.city}</p>
                      <p className="text-lg font-bold text-orange-600 mb-3">
                        {property.price} MAD/nuit
                      </p>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm transition-colors flex items-center justify-center">
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </button>
                        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm transition-colors flex items-center justify-center">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Toutes les réservations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bien
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invités
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ownerBookings.map((booking) => {
                      const property = properties.find(p => p.id === booking.propertyId);
                      return (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {property?.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.checkIn} - {booking.checkOut}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.guests}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.totalPrice} MAD
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status === 'confirmed' ? 'Confirmé' :
                               booking.status === 'pending' ? 'En attente' : 'Annulé'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Revenus et paiements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Revenus ce mois</h4>
                  <p className="text-3xl font-bold">
                    {(stats.totalEarnings * 0.3).toLocaleString()} MAD
                  </p>
                  <p className="text-green-100 text-sm mt-1">+12% par rapport au mois dernier</p>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Revenus totaux</h4>
                  <p className="text-3xl font-bold">
                    {(stats.totalEarnings * 0.85).toLocaleString()} MAD
                  </p>
                  <p className="text-blue-100 text-sm mt-1">Commission plateforme déduite</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Historique des paiements</h4>
                <p className="text-gray-600">Les paiements sont effectués après chaque check-in des invités.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;