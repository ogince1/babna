import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Settings, 
  Bell,
  Globe,
  Palette,
  Database,
  Save,
  Edit,
  Eye,
  EyeOff,
  Key,
  Trash2
} from 'lucide-react';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'admin';
  avatar: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: boolean;
    emailNotifications: boolean;
  };
  security: {
    lastPasswordChange: string;
    twoFactorEnabled: boolean;
    lastLogin: string;
    loginHistory: Array<{
      date: string;
      ip: string;
      location: string;
      device: string;
    }>;
  };
}

const AdminProfilePage: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'fr',
    theme: 'light' as 'light' | 'dark',
    notifications: true,
    emailNotifications: true
  });

  // Données de démonstration
  useEffect(() => {
    const mockProfile: AdminProfile = {
      id: 'admin-1',
      name: 'Administrateur Babna.ma',
      email: 'admin@babna.ma',
      phone: '+212 6 12 34 56 78',
      role: 'admin',
      avatar: '/api/placeholder/150/150',
      preferences: {
        language: 'fr',
        theme: 'light',
        notifications: true,
        emailNotifications: true
      },
      security: {
        lastPasswordChange: '2024-01-10',
        twoFactorEnabled: false,
        lastLogin: '2024-01-15 16:30',
        loginHistory: [
          {
            date: '2024-01-15 16:30',
            ip: '192.168.1.100',
            location: 'Marrakech, Maroc',
            device: 'Chrome sur Windows 11'
          },
          {
            date: '2024-01-14 09:15',
            ip: '192.168.1.100',
            location: 'Marrakech, Maroc',
            device: 'Chrome sur Windows 11'
          },
          {
            date: '2024-01-13 14:45',
            ip: '192.168.1.100',
            location: 'Marrakech, Maroc',
            device: 'Chrome sur Windows 11'
          }
        ]
      }
    };
    
    setTimeout(() => {
      setProfile(mockProfile);
      setFormData({
        name: mockProfile.name,
        email: mockProfile.email,
        phone: mockProfile.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        language: mockProfile.preferences.language,
        theme: mockProfile.preferences.theme,
        notifications: mockProfile.preferences.notifications,
        emailNotifications: mockProfile.preferences.emailNotifications
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert(language === 'ar' ? 'كلمات المرور الجديدة غير متطابقة' : 'Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    // Simuler la sauvegarde
    setProfile(prev => prev ? {
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferences: {
        ...prev.preferences,
        language: formData.language,
        theme: formData.theme,
        notifications: formData.notifications,
        emailNotifications: formData.emailNotifications
      }
    } : null);

    setEditing(false);
    alert(language === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Changements sauvegardés avec succès');
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        language: profile.preferences.language,
        theme: profile.preferences.theme,
        notifications: profile.preferences.notifications,
        emailNotifications: profile.preferences.emailNotifications
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-500">
            {language === 'ar' ? 'لم يتم العثور على الملف الشخصي' : 'Profil non trouvé'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'الملف الشخصي للمدير' : 'Profil administrateur'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'إدارة إعدادات الحساب والتفضيلات' 
            : 'Gérez les paramètres de votre compte et vos préférences'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations du profil */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === 'ar' ? 'المعلومات الشخصية' : 'Informations personnelles'}
                </h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'تعديل' : 'Modifier'}
                  </button>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 rounded-full object-cover"
                    src={profile.avatar}
                    alt={profile.name}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
                  </label>
                  {editing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone || '-'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'آخر تسجيل دخول' : 'Dernière connexion'}
                  </label>
                  <p className="text-gray-900">{profile.security.lastLogin}</p>
                </div>
              </div>

              {editing && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">
                    {language === 'ar' ? 'تغيير كلمة المرور' : 'Changer le mot de passe'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'كلمة المرور الحالية' : 'Mot de passe actuel'}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'كلمة المرور الجديدة' : 'Nouveau mot de passe'}
                      </label>
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'}
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {editing && (
                <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'حفظ' : 'Sauvegarder'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Préférences et sécurité */}
        <div className="space-y-6">
          {/* Préférences */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'ar' ? 'التفضيلات' : 'Préférences'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'اللغة' : 'Langue'}
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'المظهر' : 'Thème'}
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({...formData, theme: e.target.value as 'light' | 'dark'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="light">
                    {language === 'ar' ? 'فاتح' : 'Clair'}
                  </option>
                  <option value="dark">
                    {language === 'ar' ? 'داكن' : 'Sombre'}
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                  </label>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'تفعيل الإشعارات في المتصفح' : 'Activer les notifications navigateur'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'إشعارات البريد الإلكتروني' : 'Notifications email'}
                  </label>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'استلام الإشعارات عبر البريد الإلكتروني' : 'Recevoir les notifications par email'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({...formData, emailNotifications: e.target.checked})}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'ar' ? 'الأمان' : 'Sécurité'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? 'المصادقة الثنائية' : 'Authentification à deux facteurs'}
                  </label>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'إضافة طبقة أمان إضافية' : 'Ajouter une couche de sécurité supplémentaire'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.security.twoFactorEnabled}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'آخر تغيير لكلمة المرور' : 'Dernier changement de mot de passe'}
                </label>
                <p className="text-sm text-gray-900">{profile.security.lastPasswordChange}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'تاريخ تسجيل الدخول' : 'Historique des connexions'}
                </label>
                <div className="space-y-2">
                  {profile.security.loginHistory.slice(0, 3).map((login, index) => (
                    <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                      <div className="font-medium">{login.date}</div>
                      <div className="text-xs text-gray-500">
                        {login.ip} • {login.location} • {login.device}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
