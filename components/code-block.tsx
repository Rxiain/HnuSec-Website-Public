"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '')
    const codeString = String(children).replace(/\n$/, '')
    const isMultiLine = codeString.includes('\n')
    const [copied, setCopied] = useState(false)

    // Heuristic: If it's not inline, but has no language, is single line, and short (< 50 chars),
    // render it as a "light block" instead of a heavy terminal window.
    const isLightBlock = !inline && !match && !isMultiLine && codeString.length < 50

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codeString)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    if (isLightBlock) {
        return (
            <code className="bg-gray-100 text-[#d63384] px-2 py-1 rounded text-[0.95em] font-mono border border-gray-200 block w-fit my-1.5" {...props}>
                {children}
            </code>
        )
    }

    return !inline ? (
        <div className="relative group my-6 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800 overflow-hidden">
            {(isMultiLine || match) && (
                <div className="flex items-center justify-between px-3 py-2 bg-[#252526] border-b border-[#333]">
                    <div className="flex items-center gap-2">
                        <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                        </div>
                        {match && (
                            <span className="ml-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
                                {match[1]}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                        title="Copy code"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}
            {!isMultiLine && !match && (
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-[#1e1e1e]/50 rounded"
                    title="Copy code"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
            )}
            <div className="relative">
                <pre className={`overflow-x-auto font-mono text-sm text-gray-300 leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent ${isMultiLine ? 'p-4' : 'p-3'}`}>
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            </div>
        </div>
    ) : (
        <code className="bg-gray-100 text-[#d63384] px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-gray-200 mx-0.5 align-middle break-words" {...props}>
            {children}
        </code>
    )
}
