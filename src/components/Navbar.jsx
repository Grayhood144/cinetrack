import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  function isActive(path) {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navbar">
      <Link to={user ? '/search' : '/'} className="navbar-brand">🎬 CineTrack</Link>
      {user ? (
        <div className="navbar-links">
          <Link to="/search" className={isActive('/search')}>Search</Link>
          <Link to="/watchlist" className={isActive('/watchlist')}>Watchlist</Link>
          <Link to="/profile" className={isActive('/profile')}>
            {user.displayName || 'Profile'}
          </Link>
          <button onClick={handleLogout} className="navbar-logout">Log Out</button>
        </div>
      ) : (
        <div className="navbar-links">
          <Link to="/login">Log In</Link>
          <Link to="/register" className="navbar-cta">Get Started</Link>
        </div>
      )}
    </nav>
  )
}
