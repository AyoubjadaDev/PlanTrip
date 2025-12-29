import { NextResponse } from 'next/server';
import { db } from '@/db';
import { groqApiKeys } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET: List all Groq API keys
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const keys = await db.select().from(groqApiKeys).orderBy(groqApiKeys.createdAt);
  return NextResponse.json(keys);
}

// POST: Add a new Groq API key
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { key } = await req.json();
  if (!key || typeof key !== 'string') {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 });
  }
  await db.insert(groqApiKeys).values({ key });
  return NextResponse.json({ success: true });
}

// DELETE: Remove a Groq API key
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  await db.delete(groqApiKeys).where(eq(groqApiKeys.id, id));
  return NextResponse.json({ success: true });
}
