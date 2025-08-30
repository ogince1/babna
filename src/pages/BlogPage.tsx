import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { contentService } from '../services/contentService';
import { BlogPost } from '../types/content';
import MultilingualMeta from '../components/SEO/MultilingualMeta';
import Breadcrumbs from '../components/SEO/Breadcrumbs';

const BlogPage: React.FC = () => {
  const { language } = useApp();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const loadBlogPosts = async () => {
      setLoading(true);
      try {
        const category = selectedCategory === 'all' ? undefined : selectedCategory;
        const data = await contentService.getBlogPosts(category, 12);
        setBlogPosts(data);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', name: { fr: 'Tous', ar: 'الكل', en: 'All', es: 'Todos' } },
    { id: 'travel', name: { fr: 'Voyage', ar: 'سفر', en: 'Travel', es: 'Viajes' } },
    { id: 'culture', name: { fr: 'Culture', ar: 'ثقافة', en: 'Culture', es: 'Cultura' } },
    { id: 'tips', name: { fr: 'Conseils', ar: 'نصائح', en: 'Tips', es: 'Consejos' } },
    { id: 'news', name: { fr: 'Actualités', ar: 'أخبار', en: 'News', es: 'Noticias' } }
  ];

  const seoData = {
    title: language === 'ar' 
      ? 'مدونة السفر في المغرب | نصائح وثقافة'
      : language === 'en'
      ? 'Morocco Travel Blog | Tips & Culture'
      : language === 'es'
      ? 'Blog de Viajes en Marruecos | Consejos y Cultura'
      : 'Blog de voyage au Maroc | Conseils et culture',
    description: language === 'ar'
      ? 'اكتشف أفضل النصائح والثقافة المغربية من خلال مدونتنا. دليل شامل للسفر في المغرب.'
      : language === 'en'
      ? 'Discover the best tips and Moroccan culture through our blog. Complete guide to traveling in Morocco.'
      : language === 'es'
      ? 'Descubre los mejores consejos y la cultura marroquí a través de nuestro blog. Guía completa para viajar en Marruecos.'
      : 'Découvrez les meilleurs conseils et la culture marocaine à travers notre blog. Guide complet pour voyager au Maroc.',
    keywords: language === 'ar'
      ? 'مدونة المغرب, نصائح السفر, الثقافة المغربية, السياحة في المغرب'
      : language === 'en'
      ? 'Morocco blog, travel tips, Moroccan culture, tourism Morocco'
      : language === 'es'
      ? 'blog Marruecos, consejos viaje, cultura marroquí, turismo Marruecos'
      : 'blog Maroc, conseils voyage, culture marocaine, tourisme Maroc'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    const locales = {
      fr: 'fr-FR',
      ar: 'ar-MA',
      en: 'en-US',
      es: 'es-ES'
    };

    return date.toLocaleDateString(locales[language as keyof typeof locales] || 'fr-FR', options);
  };

  if (loading) {
    return (
      <>
        <MultilingualMeta
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          canonical="/blog"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs />
          
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MultilingualMeta
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/blog"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'مدونة السفر' : 
             language === 'en' ? 'Travel Blog' : 
             language === 'es' ? 'Blog de Viajes' : 
             'Blog de voyage'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' ? 'اكتشف المغرب من خلال مقالاتنا المميزة' : 
             language === 'en' ? 'Discover Morocco through our featured articles' : 
             language === 'es' ? 'Descubre Marruecos a través de nuestros artículos destacados' : 
             'Découvrez le Maroc à travers nos articles de qualité'}
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name[language as keyof typeof category.name] || category.name.fr}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'لا توجد مقالات متاحة' : 
               language === 'en' ? 'No articles available' : 
               language === 'es' ? 'No hay artículos disponibles' : 
               'Aucun article disponible'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'Revenez bientôt pour de nouveaux articles' : 
               language === 'en' ? 'Come back soon for new articles' : 
               language === 'es' ? 'Vuelve pronto para nuevos artículos' : 
               'Revenez bientôt pour de nouveaux articles'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={post.featuredImage}
                  alt={post.title[language as keyof typeof post.title] || post.title.fr}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title[language as keyof typeof post.title] || post.title.fr}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.fr}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {post.category}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      {language === 'ar' ? 'اقرأ المزيد' : 
                       language === 'en' ? 'Read more' : 
                       language === 'es' ? 'Leer más' : 
                       'Lire la suite'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
