"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
}

export function GlitchText({ text, className = "", glitchIntensity = 0.3 }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Randomly trigger glitch effect
    const interval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [glitchIntensity])

  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <motion.div
        animate={{
          x: isGlitching ? Math.random() * 3 - 1.5 : 0,
          y: isGlitching ? Math.random() * 3 - 1.5 : 0,
        }}
        transition={{ duration: 0.1 }}
      >
        {text}
      </motion.div>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <div
            className="absolute left-0 top-0 text-red-500 opacity-70"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`,
              textShadow: "2px 0 #00fffc",
            }}
          >
            {text}
          </div>
          <div
            className="absolute left-0 top-0 text-blue-500 opacity-70"
            style={{
              clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)",
              transform: `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`,
              textShadow: "-2px 0 #ff00c1",
            }}
          >
            {text}
          </div>
        </>
      )}
    </div>
  )
}
