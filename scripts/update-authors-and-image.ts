import 'dotenv/config';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const updates = [
  {
    slug: "adventure-sports-destinations-2026",
    author: "Marcus Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
  },
  {
    slug: "hidden-european-gems-2026",
    author: "Elena Popescu",
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
  },
  {
    slug: "sustainable-packing-guide-2026",
    author: "Maya Chen",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
  },
  {
    slug: "budget-backpacking-southeast-asia-2026",
    author: "Jake Thompson",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"
  },
  {
    slug: "luxury-train-journeys-2026",
    author: "Isabella Laurent",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3"
  },
  {
    slug: "family-travel-tips-2026",
    author: "Sarah Mitchell",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
  },
  {
    slug: "photography-composition-travel-2026",
    author: "Alex Kim",
    imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
  },
  {
    slug: "japan-cherry-blossom-guide-2026",
    author: "Yuki Tanaka",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951"
  },
  {
    slug: "digital-nomad-tax-guide-2026",
    author: "David Foster",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
  },
  {
    slug: "wildlife-safari-guide-2026",
    author: "Amara Okonkwo",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801"
  }
];

async function updateArticles() {
  const connectionString = process.env.DATABASE_URL!;
  
  const client = new Client({
    connectionString: connectionString,
    ssl: connectionString.includes('render.com') ? { 
      rejectUnauthorized: false 
    } : undefined
  });

  try {
    await client.connect();
    console.log('✓ Connected to database\n');

    let successCount = 0;
    let failCount = 0;

    for (const update of updates) {
      try {
        console.log(`Updating: ${update.slug}`);
        
        const result = await client.query(
          `UPDATE blog_posts 
           SET author = $1, image = $2, updated_at = NOW()
           WHERE slug = $3`,
          [update.author, update.imageUrl, update.slug]
        );
        
        if (result.rowCount && result.rowCount > 0) {
          console.log(`✓ Updated: ${update.slug} - Author: ${update.author}\n`);
          successCount++;
        } else {
          console.log(`✗ Article not found: ${update.slug}\n`);
          failCount++;
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (err) {
        console.error(`✗ Failed to update ${update.slug}:`, err);
        failCount++;
      }
    }

    console.log(`\n========================================`);
    console.log(`Update complete!`);
    console.log(`Success: ${successCount}/${updates.length}`);
    console.log(`Failed: ${failCount}/${updates.length}`);
    console.log(`========================================\n`);

  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await client.end();
    console.log('✓ Database connection closed');
  }
}

updateArticles();
