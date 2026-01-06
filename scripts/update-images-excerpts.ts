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
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
    description: "Discover how modern wellness travelers are transforming vacations into rejuvenating experiences through biohacking retreats, sleep optimization hotels, and forest bathing programs that leave you glowing with vitality."
  },
  {
    slug: "travel-photography-gear-guide-2026",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
    description: "Master travel photography with our comprehensive 2026 gear guide covering mirrorless cameras, drones, lenses, and AI-powered editing tools that capture professional-quality content on the go."
  },
  {
    slug: "uzbekistan-silk-road-guide-2026",
    image: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200&q=80",
    description: "Journey through Uzbekistan's legendary Silk Road cities of Samarkand, Bukhara, and Khiva, where stunning Islamic architecture, 8,000-year wine traditions, and warm hospitality await adventurous travelers."
  },
  {
    slug: "eco-luxury-resorts-2026",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    description: "Experience guilt-free luxury at the world's finest eco-resorts that combine five-star comfort with genuine sustainability, carbon-neutral operations, and active conservation programs that protect our planet."
  },
  {
    slug: "set-jetting-travel-locations",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    description: "Visit the real-world filming locations from White Lotus, Game of Thrones, Wednesday, and The Last of Us as set-jetting transforms how we choose travel destinations in 2026."
  },
  {
    slug: "dark-sky-tourism-stargazing-guide",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    description: "Escape light pollution and witness the Milky Way in all its glory at the world's best Dark Sky Reserves, from Chile's Atacama Desert to New Zealand's Aoraki Mackenzie, where pristine night skies await."
  },
  {
    slug: "co-living-digital-nomad-2026",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&q=80",
    description: "Explore the evolution of digital nomad co-living spaces in 2026, featuring high-speed internet, productivity-optimized workspaces, and vibrant communities in destinations from Lisbon to Bali."
  },
  {
    slug: "solo-female-travel-2026-manual",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80",
    description: "Empower your solo female travel journey with our comprehensive 2026 safety guide covering the best destinations, accommodation strategies, community building, and practical tips from experienced women travelers worldwide."
  },
  {
    slug: "georgia-country-food-guide-2026",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    description: "Dive into Georgia's incredible food scene featuring khachapuri cheese bread, khinkali dumplings, and 8,000 years of winemaking tradition using ancient qvevri clay vessels—all at unbeatable prices."
  },
  {
    slug: "travel-gear-purge-2026",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
    description: "Master minimalist travel with our proven packing philosophy that reduces your load to a 35-40L carry-on, eliminating checked baggage fees while maximizing mobility and freedom on the road."
  }
];

async function updateArticles() {
  try {
    console.log('Updating all articles with unique images and descriptions...\n');
    
    for (const update of updates) {
      console.log(`Updating: ${update.slug}`);
      console.log(`  - Image: ${update.image.substring(34, 70)}...`);
      console.log(`  - Description: ${update.description.substring(0, 60)}...`);
      
      await db
        .update(blogPosts)
        .set({
          image: update.image,
          description: update.description
        })
        .where(eq(blogPosts.slug, update.slug));
      
      console.log(`✓ Updated successfully\n`);
    }
    
    console.log(`✅ Successfully updated ${updates.length} articles with unique images and descriptions!`);
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error updating articles:', error);
    await client.end();
    process.exit(1);
  }
}

updateArticles();
