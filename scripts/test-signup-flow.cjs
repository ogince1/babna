const { createClient } = require('@supabase/supabase-js');

console.log('🧪 TEST DU FLUX D\'INSCRIPTION');
console.log('==============================');
console.log('');

// Configuration Supabase (utilisez votre clé anon)
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTcyOTAsImV4cCI6MjA1MDg3MzI5MH0.8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c';

console.log('🔗 Connexion à Supabase...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignupFlow() {
  try {
    console.log('📝 Test 1: Vérification des politiques RLS...');
    
    // Test simple d'accès à la table users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.log('❌ Erreur d\'accès à la table users:', usersError.message);
      console.log('   Code:', usersError.code);
      console.log('   Détails:', usersError.details);
    } else {
      console.log('✅ Table users accessible');
    }
    
    console.log('');
    console.log('📝 Test 2: Tentative d\'insertion d\'un utilisateur de test...');
    
    // Test d'insertion avec un ID de test
    const testUserId = '00000000-0000-0000-0000-000000000001';
    const testUser = {
      id: testUserId,
      email: 'test-signup@example.com',
      name: 'Test Signup',
      role: 'client'
    };
    
    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
      .single();
    
    if (insertError) {
      console.log('❌ Erreur lors de l\'insertion:', insertError.message);
      console.log('   Code:', insertError.code);
      console.log('   Détails:', insertError.details);
      
      if (insertError.code === '42501') {
        console.log('');
        console.log('🔍 DIAGNOSTIC: Problème de politique RLS');
        console.log('');
        console.log('💡 SOLUTIONS POSSIBLES:');
        console.log('1. Vérifier que les politiques RLS sont actives');
        console.log('2. Vérifier le contexte d\'authentification');
        console.log('3. Vérifier que la table users a les bonnes colonnes');
      }
    } else {
      console.log('✅ Utilisateur de test inséré avec succès !');
      console.log('📋 Détails:', insertedUser);
      
      // Supprimer l'utilisateur de test
      console.log('🧹 Suppression de l\'utilisateur de test...');
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', testUserId);
      
      if (deleteError) {
        console.log('⚠️  Erreur lors de la suppression:', deleteError.message);
      } else {
        console.log('✅ Utilisateur de test supprimé');
      }
    }
    
    console.log('');
    console.log('📝 Test 3: Vérification de la structure de la table...');
    
    // Vérifier la structure avec une requête simple
    const { data: structure, error: structureError } = await supabase
      .from('users')
      .select('id, email, name, role')
      .limit(0);
    
    if (structureError) {
      console.log('❌ Erreur de structure:', structureError.message);
    } else {
      console.log('✅ Structure de la table accessible');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter les tests
testSignupFlow();
