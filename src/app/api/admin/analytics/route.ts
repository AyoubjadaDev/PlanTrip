import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, trips, contactMessages, analyticsEvents } from '@/db/schema';
import { eq, gte, sql, desc } from 'drizzle-orm';
import { subDays } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is admin
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!adminUser?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const thirtyDaysAgo = subDays(new Date(), 30);

    // Get total counts
    const totalUsersResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    const totalUsers = totalUsersResult[0]?.count || 0;

    const totalTripsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(trips);
    const totalTrips = totalTripsResult[0]?.count || 0;

    const totalContactsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages);
    const totalContacts = totalContactsResult[0]?.count || 0;

    // Get user growth (last 30 days)
    const userGrowth = await db
      .select({
        date: sql<string>`DATE(${users.createdAt})`,
        count: sql<number>`count(*)`,
      })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo))
      .groupBy(sql`DATE(${users.createdAt})`)
      .orderBy(sql`DATE(${users.createdAt})`);

    // Get trip trends (last 30 days)
    const tripTrends = await db
      .select({
        date: sql<string>`DATE(${trips.createdAt})`,
        count: sql<number>`count(*)`,
      })
      .from(trips)
      .where(gte(trips.createdAt, thirtyDaysAgo))
      .groupBy(sql`DATE(${trips.createdAt})`)
      .orderBy(sql`DATE(${trips.createdAt})`);

    // Get top destinations
    const topDestinations = await db
      .select({
        destination: trips.destination,
        count: sql<number>`count(*)`,
      })
      .from(trips)
      .groupBy(trips.destination)
      .orderBy(desc(sql`count(*)`))
      .limit(10);

    // Get active users this month
    const activeUsersResult = await db
      .select({ count: sql<number>`count(distinct user_id)` })
      .from(analyticsEvents)
      .where(gte(analyticsEvents.createdAt, thirtyDaysAgo));
    const activeUsers = activeUsersResult[0]?.count || 0;

    // Get unread contact messages
    const unreadMessagesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contactMessages)
      .where(eq(contactMessages.isRead, false));
    const unreadMessages = unreadMessagesResult[0]?.count || 0;

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTrips,
        totalContacts,
        activeUsers,
        unreadMessages,
      },
      charts: {
        userGrowth,
        tripTrends,
        topDestinations,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
