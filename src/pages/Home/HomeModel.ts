import { searchMovies, type Movie } from '../../services/omdbMovieService'

export type { Movie }

const SEED_KEYWORDS = [
  'Batman',
  'Avengers',
  'Harry Potter',
  'Star Wars',
  'Spider-Man',
  'Marvel',
  'Disney',
  'Matrix',
  'Lord of the Rings',
  'Fast',
  'Mission Impossible',
  'Pixar',
  'Horror',
  'Comedy',
  'Action',
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function initialMovies(): Promise<Movie[]> {
  // Randomly pick 4 distinct keywords from the seed list to ensure >= 20 results
  const randomKeywords = shuffleArray(SEED_KEYWORDS).slice(0, 4)

  // Fetch movies in parallel using Promise.all
  const results = await Promise.all(
    randomKeywords.map((keyword) =>
      searchMovies(keyword).catch((err) => {
        console.warn(`[HomeModel] Failed to fetch seed keyword "${keyword}":`, err)
        return [] as Movie[]
      })
    )
  )

  // Merge all results into a single array
  const mergedMovies = results.flat()

  // Remove duplicate movies using imdbID
  const uniqueMap = new Map<string, Movie>()
  for (const movie of mergedMovies) {
    if (movie.imdbID && !uniqueMap.has(movie.imdbID)) {
      uniqueMap.set(movie.imdbID, movie)
    }
  }

  // Shuffle the final unique array and return exactly 20 movies
  const uniqueMovies = Array.from(uniqueMap.values())
  const shuffledMovies = shuffleArray(uniqueMovies)

  return shuffledMovies.slice(0, 20)
}

export async function getMovies(query: string): Promise<Movie[]> {
  const cleanedQuery = query.trim()

  if (cleanedQuery.length < 2) {
    throw new Error('Search query must contain at least two characters.')
  }

  return await searchMovies(cleanedQuery)
}
