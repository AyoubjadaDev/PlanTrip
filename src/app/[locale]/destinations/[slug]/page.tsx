import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FiMapPin, FiCalendar, FiClock, FiArrowLeft, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { destinationDetailsFr } from '@/data/destination-details-fr';
import { destinationDetailsAr } from '@/data/destination-details-ar';

// Function to get localized destination data
function getLocalizedDestinations(locale: string) {
  switch (locale) {
    case 'fr':
      return destinationDetailsFr;
    case 'ar':
      return destinationDetailsAr;
    default:
      return destinations; // English fallback
  }
}

// Sample destination data - matches the listing page (English version)
const destinations = [
  {
    id: 1,
    slug: 'bali-5-day-itinerary',
    title: '5 Days in Bali: Perfect Itinerary',
    destination: 'Bali, Indonesia',
    days: 5,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400',
    excerpt: 'Discover the magic of Bali with this perfect 5-day itinerary covering temples, beaches, rice terraces, and cultural experiences.',
    category: 'Beach & Culture',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&h=300',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300',
      'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=400&h=300',
    ],
    content: {
      overview: 'Bali is a tropical paradise that offers the perfect blend of culture, nature, and relaxation. This 5-day itinerary takes you through the island\'s most iconic destinations, from ancient temples to pristine beaches, lush rice terraces, and vibrant markets.',
      bestTime: 'April to October (dry season)',
      budget: '$50-100 per day',
      highlights: [
        'Visit the sacred Uluwatu Temple',
        'Explore the Tegalalang Rice Terraces',
        'Relax on beautiful Seminyak Beach',
        'Experience traditional Balinese dance',
        'Visit the Monkey Forest in Ubud',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & South Bali',
          activities: [
            'Arrive at Ngurah Rai International Airport',
            'Check into hotel in Seminyak',
            'Lunch at beachfront restaurant',
            'Explore Seminyak Beach and shops',
            'Sunset at Tanah Lot Temple',
            'Dinner at local warung',
          ],
          tips: 'Book accommodation near Seminyak for easy beach access. Arrange airport transfer in advance.',
          bookingLinks: [
            { name: 'Airport Transfer', url: 'https://www.klook.com/en-US/search/result/?query=Bali%20Airport%20Transfer&aid=12345', partner: 'klook' },
            { name: 'Tanah Lot Sunset Tour', url: 'https://www.klook.com/en-US/search/result/?query=Tanah%20Lot%20Sunset%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 2,
          title: 'Ubud Cultural Experience',
          activities: [
            'Drive to Ubud (1.5 hours)',
            'Visit Tegalalang Rice Terraces',
            'Lunch with rice terrace views',
            'Sacred Monkey Forest Sanctuary',
            'Ubud Palace and Art Market',
            'Traditional Balinese dance performance',
          ],
          tips: 'Wear comfortable shoes for walking. Bring small bills for offerings and tips.',
          bookingLinks: [
            { name: 'Ubud Full-Day Tour', url: 'https://www.klook.com/en-US/search/result/?query=Ubud%20Rice%20Terraces%20Monkey%20Forest%20Tour&aid=12345', partner: 'klook' },
            { name: 'Balinese Dance Show', url: 'https://www.klook.com/en-US/search/result/?query=Ubud%20Balinese%20Dance%20Show&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 3,
          title: 'Temples & Waterfalls',
          activities: [
            'Early visit to Tirta Empul Temple',
            'Purification ritual (optional)',
            'Tegenungan Waterfall',
            'Lunch at local restaurant',
            'Visit Goa Gajah (Elephant Cave)',
            'Return to Ubud for dinner',
          ],
          tips: 'Wear sarong for temple visits (usually provided). Bring swimwear for waterfall.',
          bookingLinks: [
            { name: 'Tirta Empul Temple Tour', url: 'https://www.klook.com/en-US/search/result/?query=Tirta%20Empul%20Temple%20Tegenungan%20Waterfall&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 4,
          title: 'Beach Day & Water Sports',
          activities: [
            'Drive to Nusa Dua',
            'Water sports at Tanjung Benoa',
            'Lunch at beachfront café',
            'Relax at pristine beach',
            'Visit Uluwatu Temple',
            'Kecak Fire Dance at sunset',
          ],
          tips: 'Book water sports in advance for better rates. Arrive at Uluwatu early for good seats.',
          bookingLinks: [
            { name: 'Water Sports Package', url: 'https://www.klook.com/en-US/search/result/?query=Bali%20Water%20Sports%20Nusa%20Dua&aid=12345', partner: 'klook' },
            { name: 'Uluwatu Temple & Kecak Dance', url: 'https://www.klook.com/en-US/search/result/?query=Uluwatu%20Temple%20Kecak%20Fire%20Dance&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 5,
          title: 'Shopping & Departure',
          activities: [
            'Breakfast at hotel',
            'Last-minute shopping in Seminyak',
            'Visit art galleries',
            'Spa treatment or beach relaxation',
            'Airport transfer',
          ],
          tips: 'Leave buffer time for traffic to airport. Buy souvenirs at local markets for best prices.',
          bookingLinks: [
            { name: 'Balinese Spa Treatment', url: 'https://www.klook.com/en-US/search/result/?query=Bali%20Traditional%20Spa%20Massage&aid=12345', partner: 'klook' },
          ],
        },
      ],
      accommodation: [
        {
          name: 'Seminyak',
          description: 'Beach resorts and boutique hotels',
          priceRange: '$50-200/night',
        },
        {
          name: 'Ubud',
          description: 'Cultural heart with jungle resorts',
          priceRange: '$40-150/night',
        },
      ],
      foodRecommendations: [
        'Nasi Goreng (fried rice)',
        'Babi Guling (suckling pig)',
        'Satay skewers',
        'Fresh tropical fruits',
        'Traditional Balinese coffee',
      ],
      transportation: 'Hire a private driver for flexibility ($40-50/day) or use Grab/Gojek apps for shorter trips.',
      packingList: [
        'Lightweight clothing',
        'Sarong for temples',
        'Sunscreen and hat',
        'Insect repellent',
        'Comfortable walking shoes',
        'Swimwear',
      ],
    },
  },
  {
    id: 2,
    slug: 'paris-7-day-itinerary',
    title: '7 Days in Paris: Complete Guide',
    destination: 'Paris, France',
    days: 7,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400',
    excerpt: 'Explore the City of Light with this comprehensive week-long itinerary featuring iconic landmarks, hidden gems, and local experiences.',
    category: 'City & Culture',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300',
    ],
    content: {
      overview: 'Paris, the City of Light, is a dream destination that combines world-class art, stunning architecture, exquisite cuisine, and timeless romance. This 7-day itinerary covers all the must-see attractions while leaving time to discover hidden gems and experience local Parisian life.',
      bestTime: 'April-June or September-October',
      budget: '$100-200 per day',
      highlights: [
        'Eiffel Tower and Champ de Mars',
        'Louvre Museum',
        'Notre-Dame and Sainte-Chapelle',
        'Montmartre and Sacré-Cœur',
        'Versailles Palace',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Eiffel Tower',
          activities: [
            'Arrive and check into hotel',
            'Lunch at local café',
            'Visit Eiffel Tower (book tickets online)',
            'Walk through Champ de Mars',
            'Seine River cruise',
            'Dinner in 7th arrondissement',
          ],
          tips: 'Book Eiffel Tower tickets weeks in advance. Evening visits offer beautiful city lights.',
          bookingLinks: [
            { name: 'Eiffel Tower Skip-the-Line', url: 'https://www.getyourguide.com/s/?q=Eiffel%20Tower%20Skip%20the%20Line&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Louvre & Tuileries',
          activities: [
            'Early entry to Louvre Museum',
            'See Mona Lisa and Venus de Milo',
            'Lunch at Café Marly',
            'Stroll through Tuileries Garden',
            'Place de la Concorde',
            'Shopping on Rue de Rivoli',
          ],
          tips: 'Buy Louvre tickets online. Go early to avoid crowds. Museum closed Tuesdays.',
          bookingLinks: [
            { name: 'Louvre Skip-the-Line Ticket', url: 'https://www.getyourguide.com/s/?q=Louvre%20Museum%20Skip%20the%20Line&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Notre-Dame & Latin Quarter',
          activities: [
            'Visit Sainte-Chapelle',
            'Notre-Dame Cathedral exterior',
            'Lunch in Latin Quarter',
            'Panthéon visit',
            'Luxembourg Gardens',
            'Evening in Saint-Germain-des-Prés',
          ],
          tips: 'Sainte-Chapelle best in morning light. Combine ticket with Conciergerie.',
          bookingLinks: [
            { name: 'Sainte-Chapelle Tickets', url: 'https://www.getyourguide.com/s/?q=Sainte%20Chapelle%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Versailles Day Trip',
          activities: [
            'Early train to Versailles',
            'Palace of Versailles tour',
            'Lunch at palace grounds',
            'Explore gardens and fountains',
            'Marie Antoinette Estate',
            'Return to Paris for dinner',
          ],
          tips: 'Book skip-the-line tickets. Rent a golf cart for easier garden exploration.',
          bookingLinks: [
            { name: 'Versailles Palace Tour', url: 'https://www.getyourguide.com/s/?q=Versailles%20Palace%20Skip%20the%20Line&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Montmartre & Sacré-Cœur',
          activities: [
            'Climb to Sacré-Cœur Basilica',
            'Explore Montmartre streets',
            'Lunch at charming bistro',
            'Visit Place du Tertre',
            'Moulin Rouge photo stop',
            'Dinner with Eiffel Tower view',
          ],
          tips: 'Start early to avoid crowds. Wear comfortable shoes for cobblestone streets.',
          bookingLinks: [
            { name: 'Montmartre Walking Tour', url: 'https://www.getyourguide.com/s/?q=Montmartre%20Walking%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Marais & Museums',
          activities: [
            'Explore Le Marais district',
            'Visit Place des Vosges',
            'Lunch at trendy café',
            'Musée Picasso or Musée Carnavalet',
            'Shopping in Le Marais',
            'Dinner in the Jewish Quarter',
          ],
          tips: 'Le Marais perfect for boutique shopping. Many stores closed Sundays.',
          bookingLinks: [
            { name: 'Le Marais Food Tour', url: 'https://www.getyourguide.com/s/?q=Le%20Marais%20Food%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Champs-Élysées & Departure',
          activities: [
            'Arc de Triomphe visit',
            'Walk down Champs-Élysées',
            'Last-minute shopping',
            'Lunch at Ladurée',
            'Pack and check out',
            'Airport transfer',
          ],
          tips: 'Visit Arc de Triomphe early. Save luggage space for macarons and souvenirs.',
          bookingLinks: [
            { name: 'Arc de Triomphe Tickets', url: 'https://www.getyourguide.com/s/?q=Arc%20de%20Triomphe%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Le Marais', description: 'Central, trendy, great restaurants', priceRange: '$100-250/night' },
        { name: 'Saint-Germain', description: 'Chic, artistic, café culture', priceRange: '$120-300/night' },
      ],
      foodRecommendations: [
        'Croissants and pain au chocolat',
        'French onion soup',
        'Steak frites',
        'Crème brûlée',
        'Macarons from Ladurée',
      ],
      transportation: 'Metro is fastest and cheapest. Buy a Navigo week pass or carnet of 10 tickets.',
      packingList: [
        'Comfortable walking shoes',
        'Light jacket for evenings',
        'Scarf (year-round)',
        'Adapter for electronics',
        'Small day bag',
        'Umbrella',
      ],
    },
  },
  {
    id: 3,
    slug: 'tokyo-10-day-itinerary',
    title: '10 Days in Tokyo: Ultimate Guide',
    destination: 'Tokyo, Japan',
    days: 10,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400',
    excerpt: 'Experience the perfect blend of ancient tradition and cutting-edge technology in Japan\'s vibrant capital city.',
    category: 'City & Culture',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&h=300',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=300',
    ],
    content: {
      overview: 'Tokyo is a mesmerizing metropolis where ancient temples stand alongside futuristic skyscrapers. This 10-day itinerary covers must-see neighborhoods, day trips, and unique experiences.',
      bestTime: 'March-May or September-November',
      budget: '$80-150 per day',
      highlights: [
        'Shibuya Crossing and Harajuku fashion',
        'Senso-ji Temple in Asakusa',
        'Tokyo Skytree panoramic views',
        'Mt. Fuji day trip',
        'Tsukiji Outer Market food tour',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Shibuya',
          activities: ['Arrive at airport', 'Check into hotel', 'Explore Shibuya Crossing', 'Dinner at izakaya'],
          tips: 'Get a Suica card at airport. Evening Shibuya is most vibrant.',
          bookingLinks: [
            { name: 'Tokyo Airport Transfer', url: 'https://www.klook.com/en-US/search/result/?query=Tokyo%20Airport%20Transfer&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 2,
          title: 'Harajuku & Meiji Shrine',
          activities: ['Visit Meiji Shrine', 'Yoyogi Park', 'Harajuku Takeshita Street', 'Omotesando shopping'],
          tips: 'Visit shrine early morning for peaceful atmosphere.',
          bookingLinks: [
            { name: 'Harajuku Walking Tour', url: 'https://www.klook.com/en-US/search/result/?query=Harajuku%20Walking%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 3,
          title: 'Asakusa & Skytree',
          activities: ['Senso-ji Temple', 'Nakamise Street', 'Tokyo Skytree', 'Sumida River cruise'],
          tips: 'Visit Senso-ji at 6 AM before crowds.',
          bookingLinks: [
            { name: 'Tokyo Skytree Tickets', url: 'https://www.klook.com/en-US/search/result/?query=Tokyo%20Skytree%20Tickets&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 4,
          title: 'Tsukiji & Ginza',
          activities: ['Tsukiji Outer Market', 'Sushi breakfast', 'Ginza shopping', 'teamLab Borderless'],
          tips: 'Arrive at Tsukiji by 7 AM for freshest fish.',
          bookingLinks: [
            { name: 'teamLab Borderless Tickets', url: 'https://www.klook.com/en-US/search/result/?query=teamLab%20Borderless%20Tokyo&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 5,
          title: 'Akihabara & Ueno',
          activities: ['Akihabara Electric Town', 'Anime shops', 'Ueno Park', 'Museums'],
          tips: 'Ueno museums close Mondays.',
          bookingLinks: [
            { name: 'Akihabara Tour', url: 'https://www.klook.com/en-US/search/result/?query=Akihabara%20Anime%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 6,
          title: 'Mt. Fuji Day Trip',
          activities: ['Early departure', 'Mt. Fuji 5th Station', 'Lake Kawaguchi', 'Chureito Pagoda'],
          tips: 'Book tour in advance. Best views in clear weather.',
          bookingLinks: [
            { name: 'Mt Fuji Day Tour', url: 'https://www.klook.com/en-US/search/result/?query=Mt%20Fuji%20Day%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 7,
          title: 'Odaiba & Tokyo Bay',
          activities: ['teamLab Planets', 'DiverCity Plaza', 'Gundam statue', 'Rainbow Bridge views'],
          tips: 'Evening illumination is beautiful.',
          bookingLinks: [
            { name: 'teamLab Planets Tickets', url: 'https://www.klook.com/en-US/search/result/?query=teamLab%20Planets%20Tokyo&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 8,
          title: 'Roppongi & Tokyo Tower',
          activities: ['Mori Art Museum', 'Tokyo City View', 'Tokyo Tower', 'Roppongi nightlife'],
          tips: 'Tokyo Tower best at night when lit up.',
          bookingLinks: [
            { name: 'Tokyo Tower Tickets', url: 'https://www.klook.com/en-US/search/result/?query=Tokyo%20Tower%20Tickets&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 9,
          title: 'Imperial Palace & Shopping',
          activities: ['Imperial Palace Gardens', 'Marunouchi', 'Tokyo Station', 'Character Street'],
          tips: 'Palace tours require advance booking.',
          bookingLinks: [
            { name: 'Imperial Palace Tour', url: 'https://www.klook.com/en-US/search/result/?query=Imperial%20Palace%20Tokyo%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 10,
          title: 'Last Day & Departure',
          activities: ['Last-minute shopping', 'Don Quijote', 'Pokemon Center', 'Airport transfer'],
          tips: 'Leave 3-4 hours for airport.',
          bookingLinks: [
            { name: 'Airport Limousine Bus', url: 'https://www.klook.com/en-US/search/result/?query=Tokyo%20Airport%20Limousine%20Bus&aid=12345', partner: 'klook' },
          ],
        },
      ],
      accommodation: [
        { name: 'Shinjuku', description: 'Central hub, great transport', priceRange: '$60-180/night' },
        { name: 'Shibuya', description: 'Trendy area with nightlife', priceRange: '$70-200/night' },
      ],
      foodRecommendations: ['Sushi', 'Ramen', 'Yakitori', 'Tempura', 'Matcha desserts'],
      transportation: 'JR Pass for day trips. Suica/Pasmo card for metro.',
      packingList: ['Comfortable shoes', 'Cash (many places cash-only)', 'Portable wifi', 'Light jacket', 'Day bag'],
    },
  },
  {
    id: 4,
    slug: 'iceland-8-day-itinerary',
    title: '8 Days in Iceland: Ring Road Adventure',
    destination: 'Iceland',
    days: 8,
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&h=400',
    excerpt: 'Drive the famous Ring Road and experience Iceland\'s stunning waterfalls, glaciers, hot springs, and northern lights.',
    category: 'Nature & Adventure',
    images: [
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400&h=300',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300',
      'https://images.unsplash.com/photo-1465146633011-14f8e0781093?w=400&h=300',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
    ],
    content: {
      overview: 'Iceland\'s Ring Road offers breathtaking landscapes at every turn. This 8-day itinerary covers waterfalls, glaciers, volcanic landscapes, and charming villages.',
      bestTime: 'June-August (midnight sun) or September-March (northern lights)',
      budget: '$150-250 per day',
      highlights: [
        'Golden Circle sights',
        'Jökulsárlón Glacier Lagoon',
        'Dettifoss waterfall',
        'Blue Lagoon geothermal spa',
        'Northern lights (winter)',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Golden Circle',
          activities: ['Arrive Reykjavik', 'Pick up rental car', 'Þingvellir National Park', 'Geysir', 'Gullfoss waterfall'],
          tips: '4x4 rental essential. Drive slowly, watch for sheep.',
          bookingLinks: [
            { name: 'Golden Circle Tour', url: 'https://www.getyourguide.com/s/?q=Iceland%20Golden%20Circle%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'South Coast',
          activities: ['Seljalandsfoss waterfall', 'Skógafoss waterfall', 'Reynisfjara black sand beach', 'Vik'],
          tips: 'Be careful at Reynisfjara - dangerous waves.',
          bookingLinks: [
            { name: 'South Coast Tour', url: 'https://www.getyourguide.com/s/?q=Iceland%20South%20Coast%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Glacier Lagoon',
          activities: ['Skaftafell hiking', 'Svartifoss waterfall', 'Jökulsárlón Glacier Lagoon', 'Diamond Beach'],
          tips: 'Book boat tour on Jökulsárlón in advance.',
          bookingLinks: [
            { name: 'Glacier Lagoon Boat Tour', url: 'https://www.getyourguide.com/s/?q=Jokulsarlon%20Glacier%20Lagoon%20Boat%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'East Fjords',
          activities: ['Scenic fjord drive', 'Fishing villages', 'Seyðisfjörður', 'Overnight Egilsstaðir'],
          tips: 'Long driving day. Take breaks at viewpoints.',
          bookingLinks: [
            { name: 'East Fjords Tour', url: 'https://www.getyourguide.com/s/?q=Iceland%20East%20Fjords%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Lake Mývatn Area',
          activities: ['Dettifoss waterfall', 'Mývatn Nature Baths', 'Námafjall geothermal area', 'Grjótagjá cave'],
          tips: 'Mývatn Nature Baths less crowded than Blue Lagoon.',
          bookingLinks: [
            { name: 'Myvatn Nature Baths', url: 'https://www.getyourguide.com/s/?q=Myvatn%20Nature%20Baths%20Iceland&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'North Iceland',
          activities: ['Goðafoss waterfall', 'Akureyri city', 'Botanical gardens', 'Whale watching (optional)'],
          tips: 'Akureyri is Iceland\'s second city with good restaurants.',
          bookingLinks: [
            { name: 'Akureyri Whale Watching', url: 'https://www.getyourguide.com/s/?q=Akureyri%20Whale%20Watching&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'West Iceland',
          activities: ['Hvammstangi seal center', 'Borgarnes', 'Hraunfossar waterfalls', 'Deildartunguhver hot spring'],
          tips: 'West Iceland less touristy but beautiful.',
          bookingLinks: [
            { name: 'West Iceland Tour', url: 'https://www.getyourguide.com/s/?q=West%20Iceland%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 8,
          title: 'Blue Lagoon & Departure',
          activities: ['Blue Lagoon visit', 'Silica mud mask', 'Drive to Keflavik', 'Return car', 'Departure'],
          tips: 'Book Blue Lagoon weeks ahead. Arrive 2 hours early.',
          bookingLinks: [
            { name: 'Blue Lagoon Admission', url: 'https://www.getyourguide.com/s/?q=Blue%20Lagoon%20Iceland%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Guesthouses', description: 'Family-run, cozy', priceRange: '$100-200/night' },
        { name: 'Hotels', description: 'Full service in towns', priceRange: '$150-300/night' },
      ],
      foodRecommendations: ['Fresh fish', 'Lamb dishes', 'Skyr yogurt', 'Hot dogs', 'Rye bread ice cream'],
      transportation: '4x4 rental car essential. Gas stations have food.',
      packingList: ['Waterproof jacket', 'Warm layers', 'Hiking boots', 'Swimsuit', 'Camera', 'Water bottle'],
    },
  },
  {
    id: 5,
    slug: 'morocco-12-day-itinerary',
    title: '12 Days in Morocco: Grand Tour',
    destination: 'Morocco',
    days: 12,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&h=400',
    excerpt: 'From bustling medinas to Sahara Desert, explore Morocco\'s diverse landscapes and rich culture.',
    category: 'Culture & Adventure',
    images: [
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300',
      'https://images.unsplash.com/photo-1558603668-6570496b66f8?w=400&h=300',
      'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&h=300',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300',
    ],
    content: {
      overview: 'Morocco is a land of contrasts with ancient medinas, mountains, deserts, and coasts. This 12-day tour takes you from Marrakech to Fes, Chefchaouen, and the Sahara.',
      bestTime: 'March-May or September-November',
      budget: '$60-120 per day',
      highlights: [
        'Jemaa el-Fnaa square in Marrakech',
        'Blue streets of Chefchaouen',
        'Sahara Desert camp',
        'Ancient Fes medina',
        'Traditional hammam',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival in Marrakech',
          activities: ['Arrive at airport', 'Transfer to riad', 'Evening at Jemaa el-Fnaa', 'Rooftop dinner'],
          tips: 'Pre-arrange riad pickup. Drink bottled water only.',
          bookingLinks: [
            { name: 'Marrakech Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Marrakech%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Marrakech Exploration',
          activities: ['Bahia Palace', 'Saadian Tombs', 'Majorelle Garden', 'Souk shopping', 'Koutoubia Mosque'],
          tips: 'Hire guide for medina. Bargain in souks (start at 30%).',
          bookingLinks: [
            { name: 'Marrakech Medina Tour', url: 'https://www.getyourguide.com/s/?q=Marrakech%20Medina%20Walking%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Atlas Mountains',
          activities: ['Drive to Imlil', 'Hike Atlas Mountains', 'Berber villages', 'Lunch with family', 'Mint tea'],
          tips: 'Wear good hiking shoes. Tipping guides customary.',
          bookingLinks: [
            { name: 'Atlas Mountains Day Trip', url: 'https://www.getyourguide.com/s/?q=Atlas%20Mountains%20Day%20Trip&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'To Sahara Desert',
          activities: ['Drive through Atlas', 'Aït Benhaddou kasbah', 'Ouarzazate', 'Dades Valley', 'Overnight Merzouga'],
          tips: 'Long driving day. Pack warm clothes for desert nights.',
          bookingLinks: [
            { name: 'Sahara Desert Tour', url: 'https://www.getyourguide.com/s/?q=Sahara%20Desert%20Tour%20from%20Marrakech&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Sahara Desert Experience',
          activities: ['Camel trek into dunes', 'Desert camp', 'Sunset over Erg Chebbi', 'Traditional dinner', 'Stargazing'],
          tips: 'Most memorable experience. Bring camera and warm clothes.',
          bookingLinks: [
            { name: 'Camel Trek & Desert Camp', url: 'https://www.getyourguide.com/s/?q=Merzouga%20Camel%20Trek%20Desert%20Camp&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Desert to Fes',
          activities: ['Sunrise over dunes', 'Drive to Fes', 'Ziz Valley', 'Middle Atlas', 'Arrive Fes evening'],
          tips: 'Another long drive. Enjoy scenery changes.',
          bookingLinks: [
            { name: 'Fes City Tour', url: 'https://www.getyourguide.com/s/?q=Fes%20Medina%20Walking%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Fes Medina',
          activities: ['Fes el-Bali medina', 'Tanneries', 'Al-Qarawiyyin University', 'Pottery workshops', 'Traditional dinner'],
          tips: 'Fes medina larger than Marrakech. Hire local guide.',
          bookingLinks: [
            { name: 'Fes Tannery Visit', url: 'https://www.getyourguide.com/s/?q=Fes%20Tannery%20Visit&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 8,
          title: 'To Chefchaouen',
          activities: ['Drive to Chefchaouen', 'Blue city exploration', 'Photography', 'Mountain views', 'Relaxed evening'],
          tips: 'Chefchaouen perfect for photos. Arrive afternoon for best light.',
          bookingLinks: [
            { name: 'Chefchaouen Walking Tour', url: 'https://www.getyourguide.com/s/?q=Chefchaouen%20Walking%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 9,
          title: 'Chefchaouen & Rabat',
          activities: ['Morning in Chefchaouen', 'Drive to Rabat', 'Hassan Tower', 'Kasbah of the Udayas', 'Dinner in Rabat'],
          tips: 'Rabat is Morocco\'s capital, less touristy than Marrakech.',
          bookingLinks: [
            { name: 'Rabat City Tour', url: 'https://www.getyourguide.com/s/?q=Rabat%20City%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 10,
          title: 'Casablanca',
          activities: ['Drive to Casablanca', 'Hassan II Mosque', 'Corniche', 'Art deco architecture', 'Rick\'s Café'],
          tips: 'Hassan II Mosque worth visiting inside. Book tour.',
          bookingLinks: [
            { name: 'Hassan II Mosque Tour', url: 'https://www.getyourguide.com/s/?q=Hassan%20II%20Mosque%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 11,
          title: 'Return to Marrakech',
          activities: ['Drive back to Marrakech', 'Relaxed afternoon', 'Hammam spa', 'Farewell dinner', 'Rooftop views'],
          tips: 'Book hammam in advance. Traditional experience.',
          bookingLinks: [
            { name: 'Traditional Hammam Spa', url: 'https://www.getyourguide.com/s/?q=Marrakech%20Traditional%20Hammam&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 12,
          title: 'Departure',
          activities: ['Last-minute souvenir shopping', 'Lunch at riad', 'Airport transfer', 'Departure'],
          tips: 'Leave time for last mint tea. Buy spices at airport.',
          bookingLinks: [
            { name: 'Marrakech Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Marrakech%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Riads', description: 'Traditional guesthouses in medinas', priceRange: '$40-150/night' },
        { name: 'Hotels', description: 'Modern amenities', priceRange: '$60-200/night' },
      ],
      foodRecommendations: ['Tagine', 'Couscous', 'Mint tea', 'Pastilla', 'Fresh orange juice'],
      transportation: 'Private driver or organized tour recommended. Driving challenging.',
      packingList: ['Modest clothing', 'Scarf for women', 'Sunscreen', 'Hand sanitizer', 'Cash in dirhams', 'Camera'],
    },
  },
  {
    id: 6,
    slug: 'new-zealand-14-day-itinerary',
    title: '14 Days in New Zealand: Both Islands',
    destination: 'New Zealand',
    days: 14,
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=400',
    excerpt: 'Experience Middle Earth with stunning fjords, mountains, beaches, and adventure activities across both islands.',
    category: 'Nature & Adventure',
    images: [
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=300',
      'https://images.unsplash.com/photo-1469521669194-babb18e29472?w=400&h=300',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=400&h=300',
    ],
    content: {
      overview: 'New Zealand offers dramatic landscapes from fjords to volcanoes, beaches to mountains. This 14-day itinerary covers highlights of both North and South Islands.',
      bestTime: 'November-April (summer)',
      budget: '$100-180 per day',
      highlights: [
        'Milford Sound fjord cruise',
        'Queenstown adventure capital',
        'Hobbiton Movie Set',
        'Rotorua geothermal parks',
        'Franz Josef Glacier',
      ],
      days: [
        {
          day: 1,
          title: 'Arrive Auckland',
          activities: ['Arrive Auckland', 'Sky Tower', 'Viaduct Harbour', 'Dinner at waterfront'],
          tips: 'Auckland spread out. Rent car for North Island.',
          bookingLinks: [
            { name: 'Auckland Sky Tower', url: 'https://www.getyourguide.com/s/?q=Auckland%20Sky%20Tower%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Auckland to Rotorua',
          activities: ['Drive to Rotorua', 'Hobbiton Movie Set', 'Check into Rotorua', 'Evening Maori cultural show'],
          tips: 'Book Hobbiton weeks ahead. Very popular.',
          bookingLinks: [
            { name: 'Hobbiton Movie Set Tour', url: 'https://www.getyourguide.com/s/?q=Hobbiton%20Movie%20Set%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Rotorua Geothermal',
          activities: ['Te Puia geyser', 'Wai-O-Tapu', 'Mud pools', 'Hot springs', 'Redwood forest walk'],
          tips: 'Rotorua smells like sulfur. You get used to it.',
          bookingLinks: [
            { name: 'Rotorua Geothermal Tour', url: 'https://www.getyourguide.com/s/?q=Rotorua%20Geothermal%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'To Wellington',
          activities: ['Drive to Wellington', 'Te Papa Museum', 'Cuba Street', 'Evening at waterfront'],
          tips: 'Wellington windy. Bring jacket.',
          bookingLinks: [
            { name: 'Wellington City Tour', url: 'https://www.getyourguide.com/s/?q=Wellington%20City%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Ferry to South Island',
          activities: ['Interislander ferry', 'Scenic Marlborough Sounds', 'Picton', 'Drive to Nelson'],
          tips: 'Ferry 3 hours. Book car in advance.',
          bookingLinks: [
            { name: 'Interislander Ferry', url: 'https://www.getyourguide.com/s/?q=Interislander%20Ferry%20Wellington%20Picton&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'West Coast',
          activities: ['Drive to Punakaiki', 'Pancake Rocks', 'Blowholes', 'Continue to Greymouth'],
          tips: 'West Coast rainy. Bring waterproof gear.',
          bookingLinks: [
            { name: 'Pancake Rocks Tour', url: 'https://www.getyourguide.com/s/?q=Punakaiki%20Pancake%20Rocks&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Franz Josef Glacier',
          activities: ['Glacier valley walk', 'Helicopter tour (optional)', 'Hot pools', 'Overnight Franz Josef'],
          tips: 'Weather dependent. Book helicopter early.',
          bookingLinks: [
            { name: 'Franz Josef Helicopter Tour', url: 'https://www.getyourguide.com/s/?q=Franz%20Josef%20Glacier%20Helicopter&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 8,
          title: 'To Queenstown',
          activities: ['Drive to Queenstown', 'Haast Pass', 'Lake Wanaka stop', 'Arrive Queenstown evening'],
          tips: 'Long drive but stunning scenery.',
          bookingLinks: [
            { name: 'Queenstown Activities', url: 'https://www.getyourguide.com/s/?q=Queenstown%20Activities&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 9,
          title: 'Queenstown Adventure',
          activities: ['Shotover Jet boat', 'Skyline Gondola', 'Luge', 'Bungy jump (optional)', 'Fergburger dinner'],
          tips: 'Adventure capital. Book activities ahead.',
          bookingLinks: [
            { name: 'Shotover Jet Boat', url: 'https://www.getyourguide.com/s/?q=Shotover%20Jet%20Queenstown&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 10,
          title: 'Milford Sound',
          activities: ['Early departure', 'Drive to Milford Sound', 'Fjord cruise', 'Return to Queenstown'],
          tips: 'Book cruise ahead. Take motion sickness pills.',
          bookingLinks: [
            { name: 'Milford Sound Cruise', url: 'https://www.getyourguide.com/s/?q=Milford%20Sound%20Cruise&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 11,
          title: 'To Christchurch',
          activities: ['Drive to Christchurch', 'Lake Tekapo stop', 'Church of Good Shepherd', 'Arrive Christchurch'],
          tips: 'Stop at Mt Cook viewpoint if clear.',
          bookingLinks: [
            { name: 'Lake Tekapo Tour', url: 'https://www.getyourguide.com/s/?q=Lake%20Tekapo%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 12,
          title: 'Christchurch',
          activities: ['Botanic Gardens', 'Riverside walk', 'Cardboard Cathedral', 'Restart Mall', 'Punting'],
          tips: 'City still rebuilding from earthquake.',
          bookingLinks: [
            { name: 'Christchurch City Tour', url: 'https://www.getyourguide.com/s/?q=Christchurch%20City%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 13,
          title: 'Kaikoura',
          activities: ['Drive to Kaikoura', 'Whale watching', 'Seal colony', 'Fresh crayfish lunch', 'Return'],
          tips: 'Whale watching weather dependent. Book ahead.',
          bookingLinks: [
            { name: 'Kaikoura Whale Watching', url: 'https://www.getyourguide.com/s/?q=Kaikoura%20Whale%20Watching&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 14,
          title: 'Departure',
          activities: ['Last-minute shopping', 'Return rental car', 'Christchurch Airport', 'Departure'],
          tips: 'Allow extra time for airport.',
          bookingLinks: [
            { name: 'Christchurch Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Christchurch%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Motels', description: 'Common, affordable', priceRange: '$80-150/night' },
        { name: 'Hotels', description: 'Cities and towns', priceRange: '$120-250/night' },
      ],
      foodRecommendations: ['Fish and chips', 'Lamb', 'Pavlova', 'Flat white coffee', 'Hokey pokey ice cream'],
      transportation: 'Rental car essential. Drive on left. Scenic routes take longer.',
      packingList: ['Layers for weather', 'Rain jacket', 'Hiking boots', 'Sunscreen', 'Insect repellent', 'Camera'],
    },
  },
  {
    id: 7,
    slug: 'dubai-7-day-itinerary',
    title: '7 Days in Dubai: Luxury & Adventure',
    destination: 'Dubai, UAE',
    days: 7,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400',
    excerpt: 'Experience the perfect blend of luxury, culture, and adventure in the world\'s most futuristic city.',
    category: 'City & Luxury',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300',
      'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=400&h=300',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&h=300',
    ],
    content: {
      overview: 'Dubai offers ultra-modern architecture, luxury shopping, vibrant nightlife, and desert adventures. This 7-day itinerary covers iconic landmarks, cultural sites, and thrilling experiences.',
      bestTime: 'November-March (cooler weather)',
      budget: '$150-300 per day',
      highlights: [
        'Burj Khalifa observation deck',
        'Desert safari with dinner',
        'Dubai Mall and Gold Souk',
        'Palm Jumeirah and Atlantis',
        'Dubai Marina and JBR Beach',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Downtown Dubai',
          activities: ['Arrive Dubai', 'Check into hotel', 'Dubai Mall', 'Burj Khalifa at sunset', 'Dubai Fountain show'],
          tips: 'Book Burj Khalifa tickets in advance. Visit at sunset for day and night views.',
          bookingLinks: [
            { name: 'Burj Khalifa Tickets', url: 'https://www.getyourguide.com/s/?q=Burj%20Khalifa%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Old Dubai & Culture',
          activities: ['Al Fahidi Historical District', 'Dubai Museum', 'Gold Souk', 'Spice Souk', 'Abra water taxi', 'Creek dinner cruise'],
          tips: 'Bargain at souks. Start at 40% of asking price.',
          bookingLinks: [
            { name: 'Dubai Creek Dinner Cruise', url: 'https://www.getyourguide.com/s/?q=Dubai%20Creek%20Dinner%20Cruise&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Desert Safari Adventure',
          activities: ['Morning at hotel/beach', 'Afternoon pickup', 'Dune bashing', 'Camel ride', 'BBQ dinner', 'Belly dance show'],
          tips: 'Best experience in Dubai. Don\'t eat heavy lunch before dune bashing.',
          bookingLinks: [
            { name: 'Desert Safari with BBQ Dinner', url: 'https://www.getyourguide.com/s/?q=Dubai%20Desert%20Safari%20BBQ%20Dinner&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Palm Jumeirah & Atlantis',
          activities: ['Monorail to Palm Jumeirah', 'Atlantis Aquaventure', 'Lost Chambers Aquarium', 'The Pointe for lunch', 'Beach time'],
          tips: 'Aquaventure is full day. Bring sunscreen.',
          bookingLinks: [
            { name: 'Atlantis Aquaventure Tickets', url: 'https://www.getyourguide.com/s/?q=Atlantis%20Aquaventure%20Dubai&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Dubai Marina & JBR',
          activities: ['Dubai Marina Walk', 'Yacht cruise', 'JBR Beach', 'Beach clubs', 'Ain Dubai observation wheel', 'Marina dinner'],
          tips: 'Marina best in evening. Many restaurants and nightlife.',
          bookingLinks: [
            { name: 'Dubai Marina Yacht Cruise', url: 'https://www.getyourguide.com/s/?q=Dubai%20Marina%20Yacht%20Cruise&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Theme Parks & Entertainment',
          activities: ['IMG Worlds of Adventure', 'Dubai Parks and Resorts', 'Global Village (seasonal)', 'La Mer beach'],
          tips: 'Choose one theme park. All are full day experiences.',
          bookingLinks: [
            { name: 'IMG Worlds of Adventure', url: 'https://www.getyourguide.com/s/?q=IMG%20Worlds%20of%20Adventure%20Dubai&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Shopping & Departure',
          activities: ['Mall of Emirates', 'Ski Dubai', 'Last shopping', 'Dubai Miracle Garden (seasonal)', 'Airport transfer'],
          tips: 'Check VAT refund for tourists. Keep receipts.',
          bookingLinks: [
            { name: 'Dubai Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Dubai%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Downtown Dubai', description: 'Near Burj Khalifa, luxury hotels', priceRange: '$150-500/night' },
        { name: 'Dubai Marina', description: 'Beach access, restaurants', priceRange: '$120-400/night' },
      ],
      foodRecommendations: ['Shawarma', 'Arabic mezze', 'Iranian cuisine', 'Indian food', 'International fine dining'],
      transportation: 'Metro efficient and cheap. Taxis/Uber readily available. Consider 3-day metro pass.',
      packingList: ['Light clothing', 'Modest clothes for mosques', 'Sunscreen SPF 50+', 'Sunglasses', 'Beach wear', 'Light jacket for AC'],
    },
  },
  {
    id: 8,
    slug: 'new-york-7-day-itinerary',
    title: '7 Days in New York: The Big Apple',
    destination: 'New York City, USA',
    days: 7,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400',
    excerpt: 'Explore the city that never sleeps with iconic landmarks, world-class museums, and diverse neighborhoods.',
    category: 'City & Culture',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&h=300',
      'https://images.unsplash.com/photo-1546436836-07a91091f160?w=400&h=300',
      'https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?w=400&h=300',
    ],
    content: {
      overview: 'New York City is a vibrant metropolis with endless attractions. This 7-day itinerary covers Manhattan highlights, Brooklyn gems, and quintessential NYC experiences.',
      bestTime: 'April-June or September-November',
      budget: '$150-250 per day',
      highlights: [
        'Statue of Liberty and Ellis Island',
        'Central Park and Metropolitan Museum',
        'Times Square and Broadway show',
        'Brooklyn Bridge walk',
        '9/11 Memorial and Museum',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Times Square',
          activities: ['Arrive NYC', 'Check into hotel', 'Times Square', 'Broadway show', 'Hell\'s Kitchen dinner'],
          tips: 'Buy Broadway tickets in advance or use TKTS booth for discounts.',
          bookingLinks: [
            { name: 'Broadway Show Tickets', url: 'https://www.getyourguide.com/s/?q=Broadway%20Show%20Tickets%20New%20York&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Statue of Liberty & Downtown',
          activities: ['Ferry to Liberty Island', 'Ellis Island Immigration Museum', 'Battery Park', '9/11 Memorial', 'One World Observatory'],
          tips: 'Book Statue of Liberty ferry early. Crown access requires advance booking.',
          bookingLinks: [
            { name: 'Statue of Liberty Ferry', url: 'https://www.getyourguide.com/s/?q=Statue%20of%20Liberty%20Ferry%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Central Park & Museums',
          activities: ['Central Park walk', 'Bethesda Fountain', 'Metropolitan Museum of Art', 'Guggenheim Museum', 'Upper East Side'],
          tips: 'Met Museum suggested donation. Plan 3-4 hours minimum.',
          bookingLinks: [
            { name: 'Metropolitan Museum Tickets', url: 'https://www.getyourguide.com/s/?q=Metropolitan%20Museum%20New%20York%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Brooklyn Exploration',
          activities: ['Walk Brooklyn Bridge', 'DUMBO neighborhood', 'Brooklyn Bridge Park', 'Williamsburg', 'Smorgasburg (weekends)', 'Brooklyn Heights Promenade'],
          tips: 'Start in Manhattan, walk to Brooklyn for best bridge photos.',
          bookingLinks: [
            { name: 'Brooklyn Food Tour', url: 'https://www.getyourguide.com/s/?q=Brooklyn%20Food%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Midtown Manhattan',
          activities: ['Rockefeller Center', 'Top of the Rock', 'St. Patrick\'s Cathedral', 'Grand Central Terminal', 'Bryant Park', 'Empire State Building at night'],
          tips: 'Top of the Rock better views than Empire State (can see Empire State).',
          bookingLinks: [
            { name: 'Top of the Rock Tickets', url: 'https://www.getyourguide.com/s/?q=Top%20of%20the%20Rock%20New%20York&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'SoHo, Greenwich & Chelsea',
          activities: ['SoHo shopping', 'Little Italy', 'Chinatown', 'Greenwich Village', 'Washington Square Park', 'Chelsea Market', 'High Line'],
          tips: 'High Line best at sunset. Free admission.',
          bookingLinks: [
            { name: 'Greenwich Village Food Tour', url: 'https://www.getyourguide.com/s/?q=Greenwich%20Village%20Food%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Museums & Departure',
          activities: ['American Museum of Natural History', 'MoMA', 'Last-minute shopping', '5th Avenue', 'Airport transfer'],
          tips: 'Check museum closing days. Most close Mondays.',
          bookingLinks: [
            { name: 'MoMA Tickets', url: 'https://www.getyourguide.com/s/?q=MoMA%20Museum%20New%20York%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Midtown Manhattan', description: 'Central location, near attractions', priceRange: '$150-400/night' },
        { name: 'Times Square Area', description: 'Heart of action, all budgets', priceRange: '$120-350/night' },
      ],
      foodRecommendations: ['New York pizza', 'Bagels with lox', 'Pastrami sandwich', 'Hot dogs', 'Cheesecake'],
      transportation: 'Subway most efficient. Buy 7-day unlimited MetroCard. Walking is great for exploring.',
      packingList: ['Comfortable walking shoes', 'Layers for varying weather', 'Day backpack', 'Reusable water bottle', 'Power bank', 'Light rain jacket'],
    },
  },
  {
    id: 9,
    slug: 'rome-6-day-itinerary',
    title: '6 Days in Rome: Eternal City',
    destination: 'Rome, Italy',
    days: 6,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400',
    excerpt: 'Explore ancient ruins, Renaissance art, and authentic Italian cuisine in the heart of Italy.',
    category: 'History & Culture',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=300',
      'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=400&h=300',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400&h=300',
    ],
    content: {
      overview: 'Rome is an open-air museum with layers of history at every corner. This 6-day itinerary covers ancient sites, Vatican treasures, and charming neighborhoods.',
      bestTime: 'April-June or September-October',
      budget: '$100-200 per day',
      highlights: [
        'Colosseum and Roman Forum',
        'Vatican Museums and Sistine Chapel',
        'Trevi Fountain and Spanish Steps',
        'Trastevere neighborhood',
        'Authentic Roman cuisine',
      ],
      days: [
        {
          day: 1,
          title: 'Ancient Rome',
          activities: ['Colosseum tour', 'Roman Forum', 'Palatine Hill', 'Capitoline Museums', 'Piazza Venezia'],
          tips: 'Book Colosseum skip-the-line tickets. Arrive early to avoid crowds.',
          bookingLinks: [
            { name: 'Colosseum Skip the Line', url: 'https://www.getyourguide.com/s/?q=Colosseum%20Skip%20the%20Line%20Rome&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Vatican City',
          activities: ['Vatican Museums', 'Sistine Chapel', 'St. Peter\'s Basilica', 'St. Peter\'s Square', 'Castel Sant\'Angelo'],
          tips: 'Vatican Museums huge. Focus on highlights. Dress modestly (covered shoulders/knees).',
          bookingLinks: [
            { name: 'Vatican Museums & Sistine Chapel', url: 'https://www.getyourguide.com/s/?q=Vatican%20Museums%20Sistine%20Chapel%20Skip%20Line&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Centro Storico',
          activities: ['Pantheon', 'Piazza Navona', 'Trevi Fountain', 'Spanish Steps', 'Via del Corso shopping', 'Piazza del Popolo'],
          tips: 'Throw coin in Trevi Fountain. Best early morning or late evening.',
          bookingLinks: [
            { name: 'Rome Walking Tour', url: 'https://www.getyourguide.com/s/?q=Rome%20Walking%20Tour%20Centro%20Storico&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Trastevere & Jewish Ghetto',
          activities: ['Villa Borghese gardens', 'Borghese Gallery', 'Jewish Ghetto', 'Teatro di Marcello', 'Trastevere evening', 'Santa Maria in Trastevere'],
          tips: 'Borghese Gallery requires advance booking. Limited entry.',
          bookingLinks: [
            { name: 'Borghese Gallery Tickets', url: 'https://www.getyourguide.com/s/?q=Borghese%20Gallery%20Rome%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Day Trip Options',
          activities: ['Option 1: Pompeii and Amalfi Coast', 'Option 2: Florence day trip', 'Option 3: Tivoli (Villa d\'Este & Hadrian\'s Villa)', 'Evening back in Rome'],
          tips: 'Pompeii full day trip. Early start essential.',
          bookingLinks: [
            { name: 'Pompeii Day Trip from Rome', url: 'https://www.getyourguide.com/s/?q=Pompeii%20Day%20Trip%20from%20Rome&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Last Day & Departure',
          activities: ['Campo de\' Fiori market', 'Via Appia Antica', 'Catacombs', 'Last gelato', 'Shopping for souvenirs', 'Airport transfer'],
          tips: 'Markets best in morning. Campo de\' Fiori lively atmosphere.',
          bookingLinks: [
            { name: 'Rome Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Rome%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Trastevere', description: 'Charming, restaurants, nightlife', priceRange: '$80-200/night' },
        { name: 'Centro Storico', description: 'Walking distance to everything', priceRange: '$100-250/night' },
      ],
      foodRecommendations: ['Cacio e pepe', 'Carbonara', 'Supplì', 'Gelato', 'Pizza al taglio'],
      transportation: 'Most attractions walkable. Metro for longer distances. Buy Roma Pass for transport + museums.',
      packingList: ['Walking shoes', 'Modest clothing for churches', 'Day bag', 'Sunscreen', 'Water bottle', 'Light scarf'],
    },
  },
  {
    id: 10,
    slug: 'barcelona-7-day-itinerary',
    title: '7 Days in Barcelona: Gaudí & Beaches',
    destination: 'Barcelona, Spain',
    days: 7,
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400',
    excerpt: 'Discover Gaudí\'s masterpieces, beautiful beaches, Gothic Quarter charm, and vibrant Catalan culture.',
    category: 'City & Beach',
    images: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300',
      'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=400&h=300',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300',
      'https://images.unsplash.com/photo-1558642891-54c5e4b8b3c7?w=400&h=300',
    ],
    content: {
      overview: 'Barcelona combines stunning architecture, Mediterranean beaches, world-class cuisine, and vibrant nightlife. This 7-day itinerary covers Gaudí masterpieces, Gothic Quarter, beaches, and local neighborhoods.',
      bestTime: 'May-June or September-October',
      budget: '$90-180 per day',
      highlights: [
        'Sagrada Família basilica',
        'Park Güell mosaics',
        'Gothic Quarter exploration',
        'La Rambla and Boqueria Market',
        'Barceloneta Beach',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Gothic Quarter',
          activities: ['Arrive Barcelona', 'Check into hotel', 'Gothic Quarter walk', 'Barcelona Cathedral', 'La Rambla', 'Dinner at El Born'],
          tips: 'Watch for pickpockets on La Rambla. Keep valuables secure.',
          bookingLinks: [
            { name: 'Gothic Quarter Walking Tour', url: 'https://www.getyourguide.com/s/?q=Barcelona%20Gothic%20Quarter%20Walking%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Gaudí Day - Sagrada Família',
          activities: ['Sagrada Família tour', 'Hospital de Sant Pau', 'Casa Milà (La Pedrera)', 'Passeig de Gràcia shopping', 'Casa Batlló night visit'],
          tips: 'Book Sagrada Família tickets weeks ahead. Include tower access.',
          bookingLinks: [
            { name: 'Sagrada Familia Skip the Line', url: 'https://www.getyourguide.com/s/?q=Sagrada%20Familia%20Skip%20the%20Line%20Barcelona&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Park Güell & Gràcia',
          activities: ['Park Güell morning visit', 'Gràcia neighborhood', 'Casa Vicens', 'Local markets', 'Plaça del Sol evening'],
          tips: 'Park Güell best in morning light. Timed entry required.',
          bookingLinks: [
            { name: 'Park Guell Tickets', url: 'https://www.getyourguide.com/s/?q=Park%20Guell%20Barcelona%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Montjuïc & Museums',
          activities: ['Montjuïc cable car', 'Montjuïc Castle', 'Joan Miró Foundation', 'Magic Fountain show', 'MNAC museum'],
          tips: 'Magic Fountain shows Friday-Sunday evenings. Free.',
          bookingLinks: [
            { name: 'Montjuic Cable Car & Castle', url: 'https://www.getyourguide.com/s/?q=Montjuic%20Cable%20Car%20Barcelona&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Beach Day & Barceloneta',
          activities: ['Barceloneta Beach', 'Beachfront lunch', 'Port Vell marina', 'Aquarium Barcelona', 'Seafood dinner', 'Beach bars'],
          tips: 'Beach busy in summer. Arrive early for good spot.',
          bookingLinks: [
            { name: 'Barcelona Sailing Tour', url: 'https://www.getyourguide.com/s/?q=Barcelona%20Sailing%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Montserrat Day Trip',
          activities: ['Train to Montserrat', 'Monastery visit', 'Black Madonna', 'Mountain hiking', 'Funicular rides', 'Return to Barcelona'],
          tips: 'Buy combined train + cable car ticket. Start early.',
          bookingLinks: [
            { name: 'Montserrat Day Trip', url: 'https://www.getyourguide.com/s/?q=Montserrat%20Day%20Trip%20from%20Barcelona&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Markets & Departure',
          activities: ['La Boqueria Market', 'Santa Caterina Market', 'Last-minute shopping', 'Parc de la Ciutadella', 'Airport transfer'],
          tips: 'Markets close Sundays. Visit morning for best selection.',
          bookingLinks: [
            { name: 'Barcelona Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Barcelona%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Gothic Quarter', description: 'Historic center, walkable', priceRange: '$80-180/night' },
        { name: 'Eixample', description: 'Modernist area, near Gaudí', priceRange: '$90-200/night' },
      ],
      foodRecommendations: ['Paella', 'Tapas', 'Pan con tomate', 'Crema catalana', 'Cava sparkling wine'],
      transportation: 'Metro excellent. Buy T-10 ticket for 10 trips. Most attractions walkable.',
      packingList: ['Comfortable shoes', 'Beach wear', 'Light layers', 'Sunscreen', 'Reusable water bottle', 'Day backpack'],
    },
  },
  {
    id: 11,
    slug: 'thailand-10-day-itinerary',
    title: '10 Days in Thailand: Bangkok to Islands',
    destination: 'Thailand',
    days: 10,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400',
    excerpt: 'Experience bustling Bangkok, ancient temples, tropical islands, and authentic Thai cuisine.',
    category: 'Culture & Beach',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400&h=300',
      'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=400&h=300',
    ],
    content: {
      overview: 'Thailand offers vibrant cities, ornate temples, pristine beaches, and incredible food. This 10-day journey covers Bangkok\'s energy, Chiang Mai\'s culture, and southern island paradise.',
      bestTime: 'November-March (cool & dry season)',
      budget: '$50-100 per day',
      highlights: [
        'Grand Palace and temples in Bangkok',
        'Floating markets experience',
        'Phi Phi Islands boat tour',
        'Thai cooking class',
        'Island hopping in Krabi',
      ],
      days: [
        {
          day: 1,
          title: 'Arrive Bangkok',
          activities: ['Airport arrival', 'Hotel check-in', 'Khao San Road', 'Street food dinner', 'Tuk-tuk ride'],
          tips: 'Get SIM card at airport. Use Grab app for transport.',
          bookingLinks: [
            { name: 'Bangkok Airport Transfer', url: 'https://www.klook.com/en-US/search/result/?query=Bangkok%20Airport%20Transfer&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 2,
          title: 'Bangkok Temples',
          activities: ['Grand Palace', 'Wat Phra Kaew', 'Wat Pho (Reclining Buddha)', 'Thai massage', 'Chao Phraya River cruise'],
          tips: 'Dress modestly for temples. Shoulders and knees covered.',
          bookingLinks: [
            { name: 'Grand Palace & Temples Tour', url: 'https://www.klook.com/en-US/search/result/?query=Bangkok%20Grand%20Palace%20Temples%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 3,
          title: 'Floating Markets & Ayutthaya',
          activities: ['Damnoen Saduak Floating Market', 'Boat ride', 'Ayutthaya ancient ruins', 'Historical park', 'Return to Bangkok'],
          tips: 'Join organized tour for floating market. Worth early start.',
          bookingLinks: [
            { name: 'Floating Market Day Trip', url: 'https://www.klook.com/en-US/search/result/?query=Bangkok%20Floating%20Market%20Ayutthaya%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 4,
          title: 'Bangkok to Krabi',
          activities: ['Morning at Chatuchak Market', 'Flight to Krabi', 'Check into hotel', 'Ao Nang Beach', 'Beachfront dinner'],
          tips: 'Book flight in advance. Pack light for islands.',
          bookingLinks: [
            { name: 'Krabi Airport Transfer', url: 'https://www.klook.com/en-US/search/result/?query=Krabi%20Airport%20Transfer&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 5,
          title: 'Phi Phi Islands',
          activities: ['Speedboat to Phi Phi', 'Maya Bay', 'Snorkeling', 'Monkey Beach', 'Viking Cave', 'Sunset return'],
          tips: 'Most popular tour. Book day before. Bring seasickness pills.',
          bookingLinks: [
            { name: 'Phi Phi Islands Tour', url: 'https://www.klook.com/en-US/search/result/?query=Phi%20Phi%20Islands%20Day%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 6,
          title: '4 Islands Tour',
          activities: ['Long-tail boat tour', 'Phra Nang Beach', 'Tup Island sandbar', 'Chicken Island', 'Poda Island', 'Snorkeling stops'],
          tips: 'Beautiful limestone cliffs. Tide affects sandbar access.',
          bookingLinks: [
            { name: '4 Islands Krabi Tour', url: 'https://www.klook.com/en-US/search/result/?query=Krabi%204%20Islands%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 7,
          title: 'Railay Beach & Rock Climbing',
          activities: ['Boat to Railay', 'Rock climbing lesson', 'Phra Nang Cave', 'Beach relaxation', 'Viewpoint hike', 'Return to Ao Nang'],
          tips: 'Railay only accessible by boat. Stunning scenery.',
          bookingLinks: [
            { name: 'Railay Beach Day Trip', url: 'https://www.klook.com/en-US/search/result/?query=Railay%20Beach%20Day%20Trip&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 8,
          title: 'Krabi to Phuket',
          activities: ['Transfer to Phuket', 'Check into Patong hotel', 'Patong Beach', 'Bangla Road nightlife', 'Beach clubs'],
          tips: 'Phuket more developed than Krabi. Party atmosphere.',
          bookingLinks: [
            { name: 'Krabi to Phuket Transfer', url: 'https://www.klook.com/en-US/search/result/?query=Krabi%20to%20Phuket%20Transfer&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 9,
          title: 'Phuket Island Tour',
          activities: ['Big Buddha', 'Karon Viewpoint', 'Old Phuket Town', 'Sino-Portuguese architecture', 'Weekend market', 'Seafood dinner'],
          tips: 'Rent scooter or join tour. Big Buddha has great views.',
          bookingLinks: [
            { name: 'Phuket City Tour', url: 'https://www.klook.com/en-US/search/result/?query=Phuket%20City%20Island%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 10,
          title: 'Departure',
          activities: ['Morning beach time', 'Last Thai massage', 'Souvenir shopping', 'Airport transfer', 'Departure'],
          tips: 'Leave 3 hours for airport. Traffic can be heavy.',
          bookingLinks: [
            { name: 'Phuket Airport Transfer', url: 'https://www.klook.com/en-US/search/result/?query=Phuket%20Airport%20Transfer&aid=12345', partner: 'klook' },
          ],
        },
      ],
      accommodation: [
        { name: 'Bangkok Sukhumvit', description: 'Central, BTS access', priceRange: '$30-100/night' },
        { name: 'Krabi Ao Nang', description: 'Beach area, restaurants', priceRange: '$25-80/night' },
        { name: 'Phuket Patong', description: 'Beach, nightlife', priceRange: '$30-120/night' },
      ],
      foodRecommendations: ['Pad Thai', 'Tom Yum soup', 'Green curry', 'Mango sticky rice', 'Som tam salad'],
      transportation: 'Domestic flights between cities. Grab/Bolt for Bangkok. Tuk-tuks and songthaews on islands.',
      packingList: ['Light clothing', 'Swimwear', 'Reef-safe sunscreen', 'Insect repellent', 'Temple-appropriate clothes', 'Waterproof bag'],
    },
  },
  {
    id: 12,
    slug: 'santorini-5-day-itinerary',
    title: '5 Days in Santorini: Greek Paradise',
    destination: 'Santorini, Greece',
    days: 5,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400',
    excerpt: 'Iconic white-washed buildings, stunning sunsets, volcanic beaches, and Mediterranean cuisine.',
    category: 'Island & Romance',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300',
      'https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=400&h=300',
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300',
    ],
    content: {
      overview: 'Santorini is the most romantic Greek island with dramatic cliffs, blue-domed churches, and legendary sunsets. This 5-day itinerary balances relaxation with exploration.',
      bestTime: 'May-June or September-October',
      budget: '$120-250 per day',
      highlights: [
        'Oia sunset views',
        'Volcanic caldera cruise',
        'Red and Black beaches',
        'Wine tasting at wineries',
        'White-washed villages',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & Fira',
          activities: ['Arrive Santorini', 'Check into hotel', 'Fira town exploration', 'Cable car or donkey ride', 'Evening in Fira'],
          tips: 'Book accommodation early. Oia more expensive than Fira.',
          bookingLinks: [
            { name: 'Santorini Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Santorini%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Oia Village & Sunset',
          activities: ['Morning in Fira', 'Bus to Oia', 'Blue domes photoshoot', 'Amoudi Bay', 'Lunch at seaside', 'Famous Oia sunset'],
          tips: 'Arrive Oia sunset spot 2 hours early. Very crowded.',
          bookingLinks: [
            { name: 'Santorini Photography Tour', url: 'https://www.getyourguide.com/s/?q=Santorini%20Photography%20Tour%20Oia&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Caldera Cruise',
          activities: ['Catamaran cruise', 'Hot springs swim', 'Volcanic islands', 'Snorkeling', 'BBQ lunch on boat', 'Sunset from water'],
          tips: 'Best way to see caldera. Book catamaran for comfort.',
          bookingLinks: [
            { name: 'Santorini Caldera Cruise', url: 'https://www.getyourguide.com/s/?q=Santorini%20Caldera%20Sunset%20Cruise&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Beach Day & Wineries',
          activities: ['Red Beach visit', 'Perissa Black Beach', 'Beach club lunch', 'Wine tasting tour', 'Santo Wines sunset', 'Dinner with view'],
          tips: 'Unique volcanic beaches. Bring water shoes for rocks.',
          bookingLinks: [
            { name: 'Santorini Wine Tasting Tour', url: 'https://www.getyourguide.com/s/?q=Santorini%20Wine%20Tasting%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Akrotiri & Departure',
          activities: ['Ancient Akrotiri ruins', 'Akrotiri Lighthouse', 'Last swimming', 'Souvenir shopping', 'Airport transfer'],
          tips: 'Akrotiri is Pompeii of Aegean. Well-preserved ruins.',
          bookingLinks: [
            { name: 'Akrotiri Archaeological Site', url: 'https://www.getyourguide.com/s/?q=Akrotiri%20Archaeological%20Site%20Santorini&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Fira', description: 'Central, caldera views, budget options', priceRange: '$100-300/night' },
        { name: 'Oia', description: 'Most scenic, romantic, luxury', priceRange: '$200-800/night' },
      ],
      foodRecommendations: ['Greek salad', 'Moussaka', 'Gyros', 'Fresh seafood', 'Baklava'],
      transportation: 'Rent ATV or car. Bus network good but limited. Taxis expensive.',
      packingList: ['Swimwear', 'Sun hat', 'Sunscreen SPF 50+', 'Light dresses/shirts', 'Comfortable sandals', 'Camera'],
    },
  },
  {
    id: 13,
    slug: 'london-6-day-itinerary',
    title: '6 Days in London: Royal & Modern',
    destination: 'London, UK',
    days: 6,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400',
    excerpt: 'Explore royal palaces, world-class museums, historic landmarks, and diverse neighborhoods.',
    category: 'City & History',
    images: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300',
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&h=300',
      'https://images.unsplash.com/photo-1520986606214-8b456906c813?w=400&h=300',
    ],
    content: {
      overview: 'London combines royal heritage with modern culture. This 6-day itinerary covers iconic sights, world-class museums, historic neighborhoods, and vibrant markets.',
      bestTime: 'May-September (warmest weather)',
      budget: '$120-220 per day',
      highlights: [
        'Tower of London and Crown Jewels',
        'Buckingham Palace Changing of Guard',
        'British Museum treasures',
        'Thames River cruise',
        'West End theatre show',
      ],
      days: [
        {
          day: 1,
          title: 'Westminster & Royal London',
          activities: ['Big Ben and Parliament', 'Westminster Abbey', 'Buckingham Palace', 'Changing of Guard', 'St. James\'s Park', 'Evening at Covent Garden'],
          tips: 'Changing of Guard at 11am (check schedule). Arrive early.',
          bookingLinks: [
            { name: 'Westminster Abbey Tickets', url: 'https://www.getyourguide.com/s/?q=Westminster%20Abbey%20London%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Tower of London & City',
          activities: ['Tower of London', 'Crown Jewels', 'Tower Bridge', 'Borough Market lunch', 'The Shard viewpoint', 'Thames cruise'],
          tips: 'Tower of London needs 3-4 hours. Book skip-line tickets.',
          bookingLinks: [
            { name: 'Tower of London Tickets', url: 'https://www.getyourguide.com/s/?q=Tower%20of%20London%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Museums Day',
          activities: ['British Museum', 'Natural History Museum', 'Victoria & Albert Museum', 'Hyde Park walk', 'Kensington Palace'],
          tips: 'Major museums free admission. Donations welcome.',
          bookingLinks: [
            { name: 'British Museum Tour', url: 'https://www.getyourguide.com/s/?q=British%20Museum%20Guided%20Tour%20London&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Harry Potter & Kings Cross',
          activities: ['Warner Bros Studio Tour', 'Harry Potter sets', 'Platform 9¾', 'Camden Market', 'Regent\'s Canal walk'],
          tips: 'Studio tour must-book in advance. Allow full morning.',
          bookingLinks: [
            { name: 'Harry Potter Studio Tour', url: 'https://www.getyourguide.com/s/?q=Harry%20Potter%20Studio%20Tour%20London&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Greenwich & East London',
          activities: ['Greenwich Maritime Museum', 'Royal Observatory', 'Prime Meridian', 'Cutty Sark', 'Canary Wharf', 'Shoreditch nightlife'],
          tips: 'Take Thames Clipper boat to Greenwich. Scenic route.',
          bookingLinks: [
            { name: 'Greenwich Tour', url: 'https://www.getyourguide.com/s/?q=Greenwich%20Royal%20Observatory%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Shopping & Departure',
          activities: ['Oxford Street shopping', 'Harrods', 'Portobello Road Market', 'Notting Hill', 'West End show', 'Farewell dinner'],
          tips: 'Book theatre tickets in advance. Leicester Square TKTS for deals.',
          bookingLinks: [
            { name: 'West End Theatre Tickets', url: 'https://www.getyourguide.com/s/?q=London%20West%20End%20Theatre%20Tickets&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Central London', description: 'Zone 1, near attractions', priceRange: '$120-300/night' },
        { name: 'South Bank', description: 'Thames views, walkable', priceRange: '$100-250/night' },
      ],
      foodRecommendations: ['Fish and chips', 'Afternoon tea', 'Sunday roast', 'Indian curry', 'Market food'],
      transportation: 'Oyster card or contactless for Tube/bus. Most efficient transport. Walking between zones.',
      packingList: ['Rain jacket', 'Umbrella', 'Comfortable shoes', 'Layers', 'Day bag', 'Power adapter (UK plug)'],
    },
  },
  {
    id: 14,
    slug: 'singapore-5-day-itinerary',
    title: '5 Days in Singapore: Garden City',
    destination: 'Singapore',
    days: 5,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400',
    excerpt: 'Futuristic architecture, diverse food culture, lush gardens, and vibrant neighborhoods.',
    category: 'City & Food',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300',
      'https://images.unsplash.com/photo-1543731068-9653d-9:81188?w=400&h=300',
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=400&h=300',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300',
    ],
    content: {
      overview: 'Singapore is a modern city-state with incredible diversity. This 5-day itinerary covers futuristic architecture, ethnic neighborhoods, world-class food, and green spaces.',
      bestTime: 'February-April (drier season)',
      budget: '$100-180 per day',
      highlights: [
        'Gardens by the Bay and Supertrees',
        'Marina Bay Sands skypark',
        'Hawker center food experience',
        'Sentosa Island attractions',
        'Ethnic neighborhoods exploration',
      ],
      days: [
        {
          day: 1,
          title: 'Marina Bay & Gardens',
          activities: ['Arrive Singapore', 'Marina Bay Sands SkyPark', 'Gardens by the Bay', 'Cloud Forest', 'Supertree Grove', 'Light show'],
          tips: 'Book SkyPark tickets online. Light show at 7:45pm & 8:45pm.',
          bookingLinks: [
            { name: 'Gardens by the Bay Tickets', url: 'https://www.klook.com/en-US/search/result/?query=Gardens%20by%20the%20Bay%20Singapore%20Tickets&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 2,
          title: 'Sentosa Island',
          activities: ['Cable car to Sentosa', 'Universal Studios', 'S.E.A. Aquarium', 'Beach time', 'Wings of Time show'],
          tips: 'Universal Studios full day. Buy Express Pass to skip lines.',
          bookingLinks: [
            { name: 'Universal Studios Singapore', url: 'https://www.klook.com/en-US/search/result/?query=Universal%20Studios%20Singapore%20Tickets&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 3,
          title: 'Cultural Neighborhoods',
          activities: ['Chinatown heritage', 'Buddha Tooth Relic Temple', 'Little India', 'Arab Street', 'Haji Lane', 'Kampong Glam Mosque'],
          tips: 'Each neighborhood has unique character. Spend time exploring.',
          bookingLinks: [
            { name: 'Singapore Cultural Tour', url: 'https://www.klook.com/en-US/search/result/?query=Singapore%20Cultural%20Neighborhoods%20Tour&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 4,
          title: 'Singapore Zoo & Night Safari',
          activities: ['Singapore Zoo morning', 'Lunch at zoo', 'River Wonders', 'Dinner break', 'Night Safari evening', 'Tram ride'],
          tips: 'Night Safari unique experience. Booking essential.',
          bookingLinks: [
            { name: 'Singapore Zoo & Night Safari', url: 'https://www.klook.com/en-US/search/result/?query=Singapore%20Zoo%20Night%20Safari%20Tickets&aid=12345', partner: 'klook' },
          ],
        },
        {
          day: 5,
          title: 'Shopping & Departure',
          activities: ['Orchard Road shopping', 'ION Sky observation', 'Hawker center lunch', 'Jewel Changi Airport', 'Rain Vortex', 'Departure'],
          tips: 'Jewel Changi worth visiting even if not flying. Amazing airport.',
          bookingLinks: [
            { name: 'Singapore City Tour', url: 'https://www.klook.com/en-US/search/result/?query=Singapore%20City%20Tour&aid=12345', partner: 'klook' },
          ],
        },
      ],
      accommodation: [
        { name: 'Marina Bay', description: 'Central, iconic views', priceRange: '$150-400/night' },
        { name: 'Chinatown', description: 'Cultural, affordable', priceRange: '$80-180/night' },
      ],
      foodRecommendations: ['Chicken rice', 'Laksa', 'Chili crab', 'Satay', 'Kaya toast'],
      transportation: 'MRT excellent. Buy EZ-Link card. Grab for taxis. Most areas walkable.',
      packingList: ['Light clothing', 'Umbrella', 'Sunscreen', 'Comfortable shoes', 'Light jacket for AC', 'Reusable bag'],
    },
  },
  {
    id: 15,
    slug: 'switzerland-8-day-itinerary',
    title: '8 Days in Switzerland: Alpine Beauty',
    destination: 'Switzerland',
    days: 8,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&h=400',
    excerpt: 'Majestic Alps, pristine lakes, charming villages, and scenic train journeys through breathtaking landscapes.',
    category: 'Nature & Adventure',
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300',
    ],
    content: {
      overview: 'Switzerland offers stunning Alpine scenery, pristine lakes, charming villages, and world-famous train routes. This 8-day itinerary covers highlights of Zurich, Lucerne, Interlaken, Zermatt, and scenic journeys.',
      bestTime: 'June-September (summer hiking) or December-March (skiing)',
      budget: '$180-350 per day',
      highlights: [
        'Jungfraujoch Top of Europe',
        'Matterhorn in Zermatt',
        'Scenic train routes',
        'Lake Lucerne cruise',
        'Swiss chocolate and cheese',
      ],
      days: [
        {
          day: 1,
          title: 'Arrive Zurich',
          activities: ['Arrive Zurich', 'Old Town walk', 'Bahnhofstrasse shopping', 'Lake Zurich', 'Swiss dinner'],
          tips: 'Buy Swiss Travel Pass for unlimited trains/boats. Great value.',
          bookingLinks: [
            { name: 'Zurich City Tour', url: 'https://www.getyourguide.com/s/?q=Zurich%20City%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 2,
          title: 'Zurich to Lucerne',
          activities: ['Train to Lucerne', 'Chapel Bridge', 'Lion Monument', 'Old Town', 'Lake Lucerne cruise', 'Mount Pilatus sunset'],
          tips: 'Lucerne most charming Swiss city. Very photogenic.',
          bookingLinks: [
            { name: 'Mount Pilatus Tour', url: 'https://www.getyourguide.com/s/?q=Mount%20Pilatus%20Lucerne%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 3,
          title: 'Lucerne to Interlaken',
          activities: ['Train to Interlaken', 'Harder Kulm viewpoint', 'Höheweg promenade', 'Adventure activities', 'Lake Thun or Brienz'],
          tips: 'Interlaken base for Jungfrau region. Book accommodation early.',
          bookingLinks: [
            { name: 'Harder Kulm Funicular', url: 'https://www.getyourguide.com/s/?q=Harder%20Kulm%20Interlaken&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 4,
          title: 'Jungfraujoch Top of Europe',
          activities: ['Early train to Jungfraujoch', 'Top of Europe', 'Ice Palace', 'Sphinx Observatory', 'Snow activities', 'Return Interlaken'],
          tips: 'Book tickets day before. Weather crucial - check forecast.',
          bookingLinks: [
            { name: 'Jungfraujoch Day Trip', url: 'https://www.getyourguide.com/s/?q=Jungfraujoch%20Top%20of%20Europe%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 5,
          title: 'Lauterbrunnen & Grindelwald',
          activities: ['Train to Lauterbrunnen', '72 waterfalls valley', 'Trümmelbach Falls', 'Grindelwald', 'First Cliff Walk', 'Mountain activities'],
          tips: 'Lauterbrunnen valley stunning. Consider paragliding.',
          bookingLinks: [
            { name: 'Grindelwald First Adventure', url: 'https://www.getyourguide.com/s/?q=Grindelwald%20First%20Cliff%20Walk&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 6,
          title: 'Interlaken to Zermatt',
          activities: ['Scenic train to Zermatt', 'Car-free village', 'Matterhorn views', 'Village exploration', 'Mountain restaurants'],
          tips: 'Zermatt car-free. Electric taxis only. Very charming.',
          bookingLinks: [
            { name: 'Zermatt Village Tour', url: 'https://www.getyourguide.com/s/?q=Zermatt%20Village%20Matterhorn%20Tour&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 7,
          title: 'Gornergrat & Matterhorn',
          activities: ['Gornergrat Railway', 'Matterhorn panorama', 'Hiking trails', 'Riffelberg stop', 'Photography', 'Swiss dinner'],
          tips: 'Best Matterhorn views from Gornergrat. Clear mornings best.',
          bookingLinks: [
            { name: 'Gornergrat Railway Tickets', url: 'https://www.getyourguide.com/s/?q=Gornergrat%20Railway%20Zermatt&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
        {
          day: 8,
          title: 'Return to Zurich & Departure',
          activities: ['Morning in Zermatt', 'Scenic train to Zurich', 'Last-minute shopping', 'Swiss chocolate', 'Airport departure'],
          tips: 'Train journey scenic. Allow 4+ hours for journey.',
          bookingLinks: [
            { name: 'Zurich Airport Transfer', url: 'https://www.getyourguide.com/s/?q=Zurich%20Airport%20Transfer&partner_id=YOUR_PARTNER_ID', partner: 'getyourguide' },
          ],
        },
      ],
      accommodation: [
        { name: 'Interlaken', description: 'Central base for Jungfrau', priceRange: '$150-350/night' },
        { name: 'Zermatt', description: 'Mountain village charm', priceRange: '$180-400/night' },
      ],
      foodRecommendations: ['Fondue', 'Raclette', 'Rösti', 'Swiss chocolate', 'Birchermüesli'],
      transportation: 'Swiss Travel Pass recommended. Trains punctual and scenic. Covers most transport.',
      packingList: ['Layers for altitude', 'Hiking boots', 'Sunglasses', 'Sunscreen', 'Rain jacket', 'Camera', 'Swiss adapter'],
    },
  },
];

// Environment variables for dynamic partner IDs
const getyourguidePartnerId = process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID;
const klookAffiliateId = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const localizedDestinations = getLocalizedDestinations(params.locale);
  const destination = localizedDestinations.find(d => d.slug === params.slug);
  if (!destination) return { title: 'Destination Not Found' };
  
  return {
    title: destination.title,
    description: destination.excerpt,
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const localizedDestinations = getLocalizedDestinations(params.locale);
  const destination = localizedDestinations.find(d => d.slug === params.slug);
  
  if (!destination) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 opacity-90"></div>
            <Image
              src={destination.image}
              alt={destination.title}
              width={1920}
              height={800}
              className="w-full h-full object-cover"
              priority
              quality={75}
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-sm mb-6 border-2 border-white/30">
                  <FiMapPin />
                  {destination.destination}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
                  {destination.title}
                </h1>
                <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
                  <span className="flex items-center gap-2">
                    <FiCalendar />
                    {destination.days} Days
                  </span>
                  <span>•</span>
                  <span>{destination.category}</span>
                  <span>•</span>
                  <span>{destination.content.budget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-100">
              {/* Back Button */}
              <div className="mb-8">
                <Link
                  href={`/${params.locale}/destinations`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all"
                >
                  <FiArrowLeft />
                  Back to Destinations
                </Link>
              </div>

              {/* Overview */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {destination.content.overview}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="font-bold text-blue-900 mb-1">Best Time to Visit</div>
                    <div className="text-blue-700">{destination.content.bestTime}</div>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="font-bold text-green-900 mb-1">Daily Budget</div>
                    <div className="text-green-700">{destination.content.budget}</div>
                  </div>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                    <div className="font-bold text-purple-900 mb-1">Duration</div>
                    <div className="text-purple-700">{destination.days} Days</div>
                  </div>
                </div>
              </section>

              {/* Image Gallery */}
              {destination.images && destination.images.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {destination.images.map((img, idx) => (
                    <div key={`gallery-${idx}`} className="relative h-48 rounded-xl overflow-hidden group cursor-pointer">
                      <Image
                        src={img}
                        alt={`${destination.destination} - Image ${idx + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        quality={70}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Highlights */}
              {destination.content.highlights && destination.content.highlights.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Trip Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.content.highlights.map((highlight, idx) => (
                    <div key={`highlight-${idx}`} className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200">
                      <FiCheckCircle className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                      <span className="text-gray-800 font-medium">{highlight}</span>
                    </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Day by Day Itinerary */}
              {destination.content.days && destination.content.days.length > 0 && (
                <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-8">
                  {destination.content.days.map((day, idx) => (
                    day && (
                    <div key={`day-${idx}`} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Day {day.day}</h3>
                          <p className="text-blue-600 font-semibold">{day.title}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-bold text-gray-800 mb-2">Activities:</h4>
                        <ul className="space-y-2">
                          {day.activities && Array.isArray(day.activities) && day.activities.map((activity, aidx) => (
                            <li key={`activity-${idx}-${aidx}`} className="flex items-start gap-2">
                              <FiCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {day.tips && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
                          <div className="font-bold text-yellow-900 mb-1">💡 Tip:</div>
                          <div className="text-yellow-800">{day.tips}</div>
                        </div>
                      )}
                      {day.bookingLinks && day.bookingLinks.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-700 mb-2">📍 Book Activities:</div>
                          <div className="flex flex-wrap gap-2">
                            {day.bookingLinks.map((link, lidx) => {
                              // Build URL with proper partner ID
                              const getyourguidePartnerId = 'WR3WGXW';
                              const klookAffiliateId = '107545';
                              let finalUrl = link.url;
                              if (link.partner === 'getyourguide' && getyourguidePartnerId) {
                                finalUrl = link.url.replace('YOUR_PARTNER_ID', getyourguidePartnerId);
                              } else if (link.partner === 'klook' && klookAffiliateId) {
                                finalUrl = link.url.replace('12345', klookAffiliateId);
                              }
                              
                              return (
                                <div key={`link-${idx}-${lidx}`} className="flex items-center gap-3">
                                  {link.partner === 'klook' && (
                                    <Image src="/klook.png" alt="Klook" width={48} height={48} className="object-contain flex-shrink-0" />
                                  )}
                                  {link.partner === 'getyourguide' && (
                                    <Image src="/getyourguide.png" alt="GetYourGuide" width={48} height={48} className="object-contain flex-shrink-0" />
                                  )}
                                  <a
                                    href={finalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg group flex-1"
                                  >
                                    <span>{link.name}</span>
                                    <FiExternalLink className="text-sm ml-auto" />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                    )
                  ))}
                </div>
              </section>
              )}

              {/* Accommodation */}
              {destination.content.accommodation && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {(typeof destination.content.accommodation === 'object' && 'title' in destination.content.accommodation) 
                    ? destination.content.accommodation.title 
                    : 'Where to Stay'}
                </h2>
                {(typeof destination.content.accommodation === 'object' && 'description' in destination.content.accommodation && destination.content.accommodation.description) && (
                  <p className="text-gray-700 mb-4">{destination.content.accommodation.description}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(typeof destination.content.accommodation === 'object' && 'options' in destination.content.accommodation && Array.isArray(destination.content.accommodation.options)) 
                    ? destination.content.accommodation.options.map((acc: any, idx: number) => {
                    // Determine if destination is in Asia for booking platform
                    const isAsianDestination = [1, 3, 11, 14].includes(destination.id); // Bali, Tokyo, Thailand, Singapore
                    
                    return (
                      <div key={`acc-${idx}`} className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-purple-900 mb-2">{acc.name}</h3>
                        <p className="text-gray-700 mb-2">{acc.description}</p>
                        <div className="text-purple-700 font-bold mb-4">{acc.priceRange}</div>
                        
                        {/* Hotel Booking Links */}
                        <div className="flex flex-wrap gap-3">
                          {isAsianDestination ? (
                            <a
                              href={`https://www.agoda.com/search?city=${encodeURIComponent(destination.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 px-5 py-2 bg-white rounded-lg border-2 border-purple-300 hover:border-purple-500 transition-all shadow-sm hover:shadow-md w-full"
                            >
                              <Image src="/agoda.png" alt="Agoda" width={80} height={80} className="object-contain" />
                              <span className="text-base font-semibold text-gray-700">Compare Prices</span>
                            </a>
                          ) : (
                            <a
                              href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(acc.name + ' ' + destination.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 px-5 py-2 bg-white rounded-lg border-2 border-purple-300 hover:border-purple-500 transition-all shadow-sm hover:shadow-md w-full"
                            >
                              <Image src="/booking.png" alt="Booking.com" width={80} height={80} className="object-contain" />
                              <span className="text-base font-semibold text-gray-700">Compare Prices</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  }) 
                    : Array.isArray(destination.content.accommodation) 
                    ? destination.content.accommodation.map((acc: any, idx: number) => {
                    const isAsianDestination = [1, 3, 11, 14].includes(destination.id);
                    return (
                      <div key={`acc-${idx}`} className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-purple-900 mb-2">{acc.name}</h3>
                        <p className="text-gray-700 mb-2">{acc.description}</p>
                        <div className="text-purple-700 font-bold mb-4">{acc.priceRange}</div>
                        <div className="flex flex-wrap gap-3">
                          {isAsianDestination ? (
                            <a href={`https://www.agoda.com/search?city=${encodeURIComponent(destination.destination)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-5 py-2 bg-white rounded-lg border-2 border-purple-300 hover:border-purple-500 transition-all shadow-sm hover:shadow-md w-full">
                              <Image src="/agoda.png" alt="Agoda" width={80} height={80} className="object-contain" />
                              <span className="text-base font-semibold text-gray-700">Compare Prices</span>
                            </a>
                          ) : (
                            <a href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(acc.name + ' ' + destination.destination)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-5 py-2 bg-white rounded-lg border-2 border-purple-300 hover:border-purple-500 transition-all shadow-sm hover:shadow-md w-full">
                              <Image src="/booking.png" alt="Booking.com" width={80} height={80} className="object-contain" />
                              <span className="text-base font-semibold text-gray-700">Compare Prices</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })
                    : null}
                </div>
              </section>
              )}

              {/* Food Recommendations */}
              {('food' in destination.content || 'foodRecommendations' in destination.content) && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {('food' in destination.content && typeof destination.content.food === 'object' && destination.content.food && 'title' in destination.content.food) 
                    ? destination.content.food.title 
                    : 'Must-Try Food'}
                </h2>
                {('food' in destination.content && typeof destination.content.food === 'object' && destination.content.food && 'description' in destination.content.food && destination.content.food.description) && (
                  <p className="text-gray-700 mb-4">{destination.content.food.description}</p>
                )}
                <div className="flex flex-wrap gap-3">
                  {('food' in destination.content && typeof destination.content.food === 'object' && destination.content.food && 'recommendations' in destination.content.food && Array.isArray(destination.content.food.recommendations)) ? (
                    destination.content.food.recommendations.map((food: any, idx: number) => (
                      <div key={`food-${idx}`} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium border-2 border-orange-300">
                        {food.dish || food}
                      </div>
                    ))
                  ) : ('foodRecommendations' in destination.content && Array.isArray(destination.content.foodRecommendations)) ? (
                    destination.content.foodRecommendations.map((food: any, idx: number) => (
                      <div key={`food-${idx}`} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium border-2 border-orange-300">
                        {food}
                      </div>
                    ))
                  ) : null}
                </div>
              </section>
              )}

              {/* Transportation */}
              {'transportation' in destination.content && destination.content.transportation && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {(typeof destination.content.transportation === 'object' && 'title' in destination.content.transportation) 
                    ? destination.content.transportation.title 
                    : 'Getting Around'}
                </h2>
                {(typeof destination.content.transportation === 'object' && 'description' in destination.content.transportation && destination.content.transportation.description) && (
                  <p className="text-gray-700 mb-4">{destination.content.transportation.description}</p>
                )}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  {(typeof destination.content.transportation === 'object' && 'options' in destination.content.transportation && Array.isArray(destination.content.transportation.options)) ? (
                    destination.content.transportation.options.map((option: any, idx: number) => (
                      <div key={`trans-${idx}`} className="mb-4 last:mb-0">
                        <div className="font-bold text-blue-900">{option.type}</div>
                        <p className="text-blue-700">{option.description}</p>
                        {option.tips && <p className="text-blue-600 text-sm mt-1">💡 {option.tips}</p>}
                      </div>
                    ))
                  ) : typeof destination.content.transportation === 'string' ? (
                    <p className="text-gray-800 leading-relaxed">{destination.content.transportation}</p>
                  ) : null}
                </div>
              </section>
              )}

              {/* Packing List - Optional Section */}
              {'packingList' in destination.content && Array.isArray(destination.content.packingList) && destination.content.packingList.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Packing List</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.content.packingList.map((item: string, idx: number) => (
                      <div key={`pack-${idx}`} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <FiCheckCircle className="text-green-600" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tips - Optional Section */}
              {'tips' in destination.content && Array.isArray(destination.content.tips) && destination.content.tips.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Travel Tips</h2>
                  <div className="space-y-3">
                    {destination.content.tips.map((tip: string, idx: number) => (
                      <div key={`tip-${idx}`} className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                        <span className="text-2xl">💡</span>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-black text-white mb-4">Ready to Plan Your Trip?</h2>
                <p className="text-xl text-white/90 mb-6">
                  Let our AI create a personalized itinerary for your {destination.destination} adventure
                </p>
                <Link
                  href={`/${params.locale}`}
                  className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl"
                >
                  Generate Custom Itinerary
                </Link>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
