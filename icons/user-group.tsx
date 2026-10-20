'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface UserGroupIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UserGroupIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The person in front nods first, then the left and the right person.
const NOD_STAGGER = 0.08;

// A real nod, as in user: each head dips forward on its neck and rocks back,
// and the shoulders settle after it. Each person nods in turn.
const headVariants: Variants = {
  normal: { rotate: 0 },
  animate: (order: number) => ({
    rotate: [0, 16, -4, 0],
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      times: [0, 0.4, 0.7, 1],
      delay: order * NOD_STAGGER,
    },
  }),
};

const shouldersVariants: Variants = {
  normal: { translateY: 0 },
  animate: (order: number) => ({
    translateY: [0, 0, 0.6, 0],
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 + order * NOD_STAGGER },
  }),
};

// The back heads are drawn as full circles while they move, and the front
// head's disc masks them, so they stay tucked behind it at every tilt.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: {
    visibility: ['visible', 'hidden'],
    transition: { duration: 0.6 + 2 * NOD_STAGGER, times: [0, 1] },
  },
};

const UserGroupIcon = forwardRef<UserGroupIconHandle, UserGroupIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const maskId = useId();
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
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32">
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.circle
                cx="12"
                cy="11"
                r="3.5"
                fill="black"
                variants={headVariants}
                custom={0}
                animate={controls}
                initial="normal"
                style={{ transformBox: 'view-box', originX: 12 / 24, originY: 13.45 / 24 }}
              />
            </mask>
          </defs>
          <motion.path
            d="M15.5 11C15.5 9.067 13.933 7.5 12 7.5C10.067 7.5 8.5 9.067 8.5 11C8.5 12.933 10.067 14.5 12 14.5C13.933 14.5 15.5 12.933 15.5 11Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 13.45 / 24 }}
          />
          <g mask={`url(#${maskId})`}>
            <motion.g
              variants={headVariants}
              custom={2}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 16.5 / 24, originY: 10.45 / 24 }}
            >
              <path
                d="M15.4827 11.3499C15.8047 11.4475 16.1462 11.5 16.5 11.5C18.433 11.5 20 9.933 20 8C20 6.067 18.433 4.5 16.5 4.5C14.6851 4.5 13.1928 5.8814 13.0173 7.65013"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <motion.g variants={generatedGeometryVariants} animate={controls} initial="normal">
                <path
                  d="M13.0173 7.65013A3.5 3.5 0 0 0 15.4827 11.3499"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </motion.g>
            </motion.g>
            <motion.g
              variants={headVariants}
              custom={1}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 7.5 / 24, originY: 10.45 / 24 }}
            >
              <path
                d="M10.9827 7.65013C10.8072 5.8814 9.31492 4.5 7.5 4.5C5.567 4.5 4 6.067 4 8C4 9.933 5.567 11.5 7.5 11.5C7.85381 11.5 8.19535 11.4475 8.51727 11.3499"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <motion.g variants={generatedGeometryVariants} animate={controls} initial="normal">
                <path
                  d="M8.51727 11.3499A3.5 3.5 0 0 0 10.9827 7.65013"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </motion.g>
            </motion.g>
          </g>
          <motion.path
            d="M22 16.5C22 13.7386 19.5376 11.5 16.5 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shouldersVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17.5 19.5C17.5 16.7386 15.0376 14.5 12 14.5C8.96243 14.5 6.5 16.7386 6.5 19.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shouldersVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M7.5 11.5C4.46243 11.5 2 13.7386 2 16.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shouldersVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

UserGroupIcon.displayName = 'UserGroupIcon';

export { UserGroupIcon };
