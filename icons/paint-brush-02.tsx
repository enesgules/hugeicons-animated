'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PaintBrush02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PaintBrush02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The whole roller rolls down the wall and lays a stroked paint line behind
// its top (trailing) edge, then rolls back up and collects it. The line stays
// on the wall; a clip edge that follows the roller (with a gap) reveals it as
// the roller passes and hides it again on the return pass.
const ROLL_DURATION = 1;
const ROLL_TIMES = [0, 0.12, 0.45, 0.55, 0.86, 1];
const ROLL_EASE: Easing[] = ['easeOut', 'easeInOut', 'linear', 'easeInOut', 'easeOut'];
const TRAVEL = 3.5;

const toolVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.45, TRAVEL, TRAVEL, -0.35, 0],
    transition: { duration: ROLL_DURATION, ease: ROLL_EASE, times: ROLL_TIMES },
  },
};

// Clip bottom edge = roller top outer edge minus a 0.6 gap, so the paint line
// never touches the roller.
const CLIP_TOP = -4;
const clipVariants: Variants = {
  normal: { height: 2 - 0.75 - 0.6 - CLIP_TOP },
  animate: {
    height: [0, -0.45, TRAVEL, TRAVEL, -0.35, 0].map((y) => y + 2 - 0.75 - 0.6 - CLIP_TOP),
    transition: { duration: ROLL_DURATION, ease: ROLL_EASE, times: ROLL_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: ROLL_DURATION, times: [0, 0.999, 1] },
  },
};

const PaintBrush02Icon = forwardRef<PaintBrush02IconHandle, PaintBrush02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const clipId = useId();
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
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <motion.rect
                x="-4"
                y={CLIP_TOP}
                width="32"
                variants={clipVariants}
                animate={controls}
                initial="normal"
              />
            </clipPath>
          </defs>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
            clipPath={`url(#${clipId})`}
          >
            <path
              d="M5.5 2.75H15.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.g
            variants={toolVariants}
            animate={controls}
            initial="normal"
          >
            <path
              d="M4 5C4 4.25579 4 3.88369 4.08912 3.58019C4.30005 2.86183 4.86183 2.30005 5.58019 2.08912C5.88369 2 6.25579 2 7 2H14C14.7442 2 15.1163 2 15.4198 2.08912C16.1382 2.30005 16.7 2.86183 16.9109 3.58019C17 3.88369 17 4.25579 17 5C17 5.74421 17 6.11631 16.9109 6.41981C16.7 7.13817 16.1382 7.69995 15.4198 7.91088C15.1163 8 14.7442 8 14 8H7C6.25579 8 5.88369 8 5.58019 7.91088C4.86183 7.69995 4.30005 7.13817 4.08912 6.41981C4 6.11631 4 5.74421 4 5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <path
              d="M12 17.5C12 17.0341 12 16.8011 12.0761 16.6173C12.1776 16.3723 12.3723 16.1776 12.6173 16.0761C12.8011 16 13.0341 16 13.5 16C13.9659 16 14.1989 16 14.3827 16.0761C14.6277 16.1776 14.8224 16.3723 14.9239 16.6173C15 16.8011 15 17.0341 15 17.5V20.5C15 20.9659 15 21.1989 14.9239 21.3827C14.8224 21.6277 14.6277 21.8224 14.3827 21.9239C14.1989 22 13.9659 22 13.5 22C13.0341 22 12.8011 22 12.6173 21.9239C12.3723 21.8224 12.1776 21.6277 12.0761 21.3827C12 21.1989 12 20.9659 12 20.5V17.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <path
              d="M17.249 5C18.1037 5 18.531 5 18.8681 5.15224C19.9978 5.6624 20.0005 6.86278 20.0005 8.00422C20.0005 8.96065 20.0005 9.43886 19.8701 9.84219C19.4513 11.1378 17.7387 11.768 16.0836 12.2373C14.9006 12.5727 14.3091 12.7404 13.9045 13.2756C13.5 13.8107 13.5 14.4389 13.5 15.6952V16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PaintBrush02Icon.displayName = 'PaintBrush02Icon';

export { PaintBrush02Icon };
