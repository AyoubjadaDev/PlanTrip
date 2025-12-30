import { notFound } from 'next/navigation';
import { db } from '@/db';
import { trips } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Header from '@/components/Header';

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
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <TripDisplay trip={trip} locale={params.locale} />
          {/* New Buttons Section */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t pt-8">
            <a
              href={`/${params.locale}`}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-lg mb-2 md:mb-0"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Generate New Trip
              </span>
            </a>
            <TripSubscribeForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
