
import { getMessages } from 'next-intl/server';
import { Inter, Cairo } from 'next/font/google';
import { locales } from '@/i18n';
import ClientLayout from './ClientLayout';
import '../globals.css';
import { getSiteSettings } from '@/lib/siteSettings';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5200'),
  title: {
    default: 'PlanMyNextTravel - AI-Powered Travel Itinerary Generator',
    template: '%s | PlanMyNextTravel',
  },
  description: 'Create personalized travel itineraries with AI. Get budget estimates, activities, and day-by-day plans for your perfect trip. Free, multilingual, and instant results.',
  keywords: 'travel planner, itinerary generator, vacation planner, travel planning, AI travel assistant, budget travel, itinerary maker, travel recommendations, personalized travel, trip planner, travel guide, trip organizer',
  authors: [{ name: 'PlanMyNextTravel', url: 'https://planmynexttravel.com' }],
  creator: 'PlanMyNextTravel',
  publisher: 'PlanMyNextTravel',
  // Google AdSense site verification
  verification: {
    google: 'heDb981JNpGgoZZ81wdl4xLka2o4iek6OFdEl2IISfk',
  },
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'PlanMyNextTravel',
    title: 'PlanMyNextTravel - AI-Powered Trip Planner & Itinerary Generator',
    description: 'Create personalized travel itineraries with AI. Get budget estimates, activities, and day-by-day plans for your perfect trip.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlanMyNextTravel - AI-Powered Trip Planner',
    description: 'Create personalized travel itineraries with AI. Free, multilingual, and instant results.',
    creator: '@planmynexttravel',
    images: ['/og-image.jpg'],
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
  ],
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://planmynexttravel.com',
    languages: {
      'en': 'https://planmynexttravel.com/en',
      'fr': 'https://planmynexttravel.com/fr',
      'ar': 'https://planmynexttravel.com/ar',
    },
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const isRTL = locale === 'ar';
  const settings = await getSiteSettings();

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        {/* Google Analytics (dynamic) */}
        {settings?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
        {/* Google Search Console Meta (dynamic) */}
        {settings?.googleSearchConsoleMeta && (
          // Only allow <meta ...> tags in <head>, never <div>
          settings.googleSearchConsoleMeta.includes('<meta')
            ? (() => {
                // Extract attributes from the meta tag string
                const match = settings.googleSearchConsoleMeta.match(/<meta([^>]*)>/i);
                if (match) {
                  // Parse attributes into an object
                  const attrs = {} as Record<string, string>;
                  match[1].replace(/([a-zA-Z0-9\-:]+)=["']([^"']+)["']/g, (_: any, key: string, value: string) => {
                    attrs[key] = value;
                    return '';
                  });
                  return <meta {...attrs} />;
                }
                return null;
              })()
            : <meta name="google-site-verification" content={settings.googleSearchConsoleMeta} />
        )}
        {/* Google AdSense Script (dynamic) */}
        {settings?.googleAdsenseCode && (
          // Only allow <script> tags in <head>
          settings.googleAdsenseCode.includes('<script')
            ? (() => {
                // Extract attributes and content from the script tag string
                const match = settings.googleAdsenseCode.match(/<script([^>]*)>([\s\S]*?)<\/script>/i);
                if (match) {
                  // Parse attributes into an object
                  const attrs = {} as Record<string, string>;
                  match[1].replace(/([a-zA-Z0-9\-:]+)=["']([^"']+)["']/g, (_: any, key: string, value: string) => {
                    attrs[key] = value;
                    return '';
                  });
                  return <script {...attrs} dangerouslySetInnerHTML={{ __html: match[2] }} />;
                }
                return null;
              })()
            : <script dangerouslySetInnerHTML={{ __html: settings.googleAdsenseCode }} />
        )}
      </head>
      <body>
        <ClientLayout messages={messages} locale={locale}>{children}</ClientLayout>
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'PlanMyNextTravel',
              url: 'https://planmynexttravel.com',
              description: 'AI-powered trip planner that creates personalized travel itineraries with budget estimates, activities, and day-by-day plans.',
              applicationCategory: 'TravelApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '1250',
              },
              author: {
                '@type': 'Organization',
                name: 'PlanMyNextTravel',
                url: 'https://planmynexttravel.com',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
