import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTrending, getPopular, getTopRated } from '../services/tmdb'
import type { Movie } from '../types'

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([])
  const [popular, setPopular] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getTrending(),
      getPopular(),
      getTopRated(),
    ])
      .then(([t, p, r]) => {
        setTrending(t)
        setPopular(p)
        setTopRated(r)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div>
        <h1 className="page-title">Movie Mates</h1>
        <p className="empty-state">Loading movies…</p>
      </div>
    )
  }

  const heroMovie = trending[0]

  return (
    <div>
      <h1 className="page-title">Movie Mates</h1>

      {/* Upcoming / trending hero */}
      {heroMovie && (
        <Link to={`/movie/${heroMovie.id}`} className="hero-banner hero-banner-link">
          <img src={heroMovie.backdropUrl} alt="" />
          <div className="hero-overlay">
            <h2 className="hero-title">{heroMovie.title}</h2>
            <p className="hero-subtitle">
              {heroMovie.releaseYear} · {heroMovie.overview?.slice(0, 100)}…
            </p>
          </div>
        </Link>
      )}

      <h2 className="section-title">Trending now</h2>
      <div className="movie-row">
        {trending.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      <h2 className="section-title">Popular this week</h2>
      <div className="movie-row">
        {popular.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      <h2 className="section-title">Top rated</h2>
      <div className="movie-row">
        {topRated.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  )
}

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="movie-card-poster"
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-meta">
          {movie.releaseYear} · ★ {movie.voteAverage?.toFixed(1)}
        </p>
      </div>
    </Link>
  )
}
