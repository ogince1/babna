const { createClient } = require('@supabase/supabase-js');

console.log('🔧 CRÉATION DU PROFIL UTILISATEUR MANQUANT');
console.log('==========================================');
console.log('');

// Configuration Supabase (utilisez votre clé service role)
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'VOTRE_CLE_SERVICE_ROLE_ICI';

console.log('🔗 Connexion à Supabase...');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createMissingProfile() {
  try {
    const userId = '9a800006-aed1-435b-a0dc-de07c697bc12';
    const userEmail = 'ogincema@gmail.com';
    
    console.log(`📝 Création du profil pour l'utilisateur: ${userEmail}`);
    console.log(`🆔 ID: ${userId}`);
    console.log('');
    
    // Vérifier si le profil existe déjà
    console.log('🔍 Vérification de l\'existence du profil...');
    const { data: existingProfile, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (checkError && checkError.code === 'PGRST116') {
      console.log('❌ Profil non trouvé - Création en cours...');
      
      // Créer le profil manquant
      const newProfile = {
        id: userId,
        email: userEmail,
        name: 'Utilisateur Test',
        role: 'client',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { data: createdProfile, error: createError } = await supabase
        .from('users')
        .insert(newProfile)
        .select('*')
        .single();
      
      if (createError) {
        console.log('❌ Erreur lors de la création:', createError.message);
        console.log('');
        console.log('💡 SOLUTION MANUELLE REQUISE:');
        console.log('1. Allez dans Supabase Dashboard');
        console.log('2. SQL Editor → Exécutez ce SQL:');
        console.log('');
        console.log('📝 SQL à exécuter:');
        console.log('------------------');
        console.log(`
INSERT INTO public.users (id, email, name, role, created_at, updated_at)
VALUES (
  '${userId}',
  '${userEmail}',
  'Utilisateur Test',
  'client',
  NOW(),
  NOW()
);
        `);
      } else {
        console.log('✅ Profil créé avec succès !');
        console.log('📋 Détails:', createdProfile);
      }
      
    } else if (existingProfile) {
      console.log('✅ Profil existe déjà:', existingProfile);
    } else {
      console.log('❌ Erreur lors de la vérification:', checkError?.message);
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
    console.log('');
    console.log('💡 SOLUTION MANUELLE REQUISE:');
    console.log('1. Allez dans Supabase Dashboard');
    console.log('2. SQL Editor → Exécutez le SQL ci-dessus');
  }
}

// Exécuter la création
createMissingProfile();
