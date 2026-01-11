import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Define blog slug patterns by locale
const frenchBlogSlugs = [
  'voyages-aventure-destinations-exotiques-2026',
  'weekend-european-cities-2026',
  'planification-voyage-groupe-guide-2026',
  'sejour-relaxation-spa-2026',
  'festivals-culturels-mondiaux-2026',
];

const arabicBlogSlugs = [
  'اجمل-وجهات-سياحية-2026',
  'رحلات-مغامرات-2026',
  'وجهات-سياحية-رومانسية-2026',
  'افضل-شواطئ-العالم-2026',
  'سياحة-عائلية-2026',
];

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'ar'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for mismatched blog locale/slug combinations
  const blogMatch = pathname.match(/^\/(en|fr|ar)\/blog\/([^\/]+)$/);
  
  if (blogMatch) {
    const locale = blogMatch[1];
    const slug = blogMatch[2];

    // Check if it's a French slug in wrong locale
    if (locale !== 'fr' && frenchBlogSlugs.includes(slug)) {
      // Redirect to French version or return 301 to blog index
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/blog`;
      return NextResponse.redirect(url, 301);
    }

    // Check if it's an Arabic slug in wrong locale
    if (locale !== 'ar' && arabicBlogSlugs.includes(slug)) {
      // Redirect to Arabic version or return 301 to blog index
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/blog`;
      return NextResponse.redirect(url, 301);
    }

    // Check if it's an English database article being accessed in wrong locale
    // (All database articles are English-only)
    if (locale !== 'en' && !frenchBlogSlugs.includes(slug) && !arabicBlogSlugs.includes(slug)) {
      // This is likely an English article accessed via FR/AR locale
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/blog`;
      return NextResponse.redirect(url, 301);
    }
  }

  // Continue with default intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};
