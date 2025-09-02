const { createClient } = require('@supabase/supabase-js');

console.log('🔧 CORRECTION SIMPLE DE LA TABLE USERS');
console.log('=======================================');
console.log('');

// Configuration Supabase (remplacez par vos vraies valeurs)
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTI5NzI5MCwiZXhwIjoyMDUwODczMjkwfQ.8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c';

console.log('🔗 Connexion à Supabase...');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixUsersTable() {
  try {
    console.log('📝 Test de création d\'un utilisateur...');
    
    // Essayer de créer un utilisateur de test
    const testUser = {
      id: '00000000-0000-0000-0000-000000000000', // ID de test
      email: 'test@example.com',
      name: 'Test User',
      role: 'client'
    };
    
    const { data, error } = await supabase
      .from('users')
      .insert(testUser)
      .select();
    
    if (error) {
      console.log('❌ Erreur lors de l\'insertion:', error.message);
      
      if (error.message.includes('row-level security policy')) {
        console.log('');
        console.log('🔍 DIAGNOSTIC: Politique RLS manquante pour INSERT');
        console.log('');
        console.log('✅ SOLUTION MANUELLE REQUISE:');
        console.log('1. Allez sur https://supabase.com/dashboard');
        console.log('2. Sélectionnez votre projet: ubanmapcosqapprxkjld');
        console.log('3. Allez dans "SQL Editor"');
        console.log('4. Exécutez ce SQL:');
        console.log('');
        console.log('📝 SQL à exécuter:');
        console.log('------------------');
        console.log(`
-- Ajouter la politique manquante pour INSERT dans users
CREATE POLICY "Users can insert their own profile" ON public.users 
FOR INSERT WITH CHECK (auth.uid() = id);

-- Ajouter la colonne whatsapp si elle n'existe pas
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;

-- Vérifier que la politique a été créée
SELECT policyname, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'users'
ORDER BY policyname;
        `);
        console.log('');
        console.log('🔄 Après avoir exécuté ce SQL, l\'inscription devrait fonctionner.');
      }
    } else {
      console.log('✅ Test réussi ! Suppression de l\'utilisateur de test...');
      
      // Supprimer l'utilisateur de test
      await supabase
        .from('users')
        .delete()
        .eq('id', testUser.id);
      
      console.log('✅ Utilisateur de test supprimé');
      console.log('✅ La table users fonctionne correctement !');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter la correction
fixUsersTable();
