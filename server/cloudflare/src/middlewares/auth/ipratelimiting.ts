import { createMiddleware } from "hono/factory"
import { Redis } from "@upstash/redis/cloudflare"
import { getUserIP, hashValue } from "../../utils/info"
import { captureException } from "@sentry/cloudflare"
import type { Env } from "../.."


// TODO implement Promise.all
function rateLimiter(COOLDOWN: number, MAX_ATTEMPTS: number) {
  return createMiddleware<Env>(async (c, next) => {
    try {
      const ip = getUserIP(c) || "not found"
      const hashed = await hashValue(ip)
      const redis = Redis.fromEnv(c.env)

      const cooldownKey = `ip:${hashed}:cooldown`
      const attemptsKey = `ip:${hashed}:attempts`

      const onCooldown = await redis.exists(cooldownKey)
      const attempts = await redis.incr(attemptsKey)
      if (onCooldown && c.env.NODE_ENVIRONMENT !== "DEV") {
        return c.json({ error: "Too many requests. Try again later." }, 429)
      }

      if (attempts === 1) {
        await redis.expire(attemptsKey, 60*60) 
      }

      if (attempts > MAX_ATTEMPTS && c.env.NODE_ENVIRONMENT !== "DEV") {
        await redis.set(cooldownKey, 1, { ex: COOLDOWN })
        return c.json({ error: "Too many attempts. Slow down." }, 429)
      }

      await next()
    } catch (err) {
      captureException(err)
      return c.json({ error: "Internal server error" }, 500)
    }
  })
}

export const sensitiveIPRateLimiting = rateLimiter(10, 10)
export const midIPRateLimiting = rateLimiter(20, 20)
export const looseIPRateLimiting = rateLimiter(40, 40)
