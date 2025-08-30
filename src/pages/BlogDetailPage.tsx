import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { contentService } from '../services/contentService';
import { BlogPost } from '../types/content';
import MultilingualMeta from '../components/SEO/MultilingualMeta';
import Breadcrumbs from '../components/SEO/Breadcrumbs';

const BlogDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadBlogPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        // Récupérer l'article principal
        const postData = await contentService.getBlogPostById(postId);
        setPost(postData);
        
        // Récupérer des articles similaires
        const related = await contentService.getBlogPosts(postData.category, 3);
        setRelatedPosts(related.filter(p => p.id !== postId));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [postId]);

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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title[language as keyof typeof post.title] || post?.title.fr,
        text: post?.excerpt[language as keyof typeof post.excerpt] || post?.excerpt.fr,
        url: window.location.href
      });
    } else {
      // Fallback: copier l'URL
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'ar' ? 'تم نسخ الرابط' : 'Lien copié !');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'المقال غير موجود' : 
             language === 'en' ? 'Article not found' : 
             language === 'es' ? 'Artículo no encontrado' : 
             'Article non trouvé'}
          </h1>
          <button
            onClick={() => navigate('/blog')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {language === 'ar' ? 'العودة إلى المدونة' : 
             language === 'en' ? 'Back to blog' : 
             language === 'es' ? 'Volver al blog' : 
             'Retour au blog'}
          </button>
        </div>
      </div>
    );
  }

  const seoData = {
    title: `${post.title[language as keyof typeof post.title] || post.title.fr} | Babna.ma`,
    description: post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.fr,
    keywords: post.keywords?.[language as keyof typeof post.keywords] || post.keywords?.fr || '',
    canonical: `/blog/${postId}`
  };

  return (
    <>
      <MultilingualMeta
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={seoData.canonical}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        {/* Header avec bouton retour */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>
              {language === 'ar' ? 'العودة إلى المدونة' : 
               language === 'en' ? 'Back to blog' : 
               language === 'es' ? 'Volver al blog' : 
               'Retour au blog'}
            </span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Article principal */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image principale */}
          <img
            src={post.featuredImage}
            alt={post.title[language as keyof typeof post.title] || post.title.fr}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            {/* Métadonnées */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.publishedAt)}</span>
              <span className="mx-2">•</span>
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <Tag className="h-4 w-4 mr-1" />
              <span className="capitalize">{post.category}</span>
            </div>
            
            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title[language as keyof typeof post.title] || post.title.fr}
            </h1>
            
            {/* Extrait */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt[language as keyof typeof post.excerpt] || post.excerpt.fr}
            </p>
            
            {/* Contenu */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.content[language as keyof typeof post.content] || post.content.fr}
              </div>
            </div>
          </div>
        </article>

        {/* Articles similaires */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'ar' ? 'مقالات مشابهة' : 
               language === 'en' ? 'Related articles' : 
               language === 'es' ? 'Artículos relacionados' : 
               'Articles similaires'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article 
                  key={relatedPost.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <img
                    src={relatedPost.featuredImage}
                    alt={relatedPost.title[language as keyof typeof relatedPost.title] || relatedPost.title.fr}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title[language as keyof typeof relatedPost.title] || relatedPost.title.fr}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt[language as keyof typeof relatedPost.excerpt] || relatedPost.excerpt.fr}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogDetailPage;
