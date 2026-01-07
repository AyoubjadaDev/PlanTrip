import { config as dotenvConfig } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { blogPosts } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

// Load environment variables from .env.local
dotenvConfig({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString, {
  ssl: 'require',
  max: 1,
});

const db = drizzle(client);

async function updateArticleImage() {
  try {
    console.log('Updating Budget Travel Guide article image...');

    await db
      .update(blogPosts)
      .set({
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(blogPosts.slug, 'budget-travel-guide-2026'));

    console.log('✅ Successfully updated article image to travel adventure scene!');
  } catch (error) {
    console.error('❌ Error updating article:', error);
  } finally {
    await client.end();
  }
}

updateArticleImage();
