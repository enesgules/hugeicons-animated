'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Archive02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Archive02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the empty sheet extrudes from the moving top seam of the bottom drawer
const ARCHIVE_DOCUMENT =
  'M8.5 11V6.4C8.5 5.85 8.95 5.4 9.5 5.4H14.5C15.05 5.4 15.5 5.85 15.5 6.4V11Z';

const ARCHIVE_DURATION = 0.92;

const ARCHIVE_TIMES = [
  0, 0.06, 0.11, 0.15, 0.19, 0.24, 0.3, 0.36, 0.43, 0.5,
  0.58, 0.66, 0.72, 0.78, 0.84, 0.9, 0.95, 0.98, 1,
];

const archiveDrawerVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0.12px)',
      'translateY(0.28px)',
      'translateY(0.48px)',
      'translateY(0.7px)',
      'translateY(0.9px)',
      'translateY(1.06px)',
      'translateY(1.16px)',
      'translateY(1.2px)',
      'translateY(1.18px)',
      'translateY(1.12px)',
      'translateY(1.02px)',
      'translateY(0.88px)',
      'translateY(0.7px)',
      'translateY(0.5px)',
      'translateY(0.32px)',
      'translateY(0.17px)',
      'translateY(0.06px)',
      'translateY(0px)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveBackVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: [
      'scaleY(1)',
      'scaleY(1.015)',
      'scaleY(1.04)',
      'scaleY(1.07)',
      'scaleY(1.11)',
      'scaleY(1.16)',
      'scaleY(1.21)',
      'scaleY(1.24)',
      'scaleY(1.25)',
      'scaleY(1.245)',
      'scaleY(1.23)',
      'scaleY(1.2)',
      'scaleY(1.17)',
      'scaleY(1.135)',
      'scaleY(1.1)',
      'scaleY(1.065)',
      'scaleY(1.035)',
      'scaleY(1.012)',
      'scaleY(1)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveBackSourceVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};

const archiveBackBridgeVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveDocumentVariants: Variants = {
  normal: { opacity: 0, transform: 'translateY(0px) scaleY(0.02)' },
  animate: {
    opacity: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    transform: [
      'translateY(0px) scaleY(0.02)',
      'translateY(0.12px) scaleY(0.02)',
      'translateY(0.28px) scaleY(0.03)',
      'translateY(0.48px) scaleY(0.05)',
      'translateY(0.7px) scaleY(0.09)',
      'translateY(0.9px) scaleY(0.16)',
      'translateY(1.06px) scaleY(0.27)',
      'translateY(1.16px) scaleY(0.42)',
      'translateY(1.2px) scaleY(0.59)',
      'translateY(1.18px) scaleY(0.76)',
      'translateY(1.12px) scaleY(0.88)',
      'translateY(1.02px) scaleY(0.96)',
      'translateY(0.88px) scaleY(0.98)',
      'translateY(0.7px) scaleY(0.94)',
      'translateY(0.5px) scaleY(0.82)',
      'translateY(0.32px) scaleY(0.64)',
      'translateY(0.17px) scaleY(0.42)',
      'translateY(0.06px) scaleY(0.18)',
      'translateY(0px) scaleY(0.02)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
};


const Archive02Icon = forwardRef<Archive02IconHandle, Archive02IconProps>(
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.path
            d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H8.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveBackVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 7 / 24 }}
          />
          <motion.path
            d="M8.5 7H15.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={archiveBackBridgeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15.5 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveBackVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 7 / 24 }}
          />
          <motion.path
            d={ARCHIVE_DOCUMENT}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveDocumentVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 11 / 24 }}
          />
          </motion.g>
          <motion.path
            d="M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveDrawerVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 16px' }}
          />
          <motion.path
            d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveBackSourceVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveDrawerVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 16px' }}
          />
        </svg>
      </div>
    );
  }
);

Archive02Icon.displayName = 'Archive02Icon';

export { Archive02Icon };
