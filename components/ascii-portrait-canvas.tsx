"use client"

import { useRef, useEffect } from "react"

interface AsciiPortraitCanvasProps {
  width?: number
  height?: number
  contrast?: number
  brightness?: number
}

export function AsciiPortraitCanvas({
  width = 1000,
  height = 1000,
  contrast = 2,
  brightness = 10,
}: AsciiPortraitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Load the image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "https://s2.loli.net/2022/07/31/TtM7gUXWls8ocaG.jpg"

    img.onload = () => {
      // Calculate aspect ratio and apply better cropping
      const sourceWidth = img.width
      const sourceHeight = img.height

      // 对于新图片，使用不同的裁剪参数
      const cropX = sourceWidth * 0.1 // 裁剪10%
      const cropY = sourceHeight * 0.1 // 裁剪10%
      const cropWidth = sourceWidth * 0.8 // 使用80%的宽度
      const cropHeight = sourceHeight * 0.8 // 使用80%的高度

      // 设置canvas尺寸
      canvas.width = width
      canvas.height = height

      // 计算居中绘制的位置和尺寸
      const scale = Math.min(width / cropWidth, height / cropHeight)
      const scaledWidth = cropWidth * scale
      const scaledHeight = cropHeight * scale
      const offsetX = (width - scaledWidth) / 2
      const offsetY = (height - scaledHeight) / 2

      // Draw and process the image with cropping and centering
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight, // Source rectangle
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight // Destination rectangle
      )

      // Apply contrast and brightness adjustments
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Apply brightness
        data[i] = Math.min(255, data[i] * brightness)
        data[i + 1] = Math.min(255, data[i + 1] * brightness)
        data[i + 2] = Math.min(255, data[i + 2] * brightness)

        // Apply contrast
        data[i] = Math.min(255, Math.max(0, ((data[i] / 255 - 0.5) * contrast + 0.5) * 255))
        data[i + 1] = Math.min(255, Math.max(0, ((data[i + 1] / 255 - 0.5) * contrast + 0.5) * 255))
        data[i + 2] = Math.min(255, Math.max(0, ((data[i + 2] / 255 - 0.5) * contrast + 0.5) * 255))
      }

      ctx.putImageData(imageData, 0, 0)
    }
  }, [width, height, contrast, brightness])

  return (
    <div className="ascii-portrait-container flex justify-center my-4">
      <div className="relative group">
        <canvas
          ref={canvasRef}
          className="border border-primary/30 rounded shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 pointer-events-none"
          style={{ maxWidth: "100%", height: "100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />
      </div>
    </div>
  )
}