-- Script pour corriger les politiques RLS manquantes dans Supabase Cloud
-- À exécuter dans l'interface SQL de Supabase

-- 1. Ajouter la politique manquante pour INSERT dans users
CREATE POLICY "Users can insert their own profile" ON public.users 
FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Vérifier que toutes les politiques sont bien créées
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'users'
ORDER BY policyname;

-- 3. Si vous voulez aussi permettre aux admins de créer des profils utilisateurs
-- (optionnel, pour la gestion des comptes)
CREATE POLICY "Admins can insert any user profile" ON public.users 
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

-- 4. Vérifier que la table users a bien la colonne whatsapp
-- (si elle n'existe pas, l'ajouter)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;

-- 5. Vérifier la structure finale de la table users
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;
