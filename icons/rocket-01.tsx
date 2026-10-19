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

const ROCKET_DURATION = 0.92;
const ROCKET_TIMES = [
  0, 0.07, 0.14, 0.22, 0.32, 0.43, 0.5, 0.54, 0.62, 0.71, 0.8, 0.88,
  0.95, 1,
];

// Paper-plane launch: the whole rocket and its exhaust pull back, then
// accelerate beyond the top-right edge. A second full rocket follows the same
// diagonal from the bottom left and settles in place.
const departingRocketVariants: Variants = {
  normal: {
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(-3%, 3%) rotate(1.6deg)',
      'translate(-1%, 1%) rotate(0.8deg)',
      'translate(6%, -6%) rotate(-0.8deg)',
      'translate(20%, -20%) rotate(-2.4deg)',
      'translate(46%, -46%) rotate(-4deg)',
      'translate(80%, -80%) rotate(-4deg)',
      'translate(118%, -118%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
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
    transform: 'translate(-150%, 150%) rotate(-5deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-122%, 122%) rotate(-5deg)',
      'translate(-86%, 86%) rotate(-4deg)',
      'translate(-52%, 52%) rotate(-3deg)',
      'translate(-25%, 25%) rotate(-2deg)',
      'translate(-7%, 7%) rotate(-0.6deg)',
      'translate(-1%, 1%) rotate(0.6deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: {
      duration: ROCKET_DURATION,
      ease: 'linear',
      times: ROCKET_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// The rocket's own thrust lines lag behind the body by different amounts and
// stretch backward while it accelerates, then leave with it. The replacement's
// lines arrive stretched, a beat after its body, and settle to rest length.
const THRUST = [
  {
    rest: 'M2.5 21.5L7.5 16.5',
    mid: 'M1.5 22.5L7.5 16.5',
    long: 'M-0.5 24.5L7.5 16.5',
    lag: 0.06,
  },
  {
    rest: 'M8.5 21.5L10.5 19.5',
    mid: 'M7.5 22.5L10.5 19.5',
    long: 'M5.5 24.5L10.5 19.5',
    lag: 0.1,
  },
  {
    rest: 'M2.5 15.5L4.5 13.5',
    mid: 'M1.5 16.5L4.5 13.5',
    long: 'M-0.5 18.5L4.5 13.5',
    lag: 0.04,
  },
];

const departingThrustVariants: Variants = {
  normal: (i: number) => ({
    ...departingRocketVariants.normal,
    d: THRUST[i].rest,
  }),
  animate: (i: number) => {
    const { rest, mid, long, lag } = THRUST[i];
    const rocket = departingRocketVariants.animate as {
      transform: string[];
    };
    return {
      transform: rocket.transform,
      d: [rest, rest, rest, mid, long, long, long, long, long, long, long, long, long, long],
      transition: {
        duration: ROCKET_DURATION,
        delay: lag,
        ease: 'linear',
        times: ROCKET_TIMES,
      },
    };
  },
};

const arrivingThrustVariants: Variants = {
  normal: (i: number) => ({
    ...arrivingRocketVariants.normal,
    d: THRUST[i].long,
  }),
  animate: (i: number) => {
    const { rest, mid, long, lag } = THRUST[i];
    const rocket = arrivingRocketVariants.animate as {
      transform: string[];
    };
    return {
      transform: rocket.transform,
      d: [long, long, long, long, long, long, long, long, long, long, mid, rest, rest, rest],
      transition: {
        duration: ROCKET_DURATION,
        delay: lag,
        ease: 'linear',
        times: ROCKET_TIMES,
      },
    };
  },
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
          {THRUST.map(({ rest }, i) => (
            <motion.path
              key={rest}
              d={rest}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={departingThrustVariants}
              custom={i}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
            />
          ))}
          <motion.g
            variants={departingRocketVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
          >
            <RocketGeometry />
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
              style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
            >
              <RocketGeometry />
            </motion.g>
            {THRUST.map(({ rest }, i) => (
              <motion.path
                key={rest}
                d={rest}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={arrivingThrustVariants}
                custom={i}
                animate={controls}
                initial="normal"
                style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

Rocket01Icon.displayName = 'Rocket01Icon';

export { Rocket01Icon };
