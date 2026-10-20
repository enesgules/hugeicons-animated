'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CallIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CallIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RING = springEase(0.7, 0.45);
const RING_DURATION = 0.9;
const RING_TIMES = [0, 0.16, 1];
const RING_REST = 0.4;

// Ring, shared by every phone icon: the handset kicks to one side, then a
// high-bounce spring rattles it back through rest until it settles. While
// you hover it keeps ringing, and short ring rays burst out of its open
// corner with each kick.
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)', transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-15deg)', 'rotate(0deg)'],
    transition: {
      duration: RING_DURATION,
      times: RING_TIMES,
      ease: ['easeOut', RING],
      repeat: Infinity,
      repeatDelay: RING_REST,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const rayVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0, visibility: 'hidden' },
  animate: (i: number) => ({
    pathLength: [0, 0, 1, 1, 0.25, 0.25],
    pathOffset: [0, 0, 0, 0, 0.75, 0.75],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: RING_DURATION,
      ease: 'easeOut',
      times: [0, 0.1 + i * 0.04, 0.26 + i * 0.04, 0.44 + i * 0.04, 0.6 + i * 0.04, 1],
      repeat: Infinity,
      repeatDelay: RING_REST,
    },
  }),
};

const CallIcon = forwardRef<CallIconHandle, CallIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M16.181 7.819L17.9497 6.05025"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={rayVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M13 6.50195V4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={rayVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M17.5 11.002L20 11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={rayVariants}
              custom={2}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M4.91186 10.5413L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.93709 13.3996 10.6004 20.0629 18.9922 20.9891C20.0962 21.1109 21 20.1988 21 19.0881V17.5799C21 17.0246 20.5479 16.569 20.0015 16.4696C19.3988 16.36 18.7611 16.1804 18.2276 16.0103C17.4611 15.7659 16.6091 15.9377 16.0403 16.5065L13.4587 19.0881"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handsetVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

CallIcon.displayName = 'CallIcon';

export { CallIcon };
