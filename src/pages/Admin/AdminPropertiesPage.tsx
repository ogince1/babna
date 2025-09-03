import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  city: string;
  type: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  owner: string;
  createdAt: string;
  image: string;
}

const AdminPropertiesPage: React.FC = () => {
  const { language } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Données de démonstration
  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'Appartement luxueux à Marrakech',
        city: 'Marrakech',
        type: 'Appartement',
        price: 1200,
        status: 'pending',
        owner: 'Ahmed Benali',
        createdAt: '2024-01-15',
        image: '/api/placeholder/300/200'
      },
      {
        id: '2',
        title: 'Riad traditionnel dans la médina',
        city: 'Fès',
        type: 'Riad',
        price: 800,
        status: 'approved',
        owner: 'Fatima Zahra',
        createdAt: '2024-01-14',
        image: '/api/placeholder/300/200'
      },
      {
        id: '3',
        title: 'Villa moderne à Casablanca',
        city: 'Casablanca',
        type: 'Villa',
        price: 2000,
        status: 'rejected',
        owner: 'Mohammed Alami',
        createdAt: '2024-01-13',
        image: '/api/placeholder/300/200'
      }
    ];
    
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (propertyId: string, newStatus: 'approved' | 'rejected') => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId ? { ...prop, status: newStatus } : prop
      )
    );
  };

  const handleDelete = (propertyId: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا العقار؟' : 'Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      setProperties(prev => prev.filter(prop => prop.id !== propertyId));
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
          {language === 'ar' ? 'إدارة العقارات' : 'Gestion des propriétés'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'إدارة جميع العقارات في النظام' 
            : 'Gérez toutes les propriétés du système'
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
                placeholder={language === 'ar' ? 'البحث في العقارات...' : 'Rechercher des propriétés...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
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
          </div>
        </div>
      </div>

      {/* Liste des propriétés */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'قائمة العقارات' : 'Liste des propriétés'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'العقار' : 'Propriété'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'المالك' : 'Propriétaire'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'المدينة' : 'Ville'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'السعر' : 'Prix'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'الحالة' : 'Statut'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {language === 'ar' ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={property.image}
                          alt={property.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {property.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {property.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {property.price} MAD
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(property.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {property.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(property.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                            title={language === 'ar' ? 'موافقة' : 'Approuver'}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(property.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                            title={language === 'ar' ? 'رفض' : 'Rejeter'}
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => window.open(`/appartements/${property.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title={language === 'ar' ? 'عرض' : 'Voir'}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
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

export default AdminPropertiesPage;
