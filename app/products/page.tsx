import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage() {
  const products = await getProducts()

  const inStockCount = products.filter((p) => p.metadata.in_stock).length
  const outOfStockCount = products.length - inStockCount

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">
          {products.length} total products · {inStockCount} in stock · {outOfStockCount} out of stock
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="dashboard-card p-12 text-center">
          <span className="text-4xl mb-4 block">🛍️</span>
          <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
          <p className="text-gray-500 mt-1">Add products in your Cosmic dashboard to see them here.</p>
        </div>
      )}
    </div>
  )
}