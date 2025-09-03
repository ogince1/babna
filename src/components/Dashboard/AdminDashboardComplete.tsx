import React, { useState, useEffect } from 'react';
import { 
  Users, Home, TrendingUp, Check, X, Eye, Edit, Trash2, 
  FileText, MessageSquare, MapPin, Calendar, DollarSign,
  Shield, Settings, BarChart3, Activity, AlertTriangle,
  Plus, Search, Filter, Download, Upload, RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import AdminService, { 
  AdminUser, 
  AdminProperty, 
  AdminBooking, 
  AdminContent, 
  AdminStats 
} from '../../services/adminService';

// Types pour les données - maintenant importés du service

const AdminDashboardComplete: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // États pour les données
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [contentItems, setContentItems] = useState<AdminContent[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);

  // Charger les données
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      console.log('🔄 Chargement des données du tableau de bord...');
      
      // Charger les statistiques
      const adminStats = await AdminService.getAdminStats();
      setStats(adminStats);
      
      // Charger les utilisateurs
      const { users: usersData } = await AdminService.getUsers(1, 20);
      setUsers(usersData);
      
      // Charger les propriétés
      const { properties: propertiesData } = await AdminService.getProperties(1, 20);
      setProperties(propertiesData);
      
      // Charger les réservations
      const { bookings: bookingsData } = await AdminService.getBookings(1, 20);
      setBookings(bookingsData);
      
      // Charger le contenu
      const { content: contentData } = await AdminService.getContent(1, 20);
      setContentItems(contentData);
      
      console.log('✅ Données chargées avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      // En cas d'erreur, on peut afficher un message à l'utilisateur
    } finally {
      setIsLoading(false);
    }
  };

  // Statistiques calculées - utilisent les vraies données si disponibles
  const calculatedStats = {
    totalUsers: stats?.totalUsers || users.length,
    totalProperties: stats?.totalProperties || properties.length,
    totalBookings: stats?.totalBookings || bookings.length,
    totalRevenue: stats?.totalRevenue || bookings.reduce((sum, booking) => sum + (booking.total_price * 0.15), 0),
    pendingProperties: stats?.pendingProperties || properties.filter(p => !p.is_approved).length,
    activeUsers: stats?.activeUsers || users.filter(u => u.is_active).length,
    pendingBookings: stats?.pendingBookings || bookings.filter(b => b.status === 'pending').length,
    publishedContent: stats?.publishedContent || contentItems.filter(c => c.status === 'published').length
  };

  // Onglets du tableau de bord
  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'properties', label: 'Propriétés', icon: Home },
    { id: 'bookings', label: 'Réservations', icon: Calendar },
    { id: 'content', label: 'Contenu', icon: FileText },
    { id: 'approvals', label: 'Approbations', icon: Check },
    { id: 'statistics', label: 'Statistiques', icon: BarChart3 },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  // Actions sur les propriétés
  const handleApproveProperty = async (propertyId: string) => {
    try {
      setIsLoading(true);
      console.log('🔄 Approbation de la propriété:', propertyId);
      
      // Appel API pour approuver
      await AdminService.approveProperty(propertyId);
      
      // Mettre à jour l'état local
      setProperties(prev => prev.map(p => 
        p.id === propertyId ? { ...p, is_approved: true } : p
      ));
      
      // Recharger les statistiques
      const adminStats = await AdminService.getAdminStats();
      setStats(adminStats);
      
      console.log('✅ Propriété approuvée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'approbation:', error);
      alert('Erreur lors de l\'approbation de la propriété');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectProperty = async (propertyId: string) => {
    try {
      setIsLoading(true);
      const reason = prompt('Raison du rejet (optionnel):');
      console.log('🔄 Rejet de la propriété:', propertyId);
      
      // Appel API pour rejeter
      await AdminService.rejectProperty(propertyId, reason);
      
      // Mettre à jour l'état local
      setProperties(prev => prev.map(p => 
        p.id === propertyId ? { ...p, is_approved: false } : p
      ));
      
      console.log('✅ Propriété rejetée avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du rejet:', error);
      alert('Erreur lors du rejet de la propriété');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      try {
        setIsLoading(true);
        console.log('🔄 Suppression de la propriété:', propertyId);
        
        // Appel API pour supprimer
        await AdminService.deleteProperty(propertyId);
        
        // Mettre à jour l'état local
        setProperties(prev => prev.filter(p => p.id !== propertyId));
        
        // Recharger les statistiques
        const adminStats = await AdminService.getAdminStats();
        setStats(adminStats);
        
        console.log('✅ Propriété supprimée avec succès');
      } catch (error) {
        console.error('❌ Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la propriété');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Actions sur les utilisateurs
  const handleToggleUserStatus = async (userId: string) => {
    try {
      setIsLoading(true);
      const user = users.find(u => u.id === userId);
      if (!user) return;
      
      console.log('🔄 Changement de statut utilisateur:', userId);
      
      // Appel API pour changer le statut
      await AdminService.toggleUserStatus(userId, !user.is_active);
      
      // Mettre à jour l'état local
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, is_active: !u.is_active } : u
      ));
      
      console.log('✅ Statut utilisateur modifié avec succès');
    } catch (error) {
      console.error('❌ Erreur lors du changement de statut:', error);
      alert('Erreur lors du changement de statut utilisateur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        setIsLoading(true);
        console.log('🔄 Suppression de l\'utilisateur:', userId);
        
        // Appel API pour supprimer
        await AdminService.deleteUser(userId);
        
        // Mettre à jour l'état local
        setUsers(prev => prev.filter(u => u.id !== userId));
        
        // Recharger les statistiques
        const adminStats = await AdminService.getAdminStats();
        setStats(adminStats);
        
        console.log('✅ Utilisateur supprimé avec succès');
      } catch (error) {
        console.error('❌ Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'utilisateur');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Actions sur le contenu
  const handlePublishContent = async (contentId: string) => {
    try {
      setIsLoading(true);
      console.log('🔄 Publication du contenu:', contentId);
      
      // Appel API pour publier
      await AdminService.publishContent(contentId);
      
      // Mettre à jour l'état local
      setContentItems(prev => prev.map(c => 
        c.id === contentId ? { ...c, status: 'published' } : c
      ));
      
      console.log('✅ Contenu publié avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la publication:', error);
      alert('Erreur lors de la publication du contenu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchiveContent = async (contentId: string) => {
    try {
      setIsLoading(true);
      console.log('🔄 Archivage du contenu:', contentId);
      
      // Appel API pour archiver
      await AdminService.archiveContent(contentId);
      
      // Mettre à jour l'état local
      setContentItems(prev => prev.map(c => 
        c.id === contentId ? { ...c, status: 'archived' } : c
      ));
      
      console.log('✅ Contenu archivé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'archivage:', error);
      alert('Erreur lors de l\'archivage du contenu');
    } finally {
      setIsLoading(false);
    }
  };

  // Export des données
  const handleExportData = async (type: 'users' | 'properties' | 'bookings' | 'content') => {
    try {
      setIsLoading(true);
      console.log(`🔄 Export des données: ${type}`);
      
      const data = await AdminService.exportData(type, 'csv');
      
      // Créer et télécharger le fichier
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      console.log('✅ Export réussi');
    } catch (error) {
      console.error('❌ Erreur lors de l\'export:', error);
      alert('Erreur lors de l\'export des données');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrage et recherche
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'pending' && !property.is_approved) ||
                         (filterStatus === 'approved' && property.is_approved);
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`p-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
            <p className="text-gray-600 mt-1">Gestion complète de la plateforme Babna.ma</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => loadDashboardData()}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Actualiser</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalUsers}</p>
              <p className="text-xs text-green-600">+{calculatedStats.activeUsers} actifs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Propriétés</p>
              <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalProperties}</p>
              <p className="text-xs text-orange-600">{calculatedStats.pendingProperties} en attente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Réservations</p>
              <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalBookings}</p>
              <p className="text-xs text-blue-600">{calculatedStats.pendingBookings} en attente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenus</p>
              <p className="text-2xl font-bold text-gray-900">{calculatedStats.totalRevenue.toLocaleString()} MAD</p>
              <p className="text-xs text-green-600">Commission 15%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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

        {/* Tab Content */}
        <div className="p-6">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
                  <div className="space-y-3">
                    {stats?.recentActivity?.slice(0, 3).map((activity, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                        activity.type === 'booking' ? 'bg-green-50' :
                        activity.type === 'user' ? 'bg-blue-50' :
                        'bg-yellow-50'
                      }`}>
                        <span className="text-sm">{activity.description}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm">Nouvelle réservation confirmée</span>
                          <span className="text-xs text-gray-500">Il y a 2h</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm">Nouvel utilisateur inscrit</span>
                          <span className="text-xs text-gray-500">Il y a 4h</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <span className="text-sm">Bien en attente d'approbation</span>
                          <span className="text-xs text-gray-500">Il y a 6h</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Villes populaires</h3>
                  <div className="space-y-3">
                    {stats?.cityDistribution?.slice(0, 5).map((city, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">{city.city}</span>
                        <span className="text-sm text-gray-600">{city.count} biens</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Marrakech</span>
                          <span className="text-sm text-gray-600">2 biens</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Fès</span>
                          <span className="text-sm text-gray-600">1 bien</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">Casablanca</span>
                          <span className="text-sm text-gray-600">1 bien</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gestion des utilisateurs */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Gestion des utilisateurs</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 
                             user.role === 'owner' ? 'Propriétaire' : 'Client'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(user.created_at).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 hover:text-orange-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleToggleUserStatus(user.id)}
                              className={`${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                            >
                              {user.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Gestion des propriétés */}
          {activeTab === 'properties' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Gestion des propriétés</h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher une propriété..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="approved">Approuvées</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          property.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.is_approved ? 'Approuvé' : 'En attente'}
                        </span>
                        <span className="text-sm text-gray-500">{property.location.city}</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{property.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-orange-600">
                          {property.price} MAD/nuit
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{property.bedrooms} chambres</span>
                          <span>•</span>
                          <span>{property.bathrooms} salles de bain</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-orange-600 hover:text-orange-900 p-2 rounded-lg hover:bg-orange-50">
                          <Edit className="h-4 w-4" />
                        </button>
                                                 {!property.is_approved && (
                          <button
                            onClick={() => handleApproveProperty(property.id)}
                            className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gestion des réservations */}
          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Gestion des réservations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Réservation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Propriété
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{booking.id.slice(0, 8)}</div>
                          <div className="text-sm text-gray-500">{booking.total_price} MAD</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Propriété {booking.property_id.slice(0, 8)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(booking.check_in).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">→ {new Date(booking.check_out).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {booking.status === 'confirmed' ? 'Confirmée' :
                             booking.status === 'pending' ? 'En attente' :
                             booking.status === 'cancelled' ? 'Annulée' : 'Terminée'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 hover:text-orange-900">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Gestion du contenu */}
          {activeTab === 'content' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Gestion du contenu</h3>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Nouveau contenu</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'published' ? 'bg-green-100 text-green-800' :
                        item.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'published' ? 'Publié' :
                         item.status === 'draft' ? 'Brouillon' : 'Archivé'}
                      </span>
                      <span className="text-xs text-gray-500">{item.type}</span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                                         <p className="text-sm text-gray-600 mb-3">Par {item.author_name || 'Inconnu'}</p>
                                         <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                       <span>Créé: {new Date(item.created_at).toLocaleDateString()}</span>
                       <span>Modifié: {new Date(item.updated_at).toLocaleDateString()}</span>
                     </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 p-2 rounded-lg hover:bg-orange-50">
                        <Edit className="h-4 w-4" />
                      </button>
                      {item.status === 'draft' && (
                        <button
                          onClick={() => handlePublishContent(item.id)}
                          className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      {item.status === 'published' && (
                        <button
                          onClick={() => handleArchiveContent(item.id)}
                          className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approbations */}
          {activeTab === 'approvals' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Biens en attente d'approbation</h3>
              <div className="space-y-6">
                {properties.filter(p => !p.is_approved).map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{property.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{property.location.city}</span>
                          <span>{property.bedrooms} chambres</span>
                          <span>{property.price} MAD/nuit</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApproveProperty(property.id)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRejectProperty(property.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statistiques */}
          {activeTab === 'statistics' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Statistiques de la plateforme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Revenus ce mois</h4>
                  <p className="text-3xl font-bold">
                    {(calculatedStats.totalRevenue * 0.3).toLocaleString()} MAD
                  </p>
                  <p className="text-blue-100 text-sm mt-1">Commission de 15%</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Taux d'occupation moyen</h4>
                  <p className="text-3xl font-bold">73%</p>
                  <p className="text-green-100 text-sm mt-1">+5% par rapport au mois dernier</p>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Répartition par ville</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Marrakech</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Casablanca</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fès</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sécurité */}
          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Sécurité et modération</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    Activité suspecte
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm text-red-800">Tentative de connexion échouée</span>
                      <span className="text-xs text-red-600">Il y a 1h</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm text-yellow-800">Nouveau compte créé</span>
                      <span className="text-xs text-yellow-600">Il y a 3h</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    Alertes
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm text-orange-800">Propriété signalée</span>
                      <span className="text-xs text-orange-600">Il y a 2h</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-800">Utilisateur banni</span>
                      <span className="text-xs text-blue-600">Il y a 5h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paramètres */}
          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Paramètres de la plateforme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Général</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de la plateforme
                      </label>
                      <input
                        type="text"
                        defaultValue="Babna.ma"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commission par défaut (%)
                      </label>
                      <input
                        type="number"
                        defaultValue="15"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Nouvelles réservations</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Nouvelles propriétés</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Alertes de sécurité</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardComplete;
