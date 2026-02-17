import type { Movie, MovieDetails, Genre, CastMember, TrailerVideo } from '../types'

const BASE = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

const apiKey = import.meta.env.VITE_TMDB_API_KEY

function imageUrl(path: string | null, size: 'w500' | 'w780' | 'original' = 'w500') {
  if (!path) return 'https://placehold.co/500x750/1a1a1a/666?text=No+poster'
  return `${IMAGE_BASE}/${size}${path}`
}

function getMockMovies(): Movie[] {
  const placeholders = [
    { id: 1, title: 'Inception', year: '2010', rating: 8.4 },
    { id: 2, title: 'The Dark Knight', year: '2008', rating: 9.0 },
    { id: 3, title: 'Interstellar', year: '2014', rating: 8.7 },
    { id: 4, title: 'Dune', year: '2021', rating: 8.0 },
    { id: 5, title: 'Oppenheimer', year: '2023', rating: 8.3 },
  ]
  return placeholders.map((m) => ({
    id: m.id,
    title: m.title,
    overview: 'Add VITE_TMDB_API_KEY to .env for real data.',
    posterUrl: `https://placehold.co/500x750/1a1a1a/666?text=${encodeURIComponent(m.title)}`,
    backdropUrl: `https://placehold.co/780x439/1a1a1a/444?text=Movie+Mates`,
    releaseYear: m.year,
    voteAverage: m.rating,
  }))
}

function mapResult(item: {
  id: number
  title?: string
  name?: string
  overview?: string
  poster_path?: string | null
  backdrop_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  genre_ids?: number[]
}): Movie {
  const title = item.title ?? item.name ?? 'Unknown'
  const date = item.release_date ?? item.first_air_date ?? ''
  const year = date ? date.slice(0, 4) : undefined
  return {
    id: item.id,
    title,
    overview: item.overview ?? undefined,
    posterUrl: imageUrl(item.poster_path),
    backdropUrl: imageUrl(item.backdrop_path, 'w780'),
    releaseYear: year,
    voteAverage: item.vote_average,
    genreIds: item.genre_ids,
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB: ${res.status}`)
  return res.json()
}

export async function getTrending(): Promise<Movie[]> {
  if (!apiKey) return getMockMovies()
  const url = `${BASE}/trending/movie/week?api_key=${apiKey}`
  const data = await fetchJson<{ results: unknown[] }>(url)
  return (data.results ?? []).map((item: unknown) => mapResult(item as Parameters<typeof mapResult>[0]))
}

export async function getPopular(): Promise<Movie[]> {
  if (!apiKey) return getMockMovies()
  const url = `${BASE}/movie/popular?api_key=${apiKey}`
  const data = await fetchJson<{ results: unknown[] }>(url)
  return (data.results ?? []).map((item: unknown) => mapResult(item as Parameters<typeof mapResult>[0]))
}

export async function getTopRated(): Promise<Movie[]> {
  if (!apiKey) return getMockMovies()
  const url = `${BASE}/movie/top_rated?api_key=${apiKey}`
  const data = await fetchJson<{ results: unknown[] }>(url)
  return (data.results ?? []).map((item: unknown) => mapResult(item as Parameters<typeof mapResult>[0]))
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return []
  if (!apiKey) return getMockMovies()
  const url = `${BASE}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query.trim())}`
  const data = await fetchJson<{ results: unknown[] }>(url)
  return (data.results ?? []).map((item: unknown) => mapResult(item as Parameters<typeof mapResult>[0]))
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails | null> {
  if (!apiKey) return getMockMovieDetails(movieId)
  const url = `${BASE}/movie/${movieId}?api_key=${apiKey}`
  const data = await fetchJson<{
    id: number
    title: string
    overview?: string
    poster_path?: string | null
    backdrop_path?: string | null
    release_date?: string
    vote_average?: number
    runtime?: number
    tagline?: string
    genres?: { id: number; name: string }[]
  }>(url)
  const year = data.release_date ? data.release_date.slice(0, 4) : undefined
  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    posterUrl: imageUrl(data.poster_path),
    backdropUrl: imageUrl(data.backdrop_path, 'w780'),
    releaseYear: year,
    voteAverage: data.vote_average,
    runtime: data.runtime,
    tagline: data.tagline,
    genres: data.genres,
  }
}

function profileUrl(path: string | null) {
  if (!path) return 'https://placehold.co/100x100/1a1a1a/666?text='
  return `${IMAGE_BASE}/w185${path}`
}

export async function getMovieCredits(movieId: number): Promise<CastMember[]> {
  if (!apiKey) return []
  const url = `${BASE}/movie/${movieId}/credits?api_key=${apiKey}`
  const data = await fetchJson<{ cast: { id: number; name: string; character: string; profile_path: string | null }[] }>(url)
  const cast = (data.cast ?? []).slice(0, 15)
  return cast.map((c) => ({
    id: c.id,
    name: c.name,
    character: c.character,
    profilePath: profileUrl(c.profile_path),
  }))
}

export async function getMovieVideos(movieId: number): Promise<TrailerVideo[]> {
  if (!apiKey) return []
  const url = `${BASE}/movie/${movieId}/videos?api_key=${apiKey}`
  const data = await fetchJson<{ results: { id: string; key: string; name: string; site: string; type: string }[] }>(url)
  const videos = (data.results ?? []).filter((v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'))
  return videos.slice(0, 3).map((v) => ({ id: v.id, key: v.key, name: v.name, site: v.site, type: v.type }))
}

function getMockMovieDetails(movieId: number): MovieDetails | null {
  const list = getMockMovies()
  const m = list.find((x) => x.id === movieId) ?? list[0]
  return {
    ...m,
    id: movieId,
    title: m.id === movieId ? m.title : `Movie #${movieId}`,
    posterUrl: m.posterUrl,
    backdropUrl: m.backdropUrl,
    runtime: 148,
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Sci-Fi' }],
    tagline: 'Add VITE_TMDB_API_KEY to .env for full details, cast & trailer.',
  }
}
