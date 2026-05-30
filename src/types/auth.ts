export interface User {
  id: number
  first_name: string
  last_name: string
  login: string
  is_manager: boolean
  created_at: string
}

export interface UserCreate {
  first_name: string
  last_name: string
  login: string
  password: string
  is_manager?: boolean
}

export interface TokenResponse {
  access_token: string
  token_type: string
  refresh_token?: string | null
}

/** After login: only login + id; is_manager defaults to false (see AuthContext). */
export interface AuthUserPartial {
  id: number
  login: string
  first_name?: string
  last_name?: string
  is_manager: boolean
}

export type AuthUser = User | AuthUserPartial

export function isFullUser(user: AuthUser): user is User {
  return 'created_at' in user && 'first_name' in user && user.first_name !== undefined
}
