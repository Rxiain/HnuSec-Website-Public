"use client"

import { useEffect, useRef, useState } from "react"

export function CyberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const isActiveRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharper rendering
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setCanvasSize()
        initParticles()
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    // Particle class with optimized methods
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 2 + 0.5 // Smaller particles for better performance
        this.speedX = (Math.random() - 0.5) * 0.3 // Slower movement for better performance
        this.speedY = (Math.random() - 0.5) * 0.3
        this.alpha = Math.random() * 0.3 + 0.1
        this.color = `rgba(107, 107, 255, ${this.alpha})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges instead of bouncing for better performance
        if (this.x > window.innerWidth) this.x = 0
        else if (this.x < 0) this.x = window.innerWidth

        if (this.y > window.innerHeight) this.y = 0
        else if (this.y < 0) this.y = window.innerHeight
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const initParticles = () => {
      particlesRef.current = []
      // Adjust particle count based on screen size for better performance
      const particleCount = Math.min(40, Math.floor(window.innerWidth / 40))

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    initParticles()

    // Connect particles with lines - optimized version
    function connectParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
      const maxDistance = 120 // Reduced distance for better performance
      const particleCount = particles.length

      for (let a = 0; a < particleCount; a++) {
        for (let b = a + 1; b < particleCount; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const distance = dx * dx + dy * dy // Avoid square root for performance

          if (distance < maxDistance * maxDistance) {
            const opacity = 1 - Math.sqrt(distance) / maxDistance
            ctx.strokeStyle = `rgba(107, 107, 255, ${opacity * 0.15})`
            ctx.lineWidth = 0.5 // Thinner lines for better performance
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop with performance optimizations
    function animate() {
      if (!isActiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw(ctx)
      }

      connectParticles(ctx, particles)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate)

    // Pause animations when tab is not visible
    const handleVisibilityChange = () => {
      isActiveRef.current = document.visibilityState === "visible"
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Intersection Observer to pause animation when not in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting)
        isActiveRef.current = entries[0].isIntersecting
      },
      { threshold: 0.1 },
    )

    observer.observe(canvas)

    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  )
}
