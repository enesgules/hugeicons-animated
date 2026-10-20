'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

/** Imperative controls for the Copy icon animation. */
export interface Copy01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Copy01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FRONT_PATH =
  'M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z';

// Copy, shared by clipboards and sheets: a short wind-up, the copy moves onto
// the original, holds there, and springs back out to its own place.
const COPY_DURATION = 1;
const COPY_TIMES = [0, 0.12, 0.36, 0.5, 1];
const COPY_LAND = springEase(0.45, 0.35);
const COPY_EASE: Easing[] = ['easeOut', [0.4, 0, 0.2, 1], 'linear', COPY_LAND];

// The front sheet grows to cover the rear panel, pauses, then springs back.
const frontVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px) scale(1)',
    strokeWidth: 1.5,
  },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0.45px, 0.45px) scale(0.97)',
      'translate(-6px, -6px) scale(1.14)',
      'translate(-6px, -6px) scale(1.14)',
      'translate(0px, 0px) scale(1)',
    ],
    strokeWidth: [1.5, 1.5 / 0.97, 1.5 / 1.14, 1.5 / 1.14, 1.5],
    transition: { duration: COPY_DURATION, times: COPY_TIMES, ease: COPY_EASE },
  },
};

// The invisible mask grows during the overlap so the rear panel is fully hidden.
const occlusionVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0.45px, 0.45px) scale(0.97)',
      'translate(-6px, -6px) scale(1.18)',
      'translate(-6px, -6px) scale(1.18)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: { duration: COPY_DURATION, times: COPY_TIMES, ease: COPY_EASE },
  },
};

// The occlusion mask is only active while the sheets overlap; at rest it would
// trim the ends of the rear panel.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: COPY_DURATION, times: [0, 0.999, 1] },
  },
};

/** Animated Copy icon with imperative hover controls. */
const Copy01Icon = forwardRef<Copy01IconHandle, Copy01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const occlusionMaskId = useId();
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
          <defs>
            <mask
              id={occlusionMaskId}
              maskUnits="userSpaceOnUse"
              x="-4"
              y="-4"
              width="32"
              height="32"
            >
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.path
                  d={FRONT_PATH}
                  fill="black"
                  stroke="black"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  variants={occlusionVariants}
                  animate={controls}
                  initial="normal"
                  style={{ transformBox: 'view-box', originX: 15.5 / 24, originY: 15.5 / 24 }}
                />
              </motion.g>
            </mask>
          </defs>
          <motion.path
            d={FRONT_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={frontVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15.5 / 24, originY: 15.5 / 24 }}
          />
          <motion.path
            d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            mask={`url(#${occlusionMaskId})`}
          />
        </svg>
      </div>
    );
  }
);

Copy01Icon.displayName = 'Copy01Icon';

export { Copy01Icon };
