'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface StarIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface StarIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the star catches the light: a quick brightening pop, then glints keep
// flashing off its points while you hover — twinkling is a state
const svgVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.15, 0.97, 1.05, 1],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.3, 0.55, 0.8, 1] },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 0, scale: 0.4, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.4, 1, 0.6],
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.5,
      delay: 0.2 + i * 0.35,
    },
  }),
};

const StarIcon = forwardRef<StarIconHandle, StarIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

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
        >
          <path
            d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M21.4 9L23.2 9M22.3 8.1L22.3 9.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '22.3px 9px' }}
          />
          <motion.path
            d="M3.1 21.3L4.9 21.3M4 20.4L4 22.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '4px 21.3px' }}
          />
          <motion.path
            d="M1.1 11.5L2.9 11.5M2 10.6L2 12.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '2px 11.5px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

StarIcon.displayName = 'StarIcon';

export { StarIcon };
