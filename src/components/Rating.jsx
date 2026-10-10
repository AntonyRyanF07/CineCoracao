import { Heart } from 'lucide-react'

export default function Rating({ value = 0, onChange }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map(number => (
        <button
          key={number}
          type="button"
          disabled={!onChange}
          className={number <= Number(value) ? 'rating-active' : ''}
          onClick={() => onChange?.(number)}
          aria-label={`${number} de 5 corações`}
        >
          <Heart
            size={17}
            fill={number <= Number(value) ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  )
}
