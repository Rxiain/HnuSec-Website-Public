"use client"

import type React from "react"
import { useState, useEffect, useRef, memo } from "react"
import { motion, useAnimation } from "framer-motion"

interface RandomTitleProps {
  text: string
  className?: string
}

// Memoize the individual letter component for better performance
const AnimatedLetter = memo(function AnimatedLetter({
  char,
  delay,
}: {
  char: string
  delay: number
}) {
  const controls = useAnimation()

  useEffect(() => {
    // Start the animation
    controls.start({
      y: [0, Math.random() * -8, 0],
      x: [0, Math.random() * 4 - 2, 0],
      rotate: [0, Math.random() * 4 - 2, 0],
      transition: {
        duration: 2 + Math.random(),
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay * 0.1,
      },
    })

    // Clean up animation when component unmounts
    return () => {
      controls.stop()
    }
  }, [controls, delay])

  return (
    <motion.span
      className="random-letter inline-block"
      style={{ "--delay": delay } as React.CSSProperties}
      animate={controls}
    >
      {char}
    </motion.span>
  )
})

export function RandomTitle({ text, className = "" }: RandomTitleProps) {
  const [letters, setLetters] = useState<{ char: string; delay: number }[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Create array of letters with random delays
    const newLetters = text.split("").map((char) => ({
      char,
      delay: Math.random() * 10,
    }))
    setLetters(newLetters)

    // Periodically update the delays to create random animation
    // Use a less frequent interval for better performance
    intervalRef.current = setInterval(() => {
      setLetters((prev) =>
        prev.map((letter) => ({
          ...letter,
          delay: Math.random() * 10,
        })),
      )
    }, 5000) // Increased to 5 seconds for better performance

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text])

  return (
    <h1 className={className}>
      {letters.map((letter, index) => (
        <AnimatedLetter key={index} char={letter.char} delay={letter.delay} />
      ))}
    </h1>
  )
}
