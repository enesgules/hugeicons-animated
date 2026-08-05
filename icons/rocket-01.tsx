'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Rocket01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Rocket01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ROCKET_BODY =
  'M11.8013 6.48949L13.2869 5.00392C14.9596 3.3312 17.1495 2.63737 19.4671 2.52399C20.3686 2.47989 20.8193 2.45784 21.1807 2.81928C21.5422 3.18071 21.5201 3.63143 21.476 4.53289C21.3626 6.8505 20.6688 9.04042 18.9961 10.7131L17.5105 12.1987C16.2871 13.4221 15.9393 13.77 16.1961 15.097C16.4496 16.1107 16.6949 17.0923 15.9578 17.8294C15.0637 18.7235 14.2481 18.7235 13.354 17.8294L6.17058 10.646C5.27649 9.75188 5.27646 8.9363 6.17058 8.04219C6.90767 7.30509 7.88929 7.55044 8.90297 7.80389C10.23 8.06073 10.5779 7.71289 11.8013 6.48949Z';

const ROCKET_DURATION = 0.94;
const ROCKET_TIMES = [
  0, 0.07, 0.14, 0.22, 0.32, 0.43, 0.5, 0.56, 0.64, 0.73, 0.82, 0.9,
  0.96, 1,
];

const departingRocketVariants: Variants = {
  normal: {
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(-4%, 4%) rotate(1.5deg)',
      'translate(-1%, 1%) rotate(0.5deg)',
      'translate(8%, -8%) rotate(-1deg)',
      'translate(24%, -24%) rotate(-3deg)',
      'translate(55%, -55%) rotate(-5deg)',
      'translate(92%, -92%) rotate(-5deg)',
      'translate(130%, -130%) rotate(-4deg)',
      'translate(150%, -150%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-3deg)',
    ],
    transition: {
      duration: ROCKET_DURATION,
      ease: 'linear',
      times: ROCKET_TIMES,
    },
  },
};

const arrivingRocketVariants: Variants = {
  normal: {
    transform: 'translate(-150%, 150%) rotate(-6deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-150%, 150%) rotate(-6deg)',
      'translate(-120%, 120%) rotate(-6deg)',
      'translate(-85%, 85%) rotate(-5deg)',
      'translate(-52%, 52%) rotate(-4deg)',
      'translate(-26%, 26%) rotate(-2.5deg)',
      'translate(-8%, 8%) rotate(-0.8deg)',
      'translate(-1%, 1%) rotate(0.8deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: {
      duration: ROCKET_DURATION,
      ease: 'linear',
      times: ROCKET_TIMES,
    },
  },
};

// Exhaust keeps the rocket's direction but lags and stretches as acceleration builds.
const departingThrustVariants: Variants = {
  normal: {
    transform: 'none',
    pathLength: 1,
    pathOffset: 0,
    visibility: 'visible',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: (i: number) => {
    const lag = [1, 0.78, 0.62][i] ?? 1;

    return {
      transform: [
        'translate3d(0px, 0px, 0px) scale(1)',
        `translate3d(${-0.12 * lag}px, ${0.12 * lag}px, 0px) scale(1.04)`,
        `translate3d(${-0.35 * lag}px, ${0.35 * lag}px, 0px) scale(1.12)`,
        `translate3d(${-0.9 * lag}px, ${0.9 * lag}px, 0px) scale(1.3)`,
        `translate3d(${-1.8 * lag}px, ${1.8 * lag}px, 0px) scale(1.45)`,
        `translate3d(${-3 * lag}px, ${3 * lag}px, 0px) scale(1.26)`,
        `translate3d(${-4.4 * lag}px, ${4.4 * lag}px, 0px) scale(1.08)`,
        `translate3d(${-5.6 * lag}px, ${5.6 * lag}px, 0px) scale(1)`,
      ],
      pathLength: [1, 1, 0.98, 0.9, 0.68, 0.36, 0, 0],
      pathOffset: [0, 0, 0.02, 0.1, 0.32, 0.66, 1, 1],
      visibility: [
        'visible',
        'visible',
        'visible',
        'visible',
        'visible',
        'visible',
        'hidden',
        'hidden',
      ],
      transition: {
        duration: 0.64,
        delay: i * 0.018,
        ease: [0.77, 0, 0.175, 1],
        times: [0, 0.1, 0.22, 0.38, 0.55, 0.72, 0.88, 1],
      },
    };
  },
};

// The replacement rocket draws fresh exhaust outward from its nozzle as it arrives.
const arrivingThrustVariants: Variants = {
  normal: {
    transform: 'translate3d(-5px, 5px, 0px) scale(1.5)',
    pathLength: 0,
    pathOffset: 1,
    visibility: 'hidden',
  },
  animate: (i: number) => {
    const lag = [1, 0.76, 0.6][i] ?? 1;

    return {
      transform: [
        `translate3d(${-5 * lag}px, ${5 * lag}px, 0px) scale(1.5)`,
        `translate3d(${-4.2 * lag}px, ${4.2 * lag}px, 0px) scale(1.42)`,
        `translate3d(${-2.4 * lag}px, ${2.4 * lag}px, 0px) scale(1.25)`,
        `translate3d(${-0.55 * lag}px, ${0.55 * lag}px, 0px) scale(1.06)`,
        'translate3d(0px, 0px, 0px) scale(1)',
      ],
      pathLength: [0, 0.18, 0.62, 1, 1],
      pathOffset: [1, 0.82, 0.38, 0, 0],
      visibility: ['hidden', 'visible', 'visible', 'visible', 'visible'],
      transition: {
        duration: 0.4,
        delay: 0.5 + i * 0.022,
        ease: [0.23, 1, 0.32, 1],
        times: [0, 0.16, 0.46, 0.8, 1],
      },
    };
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

function RocketGeometry() {
  return (
    <>
      <path
        d={ROCKET_BODY}
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.125 7H17M17.25 7C17.25 7.13807 17.1381 7.25 17 7.25C16.8619 7.25 16.75 7.13807 16.75 7C16.75 6.86193 16.8619 6.75 17 6.75C17.1381 6.75 17.25 6.86193 17.25 7Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </>
  );
}

interface RocketTrailsProps {
  phase: 'departing' | 'arriving';
}

function RocketTrails({ phase }: RocketTrailsProps) {
  const variants =
    phase === 'departing'
      ? departingThrustVariants
      : arrivingThrustVariants;

  return (
    <>
      <motion.path
        d="M7.5 16.5L2.5 21.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        variants={variants}
        custom={0}
        style={{ transformBox: 'view-box', originX: 0.3125, originY: 0.6875 }}
      />
      <motion.path
        d="M10.5 19.5L8.5 21.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        variants={variants}
        custom={1}
        style={{ transformBox: 'view-box', originX: 0.4375, originY: 0.8125 }}
      />
      <motion.path
        d="M4.5 13.5L2.5 15.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        variants={variants}
        custom={2}
        style={{ transformBox: 'view-box', originX: 0.1875, originY: 0.5625 }}
      />
    </>
  );
}

const Rocket01Icon = forwardRef<Rocket01IconHandle, Rocket01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          overflow="hidden"
        >
          <motion.g
            variants={departingRocketVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <RocketGeometry />
            <RocketTrails phase="departing" />
          </motion.g>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.g
              variants={arrivingRocketVariants}
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '12px 12px' }}
            >
              <RocketGeometry />
              <RocketTrails phase="arriving" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

Rocket01Icon.displayName = 'Rocket01Icon';

export { Rocket01Icon };
