import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { blogPosts } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { ssl: 'require' });
const db = drizzle(client);

const updates = [
  {
    slug: "glowmad-wellness-travel-2026",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
    author: "Sarah Mitchell"
  },
  {
    slug: "travel-photography-gear-guide-2026",
    imageUrl: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=1200&q=80",
    author: "Marcus Chen"
  },
  {
    slug: "uzbekistan-silk-road-guide-2026",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80",
    author: "Elena Volkov"
  },
  {
    slug: "eco-luxury-resorts-2026",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    author: "James Anderson"
  },
  {
    slug: "set-jetting-travel-locations",
    imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    author: "Olivia Rodriguez"
  },
  {
    slug: "dark-sky-tourism-stargazing-guide",
    imageUrl: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=1200&q=80",
    author: "David Nakamura"
  },
  {
    slug: "co-living-digital-nomad-2026",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    author: "Sophie Laurent"
  },
  {
    slug: "solo-female-travel-2026-manual",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    author: "Jessica Thompson"
  },
  {
    slug: "georgia-country-food-guide-2026",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
    author: "Antonio Moretti"
  },
  {
    slug: "travel-gear-purge-2026",
    imageUrl: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=1200&q=80",
    author: "Rachel Kim"
  }
];

async function updateArticles() {
  try {
    console.log('Updating all articles with new images and authors...\n');
    
    for (const update of updates) {
      console.log(`Updating: ${update.slug}`);
      console.log(`  - New image: ${update.imageUrl.substring(0, 50)}...`);
      console.log(`  - New author: ${update.author}`);
      
      await db
        .update(blogPosts)
        .set({
          imageUrl: update.imageUrl,
          author: update.author
        })
        .where(eq(blogPosts.slug, update.slug));
      
      console.log(`✓ Updated: ${update.slug}\n`);
    }
    
    console.log(`✅ Successfully updated ${updates.length} articles with new images and authors!`);
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error updating articles:', error);
    await client.end();
    process.exit(1);
  }
}

updateArticles();
