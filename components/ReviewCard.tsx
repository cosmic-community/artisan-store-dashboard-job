import StarRating from '@/components/StarRating'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const ratingNum = parseInt(review.metadata.rating?.key || '0', 10)
  const product = review.metadata.product

  return (
    <div className="dashboard-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
              <span className="text-brand-700 font-semibold text-sm">
                {review.metadata.reviewer_name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {review.metadata.reviewer_name}
              </p>
              {product && typeof product === 'object' && 'metadata' in product && (
                <p className="text-xs text-gray-500">
                  on {product.metadata.name}
                </p>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={ratingNum} size="sm" />
      </div>
      {review.metadata.comment && (
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          &ldquo;{review.metadata.comment}&rdquo;
        </p>
      )}
    </div>
  )
}