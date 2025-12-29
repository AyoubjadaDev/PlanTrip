'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsData {
  stats: {
    totalUsers: number;
    totalTrips: number;
    totalContacts: number;
    activeUsers: number;
    unreadMessages: number;
  };
  charts: {
    userGrowth: Array<{ date: string; count: number }>;
    tripTrends: Array<{ date: string; count: number }>;
    topDestinations: Array<{ destination: string; count: number }>;
  };
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchAnalytics}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return <div className="text-gray-500">No analytics data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Users"
          value={data.stats.totalUsers}
          icon="👥"
          color="bg-blue-50 border-blue-200"
        />
        <StatCard
          title="Active This Month"
          value={data.stats.activeUsers}
          icon="✨"
          color="bg-green-50 border-green-200"
        />
        <StatCard
          title="Total Trips"
          value={data.stats.totalTrips}
          icon="✈️"
          color="bg-purple-50 border-purple-200"
        />
        <StatCard
          title="Contact Messages"
          value={data.stats.totalContacts}
          icon="📧"
          color="bg-yellow-50 border-yellow-200"
        />
        <StatCard
          title="Unread Messages"
          value={data.stats.unreadMessages}
          icon="🔴"
          color="bg-red-50 border-red-200"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth (30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.charts.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                name="New Users"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Trip Trends Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Creation Trends (30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.charts.tripTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8b5cf6" name="Trips Created" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.charts.topDestinations}
                dataKey="count"
                nameKey="destination"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.charts.topDestinations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Destinations List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Destinations Breakdown</h3>
          <div className="space-y-3">
            {data.charts.topDestinations.map((dest, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700">{dest.destination}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(dest.count / Math.max(...data.charts.topDestinations.map(d => d.count))) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                  <span className="text-gray-900 font-medium w-12 text-right">{dest.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className={`rounded-lg border p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
