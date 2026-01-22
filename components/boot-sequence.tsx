"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const bootMessages = [
  "Initializing system...",
  "Loading kernel...",
  "Mounting file systems...",
  "Starting security services...",
  "Scanning for threats...",
  "Loading portfolio data...",
  "Initializing secure terminal interface...",
]

interface BootSequenceProps {
  isMobile?: boolean
}

export default function BootSequence({ isMobile = false }: BootSequenceProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)

  // Faster boot sequence for mobile
  const messageDelay = isMobile ? 200 : 400

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1)
      }, messageDelay)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, messageDelay])

  // Simulate a security scan with progress
  useEffect(() => {
    if (currentMessageIndex === 4) {
      const interval = setInterval(
        () => {
          setScanProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              setScanComplete(true)
              return 100
            }
            return prev + (isMobile ? 10 : 5) // Faster progress on mobile
          })
        },
        isMobile ? 50 : 100,
      )

      return () => clearInterval(interval)
    }
  }, [currentMessageIndex, isMobile])

  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-2xl rounded-md border border-var-color-5/30 bg-[#f0f0f5]/95 p-4 md:p-8 font-mono text-gray-900 backdrop-blur-sm"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.div
          className="mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <pre className="overflow-x-auto whitespace-pre text-xs sm:text-sm md:text-base text-var-color-5">
            {`
██╗  ██╗███╗   ██╗██╗   ██╗███████╗███████╗ ██████╗
██║  ██║████╗  ██║██║   ██║██╔════╝██╔════╝██╔════╝
███████║██╔██╗ ██║██║   ██║███████╗█████╗  ██║     
██╔══██║██║╚██╗██║██║   ██║╚════██║██╔══╝  ██║     
██║  ██║██║ ╚████║╚██████╔╝███████║███████╗╚██████╗
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝
`}
          </pre>
          <div className="mt-2 text-xs text-gray-800">海南大学网络安全团队</div>
        </motion.div>

        <div className="space-y-2">
          <AnimatePresence>
            {bootMessages.slice(0, currentMessageIndex).map((message, index) => (
              <motion.div
                key={index}
                className="flex"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="mr-2 text-var-color-5">{">"}&nbsp;</span>
                <span className="text-gray-900">{message}</span>
                {index === 4 && !scanComplete && (
                  <div className="ml-2 flex items-center">
                    <div className="h-1 w-20 overflow-hidden rounded-full bg-var-color-3">
                      <motion.div className="h-full bg-var-color-5" style={{ width: `${scanProgress}%` }} />
                    </div>
                    <span className="ml-2 text-xs text-gray-800">{scanProgress}%</span>
                  </div>
                )}
                {index === currentMessageIndex - 1 && index !== bootMessages.length - 1 && (
                  <span className="ml-1 cursor-blink">&nbsp;_</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {currentMessageIndex === bootMessages.length && (
            <motion.div
              className="mt-4 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-2 text-var-color-5">{">"}&nbsp;</span>
              <span className="typing-animation text-gray-900">
                Boot sequence complete. Welcome to HNUSEC secure terminal.
              </span>
              <span className="cursor-blink">_</span>
            </motion.div>
          )}
        </div>

        {/* Animated loading bar at the bottom */}
        <motion.div
          className="mt-6 h-1 overflow-hidden rounded-full bg-var-color-3"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: isMobile ? 1.5 : 3 }}
        >
          <motion.div
            className="h-full bg-var-color-5"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: isMobile ? 1.2 : 2.5 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
