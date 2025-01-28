'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDown,ArrowUpRight } from 'lucide-react';
import getProducts from '@/actions/product/getProducts';

import { ClipboardIcon, CheckIcon } from "lucide-react"
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  tags: string[]; // Array of tags (strings)
  images: string[]; // Array of image URLs (strings)
  content: string;
  comments: []; // Array of comments (you can specify the structure of a comment if needed)
  createdAt: string;
  updatedAt: string;
  __v: number; // Version key, typically used by MongoDB
}

export default function Home() {
  const productSectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[] | null>(null); // 修正 useState
  const ServerIP = "tech.alien-do.com".trim()
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({});
        setProducts(response.data); // 確保資料正確設定
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);


  const copyText = () => {
    navigator.clipboard.writeText(ServerIP)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative bg-black">
        <Image
          src="/static/Background.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
        <h1 className="text-7xl font-bold text-center text-white relative z-10">
          Aliendo Server
        </h1>
        <p

          className="text-gray-400">版本1.21.x</p>
        <div className="flex flex-inline space-x-4 items-center mt-4 z-10">
          <a
            href="https://forum.gamer.com.tw/C.php?bsn=18673&snA=202949&subbsn=18&page=1&s_author=&gothis=1084538#1084538"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" className="flex items-center space-x-2">
              <span>更多資訊</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </a>

          <div className="flex items-center space-x-2">
            <p

              className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              IP - {ServerIP}
              <Button
                size="icon"
                variant="ghost"
                className="relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
                onClick={copyText}
              >
                {hasCopied ? <CheckIcon className="h-3 w-3" /> : <ClipboardIcon className="h-3 w-3 text-gray-600 dark:text-white" />}
                <span className="sr-only">Copy</span>
              </Button>
            </p>
          </div>
        </div>

        <button
          onClick={() => productSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition relative z-10"
        >
          <ArrowDown className="w-10 h-10 animate-bounce text-white" />
        </button>
      </section>

      {/* Product Section */}
      <section ref={productSectionRef} className="p-6">
        <h2 className="text-4xl font-bold mb-6 text-center">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products ? (
            products.map((product) => (
              <Card key={product._id} className="bg-card shadow-lg max-w-[260px] min-h-[270px]">
                <CardHeader className="-m-6">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={product.images[0] ? `${process.env.NEXT_PUBLIC_BackEndURL}${product.images?.[0]?.replace(/\\/g, '/')} : `${process.env.NEXT_PUBLIC_BackEndURL}/upload/default/NoImage.jpg`}
                      alt={product.name}
                      className="object-cover w-full h-[200px] rounded-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="mt-2 text-2xl font-semibold">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {product.description.length > 30 ? product.description.slice(0, 30) + '...' : product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="relative h-16 flex items-center justify-between">
                  <div className="text-lg font-medium">
                    {product.price === 0 ? 'FREE' : `$${product.price}`}
                  </div>
                  <Link href={`/products/${product._id}`}>
                    <Button variant="outline">View</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center">Loading products...</p>
          )}
        </div>
      </section>
    </div>
  );
}
