import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export async function getSiteSettings() {
  if (!db) {
    return null;
  }
  const database = db as NonNullable<typeof db>;
  const settings = await database.select().from(siteSettings).limit(1);
  return settings[0] || null;
}
