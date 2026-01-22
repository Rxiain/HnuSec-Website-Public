"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function TerminalButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = () => {
    if (isNavigating) return

    setIsPressed(true)
    setIsNavigating(true)

    setTimeout(() => {
      router.push("/terminal")
    }, 300)
  }

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 cursor-pointer font-mono"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <motion.div
        className="flex items-center space-x-2 rounded-md border border-var-color-5/30 bg-var-color-3/50 px-4 py-2 backdrop-blur-sm shadow-sm"
        animate={{
          scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-var-color-5">&gt;</span>
        <span className={`${isHovered ? "text-var-color-5" : "text-black"} transition-colors duration-300`}>
          /bin/bash
        </span>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            className="cursor-blink text-var-color-5"
          >
            _
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
