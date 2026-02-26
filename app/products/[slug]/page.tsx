// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getProductBySlug, getReviews } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const allReviews = await getReviews()
  const productReviews = allReviews.filter((r) => {
    const reviewProduct = r.metadata.product
    if (!reviewProduct || typeof reviewProduct !== 'object' || !('id' in reviewProduct)) {
      return false
    }
    return reviewProduct.id === product.id
  })

  const imageUrl = product.metadata.image?.imgix_url
  const collection = product.metadata.collection

  const avgRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + parseInt(r.metadata.rating?.key || '0', 10), 0) /
        productReviews.length
      : 0

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Back to Products
      </Link>

      <div className="dashboard-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-square bg-gray-100">
            {imageUrl ? (
              <img
                src={`${imageUrl}?w=800&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <span className="text-6xl">🛍️</span>
              </div>
            )}
          </div>

          <div className="p-8 flex flex-col">
            <div className="flex-1">
              {collection && typeof collection === 'object' && 'metadata' in collection && (
                <Link
                  href={`/collections/${collection.slug}`}
                  className="text-xs font-semibold text-brand-600 uppercase tracking-wide hover:text-brand-700"
                >
                  {collection.metadata.name}
                </Link>
              )}
              <h1 className="text-2xl font-bold text-gray-900 mt-2">{product.metadata.name}</h1>

              <div className="flex items-center gap-3 mt-3">
                {productReviews.length > 0 && (
                  <>
                    <StarRating rating={Math.round(avgRating)} size="sm" />
                    <span className="text-sm text-gray-500">
                      {avgRating.toFixed(1)} ({productReviews.length} review{productReviews.length !== 1 ? 's' : ''})
                    </span>
                  </>
                )}
              </div>

              <p className="text-3xl font-bold text-brand-700 mt-5">
                ${product.metadata.price.toFixed(2)}
              </p>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mt-4 ${
                  product.metadata.in_stock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {product.metadata.in_stock ? '✓ In Stock' : '✕ Out of Stock'}
              </span>

              {product.metadata.description && (
                <div className="mt-6 prose prose-sm prose-gray max-w-none">
                  <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      {productReviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Customer Reviews ({productReviews.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {productReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}