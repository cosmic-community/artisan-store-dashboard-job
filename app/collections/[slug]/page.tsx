// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCollectionBySlug, getProductsByCollectionId } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollectionId(collection.id)
  const imageUrl = collection.metadata.image?.imgix_url

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        href="/collections"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        ← Back to Collections
      </Link>

      {/* Collection Header */}
      <div className="dashboard-card overflow-hidden mb-8">
        <div className="relative h-64 bg-gray-100">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=1400&h=500&fit=crop&auto=format,compress`}
              alt={collection.metadata.name}
              width={700}
              height={250}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <span className="text-6xl">🗂️</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl font-bold text-white">{collection.metadata.name}</h1>
            {collection.metadata.description && (
              <p className="text-white/80 mt-2 max-w-2xl">{collection.metadata.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Products in Collection */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Products ({products.length})
        </h2>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="dashboard-card p-12 text-center">
          <p className="text-gray-500">No products in this collection yet.</p>
        </div>
      )}
    </div>
  )
}