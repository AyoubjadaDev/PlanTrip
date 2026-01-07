import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, passwordResetTokens } from '@/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { rateLimiters, getClientIdentifier, rateLimitResponse } from '@/lib/rate-limit';

// Configure your email service (Brevo)
const transporter = nodemailer.createTransport({
  host: process.env.Brevo_SMTP_HOST,
  port: parseInt(process.env.Brevo_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.Brevo_Connexion,
    pass: process.env.Brevo_API_KEY,
  },
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 requests per minute per IP
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await rateLimiters.auth(identifier);
    const limitResponse = rateLimitResponse(rateLimitResult);
    if (limitResponse) return limitResponse;

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return NextResponse.json(
        { message: 'If an account exists with that email, a reset code has been sent.' },
        { status: 200 }
      );
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save code to database
    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token: hashedCode,
      expiresAt,
      createdAt: new Date(),
    });

    // Send email with code
    const mailOptions = {
      from: process.env.Brevo_Connexion,
      to: email,
      subject: 'Your Password Reset Code - PlanMyNextTravel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Code</h2>
          <p>Hi ${user.name || 'User'},</p>
          <p>We received a request to reset your password. Use the code below to reset it:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 0; color: #2563eb;">${resetCode}</p>
          </div>
          <p style="color: #666;">This code will expire in 15 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <hr />
          <p style="color: #666; font-size: 12px;">© PlanMyNextTravel - All rights reserved</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'If an account exists with that email, a reset code has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
