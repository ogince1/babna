import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'client' | 'owner'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp, signIn, language, loading: authLoading, isAuthenticated } = useApp();

  // Fermer la modal quand l'authentification est réussie
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      onClose();
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setRole('client');
      setLoading(false);
    }
  }, [isAuthenticated, authLoading, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, {
          name,
          phone: phone || null,
          role
        });
        if (error) throw error;
        
        // Réinitialiser le loading local après inscription réussie
        setLoading(false);
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        // Réinitialiser le loading local après connexion réussie
        setLoading(false);
      }
      
      // La modal se fermera automatiquement via useEffect
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSignUp 
              ? (language === 'ar' ? 'إنشاء حساب' : 'Créer un compte')
              : (language === 'ar' ? 'تسجيل الدخول' : 'Se connecter')
            }
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'الاسم' : 'Nom complet'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'ar' ? 'أدخل اسمك' : 'Entrez votre nom'}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Entrez votre email'}
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'رقم الهاتف' : 'Téléphone (optionnel)'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Entrez votre téléphone'}
                />
              </div>
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === 'ar' ? 'نوع الحساب' : 'Type de compte'}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'client' | 'owner')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="client">
                  {language === 'ar' ? 'مسافر' : 'Voyageur'}
                </option>
                <option value="owner">
                  {language === 'ar' ? 'مالك عقار' : 'Propriétaire'}
                </option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Entrez votre mot de passe'}
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || authLoading
              ? (language === 'ar' ? 'جاري التحميل...' : 'Chargement...')
              : (isSignUp 
                  ? (language === 'ar' ? 'إنشاء حساب' : 'Créer un compte')
                  : (language === 'ar' ? 'تسجيل الدخول' : 'Se connecter')
                )
            }
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            {isSignUp 
              ? (language === 'ar' ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Vous avez déjà un compte ? Se connecter')
              : (language === 'ar' ? 'ليس لديك حساب؟ إنشاء حساب' : 'Vous n\'avez pas de compte ? Créer un compte')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;