import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Building2, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';

const AdminHomePage: React.FC = () => {
  const { language } = useApp();

  const stats = [
    {
      title: language === 'ar' ? 'إجمالي العقارات' : 'Total des propriétés',
      value: '156',
      icon: Building2,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: language === 'ar' ? 'المستخدمين النشطين' : 'Utilisateurs actifs',
      value: '2,847',
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: language === 'ar' ? 'في انتظار الموافقة' : 'En attente d\'approbation',
      value: '23',
      icon: CheckCircle,
      color: 'bg-yellow-500',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: language === 'ar' ? 'الحجوزات اليوم' : 'Réservations aujourd\'hui',
      value: '89',
      icon: Calendar,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      type: 'property',
      message: language === 'ar' ? 'تم إضافة عقار جديد في مراكش' : 'Nouvelle propriété ajoutée à Marrakech',
      time: '2 min',
      user: 'Ahmed Benali'
    },
    {
      type: 'user',
      message: language === 'ar' ? 'مستخدم جديد انضم' : 'Nouvel utilisateur inscrit',
      time: '15 min',
      user: 'Marie Dubois'
    },
    {
      type: 'approval',
      message: language === 'ar' ? 'عقار تمت الموافقة عليه' : 'Propriété approuvée',
      time: '1 heure',
      user: 'Système'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Bienvenue dans votre tableau de bord'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'نظرة عامة على نشاط موقعك وإحصائياته' 
            : 'Aperçu de l\'activité et des statistiques de votre site'
          }
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                {language === 'ar' ? 'من الشهر الماضي' : 'vs mois dernier'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Activités récentes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {language === 'ar' ? 'النشاط الأخير' : 'Activité récente'}
          </h2>
        </div>
        <div className="p-6">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  {activity.type === 'property' && <Building2 className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'user' && <Users className="h-4 w-4 text-green-600" />}
                  {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-yellow-600" />}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.user}</p>
              </div>
              <div className="text-xs text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
