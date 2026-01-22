"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { TerminalIcon, Shield, Zap } from "lucide-react"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HonorsSection } from "@/components/sections/honors-section"
import { FriendshipLinksSection } from "@/components/sections/friendship-links-section"
import { ImageAsciiLogo } from "@/components/image-ascii-logo"
import { motion, AnimatePresence } from "framer-motion"
import { EnhancedMenu } from "@/components/enhanced-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { InvertColorsToggle } from "@/components/invert-colors-toggle"

type Command = {
  input: string
  output: React.ReactNode
  timestamp: Date
}

interface TerminalProps {
  initialCommand?: string | null
}

export default function Terminal({ initialCommand = null }: TerminalProps) {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<Command[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [isMenuVisible, setIsMenuVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [cursorBlink, setCursorBlink] = useState(true)
  const initialCommandExecuted = useRef(false)
  const commandExecuting = useRef(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Use useCallback to memoize the scrollToBottom function
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      }, 100)
    }
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent, commandOverride?: string) => {
      e.preventDefault()

      const commandToExecute = commandOverride || input.trim() || e.currentTarget?.getAttribute?.("data-command") || ""
      if (!commandToExecute) return

      let output: React.ReactNode

      // Process command
      switch (commandToExecute.toLowerCase()) {
        case "help":
          output = (
            <div className="space-y-2 text-gray-800">
              <p className="font-bold text-gray-900">Available commands:</p>
              <ul className="space-y-1 text-gray-800">
                <li>
                  <span className="font-bold text-var-color-5">about</span> - Learn about HNUSEC
                </li>
                <li>
                  <span className="font-bold text-var-color-5">honors</span> - View honors and awards
                </li>
                <li>
                  <span className="font-bold text-var-color-5">contact</span> - Get contact information
                </li>
                <li>
                  <span className="font-bold text-var-color-5">links</span> - View friendship links
                </li>
                <li>
                  <span className="font-bold text-var-color-5">clear</span> - Clear the terminal
                </li>
                <li>
                  <span className="font-bold text-var-color-5">help</span> - Show this help message
                </li>
                <li>
                  <span className="font-bold text-var-color-5">scan</span> - Run a security scan
                </li>
                <li>
                  <span className="font-bold text-var-color-5">menu</span> - Toggle menu visibility
                </li>
                <li>
                  <span className="font-bold text-var-color-5">whoami</span> - Users
                </li>
              </ul>
            </div>
          )
          setCurrentSection(null)
          break

        case "about":
          output = <AboutSection />
          setCurrentSection("about")
          break

        case "honors":
          output = <HonorsSection />
          setCurrentSection("honors")
          break

        case "contact":
          output = <ContactSection />
          setCurrentSection("contact")
          break

        case "links":
        case "友情链接":
          output = <FriendshipLinksSection />
          setCurrentSection("links")
          break

        case "clear":
          setCommandHistory([])
          setCurrentSection(null)
          setInput("")
          return

        case "menu":
          setIsMenuVisible(!isMenuVisible)
          output = <p className="text-gray-800">Menu {isMenuVisible ? "hidden" : "shown"}.</p>
          break

        case "whoami":
          output = <p className="text-gray-800">HnuSec-guest</p>
          setCurrentSection(null)
          break

        case "scan":
          output = (
            <div className="space-y-2 text-gray-800">
              <div className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-var-color-5" />
                <p className="font-medium text-gray-900">Running security scan...</p>
              </div>
              <pre className="my-2 rounded bg-var-color-3/30 p-2 text-xs text-gray-800 border border-var-color-5/20">
                {`
[+] Scanning system for vulnerabilities...
[+] Checking for open ports...
[+] Analyzing network traffic...
[+] Inspecting file integrity...
[+] Scanning for malware signatures...
[+] Checking for suspicious processes...
[+] Verifying system integrity...
`}
              </pre>
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-var-color-5" />
                <p className="text-var-color-5">Scan complete! No threats detected. System secure.</p>
              </div>
            </div>
          )
          setCurrentSection(null)
          break

        default:
          output = (
            <p className="text-gray-800">
              Command not found: {commandToExecute}. Type <span className="font-bold text-var-color-5">help</span> to
              see available commands.
            </p>
          )
          setCurrentSection(null)
      }

      // Add command to history
      setCommandHistory((prev) => [
        ...prev,
        {
          input: commandToExecute,
          output,
          timestamp: new Date(),
        },
      ])

      // Reset input and history index
      setInput("")
      setHistoryIndex(-1)

      // Scroll to bottom after adding new content
      setTimeout(scrollToBottom, 100)
    },
    [input, isMenuVisible, scrollToBottom],
  )

  const executeCommand = useCallback(
    (cmd: string) => {
      if (commandExecuting.current) return

      commandExecuting.current = true
      setInput(cmd)

      // Small delay to show the command being typed
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent, cmd)
        commandExecuting.current = false
      }, 50)
    },
    [handleSubmit]
  )

  useEffect(() => {
    // Focus input on mount and when clicking anywhere in the terminal (only on desktop)
    if (!isMobile) {
      inputRef.current?.focus()

      const handleClick = () => {
        inputRef.current?.focus()
      }

      document.addEventListener("click", handleClick)

      return () => {
        document.removeEventListener("click", handleClick)
      }
    }
  }, [isMobile])

  useEffect(() => {
    // Add welcome message
    setCommandHistory([
      {
        input: "welcome",
        output: (
          <div className="space-y-2 bg-var-color-3/20 p-4 rounded-md border border-var-color-5/30">
            <ImageAsciiLogo />
            <p className="font-mono text-gray-900">
              Welcome to HNUSEC's cybersecurity portfolio!
              {!isMobile && (
                <span>
                  {" "}
                  Type <span className="text-var-color-5">help</span> to see available commands.
                </span>
              )}
            </p>
          </div>
        ),
        timestamp: new Date(),
      },
    ])
  }, [isMobile])

  // Execute initial command if provided
  useEffect(() => {
    if (initialCommand && !initialCommandExecuted.current) {
      // Wait a bit to ensure the terminal is ready
      const timer = setTimeout(() => {
        executeCommand(initialCommand)
        initialCommandExecuted.current = true
      }, 800) // Increased delay to ensure terminal is fully loaded

      return () => clearTimeout(timer)
    }
  }, [initialCommand, executeCommand])

  // Check for command in sessionStorage
  useEffect(() => {
    const storedCommand = sessionStorage.getItem("terminalCommand")
    if (storedCommand && !initialCommandExecuted.current) {
      // Clear the command from sessionStorage to prevent re-execution on refresh
      sessionStorage.removeItem("terminalCommand")

      // Wait a bit to ensure the terminal is ready
      const timer = setTimeout(() => {
        executeCommand(storedCommand)
        initialCommandExecuted.current = true
      }, 800) // Increased delay to ensure terminal is fully loaded

      return () => clearTimeout(timer)
    }
  }, [executeCommand])

  useEffect(() => {
    scrollToBottom()
  }, [commandHistory, currentSection, scrollToBottom])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle up/down arrows for command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex].input)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div className="flex h-full flex-col pb-20">
      <motion.div
        className="flex items-center rounded-t-md border border-var-color-5/30 bg-[#f0f0f5]/95 p-2 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <TerminalIcon className="mr-2 h-4 w-4 text-var-color-5" />
        <span className="text-sm font-mono text-gray-900">
          hnusec@cybersec ~ {currentSection ? `/${currentSection}` : ""}
        </span>
        <div className="ml-auto flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/70 transition-colors hover:bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70 transition-colors hover:bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-var-color-5/70 transition-colors hover:bg-var-color-5" />
        </div>
      </motion.div>

      <motion.div
        ref={terminalRef}
        className="flex-1 overflow-y-auto border-x border-var-color-5/30 bg-[#f0f0f5]/30 p-4 font-mono text-base text-gray-800 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {commandHistory.map((cmd, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center text-gray-900">
                <span className="mr-2 text-var-color-5">$</span>
                <span>{cmd.input}</span>
              </div>
              <div className="ml-4 mt-1 text-gray-800">{cmd.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Only show input field on desktop */}
      {!isMobile ? (
        <motion.div
          className="rounded-b-md border border-var-color-5/30 bg-[#f0f0f5]/95 p-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <form onSubmit={(e) => handleSubmit(e)} className="flex items-center">
            <span className="mr-2 text-var-color-5">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-base text-gray-900"
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck="false"
            />
            <span
              className={`text-var-color-5 ${cursorBlink ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
            >
              _
            </span>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="rounded-b-md border border-var-color-5/30 bg-[#f0f0f5]/95 p-3 backdrop-blur-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <p className="text-sm text-gray-600">Use the menu below to navigate</p>
        </motion.div>
      )}

      <AnimatePresence>
        {isMenuVisible && <EnhancedMenu currentSection={currentSection} executeCommand={executeCommand} />}
      </AnimatePresence>
    </div>
  )
}
