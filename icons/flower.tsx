'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FlowerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlowerIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the bloom unfurls around a softly breathing center
const bloomVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, -5, 7, 0],
    scale: [1, 0.94, 1.06, 1],
    transition: { duration: 1.1, times: [0, 0.25, 0.7, 1], ease: 'easeInOut' },
  },
};

const flowerCenterVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.75, 1.18, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const FlowerIcon = forwardRef<FlowerIconHandle, FlowerIconProps>(
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
            d="M14.4999 12.5C14.4999 13.8807 13.3807 15 11.9999 15C10.6192 15 9.49994 13.8807 9.49994 12.5C9.49994 11.1193 10.6192 10 11.9999 10C13.3807 10 14.4999 11.1193 14.4999 12.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flowerCenterVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12.5px' }}
          />
          <motion.path
            d="M11.9999 3C14.2091 3 15.998 4.91739 15.998 7.12653C16.3182 7.04393 16.6539 7 16.9999 7C19.2091 7 20.9999 8.79086 20.9999 11C20.9999 12.5964 20.0647 13.9745 18.7122 14.616C19.2071 15.2818 19.4999 16.1067 19.4999 17C19.4999 19.2091 17.7091 21 15.4999 21C13.9939 21 12.6823 20.1677 11.9999 18.938C11.3176 20.1677 10.006 21 8.49994 21C6.2908 21 4.49994 19.2091 4.49994 17C4.49994 16.1067 4.79277 15.2818 5.28767 14.616C3.93518 13.9745 2.99994 12.5964 2.99994 11C2.99994 8.79086 4.7908 7 6.99994 7C7.34595 7 7.68169 7.04393 8.0019 7.12652C8.0019 4.91738 9.7908 3 11.9999 3Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bloomVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

FlowerIcon.displayName = 'FlowerIcon';

export { FlowerIcon };
