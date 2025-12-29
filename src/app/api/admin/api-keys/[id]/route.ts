import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, groqApiKeys } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    const body = await request.json();
    const { isActive } = body;

    // Update API key
    const updated = await db
      .update(groqApiKeys)
      .set({ isActive })
      .where(eq(groqApiKeys.id, params.id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Mask the key
    const key = updated[0];
    return NextResponse.json({
      ...key,
      key: `***...${key.key.slice(-4)}`,
    }, { status: 200 });
  } catch (error) {
    console.error('Update API key error:', error);
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    // Check if key exists
    const existingKey = await db.query.groqApiKeys.findFirst({
      where: eq(groqApiKeys.id, params.id),
    });

    if (!existingKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Delete API key
    await db.delete(groqApiKeys).where(eq(groqApiKeys.id, params.id));

    return NextResponse.json(
      { success: true, message: 'API key deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete API key error:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}
