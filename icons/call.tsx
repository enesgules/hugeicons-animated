'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CallIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CallIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RING_PERIOD = 1.25;
const RATTLE_TIMES = [0, 0.084, 0.168, 0.28, 0.392, 0.476, 0.56, 1];

// While you hover, the handset keeps ringing: it rattles, and short ring rays
// burst out of its open corner with each rattle, then rest and repeat.
const handsetVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    rotate: [0, -12, 10, -8, 6, -3, 0, 0],
    transition: {
      duration: RING_PERIOD,
      ease: 'easeInOut',
      times: RATTLE_TIMES,
      repeat: Infinity,
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
      duration: RING_PERIOD,
      ease: 'easeOut',
      times: [0, 0.04 + i * 0.03, 0.18 + i * 0.03, 0.36 + i * 0.03, 0.52 + i * 0.03, 1],
      repeat: Infinity,
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
