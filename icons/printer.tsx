'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PrinterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PrinterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PRINTER_PAGE =
  'M17 14V19C17 20.4142 17 21.1213 16.5607 21.5607C16.1213 22 15.4142 22 14 22H10C8.58579 22 7.87868 22 7.43934 21.5607C7 21.1213 7 20.4142 7 19V14H17Z';
const PRINTER_INPUT_PAGE =
  'M17 7V5C17 3.58579 17 2.87868 16.5607 2.43934C16.1213 2 15.4142 2 14 2H10C8.58579 2 7.87868 2 7.43934 2.43934C7 2.87868 7 3.58579 7 5V7';
const PRINTER_OUTPUT_PAGE_ROUNDED =
  'M16.25 14H7.75C7.33579 14 7 14.3358 7 14.75V21.25C7 21.6642 7.33579 22 7.75 22H16.25C16.6642 22 17 21.6642 17 21.25V14.75C17 14.3358 16.6642 14 16.25 14Z';

const PRINT_DURATION = 0.92;
const PRINT_TIMES = [
  0, 0.08, 0.16, 0.26, 0.38, 0.5, 0.62, 0.72, 0.82, 0.9, 0.96, 1,
];

const printerRecoilVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0.16px) scaleX(1.005) scaleY(0.993)',
      'translateY(0.38px) scaleX(1.012) scaleY(0.98)',
      'translateY(0.7px) scaleX(1.022) scaleY(0.965)',
      'translateY(0.32px) scaleX(1.012) scaleY(0.984)',
      'translateY(-0.4px) scaleX(0.994) scaleY(1.012)',
      'translateY(0.15px) scaleX(1.006) scaleY(0.991)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: 'linear',
      times: PRINT_TIMES,
    },
  },
};

// The official page hands off to a rounded sheet as the rollers release it.
const outgoingPageVariants: Variants = {
  normal: {
    d: PRINTER_PAGE,
    transform: 'none',
    visibility: 'visible',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0.7px)',
      'translateY(2.2px)',
      'translateY(4.8px)',
      'translateY(8.2px)',
      'translateY(12px)',
      'translateY(15px)',
      'translateY(17px)',
      'translateY(17px)',
      'translateY(0px)',
      'translateY(0px)',
    ],
    visibility: [
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: PRINT_TIMES,
    },
  },
};

const roundedOutgoingPageVariants: Variants = {
  normal: { transform: 'none' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0.7px)',
      'translateY(2.2px)',
      'translateY(4.8px)',
      'translateY(8.2px)',
      'translateY(12px)',
      'translateY(15px)',
      'translateY(17px)',
      'translateY(17px)',
      'translateY(17px)',
      'translateY(17px)',
    ],
    visibility: [
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
      'hidden',
      'hidden',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: PRINT_TIMES,
    },
  },
};

// A replacement sheet uses the exact resting path so its final corner handoff
// is invisible as it settles against the rollers.
const incomingPageVariants: Variants = {
  normal: {
    d: PRINTER_PAGE,
    transform: 'translateY(-9px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-8.5px)',
      'translateY(-7.2px)',
      'translateY(-5px)',
      'translateY(-2.5px)',
      'translateY(-0.6px)',
      'translateY(0.25px)',
      'translateY(-0.1px)',
      'translateY(0px)',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: PRINT_TIMES,
    },
  },
};

// The input sheet feeds into the rollers while a replacement arrives from above.
const feedingInputPageVariants: Variants = {
  normal: {
    d: PRINTER_INPUT_PAGE,
    transform: 'none',
    visibility: 'visible',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0.6px)',
      'translateY(2px)',
      'translateY(4.5px)',
      'translateY(7.5px)',
      'translateY(9px)',
      'translateY(9px)',
      'translateY(9px)',
      'translateY(9px)',
      'translateY(0px)',
      'translateY(0px)',
    ],
    visibility: [
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
      'hidden',
      'visible',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: PRINT_TIMES,
    },
  },
};

