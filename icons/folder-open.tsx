'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FolderOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderOpenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAP =
  'M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z';

// The front flap turns toward the viewer around its bottom edge (y = 21.5).
// Each point is rotated in 3D and projected with a light perspective, so the
// falling top edge shortens and widens like a real cover. Every pose keeps
// the source commands, so Motion can morph between them.
const HINGE_Y = 21.5;
const EYE_X = 11.5;
const EYE_Y = 12;
const DEPTH = 70;

const tiltFlap = (degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  const project = (x: number, y: number) => {
    const height = HINGE_Y - y;
    const scale = DEPTH / (DEPTH - height * Math.sin(angle));
    return [
      EYE_X + (x - EYE_X) * scale,
      EYE_Y + (HINGE_Y - height * Math.cos(angle) - EYE_Y) * scale,
    ];
  };
  const round = (value: number) => Number(value.toFixed(3));
  let currentY = 0;
  return FLAP.replace(/([MLCHZ])([^MLCHZ]*)/g, (_, command: string, args: string) => {
    const numbers = args.trim() ? args.trim().split(/\s+/).map(Number) : [];
    if (command === 'H') return `H${round(project(numbers[0], currentY)[0])}`;
    const points: number[] = [];
    for (let index = 0; index < numbers.length; index += 2) {
      points.push(...project(numbers[index], numbers[index + 1]).map(round));
      currentY = numbers[index + 1];
    }
    return command + points.join(' ');
  });
};

// Open toward the viewer with a small overshoot, hold, then slap shut: the
// flap tips a few degrees past closed and settles.
const FLAP_DURATION = 1.1;
const FLAP_TIMES = [0, 0.32, 0.46, 0.58, 0.8, 0.9, 1];
const FLAP_EASE: Easing[] = [
  [0.23, 1, 0.32, 1],
  'easeInOut',
  'easeInOut',
  [0.55, 0, 0.8, 0.3],
  'easeOut',
  'easeInOut',
];
const FLAP_POSES = [FLAP, ...[66, 58, 61, -6, 2].map(tiltFlap), FLAP];

const folderFlapVariants: Variants = {
  normal: { d: FLAP },
  animate: {
    d: FLAP_POSES,
    transition: { duration: FLAP_DURATION, ease: FLAP_EASE, times: FLAP_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: FLAP_DURATION, times: [0, 0.999, 1] },
  },
};

const FolderOpenIcon = forwardRef<FolderOpenIconHandle, FolderOpenIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const occlusionMaskId = useId();
    const controls = useAnimation();
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
          <defs>
            {/* the moving flap hides the back panel behind it */}
            <mask
              id={occlusionMaskId}
              maskUnits="userSpaceOnUse"
              x="-4"
              y="-4"
              width="32"
              height="32"
            >
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.path
                  d={FLAP}
                  fill="black"
                  stroke="black"
                  strokeWidth="1.5"
                  variants={folderFlapVariants}
                  animate={controls}
                  initial="normal"
                />
              </motion.g>
            </mask>
          </defs>
          <g mask={`url(#${occlusionMaskId})`}>
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              {/* right wall of the back panel, revealed while the flap is open */}
              <path
                d="M18.5 11.5V19.8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </motion.g>
            <path
              d="M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
          <motion.path
            d={FLAP}
            stroke="currentColor"
            strokeWidth="1.5"
            variants={folderFlapVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

FolderOpenIcon.displayName = 'FolderOpenIcon';

export { FolderOpenIcon };
