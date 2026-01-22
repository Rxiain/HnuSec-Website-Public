"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  delay?: number
  className?: string
}

export function TypewriterEffect({ text, delay = 50, className = "" }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`font-mono ${className}`}>
      <span>{displayText}</span>
      <span className={`${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}>_</span>
    </div>
  )
}
