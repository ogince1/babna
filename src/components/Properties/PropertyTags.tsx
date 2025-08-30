import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTagById } from '../../data/tags';

interface PropertyTagsProps {
  tagIds: string[];
  maxDisplay?: number;
  showAll?: boolean;
}

const PropertyTags: React.FC<PropertyTagsProps> = ({
  tagIds,
  maxDisplay = 3,
  showAll = false
}) => {
  const { language } = useApp();

  if (!tagIds || tagIds.length === 0) {
    return null;
  }

  const tagsToDisplay = showAll ? tagIds : tagIds.slice(0, maxDisplay);
  const remainingCount = tagIds.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-1">
      {tagsToDisplay.map(tagId => {
        const tag = getTagById(tagId);
        if (!tag) return null;

        return (
          <span
            key={tagId}
            className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-md font-medium"
            title={language === 'ar' ? tag.descriptionAr : tag.description}
          >
            <span>{tag.icon}</span>
            <span>{language === 'ar' ? tag.nameAr : tag.name}</span>
          </span>
        );
      })}
      
      {!showAll && remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
          +{remainingCount} {language === 'ar' ? 'أخرى' : 'autres'}
        </span>
      )}
    </div>
  );
};

export default PropertyTags;
