import type { BlogPost } from './blogPosts';
import { blogPosts as realBlogPosts } from './blogPosts';

export type { BlogPost };
export const blogPosts = realBlogPosts;

export function getBlogPosts(locale: string): BlogPost[] {
  return blogPosts[locale] || blogPosts.en;
}

export function getBlogPost(locale: string, slug: string): BlogPost | undefined {
  const posts = getBlogPosts(locale);
  return posts.find((post) => post.slug === slug);
}
