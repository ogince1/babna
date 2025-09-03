import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Building2, 
  FileText, 
  MessageSquare, 
  MapPin, 
  BarChart3, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';

interface Property {
  id: string;
  title: string;
  city: string;
  price_per_night: number;
  is_approved: boolean;
  owner_id: string;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'owner' | 'admin';
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  is_published: boolean;
  created_at: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  related_to: string | null;
  created_at: string;
}

interface Testimonial {
  id: string;
  author_name: string;
  content: string;
  rating: number;
  is_verified: boolean;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  // Traductions
  const t = {
    fr: {
      overview: 'Vue d\'ensemble',
      properties: 'Propriétés',
      users: 'Utilisateurs',
      blog: 'Blog',
      faq: 'FAQ',
      testimonials: 'Témoignages',
      guides: 'Guides',
      settings: 'Paramètres',
      totalProperties: 'Total Propriétés',
      totalUsers: 'Total Utilisateurs',
      totalBlogPosts: 'Total Articles',
      totalFaqs: 'Total FAQ',
      approve: 'Approuver',
      reject: 'Rejeter',
      edit: 'Modifier',
      delete: 'Supprimer',
      view: 'Voir',
      addNew: 'Ajouter nouveau',
      title: 'Titre',
      city: 'Ville',
      price: 'Prix',
      status: 'Statut',
      actions: 'Actions',
      published: 'Publié',
      draft: 'Brouillon',
      verified: 'Vérifié',
      pending: 'En attente'
    },
    ar: {
      overview: 'نظرة عامة',
      properties: 'العقارات',
      users: 'المستخدمين',
      blog: 'المدونة',
      faq: 'الأسئلة الشائعة',
      testimonials: 'التوصيات',
      guides: 'الدليل',
      settings: 'الإعدادات',
      totalProperties: 'إجمالي العقارات',
      totalUsers: 'إجمالي المستخدمين',
      totalBlogPosts: 'إجمالي المقالات',
      totalFaqs: 'إجمالي الأسئلة',
      approve: 'موافقة',
      reject: 'رفض',
      edit: 'تعديل',
      delete: 'حذف',
      view: 'عرض',
      addNew: 'إضافة جديد',
      title: 'العنوان',
      city: 'المدينة',
      price: 'السعر',
      status: 'الحالة',
      actions: 'الإجراءات',
      published: 'منشور',
      draft: 'مسودة',
      verified: 'متحقق',
      pending: 'في الانتظار'
    },
    en: {
      overview: 'Overview',
      properties: 'Properties',
      users: 'Users',
      blog: 'Blog',
      faq: 'FAQ',
      testimonials: 'Testimonials',
      guides: 'Guides',
      settings: 'Settings',
      totalProperties: 'Total Properties',
      totalUsers: 'Total Users',
      totalBlogPosts: 'Total Posts',
      totalFaqs: 'Total FAQs',
      approve: 'Approve',
      reject: 'Reject',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      addNew: 'Add New',
      title: 'Title',
      city: 'City',
      price: 'Price',
      status: 'Status',
      actions: 'Actions',
      published: 'Published',
      draft: 'Draft',
      verified: 'Verified',
      pending: 'Pending'
    },
    es: {
      overview: 'Resumen',
      properties: 'Propiedades',
      users: 'Usuarios',
      blog: 'Blog',
      faq: 'FAQ',
      testimonials: 'Testimonios',
      guides: 'Guías',
      settings: 'Configuración',
      totalProperties: 'Total Propiedades',
      totalUsers: 'Total Usuarios',
      totalBlogPosts: 'Total Posts',
      totalFaqs: 'Total FAQs',
      approve: 'Aprobar',
      reject: 'Rechazar',
      edit: 'Editar',
      delete: 'Eliminar',
      view: 'Ver',
      addNew: 'Agregar Nuevo',
      title: 'Título',
      city: 'Ciudad',
      price: 'Precio',
      status: 'Estado',
      actions: 'Acciones',
      published: 'Publicado',
      draft: 'Borrador',
      verified: 'Verificado',
      pending: 'Pendiente'
    }
  };

  const currentT = t[language as keyof typeof t] || t.fr;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Charger les propriétés
      const { data: propertiesData } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (propertiesData) setProperties(propertiesData);

      // Charger les utilisateurs
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (usersData) setUsers(usersData);

      // Charger les articles de blog
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (blogData) setBlogPosts(blogData);

      // Charger les FAQ
      const { data: faqData } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (faqData) setFaqs(faqData);

      // Charger les témoignages
      const { data: testimonialData } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (testimonialData) setTestimonials(testimonialData);

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyAction = async (propertyId: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ is_approved: action === 'approve' })
        .eq('id', propertyId);

      if (error) throw error;

      // Recharger les données
      loadData();
    } catch (error) {
      console.error('Erreur lors de l\'action sur la propriété:', error);
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{currentT.totalProperties}</p>
            <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{currentT.totalUsers}</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{currentT.totalBlogPosts}</p>
            <p className="text-2xl font-bold text-gray-900">{blogPosts.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <MessageSquare className="h-8 w-8 text-orange-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{currentT.totalFaqs}</p>
            <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{currentT.properties}</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            {currentT.addNew}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.title}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.city}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.price}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {property.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.price_per_night}€
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    property.is_approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {property.is_approved ? currentT.published : currentT.pending}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePropertyAction(property.id, 'approve')}
                      className="text-green-600 hover:text-green-900"
                      title={currentT.approve}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handlePropertyAction(property.id, 'reject')}
                      className="text-red-600 hover:text-red-900"
                      title={currentT.reject}
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900" title={currentT.edit}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" title={currentT.delete}>
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
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{currentT.users}</h3>
      </div>
      
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
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" title={currentT.edit}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" title={currentT.delete}>
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
  );

  const renderBlog = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{currentT.blog}</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            {currentT.addNew}
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.title}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Extrait
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.status}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {currentT.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {post.excerpt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    post.is_published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.is_published ? currentT.published : currentT.draft}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900" title={currentT.view}>
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900" title={currentT.edit}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" title={currentT.delete}>
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
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'properties':
        return renderProperties();
      case 'users':
        return renderUsers();
      case 'blog':
        return renderBlog();
      case 'faq':
        return <div className="bg-white p-6 rounded-lg shadow-md">FAQ Management</div>;
      case 'testimonials':
        return <div className="bg-white p-6 rounded-lg shadow-md">Testimonials Management</div>;
      case 'guides':
        return <div className="bg-white p-6 rounded-lg shadow-md">Travel Guides Management</div>;
      case 'settings':
        return <div className="bg-white p-6 rounded-lg shadow-md">Settings</div>;
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin</span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: currentT.overview, icon: BarChart3 },
              { id: 'properties', label: currentT.properties, icon: Building2 },
              { id: 'users', label: currentT.users, icon: Users },
              { id: 'blog', label: currentT.blog, icon: FileText },
              { id: 'faq', label: currentT.faq, icon: MessageSquare },
              { id: 'testimonials', label: currentT.testimonials, icon: MessageSquare },
              { id: 'guides', label: currentT.guides, icon: MapPin },
              { id: 'settings', label: currentT.settings, icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
