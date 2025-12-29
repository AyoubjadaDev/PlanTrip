import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/db';
import { users, blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const postId = params.id;

    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, postId),
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    const postId = params.id;
    const body = await request.json();
    const { title, description, content, image, category, status, slug } = body;

    // Check if post exists
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, postId),
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check slug uniqueness if slug is being updated
    if (slug && slug !== post.slug) {
      const existingPost = await db.query.blogPosts.findFirst({
        where: eq(blogPosts.slug, slug),
      });

      if (existingPost) {
        return NextResponse.json(
          { error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (slug !== undefined) updateData.slug = slug;
    
    // Handle status change
    if (status === 'published' && post.status === 'draft') {
      updateData.status = 'published';
      updateData.publishedAt = new Date();
    } else if (status !== undefined) {
      updateData.status = status;
    }

    const updatedPost = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, postId))
      .returning();

    return NextResponse.json(updatedPost[0], { status: 200 });
  } catch (error) {
    console.error('Blog post update error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const postId = params.id;

    // Check if post exists
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, postId),
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, postId));

    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Blog post delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
