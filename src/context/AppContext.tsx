import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { Database } from '../lib/supabase';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AppContextType {
  user: UserProfile | null;
  language: 'fr' | 'ar' | 'en' | 'es';
  setLanguage: (lang: 'fr' | 'ar' | 'en' | 'es') => void;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  forceLogout: () => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'ar' | 'en' | 'es'>('fr');
  
  const {
    profile: user,
    isAuthenticated,
    loading,
    signUp,
    signIn,
    signOut,
    forceSignOut,
    updateProfile
  } = useSupabaseAuth();

  const logout = async () => {
    try {
      console.log('🔄 AppContext: Début de la déconnexion...');
      // Utiliser forceSignOut pour une déconnexion plus propre
      const { error } = await forceSignOut();
      if (error) {
        console.error('❌ AppContext: Erreur lors de la déconnexion:', error);
        throw error;
      }
      console.log('✅ AppContext: Déconnexion réussie');
    } catch (error) {
      console.error('❌ AppContext: Erreur lors de la déconnexion:', error);
      throw error;
    }
  };

  const forceLogout = async () => {
    try {
      console.log('🔄 AppContext: Début de la déconnexion forcée...');
      const { error } = await forceSignOut();
      if (error) {
        console.error('❌ AppContext: Erreur lors de la déconnexion forcée:', error);
        throw error;
      }
      console.log('✅ AppContext: Déconnexion forcée réussie');
    } catch (error) {
      console.error('❌ AppContext: Erreur lors de la déconnexion forcée:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      language,
      setLanguage,
      isAuthenticated,
      loading,
      logout,
      forceLogout,
      signUp,
      signIn,
      updateProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};