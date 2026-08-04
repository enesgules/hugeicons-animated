'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface BulbIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BulbIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a current climbs the stem, energizes the filament, and flexes the glass
// before five well-spaced rays draw outward
const glassVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1, 1)' },
  animate: {
    transform: [
      'translateY(0px) scale(1, 1)',
      'translateY(0.35px) scale(0.97, 0.94)',
      'translateY(-0.55px) scale(1.045, 1.06)',
      'translateY(0.1px) scale(0.995, 0.99)',
      'translateY(0px) scale(1, 1)',
    ],
    transition: { duration: 0.58, delay: 0.08, ease: [0.23, 1, 0.32, 1], times: [0, 0.24, 0.52, 0.78, 1] },
  },
};

const filamentVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transform: 'scaleX(1)' },
  animate: {
    pathLength: [1, 0.35, 1, 1],
    opacity: [1, 0.45, 1, 1],
    transform: ['scaleX(1)', 'scaleX(0.78)', 'scaleX(1.14)', 'scaleX(1)'],
    transition: { duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 0.62, 1] },
  },
};

const currentVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [1, 0.12, 1, 1],
    opacity: [1, 0.3, 1, 1],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1], times: [0, 0.2, 0.7, 1] },
  },
};

type LightRay = { x: number; y: number; delay: number };

const rayVariants: Variants = {
  normal: ({ x, y }: LightRay) => ({
    opacity: 0,
    pathLength: 0,
    transform: 'translate(' + -x + 'px, ' + -y + 'px)',
  }),
  animate: ({ x, y, delay }: LightRay) => ({
    opacity: [0, 1, 1],
    pathLength: [0, 1, 1],
    transform: [
      'translate(' + -x + 'px, ' + -y + 'px)',
      'translate(0px, 0px)',
      'translate(' + x * 0.18 + 'px, ' + y * 0.18 + 'px)',
    ],
    transition: {
      duration: 0.48,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.68, 1],
      delay: 0.18 + delay,
    },
  }),
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};


const BulbIcon = forwardRef<BulbIconHandle, BulbIconProps>(
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
          overflow="visible"
        >
          <motion.path
            d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glassVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 14px' }}
          />
          <motion.path
            d="M14 10C13.3875 10.6432 12.7111 11 12 11C11.2889 11 10.6125 10.6432 10 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={filamentVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10.5px' }}
          />
          <path
            d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 15.5V11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={currentVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.path
            d="M12 0V-1.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: 0, y: -0.8, delay: 0.08 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M5 2.2L3.7 0.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: -0.55, y: -0.55, delay: 0 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M19 2.2L20.3 0.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: 0.55, y: -0.55, delay: 0.04 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2 9.8H0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: -0.75, y: 0, delay: 0.12 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22 9.8H23.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: 0.75, y: 0, delay: 0.16 }}
            animate={controls}
            initial="normal"
          />
          </motion.g>
        </svg>
      </div>
    );
  }
);

BulbIcon.displayName = 'BulbIcon';

export { BulbIcon };
