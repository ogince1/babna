import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { moroccanTags, getAllCategories } from '../../data/tags';

const TagsGrid: React.FC = () => {
  const { language } = useApp();
  const categories = getAllCategories();

  // Sélectionner quelques tags populaires pour chaque catégorie
  const popularTags = categories.map(category => {
    const categoryTags = moroccanTags.filter(tag => tag.category === category);
    return categoryTags.slice(0, 4); // Prendre les 4 premiers tags de chaque catégorie
  }).flat();

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'اكتشف المعالم السياحية' : 'Découvrez les attractions touristiques'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'ابحث عن شقق للكراء اليومي قرب أهم المعالم السياحية في المغرب'
              : language === 'en'
              ? 'Find daily apartment rentals near the main tourist attractions in Morocco'
              : language === 'es'
              ? 'Encuentra alquileres de apartamentos diarios cerca de las principales atracciones turísticas de Marruecos'
              : 'Trouvez des appartements à louer près des principales attractions touristiques du Maroc'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {popularTags.map(tag => (
            <Link
              key={tag.id}
              to={`/appartements/tag/${tag.id}`}
              className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-orange-300"
            >
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {tag.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-orange-600 transition-colors">
                  {language === 'ar' ? tag.nameAr : tag.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {language === 'ar' ? tag.categoryAr : tag.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/appartements"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            {language === 'ar' ? 'عرض جميع العقارات' : 'Voir tous les appartements'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TagsGrid;
