'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
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

const MAXIMIZE_DURATION = 0.86;
const MAXIMIZE_TIMES = [0, 0.07, 0.14, 0.23, 0.34, 0.46, 0.58, 0.68, 0.76, 0.82, 0.88, 0.94, 1];

function createExpandedWindowPath({
  right,
  top,
}: {
  right: number;
  top: number;
}) {
  return `M2 ${top + 4}C2 ${top + 2.1144} 2 ${top + 1.1716} 2.58579 ${top + 0.5858}C3.17157 ${top} 4.11438 ${top} 6 ${top}H${right - 4}C${right - 2.11438} ${top} ${right - 1.17157} ${top} ${right - 0.5858} ${top + 0.5858}C${right} ${top + 1.1716} ${right} ${top + 2.1144} ${right} ${top + 4}V18C${right} 19.8856 ${right} 20.8284 ${right - 0.5858} 21.4142C${right - 1.17157} 22 ${right - 2.11438} 22 ${right - 4} 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V${top + 4}Z`;
}

const EXPANDING_WINDOW_FRAMES = [
  MAXIMIZE_WINDOW,
  MAXIMIZE_WINDOW,
  createExpandedWindowPath({ right: 11.66, top: 12.34 }),
  createExpandedWindowPath({ right: 12.98, top: 11.02 }),
  createExpandedWindowPath({ right: 15.18, top: 8.82 }),
  createExpandedWindowPath({ right: 17.82, top: 6.18 }),
  createExpandedWindowPath({ right: 20.02, top: 3.98 }),
  createExpandedWindowPath({ right: 21.45, top: 2.55 }),
  createExpandedWindowPath({ right: 22, top: 2 }),
  createExpandedWindowPath({ right: 22, top: 2 }),
  createExpandedWindowPath({ right: 20.02, top: 3.98 }),
  createExpandedWindowPath({ right: 15.18, top: 8.82 }),
  MAXIMIZE_WINDOW,
];

// The arrow leads the original window into the outer frame.
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(0.2px, -0.2px)',
      'translate(0.55px, -0.55px)',
      'translate(1.1px, -1.1px)',
      'translate(1.45px, -1.45px)',
      'translate(0.9px, -0.9px)',
      'translate(0.35px, -0.35px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0.35px, -0.35px)',
      'translate(0.15px, -0.15px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: MAXIMIZE_TIMES,
    },
  },
};

const sourceWindowVariants: Variants = {
  normal: {
    d: MAXIMIZE_WINDOW,
    strokeDasharray: '100 0',
    strokeDashoffset: 0,
    visibility: 'visible',
  },
  animate: {
    d: EXPANDING_WINDOW_FRAMES,
    strokeDasharray: [
      '100 0',
      '100 0',
      '100 0',
      '100 0',
      '100 0',
      '100 0',
      '36 0.4',
      '12 1',
      '5 1.8',
      '2.6 2.2',
      '5 1.8',
      '36 0.4',
      '100 0',
    ],
    strokeDashoffset: [0, 0, 0, 0, 0, 0, 0.5, 1.5, 3, 4, 3, 0.5, 0],
    visibility: [
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'visible',
      'hidden',
      'hidden',
      'visible',
    ],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: 'linear',
      times: MAXIMIZE_TIMES,
    },
  },
};

const sourceOuterFrameVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 1, 1, 0.92, 0.72, 0.42, 0.15, 0, 0, 0, 0.18, 0.55, 1],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: 'linear',
      times: MAXIMIZE_TIMES,
    },
  },
};

const arrivingWindowVariants: Variants = {
  normal: { transform: 'translate(-12px, 12px)' },
  animate: {
    transform: [
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-9px, 9px)',
      'translate(-4.5px, 4.5px)',
      'translate(-1px, 1px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: 'linear',
      times: MAXIMIZE_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['hidden', 'hidden', 'hidden', 'hidden', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'hidden'],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: 'linear',
      times: MAXIMIZE_TIMES,
    },
  },
};

const occlusionMaskVariants: Variants = {
  normal: { transform: 'translate(-12px, 12px)' },
  animate: {
    transform: [
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-12px, 12px)',
      'translate(-9px, 9px)',
      'translate(-4.5px, 4.5px)',
      'translate(-1px, 1px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: MAXIMIZE_DURATION,
      ease: 'linear',
      times: MAXIMIZE_TIMES,
    },
  },
};

const MaximizeScreenIcon = forwardRef<MaximizeScreenIconHandle, MaximizeScreenIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const occlusionMaskId = useId();
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
          overflow="hidden"
        >
          <defs>
            <mask
              id={occlusionMaskId}
              x="0"
              y="0"
              width="24"
              height="24"
              maskUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="24" height="24" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.path
                  d={MAXIMIZE_WINDOW}
                  fill="black"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  variants={occlusionMaskVariants}
                  animate={controls}
                  initial="normal"
                />
              </motion.g>
            </mask>
          </defs>
          <motion.path
            d="M12.5667 7.93408L15.3088 8.03416C15.7163 8.04903 16.0391 8.38374 16.0391 8.79156V11.4064M10.5391 13.4341L15.5828 8.41565"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '13px 11px' }}
          />
          <motion.path
            d={MAXIMIZE_WINDOW}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            mask={`url(#${occlusionMaskId})`}
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={MAXIMIZE_WINDOW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingWindowVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

MaximizeScreenIcon.displayName = 'MaximizeScreenIcon';

export { MaximizeScreenIcon };
