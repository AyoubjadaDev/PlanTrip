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
import { PartnerClicksAnalytics } from '@/components/PartnerClicksAnalytics';
import { FiMenu, FiX } from 'react-icons/fi';

type TabType = 'analytics' | 'blog' | 'contacts' | 'reports' | 'api-keys' | 'google' | 'partner-clicks';

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'analytics', label: 'Analytics Dashboard', icon: '📊' },
  { id: 'partner-clicks', label: 'Partner Clicks', icon: '🔗' },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          {/* Sidebar Header */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl mr-3">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* User Info */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                  {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{session?.user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <aside className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-xl mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* User Info */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{session?.user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="w-6"></div>
          </div>
        </header>

        {/* Page header - Desktop only */}
        <header className="hidden lg:block bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeTab === 'analytics' && 'View platform analytics and metrics'}
              {activeTab === 'partner-clicks' && 'Track partner link clicks and performance'}
              {activeTab === 'blog' && 'Create and manage blog posts'}
              {activeTab === 'contacts' && 'View and respond to contact messages'}
              {activeTab === 'reports' && 'Generate advanced reports and insights'}
              {activeTab === 'api-keys' && 'Manage API keys and access'}
              {activeTab === 'google' && 'Configure Google services integration'}
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 py-6 lg:px-8">
            {activeTab === 'analytics' && <AnalyticsDashboard />}
            {activeTab === 'partner-clicks' && <PartnerClicksAnalytics />}
            {activeTab === 'blog' && <BlogManagement />}
            {activeTab === 'contacts' && <ContactMessagesManager />}
            {activeTab === 'reports' && <AdvancedReporting />}
            {activeTab === 'api-keys' && <ApiKeyManagement />}
            {activeTab === 'google' && <AdminSiteSettings />}
          </div>
        </main>
      </div>
    </div>
  );
}
