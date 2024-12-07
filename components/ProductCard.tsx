"use client";

import React, { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical } from "lucide-react";
import getProducts from "@/actions/product/getProducts";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  admin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, admin }) => (
  <div className="flex flex-col rounded-lg shadow-md bg-card text-card-foreground overflow-hidden min-w-[200px] max-w-sm h-full relative">
    <AspectRatio ratio={16 / 9} className="relative">
      <img
        className="object-cover w-full h-full"
        src={product.images[0]?.replace(/\\/g, "/")}
        alt={product.name}
      />
    </AspectRatio>
    <div className="p-4 flex flex-col flex-grow">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-muted-foreground flex-grow mb-4">
        {product.description}
      </p>
      <div className="text-base font-medium mt-auto">${product.price}</div>
    </div>
    {admin && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>編輯</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">刪除</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
);

interface ProductListProps {
  admin?: boolean;
  limit?: number;
}

const ProductList: React.FC<ProductListProps> = ({ admin, limit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedData = await getProducts({ limit });
      setProducts(fetchedData.data || []);
      setLoading(false);
    }
    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-lg shadow-md bg-card text-card-foreground overflow-hidden min-w-[200px] h-full relative"
          >
            <AspectRatio ratio={16 / 9}>
              <Skeleton className="w-full h-full" />
            </AspectRatio>
            <div className="p-4 flex flex-col flex-grow">
              <Skeleton className="h-6 w-[250px] mb-4" />
              <Skeleton className="h-4 w-[200px] mb-2" />
              <Skeleton className="h-6 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} admin={admin} />
      ))}
    </div>
  );
};

export default ProductList;
