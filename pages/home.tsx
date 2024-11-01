'use client'
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowDown, ClipboardIcon, CheckIcon } from "lucide-react"
import AboutUsProfile from "@/components/AbuoutUsProfile"
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const heroSectionRef = useRef<HTMLDivElement>(null)
    const aboutUsRef = useRef<HTMLDivElement>(null)
    const copyRef = useRef<HTMLParagraphElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const infoButtonRef = useRef<HTMLAnchorElement>(null)
    const verstionRef = useRef<HTMLParagraphElement>(null)
    const ServerIP = "tech.alien-do.com".trim()
    const [hasCopied, setHasCopied] = useState(false)

    // 初始化 Lenis 平滑滾動
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
        })

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => lenis.destroy()
    }, [])

    // gsap 動畫效果
    useEffect(() => {
        // Hero Section 標題動畫
        gsap.fromTo(
            [titleRef.current,verstionRef.current],
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.3,
                delay:0.3,
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            }
        )

        // 按鈕動畫（逐個顯示）
        gsap.fromTo(
            infoButtonRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        )

        gsap.fromTo(
            copyRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.7,
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        )
    }, [])

    // 複製文字功能
    const copyText = () => {
        navigator.clipboard.writeText(ServerIP)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section ref={heroSectionRef} className="h-screen flex flex-col items-center justify-center relative bg-black">
                <Image
                    src="/static/Background.png"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-30"
                />
                <h1 ref={titleRef} className="text-7xl font-bold text-center text-white relative z-10">
                    Aliendo Server
                </h1>
                <p
                    ref={verstionRef}
                    className="text-gray-400">版本1.21.x</p>
                <div className="flex flex-inline space-x-4 items-center mt-4 z-10">
                    <a
                        ref={infoButtonRef}
                        href="https://forum.gamer.com.tw/C.php?bsn=18673&snA=202949&subbsn=18&page=1&s_author=&gothis=1084538#1084538"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="default">更多資訊</Button>
                    </a>
                    <div className="flex items-center space-x-2">
                        <p
                            ref={copyRef}
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
                    onClick={() => aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-8 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition relative z-10"
                >
                    <ArrowDown className="w-10 h-10 animate-bounce" />
                </button>
            </section>

            {/* About Us Section */}
            <section ref={aboutUsRef} className="py-16 bg-gray-100 dark:bg-gray-900">
                <div className="w-full px-4">
                    <AboutUsProfile avatarURL="/static/avatar.png" name="Developer 1" desc="The <Command /> component uses the cmdk component by pacocoursey." />
                    <AboutUsProfile avatarURL="/static/avatar.png" name="Developer 2" desc="The <Command /> component uses the cmdk component by pacocoursey." right />
                </div>
            </section>
        </div>
    )
}
