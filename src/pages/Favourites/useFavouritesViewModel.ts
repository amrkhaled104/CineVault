import { useState, useEffect, useCallback } from 'react'
import {
  loadFavourites,
  deleteFavourite,
  type Movie,
} from './FavouritesModel'

export function useFavouritesViewModel() {
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await loadFavourites()
      setFavourites(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred while loading favourites.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeMovie = async (imdbID: string) => {
    try {
      await deleteFavourite(imdbID)
      setFavourites((prev) => prev.filter((movie) => movie.imdbID !== imdbID))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred while removing favourite movie.'
      setError(message)
    }
  }

  useEffect(() => {
    loadMovies()
  }, [loadMovies])

  return {
    favourites,
    loading,
    error,
    loadMovies,
    removeMovie,
  }
}

export default useFavouritesViewModel
