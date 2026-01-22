"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { User, Mail, ChevronUp, Trophy, Link } from "lucide-react"
import { useState } from "react"

interface EnhancedMenuProps {
  currentSection: string | null
  executeCommand: (command: string) => void
}

export function EnhancedMenu({ currentSection, executeCommand }: EnhancedMenuProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeCommand, setActiveCommand] = useState<string | null>(null)

  const menuItems = [
    { icon: User, label: "About", command: "about" },
    { icon: Trophy, label: "Honors", command: "honors" },
    { icon: Link, label: "Links", command: "links" },
    { icon: Mail, label: "Contact", command: "contact" },
  ]

  const handleCommandClick = (command: string) => {
    setActiveCommand(command)
    executeCommand(command)

    // Add a small delay before resetting activeCommand to show the button press effect
    setTimeout(() => {
      setActiveCommand(null)
    }, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-var-color-5/30 bg-[#f0f0f5]/95 p-3 backdrop-blur-sm"
    >
      <div className="container mx-auto">
        <motion.div
          initial={false}
          animate={{ height: isCollapsed ? "40px" : "auto" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mb-2 flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-6 rounded-full bg-var-color-5/10 text-gray-800 hover:bg-var-color-5/20 border border-var-color-5/20"
            >
              <ChevronUp className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.1 + index * 0.05,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCommandClick(item.command)}
                  className={`border-var-color-5/30 bg-var-color-3/50 text-sm text-gray-800 hover:bg-var-color-4/30 transition-all duration-200 ${
                    currentSection === item.command.toLowerCase() || activeCommand === item.command
                      ? "border-var-color-5/60 bg-var-color-5/10 shadow-sm"
                      : ""
                  }`}
                >
                  <item.icon className="mr-1 h-3 w-3 text-var-color-5" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
