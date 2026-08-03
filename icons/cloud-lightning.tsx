'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CloudLightningIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudLightningIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// pressure gathers in the cloud before a bright, double-hit strike
const stormCloudVariants: Variants = {
  normal: { translateY: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  animate: {
    translateY: [0, -0.7, 0.25, 0],
    scale: [1, 1.025, 0.99, 1],
    transition: { duration: 1.2, times: [0, 0.35, 0.72, 1], ease: 'easeInOut' },
  },
};

const boltVariants: Variants = {
  normal: { opacity: 1, pathLength: 1, scale: 1 },
  animate: {
    opacity: [1, 0.15, 1, 0.2, 1],
    pathLength: [1, 0.1, 1, 0.35, 1],
    scale: [1, 0.9, 1.12, 0.95, 1],
    transition: { duration: 0.85, times: [0, 0.18, 0.3, 0.55, 0.7], ease: 'easeOut' },
  },
};

const flashRayVariants: Variants = {
  normal: { opacity: 0, scale: 0.4 },
  animate: (i: number) => ({
    opacity: [0, 0.9, 0],
    scale: [0.4, 1],
    transition: { duration: 0.3, delay: 0.22 + i * 0.04, ease: 'easeOut' },
  }),
};

const CloudLightningIcon = forwardRef<CloudLightningIconHandle, CloudLightningIconProps>(
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
            d="M7 18C4.23858 18 2 15.7614 2 13C2 10.4003 3.98398 8.26407 6.52042 8.0227M17.5 18C19.9853 18 22 15.9853 22 13.5C22 11.0147 19.9853 9 17.5 9C17.4925 9 17.485 9.00002 17.4776 9.00005M16.9003 11C17.2119 10.3904 17.4131 9.71494 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.7111 8 8.38754 8.14845 9 8.41604"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={stormCloudVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M12.9994 13L11.1994 15.4C10.6758 16.0981 10.414 16.4472 10.5522 16.7236C10.6904 17 11.1267 17 11.9994 17C12.8721 17 13.3084 17 13.4466 17.2764C13.5848 17.5528 13.323 17.9019 12.7994 18.6L10.9994 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boltVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 17px' }}
          />
          <motion.path d="M7.6 18.2L6.3 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={flashRayVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '12px 17px' }} />
          <motion.path d="M16.4 18.2L17.7 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={flashRayVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '12px 17px' }} />
        </svg>
      </div>
    );
  }
);

CloudLightningIcon.displayName = 'CloudLightningIcon';

export { CloudLightningIcon };
