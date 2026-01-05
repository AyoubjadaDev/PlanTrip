import { NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const settings = await db.select().from(siteSettings).limit(1);
    return NextResponse.json({ settings: settings[0] || null });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Upsert: update if exists, else insert
    const existing = await db.select().from(siteSettings).limit(1);
    if (existing.length > 0) {
      await db.update(siteSettings)
        .set({
          googleAnalyticsId: data.googleAnalyticsId,
          googleAdsenseCode: data.googleAdsenseCode,
          googleSearchConsoleMeta: data.googleSearchConsoleMeta,
          adsTxt: data.adsTxt,
          headerAdCode: data.headerAdCode,
          sidebarAdCode: data.sidebarAdCode,
          facebookUrl: data.facebookUrl,
          twitterUrl: data.twitterUrl,
          instagramUrl: data.instagramUrl,
          linkedinUrl: data.linkedinUrl,
          youtubeUrl: data.youtubeUrl,
          pinterestUrl: data.pinterestUrl,
          tiktokUrl: data.tiktokUrl,
          updatedAt: new Date(),
        })
          .where(eq(siteSettings.id, existing[0].id));
    } else {
      await db.insert(siteSettings).values({
        googleAnalyticsId: data.googleAnalyticsId,
        googleAdsenseCode: data.googleAdsenseCode,
        googleSearchConsoleMeta: data.googleSearchConsoleMeta,
        adsTxt: data.adsTxt,
        headerAdCode: data.headerAdCode,
        sidebarAdCode: data.sidebarAdCode,
        facebookUrl: data.facebookUrl,
        twitterUrl: data.twitterUrl,
        instagramUrl: data.instagramUrl,
        linkedinUrl: data.linkedinUrl,
        youtubeUrl: data.youtubeUrl,
        pinterestUrl: data.pinterestUrl,
        tiktokUrl: data.tiktokUrl,
        updatedAt: new Date(),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
