const { createClient } = require('@supabase/supabase-js');

console.log('🔍 VÉRIFICATION DU PROFIL UTILISATEUR');
console.log('=====================================');
console.log('');

// Configuration Supabase (utilisez votre clé anon)
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTcyOTAsImV4cCI6MjA1MDg3MzI5MH0.8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c';

console.log('🔗 Connexion à Supabase...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkUserProfile() {
  try {
    const userId = '9a800006-aed1-435b-a0dc-de07c697bc12';
    
    console.log(`📝 Vérification du profil pour l'utilisateur: ${userId}`);
    console.log('');
    
    // Test 1: Vérifier si l'utilisateur existe dans auth.users
    console.log('🔍 Test 1: Vérification dans auth.users...');
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);
    
    if (authError) {
      console.log('❌ Erreur auth:', authError.message);
    } else {
      console.log('✅ Utilisateur trouvé dans auth.users:', authUser.user?.email);
    }
    
    console.log('');
    
    // Test 2: Vérifier le profil dans public.users avec select explicite
    console.log('🔍 Test 2: Vérification dans public.users (select explicite)...');
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email, role, phone, avatar_url, whatsapp, created_at, updated_at')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.log('❌ Erreur profil (select explicite):', profileError.message);
      console.log('   Code:', profileError.code);
      console.log('   Détails:', profileError.details);
    } else {
      console.log('✅ Profil trouvé avec select explicite:', profile);
    }
    
    console.log('');
    
    // Test 3: Vérifier avec select('*')
    console.log('🔍 Test 3: Vérification avec select("*")...');
    const { data: profileAll, error: profileAllError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileAllError) {
      console.log('❌ Erreur profil (select *):', profileAllError.message);
      console.log('   Code:', profileAllError.code);
      console.log('   Détails:', profileAllError.details);
    } else {
      console.log('✅ Profil trouvé avec select("*"):', profileAll);
    }
    
    console.log('');
    
    // Test 4: Vérifier la structure de la table
    console.log('🔍 Test 4: Vérification de la structure de la table...');
    const { data: columns, error: columnsError } = await supabase
      .from('users')
      .select('*')
      .limit(0);
    
    if (columnsError) {
      console.log('❌ Erreur structure:', columnsError.message);
    } else {
      console.log('✅ Structure de la table accessible');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter la vérification
checkUserProfile();
