import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { trips, users } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const adminUser = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1);
    
    console.log('Admin check:', {
      email: session.user.email,
      foundUser: adminUser.length > 0,
      isAdmin: adminUser[0]?.isAdmin
    });

    if (!adminUser.length || !adminUser[0].isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Fetch trips with user information
    const allTrips = await db
      .select({
        trip: trips,
        user: users,
      })
      .from(trips)
      .leftJoin(users, eq(trips.userId, users.id))
      .orderBy(desc(trips.createdAt))
      .limit(limit)
      .offset(offset);
    
    console.log('Fetched trips:', {
      count: allTrips.length,
      page,
      limit,
      offset
    });

    // Get total count for pagination
    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(trips);
    
    console.log('Total trips in database:', count);
    
    const totalPages = Math.ceil(count / limit);

    // Format response
    const formattedTrips = allTrips.map(({ trip, user }) => ({
      id: trip.id,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      travelType: trip.travelType,
      activities: trip.activities,
      language: trip.language,
      itinerary: trip.itinerary,
      createdAt: trip.createdAt,
      ipAddress: trip.ipAddress,
      user: user ? {
        id: user.id,
        name: user.name || 'Unknown',
        email: user.email || '',
      } : null,
    }));

    return NextResponse.json({
      trips: formattedTrips,
      totalPages,
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch itineraries' },
      { status: 500 }
    );
  }
}
