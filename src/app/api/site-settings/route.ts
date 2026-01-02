import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings).limit(1);
    
    // Only return public-facing settings
    const publicSettings = settings[0] ? {
      googleAnalyticsId: settings[0].googleAnalyticsId,
      headerAdCode: settings[0].headerAdCode,
      sidebarAdCode: settings[0].sidebarAdCode,
    } : null;

    return NextResponse.json({ settings: publicSettings });
  } catch (error) {
    return NextResponse.json({ settings: null }, { status: 200 });
  }
}
