import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subscribers } from '@/db/schema';

export async function GET() {
  try {
    const allSubscribers = await db
      .select({
        id: subscribers.id,
        email: subscribers.email,
        subscribedAt: subscribers.subscribedAt,
      })
      .from(subscribers)
      .where(subscribers.isActive.eq(true))
      .orderBy(subscribers.subscribedAt.desc());
    return NextResponse.json({ subscribers: allSubscribers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
