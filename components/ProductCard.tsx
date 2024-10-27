import React from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { MoreVertical } from 'lucide-react'; // 確保已安裝 lucide-react 或其他圖示庫

interface ProductCardProps {
  imageSrc: string;
  title: string;
  description: string;
  price: string;
  admin?: boolean; // 這裡將 admin 的預設值移除，因為不需要給它預設值
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
            <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <MoreVertical className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>編輯</DropdownMenuItem>
            <DropdownMenuItem>刪除</DropdownMenuItem>
            <DropdownMenuItem>其他操作</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ProductCard;
