import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
        <p className="text-gray-500 mt-1">{collections.length} curated collections</p>
      </div>

      {collections.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="dashboard-card p-12 text-center">
          <span className="text-4xl mb-4 block">🗂️</span>
          <h3 className="text-lg font-semibold text-gray-900">No collections found</h3>
          <p className="text-gray-500 mt-1">Add collections in your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  )
}