import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings).limit(1);
    const adsTxtContent = settings[0]?.adsTxt || '';

    return new NextResponse(adsTxtContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new NextResponse('', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}
