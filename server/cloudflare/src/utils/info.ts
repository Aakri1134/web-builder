import { Context } from "hono"

export function getUserIP(c: Context): string | null {
  return (
    c.req.header("CF-Connecting-IP") || // Cloudflare's real IP
    c.req.header("X-Forwarded-For")?.split(",")[0] || // Proxy chain
    c.req.header("X-Real-IP") || // Direct proxy
    null
  )
}

export async function hashValue(input: string, length: number = 16): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length) // shorten for Redis key usage
}