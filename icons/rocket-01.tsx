'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
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

// Launch, shared by planes and rockets: the craft winds back, accelerates out
// of the frame, and a replacement glides in along the same route, runs a
// touch past its spot, and lands on a spring. The thrust lines flare at
// ignition, stay on the pad as a plume, and burn out; the replacement's
// exhaust draws out from its nozzle as it lands.
const LAUNCH_DURATION = 1.2;
const DEPART_TIMES = [0, 0.16, 0.42, 1];
const DEPART_EASE: Easing[] = ['easeOut', [0.5, 0, 0.9, 0.4], 'linear'];
const ARRIVE_TIMES = [0, 0.42, 0.66, 1];
const LAUNCH_LAND = springEase(0.45, 0.35);
const ARRIVE_EASE: Easing[] = ['linear', [0.2, 0.6, 0.35, 1], LAUNCH_LAND];

const departingRocketVariants: Variants = {
  normal: { transform: 'translate(0%, 0%) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(-1.5%, 1.5%) rotate(0.6deg)',
      'translate(150%, -150%) rotate(-3deg)',
      'translate(150%, -150%) rotate(-3deg)',
    ],
    transition: { duration: LAUNCH_DURATION, times: DEPART_TIMES, ease: DEPART_EASE },
  },
};

const arrivingRocketVariants: Variants = {
  normal: { transform: 'translate(-150%, 150%) rotate(-5deg)' },
  animate: {
    transform: [
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(-150%, 150%) rotate(-5deg)',
      'translate(3%, -3%) rotate(0.8deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: { duration: LAUNCH_DURATION, times: ARRIVE_TIMES, ease: ARRIVE_EASE },
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
const PLUME = [3, 2.2, 2.6];

const departingThrustVariants: Variants = {
  normal: (i: number) => ({
    d: line(i, 0),
    transform: 'translate(0px, 0px)',
    visibility: 'visible',
  }),
  animate: (i: number) => ({
    d: [
      line(i, 0),
      line(i, FLARE[i]),
      line(i, PLUME[i]),
      line(i, PLUME[i] + 1, 1),
      line(i, PLUME[i] + 1, 1),
    ],
    transform: [
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(-1.2px, 1.2px)',
      'translate(-1.2px, 1.2px)',
    ],
    visibility: ['visible', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: LAUNCH_DURATION,
      times: [0, 0.16, 0.3, 0.42, 1],
      ease: 'easeInOut',
    },
  }),
};

// The replacement's exhaust rides with its body and draws out from the nozzle
// as the rocket lands, each line at its own pace.
const arrivingThrustVariants: Variants = {
  normal: {
    ...arrivingRocketVariants.normal,
    pathLength: 0,
    pathOffset: 1,
    visibility: 'hidden',
  },
  animate: (i: number) => {
    const mid = [0.75, 0.45, 0.9][i];
    const exhaust = {
      duration: LAUNCH_DURATION,
      times: [0, 0.6, 0.76, 1],
      ease: 'easeOut',
    } as const;
    return {
      transform: (arrivingRocketVariants.animate as { transform: string[] }).transform,
      pathLength: [0, 0, mid, 1],
      pathOffset: [1, 1, 1 - mid, 0],
      visibility: ['hidden', 'hidden', 'visible', 'visible'],
      transition: {
        duration: LAUNCH_DURATION,
        times: ARRIVE_TIMES,
        ease: ARRIVE_EASE,
        pathLength: exhaust,
        pathOffset: exhaust,
        visibility: exhaust,
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
