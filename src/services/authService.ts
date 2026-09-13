import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { app } from './firebaseService'

// Initialize and export Firebase Auth instance
export const auth = getAuth(app)

export type { User, Unsubscribe }

/**
 * Converts Firebase authentication error codes into readable, user-friendly error messages.
 */
export function getReadableAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.'
      case 'auth/user-not-found':
        return 'No account found with this email address.'
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.'
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please verify your credentials.'
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address.'
      case 'auth/operation-not-allowed':
        return 'Email and password sign-in is currently disabled.'
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.'
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your internet connection.'
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment and try again.'
      case 'auth/missing-email':
        return 'Email address is required.'
      case 'auth/missing-password':
        return 'Password is required.'
      case 'auth/requires-recent-login':
        return 'This operation requires recent authentication. Please log in again.'
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed before completing.'
      case 'auth/cancelled-popup-request':
        return 'The authentication request was cancelled.'
      case 'auth/quota-exceeded':
        return 'Service quota exceeded. Please try again later.'
      default:
        return error.message || 'An authentication error occurred. Please try again.'
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected authentication error occurred. Please try again.'
}

/**
 * Registers a new user with email and password.
 * Returns the authenticated Firebase User.
 */
export async function registerUser(email: string, password: string): Promise<User> {
  if (!email || !email.trim()) {
    throw new Error('Email address is required.')
  }
  if (!password) {
    throw new Error('Password is required.')
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password)
    return userCredential.user
  } catch (error) {
    throw new Error(getReadableAuthErrorMessage(error))
  }
}

/**
 * Logs in an existing user with email and password.
 * Returns the authenticated Firebase User.
 */
export async function loginUser(email: string, password: string): Promise<User> {
  if (!email || !email.trim()) {
    throw new Error('Email address is required.')
  }
  if (!password) {
    throw new Error('Password is required.')
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password)
    return userCredential.user
  } catch (error) {
    throw new Error(getReadableAuthErrorMessage(error))
  }
}

/**
 * Logs out the currently signed-in user.
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(getReadableAuthErrorMessage(error))
  }
}

/**
 * Subscribes a listener callback to Firebase authentication state changes.
 * Returns an Unsubscribe function to tear down the listener when no longer needed.
 */
export function subscribeToAuthChanges(
  callback: (user: User | null) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onAuthStateChanged(
    auth,
    callback,
    onError ? (error) => onError(new Error(getReadableAuthErrorMessage(error))) : undefined
  )
}
