import { initializeApp, getApps, getApp } from 'firebase/app'
import { getDatabase, ref, set, remove, get } from 'firebase/database'
import type { Movie } from './omdbMovieService'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Export Realtime Database instance
export const db = getDatabase(app)

const FAVOURITES_PATH = 'favourites'

/**
 * Adds or updates a movie in the favourites collection using imdbID as key.
 */
export async function addFavourite(movie: Movie): Promise<void> {
  if (!movie || !movie.imdbID) {
    throw new Error('Cannot add favourite: Movie object must contain a valid imdbID.')
  }

  try {
    const movieRef = ref(db, `${FAVOURITES_PATH}/${movie.imdbID}`)
    await set(movieRef, movie)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to add "${movie.Title}" to favourites: ${message}`)
  }
}

/**
 * Removes a movie from favourites by its imdbID.
 */
export async function removeFavourite(imdbID: string): Promise<void> {
  if (!imdbID || !imdbID.trim()) {
    throw new Error('Cannot remove favourite: A valid imdbID is required.')
  }

  try {
    const movieRef = ref(db, `${FAVOURITES_PATH}/${imdbID.trim()}`)
    await remove(movieRef)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to remove movie with ID "${imdbID}" from favourites: ${message}`)
  }
}

/**
 * Retrieves all favourite movies from the database.
 */
export async function getFavourites(): Promise<Movie[]> {
  try {
    const favouritesRef = ref(db, FAVOURITES_PATH)
    const snapshot = await get(favouritesRef)

    if (!snapshot.exists()) {
      return []
    }

    const data = snapshot.val() as Record<string, Movie>
    return Object.values(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Failed to load favourite movies: ${message}`)
  }
}
