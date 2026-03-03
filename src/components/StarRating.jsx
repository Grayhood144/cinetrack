import './StarRating.css'

export default function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className={`star-rating ${readonly ? 'readonly' : ''}`}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`star ${value >= star ? 'filled' : ''}`}
          onClick={() => !readonly && onChange && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  )
}
