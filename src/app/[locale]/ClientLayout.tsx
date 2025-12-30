"use client";
import { NextIntlClientProvider } from 'next-intl';
import SessionProvider from '@/components/SessionProvider';
import CookieConsent from '@/components/CookieConsent';
import NewsletterPopup from '@/components/NewsletterPopup';

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
