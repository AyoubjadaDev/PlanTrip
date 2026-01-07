# Rate Limiting Implementation Guide

## Overview

Rate limiting has been implemented to protect the application from abuse and DDoS attacks. This guide explains the implementation and how to configure it.

## Implementation

### Current Setup (In-Memory)

The current implementation uses an in-memory store suitable for development and small-scale production:

- **Authentication endpoints**: 10 requests per minute per IP
- **Trip generation**: 10 requests per minute per IP  
- **Newsletter/Contact**: 10 requests per minute per IP
- **General API**: 10 requests per minute per IP

### Protected Endpoints

Rate limiting has been added to the following routes:

1. **`/api/auth/forgot-password`** - Password reset requests
2. **`/api/trips/generate`** - Trip generation (AI-powered)
3. **`/api/newsletter/subscribe`** - Newsletter subscriptions

### Rate Limit Headers

All rate-limited responses include these headers:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 2026-01-07T12:00:00.000Z
```

When rate limit is exceeded (429 status):

```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 45
}
```

## Upgrading to Production (Upstash Redis)

For production with multiple servers, upgrade to Upstash Redis:

### 1. Create Upstash Account

1. Go to [Upstash Console](https://console.upstash.com)
2. Create a new Redis database
3. Copy your REST URL and token

### 2. Add Environment Variables

Add to `.env.local`:

```env
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

### 3. Update Rate Limit Configuration

Edit `src/lib/rate-limit.ts` and uncomment the Upstash Redis section at the bottom:

```typescript
// Uncomment this section for production
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'ratelimit:auth',
});
```

### 4. Update Route Handlers

Replace the memory-based calls with Redis-based:

```typescript
// Before (memory)
const rateLimitResult = await rateLimiters.auth(identifier);

// After (Redis)
const { success, limit, remaining, reset } = await authRateLimit.limit(identifier);
```

## Configuration Options

### Adjust Limits

Edit `src/lib/rate-limit.ts` to customize limits:

```typescript
// Stricter limits for authentication
limiter: Ratelimit.slidingWindow(5, '1 m')  // 5 requests per minute

// More generous for regular API
limiter: Ratelimit.slidingWindow(20, '1 m')  // 20 requests per minute

// Prevent trip generation abuse
limiter: Ratelimit.slidingWindow(3, '1 h')  // 3 trips per hour
```

### Rate Limiting Strategies

Available strategies from @upstash/ratelimit:

1. **Sliding Window** (recommended): Smooth distribution
   ```typescript
   Ratelimit.slidingWindow(10, '1 m')
   ```

2. **Fixed Window**: Simple, resets at fixed intervals
   ```typescript
   Ratelimit.fixedWindow(10, '1 m')
   ```

3. **Token Bucket**: Burst allowance
   ```typescript
   Ratelimit.tokenBucket(10, '1 m', 5)
   ```

## Monitoring

### Check Rate Limit Usage

With Upstash analytics enabled, view usage in the Upstash console:

```typescript
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,  // Enable analytics
  prefix: 'ratelimit:api',
});
```

### Custom Monitoring

Add logging to track rate limit hits:

```typescript
const { success } = await authRateLimit.limit(identifier);
if (!success) {
  console.log(`Rate limit exceeded for ${identifier}`);
  // Send alert, log to monitoring service, etc.
}
```

## Testing

### Test Rate Limits Locally

```bash
# Test authentication endpoint
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/auth/forgot-password \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}'
  echo "Request $i"
done
```

Expected: First 10 succeed, remaining get 429 status.

### Test in Development

The current implementation works immediately without Redis setup for testing.

## Security Best Practices

1. **IP-based limiting**: Current implementation uses client IP
2. **User-based limiting**: For authenticated routes, consider user ID
3. **Graduated responses**: Implement progressive delays
4. **Whitelist trusted IPs**: Exclude internal services
5. **Monitor patterns**: Track unusual spikes in traffic

## Bypassing Rate Limits (Admin/Internal)

For admin or internal services, add bypass logic:

```typescript
// Check if request is from admin
const session = await getServerSession(authOptions);
if (session?.user?.role === 'admin') {
  // Skip rate limiting
  return;
}

// Apply rate limiting for regular users
const rateLimitResult = await rateLimiters.api(identifier);
```

## Troubleshooting

### Rate Limit Not Working

1. Check that the import is correct in route files
2. Verify rate limit is called before main logic
3. Check browser console for rate limit headers

### Too Many False Positives

1. Increase limits in `src/lib/rate-limit.ts`
2. Use user-based limiting instead of IP
3. Implement gradual backoff instead of hard limits

### Multiple Users Behind Same IP

If multiple legitimate users share an IP (corporate network):

```typescript
// Use combination of IP + user agent
const identifier = `${getClientIdentifier(request)}-${request.headers.get('user-agent')}`;
```

## Environment Variables Reference

```env
# Optional: For production Redis-based rate limiting
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

## Next Steps

1. ✅ Rate limiting implemented on critical endpoints
2. ✅ Security headers added
3. 📋 Monitor rate limit hits in production
4. 📋 Consider Upstash Redis for distributed rate limiting
5. 📋 Add rate limiting to more API routes as needed
6. 📋 Implement user-based rate limiting for authenticated routes

## Additional Resources

- [Upstash Rate Limiting Docs](https://upstash.com/docs/redis/features/ratelimiting)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [OWASP Rate Limiting Guide](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)
