import AdminSiteSettings from './AdminSiteSettings';
'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiMap, FiTrendingUp, FiCalendar, FiMail, FiClock, FiDollarSign, FiDownload, FiActivity, FiMapPin, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
  createdAt: string;
}

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelType: string;
  activities: string[];
  language: string;
  createdAt: string;
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  } | null;
}

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

interface Stats {
  totalUsers: number;
  totalTrips: number;
  totalSubscribers: number;
  recentUsers: User[];
  recentTrips: Trip[];
  recentSubscribers: Subscriber[];
  tripsPerDay: { date: string; count: number }[];
  topDestinations: { destination: string; count: number }[];
  budgetDistribution: { budget: string; count: number }[];
  travelTypeDistribution: { travelType: string; count: number }[];
  topActivities: { activity: string; count: number }[];
}

// Fetch all subscribers for the admin tab
function useAllSubscribers(activeTab: string) {
  const [allSubscribers, setAllSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (activeTab === 'subscribers') {
      setLoading(true);
      fetch('/api/subscribers')
        .then(res => res.json())
        .then(data => setAllSubscribers(data.subscribers || []))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);
  return { allSubscribers, loading };
}
interface GroqApiKey {
  id: string;
  key: string;
  createdAt: string;
  isActive: boolean;
  usageCount: number;
}

interface ApiKeyTestResult {
  id: string;
  status: 'VALID' | 'INVALID' | 'ERROR' | 'TESTING' | null;
  message: string;
}

interface AdminDashboardWrapperProps {
  locale: string;
  stats: Stats;
}

export function AdminDashboardWrapper({ locale, stats }: AdminDashboardWrapperProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'trips' | 'subscribers' | 'groq'>('analytics');
  const { allSubscribers, loading: loadingSubscribers } = useAllSubscribers(activeTab);
  const [groqKeys, setGroqKeys] = useState<GroqApiKey[]>([]);
  const [newKey, setNewKey] = useState('');
  const [loadingKeys, setLoadingKeys] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, ApiKeyTestResult>>({});

  useEffect(() => {
    if (activeTab === 'groq') {
      fetchGroqKeys();
    }
  }, [activeTab]);

  async function fetchGroqKeys() {
    setLoadingKeys(true);
    const res = await fetch('/api/admin/groq-keys');
    if (res.ok) {
      const data = await res.json();
      setGroqKeys(data);
    }
    setLoadingKeys(false);
  }

  async function addGroqKey() {
    if (!newKey) return;
    await fetch('/api/admin/groq-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: newKey }),
    });
    setNewKey('');
    fetchGroqKeys();
  }

  async function removeGroqKey(id: string) {
    await fetch('/api/admin/groq-keys', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchGroqKeys();
  }

  async function testApiKey(keyId: string) {
    setTestResults(prev => ({
      ...prev,
      [keyId]: { id: keyId, status: 'TESTING', message: 'Testing...' }
    }));

    try {
      const response = await fetch('/api/admin/api-keys/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKeyId: keyId }),
      });

      const result = await response.json();
      
      setTestResults(prev => ({
        ...prev,
        [keyId]: {
          id: keyId,
          status: result.status,
          message: result.message
        }
      }));

      // Auto-clear result after 5 seconds
      setTimeout(() => {
        setTestResults(prev => {
          const newResults = { ...prev };
          delete newResults[keyId];
          return newResults;
        });
      }, 5000);
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [keyId]: {
          id: keyId,
          status: 'ERROR',
          message: 'Failed to test API key'
        }
      }));
    }
  }

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          if (Array.isArray(value)) {
            return `"${value.join(', ')}"`;
          }
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportUsers = () => {
    const data = stats.recentUsers.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name || 'N/A',
      isAdmin: user.isAdmin ? 'Yes' : 'No',
      createdAt: new Date(user.createdAt).toLocaleDateString(),
    }));
    exportToCSV(data, 'users');
  };

  const exportTrips = () => {
    const data = stats.recentTrips.map(trip => ({
      id: trip.id,
      destination: trip.destination,
      userEmail: trip.user?.email || 'Anonymous',
      userName: trip.user?.name || 'N/A',
      startDate: new Date(trip.startDate).toLocaleDateString(),
      endDate: new Date(trip.endDate).toLocaleDateString(),
      budget: trip.budget,
      travelType: trip.travelType,
      activities: trip.activities.join(', '),
      createdAt: new Date(trip.createdAt).toLocaleDateString(),
    }));
    exportToCSV(data, 'trips');
  };

  const exportSubscribers = () => {
    const data = stats.recentSubscribers.map(sub => ({
      id: sub.id,
      email: sub.email,
      subscribedAt: new Date(sub.subscribedAt).toLocaleDateString(),
    }));
    exportToCSV(data, 'subscribers');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage your application data and view analytics</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/${locale}/dashboard`}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                User Dashboard
              </Link>
              <Link
                href={`/${locale}`}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                </div>
                <FiUsers className="text-5xl text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Trips</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalTrips}</p>
                </div>
                <FiMap className="text-5xl text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Subscribers</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalSubscribers}</p>
                </div>
                <FiMail className="text-5xl text-pink-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            {(['analytics', 'users', 'trips', 'subscribers', 'groq'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab === 'groq' ? 'Groq API Keys' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
            {/* Groq API Keys Tab */}
            {activeTab === 'groq' && (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Groq API Keys</h3>
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={newKey}
                    onChange={e => setNewKey(e.target.value)}
                    placeholder="Enter new Groq API key..."
                    className="px-4 py-2 border rounded-lg w-96"
                  />
                  <button
                    onClick={addGroqKey}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Key
                  </button>
                </div>
                {loadingKeys ? (
                  <p>Loading keys...</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Key</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Requests</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Test</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groqKeys.map(key => {
                        const testResult = testResults[key.id];
                        return (
                          <tr key={key.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-xs">{key.key}</td>
                            <td className="py-3 px-4 text-gray-600">{new Date(key.createdAt).toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {key.usageCount} requests
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {key.isActive ? (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Active</span>
                              ) : (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Inactive</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {testResult ? (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  testResult.status === 'VALID' ? 'bg-green-100 text-green-700' :
                                  testResult.status === 'INVALID' ? 'bg-red-100 text-red-700' :
                                  testResult.status === 'ERROR' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}>
                                  {testResult.status === 'TESTING' ? 'Testing...' : testResult.message}
                                </span>
                              ) : (
                                <button
                                  onClick={() => testApiKey(key.id)}
                                  className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm font-medium"
                                >
                                  Test
                                </button>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => removeGroqKey(key.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

          <div className="p-8">
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Top Destinations */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FiMapPin className="text-2xl text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-800">Top Destinations</h3>
                    </div>
                    <div className="space-y-3">
                      {stats.topDestinations.slice(0, 5).map((dest, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <span className="font-medium text-gray-700">{dest.destination}</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                            {dest.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget Distribution */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FiDollarSign className="text-2xl text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-800">Budget Distribution</h3>
                    </div>
                    <div className="space-y-3">
                      {stats.budgetDistribution.map((budget, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <span className="font-medium text-gray-700">{budget.budget}</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            {budget.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Travel Types */}
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FiActivity className="text-2xl text-green-600" />
                      <h3 className="text-xl font-bold text-gray-800">Travel Types</h3>
                    </div>
                    <div className="space-y-3">
                      {stats.travelTypeDistribution.map((type, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <span className="font-medium text-gray-700">{type.travelType}</span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {type.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Activities */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <FiHeart className="text-2xl text-orange-600" />
                      <h3 className="text-xl font-bold text-gray-800">Popular Activities</h3>
                    </div>
                    <div className="space-y-3">
                      {stats.topActivities.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <span className="font-medium text-gray-700">{activity.activity}</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                            {activity.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Recent Users</h3>
                  <button
                    onClick={exportUsers}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiDownload />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">{user.name || 'N/A'}</td>
                          <td className="py-3 px-4">
                            {user.isAdmin ? (
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                Admin
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                User
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Trips Tab */}
            {activeTab === 'trips' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Recent Trips</h3>
                  <button
                    onClick={exportTrips}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <FiDownload />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Destination</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Dates</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentTrips.map((trip) => (
                        <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-800">{trip.destination}</td>
                          <td className="py-3 px-4 text-gray-600">
                            {trip.user?.email || 'Anonymous'}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              {trip.budget}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{trip.travelType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Subscribers Tab */}
            {activeTab === 'subscribers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h3>
                  <button
                    onClick={() => {
                      const data = allSubscribers.map(sub => ({
                        id: sub.id,
                        email: sub.email,
                        subscribedAt: new Date(sub.subscribedAt).toLocaleDateString(),
                      }));
                      exportToCSV(data, 'subscribers');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <FiDownload />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  {loadingSubscribers ? (
                    <div className="py-8 text-center text-gray-500">Loading subscribers...</div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Subscribed At</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allSubscribers.length === 0 ? (
                          <tr><td colSpan={3} className="py-6 text-center text-gray-400">No subscribers found.</td></tr>
                        ) : allSubscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-800">{subscriber.email}</td>
                            <td className="py-3 px-4 text-gray-600">
                              {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AdminSiteSettings />
    </div>
  );
}
