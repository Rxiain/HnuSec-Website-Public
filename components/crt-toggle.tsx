"use client"

import { useState, useEffect } from "react"
import { Monitor } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

export function CRTToggle() {
  const [crtEnabled, setCrtEnabled] = useState(false)

  useEffect(() => {
    const body = document.body
    if (crtEnabled) {
      body.classList.add("crt")
    } else {
      body.classList.remove("crt")
    }

    // Save preference to localStorage
    localStorage.setItem("crt-effect", crtEnabled.toString())

    return () => {
      body.classList.remove("crt")
    }
  }, [crtEnabled])

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("crt-effect")
    if (savedPreference === "true") {
      setCrtEnabled(true)
    }
  }, [])

  return (
    <Toggle
      aria-label="Toggle CRT effect"
      pressed={crtEnabled}
      onPressedChange={setCrtEnabled}
      className="border border-var-color-5/30 bg-var-color-3/50 text-black backdrop-blur-sm hover:bg-var-color-4/30 dark:border-var-color-5/50 dark:bg-black/50 dark:text-var-color-2 dark:hover:bg-var-color-5/20 data-[state=on]:bg-var-color-5/20 dark:data-[state=on]:bg-var-color-4/20"
    >
      <Monitor className="mr-2 h-4 w-4" />
      CRT Effect
    </Toggle>
  )
}
