"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'

interface ZoomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    alt: string
}

export function ZoomImage({ alt, className, ...props }: ZoomImageProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div
                className={`relative group cursor-zoom-in ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <img
                    alt={alt}
                    className="rounded-lg shadow-lg max-w-full h-auto border border-gray-200 hover:border-var-color-5/50 transition-colors mx-auto"
                    {...props}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                        <motion.img
                            layoutId={`image-${props.src}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={props.src}
                            alt={alt}
                            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl relative z-10 cursor-zoom-out"
                        />
                        {alt && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-4 left-0 right-0 text-center text-gray-300 text-sm font-medium px-4 pointer-events-none z-10"
                            >
                                {alt}
                            </motion.p>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
