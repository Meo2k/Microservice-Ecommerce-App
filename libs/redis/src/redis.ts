import { ENV } from "@org/shared/server"
import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: ENV.REDIS_URL,
  token: ENV.REDIS_TOKEN,
})