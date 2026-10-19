'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MaximizeScreenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MaximizeScreenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MAXIMIZE_WINDOW =
  'M2 17C2 15.1144 2 14.1716 2.58579 13.5858C3.17157 13 4.11438 13 6 13H7C8.88562 13 9.82843 13 10.4142 13.5858C11 14.1716 11 15.1144 11 17V18C11 19.8856 11 20.8284 10.4142 21.4142C9.82843 22 8.88562 22 7 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V17Z';
const MAXIMIZE_OUTER_SOURCE =
  'M2 8.5V10.5M14 2H10M22 14V10M13.5 22H15.5M2.05986 5.5C2.21387 4.43442 2.51347 3.67903 3.09625 3.09625C3.67903 2.51347 4.43442 2.21387 5.5 2.05986M18.5 2.05986C19.5656 2.21387 20.321 2.51347 20.9037 3.09625C21.4865 3.67903 21.7861 4.43442 21.9401 5.5M21.9401 18.5C21.7861 19.5656 21.4865 20.321 20.9037 20.9037C20.321 21.4865 19.5656 21.7861 18.5 21.9401';

const MAXIMIZE_DURATION = 1.2;

function createExpandedWindowPath(growth: number) {
  const right = 11 + growth;
  const top = 13 - growth;
  return `M2 ${top + 4}C2 ${top + 2.1144} 2 ${top + 1.1716} 2.58579 ${top + 0.5858}C3.17157 ${top} 4.11438 ${top} 6 ${top}H${right - 4}C${right - 2.11438} ${top} ${right - 1.17157} ${top} ${right - 0.5858} ${top + 0.5858}C${right} ${top + 1.1716} ${right} ${top + 2.1144} ${right} ${top + 4}V18C${right} 19.8856 ${right} 20.8284 ${right - 0.5858} 21.4142C${right - 1.17157} 22 ${right - 2.11438} 22 ${right - 4} 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V${top + 4}Z`;
}

// Pre-eased (ease-in-out) growth of the window's top-right corner, in viewBox
// units, with a small overshoot past the outer frame before it settles.
const EXPAND_TIMES = [0, 0.072, 0.104, 0.136, 0.168, 0.2, 0.232, 0.264, 0.296, 0.328, 0.36, 0.44];
const EXPAND_GROWTH = [0, 0.045, 0.362, 1.22, 2.893, 5.65, 8.407, 10.08, 10.938, 11.255, 11.3, 11];
// The arrow rides ahead of the growing corner until its tip nears the frame
// corner, then the corner swallows it toward the tip.
const ARROW_SHIFT = [0, 0.045, 0.362, 1.22, 2.893, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];
const ARROW_SCALE = [1, 1, 1, 1, 1, 0.575, 0.03, 0, 0, 0, 0, 0];

// Maximize: the solid window grows from its bottom-left corner until it fills
// the dashed frame, pushing the arrow into the corner. After a hold the large
// window erases along its outline, uncovering the dashed frame, while the
// small window draws itself back in place and the arrow grows out again.
const arrowVariants: Variants = {
  normal: { x: 0, y: 0, scale: 1, visibility: 'visible' },
  animate: {
    x: [...ARROW_SHIFT, 0, 0, 0],
    y: [...ARROW_SHIFT.map((shift) => -shift), 0, 0, 0],
    scale: [...ARROW_SCALE, 0, 1.08, 1],
    visibility: ['visible', 'hidden', 'hidden', 'visible', 'visible'],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: 'linear',
      times: [...EXPAND_TIMES, 0.8, 0.9, 1],
      scale: {
        duration: MAXIMIZE_DURATION,
        ease: [...EXPAND_TIMES.map(() => 'linear' as const), 'linear', 'easeOut', 'easeInOut'],
        times: [...EXPAND_TIMES, 0.8, 0.9, 1],
      },
      visibility: { duration: MAXIMIZE_DURATION, times: [0, 0.264, 0.8, 0.81, 1] },
    },
  },
};

const sourceWindowVariants: Variants = {
  normal: { pathLength: 1, visibility: 'visible' },
  animate: {
    pathLength: [1, 1, 0, 1, 1],
    visibility: ['visible', 'hidden', 'hidden', 'visible', 'visible'],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: ['linear', 'linear', [0.4, 0, 0.2, 1], 'linear'],
      times: [0, 0.01, 0.62, 0.9, 1],
    },
  },
};

const sourceOuterFrameVariants: Variants = {
  normal: { visibility: 'visible' },
  animate: {
    visibility: ['visible', 'hidden', 'hidden', 'visible', 'visible'],
    transition: { duration: MAXIMIZE_DURATION, times: [0, 0.36, 0.58, 0.6, 1] },
  },
};

const expandingWindowVariants: Variants = {
  normal: { d: createExpandedWindowPath(0), pathLength: 1, pathOffset: 0 },
  animate: {
    d: EXPAND_GROWTH.map(createExpandedWindowPath),
    pathLength: [1, 1, 0],
    pathOffset: [0, 0, 1],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: [0.45, 0, 0.3, 1],
      times: [0, 0.58, 0.9],
      d: {
        duration: MAXIMIZE_DURATION * 0.44,
        ease: 'linear',
        times: EXPAND_TIMES.map((t) => t / 0.44),
      },
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'hidden'],
    transition: { duration: MAXIMIZE_DURATION * 0.9 },
  },
};

const MaximizeScreenIcon = forwardRef<MaximizeScreenIconHandle, MaximizeScreenIconProps>(
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
          <motion.g variants={generatedGeometryVariants} animate={controls} initial="normal">
            <motion.path
              d={MAXIMIZE_WINDOW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={expandingWindowVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M12.5667 7.93408L15.3088 8.03416C15.7163 8.04903 16.0391 8.38374 16.0391 8.79156V11.4064M10.5391 13.4341L15.5828 8.41565"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15.6 / 24, originY: 8.4 / 24 }}
          />
          <motion.path
            d={MAXIMIZE_WINDOW}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={sourceWindowVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={MAXIMIZE_OUTER_SOURCE}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sourceOuterFrameVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  },
);

MaximizeScreenIcon.displayName = 'MaximizeScreenIcon';

export { MaximizeScreenIcon };
