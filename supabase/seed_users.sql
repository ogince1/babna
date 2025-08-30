-- Script pour insérer les utilisateurs propriétaires dans Supabase
-- Note: Les utilisateurs doivent d'abord être créés dans auth.users via l'interface Supabase

-- Insérer les utilisateurs dans la table public.users
-- Assurez-vous d'avoir d'abord créé ces utilisateurs dans auth.users via l'interface Supabase

INSERT INTO public.users (
    id,
    email,
    name,
    phone,
    whatsapp,
    role,
    avatar,
    created_at
) VALUES 
-- Propriétaire 1
(
    gen_random_uuid(), -- Remplacez par l'ID réel de auth.users
    'fatima@example.com',
    'Fatima Alaoui',
    '+212623456789',
    '+212623456789',
    'owner',
    null,
    '2024-01-05 10:00:00+00'
),

-- Propriétaire 2
(
    gen_random_uuid(), -- Remplacez par l'ID réel de auth.users
    'youssef@example.com',
    'Youssef Idrissi',
    '+212634567890',
    '+212634567890',
    'owner',
    null,
    '2024-01-08 10:00:00+00'
),

-- Propriétaire 3
(
    gen_random_uuid(), -- Remplacez par l'ID réel de auth.users
    'khadija@example.com',
    'Khadija Benali',
    '+212645678901',
    '+212645678901',
    'owner',
    null,
    '2024-01-12 10:00:00+00'
),

-- Client
(
    gen_random_uuid(), -- Remplacez par l'ID réel de auth.users
    'ahmed@example.com',
    'Ahmed Bennani',
    '+212612345678',
    '+212612345678',
    'client',
    null,
    '2024-01-01 10:00:00+00'
),

-- Admin
(
    gen_random_uuid(), -- Remplacez par l'ID réel de auth.users
    'admin@babna.ma',
    'Admin Platform',
    '+212656789012',
    '+212656789012',
    'admin',
    null,
    '2024-01-01 10:00:00+00'
);
