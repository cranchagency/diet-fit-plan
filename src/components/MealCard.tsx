import React from 'react';

interface MealCardProps {
  title: string;
  calories: string;
  time: string;
  macros: string;
  image: string;
}

const MealCard: React.FC<MealCardProps> = ({
  title,
  calories,
  time,
  macros,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="aspect-video relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">{calories}</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{time}</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">БЖУ: {macros}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;