import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/data/blog';
import { destinationDetailsFr } from '@/data/destination-details-fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://planmynexttravel.com';
  const locales = ['en', 'fr', 'ar'];
  
  const staticPages = [
    '',
    '/blog',
    '/about',
    '/destinations',
  ];

  // Generate static page URLs for all locales
  const staticUrls: MetadataRoute.Sitemap = [];
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      staticUrls.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : page === '/blog' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            fr: `${baseUrl}/fr${page}`,
            ar: `${baseUrl}/ar${page}`,
          },
        },
      });
    });
  });

  // Generate blog article URLs with proper locale handling
  const blogUrls: MetadataRoute.Sitemap = [];
  
  try {
    // Get posts for each locale separately (avoiding duplicates)
    const processedSlugs = new Set<string>();
    
    // French static posts (exist only in FR)
    const frPosts = await getBlogPosts('fr');
    frPosts.forEach((post) => {
      if (post.isStatic && !processedSlugs.has(`fr-${post.slug}`)) {
        processedSlugs.add(`fr-${post.slug}`);
        blogUrls.push({
          url: `${baseUrl}/fr/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'weekly',
          priority: 0.8,
          // French articles are only available in French
          alternates: {
            languages: {
              'x-default': `${baseUrl}/en/blog`,
            },
          },
        });
      }
    });

    // Arabic static posts (exist only in AR)
    const arPosts = await getBlogPosts('ar');
    arPosts.forEach((post) => {
      if (post.isStatic && !processedSlugs.has(`ar-${post.slug}`)) {
        processedSlugs.add(`ar-${post.slug}`);
        blogUrls.push({
          url: `${baseUrl}/ar/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'weekly',
          priority: 0.8,
          // Arabic articles are only available in Arabic
          alternates: {
            languages: {
              'x-default': `${baseUrl}/en/blog`,
            },
          },
        });
      }
    });

    // English posts (includes both static and database posts)
    const enPosts = await getBlogPosts('en');
    enPosts.forEach((post) => {
      if (!processedSlugs.has(`en-${post.slug}`)) {
        processedSlugs.add(`en-${post.slug}`);
        blogUrls.push({
          url: `${baseUrl}/en/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'weekly',
          priority: 0.8,
          // English articles are only available in English
          alternates: {
            languages: {
              'x-default': `${baseUrl}/en/blog/${post.slug}`,
            },
          },
        });
      }
    });
  } catch (error) {
    console.error('Error generating blog URLs for sitemap:', error);
    // Continue with static URLs only if blog fetch fails
  }

  // Generate destination URLs for all locales
  const destinationUrls: MetadataRoute.Sitemap = [];
  
  try {
    // Get all destination slugs (they are the same across all languages)
    const destinationSlugs = destinationDetailsFr.map(d => d.slug);
    
    destinationSlugs.forEach((slug) => {
      locales.forEach((locale) => {
        destinationUrls.push({
          url: `${baseUrl}/${locale}/destinations/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.9,
          alternates: {
            languages: {
              en: `${baseUrl}/en/destinations/${slug}`,
              fr: `${baseUrl}/fr/destinations/${slug}`,
              ar: `${baseUrl}/ar/destinations/${slug}`,
            },
          },
        });
      });
    });
  } catch (error) {
    console.error('Error generating destination URLs for sitemap:', error);
  }

  return [...staticUrls, ...blogUrls, ...destinationUrls];
}
