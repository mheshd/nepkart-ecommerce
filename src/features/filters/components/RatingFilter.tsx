import Rating from "../../../components/ui/Rating";

interface RatingFilterProps {
  minRating: number;
  onChange: (rating: number) => void;
}
const RatingFilter = ({ minRating, onChange }: RatingFilterProps) => {
  const ratingOptions = [5, 4, 3, 2, 1];
  return (
    <div>
      <h2>Rating</h2>
      <div className="space-y-2">
        {ratingOptions.map((rating) => {
          const selected = minRating === rating;

          return (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(selected ? 0 : rating)}
              aria-pressed={selected}
              aria-label={`${rating} stars and up`}
              className={`flex w-full items-center gap-2 text-left ${
                selected ? "font-semibold" : ""
              }`}
            >
              <Rating rating={rating} />

              <span className="text-sm" aria-hidden="true">
                & Up
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
