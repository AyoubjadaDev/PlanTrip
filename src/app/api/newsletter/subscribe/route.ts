import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subscribers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { rateLimiters, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    // Rate limiting - prevent spam subscriptions
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await rateLimiters.contact(identifier);
    const limitResponse = rateLimitResponse(rateLimitResult);
    if (limitResponse) return limitResponse;

    let email = '';
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await request.json();
      email = data.email;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      email = formData.get('email') as string;
    } else {
      // Try both (for edge cases)
      try {
        const data = await request.json();
        email = data.email;
      } catch {
        const formData = await request.formData();
        email = formData.get('email') as string;
      }
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await db.query.subscribers.findFirst({
      where: eq(subscribers.email, email),
    });

    if (existing) {
      if (!existing.isActive) {
        // Reactivate subscription
        await db
          .update(subscribers)
          .set({ isActive: true, subscribedAt: new Date() })
          .where(eq(subscribers.email, email));
      }
      return NextResponse.json({ message: 'Already subscribed!' });
    }

    // Create new subscriber
    await db.insert(subscribers).values({ email });

    return NextResponse.json({ message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
