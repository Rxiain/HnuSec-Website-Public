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
import { Footer } from "@/components/footer"
import { DocThemeToggle } from "@/components/doc-theme-toggle"
import Link from 'next/link'
import { ArrowLeft, Home, BookOpen, Clock, Tag, FileText } from 'lucide-react'

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
    h1: ({ node, ...props }: any) => <h1 id={props.id} className="scroll-mt-24 text-3xl md:text-4xl font-bold text-var-color-5 mb-6 mt-8 border-b border-var-color-5/30 pb-2" {...props} />,
    h2: ({ node, ...props }: any) => <h2 id={props.id} className="scroll-mt-24 text-2xl md:text-3xl font-bold text-var-color-5/90 mb-4 mt-10 flex items-center gap-2" {...props} />,
    h3: ({ node, ...props }: any) => <h3 id={props.id} className="scroll-mt-24 text-xl md:text-2xl font-bold text-var-color-4 mb-3 mt-8" {...props} />,
    h4: ({ node, ...props }: any) => <h4 id={props.id} className="scroll-mt-24 text-lg font-bold text-gray-700 mb-2 mt-6" {...props} />,
    p: ({ node, ...props }: any) => <div className="text-base leading-relaxed mb-4 text-gray-700" {...props} />,
    ul: ({ node, ...props }: any) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-gray-700" {...props} />,
    ol: ({ node, ...props }: any) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-gray-700" {...props} />,
    li: ({ node, ...props }: any) => <li className="pl-1" {...props} />,
    a: ({ node, href, ...props }: any) => (
        <a
            href={href}
            className="text-var-color-5 hover:underline font-medium break-words inline-flex items-center gap-0.5"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        />
    ),
    blockquote: ({ node, ...props }: any) => (
        <blockquote className="border-l-4 border-var-color-5/50 pl-4 py-3 my-6 bg-var-color-5/5 rounded-r-lg text-gray-700" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || '')
        const codeString = String(children).replace(/\n$/, '')

        return !inline ? (
            <div className="relative group my-6 rounded-lg overflow-hidden bg-[#1e1e1e] border border-var-color-5/20 shadow-xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#2d2d2d] border-b border-[#3d3d3d]">
                    <div className="flex items-center gap-3">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{match ? match[1] : 'code'}</span>
                    </div>
                </div>
                <pre className="p-4 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed">
                    <code className={className} {...props}>
                        {children}
                    </code>
                </pre>
            </div>
        ) : (
            <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200" {...props}>
                {children}
            </code>
        )
    },
    table: ({ node, ...props }: any) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-var-color-5/20 shadow-md">
            <table className="w-full text-left border-collapse bg-white" {...props} />
        </div>
    ),
    thead: ({ node, ...props }: any) => <thead className="bg-var-color-5/10" {...props} />,
    th: ({ node, ...props }: any) => <th className="p-3 font-bold text-var-color-5 border-b border-var-color-5/20" {...props} />,
    td: ({ node, ...props }: any) => <td className="p-3 border-b border-var-color-5/10" {...props} />,
    img: ({ node, alt, ...props }: any) => (
        <figure className="my-6">
            <img
                className="rounded-lg shadow-lg max-w-full h-auto border border-gray-200 hover:border-var-color-5/50 transition-colors mx-auto"
                alt={alt}
                {...props}
            />
            {alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{alt}</figcaption>}
        </figure>
    ),
    hr: ({ node, ...props }: any) => <hr className="my-8 border-t border-var-color-5/20" {...props} />,
    pre: ({ node, ...props }: any) => <span {...props} />,
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
    const docTitle = titleMatch ? titleMatch[1] : slug[slug.length - 1]

    // Estimate reading time (assuming 200 words per minute for Chinese)
    const wordCount = doc.content.length
    const readingTime = Math.max(1, Math.ceil(wordCount / 400))

    return (
        <main className="relative min-h-screen bg-[#f0f0f5] text-black">
            <MouseTrail />
            <TerminalButton />
            <CyberParticles />
            <BackgroundDecoration />

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
                    <div className="flex items-center gap-1 text-sm text-gray-500 font-mono ml-auto">
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

                            {/* Article Footer */}
                            <div className="mt-12 pt-6 border-t border-var-color-5/10">
                                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <span>感谢阅读 🎉</span>
                                    </div>
                                    <Link
                                        href="/archives"
                                        className="text-var-color-5 hover:underline flex items-center gap-1"
                                    >
                                        查看更多文章
                                        <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <DocSidebar
                        toc={toc}
                        relatedDocs={relatedDocs}
                        currentDirection={currentDirection}
                    />
                </div>
            </div>

            <Footer />
        </main>
    )
}
