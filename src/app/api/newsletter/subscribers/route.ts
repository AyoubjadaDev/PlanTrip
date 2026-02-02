import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subscribers } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const database = db as NonNullable<typeof db>;

    const allSubscribers = await database
      .select({
        id: subscribers.id,
        email: subscribers.email,
        subscribedAt: subscribers.subscribedAt,
      })
      .from(subscribers)
      .where(eq(subscribers.isActive, true))
      .orderBy(desc(subscribers.subscribedAt));
    return NextResponse.json({ subscribers: allSubscribers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
