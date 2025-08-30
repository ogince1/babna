import { Language } from '../types';

export const languages: Language[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    properties: 'Logements',
    dashboard: 'Tableau de bord',
    profile: 'Profil',
    login: 'Connexion',
    logout: 'Déconnexion',
    
    // Search
    searchPlaceholder: 'Où souhaitez-vous séjourner ?',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    guests: 'Invités',
    search: 'Rechercher',
    
    // Property
    perNight: 'par nuit',
    bedrooms: 'chambres',
    bathrooms: 'salles de bain',
    maxGuests: 'personnes max',
    amenities: 'Équipements',
    location: 'Localisation',
    bookNow: 'Réserver maintenant',
    
    // Booking
    totalPrice: 'Prix total',
    bookingConfirmation: 'Confirmation de réservation',
    paymentMethod: 'Mode de paiement',
    
    // Dashboard
    myProperties: 'Mes biens',
    addProperty: 'Ajouter un bien',
    bookings: 'Réservations',
    favorites: 'Favoris',
    earnings: 'Revenus',
    
    // Admin
    users: 'Utilisateurs',
    pendingApprovals: 'Approbations en attente',
    statistics: 'Statistiques',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    approve: 'Approuver',
    reject: 'Refuser',
    loading: 'Chargement...',
    
    // Welcome
    welcomeTitle: 'Découvrez le Maroc authentique',
    welcomeSubtitle: 'Trouvez votre logement idéal parmi nos appartements et riads soigneusement sélectionnés',
    
    // Footer
    'footer.description': 'Votre plateforme de confiance Babna.ma pour la location d\'appartements au Maroc. Des logements authentiques et des expériences inoubliables.',
    'footer.quickLinks': 'Liens rapides',
    'footer.support': 'Support',
    'footer.language': 'Langue',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.help': 'Aide',
    'footer.allRightsReserved': 'Tous droits réservés.',
    'footer.legalNotice': 'Mentions légales',
    'footer.privacyPolicy': 'Politique de confidentialité',
    'footer.termsOfService': 'Conditions d\'utilisation',
    'nav.blog': 'Blog',
    'nav.travelGuides': 'Guides de voyage'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    properties: 'العقارات',
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    
    // Search
    searchPlaceholder: 'أين تريد الإقامة؟',
    checkIn: 'تاريخ الوصول',
    checkOut: 'تاريخ المغادرة',
    guests: 'الضيوف',
    search: 'بحث',
    
    // Property
    perNight: 'في الليلة',
    bedrooms: 'غرف نوم',
    bathrooms: 'حمامات',
    maxGuests: 'أشخاص كحد أقصى',
    amenities: 'المرافق',
    location: 'الموقع',
    bookNow: 'احجز الآن',
    
    // Booking
    totalPrice: 'السعر الإجمالي',
    bookingConfirmation: 'تأكيد الحجز',
    paymentMethod: 'طريقة الدفع',
    
    // Dashboard
    myProperties: 'عقاراتي',
    addProperty: 'إضافة عقار',
    bookings: 'الحجوزات',
    favorites: 'المفضلة',
    earnings: 'الأرباح',
    
    // Admin
    users: 'المستخدمون',
    pendingApprovals: 'الموافقات المعلقة',
    statistics: 'الإحصائيات',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تحرير',
    delete: 'حذف',
    approve: 'موافق',
    reject: 'رفض',
    loading: 'جاري التحميل...',
    
    // Welcome
    welcomeTitle: 'اكتشف المغرب الأصيل',
    welcomeSubtitle: 'اعثر على سكنك المثالي من بين شققنا ورياضنا المختارة بعناية',
    
    // Footer
    'footer.description': 'منصتك الموثوقة Babna.ma لتأجير الشقق في المغرب. سكن أصيل وتجارب لا تنسى.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.support': 'الدعم',
    'footer.language': 'اللغة',
    'footer.contact': 'اتصل بنا',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.help': 'المساعدة',
    'footer.allRightsReserved': 'جميع الحقوق محفوظة.',
    'footer.legalNotice': 'الإشعار القانوني',
    'footer.privacyPolicy': 'سياسة الخصوصية',
    'footer.termsOfService': 'شروط الخدمة',
    'nav.blog': 'المدونة',
    'nav.travelGuides': 'دليل السفر'
  },
  en: {
    // Navigation
    home: 'Home',
    properties: 'Properties',
    dashboard: 'Dashboard',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    
    // Search
    searchPlaceholder: 'Where would you like to stay?',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    search: 'Search',
    
    // Property
    perNight: 'per night',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    maxGuests: 'max guests',
    amenities: 'Amenities',
    location: 'Location',
    bookNow: 'Book Now',
    
    // Booking
    totalPrice: 'Total Price',
    bookingConfirmation: 'Booking Confirmation',
    paymentMethod: 'Payment Method',
    
    // Dashboard
    myProperties: 'My Properties',
    addProperty: 'Add Property',
    bookings: 'Bookings',
    favorites: 'Favorites',
    earnings: 'Earnings',
    
    // Admin
    users: 'Users',
    pendingApprovals: 'Pending Approvals',
    statistics: 'Statistics',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    approve: 'Approve',
    reject: 'Reject',
    loading: 'Loading...',
    
    // Welcome
    welcomeTitle: 'Discover Authentic Morocco',
    welcomeSubtitle: 'Find your ideal accommodation among our carefully selected apartments and riads',
    
    // Footer
    'footer.description': 'Your trusted platform Babna.ma for apartment rentals in Morocco. Authentic accommodations and unforgettable experiences.',
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Support',
    'footer.language': 'Language',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    'footer.help': 'Help',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.legalNotice': 'Legal Notice',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'nav.blog': 'Blog',
    'nav.travelGuides': 'Travel Guides'
  },
  es: {
    // Navigation
    home: 'Inicio',
    properties: 'Propiedades',
    dashboard: 'Panel de control',
    profile: 'Perfil',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    
    // Search
    searchPlaceholder: '¿Dónde te gustaría alojarte?',
    checkIn: 'Llegada',
    checkOut: 'Salida',
    guests: 'Huéspedes',
    search: 'Buscar',
    
    // Property
    perNight: 'por noche',
    bedrooms: 'habitaciones',
    bathrooms: 'baños',
    maxGuests: 'huéspedes máx',
    amenities: 'Comodidades',
    location: 'Ubicación',
    bookNow: 'Reservar ahora',
    
    // Booking
    totalPrice: 'Precio total',
    bookingConfirmation: 'Confirmación de reserva',
    paymentMethod: 'Método de pago',
    
    // Dashboard
    myProperties: 'Mis propiedades',
    addProperty: 'Añadir propiedad',
    bookings: 'Reservas',
    favorites: 'Favoritos',
    earnings: 'Ganancias',
    
    // Admin
    users: 'Usuarios',
    pendingApprovals: 'Aprobaciones pendientes',
    statistics: 'Estadísticas',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    approve: 'Aprobar',
    reject: 'Rechazar',
    loading: 'Cargando...',
    
    // Welcome
    welcomeTitle: 'Descubre el Marruecos auténtico',
    welcomeSubtitle: 'Encuentra tu alojamiento ideal entre nuestros apartamentos y riads cuidadosamente seleccionados',
    
    // Footer
    'footer.description': 'Tu plataforma de confianza Babna.ma para alquiler de apartamentos en Marruecos. Alojamientos auténticos y experiencias inolvidables.',
    'footer.quickLinks': 'Enlaces rápidos',
    'footer.support': 'Soporte',
    'footer.language': 'Idioma',
    'footer.contact': 'Contacto',
    'footer.faq': 'FAQ',
    'footer.help': 'Ayuda',
    'footer.allRightsReserved': 'Todos los derechos reservados.',
    'footer.legalNotice': 'Aviso legal',
    'footer.privacyPolicy': 'Política de privacidad',
    'footer.termsOfService': 'Términos de servicio',
    'nav.blog': 'Blog',
    'nav.travelGuides': 'Guías de viaje'
  }
};

export const t = (key: string, lang: 'fr' | 'ar' | 'en' | 'es' = 'fr'): string => {
  return translations[lang][key as keyof typeof translations.fr] || key;
};