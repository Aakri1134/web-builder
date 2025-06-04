import { Context } from "hono"

export function getUserIP(c: Context): string | null {
  return (
    c.req.header("CF-Connecting-IP") || // Cloudflare's real IP
    c.req.header("X-Forwarded-For")?.split(",")[0] || // Proxy chain
    c.req.header("X-Real-IP") || // Direct proxy
    null
  )
}
