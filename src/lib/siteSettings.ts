import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export async function getSiteSettings() {
  const settings = await db.select().from(siteSettings).limit(1);
  return settings[0] || null;
}
