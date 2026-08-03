'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Video01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Video01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the camera eases into record, the lens blinks, and the side gate opens
const cameraBodyVariants: Variants = {
  normal: { translateX: 0, scale: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    translateX: [0, -0.7, 0.4, 0],
    scale: [1, 0.98, 1.02, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const cameraWingVariants: Variants = {
  normal: { rotate: 0, scaleX: 1, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    rotate: [0, 7, -2, 0],
    scaleX: [1, 1.08, 1],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const recordDotVariants: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 0.45, 1.25, 1],
    opacity: [1, 0.3, 1, 1],
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const Video01Icon = forwardRef<Video01IconHandle, Video01IconProps>(
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
            d="M2 11C2 7.70017 2 6.05025 3.02513 5.02513C4.05025 4 5.70017 4 9 4H10C13.2998 4 14.9497 4 15.9749 5.02513C17 6.05025 17 7.70017 17 11V13C17 16.2998 17 17.9497 15.9749 18.9749C14.9497 20 13.2998 20 10 20H9C5.70017 20 4.05025 20 3.02513 18.9749C2 17.9497 2 16.2998 2 13V11Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={cameraBodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9.5px 12px' }}
          />
          <motion.path
            d="M17 8.90585L17.1259 8.80196C19.2417 7.05623 20.2996 6.18336 21.1498 6.60482C22 7.02628 22 8.42355 22 11.2181V12.7819C22 15.5765 22 16.9737 21.1498 17.3952C20.2996 17.8166 19.2417 16.9438 17.1259 15.198L17 15.0941"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={cameraWingVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17px 12px' }}
          />
          <motion.circle
            cx="11.5"
            cy="9.5"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={recordDotVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '11.5px 9.5px' }}
          />
        </svg>
      </div>
    );
  }
);

Video01Icon.displayName = 'Video01Icon';

export { Video01Icon };
