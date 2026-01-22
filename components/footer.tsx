"use client"

import { useState, useRef, useEffect } from "react"
import { Shield, Mail, ExternalLink, X, Code, Heart, Wrench } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Version info panel component
function VersionPanel({ isOpen, onClose, onExpand }: { isOpen: boolean; onClose: () => void; onExpand: () => void }) {
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose()
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={panelRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[240px] z-50"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-var-color-5/10 border border-var-color-5/30 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-var-color-5" />
                        </div>
                        <div>
                            <div className="font-bold font-mono text-gray-900">HnuSec Website</div>
                            <button
                                onClick={onExpand}
                                className="text-sm text-orange-500 hover:text-orange-600 font-mono cursor-pointer transition-colors"
                            >
                                v2.0.1
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="font-mono">hnusec@163.com</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Detailed info modal
function DetailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const developers = [
        { name: "orxiain.", link: "https://orxiain.life/" },
        { name: "bx33661", link: "https://www.bx33661.com/" },
    ]

    const thanks = [
        { name: "HnuSec Team", link: "#" },
        { name: "海南大学网络空间安全学院", link: "https://www.hainanu.edu.cn" },
    ]

    const technologies = [
        { name: "React", link: "https://react.dev" },
        { name: "Next.js", link: "https://nextjs.org" },
        { name: "Tailwind CSS", link: "https://tailwindcss.com" },
        { name: "Framer Motion", link: "https://framer.com/motion" },
        { name: "Lucide Icons", link: "https://lucide.dev" },
        { name: "TypeScript", link: "https://typescriptlang.org" },
    ]

    const buildTime = new Date().toISOString()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-var-color-5/10 border border-var-color-5/30 flex items-center justify-center">
                            <Shield className="w-7 h-7 text-var-color-5" />
                        </div>
                        <div>
                            <div className="font-bold font-mono text-lg text-gray-900">HnuSec Website</div>
                            <div className="text-sm text-orange-500 font-mono">v2.0.1</div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Developers */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Code className="w-4 h-4" />
                        <span>Developer:</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {developers.map((dev) => (
                            <Link
                                key={dev.name}
                                href={dev.link}
                                target="_blank"
                                className="flex items-center gap-1 text-sm text-gray-700 hover:text-var-color-5 transition-colors"
                            >
                                <ExternalLink className="w-3 h-3" />
                                <span>{dev.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Thanks */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-red-400 mb-2">
                        <Heart className="w-4 h-4" />
                        <span>Thanks</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {thanks.map((t) => (
                            <Link
                                key={t.name}
                                href={t.link}
                                target="_blank"
                                className="flex items-center gap-1 text-sm text-gray-700 hover:text-var-color-5 transition-colors"
                            >
                                <ExternalLink className="w-3 h-3" />
                                <span>{t.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-cyan-500 mb-2">
                        <Wrench className="w-4 h-4" />
                        <span>Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                            <Link
                                key={tech.name}
                                href={tech.link}
                                target="_blank"
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-var-color-5 transition-colors"
                            >
                                <ExternalLink className="w-3 h-3" />
                                <span>{tech.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
                    <p>这是一个用于 HnuSec 团队的官方网站 :)</p>
                    <p className="font-mono text-xs text-gray-400 mt-1">
                        Build time {buildTime}
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export function Footer() {
    const currentYear = new Date().getFullYear()
    const [showPanel, setShowPanel] = useState(false)
    const [showDetail, setShowDetail] = useState(false)

    return (
        <>
            <footer className="relative z-20 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-mono flex-wrap">
                    <Shield className="w-4 h-4 text-var-color-5" />
                    <span>© {currentYear}</span>
                    <span className="text-var-color-5 font-medium">HnuSec Team</span>
                    <span>/</span>
                    <Link
                        href="https://www.hainanu.edu.cn"
                        target="_blank"
                        className="hover:text-var-color-5 transition-colors"
                    >
                        海南大学
                    </Link>
                    <span>/</span>
                    <div className="relative">
                        <button
                            onClick={() => setShowDetail(true)}
                            className="hover:text-var-color-5 transition-colors cursor-pointer"
                        >
                            🔗
                        </button>
                        <VersionPanel
                            isOpen={showPanel}
                            onClose={() => setShowPanel(false)}
                            onExpand={() => {
                                setShowPanel(false)
                                setShowDetail(true)
                            }}
                        />
                    </div>
                </div>
            </footer>
            <DetailModal isOpen={showDetail} onClose={() => setShowDetail(false)} />
        </>
    )
}
