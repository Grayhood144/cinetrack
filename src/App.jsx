import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'

// Stub placeholders — will be built in Week 8
function ComingSoon({ page }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh',
      background:'#0d0d14', color:'#f0f0f0', flexDirection:'column', gap:'1rem' }}>
      <h1 style={{ fontSize:'2rem' }}>🎬 CineTrack</h1>
      <p style={{ color:'#9a9aaa' }}>{page} — coming soon in Week 8</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<ComingSoon page="Login" />} />
        <Route path="/register" element={<ComingSoon page="Register" />} />
        <Route path="/search" element={<ComingSoon page="Search" />} />
        <Route path="/watchlist" element={<ComingSoon page="Watchlist" />} />
        <Route path="/profile" element={<ComingSoon page="Profile" />} />
      </Routes>
    </BrowserRouter>
  )
}
