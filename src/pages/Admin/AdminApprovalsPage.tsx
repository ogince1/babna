import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  Eye,
  Building2,
  User,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface ApprovalItem {
  id: string;
  type: 'property' | 'user' | 'content';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  image?: string;
}

const AdminApprovalsPage: React.FC = () => {
  const { language } = useApp();
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Données de démonstration
  useEffect(() => {
    const mockApprovals: ApprovalItem[] = [
      {
        id: '1',
        type: 'property',
        title: 'Appartement luxueux à Marrakech',
        description: 'Nouvel appartement 3 chambres avec vue sur l\'Atlas',
        status: 'pending',
        submittedBy: 'Ahmed Benali',
        submittedAt: '2024-01-15 10:30',
        priority: 'high',
        category: 'Appartement',
        image: '/api/placeholder/300/200'
      },
      {
        id: '2',
        type: 'property',
        title: 'Riad traditionnel dans la médina',
        description: 'Riad rénové avec 4 chambres et piscine intérieure',
        status: 'pending',
        submittedBy: 'Fatima Zahra',
        submittedAt: '2024-01-15 09:15',
        priority: 'medium',
        category: 'Riad',
        image: '/api/placeholder/300/200'
      },
      {
        id: '3',
        type: 'user',
        title: 'Demande de compte propriétaire',
        description: 'Nouveau propriétaire souhaitant louer ses biens',
        status: 'pending',
        submittedBy: 'Mohammed Alami',
        submittedAt: '2024-01-14 16:45',
        priority: 'medium',
        category: 'Compte utilisateur'
      },
      {
        id: '4',
        type: 'content',
        title: 'Article de blog sur Marrakech',
        description: 'Guide touristique complet de la ville ocre',
        status: 'pending',
        submittedBy: 'Marie Dubois',
        submittedAt: '2024-01-14 14:20',
        priority: 'low',
        category: 'Blog'
      },
      {
        id: '5',
        type: 'property',
        title: 'Villa moderne à Casablanca',
        description: 'Villa 5 chambres avec jardin et garage',
        status: 'approved',
        submittedBy: 'Hassan El Fassi',
        submittedAt: '2024-01-13 11:30',
        priority: 'high',
        category: 'Villa',
        image: '/api/placeholder/300/200'
      }
    ];
    
    setTimeout(() => {
      setApprovals(mockApprovals);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApproval = (itemId: string, newStatus: 'approved' | 'rejected') => {
    setApprovals(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredApprovals = approvals.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property':
        return <Building2 className="h-5 w-5" />;
      case 'user':
        return <User className="h-5 w-5" />;
      case 'content':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'property':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {language === 'ar' ? 'عقار' : 'Propriété'}
          </span>
        );
      case 'user':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {language === 'ar' ? 'مستخدم' : 'Utilisateur'}
          </span>
        );
      case 'content':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {language === 'ar' ? 'محتوى' : 'Contenu'}
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {language === 'ar' ? 'في الانتظار' : 'En attente'}
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {language === 'ar' ? 'موافق عليه' : 'Approuvé'}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {language === 'ar' ? 'مرفوض' : 'Rejeté'}
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {language === 'ar' ? 'عالية' : 'Haute'}
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {language === 'ar' ? 'متوسطة' : 'Moyenne'}
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {language === 'ar' ? 'منخفضة' : 'Basse'}
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'إدارة الموافقات' : 'Gestion des approbations'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'مراجعة والموافقة على الطلبات الجديدة' 
            : 'Examinez et approuvez les nouvelles demandes'
          }
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'في الانتظار' : 'En attente'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'موافق عليه' : 'Approuvé'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'مرفوض' : 'Rejeté'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.filter(a => a.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي' : 'Total'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {approvals.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في الموافقات...' : 'Rechercher des approbations...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">
                {language === 'ar' ? 'جميع الأنواع' : 'Tous les types'}
              </option>
              <option value="property">
                {language === 'ar' ? 'عقارات' : 'Propriétés'}
              </option>
              <option value="user">
                {language === 'ar' ? 'مستخدمين' : 'Utilisateurs'}
              </option>
              <option value="content">
                {language === 'ar' ? 'محتوى' : 'Contenu'}
              </option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">
                {language === 'ar' ? 'جميع الحالات' : 'Tous les statuts'}
              </option>
              <option value="pending">
                {language === 'ar' ? 'في الانتظار' : 'En attente'}
              </option>
              <option value="approved">
                {language === 'ar' ? 'موافق عليه' : 'Approuvé'}
              </option>
              <option value="rejected">
                {language === 'ar' ? 'مرفوض' : 'Rejeté'}
              </option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">
                {language === 'ar' ? 'جميع الأولويات' : 'Toutes les priorités'}
              </option>
              <option value="high">
                {language === 'ar' ? 'عالية' : 'Haute'}
              </option>
              <option value="medium">
                {language === 'ar' ? 'متوسطة' : 'Moyenne'}
              </option>
              <option value="low">
                {language === 'ar' ? 'منخفضة' : 'Basse'}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des approbations */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'قائمة الموافقات' : 'Liste des approbations'}
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredApprovals.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                {item.image && (
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-lg object-cover"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-gray-100">
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTypeBadge(item.type)}
                      {getStatusBadge(item.status)}
                      {getPriorityBadge(item.priority)}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.submittedBy}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.submittedAt}
                      </span>
                      <span>{item.category}</span>
                    </div>
                    
                    {item.status === 'pending' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApproval(item.id, 'approved')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'موافقة' : 'Approuver'}
                        </button>
                        <button
                          onClick={() => handleApproval(item.id, 'rejected')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          {language === 'ar' ? 'رفض' : 'Rejeter'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminApprovalsPage;
