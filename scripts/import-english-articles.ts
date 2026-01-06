import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { blogPosts } from '../drizzle/schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { ssl: 'require' });
const db = drizzle(client);

const articles = [
  {
    slug: "glowmad-wellness-travel-2026",
    category: "wellness",
    status: "published" as const,
    featured: true,
    title: "The Rise of the 'Glowmad': How to Travel for Vitality, Not Exhaustion",
    excerpt: "A deep dive into the 2026 trend of health-first travel, featuring biohacking retreats and sleep tourism.",
    content: `## Introduction: Beyond the Burnout
In 2026, travel is no longer an escape from life; it is a way to optimize it. Enter the 'Glowmad'—travelers who prioritize circadian rhythm alignment, nutrient density, and 'Forest Bathing' over sightseeing marathons.

## Section 1: The Biohacking Retreat
From the Alps to the Himalayas, resorts now offer 'Biological Age' testing upon check-in. In 2026, the highlight is 'Cold Plunge' therapy combined with infrared saunas to reset the nervous system.

## Section 2: Sleep Tourism
Hotels like the 'Rest-Optimized' chains in London and NYC now feature AI-driven beds that adjust temperature based on your heart rate.

## Conclusion: The New Souvenir
You shouldn't need a vacation from your vacation. The new goal is to return home with a 'glow' that lasts for months.`,
    metaTitle: "The Rise of the 'Glowmad': How to Travel for Vitality, Not Exhaustion",
    metaDescription: "A deep dive into the 2026 trend of health-first travel, featuring biohacking retreats and sleep tourism.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    tags: ["Wellness", "Glowmads", "Health", "2026 Trends"],
    readTime: "19 min"
  },
  {
    slug: "travel-photography-gear-guide-2026",
    category: "tools",
    status: "published" as const,
    featured: true,
    title: "Content Creator Gear 2026: The Best Cameras for High-End Vlogging",
    excerpt: "A professional breakdown of the Sony A7R V, the DJI Mini 4 Pro, and the rise of AI-native editing.",
    content: `## The Visual Standard of 2026
High-quality video is the currency of 2026 travel. To stand out, you need gear that handles 8K resolution and offers AI-driven subject tracking.

## Section 1: The Mirrorless Kings
* **Sony A7R V:** The gold standard for hybrid shooters. Its AI-autofocus can track birds, insects, and even the eyes of a moving leopard on safari.
* **Fujifilm X-T50:** The best 'Aesthetic' choice for those who want that vintage film look without post-processing.

## Section 2: Aerial Mastery – DJI Mini 4 Pro
In 2026, drone laws are stricter. The Mini 4 Pro remains the 'Holy Grail' because its weight (under 249g) exempts it from many registration requirements while still shooting 4K/60fps vertical video for social media.

## Conclusion: Skills Over Sensors
Gear gets you the shot, but storytelling keeps the audience. Use these tools to capture the 'why' behind your journey.`,
    metaTitle: "Content Creator Gear 2026: The Best Cameras for High-End Vlogging",
    metaDescription: "A professional breakdown of the Sony A7R V, the DJI Mini 4 Pro, and the rise of AI-native editing.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    tags: ["Photography", "Gear", "Tech", "Vlogging"],
    readTime: "21 min"
  },
  {
    slug: "uzbekistan-silk-road-guide-2026",
    category: "destinations",
    status: "published" as const,
    featured: true,
    title: "The 2026 Silk Road: Uzbekistan's Modern Renaissance",
    excerpt: "Explore the ancient architecture of Samarkand and the high-speed rail connecting the desert oases.",
    content: `## The New Frontier of Central Asia
Uzbekistan has officially 'arrived' in 2026. With visa-free entry for over 90 nationalities, the 'Jewel of the Silk Road' is the world's most exciting emerging destination.

## Section 1: The Afrosiyob High-Speed Train
Travel between Tashkent, Samarkand, and Bukhara at 250km/h. In 2026, it is recommended to book 45 days in advance as this has become the most popular rail journey in Asia.

## Section 2: Samarkand – The Registan
Witness the world's most stunning Islamic architecture. Pro-Tip: Visit the Registan at 9:00 PM for the 2026 'Light and Sound' show that tells the story of Tamerlane in 4D.

## Conclusion: Authenticity Preserved
Despite the growth, the tea culture and the warmth of the Uzbek people remain untouched.`,
    metaTitle: "The 2026 Silk Road: Uzbekistan's Modern Renaissance",
    metaDescription: "Explore the ancient architecture of Samarkand and the high-speed rail connecting the desert oases.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4",
    tags: ["Uzbekistan", "Adventure", "Culture", "Silk Road"],
    readTime: "18 min"
  },
  {
    slug: "eco-luxury-resorts-2026",
    category: "destinations",
    status: "published" as const,
    featured: true,
    title: "Eco-Luxury: The World's Best Regenerative Resorts",
    excerpt: "A guide to hotels that don't just 'do no harm' but actively improve the local environment.",
    content: `## Beyond Sustainability
In 2026, 'Sustainability' is the bare minimum. The elite traveler now seeks 'Regenerative' stays—resorts that use your guest fees to fund coral restoration or reforestation.

## Section 1: The Pioneers
* **Soneva Jani (Maldives):** 100% solar-powered with an on-site 'Waste-to-Wealth' center.
* **Singita (South Africa):** A leader in wildlife conservation where every guest contributes to anti-poaching units.

## Section 2: How to Spot 'Greenwashing'
Look for 'B-Corp' certification or the 'EarthCheck' platinum seal. In 2026, transparent data on water-usage-per-guest is the hallmark of a truly green resort.

## Conclusion: Luxury with a Conscience
You can have the 1,000-thread-count sheets and save the planet at the same time.`,
    metaTitle: "Eco-Luxury: The World's Best Regenerative Resorts",
    metaDescription: "A guide to hotels that don't just 'do no harm' but actively improve the local environment.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    tags: ["Luxury", "Sustainability", "Eco-Travel", "Hotels"],
    readTime: "17 min"
  },
  {
    slug: "set-jetting-travel-locations",
    category: "culture",
    status: "published" as const,
    featured: false,
    title: "Mastering 'Set-Jetting': Visiting the Real Locations of 2026's Biggest Shows",
    excerpt: "From the White Lotus to House of the Dragon: How to visit the real-world filming locations.",
    content: `## Life Mimics Art
'Set-Jetting' is the trend of 2026. Fans are no longer just watching their favorite shows; they are booking flights to live inside them.

## Section 1: The White Lotus Effect
Following the success of Season 3 in Thailand, locations like Koh Samui and Phuket have seen a 400% increase in bookings. Visit the 'Taling Ngam' temple for the most iconic views from the show.

## Section 2: Historical Epics
Explore the Basque Country in Spain to see the real 'Dragonstone' (Gaztelugatxe) from House of the Dragon.

## Conclusion: The Screen as a Map
When a story moves us, we want to walk the ground where it happened. Just remember: respect the locals who live there year-round.`,
    metaTitle: "Mastering 'Set-Jetting': Visiting the Real Locations of 2026's Biggest Shows",
    metaDescription: "From the White Lotus to House of the Dragon: How to visit the real-world filming locations.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    tags: ["Set-Jetting", "Movies", "Pop Culture", "TV Locations"],
    readTime: "16 min"
  },
  {
    slug: "dark-sky-tourism-stargazing-guide",
    category: "guides",
    status: "published" as const,
    featured: false,
    title: "The 2026 Guide to 'Dark Sky' Tourism: Where to Find the Stars",
    excerpt: "A technical guide to finding the world's last remaining truly dark places for astrophotography.",
    content: `## The Disappearing Dark
With 80% of the world living under light pollution, 'Darkness' is the new luxury. 2026 is a 'Solar Maximum' year, making it the best time in a decade for aurora and star viewing.

## Section 1: International Dark Sky Parks
* **Aoraki Mackenzie (New Zealand):** The clearest skies in the Southern Hemisphere.
* **Northumberland (UK):** Europe's largest protected dark sky area.

## Section 2: Astrophotography Gear
You need a wide-angle lens with an aperture of f/2.8 or wider. In 2026, the 'Star-Tracker' mounts have become small enough to fit in a pocket, allowing for 5-minute exposures without star trails.

## Conclusion: Looking Up
Stargazing reminds us of our place in the universe. It is the ultimate slow-travel activity.`,
    metaTitle: "The 2026 Guide to 'Dark Sky' Tourism: Where to Find the Stars",
    metaDescription: "A technical guide to finding the world's last remaining truly dark places for astrophotography.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4b47a",
    tags: ["Stargazing", "Astronomy", "Nature", "Photography"],
    readTime: "15 min"
  },
  {
    slug: "co-living-digital-nomad-2026",
    category: "tips",
    status: "published" as const,
    featured: false,
    title: "The Remote Work Oasis: A Guide to the Best 2026 Co-Living Spaces",
    excerpt: "Reviewing the 'Selina' evolution, 'Outsite', and the new boutique co-living hubs in Madeira and Bansko.",
    content: `## The Evolution of the Nomad Hub
Co-living has moved past 'bunk beds for adults.' In 2026, it is about 'Curated Communities' where professionals live and work together in high-design villas.

## Section 1: The Top Hubs
* **Madeira (Portugal):** The world's first 'Digital Nomad Village' continues to thrive with fiber-optic internet in every mountain cottage.
* **Bansko (Bulgaria):** The budget capital of Europe. Extremely low cost of living with a world-class skiing community.

## Section 2: What to Look For
Check for ergonomic chairs, silent zones, and community managers who organize weekly 'Masterminds.'

## Conclusion: Working Better, Not Harder
Co-living solves the #1 problem for nomads: loneliness. In these spaces, your neighbors are your business partners.`,
    metaTitle: "The Remote Work Oasis: A Guide to the Best 2026 Co-Living Spaces",
    metaDescription: "Reviewing the 'Selina' evolution, 'Outsite', and the new boutique co-living hubs in Madeira and Bansko.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    tags: ["Co-living", "Digital Nomad", "Remote Work", "Community"],
    readTime: "18 min"
  },
  {
    slug: "solo-female-travel-2026-manual",
    category: "tips",
    status: "published" as const,
    featured: true,
    title: "The 2026 Solo Female Travel Manual: Safety, Socials, and Success",
    excerpt: "An empowering and tactical guide for women traveling the world alone in 2026.",
    content: `## The Autonomy Revolution
More women are traveling solo in 2026 than ever before. This manual moves beyond 'be careful' to 'be confident.'

## Section 1: Safety Tech for 2026
* **Personal Safety Apps:** Apps like 'Noonlight' provide a virtual escort that alerts authorities if you don't check in.
* **Door Security:** The 'Portable Door Lock' is a $15 tool that is non-negotiable for solo hotel stays.

## Section 2: The Best Solo Cities
Taipei, Reykjavik, and Kyoto rank as the top three for 2026 due to low crime rates and high respect for solo diners.

## Conclusion: The World is Yours
Solo travel is the ultimate act of self-love. It proves that you are enough.`,
    metaTitle: "The 2026 Solo Female Travel Manual: Safety, Socials, and Success",
    metaDescription: "An empowering and tactical guide for women traveling the world alone in 2026.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1527631746610-bca00a040d60",
    tags: ["Solo Travel", "Women", "Safety", "Empowerment"],
    readTime: "20 min"
  },
  {
    slug: "georgia-country-food-guide-2026",
    category: "food",
    status: "published" as const,
    featured: true,
    title: "The 2026 Foodie Frontier: Why Georgia (the Country) is the Next Big Thing",
    excerpt: "Explore the 8,000-year-old wine tradition and the cheese-filled world of Khachapuri.",
    content: `## The Kitchen of the Caucasus
Georgia is the best-kept culinary secret in the world. In 2026, the capital, Tbilisi, has become the top destination for 'Heritage Foodies.'

## Section 1: The Qvevri Wine Tradition
UNESCO recognizes Georgia as the birthplace of wine. They ferment grapes in clay jars (Qvevri) buried underground. The result is an 'Amber Wine' that tastes like history.

## Section 2: The Supra (The Feast)
A Georgian feast is led by a 'Tamada' (Toastmaster). Expect endless plates of Khinkali (soup dumplings) and Khachapuri (cheese bread).

## Conclusion: Gastronomic Hospitality
In Georgia, a guest is a 'Gift from God.' You will never leave a table hungry.`,
    metaTitle: "The 2026 Foodie Frontier: Why Georgia (the Country) is the Next Big Thing",
    metaDescription: "Explore the 8,000-year-old wine tradition and the cheese-filled world of Khachapuri.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1565967511849-75a6012f3055",
    tags: ["Georgia", "Food", "Wine", "Culture", "Tbilisi"],
    readTime: "19 min"
  },
  {
    slug: "travel-gear-purge-2026",
    category: "tips",
    status: "published" as const,
    featured: false,
    title: "The 2026 Gear Purge: 10 Items You Should Stop Carrying Now",
    excerpt: "Lighten your load by ditching the outdated tech and 'just in case' items of the past decade.",
    content: `## The Weight of the Past
Most travelers carry 30% more than they need. In 2026, with the 'Weight-Based' fees on many airlines, every gram counts.

## Section 1: The 'Ditch' List
* **Paper Guidebooks:** Your AI agent and offline maps are more current and weigh nothing.
* **Dedicated Cameras (for casuals):** If you aren't a pro, the 2026 iPhone/Samsung sensors now outperform mid-range point-and-shoots.
* **Heavy Adapters:** Switch to a single 'Universal GaN Charger' that can power your laptop and phone simultaneously.

## Section 2: The 'Multi-Use' Rule
If an item doesn't serve at least two purposes, it doesn't belong in your bag.

## Conclusion: Travel Light, Travel Far
The lighter your bag, the more open you are to the unexpected.`,
    metaTitle: "The 2026 Gear Purge: 10 Items You Should Stop Carrying Now",
    metaDescription: "Lighten your load by ditching the outdated tech and 'just in case' items of the past decade.",
    locale: "en",
    imageUrl: "https://images.unsplash.com/photo-1553531384-cc64ac80f931",
    tags: ["Packing", "Minimalism", "Gear", "Travel Hacks"],
    readTime: "14 min"
  }
];

async function importArticles() {
  try {
    console.log('Starting bulk article import...');
    
    for (const article of articles) {
      console.log(`Importing: ${article.title}`);
      
      await db.insert(blogPosts).values({
        slug: article.slug,
        category: article.category,
        status: article.status,
        title: article.title,
        description: article.excerpt,
        content: article.content,
        image: article.imageUrl,
        author: 'PlanMyNextTravel Team'
      });
      
      console.log(`✓ Imported: ${article.slug}`);
    }
    
    console.log(`\n✅ Successfully imported ${articles.length} articles!`);
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error importing articles:', error);
    await client.end();
    process.exit(1);
  }
}

importArticles();
