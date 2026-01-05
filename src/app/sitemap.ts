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

  // Generate blog article URLs for all locales with error handling
  const blogUrls: MetadataRoute.Sitemap = [];
  
  try {
    for (const locale of locales) {
      const posts = await getBlogPosts(locale);
      posts.forEach((post) => {
        blogUrls.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: {
              en: `${baseUrl}/en/blog/${post.slug}`,
              fr: `${baseUrl}/fr/blog/${post.slug}`,
              ar: `${baseUrl}/ar/blog/${post.slug}`,
            },
          },
        });
      });
    }
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
