import { Redis } from "@upstash/redis"

// Initialize Redis client for caching
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Cache helpers
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    return await redis.get(key)
  } catch (error) {
    console.error("Redis get error:", error)
    return null
  }
}

export async function setCache<T>(key: string, value: T, expireInSeconds = 3600): Promise<void> {
  try {
    await redis.set(key, value, { ex: expireInSeconds })
  } catch (error) {
    console.error("Redis set error:", error)
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key)
  } catch (error) {
    console.error("Redis delete error:", error)
  }
}

