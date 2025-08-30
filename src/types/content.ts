export interface ContentPage {
  id: string;
  type: 'city' | 'tag' | 'blog' | 'testimonial' | 'guide';
  slug: string;
  title: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  description: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  content: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  metaTitle?: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  metaDescription?: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  keywords?: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  featuredImage?: string;
  images?: string[];
  author?: string;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  seoData?: {
    canonical?: string;
    ogImage?: string;
    twitterCard?: string;
  };
}

export interface FAQ {
  id: string;
  question: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  answer: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  category: 'city' | 'booking' | 'payment' | 'general';
  relatedTo?: string; // city slug or tag slug
  order: number;
  isPublished: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  content: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  propertyId?: string;
  city?: string;
  publishedAt: string;
  isVerified: boolean;
  isPublished: boolean;
}

export interface BlogPost {
  id: string;
  title: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  excerpt: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  content: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  slug: string;
  author: string;
  featuredImage: string;
  images?: string[];
  tags: string[];
  category: 'travel' | 'culture' | 'tips' | 'news';
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  seoData?: {
    metaTitle?: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    metaDescription?: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    keywords?: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    canonical?: string;
  };
}

export interface TravelGuide {
  id: string;
  citySlug: string;
  title: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  description: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  content: {
    fr: string;
    ar: string;
    en: string;
    es: string;
  };
  sections: {
    title: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    content: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    order: number;
  }[];
  featuredImage: string;
  images?: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  seoData?: {
    metaTitle?: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    metaDescription?: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    keywords?: {
      fr: string;
      ar: string;
      en: string;
      es: string;
    };
    canonical?: string;
  };
}
