import { useHomeViewModel } from './useHomeViewModel'
import MovieCard from '../../components/MovieCard/MovieCard'
import './HomeView.css'

export function HomeView() {
  const { query, movies, loading, error, favouriteIds, toggleFavourite } =
    useHomeViewModel()

  return (
    <main className="home-view" id="home-view">
      <section className="home-hero-section">
        <h1 className="home-title">
          {query ? `Results for "${query}"` : 'Discover Movies & Series'}
        </h1>
        <p className="home-subtitle">
          {query
            ? `Found ${movies.length} title${movies.length === 1 ? '' : 's'} matching your search.`
            : 'Search across millions of titles, view release years, and explore entertainment.'}
        </p>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="home-status home-loading" id="home-loading-indicator">
          <div className="loading-spinner" aria-hidden="true" />
          <p>{query ? `Searching for "${query}"...` : 'Loading movies, please wait...'}</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="home-status home-error" id="home-error-message" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Movie Results Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="home-movie-grid" id="home-movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavourite={favouriteIds.has(movie.imdbID)}
              onFavouriteToggle={toggleFavourite}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default HomeView
