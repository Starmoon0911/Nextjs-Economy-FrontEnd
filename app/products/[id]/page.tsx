'use client';
import { useEffect, useState } from 'react';
import getProducts from '@/actions/product/getProducts';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // 引入 shadcn Skeleton
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import '@/app/globals.css';
import { ProductPageProps } from '@/pages/product/[id]';
import { useAuth } from '@/context/useAuth';
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

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
    <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">未找到此商品</p>
    <a href="/" className="text-blue-500 hover:underline">回首頁</a>
  </div>
);

const ProductPage = ({ productId_ }: ProductPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNotFound, setisNotFound] = useState<boolean>(false);
  const { user } = useAuth();
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split('/').pop();
    setProductId(id || null);
  }, []);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProducts({ id: productId });
      const product = data?.data;
      setProduct(product);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-10 min-h-screen">
        {/* Skeleton for the image carousel */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="md:w-2/5">
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
          <div className="flex-grow bg-gray-50 dark:bg-gray-700 shadow-lg rounded-lg p-6">
            {/* Skeleton for product info */}
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Skeleton for product details */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!product || isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto p-6 space-y-10 min-h-screen">
      {/* 上方主內容 */}
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* 商品圖片輪播 */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg md:w-2/5 overflow-hidden">
          <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} className="object-cover w-full h-96" alt={product.name} />
              </div>
            ))}
          </Carousel>
        </div>

        {/* 商品資訊 */}
        <div className="flex-grow bg-gray-50 dark:bg-gray-700 shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-500 font-semibold mb-4">${product.price}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          <div className="flex justify-center">
            <Button
              variant={'outline'}
              className="w-full py-6 mt-6 rounded-lg font-semibold transition"
            >
              現在購買! {user ? `-你有${user.balance}元` : '- (尚未登入)'}
            </Button>
          </div>
        </div>
      </div>

      {/* 商品詳細內容 */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">商品詳情</h2>
        <MdPreview className='bg-transparent' previewTheme='transparent' theme='dark' value={product.content} />
      </div>
    </div>
  );
};

export default ProductPage;
