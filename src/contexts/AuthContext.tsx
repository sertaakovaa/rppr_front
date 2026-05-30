import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as authApi from '../api/auth'
import { clearAuthStorage, setAccessToken, getAccessToken } from '../api/client'
import { STORAGE_AUTH_USER } from '../api/storage'
import type { AuthUser, User, UserCreate } from '../types/auth'
import { getUserIdFromToken } from '../utils/jwt'

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (login: string, password: string, profile?: User) => Promise<void>
  register: (data: UserCreate) => Promise<User>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function loadUserFromStorage(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_AUTH_USER)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function saveUser(user: AuthUser | null): void {
  if (user) {
    localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_AUTH_USER)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    clearAuthStorage()
    setUser(null)
  }, [])

  useEffect(() => {
    const token = getAccessToken()
    const storedUser = loadUserFromStorage()
    if (token && storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)

    const onLogout = () => {
      setUser(null)
    }
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  const login = useCallback(
    async (loginName: string, password: string, profile?: User) => {
      const { access_token } = await authApi.login(loginName, password)
      setAccessToken(access_token)

      const id = getUserIdFromToken(access_token)
      if (id == null && !profile) {
        throw new Error('Не удалось прочитать id пользователя из токена')
      }

      // After login API does not return profile; pass profile from register when available.
      const authUser: AuthUser = profile ?? {
        id: id!,
        login: loginName,
        is_manager: false,
      }
      saveUser(authUser)
      setUser(authUser)
    },
    [],
  )

  const register = useCallback(async (data: UserCreate) => {
    return authApi.register(data)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user && getAccessToken()),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
