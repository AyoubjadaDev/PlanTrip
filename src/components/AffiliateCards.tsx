'use client';

import Image from 'next/image';
import { FiExternalLink, FiStar } from 'react-icons/fi';

export default function AffiliateCards() {
  const bookingUrl = `https://www.booking.com?aid=${process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID}`;
  const expediaUrl = `https://www.expedia.com?affcid=${process.env.NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID}`;

  return (
    <div className="my-12 space-y-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Book Your Adventure?
        </h3>
        <p className="text-gray-600">
          Find the best deals on hotels and accommodations with our trusted partners
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking.com Card */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-md">
                <Image
                  src="/booking.png"
                  alt="Booking.com"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-1">Booking.com</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.8/5)</span>
                </div>
              </div>
            </div>
            <FiExternalLink className="w-5 h-5 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>

          <p className="text-gray-700 mb-4">
            Book hotels, apartments, and unique stays worldwide. Free cancellation on most bookings.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Free Cancellation
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              Best Price Guarantee
            </div>
          </div>

          <div className="mt-4 text-blue-600 font-bold group-hover:text-blue-700 flex items-center gap-2">
            Search Hotels
            <span className="text-2xl">→</span>
          </div>
        </a>

        {/* Expedia Card */}
        <a
          href={expediaUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-md">
                <Image
                  src="/expedia.png"
                  alt="Expedia"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900 mb-1">Expedia</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.7/5)</span>
                </div>
              </div>
            </div>
            <FiExternalLink className="w-5 h-5 text-orange-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>

          <p className="text-gray-700 mb-4">
            Save more when you book flights + hotels together. Access exclusive member pricing and rewards.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
              Bundle & Save
            </div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
              Rewards Program
            </div>
          </div>

          <div className="mt-4 text-orange-600 font-bold group-hover:text-orange-700 flex items-center gap-2">
            Compare Prices
            <span className="text-2xl">→</span>
          </div>
        </a>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center mt-6">
        * We may earn a commission from bookings made through these links at no extra cost to you. This helps us keep our trip planning service free.
      </p>
    </div>
  );
}
