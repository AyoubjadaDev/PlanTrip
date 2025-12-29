'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Trip } from '@/db/schema';
import { FiCopy, FiDownload, FiSave, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


interface TripDisplayProps {
  trip: Trip;
  locale: string;
}

export default function TripDisplay({ trip, locale }: TripDisplayProps) {
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
      text += '\n';
    }

    if (itinerary.safetyTips?.length) {
      text += `${t('safetyTips')}:\n`;
      itinerary.safetyTips.forEach((tip: string) => {
        text += `- ${tip}\n`;
      });
    }

    return text;
  };

  const handleExportPDF = () => {
    // Create a professional PDF layout with logo and design
    const html = `
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.8; 
          color: #333; 
          background: #f9fafb;
        }
        .container { max-width: 900px; margin: 0 auto; background: white; }
        
        /* Header with Logo */
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
          border-bottom: 5px solid #764ba2;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }
        
        .logo-icon {
          font-size: 48px;
          margin-right: 15px;
        }
        
        .logo-text {
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        
        .tagline {
          font-size: 14px;
          opacity: 0.9;
          margin-top: 10px;
          font-style: italic;
        }
        
        /* Trip Title Section */
        .trip-header {
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          padding: 30px;
          margin: 20px;
          border-left: 5px solid #667eea;
          border-radius: 8px;
        }
        
        .trip-title {
          font-size: 28px;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 15px;
        }
        
        .trip-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          font-size: 14px;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .detail-label {
          font-weight: bold;
          color: #764ba2;
        }
        
        /* Sections */
        .section {
          padding: 30px;
          margin: 20px;
        }
        
        .section h2 {
          color: #667eea;
          font-size: 24px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 3px solid #667eea;
        }
        
        .section p {
          color: #555;
          margin-bottom: 15px;
          text-align: justify;
        }
        
        /* Day Sections */
        .day-section {
          margin: 25px 0;
          padding: 20px;
          background: #f9fafb;
          border-left: 4px solid #667eea;
          border-radius: 8px;
          page-break-inside: avoid;
        }
        
        .day-title {
          font-size: 18px;
          font-weight: bold;
          color: #764ba2;
          margin-bottom: 15px;
        }
        
        .activity {
          margin-bottom: 15px;
        }
        
        .activity-time {
          font-weight: bold;
          color: #667eea;
          margin-bottom: 5px;
          font-size: 16px;
        }
        
        .activity-content {
          color: #555;
          margin-left: 15px;
          line-height: 1.6;
        }
        
        /* Tips Sections */
        .tips-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 20px;
        }
        
        .tip-box {
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        
        .tip-box h3 {
          color: #764ba2;
          font-size: 16px;
          margin-bottom: 10px;
        }
        
        .tip-item {
          margin-bottom: 10px;
          color: #555;
          font-size: 13px;
          line-height: 1.5;
        }
        
        .tip-item:before {
          content: "✓ ";
          color: #667eea;
          font-weight: bold;
          margin-right: 5px;
        }
        
        /* Footer */
        .footer {
          background: #f3f4f6;
          padding: 20px;
          text-align: center;
          border-top: 2px solid #e5e7eb;
          font-size: 12px;
          color: #888;
          margin-top: 30px;
        }
        
        .footer-logo {
          font-size: 20px;
          margin-bottom: 5px;
        }
        
        /* Print adjustments */
        @media print {
          body { background: white; }
          .container { box-shadow: none; }
          page { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header with Logo -->
        <div class="header">
          <div class="logo-section">
            <div class="logo-icon">✈️</div>
            <div class="logo-text">PlanMyNextTravel</div>
          </div>
          <div class="tagline">AI-Powered Travel Itinerary Generator</div>
        </div>
        
        <!-- Trip Header -->
        <div class="trip-header">
          <div class="trip-title">${itinerary.title}</div>
          <div class="trip-details">
            <div class="detail-item">
              <span class="detail-label">📍 Destination:</span>
              <span>${trip.destination}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">💰 Budget:</span>
              <span style="text-transform: capitalize;">${trip.budget}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">📅 Duration:</span>
              <span>${new Date(trip.startDate).toLocaleDateString(locale)} - ${new Date(trip.endDate).toLocaleDateString(locale)}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">🎒 Travel Type:</span>
              <span style="text-transform: capitalize;">${trip.travelType}</span>
            </div>
          </div>
        </div>
        
        <!-- Overview -->
        <div class="section">
          <h2>${t('overview')}</h2>
          <p>${itinerary.overview}</p>
        </div>
        
        <!-- Day by Day Itinerary -->
        <div class="section">
          <h2>📋 Day-by-Day Itinerary</h2>
          ${itinerary.days.map((day: any) => `
            <div class="day-section">
              <div class="day-title">Day ${day.day} - ${day.date}</div>
              <div class="activity">
                <div class="activity-time">☀️ Morning</div>
                <div class="activity-content">${day.morning}</div>
              </div>
              <div class="activity">
                <div class="activity-time">🌤️ Afternoon</div>
                <div class="activity-content">${day.afternoon}</div>
              </div>
              <div class="activity">
                <div class="activity-time">🌙 Evening</div>
                <div class="activity-content">${day.evening}</div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Tips Sections -->
        <div class="tips-section">
          <div class="tip-box">
            <h3>💰 Budget Tips</h3>
            ${itinerary.budgetTips?.map((tip: string) => `<div class="tip-item">${tip}</div>`).join('') || ''}
          </div>
          
          <div class="tip-box">
            <h3>🏛️ Local Advice</h3>
            ${itinerary.localAdvice?.map((advice: string) => `<div class="tip-item">${advice}</div>`).join('') || ''}
          </div>
          
          <div class="tip-box">
            <h3>🛡️ Safety Tips</h3>
            ${itinerary.safetyTips?.map((tip: string) => `<div class="tip-item">${tip}</div>`).join('') || ''}
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">✈️ PlanMyNextTravel</div>
          <p>Generated on ${new Date().toLocaleDateString(locale)} at ${new Date().toLocaleTimeString(locale)}</p>
          <p>Explore the world with AI-powered travel planning</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Open print dialog with professional styling
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow?.document.write(html);
    printWindow?.document.close();
    
    // Update the filename to include website name and city
    const fileName = `PlanMyNextTravel-${trip.destination}`;
    
    // Wait a moment then print
    setTimeout(() => {
      printWindow?.print();
      // After print dialog opens, the user can save as PDF with the proper name
    }, 250);
  };

  return (
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
        {/* Share buttons above itinerary */}
        <div className="flex items-center gap-2 ml-4">
          <ShareButtons itineraryTitle={itinerary.title} locale={locale} />
        </div>
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
  );
}

// Update ShareButtons to avoid hydration errors
function ShareButtons({ itineraryTitle, locale }: { itineraryTitle: string; locale: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const url = window.location.href;
  return (
    <span className="flex items-center gap-2">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(itineraryTitle + '\n' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.2-3.67.96.98-3.58-.23-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
        <span className="sr-only">WhatsApp</span>
      </a>
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
        <span className="sr-only">Facebook</span>
      </a>
      {/* TikTok */}
      <a
        href={`https://www.tiktok.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(itineraryTitle)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on TikTok"
        className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 48 48"><path d="M41.5 17.5c-3.6 0-6.5-2.9-6.5-6.5V4h-6v28.5c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5 2-4.5 4.5-4.5c.5 0 1 .1 1.5.2v-6.2c-.5-.1-1-.1-1.5-.1-5.8 0-10.5 4.7-10.5 10.5S18.2 43 24 43s10.5-4.7 10.5-10.5V22c1.8 1 3.8 1.5 6 1.5v-6z"/></svg>
        <span className="sr-only">TikTok</span>
      </a>
    </span>
  );
}
