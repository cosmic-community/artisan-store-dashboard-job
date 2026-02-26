import Link from 'next/link'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.metadata.featured_image?.imgix_url
  const author = post.metadata.author
  const category = post.metadata.category

  return (
    <Link href={`/posts/${post.slug}`} className="dashboard-card group">
      <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">📝</span>
          </div>
        )}
        {category && typeof category === 'object' && 'metadata' in category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 backdrop-blur-sm">
              {category.metadata.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {author && typeof author === 'object' && 'metadata' in author && (
          <div className="flex items-center gap-2 mt-3">
            {author.metadata.avatar?.imgix_url ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-500">✍️</span>
              </div>
            )}
            <p className="text-xs text-gray-500">{author.metadata.name}</p>
          </div>
        )}
      </div>
    </Link>
  )
}