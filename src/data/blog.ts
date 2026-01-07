import type { BlogPost } from './blogPosts';
import { blogPosts as staticBlogPosts } from './blogPosts';
import { db } from '@/db';
import { blogPosts as blogPostsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export type { BlogPost };
export const blogPosts = staticBlogPosts;

// Extended BlogPost type that includes database fields
export interface ExtendedBlogPost extends BlogPost {
  id: string;
  viewCount?: number;
  status?: string;
  createdAt?: Date;
  isStatic?: boolean;
}

// Convert database post to BlogPost format
function dbPostToBlogPost(dbPost: any): ExtendedBlogPost {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.description || '',
    content: dbPost.content,
    category: dbPost.category,
    image: dbPost.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    author: dbPost.author,
    date: dbPost.publishedAt ? new Date(dbPost.publishedAt).toISOString().split('T')[0] : new Date(dbPost.createdAt).toISOString().split('T')[0],
    readTime: dbPost.readTime || '5 min read',
    tags: dbPost.tags || [],
    viewCount: dbPost.viewCount || 0,
    status: dbPost.status,
    createdAt: dbPost.createdAt,
    isStatic: false,
  };
}

export async function getBlogPosts(locale: string): Promise<ExtendedBlogPost[]> {
  try {
    // Get static posts
    const staticPosts: ExtendedBlogPost[] = (blogPosts[locale] || blogPosts.en).map(post => ({
      ...post,
      viewCount: 0,
      status: 'published',
      isStatic: true,
    }));

    // Get published database posts (all are English)
    // Only include them for 'en' locale since DB posts don't have locale field
    let dbBlogPosts: ExtendedBlogPost[] = [];
    
    if (locale === 'en') {
      const dbPosts = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.status, 'published'));

      dbBlogPosts = dbPosts.map(dbPostToBlogPost);
    }

    // Combine and sort by date (newest first)
    const allPosts = [...staticPosts, ...dbBlogPosts].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : new Date(a.date).getTime();
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : new Date(b.date).getTime();
      return dateB - dateA;
    });

    return allPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Fallback to static posts only
    return (blogPosts[locale] || blogPosts.en).map(post => ({
      ...post,
      viewCount: 0,
      status: 'published',
      isStatic: true,
    }));
  }
}

export async function getBlogPost(locale: string, slug: string): Promise<ExtendedBlogPost | undefined> {
  try {
    // Try to find in static posts first
    const staticPosts = blogPosts[locale] || blogPosts.en;
    const staticPost = staticPosts.find((post) => post.slug === slug);
    
    if (staticPost) {
      return {
        ...staticPost,
        viewCount: 0,
        status: 'published',
        isStatic: true,
      };
    }

    // Try to find in database (only for English locale since DB posts don't have locale field)
    if (locale === 'en') {
      const dbPost = await db
        .select()
        .from(blogPostsTable)
        .where(eq(blogPostsTable.slug, slug))
        .then(posts => posts.find(post => post.status === 'published'));

      if (dbPost) {
        return dbPostToBlogPost(dbPost);
      }
    }

    return undefined;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Fallback to static posts only
    const posts = blogPosts[locale] || blogPosts.en;
    const post = posts.find((p) => p.slug === slug);
    if (post) {
      return {
        ...post,
        viewCount: 0,
        status: 'published',
        isStatic: true,
      };
    }
    return undefined;
  }
}
