'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Calendar03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Calendar03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the binder responds once, then each date appears in reading order
const ringsVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1.1px)', 'translateY(0.25px)', 'translateY(0px)'],
    transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] },
  },
};

const sourceDaysVariants: Variants = {
  normal: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};

const dayVariants: Variants = {
  normal: { opacity: 0, transform: 'scale(0.9)' },
  animate: (i: number) => ({
    opacity: [0, 1, 1],
    transform: ['scale(0.9)', 'scale(1.16)', 'scale(1)'],
    transition: { duration: 0.3, delay: 0.08 + i * 0.065, ease: [0.23, 1, 0.32, 1] },
  }),
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};


const Calendar03Icon = forwardRef<Calendar03IconHandle, Calendar03IconProps>(
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
            d="M16 2V6M8 2V6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={ringsVariants}
            animate={controls}
            initial="normal"
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
            d="M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sourceDaysVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.circle cx="7.5" cy="14" r="0.72" fill="currentColor" variants={dayVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '7.5px 14px' }} />
          <motion.circle cx="12" cy="14" r="0.72" fill="currentColor" variants={dayVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '12px 14px' }} />
          <motion.circle cx="16.5" cy="14" r="0.72" fill="currentColor" variants={dayVariants} custom={2} animate={controls} initial="normal" style={{ transformOrigin: '16.5px 14px' }} />
          <motion.circle cx="7.5" cy="18" r="0.72" fill="currentColor" variants={dayVariants} custom={3} animate={controls} initial="normal" style={{ transformOrigin: '7.5px 18px' }} />
          <motion.circle cx="12" cy="18" r="0.72" fill="currentColor" variants={dayVariants} custom={4} animate={controls} initial="normal" style={{ transformOrigin: '12px 18px' }} />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Calendar03Icon.displayName = 'Calendar03Icon';

export { Calendar03Icon };
