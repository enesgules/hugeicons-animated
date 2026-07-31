'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MouseLeftClick01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MouseLeftClick01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the finger button depresses and two drawn ticks mark the click
const mouseButtonVariants: Variants = {
  normal: { scaleY: 1, translateY: 0, transition: { type: 'spring', duration: 0.35, bounce: 0 } },
  animate: {
    scaleY: [1, 0.7, 1],
    translateY: [0, 0.7, 0],
    transition: { duration: 0.42, times: [0, 0.38, 1], ease: 'easeOut' },
  },
};

const mouseBodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.45, 0],
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const clickTickVariants: Variants = {
  normal: { opacity: 0, pathLength: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    pathLength: [0, 1],
    transition: { duration: 0.45, delay: 0.16 + i * 0.06, ease: 'easeOut' },
  }),
};

const MouseLeftClick01Icon = forwardRef<MouseLeftClick01IconHandle, MouseLeftClick01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
            d="M13.5 2L13.5 6M13.5 10L13.5 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={mouseButtonVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '13.5px 6px' }}
          />
          <motion.path
            d="M5 2C3.94531 3.13158 3.23544 4.50113 3 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={clickTickVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 7.5C12 7.03406 12 6.80109 12.0761 6.61732C12.1776 6.37229 12.3723 6.17761 12.6173 6.07612C12.8011 6 13.0341 6 13.5 6C13.9659 6 14.1989 6 14.3827 6.07612C14.6277 6.17761 14.8224 6.37229 14.9239 6.61732C15 6.80109 15 7.03406 15 7.5V8.5C15 8.96594 15 9.19891 14.9239 9.38268C14.8224 9.62771 14.6277 9.82239 14.3827 9.92388C14.1989 10 13.9659 10 13.5 10C13.0341 10 12.8011 10 12.6173 9.92388C12.3723 9.82239 12.1776 9.62771 12.0761 9.38268C12 9.19891 12 8.96594 12 8.5V7.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={mouseButtonVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '13.5px 8px' }}
          />
          <motion.path
            d="M6.24061 17.0888C6.43047 19.4803 8.32417 21.511 10.765 21.8118C11.6626 21.9223 12.5752 22 13.5 22C14.4247 22 15.3373 21.9223 16.2349 21.8118C18.6758 21.511 20.5694 19.4803 20.7593 17.0888C20.8909 15.4317 21 13.732 21 12C21 10.268 20.8909 8.56832 20.7593 6.91118C20.5694 4.51965 18.6758 2.48893 16.2349 2.1882C15.3373 2.07762 14.4247 2 13.5 2C12.5752 2 11.6626 2.07762 10.765 2.1882C8.32417 2.48893 6.43047 4.51965 6.24061 6.91118C6.10903 8.56832 6 10.268 6 12C6 13.732 6.10903 15.4317 6.24061 17.0888Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={mouseBodyVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path d="M8.2 3.6L6.8 2.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={clickTickVariants} custom={1} animate={controls} initial="normal" />
          <motion.path d="M9.8 1.8L9.4 0.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={clickTickVariants} custom={2} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

MouseLeftClick01Icon.displayName = 'MouseLeftClick01Icon';

export { MouseLeftClick01Icon };
