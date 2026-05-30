/** Reads JWT payload for UI only (no signature verification). */
export function getUserIdFromToken(token: string): number | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    const sub = payload.sub
    if (sub == null) return null
    const id = Number(sub)
    return Number.isFinite(id) ? id : null
  } catch {
    return null
  }
}
