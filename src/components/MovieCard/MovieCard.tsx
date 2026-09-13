import type { Movie } from '../../services/omdbMovieService'
import './MovieCard.css'

export interface MovieCardProps {
  movie: Movie
  isFavourite?: boolean
  onRemove?: (imdbID: string) => void
  onFavouriteToggle?: (movie: Movie) => void
}

export function MovieCard({
  movie,
  isFavourite = false,
  onRemove,
  onFavouriteToggle,
}: MovieCardProps) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (onRemove) {
      onRemove(movie.imdbID)
    } else if (onFavouriteToggle) {
      onFavouriteToggle(movie)
    }
  }

  return (
    <article className="movie-card" id={`movie-card-${movie.imdbID}`}>
      <div className="movie-card-poster-wrapper">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="movie-card-poster-img"
            loading="lazy"
          />
        ) : (
          <div className="movie-card-poster-placeholder">
            <span>No Poster Available</span>
          </div>
        )}

        <span className="movie-card-type-badge">{movie.Type}</span>

        <button
          type="button"
          className={`movie-card-favourite-btn ${isFavourite ? 'is-favourite' : ''}`.trim()}
          aria-label={
            isFavourite
              ? `Remove ${movie.Title} from favourites`
              : `Add ${movie.Title} to favourites`
          }
          id={`favourite-btn-${movie.imdbID}`}
          onClick={handleFavouriteClick}
        >
          <svg
            className="favourite-icon"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.Title}</h3>
        <span className="movie-card-year">{movie.Year}</span>
      </div>
    </article>
  )
}

export default MovieCard
