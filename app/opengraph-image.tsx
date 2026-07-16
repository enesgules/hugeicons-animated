import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Hugeicons Animated — beautiful icons, now they move';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Bell({ width, strokeWidth }: { width: number; strokeWidth: number }) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2A3413"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011" />
      <path d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z" />
      <path d="M13 18.5H11" />
    </svg>
  );
}

export default async function Image() {
  const gabarito = await readFile(
    join(process.cwd(), 'assets/gabarito-700.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          background: '#FAF8F3',
          fontFamily: 'Gabarito',
        }}
      >
        {/* brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#C9EF7A',
              border: '2px solid #A8D94F',
            }}
          >
            <Bell width={32} strokeWidth={1.75} />
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#1A1C16' }}>
            hugeicons&nbsp;<span style={{ color: '#8A8D80' }}>animated</span>
          </div>
        </div>

        {/* headline, mirroring the homepage hero */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              color: '#1A1C16',
            }}
          >
            Beautiful icons.
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 104,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              color: '#ADB0A2',
            }}
          >
            Now they
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 92,
                height: 92,
                margin: '0 22px',
                borderRadius: 24,
                background: '#C9EF7A',
                border: '2.5px solid #A8D94F',
              }}
            >
              <Bell width={54} strokeWidth={1.75} />
            </div>
            move.
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 26,
            color: '#6E7263',
          }}
        >
          <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            Animated Hugeicons for React · Motion · shadcn CLI
          </div>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', color: '#8A8D80' }}>
            hugeicons-animated.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Gabarito', data: gabarito, style: 'normal', weight: 700 },
      ],
    }
  );
}
