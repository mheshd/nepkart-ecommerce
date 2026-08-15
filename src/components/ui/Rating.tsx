import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  reviewCount?: number;
}

const Rating = ({ rating, reviewCount }: RatingProps) => {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars ${reviewCount !== undefined} ? ${reviewCount} review : ''`}
    >
      <div className="flex items-center" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage =
            Math.min(Math.max(rating - (star - 1), 0), 1) * 100;
          return (
            <div
              key={star}
              className="relative"
              style={{ width: 13, height: 13 }}
            >
              <Star
                size={13}
                className=" absolute top-0 left-0 text-gray-300"
              />
              <div
                className=" absolute top-0 left-0 overflow-hidden "
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  size={13}
                  fill="currentColor"
                  className="text-yellow-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
};

export default Rating;
