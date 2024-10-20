import React from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, description, price }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-900 flex flex-col h-full">
      <AspectRatio ratio={16 / 9} className="relative">
        <img className="object-cover w-full h-full" src={imageSrc} alt={title} />
      </AspectRatio>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4 flex-grow">{description}</p>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-auto">{price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
