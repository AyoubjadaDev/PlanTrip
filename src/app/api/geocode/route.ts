import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('[Geocode] API key not configured');
      return NextResponse.json(
        { error: 'Geocoding API is not configured' },
        { status: 500 }
      );
    }

    console.log('[Geocode] Geocoding address:', address);

    // Call Google Geocoding API from backend
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    console.log('[Geocode] Response status:', data.status);
    console.log('[Geocode] Results length:', data.results?.length);

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log('[Geocode] Success:', address, '->', location);
      return NextResponse.json({
        lat: location.lat,
        lng: location.lng,
        address: data.results[0].formatted_address,
      });
    }

    console.error('[Geocode] Geocoding failed:', data.status, data.error_message);

    return NextResponse.json(
      { error: `Geocoding failed: ${data.status}` },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Geocode] Error:', error);
    return NextResponse.json(
      { error: 'Failed to geocode address' },
      { status: 500 }
    );
  }
}
