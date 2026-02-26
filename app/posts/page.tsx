import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <p className="text-gray-500 mt-1">{posts.length} published posts</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="dashboard-card p-12 text-center">
          <span className="text-4xl mb-4 block">📝</span>
          <h3 className="text-lg font-semibold text-gray-900">No posts found</h3>
          <p className="text-gray-500 mt-1">Create posts in your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  )
}