import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import blogPostsData from '@/data/blogPosts';

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string; id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify user is admin
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!adminUser?.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { locale, id } = params;

    // Find the static post
    const posts = blogPostsData[locale] || blogPostsData.en;
    const post = posts.find(p => p.id === id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Convert to API format
    const apiPost = {
      id: `static-${locale}-${post.id}`,
      title: post.title,
      slug: post.slug,
      description: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      locale: locale,
      readTime: post.readTime,
      tags: post.tags,
      status: 'published',
      author: post.author,
      createdAt: post.date,
      updatedAt: post.date,
      publishedAt: post.date,
      viewCount: 0,
      isStatic: true,
    };

    return NextResponse.json(apiPost, { status: 200 });
  } catch (error) {
    console.error('Static post fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
