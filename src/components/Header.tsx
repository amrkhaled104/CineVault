import { useState, useEffect, type FormEvent } from 'react'
import { NavLink, Link, useNavigate, useSearchParams } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  className?: string
}

function Header({ className = '' }: HeaderProps) {
  const [searchParams] = useSearchParams()
  const currentSearchParam = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(currentSearchParam)
  const navigate = useNavigate()

  // Keep input in sync with URL search parameter
  useEffect(() => {
    setSearchTerm(currentSearchParam)
  }, [currentSearchParam])

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`)
    } else {
      navigate('/')
    }
  }

  return (
    <header className={`header ${className}`.trim()}>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-brand" id="header-brand-logo">
            <svg
              className="brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
              <line x1="7" x2="7" y1="2" y2="22" />
              <line x1="17" x2="17" y1="2" y2="22" />
              <line x1="2" x2="22" y1="12" y2="12" />
              <line x1="2" x2="7" y1="7" y2="7" />
              <line x1="2" x2="7" y1="17" y2="17" />
              <line x1="17" x2="22" y1="17" y2="17" />
              <line x1="17" x2="22" y1="7" y2="7" />
            </svg>
            <span className="brand-name">CineVault</span>
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              id="nav-home"
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              id="nav-favourites"
            >
              Favourites
            </NavLink>
          </nav>
        </div>

        <form className="header-search-form" role="search" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              id="header-search-input"
              className="header-search-input"
              placeholder="Search movies..."
              aria-label="Search movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            id="header-search-button"
            className="header-search-button"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
