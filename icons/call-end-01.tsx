'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CallEnd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CallEnd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HANG_UP_DURATION = 0.9;

// The handset lifts, slams down onto the cradle, and bounces to rest; the
// end mark stamps a quarter turn on the impact.
const handsetVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-1.3px) rotate(-9deg)',
      'translateY(1.2px) rotate(5deg)',
      'translateY(-0.4px) rotate(-1.8deg)',
      'translateY(0.12px) rotate(0.5deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: HANG_UP_DURATION,
      times: [0, 0.26, 0.44, 0.62, 0.8, 1],
      ease: ['easeOut', [0.55, 0, 0.9, 0.45], 'easeOut', 'easeInOut', 'easeInOut'],
    },
  },
};

const endMarkVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(0deg) scale(1)',
      'rotate(-14deg) scale(0.85)',
      'rotate(100deg) scale(1.16)',
      'rotate(87deg) scale(0.98)',
      'rotate(90deg) scale(1)',
    ],
    transition: {
      duration: HANG_UP_DURATION,
      times: [0, 0.2, 0.42, 0.64, 0.82, 1],
      ease: 'easeInOut',
    },
  },
};

const CallEnd01Icon = forwardRef<CallEnd01IconHandle, CallEnd01IconProps>(
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
            d="M20 4L14 10M20 10L14 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={endMarkVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17 / 24, originY: 7 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

CallEnd01Icon.displayName = 'CallEnd01Icon';

export { CallEnd01Icon };
