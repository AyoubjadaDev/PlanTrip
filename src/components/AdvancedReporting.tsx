'use client';

import React, { useEffect, useState } from 'react';
import { SubscribersListPopin } from './SubscribersListPopin';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface UserInfo {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

interface ReportData {
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
  users: UserInfo[];
}

export function AdvancedReporting() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reportType, setReportType] = useState<'overview' | 'engagement' | 'destinations' | 'users' | 'subscribers'>('overview');
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days'>('30days');

  useEffect(() => {
    fetchReportData();
  }, [reportType, dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/analytics');
      
      if (!response.ok) {
        throw new Error('Failed to fetch report data');
      }

      const reportData = await response.json();
      setData(reportData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-8">Loading report data...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (!data) {
    return <div className="text-gray-500">No data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Reporting</h2>
        <div className="flex gap-2 items-center">
          <SubscribersListPopin trigger={<button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">👥 Subscribers (Report)</button>} />
          <button
            onClick={fetchReportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overview">Overview Report</option>
            <option value="engagement">User Engagement</option>
            <option value="destinations">Popular Destinations</option>
            <option value="users">Users</option>
            <option value="subscribers">Subscribers</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {reportType === 'overview' && <OverviewReport data={data} />}
        {reportType === 'engagement' && <EngagementReport data={data} />}
        {reportType === 'destinations' && <DestinationsReport data={data} />}
        {reportType === 'users' && <UsersTable users={data.users} />}
        {reportType === 'subscribers' && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Newsletter Subscribers (Report)</h3>
            <SubscribersListPopin trigger={<button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">View Subscribers List</button>} />
            <div className="text-gray-500 text-sm mt-2">Click the button above to view all newsletter subscribers in a popin window.</div>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Export Report</h3>
        <div className="flex gap-2">
          <button
            onClick={() => downloadReport(data, 'json')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
          >
            📥 Download JSON
          </button>
          <button
            onClick={() => downloadReport(data, 'csv')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
          >
            📥 Download CSV
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
          >
            🖨️ Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

function OverviewReport({ data }: { data: ReportData }) {
  const totalGrowth = data.charts.userGrowth.reduce((sum, day) => sum + day.count, 0);
  const totalTripCreations = data.charts.tripTrends.reduce((sum, day) => sum + day.count, 0);
  const avgUsersPerDay = Math.round(totalGrowth / data.charts.userGrowth.length);
  const avgTripsPerDay = Math.round(totalTripCreations / data.charts.tripTrends.length);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Users/Day"
          value={avgUsersPerDay}
          icon="📊"
          color="bg-blue-50 border-blue-200"
        />
        <MetricCard
          title="Avg Trips/Day"
          value={avgTripsPerDay}
          icon="✈️"
          color="bg-purple-50 border-purple-200"
        />
        <MetricCard
          title="Engagement Rate"
          value={`${Math.round((data.stats.activeUsers / data.stats.totalUsers) * 100)}%`}
          icon="📈"
          color="bg-green-50 border-green-200"
        />
        <MetricCard
          title="Response Rate"
          value={`${Math.round(((data.stats.totalContacts - data.stats.unreadMessages) / data.stats.totalContacts) * 100 || 0)}%`}
          icon="✅"
          color="bg-yellow-50 border-yellow-200"
        />
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h3>
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
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Creation Trend</h3>
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
      </div>

      {/* Summary Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Report Summary</h3>
        <p className="text-blue-800 text-sm">
          In this period, you gained <strong>{totalGrowth} new users</strong> with an average of <strong>{avgUsersPerDay} users per day</strong>. 
          Your users created <strong>{totalTripCreations} trips</strong> with an average of <strong>{avgTripsPerDay} trips per day</strong>.
          Your platform now has <strong>{data.stats.totalUsers} total users</strong> and <strong>{data.stats.totalTrips} total trips</strong>.
        </p>
      </div>
    </div>
  );
}

function EngagementReport({ data }: { data: ReportData }) {
  const engagementRate = Math.round((data.stats.activeUsers / data.stats.totalUsers) * 100) || 0;
  const messageResponseRate = data.stats.totalContacts > 0 
    ? Math.round(((data.stats.totalContacts - data.stats.unreadMessages) / data.stats.totalContacts) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Users"
          value={data.stats.activeUsers}
          icon="✨"
          color="bg-green-50 border-green-200"
        />
        <MetricCard
          title="Engagement Rate"
          value={`${engagementRate}%`}
          icon="📊"
          color="bg-blue-50 border-blue-200"
        />
        <MetricCard
          title="Total Trips Created"
          value={data.stats.totalTrips}
          icon="✈️"
          color="bg-purple-50 border-purple-200"
        />
      </div>

      {/* Engagement Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Engagement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" type="category" />
            <YAxis />
            <Tooltip />
            <Scatter name="Users" data={data.charts.userGrowth} fill="#3b82f6" />
            <Scatter name="Trips" data={data.charts.tripTrends} fill="#8b5cf6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Message Response */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Response Rate</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Messages Read</span>
              <span className="font-semibold">{messageResponseRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-green-500"
                style={{ width: `${messageResponseRate}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {data.stats.totalContacts - data.stats.unreadMessages} of {data.stats.totalContacts} messages have been read
          </p>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">Engagement Insights</h3>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• {engagementRate}% of your users are active this month</li>
          <li>• Average {Math.round(data.stats.totalTrips / data.stats.totalUsers)} trips per user</li>
          <li>• {data.stats.unreadMessages} messages awaiting response</li>
        </ul>
      </div>
    </div>
  );
}

function DestinationsReport({ data }: { data: ReportData }) {
  const topDestination = data.charts.topDestinations[0];
  const totalDestinations = data.charts.topDestinations.length;

  return (
    <div className="space-y-6">
      {/* Top Destination Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Most Popular"
          value={topDestination?.destination || 'N/A'}
          icon="🏆"
          color="bg-yellow-50 border-yellow-200"
        />
        <MetricCard
          title="Total Destinations"
          value={totalDestinations}
          icon="🗺️"
          color="bg-blue-50 border-blue-200"
        />
        <MetricCard
          title="Top Dest. Trips"
          value={topDestination?.count || 0}
          icon="✈️"
          color="bg-green-50 border-green-200"
        />
      </div>

      {/* Destinations Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trips</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {data.charts.topDestinations.map((dest, index) => {
              const percentage = Math.round(
                (dest.count / data.charts.topDestinations.reduce((sum, d) => sum + d.count, 0)) * 100
              );
              return (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">#{index + 1}</td>
                  <td className="px-6 py-4 text-gray-900">{dest.destination}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{dest.count}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{percentage}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Insights */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">Destination Insights</h3>
        <ul className="text-purple-800 text-sm space-y-1">
          <li>• <strong>{topDestination?.destination}</strong> is the most popular destination</li>
          <li>• {totalDestinations} different destinations have been planned</li>
          <li>• Top 3 destinations account for {Math.round((data.charts.topDestinations.slice(0, 3).reduce((sum, d) => sum + d.count, 0) / data.stats.totalTrips) * 100)}% of all trips</li>
        </ul>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color }: any) {
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

function downloadReport(data: ReportData, format: 'json' | 'csv') {
  if (format === 'json') {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  } else if (format === 'csv') {
    // Export summary metrics
    let csv = [
      ['Metric', 'Value'],
      ['Total Users', data.stats.totalUsers],
      ['Total Trips', data.stats.totalTrips],
      ['Active Users', data.stats.activeUsers],
      ['Unread Messages', data.stats.unreadMessages],
      [],
      ['Users'],
      ['ID', 'Name', 'Email', 'Signup Date'],
      ...data.users.map(u => [u.id, u.name || '', u.email, u.createdAt]),
    ]
      .map(row => row.join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }
}

function UsersTable({ users }: { users: UserInfo[] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 p-4">Users</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Signup Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 text-gray-900 text-xs font-mono">{user.id}</td>
              <td className="px-6 py-4 text-gray-900">{user.name || <span className="italic text-gray-400">(none)</span>}</td>
              <td className="px-6 py-4 text-gray-900">{user.email}</td>
              <td className="px-6 py-4 text-gray-900">{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
