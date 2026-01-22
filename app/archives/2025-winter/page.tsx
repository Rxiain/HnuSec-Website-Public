"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import { motion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { MouseTrail } from "@/components/mouse-trail"
import { TerminalButton } from "@/components/terminal-button"
import {
    Archive,
    Calendar,
    BookOpen,
    Target,
    ChevronRight,
    Globe,
    Key,
    Binary,
    Cpu as Chip,
    FileQuestion,
    Snowflake,
    ArrowLeft
} from "lucide-react"
import { RandomTitle } from "@/components/random-title"
import { CyberParticles } from "@/components/cyber-particles"
import { BackgroundDecoration } from "@/components/background-decoration"
import { LastUpdated } from "@/components/last-updated"

// Reuse InteractiveButton
const InteractiveButton = memo(function InteractiveButton({
    icon: Icon,
    label,
    onClick,
    className,
    isAccent = false,
}: {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    label: string
    onClick: () => void
    className?: string
    isAccent?: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <motion.button
            className={`group relative flex items-center space-x-2 rounded-md border-2 ${isAccent ? 'border-var-color-5 bg-var-color-5 hover:bg-var-color-5/80 text-white' : 'border-var-color-5/50 bg-var-color-3/70 hover:bg-var-color-4/50 text-black'} px-6 py-3 shadow-md transition-colors overflow-hidden justify-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            <Icon className={`h-5 w-5 mr-2 ${isAccent ? 'text-white' : 'text-var-color-5'}`} />
            <span className={`font-medium ${isAccent ? 'text-white' : 'text-black'}`}>{label}</span>
        </motion.button>
    )
})

const AnimatedBackground = memo(function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f5] to-[#e8e8f0]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiM2YjZiZmYwNSIgZmlsbC1vcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNMzAgMGgzMHYzMEgzMHpNMCAwaDMwdjMwSDB6IiBmaWxsPSIjNmI2YmZmMDUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        </div>
    )
})

export default function Archive2025WinterPage() {
    const router = useRouter()
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width - 0.5,
                y: (e.clientY - rect.top) / rect.height - 0.5,
            })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
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
                { text: "WEB 课前准备", link: "/docs/archives/2025-winter/web/preparation" },
                { text: "WEB 方向指北", link: "/docs/archives/2025-winter/web/guidance" },
                { text: "WEB 课前预热", link: "/docs/archives/2025-winter/web/lesson" },
                { text: "PHP语言的漏洞", link: "/docs/archives/2025-winter/web/PHP%E8%AF%AD%E8%A8%80%E7%9A%84%E6%BC%8F%E6%B4%9E" }
            ]
        },
        {
            name: "Pwn方向",
            icon: Chip,
            items: [
                { text: "Pwn 课前准备", link: "/docs/archives/2025-winter/pwn/preparation" },
                { text: "Pwn 第一节课讲义", link: "/docs/archives/2025-winter/pwn/lesson-1" }
            ]
        },
        {
            name: "Crypto方向",
            icon: Key,
            items: [
                { text: "Crypto 课前准备", link: "/docs/archives/2025-winter/crypto/preparation" },
                { text: "Crypto 第一节课讲义", link: "/docs/archives/2025-winter/crypto/lesson-1" },
                { text: "Crypto 第二节课讲义", link: "/docs/archives/2025-winter/crypto/lesson-2" }
            ]
        },
        {
            name: "Reverse方向",
            icon: Binary,
            items: [
                { text: "Reverse 课前准备", link: "/docs/archives/2025-winter/reverse/preparation" },
                { text: "Reverse 第二节课讲义", link: "/docs/archives/2025-winter/reverse/lesson2/lesson2" }
            ]
        },
        {
            name: "MISC方向",
            icon: FileQuestion,
            items: [
                { text: "MISC 课前准备", link: "/docs/archives/2025-winter/misc/preparation" },
                { text: "MISC 第一节课讲义", link: "/docs/archives/2025-winter/misc/lesson-1" }
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

            <div
                ref={containerRef}
                className="relative z-10 flex flex-col min-h-screen px-4 py-8 md:px-12 lg:px-20 overflow-y-auto"
            >
                <motion.div
                    className="mt-12 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <RandomTitle
                        text="2025 Winter Training"
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold text-var-color-5 flex items-center mb-6">
                        <Snowflake className="mr-3 h-8 w-8" />
                        2025 冬季培训归档
                    </h2>
                    <div className="flex items-center gap-4">
                        <InteractiveButton
                            icon={ArrowLeft}
                            label="返回归档列表"
                            onClick={() => router.push('/archives')}
                            className="w-auto px-4 py-2 text-sm"
                        />
                    </div>
                </motion.div>

                {/* Overview content */}
                <motion.div
                    className="mb-12 p-6 rounded-lg border border-var-color-5/30 bg-white/50 backdrop-blur-sm shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="flex items-center mb-4">
                        <BookOpen className="w-6 h-6 mr-2 text-var-color-5" />
                        <h3 className="text-xl font-bold">培训概述</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-800">
                        本次冬季培训于2025年1月13日-2025年1月26日举行，为期14天。培训面向海南大学24级、25级全体学生，涵盖了CTF相关的WEB、PWN、REV、CRY、MISC五个方向。
                    </p>
                </motion.div>

                {/* Schedule */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex items-center mb-6">
                        <Calendar className="w-6 h-6 mr-2 text-var-color-5" />
                        <h3 className="text-xl font-bold">课程安排</h3>
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
                        <h3 className="text-xl font-bold">课程资料 Archive</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {directions.map((dir, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 rounded-lg border border-var-color-5/20 bg-white/40 hover:bg-white/60 transition-all shadow-md group"
                            >
                                <div className="flex items-center mb-4 pb-2 border-b border-var-color-5/10">
                                    <dir.icon className="w-6 h-6 mr-3 text-var-color-5" />
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
                        ))}
                    </div>
                </motion.div>

                <LastUpdated />
            </div>
        </main>
    )
}
