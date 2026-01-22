"use client"

import { useRef, useState, useEffect } from "react"
import * as THREE from "three"

interface CoordinateAxisProps {
  mousePosition: { x: number; y: number }
  isMouseMoving: boolean
}

// Simple 3D scene without React Three Fiber - using vanilla Three.js
export function CoordinateAxis3D({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    axesGroup: THREE.Group
    animationId: number | null
  } | null>(null)
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const mouseMovingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastMousePositionRef = useRef(mousePosition)
  const autoRotationRef = useRef({
    x: Math.random() * 0.01 - 0.005,
    y: Math.random() * 0.01 - 0.005,
  })
  const lastUpdateRef = useRef(0)

  // Detect if mouse is moving
  useEffect(() => {
    if (lastMousePositionRef.current.x !== mousePosition.x || lastMousePositionRef.current.y !== mousePosition.y) {
      lastMousePositionRef.current = mousePosition
      setIsMouseMoving(true)

      if (mouseMovingTimerRef.current) {
        clearTimeout(mouseMovingTimerRef.current)
      }

      mouseMovingTimerRef.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 2000)
    }

    return () => {
      if (mouseMovingTimerRef.current) {
        clearTimeout(mouseMovingTimerRef.current)
      }
    }
  }, [mousePosition])

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
    camera.position.set(2, 2, 2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(768, 768) // 48rem = 768px
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create coordinate axes
    const axesGroup = new THREE.Group()

    // X-axis (blue)
    const xAxisGeometry = new THREE.BoxGeometry(1.2, 0.01, 0.01)
    const xAxisMaterial = new THREE.MeshBasicMaterial({ color: 0x6b6bff })
    const xAxis = new THREE.Mesh(xAxisGeometry, xAxisMaterial)
    xAxis.position.set(0.6, 0, 0)

    const xConeGeometry = new THREE.ConeGeometry(0.03, 0.1, 8)
    const xConeMaterial = new THREE.MeshBasicMaterial({ color: 0x6b6bff })
    const xCone = new THREE.Mesh(xConeGeometry, xConeMaterial)
    xCone.position.set(1.2, 0, 0)
    xCone.rotation.z = -Math.PI / 2

    axesGroup.add(xAxis, xCone)

    // Y-axis (light blue)
    const yAxisGeometry = new THREE.BoxGeometry(0.01, 1.2, 0.01)
    const yAxisMaterial = new THREE.MeshBasicMaterial({ color: 0xa3a3ff })
    const yAxis = new THREE.Mesh(yAxisGeometry, yAxisMaterial)
    yAxis.position.set(0, 0.6, 0)

    const yConeGeometry = new THREE.ConeGeometry(0.03, 0.1, 8)
    const yConeMaterial = new THREE.MeshBasicMaterial({ color: 0xa3a3ff })
    const yCone = new THREE.Mesh(yConeGeometry, yConeMaterial)
    yCone.position.set(0, 1.2, 0)

    axesGroup.add(yAxis, yCone)

    // Z-axis (light gray)
    const zAxisGeometry = new THREE.BoxGeometry(0.01, 0.01, 1.2)
    const zAxisMaterial = new THREE.MeshBasicMaterial({ color: 0xd6d6e6 })
    const zAxis = new THREE.Mesh(zAxisGeometry, zAxisMaterial)
    zAxis.position.set(0, 0, 0.6)

    const zConeGeometry = new THREE.ConeGeometry(0.03, 0.1, 8)
    const zConeMaterial = new THREE.MeshBasicMaterial({ color: 0xd6d6e6 })
    const zCone = new THREE.Mesh(zConeGeometry, zConeMaterial)
    zCone.position.set(0, 0, 1.2)
    zCone.rotation.x = Math.PI / 2

    axesGroup.add(zAxis, zCone)

    scene.add(axesGroup)

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      axesGroup,
      animationId: null,
    }

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)

      if (sceneRef.current && sceneRef.current.axesGroup) {
        const { axesGroup } = sceneRef.current

        if (isMouseMoving) {
          // Smooth rotation based on mouse position
          axesGroup.rotation.y = THREE.MathUtils.lerp(
            axesGroup.rotation.y,
            mousePosition.x * Math.PI * 0.5,
            0.05,
          )
          axesGroup.rotation.x = THREE.MathUtils.lerp(
            axesGroup.rotation.x,
            -mousePosition.y * Math.PI * 0.5,
            0.05,
          )
        } else {
          // Auto-rotate when mouse is not moving
          const currentTime = Date.now() / 1000

          axesGroup.rotation.x += autoRotationRef.current.x
          axesGroup.rotation.y += autoRotationRef.current.y

          // Change rotation direction randomly every few seconds
          if (currentTime - lastUpdateRef.current > 3) {
            autoRotationRef.current = {
              x: Math.random() * 0.01 - 0.005,
              y: Math.random() * 0.01 - 0.005,
            }
            lastUpdateRef.current = currentTime
          }
        }
      }

      renderer.render(scene, camera)
      sceneRef.current!.animationId = animationId
    }

    animate()

    // Cleanup
    return () => {
      if (sceneRef.current) {
        if (sceneRef.current.animationId !== null) {
          cancelAnimationFrame(sceneRef.current.animationId)
        }
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
        xAxisGeometry.dispose()
        xAxisMaterial.dispose()
        xConeGeometry.dispose()
        xConeMaterial.dispose()
        yAxisGeometry.dispose()
        yAxisMaterial.dispose()
        yConeGeometry.dispose()
        yConeMaterial.dispose()
        zAxisGeometry.dispose()
        zAxisMaterial.dispose()
        zConeGeometry.dispose()
        zConeMaterial.dispose()
      }
    }
  }, []) // Empty dependency array - only run once

  return (
    <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 h-[48rem] w-[48rem] z-10 pointer-events-none">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  )
}
