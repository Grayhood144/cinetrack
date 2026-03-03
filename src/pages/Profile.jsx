import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { subscribeToWatchlist } from '../services/watchlist'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import StarRating from '../components/StarRating'
import './Profile.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    const unsub = subscribeToWatchlist(user.uid, setItems)
    return unsub
  }, [user.uid])

  const watched = items.filter(i => i.status === 'watched')
  const watching = items.filter(i => i.status === 'watching')
  const wantToWatch = items.filter(i => i.status === 'want_to_watch')
  const rated = items.filter(i => i.rating)
  const avgRating = rated.length
    ? (rated.reduce((sum, i) => sum + i.rating, 0) / rated.length).toFixed(1)
    : null

  // Top genres from watched/watching
  const genreCounts = {}
  items.forEach(item => {
    if (!item.genres) return
    item.genres.forEach(g => {
      genreCounts[g] = (genreCounts[g] || 0) + 1
    })
  })
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => id)

  // Recent reviews
  const recentReviews = [...items]
    .filter(i => i.review && i.rating)
    .sort((a, b) => (b.addedAt?.seconds || 0) - (a.addedAt?.seconds || 0))
    .slice(0, 3)

  return (
    <div className="page">
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">{(user.displayName || user.email)[0].toUpperCase()}</div>
          <div>
            <h1>{user.displayName || 'My Profile'}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-num">{items.length}</span>
            <span className="stat-label">Total Tracked</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{watched.length}</span>
            <span className="stat-label">Watched</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{watching.length}</span>
            <span className="stat-label">Watching</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{wantToWatch.length}</span>
            <span className="stat-label">Want to Watch</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{avgRating ? `${avgRating}★` : '—'}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{rated.length}</span>
            <span className="stat-label">Reviews Written</span>
          </div>
        </div>

        {recentReviews.length > 0 && (
          <div className="profile-section">
            <h2>Recent Reviews</h2>
            <div className="reviews-list">
              {recentReviews.map(item => (
                <div
                  key={item.id}
                  className="review-card"
                  onClick={() => navigate(`/${item.mediaType}/${item.tmdbId}`)}
                >
                  <div className="review-card-top">
                    <h3>{item.title}</h3>
                    <StarRating value={item.rating} readonly />
                  </div>
                  <p>"{item.review}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="profile-section">
          <button className="btn-logout-profile" onClick={async () => { await logout(); navigate('/') }}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}
