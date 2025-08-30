-- Ajouter la colonne tags à la table properties
ALTER TABLE public.properties 
ADD COLUMN tags TEXT[] DEFAULT '{}';

-- Créer un index pour améliorer les performances des requêtes sur les tags
CREATE INDEX idx_properties_tags ON public.properties USING GIN (tags);

-- Ajouter un commentaire pour documenter la colonne
COMMENT ON COLUMN public.properties.tags IS 'Array of attraction tag IDs associated with this property';
