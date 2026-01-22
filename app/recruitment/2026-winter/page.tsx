"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import { motion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { MouseTrail } from "@/components/mouse-trail"
import { TerminalButton } from "@/components/terminal-button"
import SpotlightCard from "@/components/spotlight-card"
import {
    User,
    Award,
    Users,
    UserPlus,
    Code,
    Shield,
    Terminal,
    Lock,
    FileText,
    Cpu,
    Database,
    Network,
    Calendar,
    BookOpen,
    Target,
    ChevronRight,
    Globe,
    Key,
    Binary,
    Cpu as Chip,
    FileQuestion,
    Home,
    Archive
} from "lucide-react"
import { RandomTitle } from "@/components/random-title"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { CyberParticles } from "@/components/cyber-particles"
import { CoordinateAxis3D } from "@/components/coordinate-axis-3d"
import { useMediaQuery } from "@/hooks/use-media-query"
import { BackgroundDecoration } from "@/components/background-decoration"
import { LastUpdated } from "@/components/last-updated"
import { Footer } from "@/components/footer"

// Decorative text component
const DecorativeText = memo(function DecorativeText({
    text,
    className,
    delay = 0,
    size = "sm",
    color = "text-var-color-5",
    factor = 0.3,
}: {
    text: string
    className?: string
    delay?: number
    size?: "xs" | "sm" | "md" | "lg"
    color?: string
    factor?: number
}) {
    const sizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
    }

    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = document.documentElement.getBoundingClientRect();

            const x = (clientX - left) / width * 2 - 1;
            const y = (clientY - top) / height * 2 - 1;

            const translateX = x * factor * 150;
            const translateY = y * factor * 150;

            element.style.transform = `translate(${translateX}px, ${translateY}px)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [factor]);

    return (
        <motion.div
            ref={elementRef}
            className={`font-mono opacity-30 ${sizeClasses[size]} ${color} ${className} transition-transform duration-700 ease-out`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay, duration: 0.8 }}
        >
            {text}
        </motion.div>
    )
})

// Interactive Button
const InteractiveButton = memo(function InteractiveButton({
    icon: Icon,
    label,
    onClick,
    delay = 0,
    className,
    isAccent = false,
}: {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    label: string
    onClick: () => void
    delay?: number
    className?: string
    isAccent?: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const controls = useAnimation()

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return
        const rect = buttonRef.current.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    const handleClick = () => {
        setIsPressed(true)
        setTimeout(() => {
            setIsPressed(false)
            onClick()
        }, 200)
    }

    useEffect(() => {
        if (isHovered) {
            controls.start({ scale: 1.05 })
        } else {
            controls.start({ scale: 1 })
        }
    }, [isHovered, controls])

    return (
        <motion.button
            ref={buttonRef}
            className={`group relative flex items-center space-x-2 rounded-md border-2 ${isAccent ? 'border-var-color-5 bg-var-color-5 hover:bg-var-color-5/80 text-white' : 'border-var-color-5/50 bg-var-color-3/70 hover:bg-var-color-4/50 text-black'} px-6 py-3 shadow-md transition-colors overflow-hidden min-w-[120px] justify-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            {isPressed && (
                <motion.span
                    className="absolute rounded-full bg-var-color-5/20"
                    initial={{ width: 0, height: 0, x: mousePosition.x, y: mousePosition.y, opacity: 1 }}
                    animate={{ width: 300, height: 300, x: mousePosition.x - 150, y: mousePosition.y - 150, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            )}

            <div
                className="absolute inset-0 bg-var-color-5/20 rounded-md opacity-0 transition-opacity duration-200"
                style={{ opacity: isHovered ? 1 : 0 }}
            />

            {isHovered && (
                <div
                    className="absolute bg-white/30 rounded-full blur-md pointer-events-none"
                    style={{
                        width: 80,
                        height: 80,
                        left: mousePosition.x - 40,
                        top: mousePosition.y - 40,
                        transition: "transform 0.05s linear",
                    }}
                />
            )}

            <Icon
                className={`h-5 w-5 ${isAccent ? 'text-white' : 'text-var-color-5'} transition-transform duration-300`}
                style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            />
            <span className={`relative z-10 font-medium ${isAccent ? 'text-white' : 'text-black'}`}>{label}</span>
        </motion.button>
    )
})

// Decorative elements
const DecorativeElements = memo(function DecorativeElements() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = Array.from(container.querySelectorAll('.decorative-element'));

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();

            const x = (clientX - left) / width * 2 - 1;
            const y = (clientY - top) / height * 2 - 1;

            elements.forEach((element, index) => {
                const factor = 0.2 + index * 0.01;
                const translateX = x * factor * 100;
                const translateY = y * factor * 100;
                (element as HTMLDivElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="fixed left-10 top-20 opacity-20 pointer-events-none decorative-element transition-transform duration-700 ease-out">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 1 }}>
                    <Shield className="h-24 w-24 text-var-color-5" />
                </motion.div>
            </div>
            <div className="fixed right-20 bottom-32 opacity-20 pointer-events-none decorative-element transition-transform duration-700 ease-out">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, duration: 1 }}>
                    <Lock className="h-20 w-20 text-var-color-5" />
                </motion.div>
            </div>
        </div>
    )
})

