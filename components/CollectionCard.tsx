import Link from 'next/link'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const imageUrl = collection.metadata.image?.imgix_url

  return (
    <Link href={`/collections/${collection.slug}`} className="dashboard-card group">
      <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={collection.metadata.name}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">🗂️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{collection.metadata.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-600 line-clamp-2">
          {collection.metadata.description || 'No description available'}
        </p>
        <p className="text-xs text-gray-400 mt-3 group-hover:text-brand-600 transition-colors">
          View collection →
        </p>
      </div>
    </Link>
  )
}