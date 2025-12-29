import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contactMessages } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into database
    const newMessage = await db.insert(contactMessages).values({
      name,
      email,
      subject,
      message,
    }).returning();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message submitted successfully',
        id: newMessage[0]?.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit message' },
      { status: 500 }
    );
  }
}
