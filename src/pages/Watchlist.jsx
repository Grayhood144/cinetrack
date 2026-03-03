import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { subscribeToWatchlist, removeFromWatchlist, updateStatus } from '../services/watchlist'
import { useAuth } from '../context/AuthContext'
import { IMG_THUMB } from '../services/tmdb'
import StarRating from '../components/StarRating'
import Navbar from '../components/Navbar'
import './Watchlist.css'

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'want_to_watch', label: 'Want to Watch' },
  { value: 'watching', label: 'Watching' },
  { value: 'watched', label: 'Watched' },
]

const SORTS = [
  { value: 'addedAt', label: 'Date Added' },
  { value: 'title', label: 'Title' },
  { value: 'rating', label: 'My Rating' },
]

const PLACEHOLDER = 'https://via.placeholder.com/80x120/1e1e2e/9a9aaa?text=?'

export default function Watchlist() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('addedAt')

  useEffect(() => {
    const unsub = subscribeToWatchlist(user.uid, setItems)
    return unsub
  }, [user.uid])

  async function handleRemove(id) {
    await removeFromWatchlist(user.uid, id)
  }

  async function handleStatus(id, status) {
    await updateStatus(user.uid, id, status)
  }

  let display = filter === 'all' ? items : items.filter(i => i.status === filter)

  display = [...display].sort((a, b) => {
    if (sort === 'title') return (a.title || '').localeCompare(b.title || '')
    if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
    const aTime = a.addedAt?.seconds || 0
    const bTime = b.addedAt?.seconds || 0
    return bTime - aTime
  })

  const statusLabel = { want_to_watch: 'Want to Watch', watching: 'Watching', watched: 'Watched' }
  const statusClass = { want_to_watch: 'status-want', watching: 'status-watching', watched: 'status-watched' }

  return (
    <div className="page">
      <Navbar />
      <div className="watchlist-container">
        <div className="watchlist-header">
          <h1>My Watchlist <span className="count">({items.length})</span></h1>
          <div className="controls">
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              {SORTS.map(s => <option key={s.value} value={s.value}>Sort: {s.label}</option>)}
            </select>
          </div>
        </div>

        {items.length === 0 && (
          <div className="empty-state">
            <p>Your watchlist is empty.</p>
            <button onClick={() => navigate('/search')} className="btn-go-search">Browse Titles</button>
          </div>
        )}

        {display.length === 0 && items.length > 0 && (
          <div className="empty-msg">No items match this filter.</div>
        )}

        <div className="watchlist-list">
          {display.map(item => (
            <div key={item.id} className="watchlist-item">
              <img
                src={item.poster ? `${IMG_THUMB}${item.poster}` : PLACEHOLDER}
                alt={item.title}
                className="wl-poster"
                onClick={() => navigate(`/${item.mediaType}/${item.tmdbId}`)}
              />
              <div className="wl-info">
                <h3 onClick={() => navigate(`/${item.mediaType}/${item.tmdbId}`)}>{item.title}</h3>
                <span className={`status-badge ${statusClass[item.status]}`}>
                  {statusLabel[item.status]}
                </span>
                {item.rating && <StarRating value={item.rating} readonly />}
                {item.review && <p className="wl-review">"{item.review}"</p>}
              </div>
              <div className="wl-actions">
                <select
                  value={item.status}
                  onChange={e => handleStatus(item.tmdbId, e.target.value)}
                  className="status-select"
                >
                  <option value="want_to_watch">Want to Watch</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </select>
                <button className="btn-remove" onClick={() => handleRemove(item.tmdbId)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
