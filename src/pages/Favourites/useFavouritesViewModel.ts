import { useState, useEffect, useCallback } from 'react'
import {
  loadFavourites,
  deleteFavourite,
  type Movie,
} from './FavouritesModel'
import { useAuth } from '../../context/AuthContext'

export function useFavouritesViewModel() {
  const { user } = useAuth()
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = useCallback(async () => {
    if (!user) {
      setFavourites([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await loadFavourites(user.uid)
      setFavourites(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An error occurred while loading favourites.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [user])

  const removeMovie = async (imdbID: string) => {
    if (!user) return

    try {
      await deleteFavourite(user.uid, imdbID)
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
