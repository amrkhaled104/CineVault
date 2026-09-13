import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMovies, initialMovies, type Movie } from './HomeModel'
import {
  loadFavourites,
  saveFavourite,
  deleteFavourite,
} from '../Favourites/FavouritesModel'

export function useHomeViewModel() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim() || ''

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set())

  // Load existing favourite IDs on mount
  useEffect(() => {
    let isMounted = true

    const syncFavourites = async () => {
      try {
        const favs = await loadFavourites()
        if (isMounted) {
          setFavouriteIds(new Set(favs.map((f) => f.imdbID)))
        }
      } catch (err) {
        console.warn('[useHomeViewModel] Could not sync initial favourites:', err)
      }
    }

    syncFavourites()

    return () => {
      isMounted = false
    }
  }, [])

  // Load movies on query change or initial load
  useEffect(() => {
    let isMounted = true

    const loadMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        if (searchQuery) {
          const results = await getMovies(searchQuery)
          if (isMounted) {
            setMovies(results)
          }
        } else {
          const initialList = await initialMovies()
          if (isMounted) {
            setMovies(initialList)
          }
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error ? err.message : 'An unexpected error occurred while fetching movies.'
          setError(message)
          setMovies([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadMovies()

    return () => {
      isMounted = false
    }
  }, [searchQuery])

  // Toggle favourite status and persist to Firebase Realtime Database
  const toggleFavourite = async (movie: Movie) => {
    const isFav = favouriteIds.has(movie.imdbID)

    // Optimistically update local state
    setFavouriteIds((prev) => {
      const next = new Set(prev)
      if (isFav) {
        next.delete(movie.imdbID)
      } else {
        next.add(movie.imdbID)
      }
      return next
    })

    try {
      if (isFav) {
        await deleteFavourite(movie.imdbID)
      } else {
        await saveFavourite(movie)
      }
    } catch (err) {
      console.error('[useHomeViewModel] Failed to persist favourite:', err)
      // Revert optimistic update on failure
      setFavouriteIds((prev) => {
        const next = new Set(prev)
        if (isFav) {
          next.add(movie.imdbID)
        } else {
          next.delete(movie.imdbID)
        }
        return next
      })
    }
  }

  return {
    query: searchQuery,
    movies,
    loading,
    error,
    favouriteIds,
    toggleFavourite,
  }
}
