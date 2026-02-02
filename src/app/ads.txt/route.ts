import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!db) {
      return new NextResponse('', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    const database = db as NonNullable<typeof db>;
    const settings = await database.select().from(siteSettings).limit(1);
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
