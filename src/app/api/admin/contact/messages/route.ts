import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';
import { users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET all contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is admin
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

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const isRead = searchParams.get('isRead');

    // Filter by read status if provided
    if (isRead !== null) {
      const isReadBool = isRead === 'true';
      const messages = await db
        .select()
        .from(contactMessages)
        .where(eq(contactMessages.isRead, isReadBool))
        .orderBy(desc(contactMessages.createdAt));
      return NextResponse.json(messages, { status: 200 });
    }

    const allMessages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    return NextResponse.json(allMessages, { status: 200 });
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
