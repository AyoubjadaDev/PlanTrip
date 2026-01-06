import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'PlanMyNextTravel - AI-Powered Trip Planner';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            style={{ marginRight: '30px' }}
          >
            <circle cx="50" cy="50" r="45" fill="white" opacity="0.2" />
            <path
              d="M50 20L65 45H35L50 20Z"
              fill="white"
            />
            <circle cx="50" cy="60" r="12" fill="white" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 72, fontWeight: 'bold', lineHeight: 1.1 }}>
              PlanMyNextTravel
            </div>
            <div style={{ fontSize: 32, opacity: 0.9, marginTop: '10px' }}>
              AI-Powered Trip Planner
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 28,
            textAlign: 'center',
            maxWidth: '900px',
            opacity: 0.95,
            lineHeight: 1.4,
          }}
        >
          Create personalized travel itineraries with AI. Get budget estimates, activities, and day-by-day plans for your perfect trip.
        </div>
        <div
          style={{
            marginTop: '40px',
            fontSize: 24,
            opacity: 0.8,
            display: 'flex',
            gap: '30px',
          }}
        >
          <span>✈️ Free Forever</span>
          <span>🌍 Multilingual</span>
          <span>⚡ Instant Results</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
