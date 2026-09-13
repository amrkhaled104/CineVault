import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  subscribeToAuthChanges,
  logoutUser,
  type User,
} from '../services/authService'
import './AuthContext.css'

export interface AuthContextType {
  user: User | null
  authLoading: boolean
  logout: () => Promise<void>
}

/* oxlint-disable react/only-export-components */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(
      (currentUser) => {
        setUser(currentUser)
        setAuthLoading(false)
      },
      (error) => {
        console.error('Error listening to auth state changes:', error)
        setUser(null)
        setAuthLoading(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [])

  const logout = async () => {
    await logoutUser()
  }

  const value: AuthContextType = {
    user,
    authLoading,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {authLoading ? (
        <div className="auth-global-loading" id="auth-global-loading">
          <div className="auth-global-spinner" aria-hidden="true" />
          <p className="auth-global-loading-text">Loading CineVault...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to access authentication context.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
