export interface Tag {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
}

export const moroccanTags: Tag[] = [
  // 🕌 Monuments et Mosquées
  {
    id: 'mosquee-hassan-ii',
    name: 'Mosquée Hassan II',
    nameAr: 'مسجد الحسن الثاني',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Plus grande mosquée du Maroc, chef-d\'œuvre architectural sur l\'océan',
    descriptionAr: 'أكبر مسجد في المغرب، تحفة معمارية على المحيط',
    icon: '🕌'
  },
  {
    id: 'mosquee-koutoubia',
    name: 'Mosquée Koutoubia',
    nameAr: 'مسجد الكتبية',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Symbole de Marrakech, minaret du XIIe siècle',
    descriptionAr: 'رمز مراكش، مئذنة من القرن الثاني عشر',
    icon: '🕌'
  },
  {
    id: 'mosquee-tinmal',
    name: 'Mosquée Tinmal',
    nameAr: 'مسجد تينمل',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Mosquée historique dans l\'Atlas, berceau de la dynastie almohade',
    descriptionAr: 'مسجد تاريخي في الأطلس، مهد الدولة الموحدية',
    icon: '🕌'
  },
  {
    id: 'mausolee-mohammed-v',
    name: 'Mausolée Mohammed V',
    nameAr: 'ضريح محمد الخامس',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Tombeau royal à Rabat, architecture traditionnelle marocaine',
    descriptionAr: 'قبر ملكي في الرباط، عمارة مغربية تقليدية',
    icon: '🕌'
  },
  {
    id: 'universite-al-quaraouiyine',
    name: 'Université Al Quaraouiyine',
    nameAr: 'جامعة القرويين',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Plus ancienne université du monde, fondée en 859',
    descriptionAr: 'أقدم جامعة في العالم، تأسست عام 859',
    icon: '🕌'
  },
  {
    id: 'palais-bahia',
    name: 'Palais Bahia',
    nameAr: 'قصر الباهية',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Palais du XIXe siècle, chef-d\'œuvre de l\'architecture marocaine',
    descriptionAr: 'قصر من القرن التاسع عشر، تحفة العمارة المغربية',
    icon: '🕌'
  },
  {
    id: 'palais-el-badi',
    name: 'Palais El Badi',
    nameAr: 'قصر البديع',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Ruines du palais somptueux du sultan Ahmed al-Mansour',
    descriptionAr: 'أطلال القصر الفخم للسلطان أحمد المنصور',
    icon: '🕌'
  },
  {
    id: 'bab-mansour',
    name: 'Bab Mansour',
    nameAr: 'باب المنصور',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Plus belle porte de Meknès, ornée de zelliges',
    descriptionAr: 'أجمل باب في مكناس، مزخرف بالزليج',
    icon: '🕌'
  },
  {
    id: 'kasbah-oudayas',
    name: 'Kasbah des Oudayas',
    nameAr: 'قصبة الأوداية',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Forteresse historique de Rabat, vue sur l\'océan',
    descriptionAr: 'قلعة تاريخية في الرباط، إطلالة على المحيط',
    icon: '🕌'
  },
  {
    id: 'houbous',
    name: 'Houbous / Quartier des Habbous',
    nameAr: 'حي الحبوس',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Quartier traditionnel de Casablanca, architecture hispano-mauresque',
    descriptionAr: 'حي تقليدي في الدار البيضاء، عمارة أندلسية مغربية',
    icon: '🕌'
  },
  {
    id: 'kasbah-taourirt',
    name: 'Kasbah Taourirt',
    nameAr: 'قصبة تاوريرت',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Ancienne résidence du pacha de Marrakech',
    descriptionAr: 'المقر القديم لباشا مراكش',
    icon: '🕌'
  },
  {
    id: 'kasbah-telouet',
    name: 'Kasbah Telouet',
    nameAr: 'قصبة تلوات',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Forteresse des Glaoui dans l\'Atlas',
    descriptionAr: 'قلعة الكلاوي في الأطلس',
    icon: '🕌'
  },
  {
    id: 'mosquee-ben-youssef',
    name: 'Mosquée et Médersa Ben Youssef',
    nameAr: 'مسجد ومدرسة ابن يوسف',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Plus grande médersa du Maroc, architecture somptueuse',
    descriptionAr: 'أكبر مدرسة في المغرب، عمارة فخمة',
    icon: '🕌'
  },
  {
    id: 'mausolee-moulay-idriss',
    name: 'Mausolée Moulay Idriss',
    nameAr: 'ضريح مولاي إدريس',
    category: 'Monuments et Mosquées',
    categoryAr: 'الآثار والمساجد',
    description: 'Tombeau du fondateur de Fès, ville sainte',
    descriptionAr: 'قبر مؤسس فاس، مدينة مقدسة',
    icon: '🕌'
  },

  // 🏛️ Sites historiques et culturels
  {
    id: 'volubilis',
    name: 'Volubilis (ruines romaines)',
    nameAr: 'وليلي (آثار رومانية)',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Site archéologique romain classé UNESCO',
    descriptionAr: 'موقع أثري روماني مصنف تراث عالمي',
    icon: '🏛️'
  },
  {
    id: 'kasbah-ait-ben-haddou',
    name: 'Kasbah Aït Ben Haddou',
    nameAr: 'قصبة آيت بن حدو',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Village fortifié classé UNESCO, décor de films',
    descriptionAr: 'قرية محصنة مصنفة تراث عالمي، موقع تصوير الأفلام',
    icon: '🏛️'
  },
  {
    id: 'gorges-todgha',
    name: 'Gorges du Todgha',
    nameAr: 'مضيق تودغا',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Canyons spectaculaires dans l\'Atlas',
    descriptionAr: 'أخاديد مذهلة في الأطلس',
    icon: '🏛️'
  },
  {
    id: 'gorges-dades',
    name: 'Gorges du Dadès',
    nameAr: 'مضيق دادس',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Route des mille kasbahs, paysages époustouflants',
    descriptionAr: 'طريق الألف قصبة، مناظر خلابة',
    icon: '🏛️'
  },
  {
    id: 'studios-ouarzazate',
    name: 'Studios de cinéma Ouarzazate',
    nameAr: 'استوديوهات السينما ورزازات',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Hollywood du désert, studios de cinéma',
    descriptionAr: 'هوليوود الصحراء، استوديوهات السينما',
    icon: '🏛️'
  },
  {
    id: 'medina-fes',
    name: 'Médina de Fès',
    nameAr: 'مدينة فاس القديمة',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Plus grande zone piétonne au monde, classée UNESCO',
    descriptionAr: 'أكبر منطقة مشاة في العالم، مصنفة تراث عالمي',
    icon: '🏛️'
  },
  {
    id: 'medina-marrakech',
    name: 'Médina de Marrakech',
    nameAr: 'مدينة مراكش القديمة',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Cœur historique de la ville rouge, classée UNESCO',
    descriptionAr: 'القلب التاريخي للمدينة الحمراء، مصنفة تراث عالمي',
    icon: '🏛️'
  },
  {
    id: 'medina-meknes',
    name: 'Médina de Meknès',
    nameAr: 'مدينة مكناس القديمة',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Ville impériale, architecture hispano-mauresque',
    descriptionAr: 'مدينة إمبراطورية، عمارة أندلسية مغربية',
    icon: '🏛️'
  },
  {
    id: 'medina-essaouira',
    name: 'Médina de Essaouira',
    nameAr: 'مدينة الصويرة القديمة',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Cité portugaise fortifiée, classée UNESCO',
    descriptionAr: 'مدينة برتغالية محصنة، مصنفة تراث عالمي',
    icon: '🏛️'
  },
  {
    id: 'grottes-friouato',
    name: 'Grottes de Friouato',
    nameAr: 'مغارات فريواتو',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Plus grandes grottes d\'Afrique du Nord',
    descriptionAr: 'أكبر مغارات شمال إفريقيا',
    icon: '🏛️'
  },
  {
    id: 'ksar-el-khorbat',
    name: 'Ksar El Khorbat',
    nameAr: 'قصر الخربات',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Village fortifié traditionnel du sud',
    descriptionAr: 'قرية محصنة تقليدية من الجنوب',
    icon: '🏛️'
  },
  {
    id: 'ruines-lixus',
    name: 'Ruines romaines de Lixus',
    nameAr: 'الآثار الرومانية ليكسوس',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Ancienne cité romaine près de Larache',
    descriptionAr: 'مدينة رومانية قديمة قرب العرائش',
    icon: '🏛️'
  },
  {
    id: 'ruines-chellah',
    name: 'Ruines de Chellah',
    nameAr: 'آثار شالة',
    category: 'Sites historiques et culturels',
    categoryAr: 'المواقع التاريخية والثقافية',
    description: 'Site archéologique romain et médiéval à Rabat',
    descriptionAr: 'موقع أثري روماني وقرون وسطى في الرباط',
    icon: '🏛️'
  },

  // 🌊 Plages et Côtes
  {
    id: 'plage-agadir',
    name: 'Plage d\'Agadir',
    nameAr: 'شاطئ أكادير',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Plage de sable fin de 10km, station balnéaire moderne',
    descriptionAr: 'شاطئ رملي ناعم بطول 10كم، منتجع ساحلي عصري',
    icon: '🌊'
  },
  {
    id: 'plage-saidia',
    name: 'Plage de Saïdia',
    nameAr: 'شاطئ السعيدية',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Plus belle plage de la Méditerranée marocaine',
    descriptionAr: 'أجمل شاطئ في البحر الأبيض المتوسط المغربي',
    icon: '🌊'
  },
  {
    id: 'port-essaouira',
    name: 'Port d\'Essaouira',
    nameAr: 'ميناء الصويرة',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Port traditionnel, marché aux poissons animé',
    descriptionAr: 'ميناء تقليدي، سوق السمك النابض بالحياة',
    icon: '🌊'
  },
  {
    id: 'grottes-hercule',
    name: 'Grottes d\'Hercule',
    nameAr: 'مغارات هرقل',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Grottes marines près de Tanger, légende d\'Hercule',
    descriptionAr: 'مغارات بحرية قرب طنجة، أسطورة هرقل',
    icon: '🌊'
  },
  {
    id: 'cap-spartel',
    name: 'Cap Spartel',
    nameAr: 'رأس سبارتيل',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Point de rencontre Atlantique-Méditerranée',
    descriptionAr: 'نقطة التقاء الأطلسي والبحر الأبيض المتوسط',
    icon: '🌊'
  },
  {
    id: 'plage-legzira',
    name: 'Plage de Legzira',
    nameAr: 'شاطئ لكزيرة',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Arches naturelles spectaculaires sur l\'océan',
    descriptionAr: 'أقواس طبيعية مذهلة على المحيط',
    icon: '🌊'
  },
  {
    id: 'plage-taghazout',
    name: 'Plage de Taghazout',
    nameAr: 'شاطئ تغازوت',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Spot de surf réputé, village de pêcheurs',
    descriptionAr: 'موقع ركوب الأمواج الشهير، قرية صيادين',
    icon: '🌊'
  },
  {
    id: 'plage-sidi-kaouki',
    name: 'Plage de Sidi Kaouki',
    nameAr: 'شاطئ سيدي كاوكي',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Plage sauvage, spot de kitesurf',
    descriptionAr: 'شاطئ بري، موقع ركوب الأمواج الشراعية',
    icon: '🌊'
  },
  {
    id: 'plage-martil',
    name: 'Plage de Martil',
    nameAr: 'شاطئ مرتيل',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Station balnéaire moderne près de Tétouan',
    descriptionAr: 'منتجع ساحلي عصري قرب تطوان',
    icon: '🌊'
  },
  {
    id: 'plage-oualidia',
    name: 'Plage d\'Oualidia (lagune et huîtres)',
    nameAr: 'شاطئ واد لاو (بحيرة ومحار)',
    category: 'Plages et Côtes',
    categoryAr: 'الشواطئ والسواحل',
    description: 'Lagune protégée, élevage d\'huîtres',
    descriptionAr: 'بحيرة محمية، تربية المحار',
    icon: '🌊'
  },

  // 🏔️ Montagnes et Vallées
  {
    id: 'mont-toubkal',
    name: 'Mont Toubkal',
    nameAr: 'جبل توبقال',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Plus haut sommet d\'Afrique du Nord (4167m)',
    descriptionAr: 'أعلى قمة في شمال إفريقيا (4167م)',
    icon: '🏔️'
  },
  {
    id: 'vallee-ourika',
    name: 'Vallée de l\'Ourika',
    nameAr: 'وادي أوريكا',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Vallée verdoyante dans l\'Atlas, cascades',
    descriptionAr: 'وادي أخضر في الأطلس، شلالات',
    icon: '🏔️'
  },
  {
    id: 'vallee-roses',
    name: 'Vallée des Roses',
    nameAr: 'وادي الورود',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Cultivation de roses, festival annuel',
    descriptionAr: 'زراعة الورود، مهرجان سنوي',
    icon: '🏔️'
  },
  {
    id: 'vallee-dades',
    name: 'Vallée du Dadès',
    nameAr: 'وادي دادس',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Route des mille kasbahs, paysages rouges',
    descriptionAr: 'طريق الألف قصبة، مناظر حمراء',
    icon: '🏔️'
  },
  {
    id: 'vallee-draa',
    name: 'Vallée du Draa',
    nameAr: 'وادي درعة',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Plus longue oasis du monde, palmeraies',
    descriptionAr: 'أطول واحة في العالم، بساتين النخيل',
    icon: '🏔️'
  },
  {
    id: 'vallee-assif-melloul',
    name: 'Vallée de l\'Assif Melloul',
    nameAr: 'وادي أسيف ملول',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Vallée encaissée dans l\'Anti-Atlas',
    descriptionAr: 'وادي عميق في الأطلس الصغير',
    icon: '🏔️'
  },
  {
    id: 'gorges-ziz',
    name: 'Gorges du Ziz',
    nameAr: 'مضيق زيز',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Canyon spectaculaire dans l\'Atlas',
    descriptionAr: 'وادي مذهل في الأطلس',
    icon: '🏔️'
  },
  {
    id: 'cascades-ouzoud',
    name: 'Cascades d\'Ouzoud',
    nameAr: 'شلالات أوزود',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Plus hautes cascades du Maroc (110m)',
    descriptionAr: 'أعلى شلالات المغرب (110م)',
    icon: '🏔️'
  },
  {
    id: 'lac-bin-el-ouidane',
    name: 'Lac Bin El Ouidane',
    nameAr: 'بحيرة بن الويدان',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Lac de barrage dans l\'Atlas, activités nautiques',
    descriptionAr: 'بحيرة سد في الأطلس، أنشطة مائية',
    icon: '🏔️'
  },
  {
    id: 'foret-cedres',
    name: 'Forêt de cèdres (Azrou et Moyen Atlas)',
    nameAr: 'غابة الأرز (أزرو والأطلس المتوسط)',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Plus grande forêt de cèdres du Maroc',
    descriptionAr: 'أكبر غابة أرز في المغرب',
    icon: '🏔️'
  },
  {
    id: 'station-michlifen',
    name: 'Station de ski de Michlifen',
    nameAr: 'محطة التزلج مشليفن',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Station de ski dans l\'Atlas, hiver',
    descriptionAr: 'محطة تزلج في الأطلس، شتاء',
    icon: '🏔️'
  },
  {
    id: 'montagnes-rif',
    name: 'Montagnes du Rif',
    nameAr: 'جبال الريف',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Chaîne montagneuse du nord, biodiversité',
    descriptionAr: 'سلسلة جبلية شمالية، تنوع بيولوجي',
    icon: '🏔️'
  },
  {
    id: 'montagnes-haut-atlas',
    name: 'Montagnes du Haut Atlas',
    nameAr: 'جبال الأطلس الكبير',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Plus haute chaîne du Maroc, sommets enneigés',
    descriptionAr: 'أعلى سلسلة في المغرب، قمم ثلجية',
    icon: '🏔️'
  },
  {
    id: 'montagnes-anti-atlas',
    name: 'Montagnes du Anti-Atlas',
    nameAr: 'جبال الأطلس الصغير',
    category: 'Montagnes et Vallées',
    categoryAr: 'الجبال والوديان',
    description: 'Chaîne aride du sud, paysages lunaires',
    descriptionAr: 'سلسلة قاحلة جنوبية، مناظر قمرية',
    icon: '🏔️'
  },

  // 🏜️ Déserts et paysages désertiques
  {
    id: 'dunes-erg-chebbi',
    name: 'Dunes de l\'Erg Chebbi (Merzouga)',
    nameAr: 'كثبان إرغ شببي (مرزوكة)',
    category: 'Déserts et paysages désertiques',
    categoryAr: 'الصحاري والمناظر الصحراوية',
    description: 'Dunes de sable doré, hautes de 150m',
    descriptionAr: 'كثبان رملية ذهبية، ارتفاع 150م',
    icon: '🏜️'
  },
  {
    id: 'dunes-erg-chigaga',
    name: 'Dunes de l\'Erg Chigaga',
    nameAr: 'كثبان إرغ شيغاغا',
    category: 'Déserts et paysages désertiques',
    categoryAr: 'الصحاري والمناظر الصحراوية',
    description: 'Dunes sauvages, moins touristiques',
    descriptionAr: 'كثبان برية، أقل سياحية',
    icon: '🏜️'
  },
  {
    id: 'oasis-fint',
    name: 'Oasis de Fint',
    nameAr: 'واحة فنت',
    category: 'Déserts et paysages désertiques',
    categoryAr: 'الصحاري والمناظر الصحراوية',
    description: 'Oasis cachée près d\'Ouarzazate',
    descriptionAr: 'واحة مخفية قرب ورزازات',
    icon: '🏜️'
  },
  {
    id: 'oasis-tighmert',
    name: 'Oasis de Tighmert',
    nameAr: 'واحة تيغميرت',
    category: 'Déserts et paysages désertiques',
    categoryAr: 'الصحاري والمناظر الصحراوية',
    description: 'Oasis traditionnelle du Sahara',
    descriptionAr: 'واحة تقليدية في الصحراء',
    icon: '🏜️'
  },
  {
    id: 'desert-zagora',
    name: 'Désert de Zagora',
    nameAr: 'صحراء زاكورة',
    category: 'Déserts et paysages désertiques',
    categoryAr: 'الصحاري والمناظر الصحراوية',
    description: 'Porte du Sahara, paysages désertiques',
    descriptionAr: 'بوابة الصحراء، مناظر صحراوية',
    icon: '🏜️'
  },
  {
    id: 'desert-mhamid',
    name: 'Désert de M\'Hamid',
    nameAr: 'صحراء امحاميد',
    category: 'Déserts et paysages désertiques',
    categoryAr: 'الصحاري والمناظر الصحراوية',
    description: 'Dernier village avant le Sahara',
    descriptionAr: 'آخر قرية قبل الصحراء',
    icon: '🏜️'
  },

  // 🌟 Lieux insolites et emblématiques
  {
    id: 'ville-bleue',
    name: 'Ville bleue (Chefchaouen)',
    nameAr: 'المدينة الزرقاء (شفشاون)',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Toutes les maisons peintes en bleu',
    descriptionAr: 'جميع المنازل مطلية بالأزرق',
    icon: '🌟'
  },
  {
    id: 'jardins-majorelle',
    name: 'Jardins Majorelle',
    nameAr: 'حدائق ماجوريل',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Jardins botaniques, bleu Majorelle',
    descriptionAr: 'حدائق نباتية، أزرق ماجوريل',
    icon: '🌟'
  },
  {
    id: 'jardin-menara',
    name: 'Jardin de la Menara',
    nameAr: 'حديقة المنارة',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Jardin historique avec bassin et pavillon',
    descriptionAr: 'حديقة تاريخية مع بركة وبرج',
    icon: '🌟'
  },
  {
    id: 'jardin-secret',
    name: 'Jardin Secret (Médina Marrakech)',
    nameAr: 'الحديقة السرية (مدينة مراكش القديمة)',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Oasis de verdure dans la médina',
    descriptionAr: 'واحة خضراء في المدينة القديمة',
    icon: '🌟'
  },
  {
    id: 'souks-traditionnels',
    name: 'Souks traditionnels',
    nameAr: 'الأسواق التقليدية',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Marchés traditionnels, artisanat local',
    descriptionAr: 'أسواق تقليدية، حرف يدوية محلية',
    icon: '🌟'
  },
  {
    id: 'place-jemaa-el-fna',
    name: 'Place Jemaa el-Fna',
    nameAr: 'ساحة جامع الفنا',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Place principale de Marrakech, animations',
    descriptionAr: 'الساحة الرئيسية لمراكش، عروض',
    icon: '🌟'
  },
  {
    id: 'marche-poissons-essaouira',
    name: 'Marché aux poissons d\'Essaouira',
    nameAr: 'سوق السمك بالصويرة',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Marché de poissons frais, ambiance locale',
    descriptionAr: 'سوق السمك الطازج، أجواء محلية',
    icon: '🌟'
  },
  {
    id: 'souks-marrakech-fes',
    name: 'Souks de Marrakech et Fès',
    nameAr: 'أسواق مراكش وفاس',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Marchés labyrinthiques, artisanat',
    descriptionAr: 'أسواق متاهية، حرف يدوية',
    icon: '🌟'
  },
  {
    id: 'musee-marrakech',
    name: 'Musée de Marrakech',
    nameAr: 'متحف مراكش',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Art islamique et architecture traditionnelle',
    descriptionAr: 'الفن الإسلامي والعمارة التقليدية',
    icon: '🌟'
  },
  {
    id: 'musee-dar-batha',
    name: 'Musée Dar Batha',
    nameAr: 'متحف دار البطحاء',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Arts et traditions de Fès',
    descriptionAr: 'فنون وتقاليد فاس',
    icon: '🌟'
  },
  {
    id: 'musee-mohammed-vi',
    name: 'Musée Mohammed VI de l\'Art Moderne',
    nameAr: 'متحف محمد السادس للفن الحديث',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Art contemporain marocain',
    descriptionAr: 'الفن المعاصر المغربي',
    icon: '🌟'
  },
  {
    id: 'skoura-kasbahs',
    name: 'Skoura et ses kasbahs',
    nameAr: 'سكورة وقصباتها',
    category: 'Lieux insolites et emblématiques',
    categoryAr: 'الأماكن الفريدة والرموز',
    description: 'Palmeraie avec kasbahs traditionnelles',
    descriptionAr: 'واحة نخيل مع قصبات تقليدية',
    icon: '🌟'
  }
];

// Fonctions utilitaires
export const getTagById = (id: string): Tag | undefined => {
  return moroccanTags.find(tag => tag.id === id);
};

export const getTagsByCategory = (category: string): Tag[] => {
  return moroccanTags.filter(tag => tag.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(moroccanTags.map(tag => tag.category))];
};

export const getAllTagIds = (): string[] => {
  return moroccanTags.map(tag => tag.id);
};

export const searchTags = (query: string): Tag[] => {
  const lowerQuery = query.toLowerCase();
  return moroccanTags.filter(tag => 
    tag.name.toLowerCase().includes(lowerQuery) ||
    tag.nameAr.includes(query) ||
    tag.description.toLowerCase().includes(lowerQuery)
  );
};
