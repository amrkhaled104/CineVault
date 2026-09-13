import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from '../../services/firebaseService'
import type { Movie } from '../../services/omdbMovieService'

export type { Movie }

/**
 * Loads all favourite movies for a specific user via firebaseService.
 */
export async function loadFavourites(userId: string): Promise<Movie[]> {
  return await getFavourites(userId)
}

/**
 * Saves a movie to favourites under a user's profile via firebaseService.
 */
export async function saveFavourite(userId: string, movie: Movie): Promise<void> {
  await addFavourite(userId, movie)
}

/**
 * Deletes a favourite movie by imdbID under a user's profile via firebaseService.
 */
export async function deleteFavourite(userId: string, imdbID: string): Promise<void> {
  await removeFavourite(userId, imdbID)
}
