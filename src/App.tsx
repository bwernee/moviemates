import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import MovieDetail from './pages/MovieDetail'

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/search', label: 'Search', icon: '🔎' },
  { path: '/watchlist', label: 'Watchlist', icon: '📌' },
  { path: '/friends', label: 'Friends', icon: '👥' },
  { path: '/profile', label: 'Profile', icon: '👤' },
]

export default function App() {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={path === '/'}
          >
            <span className="nav-icon" aria-hidden>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
