'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Calendar01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Calendar01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CALENDAR_DURATION = 0.8;

// The day page folds up into its binding and the next page drops down from it;
// the calendar dips on its rings as the new page lands.
const dayVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: [
      'scaleY(1)',
      'scaleY(1.06)',
      'scaleY(0.04)',
      'scaleY(1.1)',
      'scaleY(0.96)',
      'scaleY(1)',
    ],
    transition: {
      duration: CALENDAR_DURATION,
      times: [0, 0.12, 0.38, 0.62, 0.8, 1],
      ease: ['easeOut', [0.55, 0, 0.8, 0.4], [0.2, 0.6, 0.35, 1], 'easeInOut', 'easeInOut'],
    },
  },
};

const calendarVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(0px) scaleY(1)',
      'translateY(0.7px) scaleY(0.97)',
      'translateY(-0.35px) scaleY(1.012)',
      'translateY(0px) scaleY(1)',
    ],
    transition: {
      duration: CALENDAR_DURATION,
      times: [0, 0.5, 0.66, 0.84, 1],
      ease: 'easeOut',
    },
  },
};

const Calendar01Icon = forwardRef<Calendar01IconHandle, Calendar01IconProps>(
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
          <motion.g
            variants={calendarVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 4 / 24 }}
          >
            <path
              d="M16 2V6M8 2V6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3 10H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M10 18.5002L9.99999 13.8474C9.99999 13.6557 9.86325 13.5002 9.69458 13.5002H9M14 18.4983L15.4855 13.8923C15.4951 13.8626 15.5 13.8315 15.5 13.8002C15.5 13.6346 15.3657 13.5002 15.2 13.5002L13 13.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={dayVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 0.5, originY: 12.6 / 24 }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Calendar01Icon.displayName = 'Calendar01Icon';

export { Calendar01Icon };
