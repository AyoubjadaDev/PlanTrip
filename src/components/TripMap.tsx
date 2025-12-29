'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface TripMapProps {
  destination: string;
  itinerary?: any;
}

export default function TripMap({ destination, itinerary }: TripMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowsRef = useRef<google.maps.InfoWindow[]>([]);

  // Client-side geocoding using Google Maps library
  const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      // Load geocoder library from Maps library
      const { Geocoder } = await google.maps.importLibrary('geocoding') as any;
      const geocoder = new Geocoder();

      const result = await geocoder.geocode({ address });
      
      if (result.results && result.results.length > 0) {
        const location = result.results[0].geometry.location;
        const lat = typeof location.lat === 'function' ? location.lat() : location.lat;
        const lng = typeof location.lng === 'function' ? location.lng() : location.lng;
        console.log('Geocoded:', address, '->', { lat, lng });
        return { lat, lng };
      }

      console.warn('Geocoding failed for:', address);
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!apiKey) {
          throw new Error('Google Maps API key is not configured');
        }

        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['marker', 'geocoding'],
        });

        await loader.importLibrary('maps');
        const { Map, LatLngBounds } = google.maps;

        if (!mapContainer.current) return;

        // Geocode destination first using backend
        const destCoords = await geocodeAddress(destination);
        if (!destCoords) {
          setError(`Unable to locate ${destination}`);
          setLoading(false);
          return;
        }

        // Create map centered on destination
        const mapOptions: google.maps.MapOptions = {
          zoom: 13,
          center: { lat: destCoords.lat, lng: destCoords.lng },
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#333333' }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }],
            },
          ],
        };

        map.current = new Map(mapContainer.current, mapOptions);

        // Add destination marker
        const destinationMarker = new google.maps.Marker({
          position: { lat: destCoords.lat, lng: destCoords.lng },
          map: map.current,
          title: destination,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#667eea',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        });

        markersRef.current.push(destinationMarker);

        const destInfoWindow = new google.maps.InfoWindow({
          content: `<div style="color: #333; font-weight: bold; padding: 8px;">${destination}</div>`,
        });
        infoWindowsRef.current.push(destInfoWindow);

        destinationMarker.addListener('click', () => {
          infoWindowsRef.current.forEach((iw) => iw.close());
          destInfoWindow.open(map.current, destinationMarker);
        });

        // Add activity markers from itinerary
        if (itinerary?.days && Array.isArray(itinerary.days)) {
          const bounds = new LatLngBounds();
          bounds.extend({ lat: destCoords.lat, lng: destCoords.lng });
          let markerCount = 0;

          for (const day of itinerary.days) {
            const dayIndex = itinerary.days.indexOf(day);
            const activities = [
              { time: 'Morning', description: day.morning },
              { time: 'Afternoon', description: day.afternoon },
              { time: 'Evening', description: day.evening },
            ];

            for (const activity of activities) {
              const locationMatch = extractLocation(activity.description);
              if (locationMatch) {
                const fullAddress = `${locationMatch}, ${destination}`;
                const coords = await geocodeAddress(fullAddress);

                if (coords) {
                  markerCount++;
                  bounds.extend({ lat: coords.lat, lng: coords.lng });

                  // Create color based on time of day
                  const colors = {
                    Morning: '#10b981',
                    Afternoon: '#f59e0b',
                    Evening: '#8b5cf6',
                  };
                  const color = colors[activity.time as keyof typeof colors] || '#667eea';

                  const marker = new google.maps.Marker({
                    position: { lat: coords.lat, lng: coords.lng },
                    map: map.current,
                    title: `Day ${dayIndex + 1} - ${activity.time}`,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: color,
                      fillOpacity: 0.8,
                      strokeColor: '#fff',
                      strokeWeight: 2,
                    },
                  });

                  markersRef.current.push(marker);

                  const infoWindowContent = `
                    <div style="color: #333; padding: 10px; max-width: 200px;">
                      <strong style="color: ${color}">Day ${dayIndex + 1} - ${activity.time}</strong>
                      <p style="margin: 8px 0 0 0; font-size: 13px;">${activity.description.substring(0, 100)}...</p>
                    </div>
                  `;

                  const activityInfoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                  });
                  infoWindowsRef.current.push(activityInfoWindow);

                  marker.addListener('click', () => {
                    infoWindowsRef.current.forEach((iw) => iw.close());
                    activityInfoWindow.open(map.current, marker);
                  });
                }
              }
            }
          }

          // Fit bounds to show all markers
          if (markerCount > 0) {
            map.current?.fitBounds(bounds);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error('Map initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize map');
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      infoWindowsRef.current.forEach((iw) => iw.close());
    };
  }, [destination, itinerary]);

  const extractLocation = (text: string): string | null => {
    // Extract location names from activity descriptions
    // Look for patterns like "Visit [Place Name]" or "[Place Name]"
    const patterns = [
      /Visit\s+([A-Z][^.,!?]*)/,
      /Explore\s+([A-Z][^.,!?]*)/,
      /See\s+([A-Z][^.,!?]*)/,
      /Discover\s+([A-Z][^.,!?]*)/,
      /Go to\s+([A-Z][^.,!?]*)/,
      /at\s+([A-Z][^.,!?]*)/,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-10">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-3"></div>
            <p className="text-gray-700 font-semibold">Loading map...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-center p-6">
            <p className="text-red-600 font-semibold mb-2">⚠️ Map Error</p>
            <p className="text-red-500 text-sm">{error}</p>
            <p className="text-gray-600 text-xs mt-2">
              Please ensure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is configured
            </p>
          </div>
        </div>
      )}

      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: '500px' }}
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 z-5 max-w-sm">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Activity Timeline</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-xs text-gray-700">Main Destination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-700">Morning Activities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-700">Afternoon Activities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <span className="text-xs text-gray-700">Evening Activities</span>
          </div>
        </div>
      </div>
    </div>
  );
}
