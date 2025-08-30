const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase Cloud
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NzI1MSwiZXhwIjoyMDcyMTIzMjUxfQ.nv4uJQfZIIc60vaH2ERCmh449kSVJwyM-ryI5VtE6Jc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedBlogPosts() {
  console.log('📝 Ajout d\'articles de blog très demandés au Maroc...');

  try {
    const blogPosts = [
      {
        title: {
          fr: "Les 10 Meilleurs Riads de Marrakech en 2024",
          ar: "أفضل 10 رياض في مراكش لعام 2024",
          en: "Top 10 Riads in Marrakech 2024",
          es: "Top 10 Riads en Marrakech 2024"
        },
        excerpt: {
          fr: "Découvrez les plus beaux riads traditionnels de Marrakech pour un séjour authentique et luxueux.",
          ar: "اكتشف أجمل الرياض التقليدية في مراكش لإقامة أصيلة وفاخرة.",
          en: "Discover the most beautiful traditional riads in Marrakech for an authentic and luxurious stay.",
          es: "Descubre los riads tradicionales más hermosos de Marrakech para una estancia auténtica y lujosa."
        },
        content: {
          fr: "Marrakech, la perle du Sud, regorge de riads magnifiques qui offrent une expérience unique. Ces maisons traditionnelles marocaines, organisées autour d'un patio central, sont de véritables havres de paix au cœur de la médina animée. Dans cet article, nous vous présentons les 10 meilleurs riads de Marrakech pour 2024, sélectionnés pour leur authenticité, leur service exceptionnel et leur charme unique.",
          ar: "مراكش، جوهرة الجنوب، تزخر بالرياض الجميلة التي توفر تجربة فريدة. هذه المنازل التقليدية المغربية، المنظمة حول فناء مركزي، هي ملاذات حقيقية للسلام في قلب المدينة القديمة النابضة بالحياة. في هذه المقالة، نقدم لكم أفضل 10 رياض في مراكش لعام 2024، مختارة لأصالتها وخدمتها الاستثنائية وسحرها الفريد.",
          en: "Marrakech, the pearl of the South, is full of magnificent riads that offer a unique experience. These traditional Moroccan houses, organized around a central patio, are true havens of peace in the heart of the bustling medina. In this article, we present you with the 10 best riads in Marrakech for 2024, selected for their authenticity, exceptional service and unique charm.",
          es: "Marrakech, la perla del Sur, está llena de magníficos riads que ofrecen una experiencia única. Estas casas tradicionales marroquíes, organizadas alrededor de un patio central, son verdaderos refugios de paz en el corazón de la bulliciosa medina. En este artículo, te presentamos los 10 mejores riads de Marrakech para 2024, seleccionados por su autenticidad, servicio excepcional y encanto único."
        },
        featured_image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        category: "hébergement",
        meta_title: {
          fr: "Top 10 Riads Marrakech 2024 - Les Meilleurs Hébergements",
          ar: "أفضل 10 رياض مراكش 2024 - أفضل الإقامات",
          en: "Top 10 Riads Marrakech 2024 - Best Accommodations",
          es: "Top 10 Riads Marrakech 2024 - Mejores Alojamientos"
        },
        meta_description: {
          fr: "Découvrez les 10 meilleurs riads de Marrakech pour 2024. Hébergements authentiques et luxueux au cœur de la médina.",
          ar: "اكتشف أفضل 10 رياض في مراكش لعام 2024. إقامات أصيلة وفاخرة في قلب المدينة القديمة.",
          en: "Discover the 10 best riads in Marrakech for 2024. Authentic and luxurious accommodations in the heart of the medina.",
          es: "Descubre los 10 mejores riads de Marrakech para 2024. Alojamientos auténticos y lujosos en el corazón de la medina."
        },
        keywords: {
          fr: "riad marrakech, hébergement marrakech, médina marrakech, séjour maroc",
          ar: "رياض مراكش، إقامة مراكش، المدينة القديمة مراكش، إقامة المغرب",
          en: "riad marrakech, accommodation marrakech, medina marrakech, morocco stay",
          es: "riad marrakech, alojamiento marrakech, medina marrakech, estancia marruecos"
        },
        is_published: true,
        published_at: new Date().toISOString()
      },
      {
        title: {
          fr: "Guide Complet : Que Faire à Chefchaouen en 2 Jours",
          ar: "دليل شامل: ماذا تفعل في شفشاون في يومين",
          en: "Complete Guide: What to Do in Chefchaouen in 2 Days",
          es: "Guía Completa: Qué Hacer en Chefchaouen en 2 Días"
        },
        excerpt: {
          fr: "Planifiez votre séjour parfait dans la ville bleue du Maroc avec notre guide détaillé.",
          ar: "خطط إقامتك المثالية في المدينة الزرقاء بالمغرب مع دليلنا المفصل.",
          en: "Plan your perfect stay in Morocco's blue city with our detailed guide.",
          es: "Planifica tu estancia perfecta en la ciudad azul de Marruecos con nuestra guía detallada."
        },
        content: {
          fr: "Chefchaouen, la perle bleue du Rif, est l'une des destinations les plus photogéniques du Maroc. Cette ville pittoresque, avec ses rues peintes en bleu et son ambiance sereine, attire des visiteurs du monde entier. Notre guide vous accompagne pour découvrir les meilleurs spots, les restaurants authentiques et les activités incontournables en seulement 2 jours.",
          ar: "شفشاون، اللؤلؤة الزرقاء للريف، هي واحدة من أكثر الوجهات جاذبية للتصوير في المغرب. هذه المدينة الخلابة، بشوارعها المطلية بالأزرق وأجوائها الهادئة، تجذب زواراً من جميع أنحاء العالم. دليلنا يرافقك لاكتشاف أفضل الأماكن والمطاعم الأصيلة والأنشطة الضرورية في يومين فقط.",
          en: "Chefchaouen, the blue pearl of the Rif, is one of Morocco's most photogenic destinations. This picturesque city, with its blue-painted streets and serene atmosphere, attracts visitors from around the world. Our guide accompanies you to discover the best spots, authentic restaurants and must-do activities in just 2 days.",
          es: "Chefchaouen, la perla azul del Rif, es uno de los destinos más fotogénicos de Marruecos. Esta pintoresca ciudad, con sus calles pintadas de azul y su atmósfera serena, atrae a visitantes de todo el mundo. Nuestra guía te acompaña para descubrir los mejores lugares, restaurantes auténticos y actividades imprescindibles en solo 2 días."
        },
        featured_image: "https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800",
        category: "voyage",
        is_published: true,
        published_at: new Date().toISOString()
      },
      {
        title: {
          fr: "Les Secrets de la Cuisine Marocaine : Recettes Authentiques",
          ar: "أسرار المطبخ المغربي: وصفات أصيلة",
          en: "Secrets of Moroccan Cuisine: Authentic Recipes",
          es: "Secretos de la Cocina Marroquí: Recetas Auténticas"
        },
        excerpt: {
          fr: "Plongez dans l'art culinaire marocain avec nos recettes traditionnelles et conseils d'experts.",
          ar: "انغمس في فن الطبخ المغربي مع وصفاتنا التقليدية ونصائح الخبراء.",
          en: "Dive into Moroccan culinary art with our traditional recipes and expert tips.",
          es: "Sumérgete en el arte culinario marroquí con nuestras recetas tradicionales y consejos de expertos."
        },
        content: {
          fr: "La cuisine marocaine est reconnue mondialement pour sa richesse, ses saveurs uniques et ses techniques traditionnelles. Du couscous royal au tajine en passant par la pastilla, chaque plat raconte une histoire. Dans cet article, nous partageons avec vous les secrets de la cuisine marocaine authentique, avec des recettes détaillées et des conseils pour réussir vos plats préférés.",
          ar: "المطبخ المغربي معترف به عالمياً لغناه ونكهاته الفريدة وتقنياته التقليدية. من الكسكس الملكي إلى الطاجين مروراً بالبسطيلة، كل طبق يحكي قصة. في هذه المقالة، نشارك معكم أسرار المطبخ المغربي الأصيل، مع وصفات مفصلة ونصائح لنجاح أطباقكم المفضلة.",
          en: "Moroccan cuisine is world-renowned for its richness, unique flavors and traditional techniques. From royal couscous to tajine and pastilla, each dish tells a story. In this article, we share with you the secrets of authentic Moroccan cuisine, with detailed recipes and tips to succeed with your favorite dishes.",
          es: "La cocina marroquí es mundialmente reconocida por su riqueza, sabores únicos y técnicas tradicionales. Desde el cuscús real hasta el tajín y la pastilla, cada plato cuenta una historia. En este artículo, compartimos contigo los secretos de la cocina marroquí auténtica, con recetas detalladas y consejos para triunfar con tus platos favoritos."
        },
        featured_image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        category: "cuisine",
        is_published: true,
        published_at: new Date().toISOString()
      },
      {
        title: {
          fr: "Sahara Marocain : Guide du Désert de Merzouga",
          ar: "الصحراء المغربية: دليل صحراء مرزوكة",
          en: "Moroccan Sahara: Merzouga Desert Guide",
          es: "Sahara Marroquí: Guía del Desierto de Merzouga"
        },
        excerpt: {
          fr: "Découvrez les dunes dorées du Sahara et vivez une aventure inoubliable dans le désert marocain.",
          ar: "اكتشف الكثبان الذهبية للصحراء وعش مغامرة لا تنسى في الصحراء المغربية.",
          en: "Discover the golden dunes of the Sahara and experience an unforgettable adventure in the Moroccan desert.",
          es: "Descubre las dunas doradas del Sáhara y vive una aventura inolvidable en el desierto marroquí."
        },
        content: {
          fr: "Le désert de Merzouga, avec ses dunes de sable doré qui s'étendent à perte de vue, offre une expérience unique au cœur du Sahara marocain. Que vous souhaitiez faire une excursion d'une journée ou un trek de plusieurs jours, ce guide vous accompagne pour planifier votre aventure dans le désert. Découvrez les meilleurs campements, les activités à ne pas manquer et nos conseils pour un séjour mémorable.",
          ar: "صحراء مرزوكة، بكثبانها الرملية الذهبية الممتدة إلى ما لا نهاية، توفر تجربة فريدة في قلب الصحراء المغربية. سواء كنت ترغب في رحلة ليوم واحد أو رحلة استكشافية لعدة أيام، هذا الدليل يرافقك لتخطيط مغامرتك في الصحراء. اكتشف أفضل المخيمات والأنشطة التي لا يجب تفويتها ونصائحنا لإقامة لا تنسى.",
          en: "The Merzouga desert, with its golden sand dunes stretching as far as the eye can see, offers a unique experience in the heart of the Moroccan Sahara. Whether you want to take a day trip or a multi-day trek, this guide accompanies you to plan your desert adventure. Discover the best campsites, must-do activities and our tips for a memorable stay.",
          es: "El desierto de Merzouga, con sus dunas de arena dorada que se extienden hasta donde alcanza la vista, ofrece una experiencia única en el corazón del Sáhara marroquí. Ya sea que quieras hacer una excursión de un día o un trek de varios días, esta guía te acompaña para planificar tu aventura en el desierto. Descubre los mejores campamentos, actividades imprescindibles y nuestros consejos para una estancia memorable."
        },
        featured_image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        category: "aventure",
        is_published: true,
        published_at: new Date().toISOString()
      },
      {
        title: {
          fr: "Fès : La Plus Ancienne Médina du Monde",
          ar: "فاس: أقدم مدينة في العالم",
          en: "Fez: The Oldest Medina in the World",
          es: "Fez: La Medina Más Antigua del Mundo"
        },
        excerpt: {
          fr: "Explorez la médina millénaire de Fès, classée au patrimoine mondial de l'UNESCO.",
          ar: "استكشف المدينة القديمة الألفية لفاس، المصنفة في التراث العالمي لليونسكو.",
          en: "Explore the thousand-year-old medina of Fez, classified as a UNESCO World Heritage site.",
          es: "Explora la medina milenaria de Fez, clasificada como Patrimonio Mundial de la UNESCO."
        },
        content: {
          fr: "Fès el-Bali, la médina historique de Fès, est considérée comme la plus grande zone piétonne urbaine au monde et l'une des plus anciennes médinas encore habitées. Avec ses 9 000 ruelles, ses souks traditionnels et ses monuments historiques, Fès offre un voyage dans le temps unique. Découvrez les tanneries traditionnelles, l'université Al Quaraouiyine et les secrets de cette ville fascinante.",
          ar: "فاس البالي، المدينة التاريخية لفاس، تعتبر أكبر منطقة حضرية للمشاة في العالم وواحدة من أقدم المدن المأهولة. مع 9000 زقاق وأسواقها التقليدية ومعالمها التاريخية، فاس توفر رحلة فريدة عبر الزمن. اكتشف المدابغ التقليدية وجامعة القرويين وأسرار هذه المدينة الساحرة.",
          en: "Fez el-Bali, the historic medina of Fez, is considered the largest urban pedestrian area in the world and one of the oldest inhabited medinas. With its 9,000 alleys, traditional souks and historic monuments, Fez offers a unique journey through time. Discover the traditional tanneries, Al Quaraouiyine University and the secrets of this fascinating city.",
          es: "Fez el-Bali, la medina histórica de Fez, se considera la zona peatonal urbana más grande del mundo y una de las medinas habitadas más antiguas. Con sus 9.000 callejones, zocos tradicionales y monumentos históricos, Fez ofrece un viaje único a través del tiempo. Descubre las curtidurías tradicionales, la Universidad Al Quaraouiyine y los secretos de esta fascinante ciudad."
        },
        featured_image: "https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800",
        category: "culture",
        is_published: true,
        published_at: new Date().toISOString()
      }
    ];

    // Ajouter les 15 autres articles
    const additionalPosts = [
      {
        title: { fr: "Agadir : Guide des Plages et Activités", ar: "أكادير: دليل الشواطئ والأنشطة", en: "Agadir: Beach and Activities Guide", es: "Agadir: Guía de Playas y Actividades" },
        excerpt: { fr: "Découvrez les plus belles plages d'Agadir et les activités nautiques.", ar: "اكتشف أجمل شواطئ أكادير والأنشطة المائية.", en: "Discover Agadir's most beautiful beaches and water activities.", es: "Descubre las playas más hermosas de Agadir y las actividades acuáticas." },
        category: "plage",
        is_published: true
      },
      {
        title: { fr: "Tanger : Porte de l'Afrique", ar: "طنجة: بوابة إفريقيا", en: "Tangier: Gateway to Africa", es: "Tánger: Puerta de África" },
        excerpt: { fr: "Explorez Tanger, ville cosmopolite au carrefour de l'Europe et de l'Afrique.", ar: "استكشف طنجة، المدينة العالمية في مفترق طرق أوروبا وإفريقيا.", en: "Explore Tangier, cosmopolitan city at the crossroads of Europe and Africa.", es: "Explora Tánger, ciudad cosmopolita en el cruce de Europa y África." },
        category: "ville",
        is_published: true
      },
      {
        title: { fr: "Essaouira : La Perle de l'Atlantique", ar: "الصويرة: لؤلؤة الأطلسي", en: "Essaouira: The Pearl of the Atlantic", es: "Essaouira: La Perla del Atlántico" },
        excerpt: { fr: "Découvrez Essaouira, ville côtière au charme unique.", ar: "اكتشف الصويرة، المدينة الساحلية بسحر فريد.", en: "Discover Essaouira, coastal city with unique charm.", es: "Descubre Essaouira, ciudad costera con encanto único." },
        category: "côte",
        is_published: true
      },
      {
        title: { fr: "Les Souks de Marrakech : Guide d'Achat", ar: "أسواق مراكش: دليل التسوق", en: "Marrakech Souks: Shopping Guide", es: "Zocos de Marrakech: Guía de Compras" },
        excerpt: { fr: "Maîtrisez l'art du marchandage dans les souks de Marrakech.", ar: "أتقن فن المساومة في أسواق مراكش.", en: "Master the art of haggling in Marrakech's souks.", es: "Domina el arte del regateo en los zocos de Marrakech." },
        category: "shopping",
        is_published: true
      },
      {
        title: { fr: "Hammams Traditionnels du Maroc", ar: "الحمامات التقليدية المغربية", en: "Traditional Moroccan Hammams", es: "Hammams Tradicionales de Marruecos" },
        excerpt: { fr: "Découvrez l'art du hammam et ses bienfaits pour la santé.", ar: "اكتشف فن الحمام وفوائده الصحية.", en: "Discover the art of hammam and its health benefits.", es: "Descubre el arte del hammam y sus beneficios para la salud." },
        category: "bien-être",
        is_published: true
      },
      {
        title: { fr: "Festivals et Événements au Maroc", ar: "المهرجانات والفعاليات في المغرب", en: "Festivals and Events in Morocco", es: "Festivales y Eventos en Marruecos" },
        excerpt: { fr: "Calendrier des festivals culturels et événements à ne pas manquer.", ar: "تقويم المهرجانات الثقافية والفعاليات التي لا يجب تفويتها.", en: "Calendar of cultural festivals and must-see events.", es: "Calendario de festivales culturales y eventos imprescindibles." },
        category: "culture",
        is_published: true
      },
      {
        title: { fr: "Randonnées dans l'Atlas", ar: "المشي في الأطلس", en: "Hiking in the Atlas", es: "Senderismo en el Atlas" },
        excerpt: { fr: "Les meilleurs sentiers de randonnée dans les montagnes de l'Atlas.", ar: "أفضل مسارات المشي في جبال الأطلس.", en: "The best hiking trails in the Atlas Mountains.", es: "Los mejores senderos de montaña en las montañas del Atlas." },
        category: "randonnée",
        is_published: true
      },
      {
        title: { fr: "Artisanat Marocain : Guide Complet", ar: "الحرف اليدوية المغربية: دليل شامل", en: "Moroccan Crafts: Complete Guide", es: "Artesanía Marroquí: Guía Completa" },
        excerpt: { fr: "Découvrez les métiers traditionnels et l'artisanat marocain.", ar: "اكتشف المهن التقليدية والحرف اليدوية المغربية.", en: "Discover traditional trades and Moroccan crafts.", es: "Descubre los oficios tradicionales y la artesanía marroquí." },
        category: "artisanat",
        is_published: true
      },
      {
        title: { fr: "Thé à la Menthe : Rituel Marocain", ar: "الشاي بالنعناع: طقس مغربي", en: "Mint Tea: Moroccan Ritual", es: "Té de Menta: Ritual Marroquí" },
        excerpt: { fr: "L'art de préparer et déguster le thé à la menthe marocain.", ar: "فن تحضير وتذوق الشاي بالنعناع المغربي.", en: "The art of preparing and tasting Moroccan mint tea.", es: "El arte de preparar y degustar el té de menta marroquí." },
        category: "cuisine",
        is_published: true
      },
      {
        title: { fr: "Médinas du Maroc : Patrimoine UNESCO", ar: "مدن المغرب: تراث اليونسكو", en: "Moroccan Medinas: UNESCO Heritage", es: "Medinas de Marruecos: Patrimonio UNESCO" },
        excerpt: { fr: "Les médinas classées au patrimoine mondial de l'UNESCO.", ar: "المدن المصنفة في التراث العالمي لليونسكو.", en: "Medinas classified as UNESCO World Heritage.", es: "Medinas clasificadas como Patrimonio Mundial de la UNESCO." },
        category: "patrimoine",
        is_published: true
      },
      {
        title: { fr: "Surf au Maroc : Meilleurs Spots", ar: "ركوب الأمواج في المغرب: أفضل الأماكن", en: "Surfing in Morocco: Best Spots", es: "Surf en Marruecos: Mejores Spots" },
        excerpt: { fr: "Les meilleurs spots de surf de la côte atlantique marocaine.", ar: "أفضل أماكن ركوب الأمواج في الساحل الأطلسي المغربي.", en: "The best surf spots on the Moroccan Atlantic coast.", es: "Los mejores spots de surf en la costa atlántica marroquí." },
        category: "sport",
        is_published: true
      },
      {
        title: { fr: "Architecture Marocaine : Traditions", ar: "العمارة المغربية: التقاليد", en: "Moroccan Architecture: Traditions", es: "Arquitectura Marroquí: Tradiciones" },
        excerpt: { fr: "Découvrez les styles architecturaux traditionnels du Maroc.", ar: "اكتشف الأنماط المعمارية التقليدية للمغرب.", en: "Discover traditional architectural styles of Morocco.", es: "Descubre los estilos arquitectónicos tradicionales de Marruecos." },
        category: "architecture",
        is_published: true
      },
      {
        title: { fr: "Météo au Maroc : Quand Partir", ar: "الطقس في المغرب: متى تذهب", en: "Weather in Morocco: When to Go", es: "Clima en Marruecos: Cuándo Ir" },
        excerpt: { fr: "Guide climatique pour planifier votre voyage au Maroc.", ar: "دليل مناخي لتخطيط رحلتك إلى المغرب.", en: "Climate guide to plan your trip to Morocco.", es: "Guía climática para planificar tu viaje a Marruecos." },
        category: "voyage",
        is_published: true
      },
      {
        title: { fr: "Transport au Maroc : Guide Pratique", ar: "النقل في المغرب: دليل عملي", en: "Transport in Morocco: Practical Guide", es: "Transporte en Marruecos: Guía Práctica" },
        excerpt: { fr: "Comment se déplacer efficacement au Maroc.", ar: "كيفية التنقل بكفاءة في المغرب.", en: "How to get around efficiently in Morocco.", es: "Cómo moverse eficientemente en Marruecos." },
        category: "transport",
        is_published: true
      },
      {
        title: { fr: "Sécurité au Maroc : Conseils Voyageurs", ar: "الأمان في المغرب: نصائح للمسافرين", en: "Safety in Morocco: Traveler Tips", es: "Seguridad en Marruecos: Consejos para Viajeros" },
        excerpt: { fr: "Conseils de sécurité pour un voyage serein au Maroc.", ar: "نصائح الأمان لرحلة هادئة في المغرب.", en: "Safety tips for a peaceful trip to Morocco.", es: "Consejos de seguridad para un viaje tranquilo a Marruecos." },
        category: "sécurité",
        is_published: true
      }
    ];

    // Combiner tous les articles
    const allPosts = [...blogPosts, ...additionalPosts.map(post => ({
      ...post,
      content: post.content || {
        fr: "Article en cours de rédaction...",
        ar: "مقال قيد الكتابة...",
        en: "Article being written...",
        es: "Artículo en proceso de escritura..."
      },
      featured_image: post.featured_image || "https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800",
      published_at: new Date().toISOString()
    }))];

    console.log(`📝 Insertion de ${allPosts.length} articles de blog...`);

    const { data: insertedPosts, error: insertError } = await supabase
      .from('blog_posts')
      .insert(allPosts)
      .select();

    if (insertError) {
      console.log('❌ Erreur insertion articles:', insertError.message);
    } else {
      console.log(`✅ ${insertedPosts.length} articles de blog insérés avec succès`);
    }

    // Vérifier les articles par catégorie
    console.log('📊 Vérification des articles par catégorie...');
    
    const categories = ['hébergement', 'voyage', 'cuisine', 'aventure', 'culture', 'plage', 'ville', 'côte', 'shopping', 'bien-être', 'randonnée', 'artisanat', 'patrimoine', 'sport', 'architecture', 'transport', 'sécurité'];
    
    for (const category of categories) {
      const { data: categoryPosts } = await supabase
        .from('blog_posts')
        .select('count')
        .eq('category', category);
      
      console.log(`- ${category}: ${categoryPosts?.length || 0} articles`);
    }

    console.log('\n🎉 Articles de blog ajoutés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des articles:', error);
  }
}

// Exécuter le script
seedBlogPosts();
