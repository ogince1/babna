import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { moroccanTags, getAllCategories, Tag } from '../../data/tags';

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagsChange,
  placeholder = 'Sélectionner des attractions...',
  maxTags = 10
}) => {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = getAllCategories();

  // Filtrer les tags selon la recherche et la catégorie
  const filteredTags = moroccanTags.filter(tag => {
    const matchesSearch = 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.nameAr.includes(searchQuery) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tag.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else if (selectedTags.length < maxTags) {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    onTagsChange(selectedTags.filter(id => id !== tagId));
  };

  const getSelectedTagNames = () => {
    return selectedTags.map(tagId => {
      const tag = moroccanTags.find(t => t.id === tagId);
      return language === 'ar' ? tag?.nameAr : tag?.name;
    }).filter(Boolean);
  };

  return (
    <div className="relative">
      {/* Affichage des tags sélectionnés */}
      <div className="min-h-[44px] border border-gray-300 rounded-lg p-2 bg-white">
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tagId => {
            const tag = moroccanTags.find(t => t.id === tagId);
            if (!tag) return null;
            
            return (
              <span
                key={tagId}
                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-md"
              >
                <span>{tag.icon}</span>
                <span>{language === 'ar' ? tag.nameAr : tag.name}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tagId)}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            );
          })}
          
          {selectedTags.length === 0 && (
            <span className="text-gray-500 text-sm">
              {placeholder}
            </span>
          )}
        </div>
      </div>

      {/* Bouton pour ouvrir le sélecteur */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <Search size={16} />
      </button>

      {/* Dropdown du sélecteur */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
          {/* Barre de recherche */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث عن المعالم...' : 'Rechercher des attractions...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div className="p-3 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedCategory === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? 'الكل' : 'Toutes'}
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {language === 'ar' 
                    ? moroccanTags.find(t => t.category === category)?.categoryAr 
                    : category
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Liste des tags */}
          <div className="max-h-64 overflow-y-auto">
            {filteredTags.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {language === 'ar' ? 'لا توجد نتائج' : 'Aucun résultat'}
              </div>
            ) : (
              <div className="p-2">
                {filteredTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagToggle(tag.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                      selectedTags.includes(tag.id) ? 'bg-orange-50 border border-orange-200' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{tag.icon}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          {language === 'ar' ? tag.nameAr : tag.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === 'ar' ? tag.categoryAr : tag.category}
                        </div>
                      </div>
                    </div>
                    {selectedTags.includes(tag.id) && (
                      <Check className="text-orange-500" size={16} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Indicateur du nombre de tags sélectionnés */}
          {selectedTags.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                {language === 'ar' 
                  ? `${selectedTags.length} من ${maxTags} معلم مختار`
                  : `${selectedTags.length} sur ${maxTags} attractions sélectionnées`
                }
              </div>
            </div>
          )}
        </div>
      )}

      {/* Overlay pour fermer le dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TagSelector;
