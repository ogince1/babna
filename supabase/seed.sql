-- Seed data for the application

-- Insert sample content data only (properties and users will be created via the app)

-- Insert sample content data

-- FAQ data
INSERT INTO faqs (question, answer, category, related_to, "order", is_published) VALUES
(
  '{"fr": "Comment reserver un appartement ?", "ar": "كيف أحجز شقة؟", "en": "How to book an apartment?", "es": "¿Cómo reservar un apartamento?"}',
  '{"fr": "Vous pouvez reserver directement en ligne en selectionnant vos dates et en suivant les etapes de paiement.", "ar": "يمكنك الحجز مباشرة عبر الإنترنت باختيار التواريخ واتباع خطوات الدفع.", "en": "You can book directly online by selecting your dates and following the payment steps.", "es": "Puedes reservar directamente en línea seleccionando tus fechas y siguiendo los pasos de pago."}',
  'booking',
  NULL,
  1,
  true
),
(
  '{"fr": "Quels sont les moyens de paiement acceptes ?", "ar": "ما هي طرق الدفع المقبولة؟", "en": "What payment methods are accepted?", "es": "¿Qué métodos de pago se aceptan?"}',
  '{"fr": "Nous acceptons les cartes de credit, PayPal et les virements bancaires.", "ar": "نحن نقبل بطاقات الائتمان وباي بال والتحويلات البنكية.", "en": "We accept credit cards, PayPal and bank transfers.", "es": "Aceptamos tarjetas de crédito, PayPal y transferencias bancarias."}',
  'payment',
  NULL,
  1,
  true
),
(
  '{"fr": "Puis-je annuler ma reservation ?", "ar": "هل يمكنني إلغاء حجزي؟", "en": "Can I cancel my booking?", "es": "¿Puedo cancelar mi reserva?"}',
  '{"fr": "Oui, vous pouvez annuler jusqu a 24h avant votre arrivee selon les conditions de l appartement.", "ar": "نعم، يمكنك الإلغاء حتى 24 ساعة قبل الوصول حسب شروط الشقة.", "en": "Yes, you can cancel up to 24h before your arrival according to the apartment conditions.", "es": "Sí, puedes cancelar hasta 24h antes de tu llegada según las condiciones del apartamento."}',
  'booking',
  NULL,
  2,
  true
),
(
  '{"fr": "Que faire a Marrakech ?", "ar": "ماذا أفعل في مراكش؟", "en": "What to do in Marrakech?", "es": "¿Qué hacer en Marrakech?"}',
  '{"fr": "Visitez la Medina, les jardins Majorelle, la place Jemaa el-Fna et les souks traditionnels.", "ar": "قم بزيارة المدينة القديمة وحدائق ماجوريل وساحة جامع الفنا والأسواق التقليدية.", "en": "Visit the Medina, Majorelle Gardens, Jemaa el-Fna square and traditional souks.", "es": "Visita la Medina, los jardines Majorelle, la plaza Jemaa el-Fna y los zocos tradicionales."}',
  'city',
  'marrakech',
  1,
  true
),
(
  '{"fr": "Comment fonctionne la verification des proprietaires ?", "ar": "كيف تعمل عملية التحقق من الملاك؟", "en": "How does owner verification work?", "es": "¿Cómo funciona la verificación de propietarios?"}',
  '{"fr": "Tous nos proprietaires sont verifies et leurs biens sont inspectes pour garantir la qualite.", "ar": "جميع ملاكنا موثقون وممتلكاتهم مفحوصة لضمان الجودة.", "en": "All our owners are verified and their properties are inspected to ensure quality.", "es": "Todos nuestros propietarios están verificados y sus propiedades son inspeccionadas para garantizar la calidad."}',
  'general',
  NULL,
  1,
  true
),
(
  '{"fr": "Y a-t-il des frais de service ?", "ar": "هل هناك رسوم خدمة؟", "en": "Are there service fees?", "es": "¿Hay tarifas de servicio?"}',
  '{"fr": "Nous appliquons une commission de 10% sur le prix total de la reservation.", "ar": "نحن نطبق عمولة 10% على السعر الإجمالي للحجز.", "en": "We apply a 10% commission on the total booking price.", "es": "Aplicamos una comisión del 10% sobre el precio total de la reserva."}',
  'payment',
  NULL,
  2,
  true
),
(
  '{"fr": "Que faire a Fes ?", "ar": "ماذا أفعل في فاس؟", "en": "What to do in Fes?", "es": "¿Qué hacer en Fez?"}',
  '{"fr": "Explorez la plus ancienne medina du monde, visitez les tanneries traditionnelles et decouvrez l universite Al Quaraouiyine.", "ar": "استكشف أقدم مدينة في العالم، وزر المدابغ التقليدية واكتشف جامعة القرويين.", "en": "Explore the oldest medina in the world, visit traditional tanneries and discover Al Quaraouiyine University.", "es": "Explora la medina más antigua del mundo, visita las curtidurías tradicionales y descubre la Universidad Al Quaraouiyine."}',
  'city',
  'fes',
  2,
  true
),
(
  '{"fr": "Que faire a Casablanca ?", "ar": "ماذا أفعل في الدار البيضاء؟", "en": "What to do in Casablanca?", "es": "¿Qué hacer en Casablanca?"}',
  '{"fr": "Visitez la mosquee Hassan II, promenez-vous sur la Corniche et decouvrez le quartier des Habous.", "ar": "قم بزيارة مسجد الحسن الثاني، وتجول في الكورنيش واكتشف حي الأحباس.", "en": "Visit the Hassan II Mosque, walk along the Corniche and discover the Habous district.", "es": "Visita la mezquita Hassan II, pasea por la Corniche y descubre el barrio de los Habous."}',
  'city',
  'casablanca',
  3,
  true
),
(
  '{"fr": "Que faire a Rabat ?", "ar": "ماذا أفعل في الرباط؟", "en": "What to do in Rabat?", "es": "¿Qué hacer en Rabat?"}',
  '{"fr": "Visitez la Kasbah des Oudaias, la tour Hassan et la medina de Rabat.", "ar": "قم بزيارة قصبة الأوداية وبرج الحسن ومدينة الرباط القديمة.", "en": "Visit the Kasbah of the Udayas, Hassan Tower and the medina of Rabat.", "es": "Visita la Kasbah de los Udayas, la Torre Hassan y la medina de Rabat."}',
  'city',
  'rabat',
  4,
  true
),
(
  '{"fr": "Que faire a Agadir ?", "ar": "ماذا أفعل في أكادير؟", "en": "What to do in Agadir?", "es": "¿Qué hacer en Agadir?"}',
  '{"fr": "Profitez des plages, visitez la Kasbah et decouvrez le souk El Had.", "ar": "استمتع بالشواطئ، وزر القصبة واكتشف سوق الحاج.", "en": "Enjoy the beaches, visit the Kasbah and discover the El Had souk.", "es": "Disfruta de las playas, visita la Kasbah y descubre el zoco El Had."}',
  'city',
  'agadir',
  5,
  true
),
(
  '{"fr": "Que faire a Tanger ?", "ar": "ماذا أفعل في طنجة؟", "en": "What to do in Tangier?", "es": "¿Qué hacer en Tánger?"}',
  '{"fr": "Visitez la Kasbah, promenez-vous dans la medina et admirez la vue sur le detroit de Gibraltar.", "ar": "قم بزيارة القصبة، وتجول في المدينة القديمة واستمتع بإطلالة على مضيق جبل طارق.", "en": "Visit the Kasbah, walk through the medina and admire the view of the Strait of Gibraltar.", "es": "Visita la Kasbah, pasea por la medina y admira la vista del Estrecho de Gibraltar."}',
  'city',
  'tanger',
  6,
  true
),
(
  '{"fr": "Que faire a Essaouira ?", "ar": "ماذا أفعل في الصويرة؟", "en": "What to do in Essaouira?", "es": "¿Qué hacer en Essaouira?"}',
  '{"fr": "Decouvrez la medina fortifiee, visitez le port et profitez des plages pour le surf.", "ar": "اكتشف المدينة المحصنة، وزر الميناء واستمتع بالشواطئ للتزلج على الأمواج.", "en": "Discover the fortified medina, visit the port and enjoy the beaches for surfing.", "es": "Descubre la medina fortificada, visita el puerto y disfruta de las playas para surfear."}',
  'city',
  'essaouira',
  7,
  true
),
(
  '{"fr": "Comment contacter le support client ?", "ar": "كيف أتواصل مع خدمة العملاء؟", "en": "How to contact customer support?", "es": "¿Cómo contactar con atención al cliente?"}',
  '{"fr": "Vous pouvez nous contacter par email a support@babna.ma ou par telephone au +212 5 22 123 456.", "ar": "يمكنك التواصل معنا عبر البريد الإلكتروني support@babna.ma أو عبر الهاتف +212 5 22 123 456.", "en": "You can contact us by email at support@babna.ma or by phone at +212 5 22 123 456.", "es": "Puedes contactarnos por email en support@babna.ma o por teléfono en +212 5 22 123 456."}',
  'general',
  NULL,
  2,
  true
),
(
  '{"fr": "Les prix incluent-ils les taxes ?", "ar": "هل الأسعار تشمل الضرائب؟", "en": "Do prices include taxes?", "es": "¿Los precios incluyen impuestos?"}',
  '{"fr": "Oui, tous nos prix affiches incluent la TVA et les taxes locales.", "ar": "نعم، جميع أسعارنا المعروضة تشمل ضريبة القيمة المضافة والضرائب المحلية.", "en": "Yes, all our displayed prices include VAT and local taxes.", "es": "Sí, todos nuestros precios mostrados incluyen IVA e impuestos locales."}',
  'payment',
  NULL,
  3,
  true
),
(
  '{"fr": "Puis-je arriver a n importe quelle heure ?", "ar": "هل يمكنني الوصول في أي وقت؟", "en": "Can I arrive at any time?", "es": "¿Puedo llegar a cualquier hora?"}',
  '{"fr": "L heure d arrivee standard est 15h00, mais vous pouvez demander un check-in flexible.", "ar": "وقت الوصول القياسي هو 15:00، ولكن يمكنك طلب تسجيل دخول مرن.", "en": "Standard check-in time is 3:00 PM, but you can request flexible check-in.", "es": "La hora de llegada estándar es 15:00, pero puedes solicitar un check-in flexible."}',
  'booking',
  NULL,
  3,
  true
);

