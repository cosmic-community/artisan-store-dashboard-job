import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating?.key || '0', 10), 0) /
        reviews.length
      : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => parseInt(r.metadata.rating?.key || '0', 10) === star).length,
  }))

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-500 mt-1">{reviews.length} total reviews</p>
      </div>

      {reviews.length > 0 && (
        <div className="dashboard-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
              <StarRating rating={Math.round(avgRating)} size="md" />
              <p className="text-sm text-gray-500 mt-1">{reviews.length} reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratingDistribution.map(({ star, count }) => {
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-16">{star} star{star !== 1 ? 's' : ''}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="dashboard-card p-12 text-center">
          <span className="text-4xl mb-4 block">⭐</span>
          <h3 className="text-lg font-semibold text-gray-900">No reviews yet</h3>
          <p className="text-gray-500 mt-1">Reviews will appear here once customers submit them.</p>
        </div>
      )}
    </div>
  )
}