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

const ROCKET_DURATION = 1;
const ROCKET_TIMES = [0, 0.06, 0.14, 0.24, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.9, 1];

// A launch: the rocket crouches and blasts off beyond the top-right edge at
// once while its flame flares. The thrust lines stay on the pad as a plume
// that is pushed down and burns out. A second rocket glides in from the
// bottom left and its exhaust lights up from the nozzle.
const departingRocketVariants: Variants = {
  normal: {
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(-1.5%, 1.5%) rotate(0.6deg)',
      'translate(6%, -6%) rotate(-0.8deg)',
      'translate(24%, -24%) rotate(-2deg)',
      'translate(60%, -60%) rotate(-3deg)',
      'translate(110%, -110%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
      'translate(150%, -150%) rotate(-2deg)',
    ],
    transition: {
      duration: ROCKET_DURATION,
      ease: 'easeInOut',
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
      'translate(-110%, 110%) rotate(-5deg)',
      'translate(-55%, 55%) rotate(-3deg)',
      'translate(-20%, 20%) rotate(-1.5deg)',
      'translate(-5%, 5%) rotate(-0.4deg)',
      'translate(1%, -1%) rotate(0.4deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: {
      duration: ROCKET_DURATION,
      ease: 'easeOut',
      times: ROCKET_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// Each thrust line is drawn from its tail to the nozzle-side head.
const THRUST = [
  { tail: [2.5, 21.5], head: [7.5, 16.5] },
  { tail: [8.5, 21.5], head: [10.5, 19.5] },
  { tail: [2.5, 15.5], head: [4.5, 13.5] },
];

// Moves the tail back along the flight axis (positive = longer flame).
const line = (i: number, stretch: number, burned = 0) => {
  const { tail, head } = THRUST[i];
  const tx = tail[0] - stretch;
  const ty = tail[1] + stretch;
  const hx = head[0] + (tx - head[0]) * burned;
  const hy = head[1] + (ty - head[1]) * burned;
  return `M${tx} ${ty}L${hx} ${hy}`;
};

// How far each flame flares at ignition, so the lines do not move together.
const FLARE = [0.9, 0.5, 1.1];

const departingThrustVariants: Variants = {
  normal: (i: number) => ({
    d: line(i, 0),
    transform: 'translate(0px, 0px)',
    visibility: 'visible',
  }),
  animate: (i: number) => {
    const plume = [3, 2.2, 2.6][i];
    return {
      d: [
        line(i, 0),
        line(i, FLARE[i]),
        line(i, plume),
        line(i, plume + 0.6, 0.45),
        ...Array(9).fill(line(i, plume + 1, 1)),
      ],
      transform: [
        ...Array(3).fill('translate(0px, 0px)'),
        'translate(-0.6px, 0.6px)',
        ...Array(9).fill('translate(-1.2px, 1.2px)'),
      ],
      visibility: [...Array(4).fill('visible'), ...Array(9).fill('hidden')],
      transition: {
        duration: ROCKET_DURATION,
        ease: 'easeInOut',
        times: ROCKET_TIMES,
      },
    };
  },
};

// The replacement's exhaust stays attached to its body and draws out from the
// nozzle once the rocket has almost settled, each line at its own pace.
const arrivingThrustVariants: Variants = {
  normal: {
    ...arrivingRocketVariants.normal,
    pathLength: 0,
    pathOffset: 1,
    visibility: 'hidden',
  },
  animate: (i: number) => {
    const rocket = arrivingRocketVariants.animate as { transform: string[] };
    const mid = [0.75, 0.45, 0.9][i];
    return {
      transform: rocket.transform,
      pathLength: [...Array(11).fill(0), mid, 1],
      pathOffset: [...Array(11).fill(1), 1 - mid, 0],
      visibility: [...Array(11).fill('hidden'), 'visible', 'visible'],
      transition: {
        duration: ROCKET_DURATION,
        ease: 'easeOut',
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
          {THRUST.map((_, i) => (
            <motion.path
              key={i}
              d={line(i, 0)}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={departingThrustVariants}
              custom={i}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box' }}
            />
          ))}
          <motion.g
            variants={departingRocketVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box' }}
          >
            <RocketGeometry />
          </motion.g>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {THRUST.map((_, i) => (
              <motion.path
                key={i}
                d={line(i, 0)}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={arrivingThrustVariants}
                custom={i}
                animate={controls}
                initial="normal"
                style={{ transformBox: 'view-box' }}
              />
            ))}
            <motion.g
              variants={arrivingRocketVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box' }}
            >
              <RocketGeometry />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

Rocket01Icon.displayName = 'Rocket01Icon';

export { Rocket01Icon };
