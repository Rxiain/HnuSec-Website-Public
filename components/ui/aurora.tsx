"use client"

import { useEffect, useRef } from "react"

interface AuroraProps {
  className?: string
  speed?: number
  amplitude?: number
}

export function Aurora({
  className = "",
  speed = 1,
  amplitude = 1,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    // Colors matching your theme
    const colors = [
      { r: 107, g: 107, b: 255 },  // #6b6bff
      { r: 163, g: 163, b: 255 },  // #a3a3ff
      { r: 214, g: 214, b: 230 },  // #d6d6e6
    ]

    const drawAurora = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.clearRect(0, 0, width, height)

      // Draw multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        const color = colors[layer]
        const layerOffset = layer * Math.PI * 0.5

        ctx.beginPath()

        // Create flowing wave pattern
        for (let x = 0; x <= width; x += 5) {
          const normalizedX = x / width
          const wave1 = Math.sin(normalizedX * Math.PI * 4 + time * speed + layerOffset)
          const wave2 = Math.cos(normalizedX * Math.PI * 2 + time * speed * 0.5)
          const wave3 = Math.sin(normalizedX * Math.PI * 6 + time * speed * 1.5)

          const y = height * 0.5 +
            (wave1 + wave2 + wave3) * 30 * amplitude +
            Math.sin(time * speed * 0.3 + layer) * 20

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Create gradient for this layer
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 - layer * 0.08})`)
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 100 + layer * 50
        ctx.lineCap = "round"
        ctx.stroke()

        // Add glow effect
        ctx.shadowBlur = 30
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`
      }

      time += 0.01
      animationFrameId = requestAnimationFrame(drawAurora)
    }

    drawAurora()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed, amplitude])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
