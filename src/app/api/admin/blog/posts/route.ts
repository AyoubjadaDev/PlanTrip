import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, blogPosts } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import blogPostsData from '@/data/blogPosts';

export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    // Get database posts
    let dbPosts = [];
    if (status === 'draft' || status === 'published') {
      dbPosts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, status))
        .orderBy(desc(blogPosts.createdAt));
    } else {
      dbPosts = await db
        .select()
        .from(blogPosts)
        .orderBy(desc(blogPosts.createdAt));
    }

    // Get static posts from blogPosts.ts and flatten them with source metadata
    const staticPosts = Object.entries(blogPostsData).flatMap(([locale, posts]) =>
      posts.map(post => ({
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
        status: 'published' as const,
        author: post.author,
        createdAt: post.date,
        updatedAt: post.date,
        publishedAt: post.date,
        viewCount: 0,
        isStatic: true, // Flag to identify static posts
      }))
    );

    // Filter static posts by status if needed
    const filteredStaticPosts = status === 'draft' 
      ? [] // Static posts are always published
      : staticPosts;

    // Combine and sort by date
    const allPosts = [...dbPosts, ...filteredStaticPosts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(allPosts, { status: 200 });
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { title, description, content, image, category, slug, locale, readTime, tags } = body;

    // Validation
    if (!title || !slug || !description || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, description, content' },
        { status: 400 }
      );
    }

    // Validate locale
    const validLocales = ['en', 'fr', 'ar'];
    const selectedLocale = locale || 'en';
    if (!validLocales.includes(selectedLocale)) {
      return NextResponse.json(
        { error: 'Invalid locale. Must be en, fr, or ar' },
        { status: 400 }
      );
    }

    // Check slug uniqueness within the same locale
    const existingPost = await db.query.blogPosts.findFirst({
      where: sql`${blogPosts.slug} = ${slug} AND ${blogPosts.locale} = ${selectedLocale}`,
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const newPost = await db
      .insert(blogPosts)
      .values({
        title,
        slug,
        description,
        content,
        image: image || null,
        category: category || 'general',
        locale: selectedLocale,
        readTime: readTime || null,
        tags: tags || [],
        author: adminUser.name || 'Admin',
        status: 'draft',
        viewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('Blog post creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
