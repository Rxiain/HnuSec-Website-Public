import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export function getDocBySlug(slug: string[]) {
    const realSlug = slug.join('/')
    // Try with .md extension
    let fullPath = path.join(docsDirectory, `${realSlug}.md`)

    if (!fs.existsSync(fullPath)) {
        // Try with /index.md (for folders)
        fullPath = path.join(docsDirectory, realSlug, 'index.md')
    }

    if (!fs.existsSync(fullPath)) {
        // Try decoded path for Chinese support
        try {
            const decodedSlug = decodeURIComponent(realSlug)
            fullPath = path.join(docsDirectory, `${decodedSlug}.md`)
            if (!fs.existsSync(fullPath)) {
                fullPath = path.join(docsDirectory, decodedSlug, 'index.md')
            }
        } catch (e) {
            // ignore error
        }
    }

    if (!fs.existsSync(fullPath)) {
        console.error(`[Docs Debug] Failed to find doc. Slug: ${slug}, RealSlug: ${realSlug}`)
        console.error(`[Docs Debug] Checked paths during resolution:`)
        console.error(`[Docs Debug] 1. ${path.join(docsDirectory, `${realSlug}.md`)}`)
        console.error(`[Docs Debug] 2. ${path.join(docsDirectory, realSlug, 'index.md')}`)
        try {
            const decoded = decodeURIComponent(realSlug)
            console.error(`[Docs Debug] 3. ${path.join(docsDirectory, `${decoded}.md`)} (Decoded: ${decoded})`)
        } catch (e) { }

        throw new Error(`Doc not found: ${fullPath}`)
    }

    console.log(`[Docs Debug] Found doc at: ${fullPath}`)

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        slug: realSlug,
        frontmatter: data,
        content,
    }
}

export function getAllDocs() {
    // Recursive function to get all docs could go here
    // For now we just need specific retrieval
    return []
}

// Extract headings from markdown content for TOC
export function extractHeadings(content: string): { level: number; text: string; id: string }[] {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const headings: { level: number; text: string; id: string }[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length
        const text = match[2].trim()
        // Create slug-like id from text
        const id = text
            .toLowerCase()
            .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
            .replace(/\s+/g, '-')
            .substring(0, 50)
        headings.push({ level, text, id })
    }

    return headings
}

// Get related docs from the same direction/category
export function getRelatedDocs(currentSlug: string[]): { title: string; path: string }[] {
    if (currentSlug.length === 0) return []

    // First segment is the direction (web, pwn, crypto, etc.)
    const direction = currentSlug[0]
    const dirPath = path.join(docsDirectory, direction)

    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
        return []
    }

    const related: { title: string; path: string }[] = []

    try {
        const files = fs.readdirSync(dirPath)
        for (const file of files) {
            const filePath = path.join(dirPath, file)
            const stat = fs.statSync(filePath)

            if (stat.isFile() && file.endsWith('.md')) {
                const slug = file.replace('.md', '')
                const fullSlug = `${direction}/${slug}`

                // Skip current document
                if (fullSlug === currentSlug.join('/')) continue

                // Read title from file or use filename
                const content = fs.readFileSync(filePath, 'utf8')
                const titleMatch = content.match(/^#\s+(.+)$/m)
                const title = titleMatch ? titleMatch[1] : slug

                related.push({
                    title,
                    path: `/docs/${direction}/${slug}`
                })
            }
        }
    } catch (e) {
        console.error('Error reading related docs:', e)
    }

    return related.slice(0, 5) // Limit to 5 related articles
}
