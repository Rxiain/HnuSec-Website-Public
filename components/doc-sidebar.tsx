"use client"

import { useState, useEffect } from 'react'
import { BookOpen, Copy, Check, ChevronRight, List, FileText, Clock, Tag, Folder, FolderOpen } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface TocItem {
    level: number
    text: string
    id: string
}

interface RelatedDoc {
    title: string
    path: string
}

interface DirectoryNode {
    name: string
    path: string
    type: 'file' | 'directory'
    children?: DirectoryNode[]
}

interface DocSidebarProps {
    toc: TocItem[]
    relatedDocs: RelatedDoc[]
    currentDirection: string
    tree?: DirectoryNode[]
    className?: string
    onLinkClick?: () => void
    activePath?: string
}

// Recursive Folder Component
const FolderItem = ({ node, level = 0, onLinkClick, activePath }: { node: DirectoryNode; level?: number; onLinkClick?: () => void; activePath?: string }) => {
    // Open if current level is 0 OR if any child is active
    const isActive = activePath === node.path

    // Check if any children contain the active path to auto-expand
    const hasActiveChild = (n: DirectoryNode): boolean => {
        if (n.path === activePath) return true
        if (n.children) return n.children.some(hasActiveChild)
        return false
    }

    const shouldBeOpen = level === 0 || (node.children && node.children.some(hasActiveChild))
    const [isOpen, setIsOpen] = useState(shouldBeOpen)

    // Update open state if active path changes
    useEffect(() => {
        if (node.children && node.children.some(hasActiveChild)) {
            setIsOpen(true)
        }
    }, [activePath, node.children])

    if (node.type === 'file') {
        return (
            <Link
                href={node.path}
                onClick={onLinkClick}
                className={`flex items-center text-sm transition-colors py-1 pl-2 border-l hover:border-var-color-5/30 ${isActive
                    ? 'text-var-color-5 font-medium border-var-color-5 bg-var-color-5/5'
                    : 'text-gray-600 border-transparent hover:text-var-color-5'}`}
            >
                <FileText className={`w-3.5 h-3.5 mr-2 shrink-0 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                <span className="line-clamp-1">{node.name}</span>
            </Link>
        )
    }

    return (
        <div className="my-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center w-full text-left text-sm font-medium transition-colors py-1 ${shouldBeOpen || isOpen ? 'text-gray-900' : 'text-gray-700'} hover:text-var-color-5`}
            >
                <ChevronRight className={`w-3.5 h-3.5 mr-1.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                {isOpen ? <FolderOpen className="w-4 h-4 mr-1.5 text-var-color-5/80" /> : <Folder className="w-4 h-4 mr-1.5 text-gray-400" />}
                <span className="truncate">{node.name}</span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 border-l border-var-color-5/10 ml-2"
                    >
                        {node.children?.map((child, idx) => (
                            <FolderItem key={idx} node={child} level={level + 1} onLinkClick={onLinkClick} activePath={activePath} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function DocSidebar({ toc, relatedDocs, currentDirection, tree, className = "hidden lg:block w-72 shrink-0", onLinkClick, activePath }: DocSidebarProps) {
    const [activeId, setActiveId] = useState<string>('')
    const [readingProgress, setReadingProgress] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-100px 0px -80% 0px' }
        )

        toc.forEach((item) => {
            const element = document.getElementById(item.id)
            if (element) observer.observe(element)
        })

        // Auto scroll to active path in tree
        // Not implemented in this useEffect, but handled by the initial render or a separate effect if needed.
        // Actually, let's just use CSS 'scroll-mt' or a simple ref if we had one.
        // For simplicity, we assume the user expands the tree, but if we want auto-scroll:
        const activeLink = document.querySelector(`a[href="${activePath}"]`)
        if (activeLink) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }

        return () => observer.disconnect()
    }, [toc, activePath])

    // Reading progress
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setReadingProgress(Math.min(100, Math.max(0, progress)))
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const directionColors: Record<string, string> = {
        web: 'text-blue-600 border-blue-500 bg-blue-50',
        pwn: 'text-red-600 border-red-500 bg-red-50',
        crypto: 'text-green-600 border-green-500 bg-green-50',
        reverse: 'text-purple-600 border-purple-500 bg-purple-50',
        misc: 'text-orange-600 border-orange-500 bg-orange-50',
        dev: 'text-cyan-600 border-cyan-500 bg-cyan-50',
    }

    const color = directionColors[currentDirection.toLowerCase()] || 'text-var-color-5 border-var-color-5 bg-var-color-5/10'

    return (
        <aside className={className}>
            <div className={`sticky top-24 space-y-6 ${tree ? 'max-h-[calc(100vh-8rem)] overflow-y-auto pr-1' : ''}`}>
                {/* Reading Progress */}
                <div className="bg-white/60 backdrop-blur-md rounded-lg border border-var-color-5/20 p-4 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">阅读进度</span>
                        <span className="text-xs font-mono text-var-color-5">{Math.round(readingProgress)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-var-color-5 to-var-color-4 transition-all duration-300"
                            style={{ width: `${readingProgress}%` }}
                        />
                    </div>
                </div>

                {/* Directory Tree (If Available) */}
                {tree && tree.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-md rounded-lg border border-var-color-5/20 p-4 shadow-md">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-var-color-5/10">
                            <FolderOpen className="w-5 h-5 text-var-color-5" />
                            <h3 className="font-bold text-var-color-5">归档目录</h3>
                        </div>
                        <nav className="space-y-1">
                            {tree.map((node, idx) => (
                                <FolderItem key={idx} node={node} onLinkClick={onLinkClick} activePath={activePath} />
                            ))}
                        </nav>
                    </div>
                )}

                {/* Table of Contents */}
                {toc.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-md rounded-lg border border-var-color-5/20 p-4 shadow-md">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-var-color-5/10">
                            <List className="w-5 h-5 text-var-color-5" />
                            <h3 className="font-bold text-var-color-5">目录</h3>
                        </div>
                        <nav className="space-y-1 max-h-[35vh] overflow-y-auto pr-2">
                            {toc.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToHeading(item.id)}
                                    className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-all hover:bg-var-color-5/10 ${activeId === item.id
                                        ? 'text-var-color-5 font-medium bg-var-color-5/5 border-l-2 border-var-color-5'
                                        : 'text-gray-600 border-l-2 border-transparent'
                                        }`}
                                    style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                                >
                                    <span className="line-clamp-2">{item.text}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Related Articles - Only show if NO tree is present, to avoid clutter */}
                {!tree && relatedDocs.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-md rounded-lg border border-var-color-5/20 p-4 shadow-md">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-var-color-5/10">
                            <FileText className="w-5 h-5 text-var-color-5" />
                            <h3 className="font-bold text-var-color-5">同方向文章</h3>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 mb-3 rounded text-xs font-mono border ${color}`}>
                            <Tag className="w-3 h-3" />
                            {currentDirection.toUpperCase()}
                        </div>
                        <nav className="space-y-2">
                            {relatedDocs.map((doc, idx) => (
                                <Link
                                    key={idx}
                                    href={doc.path}
                                    onClick={onLinkClick}
                                    className="flex items-center text-sm text-gray-600 hover:text-var-color-5 transition-colors group py-1"
                                >
                                    <ChevronRight className="w-3 h-3 mr-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    <span className="line-clamp-1">{doc.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </aside>
    )
}

// Code copy button component
export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            title="复制代码"
        >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
    )
}
