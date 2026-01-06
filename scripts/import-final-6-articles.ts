import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { blogPosts } from '../drizzle/schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { ssl: 'require' });
const db = drizzle(client);

const articles = [
  {
    slug: "travel-insurance-guide-2026",
    category: "tips",
    status: "published" as const,
    title: "Travel Insurance 2026: What You Actually Need vs What They Sell You",
    description: "Cut through insurance jargon with our expert breakdown of essential coverage including medical evacuation, trip cancellation, and adventure activity riders that protect what matters most.",
    content: `## Introduction

Travel insurance is the least exciting part of trip planning—until you need it. In 2026, the industry is worth $27 billion, filled with confusing policies, hidden exclusions, and aggressive upselling. This guide helps you buy smart coverage without overpaying.

## Key Coverage Types

Medical emergency, evacuation, trip cancellation, baggage loss, and adventure activity riders. Understanding limits, exclusions, and when you're actually covered versus marketing promises.

## Best Providers 2026

SafetyWing for nomads, World Nomads for adventure, Allianz for comprehensive, IMG for long-term, and credit card benefits analysis.

## Common Exclusions

Pre-existing conditions, extreme sports without riders, alcohol-related incidents, traveling against government warnings, and unattended baggage claims.

## Claims Process Reality

Documentation requirements, average payout times, denial reasons, and how to appeal successfully with evidence and persistence.`,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    tags: ["Insurance", "Travel Tips", "Safety", "Planning"],
    author: "Laura Bennett",
    readTime: "18 min",
    locale: "en"
  },
  {
    slug: "cruise-ship-alternatives-2026",
    category: "destinations",
    status: "published" as const,
    title: "Cruise Ship Alternatives: Small-Ship Adventures for 2026",
    description: "Discover intimate small-ship cruising in Antarctica, Galapagos, and Norwegian fjords that offer authentic experiences without the environmental impact and crowds of mega-cruise ships.",
    content: `## Introduction

Mega cruise ships hold 6,000+ passengers, emit massive pollution, and overwhelm ports. Small-ship cruises (12-200 passengers) offer premium experiences with lower environmental impact and authentic access to remote destinations.

## Antarctica Expeditions

Ice-class vessels, zodiac landings, expert naturalists, and responsible wildlife viewing protocols that large ships can't offer.

## Galapagos Small Ships

Naturalist-guided island hopping, snorkeling with sea lions, and conservation-focused itineraries supporting local research.

## Norwegian Fjords

Historic coastal routes, village stops impossible for large ships, and sustainable electric-hybrid vessels.

## Cost Reality

Premium pricing ($500-1,500/day) but includes everything, intimate access, and environmental responsibility versus mega-ship "deals."`,
    image: "https://images.unsplash.com/photo-1563299796-17596e2c1c0a?w=1200&q=80",
    tags: ["Cruises", "Small Ships", "Antarctica", "Eco Travel"],
    author: "Christopher Wade",
    readTime: "20 min",
    locale: "en"
  },
  {
    slug: "city-break-guide-european-capitals",
    category: "guides",
    status: "published" as const,
    title: "European City Breaks: 72-Hour Perfect Itineraries for 15 Capitals",
    description: "Master weekend escapes to London, Paris, Berlin, and beyond with our optimized 3-day itineraries covering must-see sights, hidden gems, local food scenes, and practical transport tips.",
    content: `## Introduction

European cities are perfect for long weekends. With budget airlines, high-speed rail, and compact city centers, you can experience world-class culture, cuisine, and history in just 72 hours.

## London 72 Hours

Day 1: British Museum, Covent Garden, West End show. Day 2: Tower of London, Borough Market, South Bank. Day 3: Notting Hill, Hyde Park, Harrods.

## Paris 72 Hours

Day 1: Louvre, Tuileries, Seine cruise. Day 2: Eiffel Tower, Latin Quarter, Montmartre. Day 3: Versailles day trip, Le Marais.

## Berlin 72 Hours

Day 1: Brandenburg Gate, Museum Island, Reichstag. Day 2: East Side Gallery, Checkpoint Charlie, Kreuzberg nightlife. Day 3: Charlottenburg Palace, flea markets.

## Transport Tips

Oyster cards, Paris Museum Pass, Berlin WelcomeCard, and walking vs metro strategies for each city.`,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    tags: ["City Breaks", "Europe", "Weekend Trips", "Itineraries"],
    author: "Sophie Anderson",
    readTime: "25 min",
    locale: "en"
  },
  {
    slug: "travel-apps-essential-2026",
    category: "tools",
    status: "published" as const,
    title: "Essential Travel Apps 2026: The Only 15 You Actually Need",
    description: "Streamline your travel tech stack with our curated list of must-have apps for navigation, translation, accommodation, flights, and local experiences that work offline and save money.",
    content: `## Introduction

The average traveler has 30+ travel apps but uses 5 regularly. This guide cuts through app bloat to identify the essential tools that actually enhance travel experiences in 2026.

## Navigation & Maps

Google Maps offline, Maps.me for hiking, Citymapper for urban transit, and Waze for driving with real-time updates.

## Translation & Communication

Google Translate camera mode, iTranslate for offline conversations, WhatsApp for international messaging, and Duolingo for basic phrases.

## Booking & Deals

Hopper for flight predictions, Booking.com with Genius rewards, Airbnb for unique stays, and Hostelworld for budget options.

## Money & Payments

Wise for currency exchange, XE Currency for rates, Revolut for spending abroad, and Trail Wallet for budget tracking.

## Safety & Emergencies

TripWhistle for local emergency numbers, bSafe for personal safety alerts, and Travel Risk Map for destination safety data.`,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    tags: ["Apps", "Technology", "Travel Tools", "Mobile"],
    author: "Alex Rivera",
    readTime: "15 min",
    locale: "en"
  },
  {
    slug: "road-trip-usa-national-parks",
    category: "guides",
    status: "published" as const,
    title: "Ultimate USA National Parks Road Trip: 30-Day Western Loop",
    description: "Plan the perfect American road trip through Yellowstone, Yosemite, Grand Canyon, and 12 more iconic national parks with detailed routing, camping spots, and seasonal considerations.",
    content: `## Introduction

America's national parks protect 85 million acres of wilderness. The Western Loop connects 15 parks across 6,000 miles of jaw-dropping scenery, best experienced over 30 days with flexibility built in.

## Route Overview

Start Las Vegas, loop through Utah's Mighty 5, Colorado Rockies, Wyoming geothermal wonders, Montana wilderness, Pacific Northwest rainforests, California deserts, and back.

## Week 1: Desert Southwest

Zion, Bryce Canyon, Arches, Canyonlands, Monument Valley. Red rock formations, slot canyons, and iconic arches.

## Week 2: Rocky Mountain High

Mesa Verde, Great Sand Dunes, Rocky Mountain, Grand Teton. Alpine lakes, 14,000-ft peaks, and wildlife spotting.

## Week 3: Geothermal & Glaciers

Yellowstone, Glacier National Park. Geysers, hot springs, grizzly bears, and Going-to-the-Sun Road.

## Week 4: Pacific & Return

North Cascades, Olympic, Crater Lake, Yosemite, Death Valley, Grand Canyon. Rainforests to deserts, waterfalls to canyons.

## Camping vs Hotels

Campground reservations (Recreation.gov), backcountry permits, and budget hotels in gateway towns when you need showers and WiFi.`,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    tags: ["USA", "Road Trip", "National Parks", "Camping"],
    author: "Jake Morrison",
    readTime: "28 min",
    locale: "en"
  },
  {
    slug: "travel-scams-avoid-2026",
    category: "tips",
    status: "published" as const,
    title: "Travel Scams 2026: How to Spot and Avoid the 20 Most Common Cons",
    description: "Protect yourself from taxi scams, fake police, overpriced tours, and accommodation frauds with our detailed breakdown of common travel scams and proven avoidance strategies.",
    content: `## Introduction

Travel scams cost tourists $10 billion annually. In 2026, scammers use sophisticated tactics including fake booking sites, AI-powered phishing, and coordinated street cons. Knowledge is your best defense.

## Airport & Transport Scams

Fake taxis, rigged meters, wrong change, and baggage handlers demanding tips. How to identify official vehicles and pre-book rides.

## Accommodation Frauds

Fake Airbnb listings, bait-and-switch hotels, hidden fees, and payment scams. Verification tactics and booking protection.

## Tourist Attraction Cons

Skip-the-line ticket scalpers, fake tour guides, overpriced photos, and free bracelet scams. Official ticket channels and refusal strategies.

## Restaurant & Shopping Tricks

Menu pricing scams, counterfeit goods, distraction theft, and ATM skimming. Bill verification and safe payment methods.

## Police & Official Impersonators

Fake police fines, document checks leading to theft, and border crossing bribes. Verification procedures and embassy contacts.

## Digital Scams

Phishing booking emails, fake WiFi networks, credit card skimming, and SIM swap attacks. Secure browsing and payment protection.`,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    tags: ["Safety", "Scams", "Travel Tips", "Security"],
    author: "Nina Patel",
    readTime: "19 min",
    locale: "en"
  }
];

async function importArticles() {
  try {
    console.log('Importing final 6 articles (5-10 of 10)...\n');
    
    for (const article of articles) {
      console.log(`Importing: ${article.title}`);
      
      await db.insert(blogPosts).values({
        slug: article.slug,
        category: article.category,
        status: article.status,
        title: article.title,
        description: article.description,
        content: article.content,
        image: article.image,
        locale: article.locale,
        tags: article.tags,
        author: article.author,
        readTime: article.readTime
      });
      
      console.log(`✓ Imported: ${article.slug}\n`);
    }
    
    console.log(`✅ Successfully imported all ${articles.length} final articles!`);
    console.log(`🎉 Total: 10 new articles added to your blog!`);
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Error importing articles:', error);
    await client.end();
    process.exit(1);
  }
}

importArticles();
