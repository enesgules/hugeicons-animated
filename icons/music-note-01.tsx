'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MusicNote01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MusicNote01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the band plays: the sheet sways, the two note heads
// pulse on alternating beats, and the small note bobs its own eighth-note
// rhythm on top
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  animate: {
    rotate: [0, -4, 3.5, -4, 3.5, 0],
    translateY: [0, -0.8, 0, -0.8, 0],
    transition: {
      rotate: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
    },
  },
};

// downbeat — left head lands on 1 and 3
const headLeftVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.22, 1],
    transition: { duration: 0.45, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.45 },
  },
};

// backbeat — right head answers on 2 and 4
const headRightVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.22, 1],
    transition: {
      duration: 0.45,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.45,
      delay: 0.45,
    },
  },
};

// the little grace note noodles over the top in eighth notes
const smallNoteVariants: Variants = {
  normal: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    rotate: [0, -9, 7, 0],
    translateY: [0, -1.5, 0, -0.8, 0],
    transition: {
      rotate: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
    },
  },
};

// tiny notes escape the tune, float up, and dissolve — one per bar
const floatNoteVariants: Variants = {
  normal: { opacity: 0, translateY: 0, rotate: 0, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [1.5, -3.5],
    rotate: [0, i === 0 ? -12 : 12],
    transition: {
      duration: 1.4,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.4,
      delay: i * 0.9,
    },
  }),
};

const MusicNote01Icon = forwardRef<MusicNote01IconHandle, MusicNote01IconProps>(
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
          <motion.path
            d="M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={smallNoteVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <motion.circle
            cx="10.5"
            cy="19.5"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={headLeftVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <motion.circle
            cx="20"
            cy="18"
            r="2"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={headRightVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <path
            d="M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M13 13C17.8 13 21 10.6667 22 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={floatNoteVariants}
            custom={0}
            animate={controls}
            initial="normal"
          >
            <circle cx="15.2" cy="4.6" r="0.8" fill="currentColor" />
            <path d="M16 4.6V2.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
          </motion.g>
          <motion.g
            variants={floatNoteVariants}
            custom={1}
            animate={controls}
            initial="normal"
          >
            <circle cx="18.8" cy="3.2" r="0.65" fill="currentColor" />
            <path d="M19.45 3.2V1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

MusicNote01Icon.displayName = 'MusicNote01Icon';

export { MusicNote01Icon };
