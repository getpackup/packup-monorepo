import fs from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

const blogPostsDirectory = join(process.cwd(), 'apps/marketing/content/blog')

export function getBlogPostSlugs() {
  return fs.readdirSync(blogPostsDirectory)
}

export function getBlogPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(blogPostsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllBlogPosts(fields: string[] = []) {
  const slugs = getBlogPostSlugs()
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
