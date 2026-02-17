import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { searchMovies } from '../services/tmdb'
import type { Movie } from '../types'

const SEARCH_DEBOUNCE_MS = 400

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const trimmedQuery = useMemo(() => query.trim(), [query])

  useEffect(() => {
    if (!trimmedQuery) {
      setResults([])
      setLoading(false)
      return
    }
    const t = setTimeout(() => {
      setLoading(true)
      searchMovies(trimmedQuery)
        .then(setResults)
        .catch(() => setResults([]))
        .finally(() => setLoading(false))
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [trimmedQuery])

  return (
    <div>
      <h1 className="page-title">Search</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="search"
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
          }}
          aria-label="Search movies"
          autoFocus
        />
      </div>

      {loading && (
        <p className="empty-state" style={{ padding: '1.5rem' }}>
          Searching…
        </p>
      )}

      {!loading && trimmedQuery && results.length === 0 && (
        <p className="empty-state">
          No movies found for "{trimmedQuery}".
        </p>
      )}

      {!loading && trimmedQuery && results.length > 0 && (
        <>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            {results.length} result{results.length === 1 ? '' : 's'} for "{trimmedQuery}"
          </p>
          <div className="movie-row">
            {results.map((m) => (
              <Link key={m.id} to={`/movie/${m.id}`} className="movie-card">
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  className="movie-card-poster"
                />
                <div className="movie-card-info">
                  <h3 className="movie-card-title">{m.title}</h3>
                  <p className="movie-card-meta">
                    {m.releaseYear} · ★ {m.voteAverage?.toFixed(1)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {!loading && !trimmedQuery && (
        <p className="empty-state">
          Type a movie title to search (uses TMDB).
        </p>
      )}
    </div>
  )
}
