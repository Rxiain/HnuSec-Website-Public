"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { usePathname } from "next/navigation"

export function InvertColorsToggle() {
  const [isInverted, setIsInverted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Determine position based on current route
  const getButtonPosition = () => {
    // Default position
    let position = {
      top: "6",
      right: "auto",
      bottom: "auto",
      left: "6",
    }

    // Adjust position based on route and device
    if (pathname === "/") {
      // On homepage
      if (isMobile) {
        // On mobile, move to bottom left
        position = {
          top: "auto",
          right: "auto",
          bottom: "1.5",
          left: "1.5",
        }
      } else {
        // On desktop, move to top right
        position = {
          top: "6",
          right: "6",
          bottom: "auto",
          left: "auto",
        }
      }
    } else if (pathname === "/terminal") {
      // On terminal page, move to bottom left to avoid overlap with back button
      position = {
        top: "auto",
        right: "auto",
        bottom: "1.5",
        left: "1.5",
      }
    } else if (pathname === "/members") {
      // On members page, move to bottom left to avoid overlap with back button and year navigation
      position = {
        top: "auto",
        right: "auto",
        bottom: "1.5",
        left: "1.5",
      }
    } else if (pathname === "/recruitment/2026-winter") {
      // On recruitment page, move to top right
      position = {
        top: "6",
        right: "6",
        bottom: "auto",
        left: "auto",
      }
    } else if (pathname.startsWith("/archives/")) {
      // On archive detail pages, move to top right
      position = {
        top: "6",
        right: "6",
        bottom: "auto",
        left: "auto",
      }
    }

    return position
  }

  const [position, setPosition] = useState(getButtonPosition())

  // Update position when window size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      setPosition(getButtonPosition())
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [pathname, isMobile])

  useEffect(() => {
    // Check if user has a preference stored
    const storedPreference = localStorage.getItem("color-inverted")
    if (storedPreference === "true") {
      setIsInverted(true)
      document.documentElement.classList.add("inverted")
    }
  }, [])

  const toggleInvert = () => {
    if (isInverted) {
      document.documentElement.classList.remove("inverted")
      localStorage.setItem("color-inverted", "false")
      setIsInverted(false)
    } else {
      document.documentElement.classList.add("inverted")
      localStorage.setItem("color-inverted", "true")
      setIsInverted(true)
    }
  }

  // Don't render on hnuctf page, docs pages and archives list page
  if (pathname === "/hnuctf" || pathname.startsWith("/docs") || pathname === "/archives") {
    return null
  }
  // Allow rendering on archive detail pages (pathname starts with "/archives/")

  return (
    <motion.button
      onClick={toggleInvert}
      className={`fixed z-50 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-var-color-5/30 bg-var-color-3/70 text-var-color-5 shadow-md backdrop-blur-sm hover:bg-var-color-4/50`}
      style={{
        top: position.top !== "auto" ? `${position.top}rem` : "auto",
        right: position.right !== "auto" ? `${position.right}rem` : "auto",
        bottom: position.bottom !== "auto" ? `${position.bottom}rem` : "auto",
        left: position.left !== "auto" ? `${position.left}rem` : "auto",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isInverted ? 180 : 0,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.3,
        rotate: { duration: 0.5, ease: "easeInOut" },
      }}
      aria-label={isInverted ? "Disable dark mode" : "Enable dark mode"}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isInverted ? 0 : 1, rotate: isInverted ? -90 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInverted ? 1 : 0, rotate: isInverted ? 0 : 90 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>
      </div>
    </motion.button>
  )
}