-- Testimonials data
INSERT INTO testimonials (author_name, rating, content, city, is_verified, is_published) VALUES
(
  'Marie Dubois',
  5,
  '{"fr": "Excellent sejour a Marrakech ! L appartement etait parfait et l accueil tres chaleureux.", "ar": "إقامة ممتازة في مراكش! الشقة كانت مثالية والاستقبال دافئ جداً.", "en": "Excellent stay in Marrakech! The apartment was perfect and the welcome very warm.", "es": "¡Excelente estancia en Marrakech! El apartamento era perfecto y la bienvenida muy cálida."}',
  'Marrakech',
  true,
  true
),
(
  'Ahmed Alami',
  4,
  '{"fr": "Tres bon rapport qualite-prix. L appartement etait propre et bien situe.", "ar": "نسبة سعر جيدة جداً. الشقة كانت نظيفة وموقعها جيد.", "en": "Very good value for money. The apartment was clean and well located.", "es": "Muy buena relación calidad-precio. El apartamento estaba limpio y bien ubicado."}',
  'Casablanca',
  true,
  true
),
(
  'Sarah Johnson',
  5,
  '{"fr": "Experience incroyable dans ce riad traditionnel. Le service etait exceptionnel.", "ar": "تجربة رائعة في هذا الرياد التقليدي. الخدمة كانت استثنائية.", "en": "Amazing experience in this traditional riad. The service was exceptional.", "es": "Experiencia increíble en este riad tradicional. El servicio fue excepcional."}',
  'Fès',
  true,
  true
),
(
  'Jean-Pierre Martin',
  5,
  '{"fr": "Villa magnifique a Agadir avec vue sur l ocean. Parfait pour des vacances en famille.", "ar": "فيلا رائعة في أكادير بإطلالة على المحيط. مثالية للعطلات العائلية.", "en": "Magnificent villa in Agadir with ocean view. Perfect for family vacations.", "es": "Villa magnífica en Agadir con vista al océano. Perfecta para vacaciones familiares."}',
  'Agadir',
  true,
  true
),
(
  'Fatima Zahra',
  4,
  '{"fr": "Studio tres bien equipe au centre de Rabat. Emplacement ideal pour visiter la ville.", "ar": "استوديو مجهز تجهيزاً جيداً في وسط الرباط. موقع مثالي لزيارة المدينة.", "en": "Very well equipped studio in the center of Rabat. Ideal location to visit the city.", "es": "Estudio muy bien equipado en el centro de Rabat. Ubicación ideal para visitar la ciudad."}',
  'Rabat',
  true,
  true
),
(
  'Carlos Rodriguez',
  5,
  '{"fr": "Riad authentique dans la medina de Tanger. Vue imprenable sur le detroit.", "ar": "رياد أصيل في مدينة طنجة القديمة. إطلالة رائعة على المضيق.", "en": "Authentic riad in the medina of Tangier. Breathtaking view of the strait.", "es": "Riad auténtico en la medina de Tánger. Vista impresionante del estrecho."}',
  'Tanger',
  true,
  true
),
(
  'Emma Wilson',
  4,
  '{"fr": "Charmant appartement a Essaouira, proche de la plage et du port. Tres calme.", "ar": "شقة ساحرة في الصويرة، قريبة من الشاطئ والميناء. هادئة جداً.", "en": "Charming apartment in Essaouira, close to the beach and port. Very quiet.", "es": "Apartamento encantador en Essaouira, cerca de la playa y el puerto. Muy tranquilo."}',
  'Essaouira',
  true,
  true
),
(
  'Mohammed Benali',
  5,
  '{"fr": "Service client exceptionnel. L appartement etait exactement comme decrit.", "ar": "خدمة عملاء استثنائية. الشقة كانت تماماً كما هو موصوف.", "en": "Exceptional customer service. The apartment was exactly as described.", "es": "Servicio al cliente excepcional. El apartamento era exactamente como se describió."}',
  'Marrakech',
  true,
  true
),
(
  'Isabella Silva',
  4,
  '{"fr": "Belle villa avec piscine a Casablanca. Parfait pour un sejour de luxe.", "ar": "فيلا جميلة مع مسبح في الدار البيضاء. مثالية لإقامة فاخرة.", "en": "Beautiful villa with pool in Casablanca. Perfect for a luxury stay.", "es": "Hermosa villa con piscina en Casablanca. Perfecta para una estancia de lujo."}',
  'Casablanca',
  true,
  true
),
(
  'Pierre Dubois',
  5,
  '{"fr": "Experience unique dans la medina de Fes. Le riad etait magnifique.", "ar": "تجربة فريدة في مدينة فاس القديمة. الرياد كان رائعاً.", "en": "Unique experience in the medina of Fes. The riad was magnificent.", "es": "Experiencia única en la medina de Fez. El riad era magnífico."}',
  'Fès',
  true,
  true
),
(
  'Amina El Fassi',
  4,
  '{"fr": "Appartement moderne et confortable a Rabat. Tres bien situe.", "ar": "شقة حديثة ومريحة في الرباط. موقعها جيد جداً.", "en": "Modern and comfortable apartment in Rabat. Very well located.", "es": "Apartamento moderno y cómodo en Rabat. Muy bien ubicado."}',
  'Rabat',
  true,
  true
),
(
  'Thomas Anderson',
  5,
  '{"fr": "Vue spectaculaire sur l ocean depuis la villa d Agadir. Memorable.", "ar": "إطلالة مذهلة على المحيط من فيلا أكادير. لا تُنسى.", "en": "Spectacular ocean view from the Agadir villa. Memorable.", "es": "Vista espectacular del océano desde la villa de Agadir. Inolvidable."}',
  'Agadir',
  true,
  true
),
(
  'Layla Hassan',
  4,
  '{"fr": "Studio parfait pour un couple a Tanger. Vue sur la mer.", "ar": "استوديو مثالي للزوجين في طنجة. إطلالة على البحر.", "en": "Perfect studio for a couple in Tangier. Sea view.", "es": "Estudio perfecto para una pareja en Tánger. Vista al mar."}',
  'Tanger',
  true,
  true
),
(
  'David Thompson',
  5,
  '{"fr": "Essaouira est une ville magique. L appartement etait parfait.", "ar": "الصويرة مدينة سحرية. الشقة كانت مثالية.", "en": "Essaouira is a magical city. The apartment was perfect.", "es": "Essaouira es una ciudad mágica. El apartamento era perfecto."}',
  'Essaouira',
  true,
  true
),
(
  'Nadia Benslimane',
  4,
  '{"fr": "Excellent rapport qualite-prix a Casablanca. Tres satisfaite.", "ar": "نسبة سعر ممتازة في الدار البيضاء. راضية جداً.", "en": "Excellent value for money in Casablanca. Very satisfied.", "es": "Excelente relación calidad-precio en Casablanca. Muy satisfecha."}',
  'Casablanca',
  true,
  true
),
(
  'Robert Chen',
  5,
  '{"fr": "Service impeccable et appartement de qualite a Marrakech.", "ar": "خدمة لا تشوبها شائبة وشقة عالية الجودة في مراكش.", "en": "Impeccable service and quality apartment in Marrakech.", "es": "Servicio impecable y apartamento de calidad en Marrakech."}',
  'Marrakech',
  true,
  true
);

