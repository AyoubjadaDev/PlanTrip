"use client";
import { NextIntlClientProvider } from 'next-intl';
import dynamicImport from 'next/dynamic';
import SessionProvider from '@/components/SessionProvider';
import CookieConsent from '@/components/CookieConsent';
import Header from '@/components/Header';

// Lazy load newsletter popup as it's not critical
const NewsletterPopup = dynamicImport(() => import('@/components/NewsletterPopup'), {
  ssr: false,
});

export default function ClientLayout({ children, messages, locale }: { children: React.ReactNode; messages: any; locale: string }) {
  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Header />
        {children}
        <CookieConsent />
        <NewsletterPopup />
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
