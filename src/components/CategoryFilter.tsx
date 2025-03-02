import React from 'react';

interface CategoryFilterProps {
  categories: { id: string; name: string; }[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-16">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-6 py-3 rounded-xl transition-all ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'glass-effect text-gray-300 hover:bg-white/20'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter; 