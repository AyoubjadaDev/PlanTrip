import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export async function GET() {
  try {
    const settings = await db.query.siteSettings.findFirst();
    
    if (!settings) {
      return NextResponse.json({ 
        settings: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
          youtube: '',
          pinterest: '',
          tiktok: '',
        }
      });
    }

    return NextResponse.json({
      settings: {
        facebook: settings.facebookUrl || '',
        twitter: settings.twitterUrl || '',
        instagram: settings.instagramUrl || '',
        linkedin: settings.linkedinUrl || '',
        youtube: settings.youtubeUrl || '',
        pinterest: settings.pinterestUrl || '',
        tiktok: settings.tiktokUrl || '',
      },
    });
  } catch (error) {
    console.error('Error fetching social settings:', error);
    return NextResponse.json({ 
      settings: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        pinterest: '',
        tiktok: '',
      }
    });
  }
}
