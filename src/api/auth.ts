import { apiClient } from './client'
import type { TokenResponse, User, UserCreate } from '../types/auth'

export async function register(data: UserCreate): Promise<User> {
  const { data: user } = await apiClient.post<User>('/auth/register', {
    ...data,
    is_manager: data.is_manager ?? false,
  })
  return user
}

export async function login(login: string, password: string): Promise<TokenResponse> {
  const body = new URLSearchParams()
  body.set('username', login)
  body.set('password', password)

  const { data } = await apiClient.post<TokenResponse>('/auth/login', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data
}

export async function refresh(): Promise<TokenResponse> {
  const { data } = await apiClient.post<TokenResponse>('/auth/refresh')
  return data
}
