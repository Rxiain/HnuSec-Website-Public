"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DocSidebar } from './doc-sidebar'

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

interface MobileDocSidebarProps {
    toc: TocItem[]
    relatedDocs: RelatedDoc[]
    currentDirection: string
    tree?: DirectoryNode[]
    activePath?: string
}

export function MobileDocSidebar({ toc, relatedDocs, currentDirection, tree, activePath }: MobileDocSidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-var-color-5 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Backdrop and Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-80 bg-white/95 backdrop-blur-md shadow-2xl z-50 lg:hidden overflow-y-auto border-l border-var-color-5/10"
                        >
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10">
                                <h2 className="font-bold text-lg text-gray-800">文档导航</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-500 hover:text-var-color-5 hover:bg-var-color-5/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-4 pb-20">
                                <DocSidebar
                                    toc={toc}
                                    relatedDocs={relatedDocs}
                                    currentDirection={currentDirection}
                                    tree={tree}
                                    className="w-full"
                                    onLinkClick={() => setIsOpen(false)}
                                    activePath={activePath}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
