'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface BlogPostForm {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  locale: string;
  readTime: string;
  tags: string;
  status: string;
}

export default function EditBlogPostPage({ params }: { params: { locale: string; id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPostForm>({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    category: 'general',
    locale: 'en',
    readTime: '',
    tags: '',
    status: 'draft',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/${params.locale}/auth/signin`);
      return;
    }

    if (status === 'authenticated') {
      fetchPost();
    }
  }, [status, params.id, params.locale, router]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      
      // Check if it's a static post
      if (params.id.startsWith('static-')) {
        setIsStatic(true);
        // Extract locale and id from static post id format: static-en-1
        const parts = params.id.split('-');
        const locale = parts[1];
        const staticId = parts.slice(2).join('-');
        
        // Fetch from static posts
        const response = await fetch(`/api/admin/blog/static/${locale}/${staticId}`);
        if (!response.ok) throw new Error('Failed to fetch static post');
        
        const post = await response.json();
        setFormData({
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          image: post.image,
          category: post.category,
          locale: post.locale,
          readTime: post.readTime || '',
          tags: post.tags?.join(', ') || '',
          status: post.status || 'published',
        });
      } else {
        // Fetch from database
        const response = await fetch(`/api/admin/blog/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const post = await response.json();
        setFormData({
          title: post.title,
          slug: post.slug,
          description: post.description || '',
          content: post.content,
          image: post.image || '',
          category: post.category,
          locale: post.locale,
          readTime: post.readTime || '',
          tags: post.tags?.join(', ') || '',
          status: post.status,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Parse tags from comma-separated string
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      if (isStatic) {
        // Convert static post to database post
        const response = await fetch('/api/admin/blog/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            tags: tagsArray,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to save post');
        }

        alert('Static post has been converted to a database post. The original static post remains unchanged in blogPosts.ts.');
      } else {
        // Update existing database post
        const response = await fetch(`/api/admin/blog/${params.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            tags: tagsArray,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to update post');
        }
      }

      router.push(`/${params.locale}/admin`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    if (isStatic) {
      alert('Cannot delete static posts. Please edit the blogPosts.ts file directly.');
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      router.push(`/${params.locale}/admin`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/${params.locale}/admin`)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
          >
            ← Back to Admin
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {isStatic ? 'Edit Static Post (Will Create Copy)' : 'Edit Blog Post'}
          </h1>
          {isStatic && (
            <p className="text-sm text-orange-600 mt-2">
              ⚠️ Editing a static post will create a new database copy. The original in blogPosts.ts remains unchanged.
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language *
              </label>
              <select
                name="locale"
                value={formData.locale}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General</option>
                <option value="travel-tips">Travel Tips</option>
                <option value="destination">Destination Guide</option>
                <option value="budget">Budget Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Read Time
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g., 15 min read"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="travel, budget, 2026"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isStatic}
              className={`px-6 py-2 rounded-lg transition ${
                isStatic
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Delete Post
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push(`/${params.locale}/admin`)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {saving ? 'Saving...' : isStatic ? 'Create Copy' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
