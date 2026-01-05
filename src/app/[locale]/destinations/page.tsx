import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { destinationsEn } from '@/data/destinations-en';
import { destinationsFr } from '@/data/destinations-fr';
import { destinationsAr } from '@/data/destinations-ar';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5200';
  const pageUrl = `${baseUrl}/${params.locale}/destinations`;

  const titles: Record<string, string> = {
    en: 'Travel Destinations & Itineraries | PlanMyNextTravel',
    fr: 'Destinations de Voyage & Itinéraires | PlanMyNextTravel',
    ar: 'وجهات السفر وبرامج الرحلات | PlanMyNextTravel',
  };

  const descriptions: Record<string, string> = {
    en: 'Explore curated destination guides and day-by-day itineraries for popular travel destinations. Find detailed trip plans for Bali, Paris, Tokyo, and more.',
    fr: 'Explorez des guides de destinations et des itinéraires jour par jour pour des destinations de voyage populaires. Trouvez des plans de voyage détaillés pour Bali, Paris, Tokyo et plus encore.',
    ar: 'استكشف أدلة الوجهات المنسقة وبرامج الرحلات اليومية للوجهات السياحية الشهيرة. اعثر على خطط رحلات مفصلة لبالي وباريس وطوكيو والمزيد.',
  };

  return {
    title: titles[params.locale] || titles.en,
    description: descriptions[params.locale] || descriptions.en,
    keywords: 'travel destinations, itineraries, trip planning, destination guides, Bali itinerary, Paris guide, travel guides',
    openGraph: {
      title: titles[params.locale] || titles.en,
      description: descriptions[params.locale] || descriptions.en,
      url: pageUrl,
      siteName: 'PlanMyNextTravel',
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export const dynamic = "force-dynamic";

// Get localized destination data
function getLocalizedDestinations(locale: string) {
  const destinationsData: Record<string, typeof destinationsEn> = {
    en: destinationsEn,
    fr: destinationsFr,
    ar: destinationsAr,
  };
  return destinationsData[locale] || destinationsEn;
}

// Common destination images and details
const destinationDetails = [
  {
    id: 1,
    days: 5,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600',
    category: 'Beach & Culture',
  },
  {
    id: 2,
    days: 7,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600',
    category: 'City & Culture',
  },
  {
    id: 3,
    days: 10,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600',
    category: 'City & Food',
  },
  {
    id: 4,
    days: 8,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600',
    category: 'Nature & Adventure',
  },
  {
    id: 5,
    days: 12,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&h=600',
    category: 'Culture & Adventure',
  },
  {
    id: 6,
    days: 14,
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600',
    category: 'Nature & Adventure',
  },
  {
    id: 7,
    days: 7,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600',
    category: 'City & Luxury',
  },
  {
    id: 8,
    days: 7,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600',
    category: 'City & Culture',
  },
  {
    id: 9,
    days: 6,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600',
    category: 'History & Culture',
  },
  {
    id: 10,
    days: 7,
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600',
    category: 'City & Beach',
  },
  {
    id: 11,
    days: 10,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600',
    category: 'Culture & Beach',
  },
  {
    id: 12,
    days: 5,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600',
    category: 'Island & Romance',
  },
  {
    id: 13,
    days: 6,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600',
    category: 'City & History',
  },
  {
    id: 14,
    days: 5,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600',
    category: 'City & Food',
  },
  {
    id: 15,
    days: 8,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&h=600',
    category: 'Nature & Adventure',
  },
];

export default async function DestinationsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('destinations');
  const localizedDestinations = getLocalizedDestinations(params.locale);
  
  // Merge localized text with images and details
  const destinations = localizedDestinations.map(dest => {
    const details = destinationDetails.find(d => d.id === dest.id);
    return { ...dest, ...details };
  });

  const gradients = [
    'from-blue-500 via-cyan-500 to-teal-500',
    'from-purple-500 via-pink-500 to-red-500',
    'from-orange-500 via-yellow-500 to-green-500',
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-green-500 via-emerald-500 to-cyan-500',
    'from-red-500 via-rose-500 to-pink-500',
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <main className="flex-1 py-20">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center">
              <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold text-sm shadow-lg">
                🗺️ EXPLORE THE WORLD
              </div>
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
                Travel Destinations
              </h1>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
                Day-by-day itineraries for the world's most amazing destinations
              </p>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {destinations.map((destination, index) => (
                <article
                  key={destination.id}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-blue-300"
                >
                  {/* Image with Gradient Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={destination.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500'}
                      alt={destination.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading={index < 3 ? undefined : 'lazy'}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-20`}></div>
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-900 shadow-lg">
                      <FiCalendar className="inline mr-1" />
                      {destination.days} Days
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <FiMapPin className="text-blue-600" />
                      <span className="font-medium">{destination.destination}</span>
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {destination.title}
                    </h2>

                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-4">
                      {destination.category}
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3 font-medium leading-relaxed">
                      {destination.excerpt}
                    </p>

                    <Link
                      href={`/${params.locale}/destinations/${destination.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl group"
                    >
                      View Itinerary
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="text-4xl font-black text-white mb-4">
                Need a Custom Itinerary? 🤖
              </h2>
              <p className="text-xl text-white/90 mb-8 font-medium">
                Let our AI create a personalized trip plan just for you
              </p>
              <Link
                href={`/${params.locale}`}
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl"
              >
                Generate Your Trip Now
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
