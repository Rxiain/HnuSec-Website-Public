"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export function DocThemeToggle() {
    const [isInverted, setIsInverted] = useState(false)

    useEffect(() => {
        // Check if user has a preference stored
        const storedPreference = localStorage.getItem("color-inverted")
        if (storedPreference === "true") {
            setIsInverted(true)
        }
    }, [])

    const toggleInvert = () => {
        if (isInverted) {
            document.documentElement.classList.remove("inverted")
            localStorage.setItem("color-inverted", "false")
            setIsInverted(false)
        } else {
            document.documentElement.classList.add("inverted")
            localStorage.setItem("color-inverted", "true")
            setIsInverted(true)
        }
    }

    return (
        <button
            onClick={toggleInvert}
            className="flex items-center px-4 py-2 bg-white/60 border border-var-color-5/20 rounded-lg hover:bg-var-color-5 text-var-color-5 hover:text-white transition-all text-sm"
        >
            {isInverted ? (
                <>
                    <Sun className="w-4 h-4 mr-2" />
                    <span>亮色</span>
                </>
            ) : (
                <>
                    <Moon className="w-4 h-4 mr-2" />
                    <span>暗色</span>
                </>
            )}
        </button>
    )
}
