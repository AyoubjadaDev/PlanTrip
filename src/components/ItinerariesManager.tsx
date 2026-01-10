'use client';

import { useState, useEffect } from 'react';
import { FiMapPin, FiCalendar, FiDollarSign, FiUsers, FiChevronLeft, FiChevronRight, FiEye, FiTrash2 } from 'react-icons/fi';

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
  user?: {
    name: string;
    email: string;
  };
  ipAddress?: string;
}

export function ItinerariesManager() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTrips();
  }, [currentPage]);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/itineraries?page=${currentPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error('Failed to fetch trips');
      
      const data = await response.json();
      setTrips(data.trips || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this itinerary?')) return;

    try {
      const response = await fetch(`/api/admin/itineraries/${tripId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTrips();
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900">Generated Itineraries</h2>
        <p className="text-gray-600 mt-2">View and manage all trip itineraries created by users</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <span className="font-semibold">{trips.length}</span> trips on this page
          </span>
          <span>•</span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Trips List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {trips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No itineraries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiMapPin className="text-primary-600 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-900">{trip.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="mr-2 flex-shrink-0" />
                        <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <FiDollarSign className="mr-1 flex-shrink-0" />
                        <span>{trip.budget}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {trip.travelType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {trip.user ? (
                          <div>
                            <div className="font-medium text-gray-900">{trip.user.name}</div>
                            <div className="text-gray-500">{trip.user.email}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">Anonymous</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(trip.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedTrip(trip);
                          setShowDetails(true);
                        }}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        <FiEye className="inline" /> View
                      </button>
                      <button
                        onClick={() => handleDelete(trip.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="inline" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft /> Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}

      {/* Trip Details Modal */}
      {showDetails && selectedTrip && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowDetails(false)}></div>

            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="px-6 pt-5 pb-4 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Trip Details</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Destination</label>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{selectedTrip.destination}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Travel Type</label>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{selectedTrip.travelType}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Start Date</label>
                      <p className="mt-1 text-gray-900">{formatDate(selectedTrip.startDate)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">End Date</label>
                      <p className="mt-1 text-gray-900">{formatDate(selectedTrip.endDate)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Budget</label>
                    <p className="mt-1 text-gray-900">{selectedTrip.budget}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Activities</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedTrip.activities.map((activity, index) => (
                        <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Language</label>
                    <p className="mt-1 text-gray-900">{selectedTrip.language}</p>
                  </div>

                  {selectedTrip.user && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500">User Information</label>
                      <div className="mt-1">
                        <p className="text-gray-900"><strong>Name:</strong> {selectedTrip.user.name}</p>
                        <p className="text-gray-900"><strong>Email:</strong> {selectedTrip.user.email}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Created At</label>
                    <p className="mt-1 text-gray-900">{new Date(selectedTrip.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
