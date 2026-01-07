import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { blogPosts } from '../drizzle/schema';
import { eq, or } from 'drizzle-orm';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { 
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 30,
});
const db = drizzle(client);

const frenchArticleSlugs = [
  'voyage-affaires-productivite-guide-2026',
  'escapades-week-end-routes-2026',
  'planification-voyage-groupe-guide-2026',
  'liste-camping-debutants-2026',
  'voyage-anniversaire-destinations-romantiques-2026'
];

async function removeFrenchArticles() {
  try {
    console.log('Removing 5 French articles from database...\n');
    
    for (const slug of frenchArticleSlugs) {
      console.log(`Deleting: ${slug}`);
      
      await db
        .delete(blogPosts)
        .where(eq(blogPosts.slug, slug));
      
      console.log(`✓ Deleted: ${slug}\n`);
    }
    
    console.log(`✅ Successfully removed ${frenchArticleSlugs.length} French articles from database!`);
    console.log('\nNote: French articles should be added to src/data/blogPosts.ts instead.');
    
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error removing articles:', error);
    await client.end();
    process.exit(1);
  }
}

removeFrenchArticles();
