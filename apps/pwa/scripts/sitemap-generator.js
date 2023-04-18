const fs = require('fs')
const globby = require('globby')

function addPage(page) {
  const path = page
    .replace('pages', '')
    .replace('.tsx', '')
    .replace('apps/pwa/', '')
    .replace('/index', '')
  return `  <url>
    <loc>${`${process.env.NX_WEBSITE_URL}${path}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`
}

async function generateSitemap() {
  const pages = await globby(['apps/pwa/pages/**/*.tsx', '!apps/pwa/pages/_*.tsx'])
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`
  fs.writeFileSync('apps/pwa/public/sitemap.xml', sitemap)
}

generateSitemap()
