'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CallIncoming01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CallIncoming01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RING_DURATION = 0.7;
const RING_TIMES = [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1];
const RING_REST = 0.55;

// while you hover, the call keeps coming in: the handset rattles, rests, and
// rattles again, and the arrow pulls back and pokes into it with each ring
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)', transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-12deg)', 'rotate(10deg)', 'rotate(-8deg)', 'rotate(6deg)', 'rotate(-3deg)', 'rotate(0deg)'],
    transition: { duration: RING_DURATION, ease: 'easeInOut', times: RING_TIMES, repeat: Infinity, repeatDelay: RING_REST },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px)', transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    transform: ['translateX(0px)', 'translateX(0.8px)', 'translateX(-1.8px)', 'translateX(0.3px)', 'translateX(0px)'],
    transition: { duration: RING_DURATION, ease: 'easeInOut', times: [0, 0.15, 0.3, 0.5, 1], repeat: Infinity, repeatDelay: RING_REST },
  },
};

const CallIncoming01Icon = forwardRef<CallIncoming01IconHandle, CallIncoming01IconProps>(
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
          <motion.path
            d="M16 10C15.3932 9.41016 13 7.84027 13 7C13 6.15973 15.3932 4.58984 16 4M13.5 7H21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

CallIncoming01Icon.displayName = 'CallIncoming01Icon';

export { CallIncoming01Icon };
