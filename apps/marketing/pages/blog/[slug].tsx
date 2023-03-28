import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'

// import Container from '../../components/container'
// import Header from '../../components/header'
// import Layout from '../../components/layout'
// import BlogPostBody from '../../components/post-body'
// import BlogPostHeader from '../../components/post-header'
// import BlogPostTitle from '../../components/post-title'
import type BlogPostType from '../../interfaces/BlogPostType'
import { getAllBlogPosts, getBlogPostBySlug } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'

type Props = {
  post: BlogPostType
  morePosts: BlogPostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview = false }: Props) {
  const router = useRouter()
  const title = `${post.title} | Packup`
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return null
  // return (
  // <Layout preview={preview}>
  //   <Container>
  //     <Header />
  //     {router.isFallback ? (
  //       <BlogPostTitle>Loading…</BlogPostTitle>
  //     ) : (
  //       <article className="mb-32">
  //         <Head>
  //           <title>{title}</title>
  //           <meta property="og:image" content={post.ogImage.url} />
  //         </Head>
  //         <BlogPostHeader title={post.title} coverImage={post.coverImage} date={post.date} />
  //         <BlogPostBody content={post.content} />
  //       </article>
  //     )}
  //   </Container>
  // </Layout>
  // )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  // const post = getBlogPostBySlug(params.slug, [
  //   'title',
  //   'date',
  //   'slug',
  //   'author',
  //   'content',
  //   'ogImage',
  //   'coverImage',
  // ])
  // const content = await markdownToHtml(post.content || '')

  // return {
  //   props: {
  //     post: {
  //       ...post,
  //       content,
  //     },
  //   },
  // }
  return {
    props: null,
  }
}

export async function getStaticPaths() {
  const posts = getAllBlogPosts(['slug'])

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}
