import { db } from '@/db';
import { trips } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm/sql/functions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  // ...add more fields as needed
}

function getPageParam(searchParams: { [key: string]: string | string[] | undefined }): number {
  const page = searchParams?.page;
  if (!page) return 1;
  if (Array.isArray(page)) return parseInt(page[0], 10) || 1;
  return parseInt(page, 10) || 1;
}

export default async function MyTripsPage({ searchParams, params }: { searchParams: any; params: { locale: string } }) {
  const page = getPageParam(searchParams);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  // Fetch total count for pagination
  const totalTrips = await db.select({ count: count() }).from(trips);
  const total = totalTrips[0]?.count || 0;
  const totalPages = Math.ceil(total / pageSize);

  // Fetch paginated trips
  const tripRows = await db.select().from(trips).orderBy(trips.startDate).limit(pageSize).offset(offset);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-8">My Trips</h1>
          <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
            {tripRows.length === 0 && (
              <div className="text-center py-8 text-gray-500">No trips found.</div>
            )}
            {tripRows.map((trip: any) => (
              <div
                key={trip.id}
                className="flex flex-row items-center justify-between px-4 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
                  <span className="font-semibold text-base text-gray-900 truncate w-48 sm:w-64">{trip.name}</span>
                  <span className="text-gray-600 text-sm w-32 truncate">{trip.destination}</span>
                  <span className="text-gray-500 text-xs w-40">{trip.startDate} - {trip.endDate}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/${params.locale}/trip/${trip.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    View
                  </Link>
                  {/* Optional: Add delete button here if needed */}
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <Link
              href={`?page=${page - 1}`}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : 0}
            >
              Previous
            </Link>
            <span className="px-4">Page {page} of {totalPages}</span>
            <Link
              href={`?page=${page + 1}`}
              className={`px-3 py-1 rounded ${page === totalPages || totalPages === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              aria-disabled={page === totalPages || totalPages === 0}
              tabIndex={page === totalPages || totalPages === 0 ? -1 : 0}
            >
              Next
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
