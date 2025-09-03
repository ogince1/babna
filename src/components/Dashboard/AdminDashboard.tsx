import React, { useState, useEffect } from 'react';
import { 
  Users, Home, TrendingUp, Check, X, Eye, 
  FileText, MessageSquare, MapPin, Settings,
  Plus, Edit, Trash2, Calendar, DollarSign,
  BarChart3, UserCheck, Building2, Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import { supabase } from '../../lib/supabase';
import BlogForm from './BlogForm';

const AdminDashboard: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // États des données
  const [users, setUsers] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [travelGuides, setTravelGuides] = useState<any[]>([]);

  // États pour les formulaires
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showFAQForm, setShowFAQForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showTravelGuideForm, setShowTravelGuideForm] = useState(false);

  // Stats calculées
  const stats = {
    totalUsers: users.length,
    totalProperties: properties.length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum: number, booking: any) => sum + (booking.totalPrice * 0.15), 0),
    pendingProperties: properties.filter((p: any) => !p.is_approved).length,
    totalBlogPosts: blogPosts.length,
    totalFaqs: faqs.length,
    totalTestimonials: testimonials.length,
    totalTravelGuides: travelGuides.length
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'users', label: t('users', language), icon: Users },
    { id: 'properties', label: 'Biens immobiliers', icon: Home },
    { id: 'approvals', label: t('pendingApprovals', language), icon: Check },
    { id: 'blog', label: 'Blog & Articles', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: MessageSquare },
    { id: 'testimonials', label: 'Témoignages', icon: UserCheck },
    { id: 'travel-guides', label: 'Guides de voyage', icon: MapPin },
    { id: 'statistics', label: t('statistics', language), icon: BarChart3 }
  ];

  // Chargement des données
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Charger les utilisateurs
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      setUsers(usersData || []);

      // Charger les propriétés
      const { data: propertiesData } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      setProperties(propertiesData || []);

      // Charger les articles de blog
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      setBlogPosts(blogData || []);

      // Charger les FAQ
      const { data: faqsData } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });
      setFaqs(faqsData || []);

      // Charger les témoignages
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      setTestimonials(testimonialsData || []);

      // Charger les guides de voyage
      const { data: guidesData } = await supabase
        .from('travel_guides')
        .select('*')
        .order('created_at', { ascending: false });
      setTravelGuides(guidesData || []);

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonctions de gestion des propriétés
  const handleApproveProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_approved: true })
        .eq('id', propertyId);
      
      if (!error) {
        await loadAllData(); // Recharger les données
        console.log('Propriété approuvée:', propertyId);
      }
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
    }
  };

  const handleRejectProperty = async (propertyId: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);
      
      if (!error) {
        await loadAllData(); // Recharger les données
        console.log('Propriété rejetée et supprimée:', propertyId);
      }
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
    }
  };

  // Fonctions de gestion du blog
  const createBlogPost = async (postData: any) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert(postData);
      
      if (!error) {
        await loadAllData();
        setShowBlogForm(false);
        console.log('Article de blog créé avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (!error) {
        await loadAllData();
        console.log('Article de blog supprimé:', id);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div className={`p-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
        <p className="text-gray-600 mt-1">Gestion de la plateforme Babna.ma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Articles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBlogPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">FAQ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFaqs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <UserCheck className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Témoignages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTestimonials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <MapPin className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Guides</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTravelGuides}</p>
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

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-full">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenus</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} MAD</p>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
                  <div className="space-y-3">
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
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Villes populaires</h3>
                  <div className="space-y-3">
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
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Gestion des utilisateurs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
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
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
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
                          <div className="text-sm text-gray-900">{user.createdAt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-orange-600 hover:text-orange-900 mr-3">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Tous les biens immobiliers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          property.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.isApproved ? 'Approuvé' : 'En attente'}
                        </span>
                        <span className="text-sm text-gray-500">{property.location.city}</span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{property.title}</h4>
                      <p className="text-lg font-bold text-orange-600">
                        {property.price} MAD/nuit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'approvals' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Biens en attente d'approbation</h3>
              <div className="space-y-6">
                {properties.filter(p => !p.isApproved).map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg p-6">
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

          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Gestion du blog et des articles</h3>
                <button
                  onClick={() => setShowBlogForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel article
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.is_published ? 'Publié' : 'Brouillon'}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteBlogPost(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author || 'Anonyme'}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {post.tags.map((tag: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {blogPosts.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun article de blog pour le moment</p>
                  <button
                    onClick={() => setShowBlogForm(true)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Créer le premier article
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'statistics' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Statistiques de la plateforme</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Revenus ce mois</h4>
                  <p className="text-3xl font-bold">
                    {(stats.totalRevenue * 0.3).toLocaleString()} MAD
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
        </div>
      </div>

      {/* Composants de formulaires */}
      <BlogForm
        isOpen={showBlogForm}
        onClose={() => setShowBlogForm(false)}
        onSubmit={createBlogPost}
      />
    </div>
  );
};

export default AdminDashboard;