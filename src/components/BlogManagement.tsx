'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  category: string;
  locale: string;
  readTime?: string;
  tags?: string[];
  status: 'draft' | 'published';
  viewCount: number;
  author: string;
  createdAt: string;
  publishedAt: string | null;
  isStatic?: boolean;
}

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [filterStatus]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = filterStatus === 'all' 
        ? '/api/admin/blog/posts' 
        : `/api/admin/blog/posts?status=${filterStatus}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number | string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    // Check if it's a static post
    if (typeof id === 'string' && id.startsWith('static-')) {
      alert('Cannot delete static posts. Please edit the blogPosts.ts file directly.');
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  const togglePublish = async (id: number | string, currentStatus: string) => {
    // Check if it's a static post
    if (typeof id === 'string' && id.startsWith('static-')) {
      alert('Cannot modify static posts. Please edit the blogPosts.ts file directly.');
      return;
    }

    try {
      const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      setPosts(posts.map(p => p.id === id ? updatedPost : p));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showNewPostForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* New Post Form */}
      {showNewPostForm && (
        <NewBlogPostForm 
          onSuccess={() => {
            setShowNewPostForm(false);
            fetchPosts();
          }} 
        />
      )}

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {(['all', 'draft', 'published'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              filterStatus === status
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && ` (${posts.length})`}
          </button>
        ))}
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No blog posts found</div>
      ) : (
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    {post.isStatic && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Static
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {post.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.locale === 'en' ? '🇬🇧 EN' : post.locale === 'fr' ? '🇫🇷 FR' : '🇸🇦 AR'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>👤 {post.author}</span>
                    <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>👁️ {post.viewCount} views</span>
                    {post.readTime && <span>⏱️ {post.readTime}</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
                  >
                    {post.isStatic ? 'Copy & Edit' : 'Edit'}
                  </Link>
                  <button
                    onClick={() => togglePublish(post.id, post.status)}
                    disabled={post.isStatic}
                    className={`px-3 py-2 rounded hover:opacity-90 transition text-sm text-white ${
                      post.isStatic
                        ? 'bg-gray-400 cursor-not-allowed'
                        : post.status === 'published'
                        ? 'bg-yellow-600'
                        : 'bg-green-600'
                    }`}
                  >
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    disabled={post.isStatic}
                    className={`px-3 py-2 rounded transition text-sm ${
                      post.isStatic
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewBlogPostForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    category: 'general',
    locale: 'en',
    readTime: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Parse tags from comma-separated string to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

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
        throw new Error(error.error || 'Failed to create post');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="slug"
          placeholder="URL Slug (e.g., my-blog-post)"
          value={formData.slug}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="locale"
          value={formData.locale}
          onChange={handleChange}
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="ar">🇸🇦 العربية</option>
        </select>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="general">General</option>
          <option value="travel-tips">Travel Tips</option>
          <option value="destination">Destination Guide</option>
          <option value="budget">Budget Travel</option>
        </select>
        <input
          type="text"
          name="readTime"
          placeholder="Read Time (e.g., 15 min read)"
          value={formData.readTime}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="image"
          placeholder="Featured Image URL"
          value={formData.image}
          onChange={handleChange}
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated, e.g., travel, budget, 2026)"
          value={formData.tags}
          onChange={handleChange}
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="content"
          placeholder="Post Content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
