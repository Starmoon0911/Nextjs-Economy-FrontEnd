'use client'
import React, { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown } from "lucide-react"
import AboutUsProfile from "@/components/AbuoutUsProfile" // 引入 DeveloperProfile
import ProductCard from "@/components/ProductCard"

export default function Home() {
    const productSectionRef = useRef<HTMLDivElement>(null)

    // 滾動動畫函數
    const scrollToProducts = () => {
        const targetPosition = productSectionRef.current?.offsetTop || 0;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 滾動的總時間（毫秒）
        let start: number | null = null;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const scrollAmount = easeInOutCubic(progress, startPosition, distance, duration);
            window.scrollTo(0, scrollAmount);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    // 緩動函數 (easeInOutCubic)
    const easeInOutCubic = (time: number, start: number, change: number, duration: number) => {
        time /= duration / 2;
        if (time < 1) return (change / 2) * time * time * time + start;
        time -= 2;
        return (change / 2) * (time * time * time + 2) + start;
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Secti  on */}
            <section className="h-screen flex flex-col items-center justify-center relative bg-black">
                <Image
                    src="/static/Background.png"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                />
                <h1 className="text-5xl font-bold text-center text-white relative z-10">
                    Welcome to Our Shop
                </h1>
                <button
                    onClick={scrollToProducts}
                    className="mt-8 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition relative z-10"
                >
                    <ArrowDown className="w-10 h-10 animate-bounce text-white" />
                </button>
            </section>

            {/* About Us Section */}
            <section className="py-16 bg-gray-100 dark:bg-gray-900">
                <div className="w-full px-4">
                    <div>
                        <AboutUsProfile
                            avatarURL="/static/avatar.png"
                            name="Developer 1"
                            desc="The <Command /> component uses the cmdk component by pacocoursey."
                        />
                        <AboutUsProfile
                            avatarURL="/static/avatar.png"
                            name="Developer 1"
                            desc="The <Command /> component uses the cmdk component by pacocoursey."
                            right
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
