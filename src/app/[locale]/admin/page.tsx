'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { BlogManagement } from '@/components/BlogManagement';
import { ContactMessagesManager } from '@/components/ContactMessagesManager';
import { AdvancedReporting } from '@/components/AdvancedReporting';
import { ApiKeyManagement } from '@/components/ApiKeyManagement';
import AdminSiteSettings from '@/components/AdminSiteSettings';

type TabType = 'analytics' | 'blog' | 'contacts' | 'reports' | 'api-keys' | 'google';

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'analytics', label: 'Analytics Dashboard', icon: '📊' },
  { id: 'blog', label: 'Blog Management', icon: '📝' },
  { id: 'contacts', label: 'Contact Messages', icon: '📧' },
  { id: 'reports', label: 'Advanced Reporting', icon: '📈' },
  { id: 'api-keys', label: 'API Keys', icon: '🔑' },
  { id: 'google', label: 'Google Integrations', icon: '🟦' },
];

export default function AdminPage({ params }: { params: { locale: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push(`/${params.locale}/auth/signin`);
      return;
    }

    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        
        if (response.status === 401) {
          router.push(`/${params.locale}/auth/signin`);
          return;
        }
        
        if (response.status === 403) {
          router.push(`/${params.locale}`);
          return;
        }
      } catch (err) {
        console.error('Error checking admin access:', err);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      checkAdmin();
    }
  }, [status, router, params.locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your platform, content, and analytics</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`px-4 py-4 font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analytics' && <AnalyticsDashboard />}
        {activeTab === 'blog' && <BlogManagement />}
        {activeTab === 'contacts' && <ContactMessagesManager />}
        {activeTab === 'reports' && <AdvancedReporting />}
        {activeTab === 'api-keys' && <ApiKeyManagement />}
        {activeTab === 'google' && <AdminSiteSettings />}
      </div>
    </div>
  );
}
