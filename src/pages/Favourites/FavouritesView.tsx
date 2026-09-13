import { Link } from 'react-router-dom'
import { useFavouritesViewModel } from './useFavouritesViewModel'
import MovieCard from '../../components/MovieCard/MovieCard'
import './FavouritesView.css'

export function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel()

  return (
    <main className="favourites-view" id="favourites-view">
      <section className="favourites-hero-section">
        <h1 className="favourites-title">Your Favourites</h1>
        <p className="favourites-subtitle">
          Manage your personal collection of saved movies and series.
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="favourites-status favourites-loading" id="favourites-loading-indicator">
          <div className="loading-spinner" aria-hidden="true" />
          <p>Loading your favourites...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="favourites-status favourites-error" id="favourites-error-message" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && favourites.length === 0 && (
        <div className="favourites-empty-state" id="favourites-empty-message">
          <div className="empty-icon-wrapper">
            <svg
              className="empty-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h2 className="empty-title">No favourites added yet</h2>
          <p className="empty-desc">
            Explore movies from the home screen and click the heart icon on any card to save them to your favourites.
          </p>
          <Link to="/" className="favourites-explore-btn">
            Explore Movies
          </Link>
        </div>
      )}

      {/* Favourites Grid */}
      {!loading && !error && favourites.length > 0 && (
        <div className="favourites-movie-grid" id="favourites-movie-grid">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavourite={true}
              onRemove={removeMovie}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default FavouritesView
