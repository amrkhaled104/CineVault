import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from '../../services/firebaseService'
import type { Movie } from '../../services/omdbMovieService'

export type { Movie }

/**
 * Loads all favourite movies via firebaseService.
 */
export async function loadFavourites(): Promise<Movie[]> {
  return await getFavourites()
}

/**
 * Saves a movie to favourites via firebaseService.
 */
export async function saveFavourite(movie: Movie): Promise<void> {
  await addFavourite(movie)
}

/**
 * Deletes a favourite movie by imdbID via firebaseService.
 */
export async function deleteFavourite(imdbID: string): Promise<void> {
  await removeFavourite(imdbID)
}
