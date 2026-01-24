"use client"

import { useState, useEffect } from 'react'
import { Search, Command, FileText } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface SearchItem {
    title: string
    path: string
    category: string
}

export function DocSearch({ items }: { items: SearchItem[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchItem[]>([])
    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (!query) {
            setResults([])
            return
        }
        const lowerQuery = query.toLowerCase()
        const filtered = items.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.path.toLowerCase().includes(lowerQuery)
        ).slice(0, 10) // Limit results
        setResults(filtered)
    }, [query, items])

    const handleSelect = (path: string) => {
        router.push(path)
        setIsOpen(false)
        setQuery('')
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-white/50 border border-gray-200 rounded-md hover:border-var-color-5/50 hover:text-var-color-5 transition-all w-full md:w-64"
            >
                <Search className="w-4 h-4" />
                <span>Search docs...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-50 px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <button
                onClick={() => setIsOpen(true)}
                className="sm:hidden p-2 text-gray-500 hover:text-var-color-5 transition-colors"
                title="Search"
            >
                <Search className="w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center px-4 py-3 border-b border-gray-100">
                                <Search className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search documentation..."
                                    className="flex-1 text-base outline-none text-gray-900 placeholder:text-gray-400"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-2 py-1 text-xs text-gray-400 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                >
                                    ESC
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {results.length > 0 ? (
                                    <div className="space-y-1">
                                        {results.map((result, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelect(result.path)}
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-var-color-5/5 group transition-colors text-left"
                                            >
                                                <FileText className="w-4 h-4 text-gray-400 group-hover:text-var-color-5" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-gray-700 group-hover:text-var-color-5 truncate">
                                                        {result.title}
                                                    </div>
                                                    <div className="text-xs text-gray-400 flex items-center gap-1 text-left">
                                                        <span className="capitalize">{result.category}</span>
                                                    </div>
                                                </div>
                                                <Command className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100" />
                                            </button>
                                        ))}
                                    </div>
                                ) : query ? (
                                    <div className="text-center py-8 text-sm text-gray-500">
                                        No results found for "{query}"
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-sm text-gray-400">
                                        Type to search...
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
