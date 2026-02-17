import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails, getMovieCredits, getMovieVideos } from '../services/tmdb'
import type { MovieDetails, CastMember, TrailerVideo, Movie } from '../types'
import { BackIcon, BookmarkIcon, CheckIcon } from '../components/Icons'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [videos, setVideos] = useState<TrailerVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    const movieId = id ? parseInt(id, 10) : NaN
    if (!id || isNaN(movieId)) {
      setError('Invalid movie')
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getMovieVideos(movieId),
    ])
      .then(([d, c, v]) => {
        setDetails(d ?? null)
        setCast(c ?? [])
        setVideos(v ?? [])
        if (!d) setError('Movie not found')
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load movie')
      })
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!details) return
    const stored = localStorage.getItem('moviemates-watchlist')
    if (stored) {
      try {
        const watchlist: Movie[] = JSON.parse(stored)
        setInWatchlist(watchlist.some((m) => m.id === details.id))
      } catch {
        setInWatchlist(false)
      }
    }
  }, [details])

  const toggleWatchlist = () => {
    if (!details) return
    const stored = localStorage.getItem('moviemates-watchlist')
    let watchlist: Movie[] = stored ? JSON.parse(stored) : []
    const exists = watchlist.some((m) => m.id === details.id)
    if (exists) {
      watchlist = watchlist.filter((m) => m.id !== details.id)
      setInWatchlist(false)
    } else {
      watchlist.push({
        id: details.id,
        title: details.title,
        overview: details.overview,
        posterUrl: details.posterUrl,
        backdropUrl: details.backdropUrl,
        releaseYear: details.releaseYear,
        voteAverage: details.voteAverage,
      })
      setInWatchlist(true)
    }
    localStorage.setItem('moviemates-watchlist', JSON.stringify(watchlist))
  }
  const trailer = videos[0]

  if (loading) {
    return (
      <div className="movie-detail">
        <p className="empty-state">Loading movie…</p>
      </div>
    )
  }

  if (error || !details) {
    return (
      <div className="movie-detail">
        <p className="empty-state">{error ?? 'Movie not found'}</p>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="movie-detail">
      <Link to="/" className="movie-detail-back" aria-label="Back to Home">
        <BackIcon className="back-icon" />
        <span>Back</span>
      </Link>

      <div className="movie-detail-hero">
        <img src={details.backdropUrl} alt="" className="movie-detail-backdrop" />
        <div className="movie-detail-hero-overlay" />
        <div className="movie-detail-hero-content">
          <img src={details.posterUrl} alt={details.title} className="movie-detail-poster" />
          <div className="movie-detail-meta">
            <h1 className="movie-detail-title">{details.title}</h1>
            <p className="movie-detail-subtitle">
              {details.releaseYear}
              {details.runtime != null && ` · ${details.runtime} min`}
              {details.voteAverage != null && ` · ★ ${details.voteAverage.toFixed(1)}`}
            </p>
            {details.genres?.length ? (
              <p className="movie-detail-genres">
                {details.genres.map((g) => g.name).join(', ')}
              </p>
            ) : null}
            {details.tagline ? (
              <p className="movie-detail-tagline">"{details.tagline}"</p>
            ) : null}
            <div className="movie-detail-actions">
              <button
                type="button"
                className={`btn ${inWatchlist ? 'btn-primary' : 'btn-secondary'}`}
                onClick={toggleWatchlist}
              >
                {inWatchlist ? (
                  <>
                    <CheckIcon className="btn-icon" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <BookmarkIcon className="btn-icon" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-detail-body">
        {details.overview ? (
          <section className="movie-detail-section">
            <h2 className="section-title">Synopsis</h2>
            <p className="movie-detail-overview">{details.overview}</p>
          </section>
        ) : null}

        {trailer ? (
          <section className="movie-detail-section">
            <h2 className="section-title">Trailer</h2>
            <div className="movie-detail-trailer">
              <iframe
                title={trailer.name}
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        ) : null}

        {cast.length > 0 ? (
          <section className="movie-detail-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-row">
              {cast.map((c) => (
                <div key={c.id} className="cast-card">
                  <img src={c.profilePath} alt={c.name} className="cast-photo" />
                  <p className="cast-name">{c.name}</p>
                  <p className="cast-character">{c.character}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}
