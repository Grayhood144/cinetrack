import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchMulti, getTrending } from '../services/tmdb'
import { addToWatchlist, subscribeToWatchlist } from '../services/watchlist'
import { useAuth } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'
import './Search.css'

export default function Search() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [trending, setTrending] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    getTrending().then(setTrending)
    const unsub = subscribeToWatchlist(user.uid, setWatchlist)
    return unsub
  }, [user.uid])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (!query.trim()) { setResults([]); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await searchMulti(query)
        setResults(data)
      } finally {
        setLoading(false)
      }
    }, 400)
  }, [query])

  const watchlistIds = new Set(watchlist.map(w => String(w.tmdbId)))

  async function handleAdd(item) {
    await addToWatchlist(user.uid, {
      tmdbId: item.id,
      title: item.title || item.name,
      poster: item.poster_path || null,
      mediaType: item.media_type,
      genres: item.genre_ids || [],
    })
  }

  function handleView(item) {
    navigate(`/${item.media_type}/${item.id}`)
  }

  const display = query.trim() ? results : trending

  return (
    <div className="page">
      <Navbar />
      <div className="search-container">
        <div className="search-header">
          <h1>{query.trim() ? 'Search Results' : 'Trending This Week'}</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies and TV shows…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && <button className="search-clear" onClick={() => setQuery('')}>✕</button>}
          </div>
        </div>

        {loading && <div className="loading-msg">Searching…</div>}

        {!loading && query.trim() && results.length === 0 && (
          <div className="empty-msg">No results for "{query}"</div>
        )}

        <div className="card-grid">
          {display.map(item => (
            <MovieCard
              key={`${item.media_type}-${item.id}`}
              item={item}
              onAdd={handleAdd}
              onView={handleView}
              inWatchlist={watchlistIds.has(String(item.id))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
