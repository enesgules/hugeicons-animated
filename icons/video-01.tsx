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

// the camera stays anchored while its side lens opens away from the body
const cameraBodyVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.985)', 'scale(1.015)', 'scale(1)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const cameraWingVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1)' },
  animate: {
    transform: ['translateX(0px) scaleX(1)', 'translateX(0.8px) scaleX(1.08)', 'translateX(-0.12px) scaleX(0.99)', 'translateX(0px) scaleX(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const recordDotVariants: Variants = {
  normal: { scale: 1, visibility: 'visible' },
  animate: {
    scale: [1, 0.72, 1.16, 1],
    visibility: ['visible', 'visible', 'visible', 'visible'],
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
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
