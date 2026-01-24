"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import { motion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { MouseTrail } from "@/components/mouse-trail"
import { TerminalButton } from "@/components/terminal-button"
import SpotlightCard from "@/components/spotlight-card"
import {
    Home,
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
    Archive
} from "lucide-react"
import { RandomTitle } from "@/components/random-title"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { CyberParticles } from "@/components/cyber-particles"
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

            const elements = Array.from(container.querySelectorAll('.decorative-element'));
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

type MaterialItem = {
    text: string;
    link: string;
};

type Materials = {
    [category: string]: MaterialItem[];
};

export default function ClientRecruitmentPage({ materials }: { materials: Materials }) {
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
        { date: "1.26", course: "Web", content: "http&rce", teacher: "@J4toPos" },
        { date: "1.27", course: "Pwn", content: "二进制基础&栈详解", teacher: "@cinco" },
        { date: "1.28", course: "Re", content: "基础知识和壳", teacher: "@漫宿娇盛" },
        { date: "1.29", course: "Misc", content: "基础文件结构&基础隐写", teacher: "@Raft" },
        { date: "1.30", course: "Cry", content: "基础引入", teacher: "@m1n9" },
        { date: "1.31", course: "Web", content: "sql注入", teacher: "@chrizsty" },
        { date: "2.1", course: "Pwn", content: "栈溢出", teacher: "@yh3" },
        { date: "2.2", course: "Misc", content: "流量分析基础", teacher: "@Lu0m0" },
        { date: "2.3", course: "Re", content: "基础加密", teacher: "@漫宿娇盛" },
        { date: "2.4", course: "Cry", content: "RSA相关", teacher: "@monday" },
        { date: "2.5", course: "Web", content: "php反序列化", teacher: "@banta114" },
        { date: "2.6", course: "Pwn", content: "格式化字符串", teacher: "@cwn" },
    ]

    const dailyModules = [
        {
            date: "1.26",
            track: "Web",
            prerequisites: [
                "准备一个笔记软件，比如语雀、Typora等",
                "简单了解HTTP协议",
                "学习Linux基础命令，提前准备好一个Linux环境",
                "学习PHP基础语法，搭建PHP环境"
            ],
            content: [
                "HTTP请求与响应，常见HTTP方法、状态码与请求头",
                "Linux基础和命令",
                "PHP中的危险函数（代码执行、命令执行、有无回显）",
                "RCE常见绕过技巧（空格、编码等绕过）"
            ],
            homework: [
                "自行搭建一个Linux环境（VMware/WSL），记录搭建的过程",
                "学习Linux基础指令和PHP基础语法，提交学习笔记",
                "整理http协议笔记，完成 [NewStarCTF 2023 公开赛道]Begin of HTTP 要求写题目Writeup",
                "RCE-labs Level 0-8 NSSCTF",
                "CTFHub-RCE-命令注入 CTFHub",
                "常用工具的安装"
            ]
        },
        {
            date: "1.27",
            track: "Pwn",
            prerequisites: [
                "c语言（有点基础就可以了）",
                "汇编（了解常用指令，熟悉常用寄存器的作用即可）",
                "python的pwntools库",
                "Linux基础指令（elf文件只能运行在linux上，所以linux的使用是逃不开的）",
                "了解如何使用ida"
            ],
            content: [
                "二进制基础",
                "栈详解"
            ],
            homework: [
                "安装并配置一个ubuntu虚拟机",
                "安装IDA",
                "完成NSSCTF题目: 2928",
                "完成NSSCTF题目: 4479"
            ]
        },
        {
            date: "1.28",
            track: "RE",
            prerequisites: [
                "记笔记软件，如语雀",
                "会截图",
                "有常规的写代码软件，如vscode",
                "自主查找信息的能力",
                "c语言",
                "基本的linux指令"
            ],
            content: [
                "ida的基本使用",
                "python的常规逆向",
                "安卓的基础逆向",
                "UPX的壳及其脱壳"
            ],
            homework: [
                "安装ida",
                "配置linux环境（如虚拟机或者WSL2，推荐后者）",
                "安装Detect it easy",
                "安装upx",
                "安装xdbg",
                "配置uv来管理python环境"
            ]
        },
        {
            date: "1.29",
            track: "Misc",
            prerequisites: [
                "了解markdown格式并掌握md文档编辑器",
                "具有python语言基础",
                "对文件扩展名有初步了解，知道如何查看并修改文件扩展名",
                "理解计算机相关基础概念，如字节、二进制、十六进制等",
                "有一定的信息搜集能力",
                "初步掌握Windows、Linux系统命令行的使用"
            ],
            content: [
                "常见文件格式结构解析",
                "常见编码类型",
                "图像、音频等文件隐写",
                "压缩包爆破攻击、明文攻击",
                "misc常用工具介绍"
            ],
            homework: [
                "自行配置一个linux环境",
                "配置python环境（推荐使用anaconda）",
                "安装一个十六进制编辑器（推荐010editor/Winhex）",
                "本地部署Cyberchef",
                "上述内容用md文档记录过程"
            ]
        },
        {
            date: "1.30",
            track: "Crypto",
            prerequisites: [
                "了解python的基本用法",
                "网上自行学习下载sagemath并安装gmpy2和Crypto库",
                "准备好《密码学数学基础》一书"
            ],
            content: [
                "Crypto方向简单介绍",
                "初等数论及RSA概念",
                "DES.AES简介",
                "流密码lcg简要"
            ],
            homework: [
                "python实现基础的RSA,DES,AES加解密(ECB模式)",
                "手算伽罗华域GF(2^8)中的0x57*0x83,提交照片"
            ]
        },
        {
            date: "1.31",
            track: "Web",
            prerequisites: [
                "看看DBMS相关的资料，了解什么是数据库系统"
            ],
            content: [
                "mysql基本使用",
                "sql注入测试"
            ],
            homework: [
                "安装一个mysql数据库",
                "自己学一点基础用法",
                "sql-lib第1，3，5，7关"
            ]
        },
        {
            date: "2.1",
            track: "Pwn",
            prerequisites: [
                "了解栈的数据结构是怎么样的",
                "为什么会有栈溢出的漏洞",
                "看懂调试过程，知道一些基本的保护"
            ],
            content: [
                "介绍常见的栈溢出题目（有后门、有后门有保护、没后门简单symcall）"
            ],
            homework: [
                "在虚拟机里把环境配置好，安装ida",
                "题目ciscn_2019_n_1（覆盖中间的空，改写数）",
                "rip",
                "mrctf2020_shellcode（都在BUUCTF上）"
            ]
        },
        {
            date: "2.2",
            track: "Misc",
            prerequisites: [
                "了解wireshark用处及其基础操作",
                "了解tshark命令提取指定流量",
                "了解计算机网络五层协议体系"
            ],
            content: [
                "介绍常见的流量类型以及wireshark一般操作"
            ],
            homework: [
                "下载wireshark流量分析工具",
                "BUUCTF平台：被嗅探的流量",
                "有时间可自学常见流量分析"
            ]
        },
        {
            date: "2.3",
            track: "Re",
            prerequisites: [
                "ida vscode的使用",
                "C语言和python的基础"
            ],
            content: [
                "基础常识：位与字节，大小端序",
                "基础运算：异或，同或，位移",
                "常见加密算法：rc4，tea家族，base64，z3"
            ],
            homework: [
                "xidian training: base64",
                "NSSCTF: 3860 (xor)",
                "NSSCTF: 3701 (z3)",
                "NSSCTF: 2957 (tea)"
            ]
        },
        {
            date: "2.4",
            track: "Crypto",
            prerequisites: [
                "了解rsa的加解密流程",
                "了解格的相关知识点",
                "了解copperSmith的相关知识点"
            ],
            content: [
                "rsa的部分常见攻击方法",
                "格的概念及运用",
                "coppersmith定理的理解及运用"
            ],
            homework: [
                "BUUCTF: RSA2, RSA3, Dangerous RSA, RSA5, [BJDCTF2020]easyrsa",
                "NSSCTF: 2974, 3976, 2176"
            ]
        },
        {
            date: "2.5",
            track: "Web",
            prerequisites: [
                "了解相关php反序列化魔术方法"
            ],
            content: [
                "反序列化基本使用方法",
                "反序列化渗透"
            ],
            homework: [
                "[HUBUCTF 2022 新生赛]checkin",
                "[NSSCTF 2022 Spring Recruit]babyphp",
                "[SWPUCTF 2022 新生赛]ez_ez_unserialize",
                "[SWPUCTF 2024 秋季新生赛]Maxser Revenge",
                "[BJDCTF 2020]Ezphp",
                "[SWPUCTF 2022 新生赛]funny_php",
                "攻防世界: easyphp, Web_php_include",
                "Ctfhub-RCE模块----文件包含"
            ]
        },
        {
            date: "2.6",
            track: "Pwn",
            prerequisites: [
                "C语言基础语法",
                "汇编基础（寄存器、栈帧结构）",
                "理解printf()函数"
            ],
            content: [
                "格式化字符串漏洞原理",
                "printf 等格式化函数的工作机制",
                "格式化字符串参数与栈的对应关系",
                "漏洞触发条件",
                "格式化字符串的常见利用方式",
                "信息泄露，比如泄露canary来实现绕过",
                "任意地址写，利用 %n 进行写入"
            ],
            homework: [
                "jarvisoj_fm1（buuctf）",
                "wdb_2018_2nd_easyfmt(修改got表)",
                "newstar2025 fmt_got(调试找偏移)"
            ]
        }
    ]

    const categoryConfig = [
        { key: 'web', name: "Web方向", icon: Globe },
        { key: 'pwn', name: "Pwn方向", icon: Chip },
        { key: 'crypto', name: "Crypto方向", icon: Key },
        { key: 'reverse', name: "Reverse方向", icon: Binary },
        { key: 'misc', name: "Misc方向", icon: FileQuestion },
        { key: 'dev', name: "Dev方向", icon: Code },
        { key: 'others', name: "其他", icon: FileText }
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
                            本次冬季培训预计于 <span className="font-bold text-var-color-5">2026年1月26日-2026年2月6日</span> 举行。培训面向海南大学24级、25级全体学生，涵盖了CTF相关的WEB、PWN、REV、CRY、MISC五个方向，旨在提升同学们的网络安全实战技能。
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

                {/* Daily Details Modules */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="flex items-center mb-6">
                        <Target className="w-6 h-6 mr-2 text-var-color-5" />
                        <h3 className="text-xl font-bold">课程资料 & 日常详情</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dailyModules.map((module, idx) => (
                            <SpotlightCard
                                key={idx}
                                className="p-6 rounded-lg border border-var-color-5/20 bg-white/40 shadow-md flex flex-col h-full"
                                spotlightColor="rgba(107, 107, 255, 0.15)"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="h-full"
                                >
                                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-var-color-5/10">
                                        <div className="flex items-center">
                                            <div className="bg-var-color-5 text-white text-xs font-mono px-2 py-1 rounded mr-3">
                                                {module.date}
                                            </div>
                                            <h4 className="font-bold text-lg">{module.track}</h4>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Prerequisites */}
                                        {module.prerequisites && module.prerequisites.length > 0 && (
                                            <div>
                                                <h5 className="font-semibold text-sm text-var-color-4 mb-2 flex items-center">
                                                    <BookOpen className="w-3 h-3 mr-1" />
                                                    前置基础
                                                </h5>
                                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-1">
                                                    {module.prerequisites.map((p, i) => (
                                                        <li key={i}>{p}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Content */}
                                        {module.content && module.content.length > 0 && (
                                            <div>
                                                <h5 className="font-semibold text-sm text-var-color-5 mb-2 flex items-center">
                                                    <Binary className="w-3 h-3 mr-1" />
                                                    课程内容
                                                </h5>
                                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-1">
                                                    {module.content.map((c, i) => (
                                                        <li key={i}>{c}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Homework */}
                                        {module.homework && module.homework.length > 0 && (
                                            <div>
                                                <h5 className="font-semibold text-sm text-red-500 mb-2 flex items-center">
                                                    <Code className="w-3 h-3 mr-1" />
                                                    作业
                                                </h5>
                                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-1">
                                                    {module.homework.map((h, i) => (
                                                        <li key={i}>{h}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </SpotlightCard>
                        ))}
                    </div>
                </motion.div>

                {/* Course Materials */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="flex items-center mb-6">
                        <Archive className="w-6 h-6 mr-2 text-var-color-5" />
                        <h3 className="text-xl font-bold">资料归档</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryConfig.map((cat, idx) => {
                            const items = materials[cat.key] || [];
                            // Skip categories with no items
                            if (items.length === 0) return null;

                            return (
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
                                            <cat.icon className="w-6 h-6 mr-3 text-var-color-5 group-hover:scale-110 transition-transform" />
                                            <h4 className="font-bold text-lg">{cat.name}</h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {items.map((item, i) => (
                                                <li key={i}>
                                                    <a
                                                        href={item.link}
                                                        className="flex items-center text-sm text-gray-700 hover:text-var-color-5 cursor-pointer transition-colors"
                                                    >
                                                        <ChevronRight className="w-3 h-3 mr-1 opacity-50" />
                                                        <span className="truncate">{item.text}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </SpotlightCard>
                            );
                        })}
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
