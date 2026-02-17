export interface Movie {
  id: number
  title: string
  overview?: string
  posterUrl: string
  backdropUrl: string
  releaseYear?: string
  voteAverage?: number
  genreIds?: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface MovieDetails extends Movie {
  runtime?: number
  genres?: Genre[]
  tagline?: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profilePath: string
}

export interface TrailerVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
}
