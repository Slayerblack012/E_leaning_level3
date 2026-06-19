const buckets = new Map();
let redisClient;
let redisConnectPromise;

function getClientKey(req, scope) {
  const forwardedFor = req.headers['x-forwarded-for'];
  const ip = typeof forwardedFor === 'string' && forwardedFor.length > 0
    ? forwardedFor.split(',')[0].trim()
    : req.ip || req.connection?.remoteAddress || 'unknown';

  return `${scope}:${ip}`;
}

function getRedisClient() {
  if (!process.env.REDIS_URL) return null;

  if (!redisClient) {
    let createClient;
    try {
      ({ createClient } = require('redis'));
    } catch (error) {
      console.warn('Redis package unavailable, falling back to memory rate limit:', error.message);
      return null;
    }

    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', (error) => {
      console.warn('Redis rate limit client error:', error.message);
    });
  }

  return redisClient;
}

async function ensureRedisConnection(client) {
  if (!client) return false;
  if (client.isOpen) return true;

  if (!redisConnectPromise) {
    redisConnectPromise = client.connect().catch((error) => {
      redisConnectPromise = null;
      throw error;
    });
  }

  await redisConnectPromise;
  return true;
}

function checkMemoryBucket(key, windowMs, max) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = buckets.get(key) || [];
  const recent = timestamps.filter((timestamp) => timestamp > windowStart);

  if (recent.length >= max) {
    return { limited: true, retryAfterMs: windowMs };
  }

  recent.push(now);
  buckets.set(key, recent);
  return { limited: false };
}

function rateLimit({ windowMs = 15 * 60 * 1000, max = 60, scope = 'api' } = {}) {
  return async function rateLimitMiddleware(req, res, next) {
    const key = getClientKey(req, scope);

    try {
      const client = getRedisClient();
      if (client && await ensureRedisConnection(client)) {
        const redisKey = `rate-limit:${key}`;
        const currentCount = await client.incr(redisKey);

        if (currentCount === 1) {
          await client.expire(redisKey, Math.ceil(windowMs / 1000));
        }

        if (currentCount > max) {
          return res.status(429).json({
            error: 'Too many requests',
            retryAfterMs: windowMs
          });
        }

        return next();
      }
    } catch (error) {
      console.warn('Redis rate limiter unavailable, falling back to memory:', error.message);
    }

    const fallback = checkMemoryBucket(key, windowMs, max);

    if (fallback.limited) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfterMs: fallback.retryAfterMs
      });
    }

    return next();
  };
}

module.exports = rateLimit;
