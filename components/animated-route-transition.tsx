"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { PageTransitionWithTheme } from "./page-transition-with-theme"

interface AnimatedRouteTransitionProps {
  children: ReactNode
}

export function AnimatedRouteTransition({ children }: AnimatedRouteTransitionProps) {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isRouteChanging, setIsRouteChanging] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }

    // Handle route change
    setIsRouteChanging(true)

    // Update children after animation completes
    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      setIsRouteChanging(false)
      // Ensure the page is scrolled to the top on navigation
      window.scrollTo(0, 0)
    }, 200) // Match this with the exit animation duration

    return () => clearTimeout(timeout)
  }, [pathname, children, isFirstRender])

  return (
    <PageTransitionWithTheme>
      <motion.div
        key={pathname}
        initial={{ opacity: isFirstRender ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className="min-h-screen bg-[#f0f0f5]"
      >
        {isRouteChanging ? displayChildren : children}
      </motion.div>
    </PageTransitionWithTheme>
  )
}
