import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, groqApiKeys } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import crypto from 'crypto';

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

    // Get all API keys (mask sensitive data)
    const keys = await db
      .select()
      .from(groqApiKeys)
      .orderBy(desc(groqApiKeys.createdAt));

    // Mask the full key - show only last 4 characters
    const maskedKeys = keys.map(key => ({
      ...key,
      key: `***...${key.key.slice(-4)}`,
    }));

    return NextResponse.json(maskedKeys, { status: 200 });
  } catch (error) {
    console.error('Fetch API keys error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const { action, key } = body;

    // Support for manual key input
    if (key && !action) {
      const [created] = await db
        .insert(groqApiKeys)
        .values({
          key: key.trim(),
          isActive: true,
          usageCount: 0,
          createdAt: new Date(),
        })
        .returning();

      if (!created) {
        return NextResponse.json(
          { error: 'Failed to add API key' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        id: created.id,
        key: `***...${created.key.slice(-4)}`,
        isActive: created.isActive,
        usageCount: created.usageCount,
        createdAt: created.createdAt,
      }, { status: 201 });
    }

    if (action === 'generate') {
      // Generate new API key
      const newKey = `groq_${crypto.randomBytes(32).toString('hex')}`;
      
      const [created] = await db
        .insert(groqApiKeys)
        .values({
          key: newKey,
          isActive: true,
          usageCount: 0,
          createdAt: new Date(),
        })
        .returning();

      if (!created) {
        return NextResponse.json(
          { error: 'Failed to create API key' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        id: created.id,
        key: created.key,
        isActive: created.isActive,
        usageCount: created.usageCount,
        createdAt: created.createdAt,
      }, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Create API key error:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}
