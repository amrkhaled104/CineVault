import {
  registerUser,
  loginUser,
  logoutUser,
  type User,
} from '../../services/authService'

export interface AuthCredentials {
  email: string
  password: string
}

export type AuthMode = 'login' | 'register'

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export type { User }

/**
 * Validates credentials, ensuring neither field is empty and the password
 * contains at least six characters. Returns trimmed and lowercased email.
 */
function validateCredentials(email: string, password: string): { normalizedEmail: string; password: string } {
  if (!email || !email.trim()) {
    throw new Error('Email address is required.')
  }

  if (!password) {
    throw new Error('Password is required.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  return {
    normalizedEmail: email.trim().toLowerCase(),
    password,
  }
}

/**
 * Registers a new user with email and password via authService.
 * Trims and normalizes the email address, validates input, and returns the authenticated User.
 */
export async function register(email: string, password: string): Promise<User> {
  const { normalizedEmail } = validateCredentials(email, password)
  return await registerUser(normalizedEmail, password)
}

/**
 * Logs in an existing user with email and password via authService.
 * Trims and normalizes the email address, validates input, and returns the authenticated User.
 */
export async function login(email: string, password: string): Promise<User> {
  const { normalizedEmail } = validateCredentials(email, password)
  return await loginUser(normalizedEmail, password)
}

/**
 * Logs out the currently signed-in user via authService.
 */
export async function logout(): Promise<void> {
  await logoutUser()
}
