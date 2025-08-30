import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { contentService } from '../../services/contentService';
import { Testimonial } from '../../types/content';

interface TestimonialsSectionProps {
  city?: string;
  limit?: number;
  title?: string;
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  city, 
  limit = 6, 
  title,
  className = '' 
}) => {
  const { language } = useApp();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      try {
        const data = await contentService.getTestimonials(city, limit);
        setTestimonials(data);
      } catch (error) {
        console.error('Erreur lors du chargement des témoignages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, [city, limit]);

  const getTitle = () => {
    if (title) return title;
    
    const titles = {
      fr: city ? `Avis clients à ${city}` : 'Avis de nos clients',
      ar: city ? `آراء العملاء في ${city}` : 'آراء عملائنا',
      en: city ? `Customer reviews in ${city}` : 'Our customer reviews',
      es: city ? `Reseñas de clientes en ${city}` : 'Reseñas de nuestros clientes'
    };

    return titles[language as keyof typeof titles] || titles.fr;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {getTitle()}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              {testimonial.authorAvatar ? (
                              <img
                src={testimonial.authorAvatar}
                alt={testimonial.authorName || 'User'}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              ) : (
                <div className="w-10 h-10 bg-orange-100 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-orange-600 font-semibold text-sm">
                    {testimonial.authorName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {testimonial.authorName || 'Utilisateur'}
                </h3>
                <div className="flex items-center">
                  {renderStars(testimonial.rating)}
                  <span className="text-xs text-gray-500 ml-1">
                    ({testimonial.rating}/5)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Quote className="absolute -top-2 -left-1 h-4 w-4 text-gray-300" />
              <p className="text-gray-700 text-sm leading-relaxed pl-4">
                {testimonial.content[language as keyof typeof testimonial.content] || testimonial.content.fr}
              </p>
            </div>
            
            {testimonial.isVerified && (
              <div className="mt-3 flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2 flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-green-600 font-medium">
                  {language === 'ar' ? 'تم التحقق' : 
                   language === 'en' ? 'Verified' : 
                   language === 'es' ? 'Verificado' : 
                   'Vérifié'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
