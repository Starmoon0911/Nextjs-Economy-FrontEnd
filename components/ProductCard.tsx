import React from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  admin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, description, price, admin }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-900 flex flex-col h-full relative">
      <AspectRatio ratio={16 / 9} className="relative">
        <img className="object-cover w-full h-full" src={imageSrc} alt={title} />
      </AspectRatio>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4 flex-grow">{description}</p>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-auto">{price}</div>
      </div>

      {/* Admin dropdown menu */}
      {admin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20 bg-white p-2 dark:bg-gray-800 rounded-md shadow-lg transition-all duration-200">
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="px-4 py-2 cursor-pointer rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">編輯</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2  cursor-pointer rounded-sm hover:bg-red-500 dark:hover:bg-red-700 transition-colors">刪除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ProductCard;
