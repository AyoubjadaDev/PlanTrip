import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, blogPosts } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

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

    if (status === 'draft' || status === 'published') {
      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.status, status))
        .orderBy(desc(blogPosts.createdAt));
      return NextResponse.json(posts, { status: 200 });
    }

    const allPosts = await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));

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
    const { title, description, content, image, category, slug } = body;

    // Validation
    if (!title || !slug || !description || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, description, content' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existingPost = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, slug),
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
