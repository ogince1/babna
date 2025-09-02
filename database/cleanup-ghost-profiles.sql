-- 🧹 NETTOYAGE DES PROFILS FANTÔMES
-- Ce script supprime les profils utilisateurs incomplets ou corrompus

-- 1. Voir tous les profils existants
SELECT 
    id,
    email,
    name,
    role,
    phone,
    whatsapp,
    created_at,
    updated_at
FROM public.users
ORDER BY created_at DESC;

-- 2. Identifier les profils fantômes (avec des données manquantes ou incorrectes)
SELECT 
    id,
    email,
    name,
    role,
    phone,
    whatsapp,
    created_at,
    updated_at
FROM public.users
WHERE 
    name IS NULL 
    OR name = '' 
    OR name = 'Utilisateur'
    OR email IS NULL
    OR role IS NULL;

-- 3. Supprimer les profils fantômes identifiés
-- REMPLACEZ 'ID_DU_PROFIL_FANTOME' par l'ID réel trouvé ci-dessus
DELETE FROM public.users 
WHERE id = 'ID_DU_PROFIL_FANTOME';

-- 4. Vérifier que le nettoyage est effectué
SELECT 
    id,
    email,
    name,
    role,
    phone,
    whatsapp,
    created_at,
    updated_at
FROM public.users
ORDER BY created_at DESC;

-- 5. Optionnel : Réinitialiser complètement la table users
-- ATTENTION : Cela supprime TOUS les profils !
-- UNCOMMENT SEULEMENT SI NÉCESSAIRE
-- TRUNCATE TABLE public.users RESTART IDENTITY CASCADE;

-- 6. Vérifier la structure de la table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- ✅ RÉSULTAT ATTENDU:
-- - Profils fantômes supprimés
-- - Table users propre
-- - Structure correcte
-- - Pas de données corrompues
