import { redis } from "./redis"

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// Rate limiting implementation using Redis
export async function rateLimit(
  identifier: string,
  limit = 100,
  windowInSeconds = 60 * 60, // 1 hour
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`
  const now = Math.floor(Date.now() / 1000)
  const windowStart = now - windowInSeconds

  try {
    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart)

    // Count existing entries
    const count = await redis.zcard(key)

    // Check if limit is reached
    if (count >= limit) {
      return {
        success: false,
        limit,
        remaining: 0,
        reset: await getResetTime(key),
      }
    }

    // Add new entry
    await redis.zadd(key, now, `${now}-${Math.random().toString(36).substring(2, 10)}`)

    // Set expiry on the key
    await redis.expire(key, windowInSeconds * 2)

    return {
      success: true,
      limit,
      remaining: limit - count - 1,
      reset: now + windowInSeconds,
    }
  } catch (error) {
    console.error("Rate limit error:", error)

    // Fail open if Redis is down
    return {
      success: true,
      limit,
      remaining: limit,
      reset: now + windowInSeconds,
    }
  }
}

// Get the time when the rate limit will reset
async function getResetTime(key: string): Promise<number> {
  try {
    const ttl = await redis.ttl(key)
    const now = Math.floor(Date.now() / 1000)
    return now + (ttl > 0 ? ttl : 0)
  } catch (error) {
    return Math.floor(Date.now() / 1000) + 60 * 60
  }
}

