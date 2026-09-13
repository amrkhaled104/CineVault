// This file contains communication with the OMDb API.

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface OmdbSearchResponse {
  Search?: Movie[]
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}

const API_URL = 'https://www.omdbapi.com/'

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = (import.meta.env.VITE_OMDB_API_KEY as string | undefined)?.trim()

  if (!apiKey) {
    console.error('[OMDb Service] API key is missing from environment variables (VITE_OMDB_API_KEY)')
    throw new Error('OMDb API key is missing. Please set VITE_OMDB_API_KEY in your .env file.')
  }

  const encodedQuery = encodeURIComponent(query.trim())
  const url = `${API_URL}?apikey=${apiKey}&s=${encodedQuery}`
  console.log(`[OMDb Service] Fetching movies for query: "${query}"`)

  const response = await fetch(url)

  if (!response.ok) {
    console.error(`[OMDb Service] HTTP error: ${response.status} ${response.statusText}`)
    throw new Error(`Failed to fetch movies from OMDb: ${response.status} ${response.statusText}`)
  }

  const data: OmdbSearchResponse = await response.json()
  console.log('[OMDb Service] Raw API response:', data)

  if (data.Response === 'False') {
    console.warn('[OMDb Service] OMDb API error response:', data.Error)
    throw new Error(data.Error || 'Failed to find movies matching your query.')
  }

  console.log(`[OMDb Service] Successfully retrieved ${data.Search?.length ?? 0} movies:`, data.Search)
  return data.Search ?? []
}
