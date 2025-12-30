'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Trip } from '@/db/schema';
import { FiCopy, FiDownload, FiSave, FiCalendar, FiMapPin } from 'react-icons/fi';

import { SubscribersListPopin } from './SubscribersListPopin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


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
        <div className="border-b bg-gray-50 px-8 py-4 flex flex-wrap items-center gap-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FiCopy />
            {copied ? t('copied') : t('copyToClipboard')}
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FiDownload />
            {t('exportPDF')}
          </button>
          <button
            onClick={() => router.push(`/${locale}`)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {t('generateNew')}
          </button>
        </div>
        {/* Content */}
        <div className="p-8">
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
              {itinerary.days.map((day: any) => (
                <div key={day.day} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-primary-600 mb-4">
                    {t('day')} {day.day} - {day.date}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">☀️ {t('morning')}</h4>
                      <p className="text-gray-700 leading-relaxed">{day.morning}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🌤️ {t('afternoon')}</h4>
                      <p className="text-gray-700 leading-relaxed">{day.afternoon}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🌙 {t('evening')}</h4>
                      <p className="text-gray-700 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>
                </div>
              ))}
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
            <section>
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
        </div>
      </div>

    </>
  );
}
