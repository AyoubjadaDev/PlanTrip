"use client";
import { NextIntlClientProvider } from 'next-intl';
import dynamic from 'next/dynamic';
import SessionProvider from '@/components/SessionProvider';
import CookieConsent from '@/components/CookieConsent';

// Lazy load newsletter popup as it's not critical
const NewsletterPopup = dynamic(() => import('@/components/NewsletterPopup'), {
  ssr: false,
});

export default function ClientLayout({ children, messages, locale }: { children: React.ReactNode; messages: any; locale: string }) {
  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
        <CookieConsent />
        <NewsletterPopup />
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
