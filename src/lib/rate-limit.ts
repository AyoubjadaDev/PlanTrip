import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a simple in-memory store for development
// For production, use Upstash Redis
class MemoryStore {
  private store: Map<string, { count: number; reset: number }> = new Map();

  async increment(key: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const item = this.store.get(key);

    // If no item or expired, create new
    if (!item || item.reset < now) {
      this.store.set(key, { count: 1, reset: now + 60000 }); // 1 minute window
      return { success: true, limit: 10, remaining: 9, reset: now + 60000 };
    }

    // Increment count
    item.count++;
    
    // Check if over limit
    const limit = 10;
    const remaining = Math.max(0, limit - item.count);
    const success = item.count <= limit;

    return { success, limit, remaining, reset: item.reset };
  }

  async reset(key: string): Promise<void> {
    this.store.delete(key);
  }
}

// Simple memory-based rate limiter for development
const memoryStore = new MemoryStore();

// Rate limiter configurations
export const rateLimiters = {
  // Authentication endpoints - stricter limits
  auth: async (identifier: string) => {
    return memoryStore.increment(`auth:${identifier}`);
  },

  // API endpoints - moderate limits
  api: async (identifier: string) => {
    return memoryStore.increment(`api:${identifier}`);
  },

  // Trip generation - prevent abuse
  tripGeneration: async (identifier: string) => {
    return memoryStore.increment(`trip:${identifier}`);
  },

  // Contact form - prevent spam
  contact: async (identifier: string) => {
    return memoryStore.increment(`contact:${identifier}`);
  },
};

// Helper function to get client identifier
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a combination of headers
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `fallback-${userAgent.slice(0, 50)}`;
}

// Rate limit response helper
export function rateLimitResponse(result: { success: boolean; limit: number; remaining: number; reset: number }) {
  const headers = new Headers({
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  });

  if (!result.success) {
    return new Response(
      JSON.stringify({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((result.reset - Date.now()) / 1000)
      }),
      { 
        status: 429, 
        headers: {
          ...Object.fromEntries(headers),
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
        }
      }
    );
  }

  return null;
}

// Upstash Redis configuration (for production)
// Uncomment and configure when you have Upstash Redis set up

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
  analytics: true,
  prefix: 'ratelimit:auth',
});

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'), // 20 requests per minute
  analytics: true,
  prefix: 'ratelimit:api',
});

export const tripGenerationRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 trips per hour for anonymous
  analytics: true,
  prefix: 'ratelimit:trip',
});

export const contactRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 contact messages per hour
  analytics: true,
  prefix: 'ratelimit:contact',
});

