import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="brand">🎬 CineTrack</span>
        <div className="nav-links">
          <Link to="/login">Log In</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Track what you watch.<br />Remember what you loved.</h1>
          <p className="hero-sub">
            CineTrack is your personal movie and TV show journal — search any title,
            build your watchlist, rate and review, and keep your history in sync across
            all your devices.
          </p>
          <Link to="/register" className="btn-primary btn-large">Create Free Account</Link>
        </div>
        <div className="hero-graphic" aria-hidden="true">
          <div className="poster-stack">
            <div className="poster p1"></div>
            <div className="poster p2"></div>
            <div className="poster p3"></div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Everything you need to stay on top of your watchlist</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h3>Search Movies &amp; TV</h3>
            <p>Instantly search millions of titles powered by The Movie Database.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📋</span>
            <h3>Watchlist Management</h3>
            <p>Add titles and organize them by status: Want to Watch, Watching, or Watched.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Rate &amp; Review</h3>
            <p>Give every title a 1–5 star rating and write your personal take.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔎</span>
            <h3>Filter &amp; Sort</h3>
            <p>Filter by status or genre. Sort by date added, title, or your rating.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Profile &amp; Stats</h3>
            <p>See your total watch count, average rating, and top genres at a glance.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">☁️</span>
            <h3>Cloud Sync</h3>
            <p>Your data is saved to your account — access it from any device, any time.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to start tracking?</h2>
        <p>Free forever. No credit card required.</p>
        <Link to="/register" className="btn-primary btn-large">Get Started Now</Link>
      </section>

      <footer className="landing-footer">
        <p>© 2026 CineTrack · Built with React + Firebase · Powered by TMDB</p>
      </footer>
    </div>
  )
}
