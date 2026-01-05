'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Trip } from '@/db/schema';
import { FiCopy, FiDownload, FiSave, FiCalendar, FiMapPin } from 'react-icons/fi';
import SocialShare from './SocialShare';

import { SubscribersListPopin } from './SubscribersListPopin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PartnerLogos } from './PartnerLogo';


interface TripDisplayProps {
  trip: Trip;
  locale: string;
}

export default function TripDisplay({ trip, locale }: TripDisplayProps) {
    // Export trip details as PDF (basic print dialog for now)
    const handleExportPDF = () => {
      window.print();
    };
  const t = useTranslations('itinerary');
  const { data: session } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const itinerary = trip.itinerary as any;

  // Track partner link clicks
  const trackPartnerClick = async (partnerId: string, linkType: string) => {
    try {
      await fetch('/api/tracking/partner-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: trip.id,
          partnerId,
          linkType,
          destination: trip.destination,
        }),
      });
    } catch (error) {
      console.error('Error tracking partner click:', error);
    }
  };

  // Budget estimation function - deterministic to avoid hydration errors
  const estimateDailyBudget = (budget: string, dayNumber: number) => {
    const budgetRanges = {
      low: { min: 30, max: 60 },
      medium: { min: 80, max: 150 },
      high: { min: 200, max: 400 }
    };
    
    const range = budgetRanges[budget as keyof typeof budgetRanges] || budgetRanges.medium;
    // Use day number for deterministic variation
    const variation = (dayNumber * 7) % (range.max - range.min);
    const estimate = range.min + variation;
    return estimate;
  };

  const handleCopy = async () => {
    const text = generateTextContent();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateTextContent = () => {
    let text = `${itinerary.title}\n\n`;
    text += `${t('overview')}: ${itinerary.overview}\n\n`;
    itinerary.days.forEach((day: any) => {
      text += `${t('day')} ${day.day} - ${day.date}\n`;
      text += `${t('morning')}: ${day.morning}\n`;
      text += `${t('afternoon')}: ${day.afternoon}\n`;
      text += `${t('evening')}: ${day.evening}\n\n`;
    });
    if (itinerary.budgetTips?.length) {
      text += `${t('budgetTips')}:\n`;
      itinerary.budgetTips.forEach((tip: string) => {
        text += `- ${tip}\n`;
      });
      text += '\n';
    }
    if (itinerary.localAdvice?.length) {
      text += `${t('localAdvice')}:\n`;
      itinerary.localAdvice.forEach((advice: string) => {
        text += `- ${advice}\n`;
      });
    }
    return text;
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-8">
          <h1 className="text-4xl font-bold mb-4">{itinerary.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FiMapPin />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>
                {new Date(trip.startDate).toLocaleDateString(locale)} -{' '}
                {new Date(trip.endDate).toLocaleDateString(locale)}
              </span>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="border-b bg-gray-50 px-4 md:px-6 py-3">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
            >
              <FiCopy className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? t('copied') : t('copyToClipboard')}</span>
              <span className="sm:hidden">{copied ? t('copied') : t('copyToClipboard')}</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
            >
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">{t('exportPDF')}</span>
              <span className="sm:hidden">{t('exportPDF')}</span>
            </button>
            
            {/* Social Share Buttons */}
            <div className="ml-auto">
              <SocialShare 
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title={`${itinerary.title} - ${trip.destination}`}
                description={itinerary.overview}
              />
            </div>
            
            <button
              onClick={() => router.push(`/${locale}`)}
              className="group relative inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base font-bold overflow-hidden w-full sm:w-auto justify-center mt-2 sm:mt-0"
            >
              {/* Animated background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Content */}
              <span className="relative flex items-center gap-2">
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-90 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-extrabold tracking-wide">{t('generateNew')}</span>
              </span>
              
              {/* Sparkle effect */}
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
            </button>
          </div>
        </div>
        {/* Content with Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-6 p-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Booking Options - Before Itinerary */}
            {itinerary.bookingLinks && (
              <section className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Flight Card */}
                  {itinerary.bookingLinks.flights && (
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-[70px] md:w-[90px] flex-shrink-0">
                          <PartnerLogos.Expedia />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                            {t('flightsTo')} {trip.destination}
                          </h3>
                          <p className="text-xs text-gray-500">{t('cheapestFlight')}</p>
                        </div>
                      </div>
                      <a
                        href={itinerary.bookingLinks.flights.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        onClick={() => trackPartnerClick('expedia', 'flight')}
                        className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer text-sm"
                      >
                        {t('compareFlightPrices')}
                      </a>
                    </div>
                  )}

                  {/* Hotel Card */}
                  {itinerary.bookingLinks.hotels && (
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-[70px] md:w-[90px] flex-shrink-0">
                          {itinerary.bookingLinks.hotels.primary.provider === 'agoda' ? (
                            <PartnerLogos.Agoda />
                          ) : itinerary.bookingLinks.hotels.primary.provider === 'booking' ? (
                            <PartnerLogos.Booking />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm md:text-base">{t('hotelsForDates')}</h3>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {t('greatOptions')} {new Date(trip.startDate).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}–
                            {new Date(trip.endDate).toLocaleDateString(locale, { day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <a
                        href={itinerary.bookingLinks.hotels.primary.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        onClick={() => trackPartnerClick(itinerary.bookingLinks.hotels.primary.provider, 'hotel')}
                        className="block w-full text-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition font-semibold cursor-pointer text-sm"
                      >
                        {t('viewHotelDeals')}
                      </a>
                      {itinerary.bookingLinks.hotels.alternative && (
                        <a
                          href={itinerary.bookingLinks.hotels.alternative.searchUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          onClick={() => trackPartnerClick('expedia', 'hotel')}
                          className="flex items-center justify-center gap-2 w-full bg-white border-2 border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition font-medium text-xs cursor-pointer mt-2"
                        >
                          <img src="/Expedia-Symbol.png" alt="Expedia" className="h-4 w-auto" />
                          <span>{t('comparePricesOn')} Expedia</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('overview')}</h2>
              <p className="text-gray-700 leading-relaxed">{itinerary.overview}</p>
            </section>

            {/* Day by Day */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('title')}
              </h2>
              <div className="space-y-6">
                {itinerary.days.map((day: any) => {
                  const dailyBudget = estimateDailyBudget(trip.budget, day.day);
                  return (
                  <div key={day.day} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className="text-base sm:text-lg font-semibold text-orange-600">
                        {t('day')} {day.day} - {day.date}
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2 bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg border-2 border-green-200 whitespace-nowrap">
                        <span className="text-[10px] sm:text-sm font-medium text-gray-600">Est. Budget:</span>
                        <span className="text-sm sm:text-lg font-bold text-green-600">${dailyBudget}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">☀️ {t('morning')}</h4>
                        <p className="text-gray-700 leading-relaxed">{day.morning}</p>
                        
                        {/* Activity suggestion links in morning */}
                        {day.suggestedActivities && day.suggestedActivities.length > 0 && itinerary.bookingLinks?.activities?.searchUrl && (
                          <div className="mt-3 space-y-2">
                            {day.suggestedActivities.slice(0, 1).map((activity: string, idx: number) => {
                              const url = new URL(itinerary.bookingLinks.activities.searchUrl);
                              const searchParam = itinerary.bookingLinks.activities.provider === 'getyourguide' ? 'q' : 'query';
                              url.searchParams.set(searchParam, `${trip.destination} ${activity}`);
                              const activityUrl = url.toString();
                              return (
                                <a
                                  key={idx}
                                  href={activityUrl}
                                  target="_blank"
                                  rel="noopener noreferrer nofollow"
                                  onClick={() => trackPartnerClick(itinerary.bookingLinks.activities.provider, 'activity')}
                                  className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition cursor-pointer"
                                >
                                  <div className="w-[35px]">
                                    {itinerary.bookingLinks.activities.provider === 'klook' ? (
                                      <PartnerLogos.Klook />
                                    ) : itinerary.bookingLinks.activities.provider === 'getyourguide' ? (
                                      <PartnerLogos.GetYourGuide />
                                    ) : null}
                                  </div>
                                  <span className="text-blue-600 hover:underline font-medium">{t('explore')} {activity}</span>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">🌤️ {t('afternoon')}</h4>
                        <p className="text-gray-700 leading-relaxed">{day.afternoon}</p>
                        
                        {/* Activity suggestion links in afternoon */}
                        {day.suggestedActivities && day.suggestedActivities.length > 1 && itinerary.bookingLinks?.activities?.searchUrl && (
                          <div className="mt-3 space-y-2">
                            {day.suggestedActivities.slice(1, 2).map((activity: string, idx: number) => {
                              const url = new URL(itinerary.bookingLinks.activities.searchUrl);
                              const searchParam = itinerary.bookingLinks.activities.provider === 'getyourguide' ? 'q' : 'query';
                              url.searchParams.set(searchParam, `${trip.destination} ${activity}`);
                              const activityUrl = url.toString();
                              return (
                                <a
                                  key={idx}
                                  href={activityUrl}
                                  target="_blank"
                                  rel="noopener noreferrer nofollow"
                                  onClick={() => trackPartnerClick(itinerary.bookingLinks.activities.provider, 'activity')}
                                  className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition cursor-pointer"
                                >
                                  <div className="w-[35px]">
                                    {itinerary.bookingLinks.activities.provider === 'klook' ? (
                                      <PartnerLogos.Klook />
                                    ) : itinerary.bookingLinks.activities.provider === 'getyourguide' ? (
                                      <PartnerLogos.GetYourGuide />
                                    ) : null}
                                  </div>
                                  <span className="text-blue-600 hover:underline font-medium">{t('explore')} {activity}</span>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">🌙 {t('evening')}</h4>
                        <p className="text-gray-700 leading-relaxed">{day.evening}</p>
                        
                        {/* Activity suggestion links in evening */}
                        {day.suggestedActivities && day.suggestedActivities.length > 2 && itinerary.bookingLinks?.activities?.searchUrl && (
                          <div className="mt-3 space-y-2">
                            {day.suggestedActivities.slice(2, 3).map((activity: string, idx: number) => {
                              const url = new URL(itinerary.bookingLinks.activities.searchUrl);
                              const searchParam = itinerary.bookingLinks.activities.provider === 'getyourguide' ? 'q' : 'query';
                              url.searchParams.set(searchParam, `${trip.destination} ${activity}`);
                              const activityUrl = url.toString();
                              return (
                                <a
                                  key={idx}
                                  href={activityUrl}
                                  target="_blank"
                                  rel="noopener noreferrer nofollow"
                                  onClick={() => trackPartnerClick(itinerary.bookingLinks.activities.provider, 'activity')}
                                  className="inline-flex items-center gap-2 text-sm hover:opacity-80 transition cursor-pointer"
                                >
                                  <div className="w-[35px]">
                                    {itinerary.bookingLinks.activities.provider === 'klook' ? (
                                      <PartnerLogos.Klook />
                                    ) : itinerary.bookingLinks.activities.provider === 'getyourguide' ? (
                                      <PartnerLogos.GetYourGuide />
                                    ) : null}
                                  </div>
                                  <span className="text-blue-600 hover:underline font-medium">{t('explore')} {activity}</span>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
            </section>
            {/* Budget Tips */}
            {itinerary.budgetTips?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 {t('budgetTips')}</h2>
                <ul className="space-y-2">
                  {itinerary.budgetTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {/* Local Advice */}
            {itinerary.localAdvice?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🗺️ {t('localAdvice')}</h2>
                <ul className="space-y-2">
                  {itinerary.localAdvice.map((advice: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-gray-700">{advice}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {/* Safety Tips */}
            {itinerary.safetyTips?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🛡️ {t('safetyTips')}</h2>
                <ul className="space-y-2">
                  {itinerary.safetyTips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Booking Options - After Itinerary */}
            {itinerary.bookingLinks && (
              <section className="mt-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">🔖 {t('bookingOptions')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Flight Card */}
                  {itinerary.bookingLinks.flights && (
                    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-[70px] md:w-[90px] flex-shrink-0">
                          <PartnerLogos.Expedia />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">
                            {t('flightsTo')} {trip.destination}
                          </h3>
                          <p className="text-xs text-gray-500">{t('cheapestFlight')}</p>
                        </div>
                      </div>
                      <a
                        href={itinerary.bookingLinks.flights.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        onClick={() => trackPartnerClick('expedia', 'flight')}
                        className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer text-sm"
                      >
                        {t('compareFlightPrices')}
                      </a>
                    </div>
                  )}

                  {/* Hotel Card */}
                  {itinerary.bookingLinks.hotels && (
                    <div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-[70px] md:w-[90px] flex-shrink-0">
                          {itinerary.bookingLinks.hotels.primary.provider === 'agoda' ? (
                            <PartnerLogos.Agoda />
                          ) : itinerary.bookingLinks.hotels.primary.provider === 'booking' ? (
                            <PartnerLogos.Booking />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm md:text-base">{t('hotelsForDates')}</h3>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {t('greatOptions')} {new Date(trip.startDate).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}–
                            {new Date(trip.endDate).toLocaleDateString(locale, { day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <a
                        href={itinerary.bookingLinks.hotels.primary.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        onClick={() => trackPartnerClick(itinerary.bookingLinks.hotels.primary.provider, 'hotel')}
                        className="block w-full text-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition font-semibold cursor-pointer text-sm"
                      >
                        {t('viewHotelDeals')}
                      </a>
                      {itinerary.bookingLinks.hotels.alternative && (
                        <a
                          href={itinerary.bookingLinks.hotels.alternative.searchUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          onClick={() => trackPartnerClick('expedia', 'hotel')}
                          className="flex items-center justify-center gap-2 w-full bg-white border-2 border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition font-medium text-xs cursor-pointer mt-2"
                        >
                          <img src="/Expedia-Symbol.png?v=1" alt="Expedia" className="h-4 w-auto" />
                          <span>{t('comparePricesOn')} Expedia</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

    </>
  );
}




