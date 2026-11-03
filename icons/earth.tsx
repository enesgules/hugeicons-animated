'use client';

import type { MotionStyle, Variants } from 'motion/react';
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface EarthIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EarthIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
// The source drawing is split into its exact rim and its two coastlines.
const EARTH_RIM =
  'M12 22C6.47715 22 2 17.5228 2 12C2 9.20746 3.14465 6.68227 4.99037 4.86802M12 22C16.9458 22 21.053 18.4096 21.8573 13.693M21.8573 13.693C21.9511 13.1427 22 12.5771 22 12C22 7.11857 18.5024 3.05405 13.8766 2.17579M13.8766 2.17579C13.2687 2.06039 12.6414 2 12 2C9.26969 2 6.79495 3.09421 4.99037 4.86802';
const SOUTH_COAST =
  'M12 22C11.037 21.2864 11.1907 20.4555 11.6738 19.6247C12.4166 18.3474 12.4166 18.3474 12.4166 16.6444C12.4166 14.9414 13.4286 14.1429 17 14.8571C18.6047 15.1781 19.7741 12.9609 21.8573 13.693';
const NORTH_COAST =
  'M13.8766 2.17579C14.3872 3.11599 14.1816 4.23551 13.1027 4.66298C11.3429 5.3603 12.6029 6.64343 11.1035 7.4356C10.1038 7.96372 8.6044 7.83152 7.10496 6.24716C6.31517 5.41264 5.83966 4.95765 4.99037 4.86802';
const EARTH_LAND = `${SOUTH_COAST}${NORTH_COAST}`;

type Point = [number, number, number];

const DEG = Math.PI / 180;

// The globe is a unit sphere seen from +z, with y down as in SVG: the bottom
// of the rim is the south pole, and longitude 0 faces the viewer at rest.
const atLonLat = ([lon, lat]: [number, number]): Point => [
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
];

// A point of the flat drawing, lifted onto the front of the globe.
const lift = (x: number, y: number): Point => {
  const px = (x - 12) / 10;
  const py = (y - 12) / 10;
  const r = Math.hypot(px, py);
  return r >= 1 ? [px / r, py / r, 0] : [px, py, Math.sqrt(1 - r * r)];
};

// The visible coastline as dense points on the globe, sampled from its curves.
const trace = (path: string) => {
  const n = path.match(/-?\d*\.?\d+/g)!.map(Number);
  const points = [lift(n[0], n[1])];
  for (let i = 2; i < n.length; i += 6) {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = n.slice(i - 2, i + 6);
    for (let step = 1; step <= 8; step++) {
      const t = step / 8;
      const u = 1 - t;
      points.push(
        lift(
          u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3
        )
      );
    }
  }
  return points;
};

// Great-circle legs between waypoints, at most 4° each.
const sail = (from: Point, waypoints: [number, number][], to: Point) => {
  const stops = [from, ...waypoints.map(atLonLat), to];
  const points: Point[] = [];
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1];
    const b = stops[i];
    const angle = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
    const steps = Math.max(1, Math.ceil(angle / (4 * DEG)));
    for (let step = 1; step <= steps; step++) {
      const t = step / steps;
      const p = a.map((v, k) => v + (b[k] - v) * t) as Point;
      const length = Math.hypot(...p);
      points.push(p.map((v) => v / length) as Point);
    }
  }
  return points.slice(0, -1);
};

// Closed coasts. The two source coasts are the near edges of a north polar
// cap and a south-east continent; their far edges and an island stay behind
// the rim at rest.
const SOUTH = trace(SOUTH_COAST);
const NORTH = trace(NORTH_COAST);
const COASTS: Point[][] = [
  [
    ...NORTH,
    ...sail(
      NORTH[NORTH.length - 1],
      [
        [-104, -40], [-116, -30], [-128, -26], [-140, -34], [-150, -46],
        [-164, -42], [-178, -30], [-190, -22], [-202, -30], [-214, -44],
        [-230, -56], [-248, -66], [-262, -74],
      ],
      NORTH[0]
    ),
    NORTH[0],
  ],
  [
    ...SOUTH,
    ...sail(
      SOUTH[SOUTH.length - 1],
      [
        [100, 4], [112, -2], [124, 4], [130, 16], [126, 28], [134, 40],
        [146, 50], [150, 62], [140, 74], [120, 84],
      ],
      SOUTH[0]
    ),
    SOUTH[0],
  ],
  sail(
    atLonLat([206, -8]),
    [
      [218, -16], [232, -12], [240, -2], [236, 12], [228, 24], [216, 26],
      [208, 16], [204, 4],
    ],
    atLonLat([206, -8])
  ).concat([atLonLat([206, -8])]),
];

const toSvg = ([x, y]: Point) =>
  `${Math.round((12 + x * 10) * 1000) / 1000} ${Math.round((12 + y * 10) * 1000) / 1000}`;

// The coastline after the globe turns east by `turn` degrees about its axis.
// Only the near side is drawn. Away from rest, each coast is cut at radius
// 8.5 of 10, before the horizon squeezes it into a dark sliver against the
// rim; its round cap still reaches the rim. Near rest the cut eases back out
// to the rim, so the spin starts and ends on the source drawing.
const landAt = (turn: number) => {
  if (turn % 360 === 0) return EARTH_LAND;
  const fromRest = Math.abs(turn - 360 * Math.round(turn / 360));
  const cut = 1 - 0.15 * Math.min(1, fromRest / 40);
  const horizon = Math.sqrt(1 - cut * cut);
  const cos = Math.cos(turn * DEG);
  const sin = Math.sin(turn * DEG);
  let d = '';
  for (const coast of COASTS) {
    let previous: Point | null = null;
    for (const [x, y, z] of coast) {
      const point: Point = [x * cos + z * sin, y, z * cos - x * sin];
      const visible = point[2] >= horizon;
      if (previous && visible !== previous[2] >= horizon) {
        const t = (previous[2] - horizon) / (previous[2] - point[2]);
        const edge = previous.map((v, k) => v + (point[k] - v) * t) as Point;
        const length = Math.hypot(...edge);
        d += `${visible ? 'M' : 'L'}${toSvg(edge.map((v) => v / length) as Point)}`;
      }
      if (visible) d += `${previous ? 'L' : 'M'}${toSvg(point)}`;
      previous = point;
    }
  }
  return d || 'M12 22';
};

// Turn, as in refresh: the globe winds back, spins once on its axis so the
// land rolls east over the horizon and the far side comes round, overshoots a
// little, and settles on the source drawing.
const spinVariants: Variants = {
  normal: { '--turn': 0 },
  animate: {
    '--turn': [0, -16, 370, 360],
    transition: {
      duration: 1.6,
      times: [0, 0.12, 0.86, 1],
      ease: ['easeOut', [0.35, 0, 0.35, 1], 'easeInOut'],
    },
  },
};

const EarthIcon = forwardRef<EarthIconHandle, EarthIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const turn = useMotionValue(0);
    const land = useTransform(turn, landAt);
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: false,
      onMouseEnter,
      onMouseLeave,
      ref,
    });

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <motion.path
            d={land}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={spinVariants}
            animate={controls}
            initial="normal"
            style={{ '--turn': turn } as MotionStyle}
          />
          <path
            d={EARTH_RIM}
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

EarthIcon.displayName = 'EarthIcon';

export { EarthIcon };