-- Blog posts data
INSERT INTO blog_posts (title, excerpt, content, slug, author, featured_image, category, is_published) VALUES
(
  '{"fr": "Les 10 meilleurs endroits a visiter a Marrakech", "ar": "أفضل 10 أماكن للزيارة في مراكش", "en": "Top 10 places to visit in Marrakech", "es": "Los 10 mejores lugares para visitar en Marrakech"}',
  '{"fr": "Decouvrez les incontournables de la ville rouge, de la Medina aux jardins Majorelle.", "ar": "اكتشف المعالم الأساسية للمدينة الحمراء، من المدينة القديمة إلى حدائق ماجوريل.", "en": "Discover the must-sees of the red city, from the Medina to the Majorelle gardens.", "es": "Descubre los imprescindibles de la ciudad roja, desde la Medina hasta los jardines Majorelle."}',
  '{"fr": "Marrakech, la perle du sud, offre une experience unique...", "ar": "مراكش، جوهرة الجنوب، تقدم تجربة فريدة...", "en": "Marrakech, the pearl of the south, offers a unique experience...", "es": "Marrakech, la perla del sur, ofrece una experiencia única..."}',
  'top-10-marrakech',
  'Equipe Babna.ma',
  'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
  'travel',
  true
),
(
  '{"fr": "Guide complet pour visiter Fes", "ar": "دليل شامل لزيارة فاس", "en": "Complete guide to visit Fes", "es": "Guía completa para visitar Fez"}',
  '{"fr": "Explorez la plus ancienne medina du monde et decouvrez ses secrets.", "ar": "استكشف أقدم مدينة في العالم واكتشف أسرارها.", "en": "Explore the oldest medina in the world and discover its secrets.", "es": "Explora la medina más antigua del mundo y descubre sus secretos."}',
  '{"fr": "Fes, capitale spirituelle du Maroc, vous accueille...", "ar": "فاس، العاصمة الروحية للمغرب، ترحب بك...", "en": "Fes, the spiritual capital of Morocco, welcomes you...", "es": "Fez, la capital espiritual de Marruecos, te da la bienvenida..."}',
  'guide-fes',
  'Equipe Babna.ma',
  'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
  'culture',
  true
);

