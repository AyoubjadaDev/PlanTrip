import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default async function AppleIcon() {
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
        }}
      >
        <svg
          width="120"
          height="120"
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
