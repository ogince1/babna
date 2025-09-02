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
      
          // Utiliser directement l'utilisateur déjà connecté au lieu de refaire la vérification
    console.log('🔄 Vérification de l\'utilisateur connecté...');
    
    if (!user) {
      console.log('⚠️ Aucun utilisateur connecté dans l\'état, tentative de récupération...');
      
      // Essayer de récupérer l'utilisateur depuis Supabase Auth
      try {
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !currentUser) {
          console.log('❌ Impossible de récupérer l\'utilisateur depuis Supabase Auth');
          setProfile(null);
          return;
        }
        
        console.log('✅ Utilisateur récupéré depuis Supabase Auth:', currentUser.email);
        console.log('✅ ID utilisateur récupéré:', currentUser.id);
        
        // Mettre à jour l'ID pour utiliser celui de l'utilisateur récupéré
        if (currentUser.id !== userId) {
          console.log('⚠️ ID utilisateur différent détecté:');
          console.log('  - ID demandé:', userId);
          console.log('  - ID récupéré:', currentUser.id);
          console.log('🔄 Utilisation de l\'ID de l\'utilisateur récupéré');
          userId = currentUser.id;
        }
        
        console.log('✅ Utilisateur confirmé:', currentUser.email);
        console.log('✅ ID utilisateur confirmé:', userId);
      } catch (error) {
        console.error('❌ Erreur lors de la récupération de l\'utilisateur:', error);
        setProfile(null);
        return;
      }
    } else {
      // Vérifier si l'ID correspond, sinon utiliser l'ID de l'utilisateur connecté
      if (user.id !== userId) {
        console.log('⚠️ ID utilisateur différent détecté:');
        console.log('  - ID demandé:', userId);
        console.log('  - ID connecté:', user.id);
        console.log('🔄 Utilisation de l\'ID de l\'utilisateur connecté');
        // Mettre à jour l'ID pour utiliser celui de l'utilisateur connecté
        userId = user.id;
      }
      
      console.log('✅ Utilisateur connecté confirmé:', user.email);
      console.log('✅ ID utilisateur confirmé:', userId);
    }
      console.log('🔄 Tentative de récupération du profil depuis public.users...');
      
      // Essayer de récupérer le profil directement depuis Supabase
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('id, name, email, role, phone, avatar_url, whatsapp, created_at, updated_at')
        .eq('id', userId)
        .single();
      
      console.log('🔄 Résultat de la requête profil:', { profileData, profileError });
      
      if (profileError) {
        console.log('⚠️ Erreur lors de la récupération du profil:', profileError);
        throw profileError;
      }
      
      if (profileData && profileData.name && profileData.name !== 'Utilisateur') {
        console.log('✅ Profil utilisateur chargé depuis public.users:', profileData.name);
        console.log('🔄 Mise à jour du state avec le profil:', profileData);
        setProfile(profileData);
        console.log('✅ State profil mis à jour avec succès');
        return;
      }
      
      // Profil incomplet ou fantôme détecté
      if (profileData && (profileData.name === 'Utilisateur' || !profileData.name)) {
        console.log('⚠️ Profil fantôme détecté, suppression et recréation...');
        
        try {
          // Supprimer le profil fantôme
          const { error: deleteError } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);
          
          if (deleteError) {
            console.error('❌ Erreur lors de la suppression du profil fantôme:', deleteError);
          } else {
            console.log('✅ Profil fantôme supprimé');
          }
          
          // Lancer la création d'un nouveau profil
          throw new Error('Profil fantôme supprimé, création d\'un nouveau profil');
          
        } catch (deleteError) {
          console.log('🔄 Suppression du profil fantôme terminée');
          throw new Error('Profil fantôme supprimé, création d\'un nouveau profil');
        }
      }
      
      console.log('⚠️ Aucun profil trouvé dans public.users');
      throw new Error('Profil non trouvé');
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement du profil:', error);
      
      // Si l'utilisateur est connecté mais le profil n'existe pas, le créer
      if (user) {
        console.log('⚠️ Utilisateur connecté mais profil non trouvé, création du profil...');
        try {
          console.log('🔄 Création automatique du profil utilisateur...');
          
          // Créer le profil automatiquement
          const { error: createError } = await supabase
            .from('users')
            .insert({
              id: userId,
              email: user.email || '',
              name: user.user_metadata?.name || user.email?.split('@')[0] || 'Utilisateur',
              phone: user.user_metadata?.phone || null,
              whatsapp: user.user_metadata?.whatsapp || null,
              role: user.user_metadata?.role || 'client'
            });
          
          if (createError) {
            console.error('❌ Erreur lors de la création du profil:', createError);
            throw createError;
          }
          
          console.log('✅ Profil utilisateur créé automatiquement');
          
          // Recharger le profil créé
          const { data: newProfileData, error: newProfileError } = await supabase
            .from('users')
            .select('id, name, email, role, phone, avatar_url, whatsapp, created_at, updated_at')
            .eq('id', userId)
            .single();
          
          if (newProfileError) {
            console.error('❌ Erreur lors du rechargement du profil créé:', newProfileError);
            setProfile(null);
            return;
          }
          
          console.log('✅ Nouveau profil chargé avec succès:', newProfileData.name);
          console.log('🔄 Mise à jour du state avec le nouveau profil:', newProfileData);
          setProfile(newProfileData);
          console.log('✅ State profil mis à jour avec succès');
          
        } catch (createError) {
          console.error('❌ Erreur lors de la création du profil:', createError);
          setProfile(null);
        }
      } else {
        console.log('⚠️ Aucun utilisateur connecté, profil mis à null');
        setProfile(null);
      }
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    try {
      console.log('🔄 Tentative d\'inscription:', email);
      setLoading(true);
      
      // Étape 1: Créer l'utilisateur dans auth.users
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name || '',
            phone: userData.phone || null,
            whatsapp: userData.whatsapp || null,
            role: userData.role || 'client'
          }
        }
      });

      if (error) throw error;

      // Étape 2: Créer le profil dans public.users avec délai et vérification
      if (data.user) {
        console.log('🔄 Attente de la propagation de l\'utilisateur dans auth.users...');
        
        // Attendre que l'utilisateur soit complètement propagé
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
          // Vérifier que l'utilisateur existe dans auth.users
          const { data: authUser, error: authError } = await supabase.auth.getUser();
          
          if (authError || !authUser.user) {
            console.log('⚠️ Utilisateur pas encore disponible, attente supplémentaire...');
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
          
          console.log('🔄 Création du profil utilisateur...');
          
          const { error: profileError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email!,
              name: userData.name || '',
              phone: userData.phone || null,
              whatsapp: userData.whatsapp || null,
              role: userData.role || 'client',
            });

          if (profileError) {
            console.error('❌ Erreur lors de la création du profil:', profileError);
            throw profileError;
          }

          console.log('✅ Profil utilisateur créé avec succès dans public.users');
        } catch (profileError) {
          console.error('❌ Erreur lors de la création du profil:', profileError);
          // Si ça échoue, on continue quand même
          console.log('⚠️ Le profil sera créé lors de la première connexion');
        }
      }

      console.log('✅ Inscription complète réussie:', data.user?.email);
      setLoading(false); // Désactiver le loading en cas de succès
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
