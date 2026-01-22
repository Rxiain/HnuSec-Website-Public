"use client"

import type React from "react"

import { useState, useEffect, useRef, memo } from "react"
import { motion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { MouseTrail } from "@/components/mouse-trail"
import { TerminalButton } from "@/components/terminal-button"
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
  Zap,
  Archive,
} from "lucide-react"
import { RandomTitle } from "@/components/random-title"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { CyberParticles } from "@/components/cyber-particles"
import { ArticlesOverlay } from "@/components/articles-overlay"
import { CoordinateAxis3D } from "@/components/coordinate-axis-3d"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SecurityCommandDisplay } from "@/components/security-command-display"
import { BackgroundDecoration } from "@/components/background-decoration"
import { LastUpdated } from "@/components/last-updated"
import { Footer } from "@/components/footer"
import { Aurora } from "@/components/ui/aurora"

// Decorative text component for visual enhancement
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

      // 计算鼠标相对于视口的位置（-1 到 1）
      const x = (clientX - left) / width * 2 - 1;
      const y = (clientY - top) / height * 2 - 1;

      // 应用视差效果，使用传入的 factor
      const translateX = x * factor * 150; // 增加移动幅度
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

// Memoize the InteractiveButton component to prevent unnecessary re-renders
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
      className={`group relative flex items-center justify-start space-x-2 rounded-md ${isAccent ? 'bg-var-color-5 hover:bg-var-color-5/80 text-white' : 'bg-var-color-3/70 hover:bg-var-color-4/50 text-black'} px-4 py-3 shadow-md transition-colors overflow-hidden min-w-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {/* Ripple effect - only render when needed */}
      {isPressed && (
        <motion.span
          className="absolute rounded-full bg-var-color-5/20"
          initial={{ width: 0, height: 0, x: mousePosition.x, y: mousePosition.y, opacity: 1 }}
          animate={{ width: 300, height: 300, x: mousePosition.x - 150, y: mousePosition.y - 150, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Hover glow effect - use CSS transitions for better performance */}
      <div
        className="absolute inset-0 bg-var-color-5/20 rounded-md opacity-0 transition-opacity duration-200"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Hover spotlight effect - only render when hovered */}
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

// Memoize decorative elements to prevent unnecessary re-renders
const DecorativeElements = memo(function DecorativeElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 获取所有装饰元素
    const elements = Array.from(container.querySelectorAll('.decorative-element'));
    elementsRef.current = elements as HTMLDivElement[];

    // 鼠标移动处理函数
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();

      // 计算鼠标相对于容器的位置（-1 到 1）
      const x = (clientX - left) / width * 2 - 1;
      const y = (clientY - top) / height * 2 - 1;

      // 为每个元素应用不同的视差效果
      elements.forEach((element, index) => {
        const factor = 0.2 + index * 0.01; // 每个元素的移动系数不同
        const translateX = x * factor * 100;
        const translateY = y * factor * 100;

        // 使用 transform 实现平滑移动
        (element as HTMLDivElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    // 添加事件监听
    window.addEventListener("mousemove", handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="fixed left-10 top-20 opacity-20 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Shield className="h-24 w-24 text-var-color-5" />
        </motion.div>
      </div>

      <div className="fixed right-20 bottom-32 opacity-20 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <Lock className="h-20 w-20 text-var-color-5" />
        </motion.div>
      </div>

      <div className="fixed left-1/4 bottom-20 opacity-10 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <Code className="h-32 w-32 text-var-color-5" />
        </motion.div>
      </div>

      <div className="fixed right-1/4 top-32 opacity-10 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <Terminal className="h-28 w-28 text-var-color-5" />
        </motion.div>
      </div>

      <div className="fixed left-1/3 top-3/4 opacity-15 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
        >
          <Cpu className="h-20 w-20 text-var-color-4" />
        </motion.div>
      </div>

      <div className="fixed right-1/3 top-1/4 opacity-15 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <Database className="h-16 w-16 text-var-color-4" />
        </motion.div>
      </div>

      <div className="fixed left-2/3 top-2/3 opacity-15 pointer-events-none decorative-element transition-transform duration-700 ease-out">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
        >
          <Network className="h-24 w-24 text-var-color-4" />
        </motion.div>
      </div>
    </div>
  )
})

export default function HomePage() {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mousePositionRef = useRef(mousePosition)
  const rafRef = useRef<number | undefined>(undefined)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isArticlesOpen, setIsArticlesOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setLoaded(true)

    // Use requestAnimationFrame for smoother mouse tracking
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

  const handleNavigation = (path: string, command?: string, onClick?: () => void) => {
    if (isNavigating) return

    if (onClick) {
      onClick()
      return
    }

    setIsNavigating(true)

    // Store the command in sessionStorage before navigation
    if (command) {
      // Clear any existing command first
      sessionStorage.removeItem("terminalCommand")
      // Then set the new command
      sessionStorage.setItem("terminalCommand", command)
    }

    // Add a small delay to allow for animation
    setTimeout(() => {
      router.push(path)
    }, 100)
  }

  interface NavItem {
    icon: React.ComponentType<any>;
    label: string;
    path?: string;
    command?: string;
    onClick?: () => void;
    isAccent?: boolean;
  }

  const navItems: NavItem[] = [
    { icon: User, label: "关于", path: "/terminal", command: "about", isAccent: false },
    { icon: Award, label: "荣誉", path: "/terminal", command: "honors", isAccent: false },
    { icon: Users, label: "成员", path: "/members", isAccent: false },
    { icon: FileText, label: "文章", onClick: () => setIsArticlesOpen(true), isAccent: false },
    { icon: UserPlus, label: "加入", path: "/terminal", command: "contact", isAccent: false },
  ]

  const secondaryNavItems: NavItem[] = [
    { icon: Zap, label: "2026招新", path: "/recruitment/2026-winter", isAccent: true },
    { icon: Archive, label: "历届招新归档", path: "/archives", isAccent: false },
    { icon: Shield, label: "HnuCTF", path: "/hnuctf", isAccent: true },
  ]

  return (
    <main className="relative min-h-[90vh] overflow-hidden bg-[#f0f0f5] text-black select-none">
      <MouseTrail />
      <TerminalButton />
      <CyberParticles />
      <BackgroundDecoration />

      {/* Animated Aurora Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f0f5] to-[#e8e8f0]"></div>

        {/* Aurora effect */}
        <Aurora
          speed={0.6}
          amplitude={0.7}
          className="opacity-50"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiM2YjZiZmYwNSIgZmlsbC1vcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNMzAgMGgzMHYzMEgzMHpNMCAwaDMwdjMwSDB6IiBmaWxsPSIjNmI2YmZmMDUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <DecorativeElements />

      {/* Decorative colored text elements - hide on mobile */}
      {!isMobile && (
        <>
          <DecorativeText
            text="#!/usr/bin/env node"
            className="absolute top-12 left-8 transform -rotate-6"
            color="text-var-color-4"
            delay={0.5}
            factor={0.04}
          />

          <DecorativeText
            text="function secureSystem() { /* ... */ }"
            className="absolute top-24 right-16 transform rotate-3"
            color="text-var-color-5"
            delay={0.7}
            factor={0.05}
          />

          <DecorativeText
            text="const encryption = new AES256();"
            className="absolute bottom-32 left-16 transform rotate-6"
            color="text-var-color-3"
            delay={0.9}
            size="xs"
            factor={0.03}
          />

          <DecorativeText
            text="if (isVulnerable) patch();"
            className="absolute top-48 left-1/4 transform -rotate-3"
            color="text-var-color-4"
            delay={1.1}
            factor={0.045}
          />

          <DecorativeText
            text="ssh -i private_key user@server"
            className="absolute bottom-48 right-1/4 transform rotate-2"
            color="text-var-color-5"
            delay={1.3}
            size="xs"
            factor={0.035}
          />

          <DecorativeText
            text="sudo nmap -sS -sV -O target"
            className="absolute top-64 right-12 transform -rotate-4"
            color="text-var-color-3"
            delay={1.5}
            factor={0.055}
          />

          <DecorativeText
            text="class Firewall extends SecurityLayer {}"
            className="absolute bottom-16 right-16 transform rotate-4"
            color="text-var-color-4"
            delay={1.7}
            size="md"
            factor={0.04}
          />

          <DecorativeText
            text="async function detectIntrusion() { ... }"
            className="absolute top-36 left-1/3 transform rotate-2"
            color="text-var-color-5"
            delay={1.9}
            factor={0.045}
          />

          <DecorativeText
            text="const vulnerabilities = await scanSystem();"
            className="absolute bottom-40 left-1/3 transform -rotate-3"
            color="text-var-color-4"
            delay={2.1}
            factor={0.035}
          />

          <DecorativeText
            text="import { Encryption } from 'crypto';"
            className="absolute top-56 right-1/3 transform rotate-3"
            color="text-var-color-3"
            delay={2.3}
            size="xs"
            factor={0.05}
          />
        </>
      )}

      {/* Year indicator on the right side - hide on mobile */}
      {!isMobile && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 transform">
          <div className="rotate-90 origin-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-var-color-5 font-bold tracking-widest text-xl"
            >
              2018-2026
            </motion.div>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex h-[90vh] flex-col px-2 py-6 md:px-12 lg:px-20"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100 + 50}% ${mousePosition.y * 100 + 50
            }%, rgba(163, 163, 255, 0.1), transparent 70%)`,
        }}
      >
        <motion.div
          className="relative mb-8 max-w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 50 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full overflow-hidden whitespace-nowrap -mx-4 md:mx-0">
              <RandomTitle
                text="HNUSEC"
                className={`text-[5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter text-center md:text-left`}
              />
            </div>
            <p className="mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-var-color-5/80 text-center md:text-left mx-4 md:mx-0">海南大学网络安全团队</p>
          </div>
        </motion.div>

        {/* Navigation buttons with improved visibility */}
        <div className="relative z-50 mt-12 w-full">
          {/* Mobile: 2 columns, Desktop: flex row */}
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4 max-w-2xl md:max-w-none mx-auto md:mx-0 px-4 md:px-0">
            {navItems.map((item, index) => (
              <InteractiveButton
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => (item.onClick ? item.onClick() : item.path ? handleNavigation(item.path, item.command) : undefined)}
                delay={1 + index * 0.1}
                className="min-w-0 w-full md:min-w-[120px] md:w-auto md:px-6 py-3 text-sm md:text-base"
                isAccent={item.isAccent}
              />
            ))}
          </div>
          {/* Secondary row - Recruitment, Archive, HnuCTF */}
          <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-4 max-w-2xl md:max-w-none mx-auto md:mx-0 px-4 md:px-0 mt-4">
            {secondaryNavItems.map((item, index) => (
              <InteractiveButton
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => (item.onClick ? item.onClick() : item.path ? handleNavigation(item.path, item.command) : undefined)}
                delay={1.5 + index * 0.1}
                className="min-w-0 w-full md:min-w-[120px] md:w-auto md:px-6 py-3 text-sm md:text-base"
                isAccent={item.isAccent}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-auto max-w-3xl w-full space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {/* Security Command Display - Hide on mobile */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="z-10 relative"
            >
              <SecurityCommandDisplay />
            </motion.div>
          )}

          {/* Introduction Card */}
          <div className="rounded-lg border-2 border-var-color-5/30 bg-var-color-3/20 p-4 md:p-6 relative overflow-hidden group shadow-lg mx-4 md:mx-0">
            <div
              className="absolute inset-0 bg-gradient-to-r from-var-color-5/0 via-var-color-5/5 to-var-color-5/0 opacity-0 group-hover:opacity-100"
              style={{
                transform: "translateX(-100%)",
                animation: "shimmer 8s infinite",
              }}
            />
            <div className="flex items-center text-black mb-2 md:mb-3">
              <span className="mr-2 text-var-color-5 text-lg md:text-xl">$</span>
              <span className="text-base md:text-lg font-medium">echo "HNUSEC简介"</span>
            </div>
            <TypewriterEffect
              text="HNUSEC是海南大学网络安全团队，致力于培养网络安全人才，提高网络安全意识，参与各类网络安全竞赛，为海南大学的网络安全建设贡献力量。我们专注于网络攻防技术研究、CTF竞赛训练、安全意识普及和校园网络安全维护，欢迎对网络安全感兴趣的同学加入我们的团队！"
              className="text-sm md:text-base lg:text-lg text-black ml-4 text-left"
              delay={30}
            />
          </div>
        </motion.div>
      </div>
      <ArticlesOverlay isOpen={isArticlesOpen} onClose={() => setIsArticlesOpen(false)} />

      {/* 3D coordinate axis - hidden */}
      {/* {!isMobile && <CoordinateAxis3D mousePosition={mousePosition} />} */}

      <Footer />
      <LastUpdated />
    </main>
  )
}