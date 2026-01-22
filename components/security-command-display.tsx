"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "lucide-react"

// List of security tool commands to cycle through
const securityCommands = [
  "nmap -sS -sV -p- --min-rate 5000 10.0.0.0/24",
  "fscan -h 192.168.1.1/24 -p 1-65535",
  "echo 'You should try WatchDog!'",
  "crackmapexec smb 10.10.10.0/24 -u user -p password",
  "gobuster dir -u https://orxiain.life -w wordlist.txt",
  'sqlmap -u "https://boogipop.com/?id=1" --dbs',
  "hydra -l admin -P passwords.txt 10.10.10.1 ssh",
  "wpscan --url https://www.bx33661.com/ --enumerate u",
  "nikto -h https://natro92.fun/ -ssl",
  "dirb https://ewoji.cn/ /usr/share/wordlists/dirb/common.txt",
  "masscan -p1-65535 10.0.0.0/24 --rate=1000",
  "echo 'You should try OuterWilds!'",
  "echo '下雨天客留 天留我不留'",
  "echo '我想没人会留意这个终端会打出什么吧'",
  "灵感菇灵菇灵菇灵哇擦灵感菇灵感菇",
  "rpcclient -U \"\" -N mi1n9.github.io",
]

export function SecurityCommandDisplay() {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const typingSpeed = 60 // ms per character
  const deleteSpeed = 30 // ms per character when deleting
  const pauseBeforeDelete = 2000 // ms to wait before deleting
  const pauseBeforeNextCommand = 500 // ms to wait before typing next command
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 获取随机命令索引的函数，确保与当前索引不同
  const getRandomCommandIndex = (currentIdx: number) => {
    if (securityCommands.length <= 1) return 0
    
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * securityCommands.length)
    } while (newIndex === currentIdx)
    
    return newIndex
  }

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Effect to handle the typing animation
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (isTyping) {
      // Typing mode
      if (charIndex < securityCommands[currentIndex].length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(securityCommands[currentIndex].substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        }, typingSpeed)
      } else {
        // Finished typing, pause before deleting
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false)
        }, pauseBeforeDelete)
      }
    } else {
      // Deleting mode
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(securityCommands[currentIndex].substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        }, deleteSpeed)
      } else {
        // Finished deleting, move to random next command
        const nextIndex = getRandomCommandIndex(currentIndex)
        timeoutRef.current = setTimeout(() => {
          setCurrentIndex(nextIndex)
          setIsTyping(true)
        }, pauseBeforeNextCommand)
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [charIndex, currentIndex, isTyping])

  return (
    <div className="rounded-lg border-2 border-var-color-5/30 bg-transparent p-4 shadow-lg overflow-hidden">
      <div className="flex items-center mb-2">
        <Terminal className="h-5 w-5 text-var-color-5 mr-2" />
        <div className="text-sm font-medium text-var-color-5">Security Tools</div>
      </div>
      <div className="font-mono dark:text-white text-black flex items-center">
        <span className="text-var-color-5 mr-2">$</span>
        <div className="overflow-hidden whitespace-nowrap">
          <span>{displayedText}</span>
          <span
            className={`inline-block h-4 w-2 bg-var-color-5 ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`}
          ></span>
        </div>
      </div>
    </div>
  )
}
