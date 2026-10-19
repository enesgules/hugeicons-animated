'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UmbrellaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UmbrellaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RAIN_PERIOD = 0.9;

const SPLASH_DROPLETS = [
  { cx: 4.12, cy: 4.45, x: -1.25, y: -0.62, lane: 0 },
  { cx: 5.73, cy: 3.29, x: -0.18, y: -1.39, lane: 0 },
  { cx: 18.27, cy: 3.29, x: 0.18, y: -1.39, lane: 1 },
  { cx: 19.88, cy: 4.45, x: 1.25, y: -0.62, lane: 1 },
] as const;

// The umbrella holds steady in the rain: a drop falls onto each side of the
// canopy in turn, and where it lands two tiny droplets bounce off the fabric
// away from each other and from the outline.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const dropVariants: Variants = {
  normal: { transform: 'translateY(0px)', visibility: 'hidden' },
  animate: (lane: number) => ({
    transform: ['translateY(0px)', 'translateY(4.2px)', 'translateY(4.2px)', 'translateY(4.2px)'],
    visibility: ['visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: RAIN_PERIOD,
      ease: ['easeIn', 'linear', 'linear'],
      times: [0, 0.42, 0.43, 1],
      delay: lane * (RAIN_PERIOD / 2),
      repeat: Infinity,
    },
  }),
};

const dropletVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)', visibility: 'hidden' },
  animate: ({ x, y, lane }: (typeof SPLASH_DROPLETS)[number]) => ({
    transform: [
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      `translate(${x}px, ${y}px)`,
      `translate(${x * 1.1}px, ${y * 1.1}px)`,
      `translate(${x * 1.1}px, ${y * 1.1}px)`,
    ],
    visibility: ['hidden', 'hidden', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: RAIN_PERIOD,
      ease: ['linear', [0.23, 1, 0.32, 1], 'linear', 'linear'],
      times: [0, 0.43, 0.74, 0.76, 1],
      delay: lane * (RAIN_PERIOD / 2),
      repeat: Infinity,
    },
  }),
};

const UmbrellaIcon = forwardRef<UmbrellaIconHandle, UmbrellaIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
          overflow="hidden"
        >
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {[6, 18].map((x, lane) => (
              <motion.path
                key={x}
                d={`M${x} -3V-1`}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={dropVariants}
                custom={lane}
                animate={controls}
                initial="normal"
              />
            ))}
            {SPLASH_DROPLETS.map((droplet) => (
              <motion.circle
                key={`${droplet.cx}-${droplet.cy}`}
                cx={droplet.cx}
                cy={droplet.cy}
                r="0.65"
                fill="currentColor"
                variants={dropletVariants}
                custom={droplet}
                animate={controls}
                initial="normal"
              />
            ))}
          </motion.g>
          <path
            d="M12 3.5V2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12 3.5C11.0608 3.5 7.52791 7.29323 6.97182 12.2037M12 3.5C12.9392 3.5 16.4721 7.29322 17.0282 12.2037M12 3.5C16.9367 3.5 21.0545 6.93552 22 11.5C20.6123 12.7 18.1073 12.4691 17.0282 12.2037M12 3.5C7.06333 3.5 2.94545 6.93552 2 11.5C3.38792 12.7 5.89285 12.4691 6.97182 12.2037M6.97182 12.2037C8.4559 13.0288 10.1718 13.5 12 13.5C13.8282 13.5 15.5441 13.0288 17.0282 12.2037"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12 13.5V20.5C12 21.3284 11.3284 22 10.5 22C9.67157 22 9 21.3284 9 20.5V20"
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

UmbrellaIcon.displayName = 'UmbrellaIcon';

export { UmbrellaIcon };
