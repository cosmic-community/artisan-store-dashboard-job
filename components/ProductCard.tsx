import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata.image?.imgix_url
  const collection = product.metadata.collection
  const inStock = product.metadata.in_stock

  return (
    <Link href={`/products/${product.slug}`} className="dashboard-card group">
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=600&h=450&fit=crop&auto=format,compress`}
            alt={product.metadata.name}
            width={300}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🛍️</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
          {product.metadata.name}
        </h3>
        {collection && typeof collection === 'object' && 'metadata' in collection && (
          <p className="text-xs text-gray-500 mt-1">{collection.metadata.name}</p>
        )}
        <p className="text-lg font-bold text-brand-700 mt-2">
          ${product.metadata.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}