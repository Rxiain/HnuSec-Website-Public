"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import { motion } from "framer-motion"
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
    Sun,
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

export default function Archive2024SummerPage() {
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
        { date: "8月1日", course: "WEB第一节", content: "Http基础及BurpSuite基本使用", teacher: "王致轩" },
        { date: "8月2日", course: "PWN/RE第一节", content: "汇编基础和ida工具基本使用", teacher: "陈骏帆" },
        { date: "8月3日", course: "WEB第二节", content: "初识RCE(远程命令执行)", teacher: "兰唐嘉" },
        { date: "8月4日", course: "MISC第一节", content: "misc介绍及基础", teacher: "汪明轩" },
        { date: "8月5日", course: "CRY第一节", content: "CTF密码方向简介及古典密码", teacher: "薛明诚" },
        { date: "8月6日", course: "PWN第二节", content: "系统调用和shellcode", teacher: "李沛繁" },
        { date: "8月7日", course: "RE第二节", content: "动态调试", teacher: "路人甲" },
        { date: "8月8日", course: "CRY第二节", content: "数论基础及RSA入门", teacher: "刘春磊" },
        { date: "8月9日", course: "MISC第二节", content: "常见隐写", teacher: "时渝焱" },
        { date: "8月10日", course: "WEB第三节", content: "php反序列化", teacher: "张蓝月" },
        { date: "8月11日", course: "PWN第三节", content: "动态链接和ret2libc", teacher: "陈颂智" },
        { date: "8月12日", course: "RE第三节", content: "内容深入", teacher: "路人甲" },
        { date: "8月13日", course: "CRY第三节", content: "对称密码入门", teacher: "李涵宇" },
        { date: "8月14日", course: "WEB第四节", content: "sql注入基础", teacher: "徐一洋" },
    ]

    const directions = [
        {
            name: "WEB方向",
            icon: Globe,
            items: [
                { text: "WEB 第一节课讲义 & 作业", link: "/docs/archives/2024-Sum/web/lesson-1" },
                { text: "WEB 第二节课讲义 & 作业", link: "/docs/archives/2024-Sum/web/lesson-2" },
                { text: "Web3 反序列化", link: "/docs/archives/2024-Sum/web/lesson-3/index" },
                { text: "Web4 SQL注入基础", link: "/docs/archives/2024-Sum/web/lesson-4/index" }
            ]
        },
        {
            name: "Pwn方向",
            icon: Chip,
            items: [
                { text: "Pwn/Re第一节课讲义 & 作业", link: "/docs/archives/2024-Sum/pwn/lesson-2" },
                { text: "Pwn3 动态链接", link: "/docs/archives/2024-Sum/pwn/lesson-3" }
            ]
        },
        {
            name: "Crypto方向",
            icon: Key,
            items: [
                { text: "Crypto第一节课讲义&作业", link: "/docs/archives/2024-Sum/crypto/lesson-1/index" },
                { text: "Crypto第二节课讲义&作业", link: "/docs/archives/2024-Sum/crypto" },
                { text: "Crypto3 对称密码", link: "/docs/archives/2024-Sum/crypto/lesson-3/index" }
            ]
        },
        {
            name: "Reverse方向",
            icon: Binary,
            items: [
                { text: "Reverse 课件与其他", link: "/docs/archives/2024-Sum/reverse/2" },
                { text: "Re第二节 动态调试", link: "/docs/archives/2024-Sum/reverse/lesson2/lesson2" }
            ]
        },
        {
            name: "MISC方向",
            icon: FileQuestion,
            items: [
                { text: "misc第一节课讲义 & 作业", link: "/docs/archives/2024-Sum/misc/lesson-1" },
                { text: "Misc2 常见隐写", link: "/docs/archives/2024-Sum/misc/lesson-2/index" }
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
                        text="2024 Summer Training"
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold text-orange-500 flex items-center mb-6">
                        <Sun className="mr-3 h-8 w-8" />
                        2024 夏季培训归档
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
                    className="mb-12 p-6 rounded-lg border border-orange-500/30 bg-white/50 backdrop-blur-sm shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="flex items-center mb-4">
                        <BookOpen className="w-6 h-6 mr-2 text-orange-600" />
                        <h3 className="text-xl font-bold text-orange-900">培训概述</h3>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-800">
                        2024年8月1日 - 8月14日。本次招新面向海南大学23届全体新生。考核与培训内容并非强关联，更多考验课后学习补充能力及知识拓展能力。
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
                        <Calendar className="w-6 h-6 mr-2 text-orange-600" />
                        <h3 className="text-xl font-bold text-orange-900">课程安排</h3>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-orange-500/20 shadow-xl bg-white/40 backdrop-blur-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-orange-500/10 border-b border-orange-500/20">
                                    <th className="p-4 font-bold text-orange-900">日期</th>
                                    <th className="p-4 font-bold text-orange-900">课程安排</th>
                                    <th className="p-4 font-bold text-orange-900">内容大纲</th>
                                    <th className="p-4 font-bold text-orange-900">讲师</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-orange-500/10 hover:bg-orange-500/5 transition-colors"
                                    >
                                        <td className="p-4 font-mono">{item.date}</td>
                                        <td className="p-4 font-bold">{item.course}</td>
                                        <td className="p-4 text-sm md:text-base">{item.content}</td>
                                        <td className="p-4 font-mono text-orange-700">{item.teacher}</td>
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
                        <Target className="w-6 h-6 mr-2 text-orange-600" />
                        <h3 className="text-xl font-bold text-orange-900">课程资料 Archive</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {directions.map((dir, idx) => (
                            <motion.div
                                key={idx}
                                className="p-6 rounded-lg border border-orange-500/20 bg-white/40 hover:bg-white/60 transition-all shadow-md group"
                            >
                                <div className="flex items-center mb-4 pb-2 border-b border-orange-500/10">
                                    <dir.icon className="w-6 h-6 mr-3 text-orange-600" />
                                    <h4 className="font-bold text-lg">{dir.name}</h4>
                                </div>
                                <ul className="space-y-2">
                                    {dir.items.map((item, i) => (
                                        <li key={i}>
                                            <a
                                                href={item.link}
                                                className="flex items-center text-sm text-gray-700 hover:text-orange-600 cursor-pointer transition-colors"
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
