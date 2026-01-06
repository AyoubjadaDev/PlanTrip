import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'PlanMyNextTravel';
export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

// Icon generation
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 256,
          background: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20%',
        }}
      >
        <svg
          width="350"
          height="350"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M50 15L70 50H30L50 15Z"
            fill="white"
          />
          <circle cx="50" cy="65" r="18" fill="white" />
          <circle cx="50" cy="65" r="10" fill="#ea580c" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
