export interface SEOData {
  cities: CityData[];
  types: TypeData[];
  places: PlaceData[];
}

export interface CityData {
  slug: string;
  name: {
    fr: string;
    ar: string;
  };
  title: {
    fr: string;
    ar: string;
  };
  h1: {
    fr: string;
    ar: string;
  };
  description: {
    fr: string;
    ar: string;
  };
}

export interface TypeData {
  slug: string;
  name: {
    fr: string;
    ar: string;
  };
  title: {
    fr: string;
    ar: string;
  };
  h1: {
    fr: string;
    ar: string;
  };
  description: {
    fr: string;
    ar: string;
  };
}

export interface PlaceData {
  slug: string;
  name: {
    fr: string;
    ar: string;
  };
  city: string;
  title: {
    fr: string;
    ar: string;
  };
  h1: {
    fr: string;
    ar: string;
  };
  description: {
    fr: string;
    ar: string;
  };
}

export const seoData: SEOData = {
  cities: [
    {
      slug: 'marrakech',
      name: { fr: 'Marrakech', ar: 'مراكش' },
      title: {
        fr: 'Location d\'appartements meublés par jour à Marrakech | Confort & Prix',
        ar: 'شقق للكراء اليومي في مراكش | بأسعار مناسبة'
      },
      h1: {
        fr: 'Appartements à louer par jour à Marrakech',
        ar: 'شقق للكراء اليومي في مراكش'
      },
      description: {
        fr: 'Découvrez nos appartements meublés à louer par jour à Marrakech. Prix compétitifs, confort garanti.',
        ar: 'اكتشف شققنا المفروشة للكراء اليومي في مراكش. أسعار تنافسية، راحة مضمونة.'
      }
    },
    {
      slug: 'casablanca',
      name: { fr: 'Casablanca', ar: 'الدار البيضاء' },
      title: {
        fr: 'Location d\'appartements meublés par jour à Casablanca | Confort & Prix',
        ar: 'شقق للكراء اليومي في الدار البيضاء | بأسعار مناسبة'
      },
      h1: {
        fr: 'Appartements à louer par jour à Casablanca',
        ar: 'شقق للكراء اليومي في الدار البيضاء'
      },
      description: {
        fr: 'Location d\'appartements meublés par jour à Casablanca. Idéal pour vos déplacements professionnels.',
        ar: 'كراء شقق مفروشة باليوم في الدار البيضاء. مثالي لرحلاتك المهنية.'
      }
    },
    {
      slug: 'agadir',
      name: { fr: 'Agadir', ar: 'أكادير' },
      title: {
        fr: 'Location d\'appartements meublés par jour à Agadir | Confort & Prix',
        ar: 'شقق للكراء اليومي في أكادير | بأسعار مناسبة'
      },
      h1: {
        fr: 'Appartements à louer par jour à Agadir',
        ar: 'شقق للكراء اليومي في أكادير'
      },
      description: {
        fr: 'Appartements meublés à louer par jour à Agadir. Profitez de la plage et du soleil.',
        ar: 'شقق مفروشة للكراء اليومي في أكادير. استمتع بالشاطئ والشمس.'
      }
    },
    {
      slug: 'tanger',
      name: { fr: 'Tanger', ar: 'طنجة' },
      title: {
        fr: 'Location d\'appartements meublés par jour à Tanger | Confort & Prix',
        ar: 'شقق للكراء اليومي في طنجة | بأسعار مناسبة'
      },
      h1: {
        fr: 'Appartements à louer par jour à Tanger',
        ar: 'شقق للكراء اليومي في طنجة'
      },
      description: {
        fr: 'Location d\'appartements meublés par jour à Tanger. Vue sur le détroit de Gibraltar.',
        ar: 'كراء شقق مفروشة باليوم في طنجة. إطلالة على مضيق جبل طارق.'
      }
    },
    {
      slug: 'fes',
      name: { fr: 'Fès', ar: 'فاس' },
      title: {
        fr: 'Location d\'appartements meublés par jour à Fès | Confort & Prix',
        ar: 'شقق للكراء اليومي في فاس | بأسعار مناسبة'
      },
      h1: {
        fr: 'Appartements à louer par jour à Fès',
        ar: 'شقق للكراء اليومي في فاس'
      },
      description: {
        fr: 'Appartements meublés à louer par jour à Fès. Découvrez la ville impériale.',
        ar: 'شقق مفروشة للكراء اليومي في فاس. اكتشف المدينة الإمبراطورية.'
      }
    },
    {
      slug: 'rabat',
      name: { fr: 'Rabat', ar: 'الرباط' },
      title: {
        fr: 'Location d\'appartements meublés par jour à Rabat | Confort & Prix',
        ar: 'شقق للكراء اليومي في الرباط | بأسعار مناسبة'
      },
      h1: {
        fr: 'Appartements à louer par jour à Rabat',
        ar: 'شقق للكراء اليومي في الرباط'
      },
      description: {
        fr: 'Location d\'appartements meublés par jour à Rabat. Capitale moderne du Maroc.',
        ar: 'كراء شقق مفروشة باليوم في الرباط. العاصمة الحديثة للمغرب.'
      }
    }
  ],
  types: [
    {
      slug: 'pas-cher',
      name: { fr: 'Pas cher', ar: 'رخيصة' },
      title: {
        fr: 'Appartements pas cher à louer par jour au Maroc',
        ar: 'شقق رخيصة للكراء اليومي في المغرب'
      },
      h1: {
        fr: 'Appartements pas cher à louer par jour',
        ar: 'شقق رخيصة للكراء اليومي'
      },
      description: {
        fr: 'Trouvez des appartements pas cher à louer par jour au Maroc. Qualité et prix imbattables.',
        ar: 'اعثر على شقق رخيصة للكراء اليومي في المغرب. جودة وأسعار لا تقبل المنافسة.'
      }
    },
    {
      slug: 'luxe',
      name: { fr: 'Luxe', ar: 'فاخرة' },
      title: {
        fr: 'Appartements de luxe à louer par jour au Maroc',
        ar: 'شقق فاخرة للكراء اليومي في المغرب'
      },
      h1: {
        fr: 'Appartements de luxe à louer par jour',
        ar: 'شقق فاخرة للكراء اليومي'
      },
      description: {
        fr: 'Location d\'appartements de luxe par jour au Maroc. Confort et élégance garantis.',
        ar: 'كراء شقق فاخرة باليوم في المغرب. راحة وأناقة مضمونة.'
      }
    },
    {
      slug: 'plage',
      name: { fr: 'Plage', ar: 'قرب البحر' },
      title: {
        fr: 'Appartements près de la plage à louer par jour au Maroc',
        ar: 'شقق قرب البحر للكراء اليومي في المغرب'
      },
      h1: {
        fr: 'Appartements près de la plage à louer par jour',
        ar: 'شقق قرب البحر للكراء اليومي'
      },
      description: {
        fr: 'Appartements avec vue mer à louer par jour au Maroc. Proximité des plages.',
        ar: 'شقق بإطلالة بحرية للكراء اليومي في المغرب. قرب الشواطئ.'
      }
    },
    {
      slug: 'famille',
      name: { fr: 'Famille', ar: 'للعائلات' },
      title: {
        fr: 'Appartements pour familles à louer par jour au Maroc',
        ar: 'شقق للعائلات للكراء اليومي في المغرب'
      },
      h1: {
        fr: 'Appartements pour familles à louer par jour',
        ar: 'شقق للعائلات للكراء اليومي'
      },
      description: {
        fr: 'Appartements adaptés aux familles à louer par jour au Maroc. Espace et confort.',
        ar: 'شقق مناسبة للعائلات للكراء اليومي في المغرب. مساحة وراحة.'
      }
    }
  ],
  places: [
    {
      slug: 'marrakech-jamaa-el-fna',
      name: { fr: 'Jamaa El Fna', ar: 'جامع الفنا' },
      city: 'marrakech',
      title: {
        fr: 'Location journalière d\'appartements près de Jamaa El Fna',
        ar: 'شقق للكراء اليومي بالقرب من جامع الفنا'
      },
      h1: {
        fr: 'Appartements à louer près de Jamaa El Fna',
        ar: 'شقق للكراء بالقرب من جامع الفنا'
      },
      description: {
        fr: 'Appartements à louer par jour près de la place Jamaa El Fna à Marrakech.',
        ar: 'شقق للكراء اليومي بالقرب من ساحة جامع الفنا في مراكش.'
      }
    },
    {
      slug: 'rabat-agdal',
      name: { fr: 'Agdal', ar: 'أكدال' },
      city: 'rabat',
      title: {
        fr: 'Location journalière d\'appartements dans le quartier Agdal',
        ar: 'شقق للكراء اليومي في حي أكدال'
      },
      h1: {
        fr: 'Appartements à louer dans le quartier Agdal',
        ar: 'شقق للكراء في حي أكدال'
      },
      description: {
        fr: 'Appartements meublés à louer par jour dans le quartier Agdal à Rabat.',
        ar: 'شقق مفروشة للكراء اليومي في حي أكدال بالرباط.'
      }
    },
    {
      slug: 'casablanca-habous',
      name: { fr: 'Quartier des Habous', ar: 'حي الأحباس' },
      city: 'casablanca',
      title: {
        fr: 'Location journalière d\'appartements dans le quartier des Habous',
        ar: 'شقق للكراء اليومي في حي الأحباس'
      },
      h1: {
        fr: 'Appartements à louer dans le quartier des Habous',
        ar: 'شقق للكراء في حي الأحباس'
      },
      description: {
        fr: 'Appartements à louer par jour dans le quartier traditionnel des Habous à Casablanca.',
        ar: 'شقق للكراء اليومي في الحي التقليدي الأحباس بالدار البيضاء.'
      }
    },
    {
      slug: 'agadir-corniche',
      name: { fr: 'Corniche d\'Agadir', ar: 'كورنيش أكادير' },
      city: 'agadir',
      title: {
        fr: 'Location journalière d\'appartements sur la Corniche d\'Agadir',
        ar: 'شقق للكراء اليومي على كورنيش أكادير'
      },
      h1: {
        fr: 'Appartements à louer sur la Corniche d\'Agadir',
        ar: 'شقق للكراء على كورنيش أكادير'
      },
      description: {
        fr: 'Appartements avec vue mer à louer par jour sur la Corniche d\'Agadir.',
        ar: 'شقق بإطلالة بحرية للكراء اليومي على كورنيش أكادير.'
      }
    }
  ]
};

// Fonctions utilitaires pour récupérer les données SEO
export const getCityBySlug = (slug: string): CityData | undefined => {
  return seoData.cities.find(city => city.slug === slug);
};

export const getTypeBySlug = (slug: string): TypeData | undefined => {
  return seoData.types.find(type => type.slug === slug);
};

export const getPlaceBySlug = (slug: string): PlaceData | undefined => {
  return seoData.places.find(place => place.slug === slug);
};

export const getAllCitySlugs = (): string[] => {
  return seoData.cities.map(city => city.slug);
};

export const getAllTypeSlugs = (): string[] => {
  return seoData.types.map(type => type.slug);
};

export const getAllPlaceSlugs = (): string[] => {
  return seoData.places.map(place => place.slug);
};

