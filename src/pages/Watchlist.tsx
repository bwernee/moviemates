import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookmarkIcon } from '../components/Icons'
import type { Movie } from '../types'

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('moviemates-watchlist')
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored))
      } catch {
        setWatchlist([])
      }
    }
  }, [])

  const removeFromWatchlist = (movieId: number) => {
    const updated = watchlist.filter((m) => m.id !== movieId)
    setWatchlist(updated)
    localStorage.setItem('moviemates-watchlist', JSON.stringify(updated))
  }

  if (watchlist.length === 0) {
    return (
      <div>
        <h1 className="page-title">Watchlist</h1>
        <div className="empty-state">
          <BookmarkIcon className="empty-state-icon" />
          <p>No movies in your watchlist yet.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            Save movies from Home or Search to watch later.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Watchlist</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {watchlist.length} movie{watchlist.length === 1 ? '' : 's'} saved
      </p>
      <div className="movie-row">
        {watchlist.map((movie) => (
          <div key={movie.id} className="movie-card watchlist-card">
            <Link to={`/movie/${movie.id}`}>
              <img src={movie.posterUrl} alt={movie.title} className="movie-card-poster" />
            </Link>
            <div className="movie-card-info">
              <h3 className="movie-card-title">{movie.title}</h3>
              <p className="movie-card-meta">
                {movie.releaseYear} · ★ {movie.voteAverage?.toFixed(1)}
              </p>
              <button
                type="button"
                onClick={() => removeFromWatchlist(movie.id)}
                className="watchlist-remove-btn"
                aria-label={`Remove ${movie.title} from watchlist`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
