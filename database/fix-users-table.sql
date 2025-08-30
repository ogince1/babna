-- Script pour corriger la table users dans Supabase Cloud
-- Ajouter la colonne whatsapp manquante

-- Ajouter la colonne whatsapp si elle n'existe pas
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;

-- Vérifier que la colonne a été ajoutée
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public' 
AND column_name = 'whatsapp';

-- Mettre à jour les types TypeScript si nécessaire
-- La colonne whatsapp devrait maintenant être disponible dans les requêtes
