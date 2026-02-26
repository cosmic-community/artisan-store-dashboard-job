import Link from 'next/link'
import { getDashboardStats, getProducts, getReviews, getPosts } from '@/lib/cosmic'
import StatsCard from '@/components/StatsCard'
import ProductCard from '@/components/ProductCard'
import ReviewCard from '@/components/ReviewCard'
import PostCard from '@/components/PostCard'

export default async function DashboardPage() {
  const [stats, products, reviews, posts] = await Promise.all([
    getDashboardStats(),
    getProducts(),
    getReviews(),
    getPosts(),
  ])

  const recentProducts = products.slice(0, 3)
  const recentReviews = reviews.slice(0, 3)
  const recentPosts = posts.slice(0, 2)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here&apos;s an overview of your store content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatsCard
          title="Products"
          count={stats.productsCount}
          icon="🛍️"
          href="/products"
          color="bg-blue-50"
        />
        <StatsCard
          title="Collections"
          count={stats.collectionsCount}
          icon="🗂️"
          href="/collections"
          color="bg-purple-50"
        />
        <StatsCard
          title="Reviews"
          count={stats.reviewsCount}
          icon="⭐"
          href="/reviews"
          color="bg-yellow-50"
        />
        <StatsCard
          title="Posts"
          count={stats.postsCount}
          icon="📝"
          href="/posts"
          color="bg-green-50"
        />
      </div>

      {/* Recent Products */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
          <Link href="/products" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            View all →
          </Link>
        </div>
        {recentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="dashboard-card p-8 text-center text-gray-500">
            <p>No products found. Add products in your Cosmic dashboard.</p>
          </div>
        )}
      </section>

      {/* Recent Reviews */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Customer Reviews</h2>
          <Link href="/reviews" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            View all →
          </Link>
        </div>
        {recentReviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="dashboard-card p-8 text-center text-gray-500">
            <p>No reviews yet.</p>
          </div>
        )}
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Latest Posts</h2>
          <Link href="/posts" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            View all →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="dashboard-card p-8 text-center text-gray-500">
            <p>No posts found.</p>
          </div>
        )}
      </section>
    </div>
  )
}