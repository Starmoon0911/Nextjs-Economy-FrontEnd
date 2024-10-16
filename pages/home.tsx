'use client'
import React, { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown } from "lucide-react"
import AboutUsProfile from "@/components/AbuoutUsProfile" // 引入 DeveloperProfile

export default function Home() {
    const productSectionRef = useRef<HTMLDivElement>(null)

    const scrollToProducts = () => {
        if (productSectionRef.current) {
            productSectionRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white">
                    Welcome to Our Shop
                </h1>
                <button onClick={scrollToProducts} className="mt-8 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition">
                    <ArrowDown className="w-10 h-10 animate-bounce" />
                </button>
            </section>

            {/* Product List Section */}
            <section ref={productSectionRef} className="bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Card key={i} className="bg-white dark:bg-gray-700">
                                <Image src={`https://via.placeholder.com/150?text=Product+${i + 1}`} alt={`Product ${i + 1}`} width={150} height={200} className="rounded-lg" />
                                <div className={`p-2`}>
                                    <h3 className="text-lg font-bold">Product {i + 1}</h3>
                                    <p className="text-sm">Product description here</p>
                                    <p className="text-lg font-bold">$29.99</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        <Link href="/products">
                            <Button variant="default">View More Products</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-16 bg-gray-100 dark:bg-gray-900">
                <div className="w-full px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">About Us</h2>
                    <div>
                        <AboutUsProfile
                            url="/static/avatar.png"
                            name="Developer 1"
                            description="The <Command /> component uses the cmdk component by pacocoursey."
                        />
                        <AboutUsProfile
                            url="/static/avatar.png"
                            name="Developer 2"
                            description="123456789101112131415161718192021222324252627282."
                            isRightAligned // 右側對齊
                        />
                        <AboutUsProfile
                            url="/static/avatar.png"
                            name="Developer 3"
                            description="."
                        />
                        <AboutUsProfile
                            url="/static/avatar.png"
                            name="Developer 4"
                            description=" cloud infrastructure."
                            isRightAligned // 右側對齊
                        />
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-2 bg-gray-800 dark:bg-gray-900 text-center text-white">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </footer>
        </div>
    )
}
