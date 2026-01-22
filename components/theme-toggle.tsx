"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  // 定义 isDarkMode 状态
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if user has a preference stored
    const storedTheme = localStorage.getItem("theme")

    // Default to light mode
    if (storedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    // 标记组件已挂载
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    // 切换主题
    setIsDarkMode(!isDarkMode)

    // 更新 localStorage
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // 如果需要使用 mounted 和 setMounted，可以在这里添加逻辑
  // 例如：防止在组件未挂载时操作 DOM

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-var-color-5/30 bg-white/70 text-var-color-5 shadow-md backdrop-blur-sm hover:bg-var-color-5 hover:text-white transition-all duration-300"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isDarkMode ? 180 : 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      title={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </motion.button>
  )
}
