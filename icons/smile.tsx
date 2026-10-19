'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SmileIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SmileIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a beaming grin: the mouth tightens for a beat, then breaks into a wide grin
// while the cheeks push the eyes into a happy squint and the face giggles,
// before everything relaxes back to the untouched smile
const SMILE_TIMES = [0, 0.16, 0.38, 0.54, 0.7, 0.86, 1];

const MOUTH_REST = 'M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15';

const svgVariants: Variants = {
  normal: { transform: 'translateY(0%) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0%) rotate(0deg)',
      'translateY(2%) rotate(0deg)',
      'translateY(-5%) rotate(-6deg)',
      'translateY(-2%) rotate(5deg)',
      'translateY(-3.5%) rotate(-3deg)',
      'translateY(0.5%) rotate(1deg)',
      'translateY(0%) rotate(0deg)',
    ],
    transition: { duration: 1.1, ease: 'easeInOut', times: SMILE_TIMES },
  },
};

const mouthVariants: Variants = {
  normal: { d: MOUTH_REST },
  animate: {
    d: [
      MOUTH_REST,
      'M8.6 15.3C9.4 16.25 10.6 16.8 12 16.8C13.4 16.8 14.6 16.25 15.4 15.3',
      'M7.1 14.3C8.35 16.9 10.05 18.3 12 18.3C13.95 18.3 15.65 16.9 16.9 14.3',
      'M7.2 14.4C8.4 16.8 10.1 18.1 12 18.1C13.9 18.1 15.6 16.8 16.8 14.4',
      'M7.1 14.3C8.35 16.9 10.05 18.3 12 18.3C13.95 18.3 15.65 16.9 16.9 14.3',
      'M7.8 14.8C8.8 16.4 10.3 17.3 12 17.3C13.7 17.3 15.2 16.4 16.2 14.8',
      MOUTH_REST,
    ],
    transition: { duration: 1.1, ease: 'easeInOut', times: SMILE_TIMES },
  },
};

const eyeVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(0px) scaleY(1)',
      'translateY(-0.5px) scaleY(0.3)',
      'translateY(-0.5px) scaleY(0.3)',
      'translateY(-0.5px) scaleY(0.3)',
      'translateY(0px) scaleY(1)',
      'translateY(0px) scaleY(1)',
    ],
    transition: { duration: 1.1, ease: 'easeInOut', times: SMILE_TIMES },
  },
};

const SmileIcon = forwardRef<SmileIconHandle, SmileIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={svgVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 50%' }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={mouthVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15.625 8.387V8.91649M8.375 8.387V8.91649M8.75 8.75C8.75 8.33579 8.58211 8 8.375 8C8.16789 8 8 8.33579 8 8.75C8 9.16421 8.16789 9.5 8.375 9.5C8.58211 9.5 8.75 9.16421 8.75 8.75ZM16 8.75C16 8.33579 15.8321 8 15.625 8C15.4179 8 15.25 8.33579 15.25 8.75C15.25 9.16421 15.4179 9.5 15.625 9.5C15.8321 9.5 16 9.16421 16 8.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 8.75 / 24 }}
          />
        </motion.svg>
      </div>
    );
  }
);

SmileIcon.displayName = 'SmileIcon';

export { SmileIcon };
