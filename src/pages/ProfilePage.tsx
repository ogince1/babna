import React from 'react';
import SEOManager from '../components/SEO/SEOManager';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { language, user } = useApp();

  const seoData = {
    title: language === 'ar' 
      ? 'الملف الشخصي | Babna.ma'
      : 'Profil | Babna.ma',
    description: language === 'ar'
      ? 'إدارة ملفك الشخصي'
      : 'Gérez votre profil',
    keywords: 'profil, compte utilisateur, paramètres',
    canonical: '/profil'
  };

  return (
    <>
      <SEOManager
        title={seoData.title}
        description={seoData.description}
        canonical={seoData.canonical}
      />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'ar' ? 'الملف الشخصي' : 'Mon profil'}
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الاسم' : 'Nom'}
              </label>
              <input
                type="text"
                value={user?.name || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input
                type="email"
                value={user?.email || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الهاتف' : 'Téléphone'}
              </label>
              <input
                type="tel"
                value={user?.phone || ''}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'ar' ? 'الدور' : 'Rôle'}
              </label>
              <input
                type="text"
                value={
                  user?.role === 'admin' 
                    ? (language === 'ar' ? 'مدير' : 'Administrateur')
                    : user?.role === 'owner' 
                    ? (language === 'ar' ? 'مالك' : 'Propriétaire')
                    : (language === 'ar' ? 'عميل' : 'Client')
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
