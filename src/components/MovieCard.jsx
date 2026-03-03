import { IMG_BASE } from '../services/tmdb'
import './MovieCard.css'

const PLACEHOLDER = 'https://via.placeholder.com/200x300/1e1e2e/9a9aaa?text=No+Poster'

export default function MovieCard({ item, onAdd, onView, inWatchlist }) {
  const title = item.title || item.name
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const poster = item.poster_path ? `${IMG_BASE}${item.poster_path}` : PLACEHOLDER
  const type = item.media_type === 'tv' ? 'TV' : 'Movie'

  return (
    <div className="movie-card" onClick={() => onView && onView(item)}>
      <div className="movie-card-poster">
        <img src={poster} alt={title} loading="lazy" />
        <span className={`media-badge ${item.media_type}`}>{type}</span>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{title}</h3>
        <p className="movie-card-year">{year}</p>
        {onAdd && (
          <button
            className={`movie-card-btn ${inWatchlist ? 'in-list' : ''}`}
            onClick={e => { e.stopPropagation(); onAdd(item) }}
            disabled={inWatchlist}
          >
            {inWatchlist ? '✓ In Watchlist' : '+ Add'}
          </button>
        )}
      </div>
    </div>
  )
}
