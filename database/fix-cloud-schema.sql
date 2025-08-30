-- Script pour corriger le schéma de la base de données Supabase Cloud
-- À exécuter dans l'interface SQL de Supabase

-- 1. Ajouter les colonnes manquantes à la table properties
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0;

-- 2. Mettre à jour toutes les propriétés existantes pour qu'elles soient approuvées
UPDATE public.properties 
SET is_approved = true 
WHERE is_approved IS NULL;

-- 3. Vérifier que toutes les propriétés ont les bonnes valeurs par défaut
UPDATE public.properties 
SET 
  rating = COALESCE(rating, 0),
  reviews_count = COALESCE(reviews_count, 0),
  is_available = COALESCE(is_available, true),
  is_approved = COALESCE(is_approved, true)
WHERE 
  rating IS NULL 
  OR reviews_count IS NULL 
  OR is_available IS NULL 
  OR is_approved IS NULL;

-- 4. Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_properties_is_approved ON public.properties(is_approved);
CREATE INDEX IF NOT EXISTS idx_properties_is_available ON public.properties(is_available);
CREATE INDEX IF NOT EXISTS idx_properties_city_available ON public.properties(city, is_available, is_approved);

-- 5. Mettre à jour les politiques RLS pour inclure is_approved
DROP POLICY IF EXISTS "Properties are viewable by everyone" ON public.properties;
CREATE POLICY "Properties are viewable by everyone" ON public.properties 
FOR SELECT USING (is_available = true AND is_approved = true);

-- 6. Vérifier la structure de la table
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND table_schema = 'public'
ORDER BY ordinal_position;
