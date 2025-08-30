import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, supabaseHelpers } from '../lib/supabase';
import { Database } from '../lib/supabase';

type UserProfile = Database['public']['Tables']['users']['Row'];

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        // Avec persistSession: false, il ne devrait pas y avoir de session au démarrage
        console.log('🔄 Initialisation sans session persistante...');
        
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de l\'auth:', error);
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Auth state change:', event, session?.user?.email);
      
      // Éviter les mises à jour d'état inutiles
      if (event === 'SIGNED_OUT') {
        console.log('🔄 Déconnexion détectée, nettoyage de l\'état...');
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }
      
      if (event === 'SIGNED_IN') {
        console.log('🔄 Connexion détectée, mise à jour de l\'état...');
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            await loadUserProfile(session.user.id);
          } catch (error) {
            console.error('❌ Erreur lors du chargement du profil après connexion:', error);
            setProfile(null);
          }
        }
        
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('🔄 Chargement du profil utilisateur:', userId);
      
      // Vérifier d'abord si l'utilisateur est toujours connecté
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser || currentUser.id !== userId) {
        console.log('⚠️ Utilisateur non connecté ou ID différent, arrêt du chargement du profil');
        setProfile(null);
        return;
      }
      
      const profile = await supabaseHelpers.getCurrentUser();
      console.log('✅ Profil utilisateur chargé:', profile?.name);
      setProfile(profile);
    } catch (error) {
      console.error('❌ Erreur lors du chargement du profil:', error);
      // Ne pas mettre le profil à null si l'utilisateur est connecté mais le profil n'existe pas
      // Cela peut arriver si l'utilisateur existe dans auth.users mais pas dans public.users
      if (user) {
        console.log('⚠️ Utilisateur connecté mais profil non trouvé, création du profil...');
        try {
          // Créer un profil par défaut
          const defaultProfile = await supabaseHelpers.createUser({
            id: userId,
            email: user.email || '',
            name: user.user_metadata?.name || user.email?.split('@')[0] || 'Utilisateur',
            phone: null,
            whatsapp: null,
            role: 'client'
          });
          setProfile(defaultProfile);
          console.log('✅ Profil par défaut créé:', defaultProfile?.name);
        } catch (createError) {
          console.error('❌ Erreur lors de la création du profil par défaut:', createError);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    try {
      console.log('🔄 Tentative d\'inscription:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        console.log('🔄 Création du profil utilisateur...');
        // Create user profile with fallback for missing columns
        try {
          await supabaseHelpers.createUser({
            id: data.user.id,
            email: data.user.email!,
            name: userData.name || '',
            phone: userData.phone || null,
            whatsapp: userData.whatsapp || null,
            role: userData.role || 'client',
          });
          console.log('✅ Profil utilisateur créé');
        } catch (profileError) {
          console.error('❌ Erreur lors de la création du profil:', profileError);
          // Fallback: créer le profil sans la colonne whatsapp
          try {
            const { error: fallbackError } = await supabase
              .from('users')
              .insert({
                id: data.user.id,
                email: data.user.email!,
                name: userData.name || '',
                phone: userData.phone || null,
                role: userData.role || 'client',
              });
            if (fallbackError) throw fallbackError;
            console.log('✅ Profil utilisateur créé (fallback)');
          } catch (fallbackError) {
            console.error('❌ Erreur lors de la création du profil (fallback):', fallbackError);
          }
        }
      }

      console.log('✅ Inscription réussie:', data.user?.email);
      return { data, error: null };
    } catch (error) {
      console.error('❌ Erreur d\'inscription:', error);
      setLoading(false);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔄 Tentative de connexion:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log('✅ Connexion réussie:', data.user?.email);
      return { data, error: null };
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      setLoading(false);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🔄 Début de la déconnexion...');
      
      // Forcer la mise à jour de l'état local immédiatement
      setUser(null);
      setProfile(null);
      setSession(null);
      setLoading(false);
      
      // Déconnexion simple sans persistance
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('✅ Déconnexion réussie');
      return { error: null };
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const forceSignOut = async () => {
    try {
      console.log('🔄 Déconnexion forcée...');
      
      // Forcer la mise à jour de l'état local immédiatement
      setUser(null);
      setProfile(null);
      setSession(null);
      setLoading(false);
      
      // Déconnexion simple
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Rediriger vers la page d'accueil
      window.location.href = '/';
      
      console.log('✅ Déconnexion forcée réussie');
      return { error: null };
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion forcée:', error);
      return { error };
    }
  };

  return {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    forceSignOut,
    updateProfile,
    isAuthenticated: !!user,
  };
};
