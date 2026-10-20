'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AirplaneTakeOff01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AirplaneTakeOff01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Launch, shared by planes and rockets: the craft winds back, accelerates out
// of the frame, and a replacement glides in along the same route, runs a
// touch past its spot, and lands on a spring. A tree scrolls past on the
// ground to show the speed.
const LAUNCH_DURATION = 1.2;
const DEPART_TIMES = [0, 0.16, 0.42, 1];
const DEPART_EASE: Easing[] = ['easeOut', [0.5, 0, 0.9, 0.4], 'linear'];
const ARRIVE_TIMES = [0, 0.42, 0.66, 1];
const LAUNCH_LAND = springEase(0.45, 0.35);
const ARRIVE_EASE: Easing[] = ['linear', [0.2, 0.6, 0.35, 1], LAUNCH_LAND];

const departingPlaneVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(-0.7px, 0.1px) rotate(1.5deg)',
      'translate(24.5px, -8.4px) rotate(-8deg)',
      'translate(24.5px, -8.4px) rotate(-8deg)',
    ],
    transition: { duration: LAUNCH_DURATION, times: DEPART_TIMES, ease: DEPART_EASE },
  },
};

const arrivingPlaneVariants: Variants = {
  normal: { transform: 'translate(-24.5px, -7.7px) rotate(7deg)' },
  animate: {
    transform: [
      'translate(-24.5px, -7.7px) rotate(7deg)',
      'translate(-24.5px, -7.7px) rotate(7deg)',
      'translate(0.9px, 0.3px) rotate(-1deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: { duration: LAUNCH_DURATION, times: ARRIVE_TIMES, ease: ARRIVE_EASE },
  },
};

const groundTreeVariants: Variants = {
  normal: { transform: 'translateX(15px)' },
  animate: {
    transform: ['translateX(15px)', 'translateX(-22px)'],
    transition: { duration: LAUNCH_DURATION, ease: 'linear' },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const AirplaneTakeOff01Icon = forwardRef<AirplaneTakeOff01IconHandle, AirplaneTakeOff01IconProps>(
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
          <path
            d="M2.00031 20H18.0003"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M3.82527 12.1661C3.55027 11.9661 3.30027 11.7161 3.00028 10.8411C2.91891 10.6241 2.61139 9.53619 2.35028 8.54109C2.13003 7.7017 1.93377 6.93555 2.02528 6.74109C2.10029 6.54109 2.20027 6.39109 2.52527 6.19109C2.72527 6.06802 3.75027 5.81609 3.95027 5.76609C4.15027 5.71609 4.42526 5.69109 4.65027 5.76609C5.07527 5.84109 5.95027 7.11609 6.17527 7.26609C6.27526 7.36609 6.60027 7.657 6.97527 7.69109C7.25027 7.71609 7.52527 7.64109 7.82528 7.51609C8.10027 7.40151 13.5253 4.76609 14.0253 4.54109C18.1003 2.84109 21.0603 5.63609 21.5103 6.23609C21.9753 6.81609 22.0753 6.99109 21.9503 7.49109C21.7887 8.01609 21.3503 8.11609 21.1003 8.19109C20.8503 8.26609 17.4003 9.19109 16.0503 9.56609C15.7554 9.6621 15.6114 9.85492 15.5753 9.89109C15.4003 10.1411 14.6053 11.8411 14.3803 12.2161C14.2253 12.6161 13.8003 13.1161 13.2503 13.3161C12.6753 13.5161 11.6753 13.7411 11.4503 13.8161C11.2253 13.8911 10.7003 14.0411 10.5253 13.9911C10.3003 13.9411 10.0853 13.7161 10.1853 13.3661C10.2853 13.0161 10.4753 12.0411 10.5003 11.8911C10.5253 11.7411 10.7753 11.1161 10.5003 11.0911C10.4503 11.0161 9.92527 11.2411 9.15027 11.4161C8.57449 11.5782 7.9715 11.7386 7.55027 11.8411C5.92527 12.3161 5.04521 12.4411 4.85027 12.4411C4.47527 12.4411 4.20027 12.3911 3.82527 12.1661Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={departingPlaneVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 9 / 24 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M12.65 20L12.45 18.65C11.38 18.62 10.55 17.88 10.55 16.95C10.55 16.18 11.1 15.55 11.85 15.42C12.02 14.46 12.7 13.8 13.55 13.8C14.4 13.8 15.08 14.46 15.25 15.42C16 15.55 16.55 16.18 16.55 16.95C16.55 17.88 15.72 18.62 14.65 18.65L14.45 20H12.65Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
              variants={groundTreeVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M3.82527 12.1661C3.55027 11.9661 3.30027 11.7161 3.00028 10.8411C2.91891 10.6241 2.61139 9.53619 2.35028 8.54109C2.13003 7.7017 1.93377 6.93555 2.02528 6.74109C2.10029 6.54109 2.20027 6.39109 2.52527 6.19109C2.72527 6.06802 3.75027 5.81609 3.95027 5.76609C4.15027 5.71609 4.42526 5.69109 4.65027 5.76609C5.07527 5.84109 5.95027 7.11609 6.17527 7.26609C6.27526 7.36609 6.60027 7.657 6.97527 7.69109C7.25027 7.71609 7.52527 7.64109 7.82528 7.51609C8.10027 7.40151 13.5253 4.76609 14.0253 4.54109C18.1003 2.84109 21.0603 5.63609 21.5103 6.23609C21.9753 6.81609 22.0753 6.99109 21.9503 7.49109C21.7887 8.01609 21.3503 8.11609 21.1003 8.19109C20.8503 8.26609 17.4003 9.19109 16.0503 9.56609C15.7554 9.6621 15.6114 9.85492 15.5753 9.89109C15.4003 10.1411 14.6053 11.8411 14.3803 12.2161C14.2253 12.6161 13.8003 13.1161 13.2503 13.3161C12.6753 13.5161 11.6753 13.7411 11.4503 13.8161C11.2253 13.8911 10.7003 14.0411 10.5253 13.9911C10.3003 13.9411 10.0853 13.7161 10.1853 13.3661C10.2853 13.0161 10.4753 12.0411 10.5003 11.8911C10.5253 11.7411 10.7753 11.1161 10.5003 11.0911C10.4503 11.0161 9.92527 11.2411 9.15027 11.4161C8.57449 11.5782 7.9715 11.7386 7.55027 11.8411C5.92527 12.3161 5.04521 12.4411 4.85027 12.4411C4.47527 12.4411 4.20027 12.3911 3.82527 12.1661Z"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={arrivingPlaneVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 0.5, originY: 9 / 24 }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

AirplaneTakeOff01Icon.displayName = 'AirplaneTakeOff01Icon';

export { AirplaneTakeOff01Icon };