-- Travel guides data
INSERT INTO travel_guides (city_slug, title, description, content, featured_image, author, is_published) VALUES
(
  'marrakech',
  '{"fr": "Guide complet de Marrakech", "ar": "دليل شامل لمراكش", "en": "Complete guide to Marrakech", "es": "Guía completa de Marrakech"}',
  '{"fr": "Decouvrez tous les secrets de la ville rouge", "ar": "اكتشف جميع أسرار المدينة الحمراء", "en": "Discover all the secrets of the red city", "es": "Descubre todos los secretos de la ciudad roja"}',
  '{"fr": "Marrakech est une ville fascinante...", "ar": "مراكش مدينة رائعة...", "en": "Marrakech is a fascinating city...", "es": "Marrakech es una ciudad fascinante..."}',
  'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
  'Equipe Babna.ma',
  true
),
(
  'fes',
  '{"fr": "Guide complet de Fes", "ar": "دليل شامل لفاس", "en": "Complete guide to Fes", "es": "Guía completa de Fez"}',
  '{"fr": "Explorez la capitale spirituelle du Maroc", "ar": "استكشف العاصمة الروحية للمغرب", "en": "Explore the spiritual capital of Morocco", "es": "Explora la capital espiritual de Marruecos"}',
  '{"fr": "Fes est la plus ancienne ville imperiale...", "ar": "فاس هي أقدم مدينة إمبراطورية...", "en": "Fes is the oldest imperial city...", "es": "Fez es la ciudad imperial más antigua..."}',
  'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
  'Equipe Babna.ma',
  true
);

