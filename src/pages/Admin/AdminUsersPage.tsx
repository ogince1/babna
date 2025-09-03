import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'owner' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  phone: string | null;
  city: string;
  createdAt: string;
  lastLogin: string;
  avatar: string;
}

const AdminUsersPage: React.FC = () => {
  const { language } = useApp();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Données de démonstration
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Ahmed Benali',
        email: 'ahmed@example.com',
        role: 'owner',
        status: 'active',
        phone: '+212 6 12 34 56 78',
        city: 'Marrakech',
        createdAt: '2024-01-10',
        lastLogin: '2024-01-15 14:30',
        avatar: '/api/placeholder/100/100'
      },
      {
        id: '2',
        name: 'Marie Dubois',
        email: 'marie@example.com',
        role: 'client',
        status: 'active',
        phone: '+33 6 12 34 56 78',
        city: 'Paris',
        createdAt: '2024-01-12',
        lastLogin: '2024-01-15 16:45',
        avatar: '/api/placeholder/100/100'
      },
      {
        id: '3',
        name: 'Fatima Zahra',
        email: 'fatima@example.com',
        role: 'owner',
        status: 'inactive',
        phone: '+212 6 98 76 54 32',
        city: 'Fès',
        createdAt: '2024-01-08',
        lastLogin: '2024-01-10 09:15',
        avatar: '/api/placeholder/100/100'
      },
      {
        id: '4',
        name: 'Mohammed Alami',
        email: 'mohammed@example.com',
        role: 'client',
        status: 'suspended',
        phone: '+212 6 55 44 33 22',
        city: 'Casablanca',
        createdAt: '2024-01-05',
        lastLogin: '2024-01-12 11:20',
        avatar: '/api/placeholder/100/100'
      }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleDelete = (userId: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المستخدم؟' : 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {language === 'ar' ? 'مدير' : 'Admin'}
          </span>
        );
      case 'owner':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {language === 'ar' ? 'مالك' : 'Propriétaire'}
          </span>
        );
      case 'client':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {language === 'ar' ? 'عميل' : 'Client'}
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {language === 'ar' ? 'نشط' : 'Actif'}
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {language === 'ar' ? 'غير نشط' : 'Inactif'}
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {language === 'ar' ? 'معلق' : 'Suspendu'}
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
          {language === 'ar' ? 'إدارة المستخدمين' : 'Gestion des utilisateurs'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'إدارة جميع المستخدمين في النظام' 
            : 'Gérez tous les utilisateurs du système'
          }
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في المستخدمين...' : 'Rechercher des utilisateurs...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">
                {language === 'ar' ? 'جميع الأدوار' : 'Tous les rôles'}
              </option>
              <option value="admin">
                {language === 'ar' ? 'مدير' : 'Admin'}
              </option>
              <option value="owner">
                {language === 'ar' ? 'مالك' : 'Propriétaire'}
              </option>
              <option value="client">
                {language === 'ar' ? 'عميل' : 'Client'}
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
              <option value="active">
                {language === 'ar' ? 'نشط' : 'Actif'}
              </option>
              <option value="inactive">
                {language === 'ar' ? 'غير نشط' : 'Inactif'}
              </option>
              <option value="suspended">
                {language === 'ar' ? 'معلق' : 'Suspendu'}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'قائمة المستخدمين' : 'Liste des utilisateurs'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'المستخدم' : 'Utilisateur'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'الدور' : 'Rôle'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'الحالة' : 'Statut'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'المدينة' : 'Ville'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'آخر تسجيل دخول' : 'Dernière connexion'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        {user.phone && (
                          <div className="text-xs text-gray-400 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {user.status !== 'active' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="text-green-600 hover:text-green-900"
                          title={language === 'ar' ? 'تفعيل' : 'Activer'}
                        >
                          <UserCheck className="h-5 w-5" />
                        </button>
                      )}
                      {user.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          className="text-yellow-600 hover:text-yellow-900"
                          title={language === 'ar' ? 'تعليق' : 'Suspendre'}
                        >
                          <UserX className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => window.open(`/profile/${user.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title={language === 'ar' ? 'عرض' : 'Voir'}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title={language === 'ar' ? 'حذف' : 'Supprimer'}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
