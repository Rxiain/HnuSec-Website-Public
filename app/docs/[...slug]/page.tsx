import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { getDocBySlug, extractHeadings, getRelatedDocs } from '@/lib/docs'
import { TerminalButton } from "@/components/terminal-button"
import { MouseTrail } from "@/components/mouse-trail"
import { CyberParticles } from "@/components/cyber-particles"
import { BackgroundDecoration } from "@/components/background-decoration"
import { DocSidebar } from "@/components/doc-sidebar"
import { MobileDocSidebar } from "@/components/mobile-doc-sidebar"
import { Footer } from "@/components/footer"
import { DocThemeToggle } from "@/components/doc-theme-toggle"
import { ZoomImage } from "@/components/zoom-image"
import { CodeBlock } from "@/components/code-block"
import { BackToTop } from "@/components/back-to-top"
import Link from 'next/link'
import { ArrowLeft, Home, BookOpen, Clock, Tag, FileText, ChevronRight, ChevronLeft } from 'lucide-react'

// Direction info mapping
const directionInfo: Record<string, { name: string; color: string; bgColor: string }> = {
    web: { name: 'Web 安全', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    pwn: { name: 'Pwn 二进制', color: 'text-red-600', bgColor: 'bg-red-50' },
    crypto: { name: 'Crypto 密码学', color: 'text-green-600', bgColor: 'bg-green-50' },
    reverse: { name: 'Reverse 逆向', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    misc: { name: 'Misc 杂项', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    dev: { name: 'Dev 开发', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    file: { name: '文件处理', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    others: { name: '其他', color: 'text-gray-600', bgColor: 'bg-gray-50' },
}

// Custom components for markdown rendering
const MarkdownComponents = {
    h1: ({ node, ...props }: any) => <h1 id={props.id} className="scroll-mt-24 text-3xl md:text-4xl font-black text-gray-900 mb-6 mt-10 pb-4 border-b border-gray-200" {...props} />,
    h2: ({ node, ...props }: any) => <h2 id={props.id} className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-800 mb-4 mt-12 flex items-center gap-2 group" {...props} >
        <span className="w-1.5 h-8 bg-var-color-5 rounded-full inline-block mr-2"></span>
        {props.children}
    </h2>,
    h3: ({ node, ...props }: any) => <h3 id={props.id} className="scroll-mt-24 text-xl md:text-2xl font-bold text-gray-800 mb-3 mt-8 flex items-center" {...props} >
        <span className="text-var-color-5 mr-2 opacity-60">#</span>
        {props.children}
    </h3>,
    h4: ({ node, ...props }: any) => <h4 id={props.id} className="scroll-mt-24 text-lg font-bold text-gray-700 mb-2 mt-6 uppercase tracking-wider" {...props} />,

    p: ({ node, ...props }: any) => <div className="text-base md:text-lg leading-7 mb-6 text-gray-700 font-sans" {...props} />,

    ul: ({ node, ...props }: any) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700 marker:text-var-color-5" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700 marker:text-var-color-5 marker:font-bold" {...props} />,
    li: ({ node, ...props }: any) => <li className="pl-1" {...props} />,

    a: ({ node, href, ...props }: any) => (
        <a
            href={href}
            className="text-var-color-5 font-medium underline decoration-var-color-5/30 hover:decoration-var-color-5 underline-offset-2 transition-all break-words"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        />
    ),

    blockquote: ({ node, ...props }: any) => (
        <blockquote className="relative pl-6 py-4 my-8 bg-gray-50 rounded-r-lg text-gray-700 border-l-4 border-var-color-5 shadow-sm italic" {...props}>
            <div className="absolute top-2 left-1 text-4xl text-var-color-5 opacity-20 font-serif">"</div>
            {props.children}
        </blockquote>
    ),

    code: ({ node, inline, className, children, ...props }: any) => {
        return <CodeBlock inline={inline} className={className} {...props}>{children}</CodeBlock>
    },

    table: ({ node, ...props }: any) => (
        <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 shadow-md">
            <table className="w-full text-left border-collapse bg-white text-sm md:text-base" {...props} />
        </div>
    ),
    thead: ({ node, ...props }: any) => <thead className="bg-gray-50 border-b border-gray-200" {...props} />,
    th: ({ node, ...props }: any) => <th className="p-4 font-bold text-gray-900 tracking-wider whitespace-nowrap" {...props} />,
    tr: ({ node, ...props }: any) => <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0" {...props} />,
    td: ({ node, ...props }: any) => <td className="p-4 text-gray-600 align-top" {...props} />,

    img: ({ node, alt, ...props }: any) => (
        <figure className="my-10 flex flex-col items-center">
            <ZoomImage alt={alt} {...props} />
            {alt && (
                <figcaption className="text-center text-sm text-gray-500 mt-3 font-medium flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    {alt}
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                </figcaption>
            )}
        </figure>
    ),

    hr: ({ node, ...props }: any) => (
        <div className="my-12 flex items-center justify-center opacity-30">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <div className="mx-4 text-gray-400">***</div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
        </div>
    ),
    pre: ({ node, ...props }: any) => <span {...props} />,
}

interface NavItem {
    title: string
    path: string
}

// Utility to flatten directory tree into a linear list for navigation
function flattenTree(nodes: any[]): NavItem[] {
    let result: NavItem[] = []
    nodes.forEach(node => {
        if (node.type === 'file') {
            result.push({ title: node.name, path: node.path })
        } else if (node.children) {
            result = result.concat(flattenTree(node.children))
        }
    })
    return result
}

export default async function DocPage({ params }: { params: { slug?: string[] } }) {
    const { slug } = await params

    if (!slug || slug.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f0f0f5]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Documentation Index</h1>
                    <p>Please select a document.</p>
                    <Link href="/" className="text-var-color-5 hover:underline mt-4 block">Return Home</Link>
                </div>
            </div>
        )
    }

    let doc
    try {
        doc = getDocBySlug(slug)
    } catch (error: any) {
        console.error("Error loading doc:", error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f0f5] p-4 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Documentation Error</h1>
                <p className="mb-4">Could not load document: {slug.join('/')}</p>
                <div className="bg-gray-100 p-4 rounded text-left text-sm font-mono overflow-auto max-w-full">
                    {error?.message || String(error)}
                </div>
                <Link href="/" className="text-var-color-5 hover:underline mt-8 block">Return Home</Link>
            </div>
        )
    }

    const toc = extractHeadings(doc.content)
    const relatedDocs = getRelatedDocs(slug)
    const currentDirection = slug[0] || 'docs'
    const dirInfo = directionInfo[currentDirection.toLowerCase()] || { name: currentDirection, color: 'text-var-color-5', bgColor: 'bg-var-color-5/10' }

    // Extract title from first h1 or use slug
    const titleMatch = doc.content.match(/^#\s+(.+)$/m)
    const docTitle = titleMatch ? titleMatch[1] : decodeURIComponent(slug[slug.length - 1])

    // Estimate reading time (assuming 200 words per minute for Chinese)
    const wordCount = doc.content.length
    const readingTime = Math.max(1, Math.ceil(wordCount / 400))

    // Special handling for old site archive: get full tree
    let directoryTree = undefined
    if (slug[0] === 'archives' && slug[1] === 'old-site') {
        const { getDirectoryTree } = require('@/lib/docs')
        directoryTree = getDirectoryTree('archives/old-site', 'archives/old-site')
    }

    // Determine Prev/Next Navigation
    let prevItem: NavItem | null = null
    let nextItem: NavItem | null = null

    if (directoryTree) {
        // Use full tree for archives
        const flatList = flattenTree(directoryTree)
        // Fuzzy match current path (slug join vs path) or just simple normalization
        // The tree paths start with /docs/archives/old-site...
        const currentPath = `/docs/${slug.join('/')}`
        const currentIndex = flatList.findIndex(item => item.path === currentPath || item.path === decodeURIComponent(currentPath))

        if (currentIndex >= 0) {
            if (currentIndex > 0) prevItem = flatList[currentIndex - 1]
            if (currentIndex < flatList.length - 1) nextItem = flatList[currentIndex + 1]
        }
    } else {
        // Use relatedDocs (current directory peers) for regular docs
        // Re-read relatedDocs to find index. relatedDocs only has peers.
        // Assuming relatedDocs are in order.
        const currentPath = `/docs/${slug.join('/')}`
        const currentIndex = relatedDocs.findIndex(d => d.path === currentPath || d.path === decodeURIComponent(currentPath))

        if (currentIndex >= 0) {
            if (currentIndex > 0) prevItem = relatedDocs[currentIndex - 1]
            if (currentIndex < relatedDocs.length - 1) nextItem = relatedDocs[currentIndex + 1]
        }
    }

    return (
        <main className="relative min-h-screen bg-[#f0f0f5] text-black">
            <MouseTrail />
            <TerminalButton />
            <CyberParticles />
            <BackgroundDecoration />
            <MobileDocSidebar
                toc={toc}
                relatedDocs={relatedDocs}
                currentDirection={currentDirection}
                tree={directoryTree}
                activePath={`/docs/${slug.join('/')}`}
            />

            <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiM2YjZiZmYwNSIgZmlsbC1vcGFjaXR5PSIuMDUiLz48cGF0aCBkPSJNMzAgMGgzMHYzMEgzMHpNMCAwaDMwdjMwSDB6IiBmaWxsPSIjNmI2YmZmMDUiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:px-8">
                {/* Navigation */}
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <Link
                        href="/archives"
                        className="flex items-center px-4 py-2 bg-white/60 border border-var-color-5/20 rounded-lg hover:bg-var-color-5 text-var-color-5 hover:text-white transition-all text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span>归档</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center px-4 py-2 bg-white/60 border border-var-color-5/20 rounded-lg hover:bg-var-color-5 text-var-color-5 hover:text-white transition-all text-sm"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        <span>首页</span>
                    </Link>
                    <DocThemeToggle />
                    {/* Breadcrumb */}
                    <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500 font-mono ml-auto">
                        <FileText className="w-4 h-4" />
                        <span>docs</span>
                        {slug.map((s, i) => (
                            <React.Fragment key={i}>
                                <span>/</span>
                                <span className={i === slug.length - 1 ? 'text-var-color-5' : ''}>{decodeURIComponent(s)}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Main Content with Sidebar */}
                <div className="flex gap-8">
                    {/* Article Content */}
                    <article className="flex-1 min-w-0">
                        {/* Article Header */}
                        <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-t-xl border border-var-color-5/10 border-b-0">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${dirInfo.color} ${dirInfo.bgColor}`}>
                                    <Tag className="w-3 h-3" />
                                    {dirInfo.name}
                                </span>
                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    约 {readingTime} 分钟阅读
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <BookOpen className="w-7 h-7 text-var-color-5 shrink-0" />
                                {docTitle}
                            </h1>
                        </div>

                        {/* Article Body */}
                        <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-b-xl shadow-2xl border border-var-color-5/10 border-t-0">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw, rehypeSlug]}
                                components={MarkdownComponents}
                            >
                                {doc.content}
                            </ReactMarkdown>

                            {/* Article Footer & Navigation */}
                            <div className="mt-12 pt-8 border-t border-var-color-5/10">
                                {/* Prev/Next Navigation Buttons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {prevItem ? (
                                        <Link
                                            href={prevItem.path}
                                            className="group flex flex-col items-start p-4 bg-white border border-gray-200 rounded-xl hover:border-var-color-5 transition-all hover:shadow-md"
                                        >
                                            <span className="text-xs text-gray-400 mb-1 flex items-center group-hover:text-var-color-5">
                                                <ChevronLeft className="w-3 h-3 mr-1" />
                                                PREVIOUS
                                            </span>
                                            <span className="font-bold text-gray-700 group-hover:text-var-color-5 line-clamp-1">
                                                {prevItem.title}
                                            </span>
                                        </Link>
                                    ) : (
                                        <div />
                                    )}

                                    {nextItem ? (
                                        <Link
                                            href={nextItem.path}
                                            className="group flex flex-col items-end text-right p-4 bg-white border border-gray-200 rounded-xl hover:border-var-color-5 transition-all hover:shadow-md"
                                        >
                                            <span className="text-xs text-gray-400 mb-1 flex items-center group-hover:text-var-color-5">
                                                NEXT
                                                <ChevronRight className="w-3 h-3 ml-1" />
                                            </span>
                                            <span className="font-bold text-gray-700 group-hover:text-var-color-5 line-clamp-1">
                                                {nextItem.title}
                                            </span>
                                        </Link>
                                    ) : (
                                        <div />
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <DocSidebar
                        toc={toc}
                        relatedDocs={relatedDocs}
                        currentDirection={currentDirection}
                        tree={directoryTree}
                        activePath={`/docs/${slug.join('/')}`}
                    />
                </div>
            </div>

            <Footer />
            <BackToTop />
        </main>
    )
}
