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

// A document with text slides through the bottom drawer's top seam.
const ARCHIVE_DOCUMENT =
  'M6.9 11V4.5C6.9 3.9 7.4 3.4 8 3.4H16C16.6 3.4 17.1 3.9 17.1 4.5V11Z';

const ARCHIVE_DURATION = 0.94;

const ARCHIVE_TIMES = [
  0, 0.05, 0.1, 0.16, 0.23, 0.31, 0.4, 0.5, 0.58, 0.65, 0.71,
  0.76, 0.8, 0.84, 0.88, 0.93, 0.97, 1,
];

const archiveDrawerVariants: Variants = {
  normal: {
    transform: 'translateY(0px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0.25px)',
      'translateY(0.9px)',
      'translateY(1.85px)',
      'translateY(2.65px)',
      'translateY(2.38px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(2.5px)',
      'translateY(1.55px)',
      'translateY(0.45px)',
      'translateY(0px)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveDocumentVariants: Variants = {
  normal: {
    transform: 'translateY(11.3px)',
    transition: { duration: 0.14, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(11.3px)',
      'translateY(11.3px)',
      'translateY(11.3px)',
      'translateY(10.6px)',
      'translateY(8.9px)',
      'translateY(6.2px)',
      'translateY(3.2px)',
      'translateY(1.45px)',
      'translateY(1.15px)',
      'translateY(1.28px)',
      'translateY(1.9px)',
      'translateY(3.4px)',
      'translateY(6.2px)',
      'translateY(9.4px)',
      'translateY(11.3px)',
      'translateY(11.3px)',
      'translateY(11.3px)',
      'translateY(11.3px)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: ARCHIVE_TIMES,
    },
  },
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0 } },
  animate: { opacity: 1, transition: { duration: 0 } },
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
          <defs>
            <clipPath id="archive-document-window" clipPathUnits="userSpaceOnUse">
              <rect x="0" y="0" width="24" height="13.8" />
            </clipPath>
            <mask
              id="archive-back-mask"
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
                <motion.rect
                  x="6.1"
                  y="2.7"
                  width="11.8"
                  height="11.4"
                  rx="0.6"
                  fill="black"
                  variants={archiveDocumentVariants}
                  animate={controls}
                  initial="normal"
                />
              </motion.g>
              <motion.rect
                x="0"
                y="11"
                width="24"
                height="13"
                fill="black"
                variants={archiveDrawerVariants}
                animate={controls}
                initial="normal"
              />
            </mask>
          </defs>
          <path
            d="M4 13.5V11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11V13.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            mask="url(#archive-back-mask)"
          />
          <g clipPath="url(#archive-document-window)">
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.g
                variants={archiveDocumentVariants}
                animate={controls}
                initial="normal"
              >
                <path
                  d={ARCHIVE_DOCUMENT}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M8.8 5.6H15.2M8.8 7.7H14.5M8.8 9.8H13.6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="0.9"
                />
              </motion.g>
            </motion.g>
          </g>
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
