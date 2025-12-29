import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, groqApiKeys } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Groq from 'groq-sdk';

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

    const { apiKeyId } = await request.json();

    if (!apiKeyId) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    // Get the API key from database
    const apiKey = await db.query.groqApiKeys.findFirst({
      where: eq(groqApiKeys.id, apiKeyId),
    });

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Test the API key by making a simple API call
    const groq = new Groq({
      apiKey: apiKey.key,
    });

    const testPrompt = 'Respond with just the word "WORKING" if you can read this.';

    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: testPrompt,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        max_tokens: 50,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'API key is valid and working',
          status: 'VALID',
          lastTested: new Date(),
        },
        { status: 200 }
      );
    } catch (groqError: any) {
      const errorMessage = groqError?.message || 'Unknown error';
      const errorCode = groqError?.status || 'UNKNOWN';

      if (errorCode === 401) {
        return NextResponse.json(
          {
            success: false,
            message: 'API key is invalid or expired',
            status: 'INVALID',
            error: 'Authentication failed - Invalid API Key',
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: 'API key test failed',
          status: 'ERROR',
          error: errorMessage,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Test API key error:', error);
    return NextResponse.json(
      { error: 'Failed to test API key' },
      { status: 500 }
    );
  }
}
