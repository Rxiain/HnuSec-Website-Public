"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

interface DecryptedTextProps {
  text: string
  className?: string
  speed?: number
  maxIterations?: number
  chars?: string
  parentClassName?: string
  sequential?: boolean
  revealDirection?: "start" | "end" | "center"
  useOriginalCharsOnly?: boolean
}

export function DecryptedText({
  text,
  className = "",
  speed = 50,
  maxIterations = 10,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()",
  parentClassName = "",
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
}: DecryptedTextProps) {
  const [displayedText, setDisplayedText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const iterationRef = useRef(0)
  const textRef = useRef(text)

  useEffect(() => {
    textRef.current = text
  }, [text])

  const startAnimation = () => {
    if (isAnimating || intervalRef.current) return

    setIsAnimating(true)
    iterationRef.current = 0

    const duration = speed * maxIterations
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    const frame = 0

    const animate = (currentFrame: number) => {
      if (currentFrame >= totalFrames) {
        setDisplayedText(text)
        setIsAnimating(false)
        return
      }

      const progress = currentFrame / totalFrames
      const currentIteration = Math.floor(progress * maxIterations)

      if (currentIteration > iterationRef.current) {
        iterationRef.current = currentIteration

        let newText = ""
        const textLength = textRef.current.length

        for (let i = 0; i < textLength; i++) {
          if (sequential) {
            const charProgress = i / textLength
            const shouldReveal =
              revealDirection === "start"
                ? charProgress < progress
                : revealDirection === "end"
                ? charProgress > 1 - progress
                : Math.abs(charProgress - 0.5) < progress / 2

            if (shouldReveal) {
              newText += textRef.current[i]
            } else {
              const randomIndex = Math.floor(Math.random() * chars.length)
              newText += chars[randomIndex]
            }
          } else {
            if (progress < 1) {
              const randomIndex = Math.floor(Math.random() * chars.length)
              newText += chars[randomIndex]
            } else {
              newText += textRef.current[i]
            }
          }
        }

        setDisplayedText(newText)
      }

      const timeoutId = setTimeout(() => animate(currentFrame + 1), frameDuration)
      intervalRef.current = timeoutId as any
    }

    animate(0)
  }

  useEffect(() => {
    startAnimation()

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text, speed, maxIterations, sequential])

  return (
    <motion.span
      className={`inline-block ${parentClassName}`}
      onHoverStart={() => !sequential && startAnimation()}
    >
      <span className={className}>{displayedText}</span>
    </motion.span>
  )
}
