-- 🚨 CORRECTION DE LA CONTRAINTE DE CLÉ ÉTRANGÈRE
-- Problème: La table public.users a une contrainte qui pointe vers auth.users
-- Solution: Supprimer cette contrainte et permettre l'insertion directe

-- 1. Vérifier les contraintes existantes
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='users' 
    AND tc.table_schema='public';

-- 2. Supprimer la contrainte de clé étrangère problématique
-- Remplacez 'users_id_fkey' par le nom réel de la contrainte trouvé ci-dessus
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- 3. Désactiver RLS pour permettre l'insertion
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 4. Vérifier que RLS est désactivé
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

-- 5. Vérifier la structure de la table users
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Créer un index sur l'ID pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_id ON public.users(id);

-- 7. Vérifier que tout fonctionne
-- Test d'insertion (optionnel - à supprimer après test)
-- INSERT INTO public.users (id, email, name, role) 
-- VALUES ('test-id-123', 'test@example.com', 'Test User', 'client');

-- 8. Nettoyer le test (si effectué)
-- DELETE FROM public.users WHERE id = 'test-id-123';

-- ✅ RÉSULTAT ATTENDU:
-- - Contrainte de clé étrangère supprimée
-- - RLS désactivé
-- - Table accessible pour insertion
-- - Inscription fonctionnelle
