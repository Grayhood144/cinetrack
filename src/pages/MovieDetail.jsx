import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails, getTVDetails, IMG_BASE, IMG_THUMB } from '../services/tmdb'
import { addToWatchlist, subscribeToWatchlist, updateRatingReview, updateStatus } from '../services/watchlist'
import { useAuth } from '../context/AuthContext'
import StarRating from '../components/StarRating'
import Navbar from '../components/Navbar'
import './MovieDetail.css'

const PLACEHOLDER = 'https://via.placeholder.com/300x450/1e1e2e/9a9aaa?text=No+Poster'

export default function MovieDetail() {
  const { type, id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [detail, setDetail] = useState(null)
  const [watchlistItem, setWatchlistItem] = useState(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fn = type === 'tv' ? getTVDetails : getMovieDetails
    fn(id).then(setDetail)
  }, [type, id])

  useEffect(() => {
    const unsub = subscribeToWatchlist(user.uid, items => {
      const found = items.find(i => String(i.tmdbId) === String(id))
      setWatchlistItem(found || null)
      if (found) {
        setRating(found.rating || 0)
        setReview(found.review || '')
      }
    })
    return unsub
  }, [user.uid, id])

  if (!detail) return (
    <div className="page"><Navbar /><div className="detail-loading">Loading…</div></div>
  )

  const title = detail.title || detail.name
  const year = (detail.release_date || detail.first_air_date || '').slice(0, 4)
  const poster = detail.poster_path ? `${IMG_BASE}${detail.poster_path}` : PLACEHOLDER
  const genres = detail.genres?.map(g => g.name) || []
  const overview = detail.overview || 'No description available.'
  const cast = detail.credits?.cast?.slice(0, 5) || []

  async function handleAdd() {
    await addToWatchlist(user.uid, {
      tmdbId: detail.id,
      title,
      poster: detail.poster_path || null,
      mediaType: type,
      genres: detail.genres?.map(g => g.id) || [],
    })
  }

  async function handleSaveReview() {
    if (!watchlistItem) return
    setSaving(true)
    await updateRatingReview(user.uid, detail.id, rating, review)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleStatus(status) {
    if (!watchlistItem) return
    await updateStatus(user.uid, detail.id, status)
  }

  return (
    <div className="page">
      <Navbar />
      <div className="detail-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="detail-hero">
          <img src={poster} alt={title} className="detail-poster" />
          <div className="detail-info">
            <div className="detail-type-badge">{type === 'tv' ? 'TV Show' : 'Movie'}</div>
            <h1>{title}</h1>
            <div className="detail-meta">
              {year && <span>{year}</span>}
              {genres.slice(0,3).map(g => <span key={g} className="genre-chip">{g}</span>)}
            </div>
            <p className="detail-overview">{overview}</p>

            {cast.length > 0 && (
              <p className="detail-cast">
                <strong>Cast:</strong> {cast.map(c => c.name).join(', ')}
              </p>
            )}

            <div className="detail-actions">
              {!watchlistItem ? (
                <button className="btn-add-detail" onClick={handleAdd}>+ Add to Watchlist</button>
              ) : (
                <div className="in-list-controls">
                  <span className="in-list-label">✓ In your watchlist</span>
                  <select
                    value={watchlistItem.status}
                    onChange={e => handleStatus(e.target.value)}
                    className="status-select-detail"
                  >
                    <option value="want_to_watch">Want to Watch</option>
                    <option value="watching">Watching</option>
                    <option value="watched">Watched</option>
                  </select>
                </div>
              )}
            </div>

            {watchlistItem && (
              <div className="review-section">
                <h3>Your Rating & Review</h3>
                <StarRating value={rating} onChange={setRating} />
                <textarea
                  className="review-input"
                  placeholder="Write your review… (optional)"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  rows={3}
                />
                <button
                  className="btn-save-review"
                  onClick={handleSaveReview}
                  disabled={saving}
                >
                  {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Review'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
