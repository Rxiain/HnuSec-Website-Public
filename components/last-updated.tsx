"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { useEffect, useState } from "react"

export function LastUpdated() {
  const [mounted, setMounted] = useState(false)
  
  // Get build time or use current date as fallback
  const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString()
  const formattedDate = new Date(buildDate).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 rounded-md bg-var-color-3/20 px-3 py-2 backdrop-blur-sm shadow-sm select-none"
    >
      <Clock className="h-4 w-4 text-var-color-5" />
      <span className="font-mono text-xs text-black/70 dark:text-white/70">
        最后更新: {formattedDate}
      </span>
    </motion.div>
  )
}
