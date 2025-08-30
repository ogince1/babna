-- Script pour insérer toutes les propriétés dans Supabase
-- Assurez-vous d'avoir d'abord créé les utilisateurs propriétaires

-- Insérer les propriétés
INSERT INTO public.properties (
    title,
    description,
    price,
    city,
    address,
    lat,
    lng,
    images,
    amenities,
    bedrooms,
    bathrooms,
    max_guests,
    property_type,
    owner_id,
    is_available,
    is_approved,
    rating,
    reviews_count,
    created_at
) VALUES 
-- Propriété 1: Marrakech
(
    'Appartement moderne près de la Médina',
    'Magnifique appartement de 2 chambres situé à proximité de la médina de Marrakech. Parfait pour découvrir la ville impériale.',
    450.00,
    'Marrakech',
    'Quartier Hivernage, Marrakech',
    31.6295,
    -8.0080,
    ARRAY[
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Climatisation', 'Cuisine équipée', 'Terrasse', 'Parking'],
    2,
    1,
    4,
    'apartment',
    (SELECT id FROM public.users WHERE email = 'fatima@example.com' LIMIT 1),
    true,
    true,
    4.8,
    23,
    '2024-01-15 10:00:00+00'
),

-- Propriété 2: Marrakech
(
    'Villa avec piscine - Vue sur l''Atlas',
    'Villa luxueuse avec piscine privée et vue panoramique sur les montagnes de l''Atlas. Idéale pour des vacances en famille.',
    850.00,
    'Marrakech',
    'Route de l''Ourika, Marrakech',
    31.6450,
    -7.9900,
    ARRAY[
        'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Barbecue', 'Parking'],
    4,
    3,
    8,
    'villa',
    (SELECT id FROM public.users WHERE email = 'youssef@example.com' LIMIT 1),
    true,
    true,
    4.9,
    18,
    '2024-01-20 10:00:00+00'
),

-- Propriété 3: Fès
(
    'Riad authentique - Médina de Fès',
    'Riad traditionnel rénové dans la médina de Fès. Architecture authentique avec tout le confort moderne.',
    600.00,
    'Fès',
    'Médina de Fès, Fès',
    34.0333,
    -5.0000,
    ARRAY[
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1438833/pexels-photo-1438833.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Patio', 'Cuisine traditionnelle', 'Hammam', 'Terrasse'],
    3,
    2,
    6,
    'riad',
    (SELECT id FROM public.users WHERE email = 'khadija@example.com' LIMIT 1),
    true,
    true,
    4.7,
    31,
    '2024-01-10 10:00:00+00'
),

-- Propriété 4: Casablanca
(
    'Studio moderne - Centre de Casablanca',
    'Studio élégant dans le centre de Casablanca, parfait pour les voyages d''affaires ou courts séjours.',
    320.00,
    'Casablanca',
    'Quartier des Habous, Casablanca',
    33.5731,
    -7.5898,
    ARRAY[
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Climatisation', 'Kitchenette', 'Salle de sport'],
    1,
    1,
    2,
    'studio',
    (SELECT id FROM public.users WHERE email = 'fatima@example.com' LIMIT 1),
    true,
    true,
    4.5,
    12,
    '2024-01-25 10:00:00+00'
),

-- Propriété 5: Rabat
(
    'Appartement moderne - Centre de Rabat',
    'Appartement élégant dans le centre-ville de Rabat, proche des institutions gouvernementales et de la médina.',
    380.00,
    'Rabat',
    'Avenue Mohammed V, Rabat',
    34.0209,
    -6.8416,
    ARRAY[
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Parking'],
    2,
    1,
    4,
    'apartment',
    (SELECT id FROM public.users WHERE email = 'fatima@example.com' LIMIT 1),
    true,
    true,
    4.6,
    19,
    '2024-01-28 10:00:00+00'
),

-- Propriété 6: Agadir
(
    'Villa de luxe - Plage d''Agadir',
    'Villa moderne avec vue sur l''océan Atlantique, située sur la corniche d''Agadir.',
    1200.00,
    'Agadir',
    'Corniche d''Agadir, Agadir',
    30.4278,
    -9.5981,
    ARRAY[
        'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Terrasse', 'Parking privé'],
    5,
    4,
    10,
    'villa',
    (SELECT id FROM public.users WHERE email = 'youssef@example.com' LIMIT 1),
    true,
    true,
    4.9,
    28,
    '2024-02-01 10:00:00+00'
),

-- Propriété 7: Tanger
(
    'Riad traditionnel - Médina de Tanger',
    'Riad authentique dans la médina de Tanger, avec vue sur le détroit de Gibraltar.',
    550.00,
    'Tanger',
    'Médina de Tanger, Tanger',
    35.7595,
    -5.8340,
    ARRAY[
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1438833/pexels-photo-1438833.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Patio', 'Cuisine traditionnelle', 'Terrasse', 'Vue mer'],
    3,
    2,
    6,
    'riad',
    (SELECT id FROM public.users WHERE email = 'khadija@example.com' LIMIT 1),
    true,
    true,
    4.7,
    22,
    '2024-02-05 10:00:00+00'
),

-- Propriété 8: Meknès
(
    'Appartement moderne - Meknès',
    'Appartement moderne dans la ville impériale de Meknès, proche des sites historiques.',
    420.00,
    'Meknès',
    'Place El Hedim, Meknès',
    33.8935,
    -5.5473,
    ARRAY[
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Parking'],
    2,
    1,
    4,
    'apartment',
    (SELECT id FROM public.users WHERE email = 'fatima@example.com' LIMIT 1),
    true,
    true,
    4.5,
    15,
    '2024-02-10 10:00:00+00'
),

-- Propriété 9: Chefchaouen
(
    'Studio moderne - Chefchaouen',
    'Studio dans la ville bleue de Chefchaouen, parfait pour découvrir cette ville unique.',
    280.00,
    'Chefchaouen',
    'Médina de Chefchaouen, Chefchaouen',
    35.1714,
    -5.2696,
    ARRAY[
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['WiFi', 'Climatisation', 'Kitchenette', 'Vue montagne'],
    1,
    1,
    2,
    'studio',
    (SELECT id FROM public.users WHERE email = 'youssef@example.com' LIMIT 1),
    true,
    true,
    4.8,
    31,
    '2024-02-15 10:00:00+00'
),

-- Propriété 10: Essaouira
(
    'Villa avec piscine - Essaouira',
    'Villa moderne avec piscine à Essaouira, ville côtière célèbre pour ses plages et son vent.',
    750.00,
    'Essaouira',
    'Quartier des Dunes, Essaouira',
    31.5085,
    -9.7595,
    ARRAY[
        'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    ARRAY['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Terrasse', 'Parking'],
    3,
    2,
    6,
    'villa',
    (SELECT id FROM public.users WHERE email = 'khadija@example.com' LIMIT 1),
    true,
    true,
    4.6,
    18,
    '2024-02-20 10:00:00+00'
);
