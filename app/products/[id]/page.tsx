'use client';

import { useEffect, useState } from 'react';
import getProducts from '@/actions/product/getProducts';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import '@/app/globals.css';
import { useAuth } from '@/context/useAuth';
import { useProduct } from '@/context/useProduct';
import { Input } from '@/components/ui/input';
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  tags: string[];
  images: string[];
  content: string;
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { buyProduct } = useProduct();
  const { user } = useAuth();

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split('/').pop();
    setProductId(id || null);
  }, []);

  const fetchProduct = async () => {
    if (!productId) return;
    setLoading(true);
    const data = await getProducts({ id: productId });
    const fetchedProduct = data?.data;
    setProduct(fetchedProduct);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    if (product && quantity + change > product.stock) return;
    setQuantity((prev) => Math.max(1, prev + change)); // 數量最小為1
  };

  const handleConfirmPurchase = async (): Promise<void> => {
    if (!product) return;
    const response = await buyProduct(product._id, quantity);
    if (response === 'success') {
      fetchProduct();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-10 min-h-screen">
        {/* Skeleton for the image carousel */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-2/5">
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
          <div className="flex-grow bg-gray-50 dark:bg-gray-700 shadow-lg rounded-lg p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">未找到此商品</p>
        <a href="/" className="text-blue-500 hover:underline">回首頁</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg md:w-2/5 overflow-hidden">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image ? image : `${process.env.NEXT_PUBLIC_BackEndURL}/upload/default/NoImage.jpg`} className="object-cover w-full h-96" alt={product.name} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex-grow bg-gray-50 dark:bg-gray-700 shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-500 font-semibold mb-4">${product.price}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center overflow-hidden">
              <p className="pr-1">數量:</p>
              <Button
                variant="outline"
                className="border-gray-500 border w-5 h-5 rounded-sm p-0 m-0 rounded-r-none bg-transparent flex items-center justify-center"
                onClick={() => handleQuantityChange(-1)}
              >
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">-</span>
              </Button>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border-gray-500 border w-5 h-5 rounded-none px-1 m-0 text-center bg-transparent text-xs font-semibold text-gray-900 dark:text-white"
              />
              <Button
                variant="outline"
                className="border-gray-500 border w-5 rounded-sm rounded-l-none h-5 p-0 m-0 bg-transparent flex items-center justify-center"
                onClick={() => handleQuantityChange(1)}
              >
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">+</span>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">庫存: {product.stock}</p>

            <Button
              variant="outline"
              onClick={() => handleConfirmPurchase()}
              className={`w-full py-6 mt-2 rounded-lg font-semibold transition ${user && user.balance - product.price * quantity >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
            >
              現在購買! {user ? `-剩餘${user.balance - product.price * quantity}元` : '- (尚未登入)'}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">商品詳情</h2>
        <MdPreview className="bg-transparent" previewTheme="transparent" theme="dark" value={product.content} />
      </div>
    </div>
  );
};

export default ProductPage;
