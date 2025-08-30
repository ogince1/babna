import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { contentService } from '../../services/contentService';
import { FAQ } from '../../types/content';

interface FAQSectionProps {
  category: 'city' | 'booking' | 'payment' | 'general';
  relatedTo?: string;
  title?: string;
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  category, 
  relatedTo, 
  title,
  className = '' 
}) => {
  const { language } = useApp();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadFAQs = async () => {
      setLoading(true);
      try {
        console.log('🔄 Chargement des FAQ - Catégorie:', category, 'RelatedTo:', relatedTo, 'Langue:', language);
        const data = await contentService.getFAQs(category, relatedTo, language);
        console.log('✅ FAQ chargées:', data.length, 'FAQ trouvées');
        console.log('📋 Détails des FAQ:', data);
        setFaqs(data);
      } catch (error) {
        console.error('❌ Erreur lors du chargement des FAQ:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, [category, relatedTo, language]);

  const toggleFAQ = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getTitle = () => {
    if (title) return title;
    
    const titles = {
      fr: {
        city: 'Questions fréquentes sur cette ville',
        booking: 'Questions sur la réservation',
        payment: 'Questions sur le paiement',
        general: 'Questions générales'
      },
      ar: {
        city: 'الأسئلة الشائعة حول هذه المدينة',
        booking: 'أسئلة حول الحجز',
        payment: 'أسئلة حول الدفع',
        general: 'أسئلة عامة'
      },
      en: {
        city: 'Frequently Asked Questions about this city',
        booking: 'Booking Questions',
        payment: 'Payment Questions',
        general: 'General Questions'
      },
      es: {
        city: 'Preguntas frecuentes sobre esta ciudad',
        booking: 'Preguntas sobre reservas',
        payment: 'Preguntas sobre pagos',
        general: 'Preguntas generales'
      }
    };

    return titles[language as keyof typeof titles]?.[category] || titles.fr[category];
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {getTitle()}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">
                {faq.question[language as keyof typeof faq.question] || faq.question.fr}
              </span>
              {openItems.has(faq.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openItems.has(faq.id) && (
              <div className="px-6 pb-4">
                <div className="text-gray-700 leading-relaxed">
                  {faq.answer[language as keyof typeof faq.answer] || faq.answer.fr}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
