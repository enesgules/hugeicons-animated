import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// full-bleed tile — iOS rounds the corners itself.
// Same mark as icon.svg: the bell frozen mid-swing, ring arcs trailing.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#AFE67F',
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#1D3208"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g strokeWidth={2} transform="translate(1.5 4.5) rotate(-10 12 2.5)">
            <path d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011" />
            <path d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z" />
            <path d="M13 18.5H11" />
          </g>
          <path d="M24.4 5.6C25.3 7.5 25.6 9.7 25.1 11.8" strokeWidth={1.9} />
          <path
            d="M27.2 4C28.2 6.4 28.5 9.1 27.9 11.7"
            strokeWidth={1.9}
            opacity={0.5}
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
