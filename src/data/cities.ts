export interface City {
  id: string;
  name: string;
  nameAr: string;
  region: string;
  lat: number;
  lng: number;
  description: string;
  descriptionAr: string;
}

export const moroccanCities: City[] = [
  {
    id: 'marrakech',
    name: 'Marrakech',
    nameAr: 'مراكش',
    region: 'Marrakech-Safi',
    lat: 31.6295,
    lng: -8.0080,
    description: 'La ville rouge, célèbre pour sa médina historique et ses souks animés',
    descriptionAr: 'المدينة الحمراء، مشهورة بمدينتها التاريخية وأسواقها النابضة بالحياة'
  },
  {
    id: 'casablanca',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    region: 'Casablanca-Settat',
    lat: 33.5731,
    lng: -7.5898,
    description: 'La capitale économique du Maroc, ville moderne et dynamique',
    descriptionAr: 'العاصمة الاقتصادية للمغرب، مدينة عصرية وديناميكية'
  },
  {
    id: 'fes',
    name: 'Fès',
    nameAr: 'فاس',
    region: 'Fès-Meknès',
    lat: 34.0333,
    lng: -5.0000,
    description: 'La capitale spirituelle et culturelle, médina classée UNESCO',
    descriptionAr: 'العاصمة الروحية والثقافية، المدينة القديمة المصنفة تراث عالمي'
  },
  {
    id: 'rabat',
    name: 'Rabat',
    nameAr: 'الرباط',
    region: 'Rabat-Salé-Kénitra',
    lat: 34.0209,
    lng: -6.8416,
    description: 'La capitale administrative du Maroc, ville moderne et historique',
    descriptionAr: 'العاصمة الإدارية للمغرب، مدينة عصرية وتاريخية'
  },
  {
    id: 'agadir',
    name: 'Agadir',
    nameAr: 'أكادير',
    region: 'Souss-Massa',
    lat: 30.4278,
    lng: -9.5981,
    description: 'Station balnéaire moderne avec de belles plages',
    descriptionAr: 'منتجع ساحلي عصري مع شواطئ جميلة'
  },
  {
    id: 'tanger',
    name: 'Tanger',
    nameAr: 'طنجة',
    region: 'Tanger-Tétouan-Al Hoceima',
    lat: 35.7595,
    lng: -5.8340,
    description: 'Porte de l\'Afrique, ville cosmopolite au détroit de Gibraltar',
    descriptionAr: 'بوابة إفريقيا، مدينة عالمية على مضيق جبل طارق'
  },
  {
    id: 'meknes',
    name: 'Meknès',
    nameAr: 'مكناس',
    region: 'Fès-Meknès',
    lat: 33.8935,
    lng: -5.5473,
    description: 'Ville impériale avec une riche histoire et architecture',
    descriptionAr: 'مدينة إمبراطورية بتاريخ غني وعمارة رائعة'
  },
  {
    id: 'oujda',
    name: 'Oujda',
    nameAr: 'وجدة',
    region: 'Oriental',
    lat: 34.6814,
    lng: -1.9086,
    description: 'Ville de l\'est marocain, proche de la frontière algérienne',
    descriptionAr: 'مدينة شرق المغرب، قريبة من الحدود الجزائرية'
  },
  {
    id: 'kenitra',
    name: 'Kénitra',
    nameAr: 'القنيطرة',
    region: 'Rabat-Salé-Kénitra',
    lat: 34.2610,
    lng: -6.5802,
    description: 'Ville portuaire sur l\'océan Atlantique',
    descriptionAr: 'مدينة مينائية على المحيط الأطلسي'
  },
  {
    id: 'tetouan',
    name: 'Tétouan',
    nameAr: 'تطوان',
    region: 'Tanger-Tétouan-Al Hoceima',
    lat: 35.5711,
    lng: -5.3724,
    description: 'Ville blanche avec une médina andalouse',
    descriptionAr: 'المدينة البيضاء مع المدينة القديمة الأندلسية'
  },
  {
    id: 'safi',
    name: 'Safi',
    nameAr: 'آسفي',
    region: 'Marrakech-Safi',
    lat: 32.2988,
    lng: -9.2377,
    description: 'Ville côtière célèbre pour sa poterie traditionnelle',
    descriptionAr: 'مدينة ساحلية مشهورة بفخارها التقليدي'
  },
  {
    id: 'el-jadida',
    name: 'El Jadida',
    nameAr: 'الجديدة',
    region: 'Casablanca-Settat',
    lat: 33.2316,
    lng: -8.5007,
    description: 'Cité portugaise classée UNESCO',
    descriptionAr: 'المدينة البرتغالية المصنفة تراث عالمي'
  },
  {
    id: 'beni-mellal',
    name: 'Béni Mellal',
    nameAr: 'بني ملال',
    region: 'Béni Mellal-Khénifra',
    lat: 32.3373,
    lng: -6.3498,
    description: 'Ville au pied du Moyen Atlas',
    descriptionAr: 'مدينة عند سفح الأطلس المتوسط'
  },
  {
    id: 'nador',
    name: 'Nador',
    nameAr: 'الناظور',
    region: 'Oriental',
    lat: 35.1688,
    lng: -2.9286,
    description: 'Ville côtière de la Méditerranée',
    descriptionAr: 'مدينة ساحلية على البحر الأبيض المتوسط'
  },
  {
    id: 'taza',
    name: 'Taza',
    nameAr: 'تازة',
    region: 'Fès-Meknès',
    lat: 34.2139,
    lng: -4.0086,
    description: 'Ville historique entre le Rif et le Moyen Atlas',
    descriptionAr: 'مدينة تاريخية بين الريف والأطلس المتوسط'
  },
  {
    id: 'larache',
    name: 'Larache',
    nameAr: 'العرائش',
    region: 'Tanger-Tétouan-Al Hoceima',
    lat: 35.1933,
    lng: -6.1557,
    description: 'Ville côtière avec une histoire riche',
    descriptionAr: 'مدينة ساحلية بتاريخ غني'
  },
  {
    id: 'khemisset',
    name: 'Khemisset',
    nameAr: 'الخميسات',
    region: 'Rabat-Salé-Kénitra',
    lat: 33.8154,
    lng: -6.0577,
    description: 'Ville agricole du centre du Maroc',
    descriptionAr: 'مدينة زراعية في وسط المغرب'
  },
  {
    id: 'guelmim',
    name: 'Guelmim',
    nameAr: 'كلميم',
    region: 'Guelmim-Oued Noun',
    lat: 28.9871,
    lng: -10.0577,
    description: 'Porte du Sahara marocain',
    descriptionAr: 'بوابة الصحراء المغربية'
  },
  {
    id: 'jorf-lasfar',
    name: 'Jorf Lasfar',
    nameAr: 'جرف الأصفر',
    region: 'Casablanca-Settat',
    lat: 33.4564,
    lng: -8.6180,
    description: 'Port industriel important',
    descriptionAr: 'ميناء صناعي مهم'
  },
  {
    id: 'youssoufia',
    name: 'Youssoufia',
    nameAr: 'اليوسفية',
    region: 'Marrakech-Safi',
    lat: 32.2463,
    lng: -8.5290,
    description: 'Ville minière et industrielle',
    descriptionAr: 'مدينة تعدينية وصناعية'
  },
  {
    id: 'khenifra',
    name: 'Khénifra',
    nameAr: 'خنيفرة',
    region: 'Béni Mellal-Khénifra',
    lat: 32.9395,
    lng: -5.6675,
    description: 'Ville du Moyen Atlas',
    descriptionAr: 'مدينة الأطلس المتوسط'
  },
  {
    id: 'berkane',
    name: 'Berkane',
    nameAr: 'بركان',
    region: 'Oriental',
    lat: 34.9177,
    lng: -2.3197,
    description: 'Ville agricole de l\'est',
    descriptionAr: 'مدينة زراعية في الشرق'
  },
  {
    id: 'taourirt',
    name: 'Taourirt',
    nameAr: 'تاوريرت',
    region: 'Oriental',
    lat: 34.4073,
    lng: -2.8978,
    description: 'Ville de l\'oriental marocain',
    descriptionAr: 'مدينة من شرق المغرب'
  },
  {
    id: 'benslimane',
    name: 'Benslimane',
    nameAr: 'بنسليمان',
    region: 'Casablanca-Settat',
    lat: 33.6124,
    lng: -7.1216,
    description: 'Ville côtière entre Casablanca et Rabat',
    descriptionAr: 'مدينة ساحلية بين الدار البيضاء والرباط'
  },
  {
    id: 'al-hoceima',
    name: 'Al Hoceima',
    nameAr: 'الحسيمة',
    region: 'Tanger-Tétouan-Al Hoceima',
    lat: 35.2492,
    lng: -3.9371,
    description: 'Perle de la Méditerranée',
    descriptionAr: 'لؤلؤة البحر الأبيض المتوسط'
  },
  {
    id: 'chefchaouen',
    name: 'Chefchaouen',
    nameAr: 'شفشاون',
    region: 'Tanger-Tétouan-Al Hoceima',
    lat: 35.1714,
    lng: -5.2696,
    description: 'La ville bleue du Rif',
    descriptionAr: 'المدينة الزرقاء في الريف'
  },
  {
    id: 'essaouira',
    name: 'Essaouira',
    nameAr: 'الصويرة',
    region: 'Marrakech-Safi',
    lat: 31.5085,
    lng: -9.7595,
    description: 'Ville côtière célèbre pour ses plages et son vent',
    descriptionAr: 'مدينة ساحلية مشهورة بشواطئها ورياحها'
  }
];

export const getCityById = (id: string): City | undefined => {
  return moroccanCities.find(city => city.id === id);
};

export const getCityByName = (name: string): City | undefined => {
  return moroccanCities.find(city => 
    city.name.toLowerCase() === name.toLowerCase() || 
    city.nameAr === name
  );
};
