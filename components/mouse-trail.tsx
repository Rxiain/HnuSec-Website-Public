"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MouseTrail() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const counterRef = useRef(0)
  const lastUpdateRef = useRef(0)
  const throttleTime = 16 // 约60fps

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdateRef.current < throttleTime) return
      
      lastUpdateRef.current = now
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: counterRef.current++
      }
      
      setTrail((prev) => {
        const newTrail = [...prev, newPoint]
        if (newTrail.length > 20) {
          return newTrail.slice(-20)
        }
        return newTrail
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            className="absolute h-2 w-2 rounded-full bg-var-color-5/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: point.x - 4,
              y: point.y - 4,
              scale: 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}