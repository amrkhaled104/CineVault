import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import Header from './components/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import { AuthProvider, useAuth } from './context/AuthContext'

/**
 * Route guard that requires authentication.
 * When an unauthenticated user visits, redirects them to /auth.
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return null
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}

/**
 * Route guard for authentication routes.
 * When an authenticated user visits, redirects them to /.
 */
function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return null
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/auth"
          element={
            <PublicOnlyRoute>
              <AuthView />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <FavouritesView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<HomeView />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
