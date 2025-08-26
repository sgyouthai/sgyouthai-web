import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// For auth endpoints - stricter limits
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
  prefix: "auth",
});

// For general API endpoints
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "10 s"), // 30 requests per 10 seconds
  prefix: "api",
});