-- Insert sample properties for each city
-- First, create a test user for properties
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES
('d4f1c300-657c-4445-a539-0a7abf2cf27b', 'owner@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert user profile
INSERT INTO public.users (id, email, name, role, created_at, updated_at) VALUES
('d4f1c300-657c-4445-a539-0a7abf2cf27b', 'owner@example.com', 'Propriétaire Test', 'owner', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Marrakech Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Riad traditionnel dans la Médina', 'Magnifique riad traditionnel au cœur de la médina de Marrakech, avec patio et terrasse panoramique.', 1200, 'Marrakech', '123 Rue des Tanneurs, Médina', 31.6295, -7.9811, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Climatisation', 'Terrasse', 'Hammam'], 3, 2, 6, 'riad', true, NOW(), NOW()),
('Appartement moderne près de la Koutoubia', 'Appartement moderne avec vue sur la mosquée Koutoubia, proche de tous les commerces.', 800, 'Marrakech', '456 Avenue Mohammed V, Gueliz', 31.6245, -7.9891, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Balcon', 'Parking'], 2, 1, 4, 'apartment', true, NOW(), NOW()),
('Villa avec piscine à Palmeraie', 'Luxueuse villa avec piscine privée dans la Palmeraie de Marrakech.', 2000, 'Marrakech', '789 Route de la Palmeraie', 31.6395, -7.9711, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['Piscine', 'WiFi', 'Jardin', 'Climatisation', 'Cuisine équipée'], 4, 3, 8, 'villa', true, NOW(), NOW());

-- Casablanca Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Appartement de luxe à Ain Diab', 'Appartement de luxe avec vue sur l''océan Atlantique, dans le quartier chic d''Ain Diab.', 1500, 'Casablanca', '123 Boulevard de la Corniche, Ain Diab', 33.5731, -7.5898, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Gym', 'Conciergerie', 'Piscine', 'Parking'], 3, 2, 6, 'apartment', true, NOW(), NOW()),
('Studio moderne au centre-ville', 'Studio moderne et fonctionnel au cœur du centre-ville de Casablanca.', 600, 'Casablanca', '456 Boulevard Mohammed V, Centre', 33.5831, -7.5998, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Climatisation'], 1, 1, 2, 'studio', true, NOW(), NOW()),
('Appartement familial à Maarif', 'Grand appartement familial dans le quartier résidentiel de Maarif.', 1000, 'Casablanca', '789 Rue de la Liberté, Maarif', 33.5931, -7.6098, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Balcon', 'Parking'], 3, 2, 6, 'apartment', true, NOW(), NOW());

-- Fès Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Riad authentique dans la Médina', 'Authentique riad marocain dans la médina de Fès, avec patio traditionnel.', 1000, 'Fès', '123 Rue des Tanneurs, Médina', 34.0181, -5.0078, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Jardin', 'Hammam', 'Terrasse'], 4, 3, 8, 'riad', true, NOW(), NOW()),
('Appartement moderne à Fès Jdid', 'Appartement moderne dans le quartier de Fès Jdid, proche de la médina.', 700, 'Fès', '456 Avenue Hassan II, Fès Jdid', 34.0281, -4.9978, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Climatisation', 'Balcon'], 2, 1, 4, 'apartment', true, NOW(), NOW()),
('Maison traditionnelle à Batha', 'Maison traditionnelle marocaine dans le quartier de Batha.', 900, 'Fès', '789 Rue Batha, Médina', 34.0381, -4.9878, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Jardin', 'Terrasse', 'Cuisine traditionnelle'], 3, 2, 6, 'riad', true, NOW(), NOW());

-- Rabat Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Appartement moderne au centre de Rabat', 'Magnifique appartement moderne au cœur de Rabat, proche de tous les commerces et transports.', 800, 'Rabat', '123 Avenue Mohammed V, Centre', 34.0209, -6.8416, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Balcon', 'Parking'], 2, 1, 4, 'apartment', true, NOW(), NOW()),
('Studio à Agdal', 'Studio moderne et confortable dans le quartier d''Agdal.', 500, 'Rabat', '456 Rue Agdal, Agdal', 34.0309, -6.8316, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Climatisation'], 1, 1, 2, 'studio', true, NOW(), NOW()),
('Villa avec jardin à Souissi', 'Belle villa avec jardin dans le quartier résidentiel de Souissi.', 1500, 'Rabat', '789 Avenue Souissi, Souissi', 34.0409, -6.8216, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Jardin', 'Cuisine équipée', 'Parking', 'Climatisation'], 4, 3, 8, 'villa', true, NOW(), NOW());

-- Agadir Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Villa avec piscine à Taghazout', 'Magnifique villa avec piscine privée, vue sur l''océan Atlantique à Taghazout.', 2000, 'Agadir', '123 Route de Taghazout', 30.4278, -9.5981, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['Piscine', 'WiFi', 'Jardin', 'Parking', 'Cuisine équipée'], 5, 4, 10, 'villa', true, NOW(), NOW()),
('Appartement moderne à la Corniche', 'Appartement moderne avec vue sur la plage d''Agadir.', 1200, 'Agadir', '456 Boulevard de la Corniche', 30.4178, -9.5881, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Balcon', 'Cuisine équipée', 'Climatisation'], 3, 2, 6, 'apartment', true, NOW(), NOW()),
('Studio au centre-ville', 'Studio confortable au centre-ville d''Agadir, proche de tous les commerces.', 600, 'Agadir', '789 Rue du Centre', 30.4078, -9.5781, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Climatisation'], 1, 1, 2, 'studio', true, NOW(), NOW());

-- Tanger Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Appartement avec vue sur le détroit', 'Appartement avec vue panoramique sur le détroit de Gibraltar.', 1000, 'Tanger', '123 Avenue d''Espagne', 35.7595, -5.8340, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Balcon', 'Cuisine équipée', 'Climatisation'], 2, 1, 4, 'apartment', true, NOW(), NOW()),
('Riad dans la Kasbah', 'Authentique riad dans la Kasbah de Tanger avec vue sur la mer.', 1500, 'Tanger', '456 Rue de la Kasbah', 35.7695, -5.8240, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Terrasse', 'Jardin', 'Hammam'], 4, 3, 8, 'riad', true, NOW(), NOW()),
('Studio moderne à Malabata', 'Studio moderne dans le quartier de Malabata, proche de la plage.', 700, 'Tanger', '789 Route de Malabata', 35.7795, -5.8140, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Cuisine équipée', 'Climatisation', 'Balcon'], 1, 1, 2, 'studio', true, NOW(), NOW());

-- Essaouira Properties
INSERT INTO public.properties (title, description, price, city, address, lat, lng, owner_id, images, amenities, bedrooms, bathrooms, max_guests, property_type, is_approved, created_at, updated_at) VALUES
('Riad dans la Médina', 'Charmant riad dans la médina d''Essaouira, proche de la plage.', 900, 'Essaouira', '123 Rue de la Médina', 31.5085, -9.7595, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Terrasse', 'Jardin', 'Cuisine équipée'], 3, 2, 6, 'riad', true, NOW(), NOW()),
('Appartement avec vue sur le port', 'Appartement avec vue sur le port d''Essaouira et les îles Mogador.', 800, 'Essaouira', '456 Rue du Port', 31.5185, -9.7495, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Balcon', 'Cuisine équipée', 'Climatisation'], 2, 1, 4, 'apartment', true, NOW(), NOW()),
('Villa à la plage', 'Villa moderne à proximité de la plage d''Essaouira.', 1200, 'Essaouira', '789 Route de la Plage', 31.5285, -9.7395, 'd4f1c300-657c-4445-a539-0a7abf2cf27b', ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], ARRAY['WiFi', 'Jardin', 'Terrasse', 'Cuisine équipée', 'Parking'], 4, 3, 8, 'villa', true, NOW(), NOW());
