const attempts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 10,
  windowMs: number = 60000,
): boolean {
  const now = Date.now();
  const userAttempts = attempts.get(identifier);

  if (!userAttempts || now > userAttempts.resetTime) {
    attempts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (userAttempts.count >= maxAttempts) {
    console.warn(
      `Rate limit hit: ${identifier} - ${userAttempts.count}/${maxAttempts}`,
    );
    return false;
  }

  userAttempts.count++;
  return true;
}

if (typeof window === "undefined") {
  setInterval(() => {
    const now = Date.now();
    let cleaned = 0;
    for (const [key, value] of attempts.entries()) {
      if (now > value.resetTime) {
        attempts.delete(key);
        cleaned++;
      }
    }
    if (cleaned > 0) {
      console.log(`Cleaned ${cleaned} expired rate limit entries`);
    }
  }, 60000);
}

export function clearRateLimits() {
  attempts.clear();
  console.log("All rate limits cleared");
}