const replacementInputPageVariants: Variants = {
  normal: {
    d: PRINTER_INPUT_PAGE,
    transform: 'translateY(-9px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-9px)',
      'translateY(-8px)',
      'translateY(-5.5px)',
      'translateY(-2.5px)',
      'translateY(-0.6px)',
      'translateY(0.2px)',
      'translateY(-0.08px)',
      'translateY(0px)',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: PRINT_TIMES,
    },
  },
};

// Close the printer base only while neither output sheet covers the gap.
const printerBaseVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: {
    visibility: [
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'visible',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
      'hidden',
    ],
    transition: {
      duration: PRINT_DURATION,
      ease: 'linear',
      times: PRINT_TIMES,
    },
  },
};

// Generated sheets exist only during the feed cycle and hand back to source geometry.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: {
    visibility: [
      'hidden',
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
    ],
    transition: { duration: PRINT_DURATION, ease: 'linear', times: PRINT_TIMES },
  },
};

const PrinterIcon = forwardRef<PrinterIconHandle, PrinterIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const outputClipId = useId();
    const inputClipId = useId();
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
            <clipPath id={outputClipId} clipPathUnits="userSpaceOnUse">
              <rect x="6" y="13.9" width="12" height="10.1" />
            </clipPath>
            <clipPath id={inputClipId} clipPathUnits="userSpaceOnUse">
              <rect x="6" y="0" width="12" height="7.05" />
            </clipPath>
          </defs>
          <motion.g
            variants={printerRecoilVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <path
              d="M17 17H18.6667C19.9128 17 20.5359 17 21 16.7321C21.304 16.5565 21.5565 16.304 21.732 16C22 15.5359 22 14.9128 22 13.6667C22 11.1744 22 9.9282 21.4641 9C21.113 8.39192 20.6081 7.88697 20 7.5359C19.0718 7 17.8256 7 15.3333 7H8.66667C6.17436 7 4.9282 7 4 7.5359C3.39192 7.88697 2.88697 8.39192 2.5359 9C2 9.9282 2 11.1744 2 13.6667C2 14.9128 2 15.5359 2.26795 16C2.44349 16.304 2.69596 16.5565 3 16.7321C3.4641 17 4.08718 17 5.33333 17H7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <g clipPath={`url(#${inputClipId})`}>
              <motion.path
                d={PRINTER_INPUT_PAGE}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={feedingInputPageVariants}
                animate={controls}
                initial="normal"
              />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.path
                  d={PRINTER_INPUT_PAGE}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  variants={replacementInputPageVariants}
                  animate={controls}
                  initial="normal"
                />
              </motion.g>
            </g>
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <path
                d="M7 14H17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
              <motion.path
                d="M7 17H17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={printerBaseVariants}
                animate={controls}
                initial="normal"
              />
              <motion.g clipPath={`url(#${outputClipId})`}>
                <motion.path
                  d={PRINTER_OUTPUT_PAGE_ROUNDED}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  variants={roundedOutgoingPageVariants}
                  animate={controls}
                  initial="normal"
                />
                <motion.path
                  d={PRINTER_PAGE}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  variants={incomingPageVariants}
                  animate={controls}
                  initial="normal"
                />
              </motion.g>
            </motion.g>
            <motion.path
              d={PRINTER_PAGE}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={outgoingPageVariants}
              animate={controls}
              initial="normal"
            />
            <path
              d="M18.8748 10.25H18.7498M18.9998 10.25C18.9998 10.3881 18.8879 10.5 18.7498 10.5C18.6117 10.5 18.4998 10.3881 18.4998 10.25C18.4998 10.1119 18.6117 10 18.7498 10C18.8879 10 18.9998 10.1119 18.9998 10.25Z"
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

PrinterIcon.displayName = 'PrinterIcon';

export { PrinterIcon };
