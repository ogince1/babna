const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION DES POLITIQUES RLS - SUPABASE CLOUD');
console.log('==================================================');
console.log('');

// Lire le fichier .env
const envPath = path.join(__dirname, '..', '.env');
let supabaseUrl, supabaseServiceKey;

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      supabaseServiceKey = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.log('❌ Impossible de lire le fichier .env');
  console.log('💡 Utilisation des valeurs par défaut...');
  
  // Valeurs par défaut (à remplacer par vos vraies valeurs)
  supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
  supabaseServiceKey = 'VOTRE_CLE_SERVICE_ROLE_ICI';
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('❌ Variables d\'environnement manquantes');
  console.log('');
  console.log('✅ SOLUTION MANUELLE:');
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

-- Vérifier les politiques
SELECT policyname, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'users'
ORDER BY policyname;
  `);
  console.log('');
  console.log('🔄 Après avoir exécuté ce SQL, l\'inscription devrait fonctionner.');
  process.exit(1);
}

console.log('🔗 Connexion à Supabase...');
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixRLSPolicies() {
  try {
    console.log('📝 Ajout de la politique RLS manquante...');
    
    // Ajouter la politique pour INSERT
    const { error: insertPolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "Users can insert their own profile" 
        ON public.users 
        FOR INSERT WITH CHECK (auth.uid() = id);
      `
    });
    
    if (insertPolicyError) {
      console.log('⚠️  Erreur avec exec_sql, tentative directe...');
      
      // Essayer d'ajouter la colonne whatsapp
      const { error: alterError } = await supabase
        .from('users')
        .select('whatsapp')
        .limit(1);
      
      if (alterError && alterError.message.includes('whatsapp')) {
        console.log('❌ La colonne whatsapp n\'existe pas');
        console.log('💡 Exécutez manuellement ce SQL:');
        console.log('ALTER TABLE public.users ADD COLUMN IF NOT EXISTS whatsapp TEXT;');
      }
    } else {
      console.log('✅ Politique RLS ajoutée avec succès !');
    }
    
    console.log('');
    console.log('🔍 Vérification des politiques existantes...');
    
    // Vérifier les politiques existantes
    const { data: policies, error: policiesError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (policiesError) {
      console.log('❌ Erreur lors de la vérification:', policiesError.message);
    } else {
      console.log('✅ Table users accessible');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('');
    console.log('💡 SOLUTION MANUELLE REQUISE:');
    console.log('1. Allez dans votre dashboard Supabase');
    console.log('2. SQL Editor → Exécutez le script database/fix-rls-policies.sql');
  }
}

// Exécuter la correction
fixRLSPolicies();
