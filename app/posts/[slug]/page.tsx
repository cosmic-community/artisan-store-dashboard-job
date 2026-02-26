// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '@/lib/cosmic'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const imageUrl = post.metadata.featured_image?.imgix_url
  const author = post.metadata.author
  const category = post.metadata.category

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Back to Posts
      </Link>

      <article className="dashboard-card overflow-hidden">
        {imageUrl && (
          <div className="aspect-[21/9] bg-gray-100">
            <img
              src={`${imageUrl}?w=1400&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={700}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-4">
            {category && typeof category === 'object' && 'metadata' in category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">
                {category.metadata.name}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>

          {author && typeof author === 'object' && 'metadata' in author && (
            <div className="flex items-center gap-3 mt-6 pb-6 border-b border-gray-100">
              {author.metadata.avatar?.imgix_url ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm">✍️</span>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">{author.metadata.name}</p>
                {author.metadata.bio && (
                  <p className="text-xs text-gray-500 line-clamp-1">{author.metadata.bio}</p>
                )}
              </div>
            </div>
          )}

          {post.metadata.content && (
            <div className="mt-8 prose prose-gray max-w-none prose-headings:font-bold prose-a:text-brand-600 prose-img:rounded-lg">
              <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}