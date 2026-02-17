import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import MovieDetail from './pages/MovieDetail'
import { HomeIcon, SearchIcon, BookmarkIcon, UsersIcon, UserIcon } from './components/Icons'

const navItems = [
  { path: '/', label: 'Home', Icon: HomeIcon },
  { path: '/search', label: 'Search', Icon: SearchIcon },
  { path: '/watchlist', label: 'Watchlist', Icon: BookmarkIcon },
  { path: '/friends', label: 'Friends', Icon: UsersIcon },
  { path: '/profile', label: 'Profile', Icon: UserIcon },
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
        {navItems.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={path === '/'}
          >
            <Icon className="nav-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
