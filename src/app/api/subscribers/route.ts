import { NextResponse } from 'next/server';
import { db } from '@/db';
import { subscribers } from '@/db/schema';

export async function GET() {
  try {
    // Drizzle ORM .orderBy expects a column, not a function call
    const allSubscribers = await db.select().from(subscribers).orderBy(subscribers.subscribedAt);
    // If you want descending order, reverse the array in JS (or use SQL raw if needed)
    allSubscribers.reverse();
    return NextResponse.json({ subscribers: allSubscribers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
