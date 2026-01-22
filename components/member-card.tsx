"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface Member {
  id: string
  name: string
  avatar: string
  intro: string
  blog: string
  tags: string[]
}

interface MemberCardProps {
  member: Member
}

// Function to get tag color based on tag name
function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    Web: "bg-blue-100 text-blue-600 border border-blue-200",
    Pentest: "bg-red-100 text-red-600 border border-red-200",
    Crypto: "bg-purple-100 text-purple-600 border border-purple-200",
    Algorithm: "bg-indigo-100 text-indigo-600 border border-indigo-200",
    Reverse: "bg-green-100 text-green-600 border border-green-200",
    Pwn: "bg-orange-100 text-orange-600 border border-orange-200",
    Network: "bg-cyan-100 text-cyan-600 border border-cyan-200",
    Forensics: "bg-teal-100 text-teal-600 border border-teal-200",
    Misc: "bg-gray-100 text-gray-600 border border-orange-200",
    Malware: "bg-rose-100 text-rose-600 border border-rose-200",
    Cloud: "bg-sky-100 text-sky-600 border border-sky-200",
    DevSecOps: "bg-emerald-100 text-emerald-600 border border-emerald-200",
    Mobile: "bg-violet-100 text-violet-600 border border-violet-200",
    "Red Team": "bg-red-100 text-red-600 border border-red-200",
    "Social Engineering": "bg-amber-100 text-amber-600 border border-amber-200",
    "Blue Team": "bg-blue-100 text-blue-600 border border-blue-200",
    DFIR: "bg-indigo-100 text-indigo-600 border border-indigo-200",
    Hardware: "bg-slate-100 text-slate-600 border border-slate-200",
    IoT: "bg-lime-100 text-lime-600 border border-lime-200",
    Kernel: "bg-yellow-100 text-yellow-600 border border-yellow-200",
    Blockchain: "bg-yellow-100 text-yellow-600 border border-yellow-200",
    Geek: "bg-sky-100 text-sky-600 border border-sky-20",
    Dev: "bg-sky-100 text-sky-600 border border-red-20",
    Hacker: "bg-sky-100 text-sky-600 border border-white-20",
  }

  return colors[tag] || "bg-gray-100 text-gray-600 border border-blue-200"
}

export function MemberCard({ member }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const fallbackAvatar = "https://www.loliapi.com/acg/pp/"
  const [avatarSrc, setAvatarSrc] = useState(member.avatar || fallbackAvatar)

  // Use IntersectionObserver to detect when card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="overflow-hidden rounded-xl bg-white/90 p-6 shadow-sm transition-all hover:shadow-lg hover:bg-white relative border border-var-color-5/30 backdrop-blur-sm"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
    >
      {/* Static border with hover effect instead of animated borders */}
      <div
        className="absolute inset-0 border border-var-color-5/30 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Animated background gradient - use CSS instead of motion for better performance */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-var-color-5/0 via-var-color-5/5 to-var-color-5/0 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: "translateX(-100%)",
          animation: isHovered ? "shimmer 1.5s infinite" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      <div className="flex items-start space-x-4 relative z-10">
        <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-sm border border-var-color-5/20">
          <Image
            src={avatarSrc}
            alt={member.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            onError={() => {
              if (avatarSrc !== fallbackAvatar) {
                setAvatarSrc(fallbackAvatar)
              }
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{member.name}</h3>
            <span
              className="text-sm font-mono text-var-color-5"
              style={{
                opacity: isHovered ? 1 : 0.7,
                transition: "opacity 0.2s ease",
              }}
            >
              {member.id}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {member.tags.map((tag, index) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getTagColor(tag)}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.8)",
                  transition: `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-black/80">{member.intro}</p>
      <div
        className="mt-4 flex justify-end"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.2s ease",
        }}
      >
        <a
          href={member.blog}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-var-color-5 transition-colors hover:text-var-color-4 hover:underline"
        >
          <span>访问博客</span>
          <span
            style={{
              transform: isHovered ? "translateX(3px)" : "translateX(0)",
              transition: "transform 0.2s ease",
            }}
          >
            <ExternalLink className="ml-1 h-3 w-3" />
          </span>
        </a>
      </div>
    </motion.div>
  )
}
