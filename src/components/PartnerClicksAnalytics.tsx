'use client';

import { useState, useEffect } from 'react';
import { FiLink, FiTrendingUp, FiDollarSign, FiActivity } from 'react-icons/fi';

interface PartnerClicksData {
  totalClicks: number;
  clicksByPartner: Array<{ partnerId: string; count: number }>;
  clicksByType: Array<{ linkType: string; count: number }>;
  recentClicks: Array<{
    id: string;
    partnerId: string;
    linkType: string;
    destination: string | null;
    createdAt: string;
  }>;
  topDestinations: Array<{ destination: string; count: number }>;
}

export function PartnerClicksAnalytics() {
  const [data, setData] = useState<PartnerClicksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/partner-clicks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch partner clicks data');
      }

      const clicksData = await response.json();
      setData(clicksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-gray-600">Loading partner clicks analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button
          onClick={fetchData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return <div className="text-gray-500">No data available</div>;
  }

  const partnerNames: Record<string, string> = {
    skyscanner: 'Skyscanner',
    booking: 'Booking.com',
    agoda: 'Agoda',
    expedia: 'Expedia',
    klook: 'Klook',
    getyourguide: 'GetYourGuide',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Partner Link Analytics</h2>
          <p className="text-gray-600 mt-1">Track clicks on affiliate partner links</p>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiLink className="text-2xl text-blue-600" />
            <h3 className="font-semibold text-gray-700">Total Clicks</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.totalClicks.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiTrendingUp className="text-2xl text-green-600" />
            <h3 className="font-semibold text-gray-700">Active Partners</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.clicksByPartner.length}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiActivity className="text-2xl text-purple-600" />
            <h3 className="font-semibold text-gray-700">Link Types</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.clicksByType.length}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <FiDollarSign className="text-2xl text-orange-600" />
            <h3 className="font-semibold text-gray-700">Est. Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">${(data.totalClicks * 0.5).toFixed(0)}</p>
          <p className="text-xs text-gray-600 mt-1">Based on $0.50/click avg</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks by Partner */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks by Partner</h3>
          <div className="space-y-3">
            {data.clicksByPartner.map((partner, index) => {
              const total = data.clicksByPartner.reduce((sum, p) => sum + p.count, 0);
              const percentage = (partner.count / total) * 100;
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {partnerNames[partner.partnerId] || partner.partnerId}
                    </span>
                    <span className="text-gray-600">{partner.count} clicks ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clicks by Type */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Clicks by Link Type</h3>
          <div className="space-y-3">
            {data.clicksByType.map((type, index) => {
              const total = data.clicksByType.reduce((sum, t) => sum + t.count, 0);
              const percentage = (type.count / total) * 100;
              const colors = ['bg-green-600', 'bg-purple-600', 'bg-orange-600'];
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 capitalize">{type.linkType}</span>
                    <span className="text-gray-600">{type.count} clicks ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${colors[index % colors.length]} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      {data.topDestinations.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.topDestinations.map((dest, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="font-semibold text-gray-900">{dest.destination}</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{dest.count}</p>
                <p className="text-xs text-gray-600">clicks</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Clicks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clicks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Partner</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Destination</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.recentClicks.map((click) => (
                <tr key={click.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {partnerNames[click.partnerId] || click.partnerId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium capitalize">
                      {click.linkType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{click.destination || 'N/A'}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {new Date(click.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
