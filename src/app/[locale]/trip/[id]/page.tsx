import { notFound } from 'next/navigation';
import { db } from '@/db';
import { trips } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Footer from '@/components/Footer';
import TripDisplay from '@/components/TripDisplay';
import nextDynamic from 'next/dynamic';

const TripSubscribeForm = nextDynamic(() => import('@/components/TripSubscribeForm'), { ssr: false });

export const dynamic = 'force-dynamic';

export default async function TripPage({ params }: { params: { id: string; locale: string } }) {
  const trip = await db.query.trips.findFirst({
    where: eq(trips.id, params.id),
  });

  if (!trip) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <TripDisplay trip={trip} locale={params.locale} />
          {/* New Buttons Section */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
            <a
              href={`/${params.locale}`}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg overflow-hidden"
            >
              {/* Animated background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Content */}
              <span className="relative flex items-center gap-3">
                <svg 
                  className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-extrabold tracking-wide">Generate New Trip</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              
              {/* Sparkle effect */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
              <span className="absolute bottom-1 left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-150"></span>
            </a>
            <TripSubscribeForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
