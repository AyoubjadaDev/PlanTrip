import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { partnerClicks, users } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';

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

    // Get total clicks
    const totalClicksResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(partnerClicks);
    const totalClicks = totalClicksResult[0]?.count || 0;

    // Get clicks by partner
    const clicksByPartner = await db
      .select({
        partnerId: partnerClicks.partnerId,
        count: sql<number>`count(*)`,
      })
      .from(partnerClicks)
      .groupBy(partnerClicks.partnerId)
      .orderBy(desc(sql`count(*)`));

    // Get clicks by link type
    const clicksByType = await db
      .select({
        linkType: partnerClicks.linkType,
        count: sql<number>`count(*)`,
      })
      .from(partnerClicks)
      .groupBy(partnerClicks.linkType)
      .orderBy(desc(sql`count(*)`));

    // Get recent clicks
    const recentClicks = await db
      .select({
        id: partnerClicks.id,
        partnerId: partnerClicks.partnerId,
        linkType: partnerClicks.linkType,
        destination: partnerClicks.destination,
        createdAt: partnerClicks.createdAt,
      })
      .from(partnerClicks)
      .orderBy(desc(partnerClicks.createdAt))
      .limit(50);

    // Get top destinations
    const topDestinations = await db
      .select({
        destination: partnerClicks.destination,
        count: sql<number>`count(*)`,
      })
      .from(partnerClicks)
      .where(sql`${partnerClicks.destination} IS NOT NULL`)
      .groupBy(partnerClicks.destination)
      .orderBy(desc(sql`count(*)`))
      .limit(10);

    return NextResponse.json({
      totalClicks,
      clicksByPartner,
      clicksByType,
      recentClicks,
      topDestinations,
    });
  } catch (error) {
    console.error('Error fetching partner clicks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partner clicks' },
      { status: 500 }
    );
  }
}
