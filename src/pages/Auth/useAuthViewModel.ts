import { useState, type FormEvent } from 'react'
import * as AuthModel from './AuthModel'
import type { AuthMode } from './AuthModel'

export function useAuthViewModel() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setError(null)
  }

  const handleSubmit = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        await AuthModel.login(email, password)
      } else {
        await AuthModel.register(email, password)
      }
      setPassword('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    setMode,
    loading,
    setLoading,
    error,
    setError,
    handleSubmit,
    toggleMode,
  }
}

export default useAuthViewModel
