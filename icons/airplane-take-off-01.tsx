'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AirplaneTakeOff01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AirplaneTakeOff01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// one solid plane fully clears the frame before a second solid plane enters
// and decelerates into the same runway slot
const departingPlaneVariants: Variants = {
  normal: {
    opacity: 1,
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    opacity: 1,
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(3%, -1%) rotate(-0.5deg)',
      'translate(12%, -7%) rotate(-2deg)',
      'translate(28%, -18%) rotate(-4deg)',
      'translate(50%, -33%) rotate(-7deg)',
      'translate(76%, -49%) rotate(-8deg)',
      'translate(104%, -65%) rotate(-6deg)',
      'translate(122%, -76%) rotate(-4deg)',
      'translate(122%, -76%) rotate(-4deg)',
    ],
    transition: {
      duration: 1.7,
      ease: 'linear',
      times: [0, 0.08, 0.18, 0.28, 0.37, 0.44, 0.49, 0.52, 1],
    },
  },
};

const arrivingPlaneVariants: Variants = {
  normal: {
    opacity: 1,
    transform: 'translate(-122%, -70%) rotate(7deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    opacity: 1,
    transform: [
      'translate(-122%, -70%) rotate(7deg)',
      'translate(-122%, -70%) rotate(7deg)',
      'translate(-108%, -62%) rotate(6deg)',
      'translate(-82%, -48%) rotate(5deg)',
      'translate(-56%, -32%) rotate(3.5deg)',
      'translate(-32%, -17%) rotate(2deg)',
      'translate(-14%, -6%) rotate(0.8deg)',
      'translate(-3%, -0.8%) rotate(0.15deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: {
      duration: 1.7,
      ease: 'linear',
      times: [0, 0.49, 0.53, 0.61, 0.7, 0.79, 0.88, 0.96, 1],
    },
  },
};

const groundTreeVariants: Variants = {
  normal: { opacity: 1, transform: 'translateX(15px)' },
  animate: {
    opacity: 1,
    transform: [
      'translateX(15px)',
      'translateX(13px)',
      'translateX(8px)',
      'translateX(1px)',
      'translateX(-7px)',
      'translateX(-15px)',
      'translateX(-22px)',
    ],
    transition: { duration: 1.7, ease: 'linear', times: [0, 0.08, 0.22, 0.4, 0.6, 0.78, 1] },
  },
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
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
            style={{ transformOrigin: '12px 9px' }}
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
              style={{ transformOrigin: '12px 9px' }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

AirplaneTakeOff01Icon.displayName = 'AirplaneTakeOff01Icon';

export { AirplaneTakeOff01Icon };
