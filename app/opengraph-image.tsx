import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Hugeicons Animated — beautiful icons, now they move';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// the brand mark: the bell frozen mid-swing, ring arcs trailing
function Mark({ width }: { width: number }) {
  return (
    <svg
      width={width}
      height={width}
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
  );
}

export default async function Image() {
  const quicksand = await readFile(
    join(process.cwd(), 'assets/quicksand-700.ttf')
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
          background: '#FFFFFF',
          fontFamily: 'Quicksand',
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
              background: '#AFE67F',
              border: '2px solid #79BD3E',
            }}
          >
            <Mark width={44} />
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#141812' }}>
            hugeicons&nbsp;<span style={{ color: '#9DA19B' }}>animated</span>
          </div>
        </div>

        {/* headline, mirroring the homepage hero */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: '#141812',
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
              letterSpacing: '-0.03em',
              color: '#BFC2BD',
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
                background: '#AFE67F',
                border: '2.5px solid #79BD3E',
              }}
            >
              <Mark width={68} />
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
            color: '#696D6E',
          }}
        >
          <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            Animated Hugeicons for React · Motion · shadcn CLI
          </div>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', color: '#9DA19B' }}>
            hugeicons-animated.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Quicksand', data: quicksand, style: 'normal', weight: 700 },
      ],
    }
  );
}
