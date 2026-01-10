import 'dotenv/config';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const articles = [
  {
    slug: "adventure-sports-destinations-2026",
    category: "adventure",
    status: "published",
    featured: true,
    title: "Ultimate Adventure Sports Destinations for Thrill Seekers in 2026",
    excerpt: "From paragliding in the Swiss Alps to surfing in Bali, discover the world's most exciting adventure sports destinations.",
    content: "## Introduction: The Call of Adventure\n2026 is the year for adrenaline junkies. With improved safety standards and eco-conscious operators, adventure sports have never been more accessible or sustainable.\n\n## Section 1: Paragliding Paradise – Interlaken, Switzerland\nThe Swiss Alps offer unparalleled views with thermals that keep you airborne for hours. Book with certified operators who use AI-monitored weather systems for maximum safety.\n\n## Section 2: Big Wave Surfing – Nazaré, Portugal\nHome to some of the world's largest waves (up to 100 feet), Nazaré has become the mecca for extreme surfers. The 2026 season runs October through March.\n\n## Section 3: Rock Climbing – Kalymnos, Greece\nWith over 3,000 routes, limestone cliffs, and year-round sunshine, Kalymnos is the perfect destination for climbers of all levels.\n\n## Section 4: Whitewater Rafting – Futaleufú River, Chile\nCrystal-clear turquoise waters and Class V rapids make this one of the most beautiful and challenging rafting experiences on Earth.\n\n## Conclusion: Push Your Limits\nAdventure sports aren't just about the thrill—they're about discovering what you're truly capable of.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "hidden-european-gems-2026",
    category: "destinations",
    status: "published",
    featured: true,
    title: "Hidden European Gems: 10 Underrated Cities to Visit in 2026",
    excerpt: "Skip the tourist crowds and discover Europe's best-kept secrets—from medieval towns to coastal paradises.",
    content: "## Introduction: Beyond the Beaten Path\nWhile Paris and Rome overflow with tourists, these hidden European cities offer authentic experiences without the crowds.\n\n## Section 1: Ljubljana, Slovenia\nThis fairytale capital combines Venetian architecture with Alpine charm. The car-free old town and dragon bridges make it perfect for romantic strolls.\n\n## Section 2: Porto, Portugal\nPortugal's second city offers port wine cellars, colorful tiled buildings, and the stunning Douro Valley—all at half the price of Lisbon.\n\n## Section 3: Tallinn, Estonia\nMedieval meets digital in this Baltic beauty. Explore the UNESCO Old Town by day and experience the world's most advanced e-government by night.\n\n## Section 4: Ghent, Belgium\nOften overshadowed by Bruges, Ghent offers medieval architecture without the tourist trap prices. The 2026 Light Festival is unmissable.\n\n## Section 5: Mostar, Bosnia and Herzegovina\nThe iconic Stari Most bridge and Ottoman architecture tell stories of resilience and beauty. Local cevapi is some of Europe's best street food.\n\n## Conclusion: Authentic Europe Awaits\nThese cities offer what mass tourism can't—genuine connections with locals and undiscovered treasures.",
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "sustainable-packing-guide-2026",
    category: "tips",
    status: "published",
    featured: true,
    title: "The Sustainable Traveler's Packing Guide for 2026",
    excerpt: "Essential eco-friendly gear and packing tips to minimize your environmental footprint while traveling.",
    content: "## Introduction: Pack Light, Travel Right\nSustainable travel starts before you leave home. The right gear choices can dramatically reduce your environmental impact.\n\n## Section 1: The Essentials\n* **Reusable Water Bottle with Filter:** The LifeStraw Go eliminates single-use plastic while keeping you safe from contaminated water.\n* **Bamboo Travel Cutlery Set:** Lightweight, biodegradable, and TSA-approved.\n* **Solar Power Bank:** Charge devices using renewable energy wherever you go.\n\n## Section 2: Clothing That Counts\nChoose merino wool and recycled synthetics that can be worn multiple times between washes. Brands like Patagonia and Tentree lead in sustainable fashion.\n\n## Section 3: Toiletries Without Waste\n* Solid shampoo and conditioner bars (no liquid restrictions!)\n* Reef-safe sunscreen in biodegradable packaging\n* Reusable silicone travel containers\n\n## Section 4: The Zero-Waste Kit\nCollapsible food containers, beeswax wraps, and a compact tote bag mean you can refuse plastic packaging anywhere.\n\n## Conclusion: Every Choice Matters\nSustainable packing isn't about perfection—it's about making better choices, one trip at a time.",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "budget-backpacking-southeast-asia-2026",
    category: "budget",
    status: "published",
    featured: true,
    title: "The Complete Budget Backpacking Guide to Southeast Asia 2026",
    excerpt: "Travel Southeast Asia for under $30 a day—accommodation, food, transport, and activities included.",
    content: "## Introduction: Paradise on a Shoestring\nSoutheast Asia remains the world's most budget-friendly region for backpackers. Here's how to maximize your adventure in 2026.\n\n## Section 1: The $30/Day Budget Breakdown\n* Accommodation: $8-12 (hostels/guesthouses)\n* Food: $8-10 (street food + local restaurants)\n* Transport: $4-6 (buses, trains, local transport)\n* Activities: $6-8 (temples, beaches, hiking)\n\n## Section 2: The Route\n**Month 1:** Bangkok → Chiang Mai → Luang Prabang → Hanoi → Halong Bay\n**Month 2:** Hoi An → Ho Chi Minh City → Phnom Penh → Siem Reap\n**Month 3:** Bangkok → Islands (Koh Tao, Koh Phangan) → Penang → Kuala Lumpur → Singapore\n\n## Section 3: Money-Saving Pro Tips\n* Use overnight buses/trains to save on accommodation\n* Eat where locals eat—if it's busy with locals, it's good and cheap\n* Book directly with hostels (skip booking platforms and their fees)\n* Learn basic phrases in each language—discounts often follow\n\n## Section 4: The Best Free Activities\nTemples in Thailand, sunrise at Angkor Wat (with $37 pass), beach hopping, hiking, and exploring night markets cost nothing extra.\n\n## Conclusion: Rich Experiences, Not Rich Budgets\nSoutheast Asia proves that the best travel experiences have nothing to do with how much you spend.",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "luxury-train-journeys-2026",
    category: "luxury",
    status: "published",
    featured: true,
    title: "The World's Most Spectacular Luxury Train Journeys in 2026",
    excerpt: "Experience the golden age of rail travel with these opulent train journeys across continents.",
    content: "## Introduction: Romance on Rails\nIn an age of instant travel, luxury trains offer something rare—the journey becomes the destination.\n\n## Section 1: The Venice Simplon-Orient-Express\nThe legendary route from London to Venice remains the pinnacle of luxury rail travel. Art Deco carriages, Michelin-starred dining, and cabins that feel like mobile palaces.\n\n**Price:** From $3,800 per person\n**Best Time:** April-October 2026\n\n## Section 2: The Maharajas' Express, India\nEight days across India's royal heritage: Delhi, Agra, Jaipur, Udaipur, and beyond. Includes private guided tours of palaces and UNESCO sites.\n\n**Price:** From $7,000 per person\n**Best Time:** October 2026 - April 2027\n\n## Section 3: The Ghan, Australia\nA 2,979 km journey from Darwin to Adelaide through the Australian Outback. Off-train excursions include helicopter flights over Katherine Gorge.\n\n**Price:** From $4,500 per person\n**Best Time:** May-September 2026\n\n## Section 4: Rocky Mountaineer, Canada\nGlass-dome coaches reveal the Canadian Rockies in all their glory. The route from Vancouver to Jasper is particularly stunning.\n\n**Price:** From $2,100 per person\n**Best Time:** April-October 2026\n\n## Conclusion: Slow Travel at Its Finest\nThese journeys prove that sometimes the old way is still the best way.",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "family-travel-tips-2026",
    category: "family",
    status: "published",
    featured: true,
    title: "Stress-Free Family Travel: Expert Tips for 2026 Adventures",
    excerpt: "Everything you need to know about traveling with kids—from packing hacks to destination recommendations.",
    content: "## Introduction: Making Family Memories\nTraveling with children doesn't have to be stressful. With the right preparation, it can be the most rewarding experience of your life.\n\n## Section 1: Age-Appropriate Destinations\n* **Toddlers (1-3):** Beach resorts with kids' clubs (Club Med, Disney properties)\n* **Young Kids (4-8):** Interactive destinations like Denmark (LEGOLAND), Orlando, Gold Coast\n* **Pre-teens (9-12):** Adventure destinations—Costa Rica, New Zealand, Iceland\n* **Teenagers (13+):** Cultural immersion—Japan, Peru, Morocco\n\n## Section 2: The Family Packing Strategy\n* Each child gets their own small backpack with entertainment and snacks\n* Pack extra clothes in carry-on (accidents happen)\n* Bring a first-aid kit with children's medications\n* Download movies/games before departure (don't rely on WiFi)\n\n## Section 3: Flight Survival Guide\n* Book morning flights (kids are fresh and airports are less crowded)\n* Explain security procedures beforehand to reduce anxiety\n* Pack one new toy/game per flight hour\n* Walk the aisles frequently to burn energy\n\n## Section 4: The One-Week Sample Itinerary (Costa Rica)\n* Days 1-3: Manuel Antonio (beaches + wildlife)\n* Days 4-5: Arenal (hot springs + volcano)\n* Days 6-7: Monteverde (cloud forest zip-lining)\n\n## Conclusion: The Gift of Perspective\nChildren who travel learn empathy, adaptability, and curiosity—lessons that last a lifetime.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "photography-composition-travel-2026",
    category: "photography",
    status: "published",
    featured: true,
    title: "Mastering Travel Photography Composition in 2026",
    excerpt: "Learn the essential composition techniques that will transform your travel photos from snapshots to stunning imagery.",
    content: "## Introduction: Beyond Point and Shoot\nGreat travel photography isn't about expensive gear—it's about seeing the world differently. These composition techniques will elevate your work instantly.\n\n## Section 1: The Rule of Thirds (and When to Break It)\nPlace your subject at intersection points rather than dead center. But in architecture and symmetry photography, centered compositions create powerful impact.\n\n## Section 2: Leading Lines\nUse roads, rivers, fences, or shadows to guide the viewer's eye through your image. The Eiffel Tower shot from Trocadéro demonstrates this perfectly.\n\n## Section 3: Frame Within a Frame\nArchways, windows, and doorways create natural frames that add depth and context. Morocco and India offer endless framing opportunities.\n\n## Section 4: The Golden Hour Religion\nShoot during the hour after sunrise and before sunset. The soft, warm light transforms ordinary scenes into magical moments.\n\n## Section 5: Human Element for Scale\nInclude people in landscape shots to show scale and add emotional connection. The lone hiker in Iceland's canyon tells a story.\n\n## Section 6: Foreground Interest\nAdd rocks, flowers, or architectural elements in the foreground to create three-dimensional depth in two-dimensional images.\n\n## Conclusion: Practice, Experiment, Evolve\nEvery professional was once a beginner. Take 1,000 photos, keep 10, and learn from the rest.",
    imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "japan-cherry-blossom-guide-2026",
    category: "destinations",
    status: "published",
    featured: true,
    title: "The Ultimate Japan Cherry Blossom Guide for 2026",
    excerpt: "Timing, locations, and insider tips for experiencing Japan's most magical season—sakura season.",
    content: "## Introduction: The Fleeting Beauty\nFor two weeks each spring, Japan transforms into a pink paradise. Here's how to experience sakura season like a local.\n\n## Section 1: The 2026 Forecast\nBased on Japan Meteorological Agency predictions:\n* **Kyushu/Shikoku:** March 20-30\n* **Osaka/Kyoto:** March 28 - April 8\n* **Tokyo/Yokohama:** March 25 - April 5\n* **Tohoku Region:** April 10-20\n* **Hokkaido:** April 25 - May 10\n\n## Section 2: The Best Viewing Spots\n**Tokyo:**\n* Shinjuku Gyoen (multiple species bloom at different times)\n* Meguro River (evening illuminations)\n* Chidorigafuchi (boat rentals under the blossoms)\n\n**Kyoto:**\n* Philosopher's Path (2km cherry-lined canal)\n* Maruyama Park (weeping cherry trees)\n* Arashiyama Bamboo Grove (cherry blossoms + bamboo)\n\n**Osaka:**\n* Osaka Castle Park (3,000+ trees)\n* Kema Sakuranomiya Park (riverside hanami)\n\n## Section 3: Hanami Etiquette\n* Arrive early to secure good spots (7-8 AM)\n* Bring a blue tarp (traditional picnic groundsheet)\n* Don't shake trees or pick blossoms\n* Take trash with you (leave no trace)\n\n## Section 4: Beyond the Crowds\nLesser-known spots: Takato Castle in Nagano (pink cherry varieties), Hirosaki Castle in Aomori (moats filled with fallen petals).\n\n## Conclusion: A Lesson in Impermanence\nSakura reminds us that beauty is temporary—and that's what makes it precious.",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "digital-nomad-tax-guide-2026",
    category: "remote-work",
    status: "published",
    featured: true,
    title: "The Digital Nomad Tax Guide: Navigating International Tax Laws in 2026",
    excerpt: "Essential tax strategies for remote workers living abroad—residency rules, tax treaties, and legal structures.",
    content: "## Introduction: The Invisible Obligation\nFreedom comes with responsibility. Understanding international tax law is crucial for sustainable nomadic living.\n\n## Section 1: Tax Residency Explained\nMost countries use the \"183-day rule\"—spend 183+ days there, you're a tax resident. Strategic planning means staying mobile enough to avoid unintended residency.\n\n## Section 2: The Tax-Friendly Countries\n* **Portugal:** Non-Habitual Resident (NHR) program offers 10 years of reduced tax rates\n* **Georgia:** Territorial tax system (foreign income not taxed)\n* **Paraguay:** Territorial system + low cost of living\n* **Malaysia:** MM2H visa with favorable tax treatment\n* **UAE:** Zero income tax for residents\n\n## Section 3: US Citizens Abroad\n* Foreign Earned Income Exclusion (FEIE): Exclude up to $126,500 in 2026\n* Foreign Housing Exclusion: Additional deductions for qualified expenses\n* Still must file even if earning below threshold\n* Consider the Physical Presence Test vs. Bona Fide Residence\n\n## Section 4: Legal Business Structures\n* Estonian e-Residency for EU business formation\n* Wyoming/Delaware LLCs for US-based income\n* Hong Kong company for Asia-Pacific operations\n* Always consult with international tax attorney\n\n## Section 5: Common Mistakes to Avoid\n* Not tracking days spent in each country\n* Failing to file FBAR (Foreign Bank Account Report)\n* Assuming tourist visas allow remote work\n* Not maintaining proper documentation\n\n## Conclusion: Compliance = Freedom\nProper tax planning isn't optional—it's the foundation of a sustainable nomadic lifestyle.",
    imageUrl: "https://images.unsplash.com/photo-1554224311-beee2f490c20",
    author: "PlanMyNextTravel Team"
  },
  {
    slug: "wildlife-safari-guide-2026",
    category: "adventure",
    status: "published",
    featured: true,
    title: "The Ultimate Wildlife Safari Guide: Africa's Best Parks in 2026",
    excerpt: "From the Serengeti migration to mountain gorilla trekking—plan your dream African safari.",
    content: "## Introduction: The Call of the Wild\nAn African safari isn't a vacation—it's a pilgrimage. Here's how to make it unforgettable.\n\n## Section 1: The Big Five Destinations\n**Serengeti National Park, Tanzania**\n* Great Migration (July-September): 2 million wildebeest crossing crocodile-infested rivers\n* Hot air balloon safaris at dawn ($599)\n* Mobile tented camps follow the migration\n\n**Kruger National Park, South Africa**\n* Most accessible big game reserve\n* Self-drive option for budget travelers\n* Best for first-time safari-goers\n\n**Maasai Mara, Kenya**\n* River crossings (August-October)\n* Maasai village cultural experiences\n* Premium luxury lodges with infinity pools overlooking savanna\n\n**Okavango Delta, Botswana**\n* Water-based safaris in traditional mokoro canoes\n* Highest concentration of elephants in Africa\n* Ultra-luxury camps (Chief's Camp, Mombo)\n\n**South Luangwa, Zambia**\n* Walking safaris with armed guides\n* Night drives (leopards, civet cats, honey badgers)\n* The birthplace of the walking safari concept\n\n## Section 2: Gorilla Trekking\n**Rwanda vs. Uganda:**\n* Rwanda: $1,500 permit, easier terrain, luxury lodges\n* Uganda: $800 permit, longer treks, more adventurous\n\nBook permits 6-12 months in advance. Maximum 1 hour with gorillas. Life-changing.\n\n## Section 3: Safari Packing Essentials\n* Neutral-colored clothing (khaki, olive, beige—no bright colors)\n* Quality binoculars (Nikon Monarch or Zeiss)\n* Camera with telephoto lens (70-300mm minimum)\n* Insect repellent with DEET\n* Antimalarial medication (consult travel doctor)\n\n## Section 4: Best Time to Visit\n* East Africa: June-October (dry season, migration)\n* Southern Africa: May-September (winter, best wildlife viewing)\n* Rwanda/Uganda gorillas: Year-round (dry seasons June-September, December-February preferred)\n\n## Conclusion: Conservation Through Tourism\nYour safari dollars fund anti-poaching units and community development. You're not just a tourist—you're a conservationist.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    author: "PlanMyNextTravel Team"
  }
];

async function insertArticles() {
  const connectionString = process.env.DATABASE_URL!;
  
  // Parse and rebuild connection string to ensure proper SSL
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

    for (const article of articles) {
      try {
        console.log(`Inserting: ${article.title}`);
        
        await client.query(
          `INSERT INTO blog_posts (slug, category, status, title, description, content, image, author, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
           ON CONFLICT (slug) DO NOTHING`,
          [article.slug, article.category, article.status, article.title, article.excerpt, article.content, article.imageUrl, article.author]
        );
        
        console.log(`✓ Inserted: ${article.slug}\n`);
        successCount++;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (err) {
        console.error(`✗ Failed to insert ${article.slug}:`, err);
        failCount++;
      }
    }

    console.log(`\n========================================`);
    console.log(`Import complete!`);
    console.log(`Success: ${successCount}/${articles.length}`);
    console.log(`Failed: ${failCount}/${articles.length}`);
    console.log(`========================================\n`);

  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await client.end();
    console.log('✓ Database connection closed');
  }
}

insertArticles();
