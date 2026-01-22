"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

interface PageTransitionWithThemeProps {
  children: ReactNode
}

export function PageTransitionWithTheme({ children }: PageTransitionWithThemeProps) {
  const [isInverted, setIsInverted] = useState(false)

  useEffect(() => {
    // Check initial theme state
    const storedPreference = localStorage.getItem("color-inverted")
    setIsInverted(storedPreference === "true")

    // Listen for theme changes
    const handleThemeChange = () => {
      setIsInverted(document.documentElement.classList.contains("inverted"))
    }

    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          handleThemeChange()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
