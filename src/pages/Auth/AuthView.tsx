import type { FormEvent } from 'react'
import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

export function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  const isLogin = mode === 'login'
  const pageTitle = isLogin ? 'Login' : 'Create Account'
  const submitText = loading
    ? isLogin
      ? 'Logging in...'
      : 'Creating account...'
    : isLogin
      ? 'Login'
      : 'Create Account'

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <main className="auth-view" id="auth-view">
      <div className="auth-card" id="auth-card">
        <header className="auth-header">
          <div className="auth-badge-icon" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className="auth-title" id="auth-title">{pageTitle}</h1>
          <p className="auth-subtitle">
            {isLogin
              ? 'Welcome back! Sign in to access your saved favourites.'
              : 'Join CineVault to keep track of your favourite movies and series.'}
          </p>
        </header>

        {error && (
          <div
            className="auth-error-banner"
            id="auth-error-message"
            role="alert"
            aria-live="polite"
          >
            <svg
              className="auth-error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" id="auth-form" onSubmit={onFormSubmit} noValidate>
          <div className="auth-form-group">
            <label htmlFor="auth-email-input" className="auth-label">
              Email Address
            </label>
            <div className="auth-input-wrapper">
              <input
                id="auth-email-input"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label htmlFor="auth-password-input" className="auth-label">
              Password
            </label>
            <div className="auth-input-wrapper">
              <input
                id="auth-password-input"
                type="password"
                className="auth-input"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading && <span className="auth-spinner" aria-hidden="true" />}
            <span>{submitText}</span>
          </button>
        </form>

        <footer className="auth-switch-section">
          <span>
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>
          <button
            type="button"
            id="auth-toggle-mode-btn"
            className="auth-toggle-btn"
            onClick={toggleMode}
            disabled={loading}
          >
            {isLogin ? 'Create Account' : 'Login'}
          </button>
        </footer>
      </div>
    </main>
  )
}

export default AuthView
