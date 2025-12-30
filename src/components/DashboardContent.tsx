'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Trip } from '@/db/schema';
import { FiMapPin, FiCalendar, FiTrash2, FiShield } from 'react-icons/fi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardContentProps {
  trips: Trip[];
  locale: string;
  userName: string;
  isAdmin?: boolean;
}

export default function DashboardContent({ trips, locale, userName, isAdmin }: DashboardContentProps) {
  const t = useTranslations('dashboard');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(trips.length / pageSize);
  const router = useRouter();

  const handleDelete = async (tripId: string) => {
    if (!confirm(t('confirmDelete'))) return;

    setDeleting(tripId);
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    } finally {
      setDeleting(null);
    }
  };
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('welcome')}, {userName}!</p>
        </div>
        {isAdmin && (
          <Link
            href={`/${locale}/admin`}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FiShield className="text-xl" />
            <span className="font-semibold">Admin Panel</span>
          </Link>
        )}
      </div>
      {trips.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('noTrips')}</h2>
          <p className="text-gray-600 mb-6">{t('createFirst')}</p>
          <Link
            href={`/${locale}`}
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            {t('createFirst')}
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200 bg-white rounded-xl shadow-md">
            {trips.slice((page - 1) * pageSize, page * pageSize).map((trip) => {
              const itinerary = trip.itinerary as any;
              return (
                <div key={trip.id} className="flex flex-row items-center justify-between px-4 py-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
                    <span className="font-semibold text-base text-gray-900 truncate w-48 sm:w-64">{itinerary.title}</span>
                    <span className="text-gray-600 text-sm w-32 truncate">{trip.destination}</span>
                    <span className="text-gray-500 text-xs w-40">
                      {new Date(trip.startDate).toLocaleDateString(locale)} - {new Date(trip.endDate).toLocaleDateString(locale)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/${locale}/trip/${trip.id}`}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
                    >
                      {t('viewTrip')}
                    </Link>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      disabled={deleting === trip.id}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                      title={t('deleteTrip')}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Previous
            </button>
            <span className="px-4">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded ${page === totalPages || totalPages === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
