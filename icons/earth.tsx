'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
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

// a gentle globe turn with a satellite tracing the near orbit
const earthVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, -5, 4, 0],
    scale: [1, 1.025, 1],
    transition: { duration: 1.5, times: [0, 0.32, 0.75, 1], ease: 'easeInOut' },
  },
};

const orbitVariants: Variants = {
  normal: { opacity: 0, pathLength: 0.2, rotate: 0 },
  animate: {
    opacity: [0, 0.55, 0],
    pathLength: [0.2, 1],
    rotate: [0, 18],
    transition: { duration: 1.25, ease: 'easeInOut' },
  },
};

const satelliteVariants: Variants = {
  normal: { opacity: 0, translateX: -5, translateY: 2 },
  animate: {
    opacity: [0, 1, 1, 0],
    translateX: [-5, 0, 5],
    translateY: [2, -2, 1],
    transition: { duration: 1.25, ease: 'easeInOut' },
  },
};

const EarthIcon = forwardRef<EarthIconHandle, EarthIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
            d="M12 22C6.47715 22 2 17.5228 2 12C2 9.20746 3.14465 6.68227 4.99037 4.86802M12 22C11.037 21.2864 11.1907 20.4555 11.6738 19.6247C12.4166 18.3474 12.4166 18.3474 12.4166 16.6444C12.4166 14.9414 13.4286 14.1429 17 14.8571C18.6047 15.1781 19.7741 12.9609 21.8573 13.693M12 22C16.9458 22 21.053 18.4096 21.8573 13.693M21.8573 13.693C21.9511 13.1427 22 12.5771 22 12C22 7.11857 18.5024 3.05405 13.8766 2.17579M13.8766 2.17579C14.3872 3.11599 14.1816 4.23551 13.1027 4.66298C11.3429 5.3603 12.6029 6.64343 11.1035 7.4356C10.1038 7.96372 8.6044 7.83152 7.10496 6.24716C6.31517 5.41264 5.83966 4.95765 4.99037 4.86802M13.8766 2.17579C13.2687 2.06039 12.6414 2 12 2C9.26969 2 6.79495 3.09421 4.99037 4.86802"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={earthVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.ellipse cx="12" cy="12" rx="11" ry="5.5" stroke="currentColor" strokeWidth="0.9" variants={orbitVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }} />
          <motion.circle cx="12" cy="6.5" r="0.8" fill="currentColor" variants={satelliteVariants} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

EarthIcon.displayName = 'EarthIcon';

export { EarthIcon };
