'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface PlayIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PlayIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// anticipation, release, and a small motion trail make playback feel immediate
const playVariants: Variants = {
  normal: { translateX: 0, scaleX: 1, scaleY: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    translateX: [0, -1, 2.2, 0],
    scaleX: [1, 0.88, 1.12, 1],
    scaleY: [1, 1.05, 0.96, 1],
    transition: { duration: 0.7, times: [0, 0.22, 0.55, 1], ease: 'easeOut' },
  },
};

const playTrailVariants: Variants = {
  normal: { opacity: 0, translateX: 0, pathLength: 0 },
  animate: (i: number) => ({
    opacity: [0, 0.65, 0],
    translateX: [-1, 2.5],
    pathLength: [0, 1],
    transition: { duration: 0.42, delay: 0.25 + i * 0.07, ease: 'easeOut' },
  }),
};

const PlayIcon = forwardRef<PlayIconHandle, PlayIconProps>(
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <motion.path
            d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={playVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10px 12px' }}
          />
          <motion.path d="M1.5 9H3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={playTrailVariants} custom={0} animate={controls} initial="normal" />
          <motion.path d="M0.8 12H3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={playTrailVariants} custom={1} animate={controls} initial="normal" />
          <motion.path d="M1.5 15H3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={playTrailVariants} custom={2} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

PlayIcon.displayName = 'PlayIcon';

export { PlayIcon };