const AnimatedBackground = memo(function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f5] to-[#e8e8f0]"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-var-color-5/20 blur-[100px] animate-float-slow"></div>
                <div className="absolute bottom-1/3 right-1/3 w-[30vw] h-[30vw] rounded-full bg-var-color-4/20 blur-[80px] animate-float-medium"></div>
                <div className="absolute top-2/3 right-1/4 w-[25vw] h-[25vw] rounded-full bg-var-color-3/30 blur-[60px] animate-float-fast"></div>
            </div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiM2YjZiZmYwNSIgZmlsbC1vcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNMzAgMGgzMHYzMEgzMHpNMCAwaDMwdjMwSDB6IiBmaWxsPSIjNmI2YmZmMDUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        </div>
    )
})

export default function Recruitment2026Page() {
    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const mousePositionRef = useRef(mousePosition)
    const rafRef = useRef<number | undefined>(undefined)
    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        setLoaded(true)

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            mousePositionRef.current = {
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5,
            }
        }

        const updateMousePosition = () => {
            setMousePosition(mousePositionRef.current)
            rafRef.current = requestAnimationFrame(updateMousePosition)
        }

        window.addEventListener("mousemove", handleMouseMove)
        rafRef.current = requestAnimationFrame(updateMousePosition)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [])

    const schedule = [
        { date: "1.13", course: "DEV第一节", content: "各个方向都能听的基础课（python/web/数据库）", teacher: "CFIT" },
        { date: "1.14", course: "WEB第一节", content: "RCE", teacher: "bx33661" },
        { date: "1.15", course: "Cry第一节", content: "古典+数论", teacher: "wyyaxqy" },
        { date: "1.16", course: "pwn第一节", content: "二进制基础与工具使用", teacher: "iamorange" },
        { date: "1.17", course: "Misc第一节", content: "各种隐写", teacher: "amino" },
        { date: "1.18", course: "WEB第二节", content: "php常见漏洞", teacher: "unjoke" },
        { date: "1.19", course: "Cry第二节", content: "对称密码DES", teacher: "万事" },
        { date: "1.20", course: "Re第一节", content: "安卓逆向", teacher: "re-shiu" },
        { date: "1.21", course: "re第二节", content: "花指令与SMC", teacher: "flag{SuperTag}" },
        { date: "1.22", course: "WEB第三节", content: "Python相关SSTI知识", teacher: "Ewoji" },
        { date: "1.23", course: "Cry第三节", content: "公钥密码RSA", teacher: "Eleven" },
        { date: "1.24", course: "pwn第二节", content: "栈溢出基础", teacher: "AndreiLavig" },
        { date: "1.25", course: "pwn第三节", content: "基础栈溢出", teacher: "AndreiLavig" },
        { date: "1.26", course: "WEB第四节", content: "SQL注入", teacher: "orxiain." },
    ]

    const directions = [
        {
            name: "WEB方向",
            icon: Globe,
            items: [
                { text: "WEB 课前准备", link: "/docs/web/preparation" },
                { text: "WEB 方向指北", link: "/docs/web/guidance" },
                { text: "WEB 课前预热", link: "/docs/web/lesson" },
                { text: "PHP语言的漏洞", link: "/docs/web/PHP%E8%AF%AD%E8%A8%80%E7%9A%84%E6%BC%8F%E6%B4%9E" }
            ]
        },
        {
            name: "Pwn方向",
            icon: Chip,
            items: [
                { text: "Pwn 课前准备", link: "/docs/pwn/preparation" },
                { text: "Pwn 第一节课讲义", link: "/docs/pwn/lesson-1" }
            ]
        },
        {
            name: "Crypto方向",
            icon: Key,
            items: [
                { text: "Crypto 课前准备", link: "/docs/crypto/preparation" },
                { text: "Crypto 第一节课讲义", link: "/docs/crypto/lesson-1" },
                { text: "Crypto 第二节课讲义", link: "/docs/crypto/lesson-2" }
            ]
        },
        {
            name: "Reverse方向",
            icon: Binary,
            items: [
                { text: "Reverse 课前准备", link: "/docs/reverse/preparation" },
                { text: "Reverse 第二节课讲义", link: "/docs/reverse/lesson2/lesson2" }
            ]
        },
        {
            name: "MISC方向",
            icon: FileQuestion,
            items: [
                { text: "MISC 课前准备", link: "/docs/misc/preparation" },
                { text: "MISC 第一节课讲义", link: "/docs/misc/lesson-1" }
            ]
        },
    ]

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f0f0f5] text-black select-none">
            <MouseTrail />
            <TerminalButton />
            <CyberParticles />
            <BackgroundDecoration />
            <AnimatedBackground />
            <DecorativeElements />

            {!isMobile && (
                <>
                    <DecorativeText text="#!/bin/training" className="absolute top-12 left-8 transform -rotate-6" color="text-var-color-4" delay={0.5} factor={0.04} />
                    <DecorativeText text="function learn() { /* ... */ }" className="absolute bottom-32 right-16 transform rotate-3" color="text-var-color-5" delay={0.7} factor={0.05} />
                </>
            )}

            <div
                ref={containerRef}
                className="relative z-10 flex flex-col min-h-screen px-4 py-8 md:px-12 lg:px-20 overflow-y-auto"
                style={{
                    backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50}%, rgba(163, 163, 255, 0.1), transparent 70%)`,
                }}
            >
                {/* Header Section */}
                <motion.div
                    className="mt-12 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <InteractiveButton
                            icon={Home}
                            label="返回首页"
                            onClick={() => router.push('/')}
                            className="w-auto px-4 py-2 text-sm"
                        />
                    </div>
                    <RandomTitle
                        text="HnuSec 2026 Winter Training"
                        className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
                    />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-var-color-5">2026 冬季培训归档 ❄️</h2>
                </motion.div>

                {/* Overview content */}
                <SpotlightCard
                    className="mb-12 p-6 rounded-lg border border-var-color-5/30 bg-white/50 backdrop-blur-sm shadow-lg"
                    spotlightColor="rgba(107, 107, 255, 0.15)"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="flex items-center mb-4">
                            <BookOpen className="w-6 h-6 mr-2 text-var-color-5" />
                            <h3 className="text-xl font-bold">培训概述</h3>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-800">
                            本次冬季培训预计于 <span className="font-bold text-var-color-5">2026年1月</span> 举行。培训面向海南大学24级、25级全体学生，涵盖了CTF相关的WEB、PWN、REV、CRY、MISC五个方向，旨在提升同学们的网络安全实战技能。
                        </p>
                    </motion.div>
                </SpotlightCard>

                {/* Schedule */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex items-center mb-6">
                        <Calendar className="w-6 h-6 mr-2 text-var-color-5" />
                        <h3 className="text-xl font-bold">课程安排回顾</h3>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-var-color-5/20 shadow-xl bg-white/40 backdrop-blur-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-var-color-5/10 border-b border-var-color-5/20">
                                    <th className="p-4 font-bold text-var-color-5">日期</th>
                                    <th className="p-4 font-bold text-var-color-5">课程安排</th>
                                    <th className="p-4 font-bold text-var-color-5">内容大纲</th>
                                    <th className="p-4 font-bold text-var-color-5">讲师</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-var-color-5/10 hover:bg-var-color-5/5 transition-colors"
                                    >
                                        <td className="p-4 font-mono">{item.date}</td>
                                        <td className="p-4 font-bold">{item.course}</td>
                                        <td className="p-4 text-sm md:text-base">{item.content}</td>
                                        <td className="p-4 font-mono text-var-color-4">{item.teacher}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Directions / Materials */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="flex items-center mb-6">
                        <Target className="w-6 h-6 mr-2 text-var-color-5" />
                        <h3 className="text-xl font-bold">课程资料</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {directions.map((dir, idx) => (
                            <SpotlightCard
                                key={idx}
                                className="p-6 rounded-lg border border-var-color-5/20 bg-white/40 shadow-md"
                                spotlightColor="rgba(107, 107, 255, 0.15)"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="h-full group"
                                >
                                    <div className="flex items-center mb-4 pb-2 border-b border-var-color-5/10">
                                        <dir.icon className="w-6 h-6 mr-3 text-var-color-5 group-hover:scale-110 transition-transform" />
                                        <h4 className="font-bold text-lg">{dir.name}</h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {dir.items.map((item, i) => (
                                            <li key={i}>
                                                <a
                                                    href={item.link}
                                                    className="flex items-center text-sm text-gray-700 hover:text-var-color-5 cursor-pointer transition-colors"
                                                >
                                                    <ChevronRight className="w-3 h-3 mr-1 opacity-50" />
                                                    <span>{item.text}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <SpotlightCard
                    className="mb-8 p-8 rounded-2xl border border-var-color-5/20 bg-gradient-to-r from-var-color-5/10 to-var-color-4/10 backdrop-blur-sm shadow-lg text-center"
                    spotlightColor="rgba(107, 107, 255, 0.15)"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">对网络安全感兴趣？</h3>
                        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                            HnuSec 欢迎所有对网络安全充满热情的同学加入！无论你是零基础还是有经验，这里都有适合你的学习资源。
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/terminal"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-var-color-5 text-white rounded-lg hover:bg-var-color-5/90 transition-colors font-medium"
                            >
                                <Users className="w-4 h-4" />
                                联系我们
                            </a>
                            <a
                                href="/archives"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-var-color-5/30 text-var-color-5 rounded-lg hover:bg-var-color-5/5 transition-colors font-medium"
                            >
                                <Archive className="w-4 h-4" />
                                历届培训归档
                            </a>
                        </div>
                    </motion.div>
                </SpotlightCard>

                <Footer />
            </div>
        </main >
    )
}
