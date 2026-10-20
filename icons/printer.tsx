'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
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

// Slot, shared by envelopes, the printer and the archive: the content moves
// out (or opens), holds a beat, and lands back in place on a spring; the
// container squashes when it lands and springs back.
const SLOT_DURATION = 1;
const SLOT_TIMES = [0, 0.28, 0.36, 1];
const SLOT_LAND = springEase(0.45, 0.35);

const containerVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0.45px) scaleX(1.035) scaleY(0.958)',
      'translateY(0px) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: SLOT_DURATION,
      times: [0, 0.48, 0.56, 1],
      ease: ['linear', 'easeOut', SLOT_LAND],
    },
  },
};

// The input sheet feeds into the rollers and the printed sheet drops out,
// both accelerating; their replacements then land on a spring.
const feedVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: (distance: number) => ({
    transform: [
      'translateY(0px)',
      `translateY(${distance}px)`,
      `translateY(${distance}px)`,
      `translateY(${distance}px)`,
    ],
    transition: {
      duration: SLOT_DURATION,
      times: SLOT_TIMES,
      ease: [[0.5, 0, 0.9, 0.4], 'linear', 'linear'],
    },
  }),
};

const replacementVariants: Variants = {
  normal: { transform: 'translateY(-9px)' },
  animate: {
    transform: ['translateY(-9px)', 'translateY(-9px)', 'translateY(-9px)', 'translateY(0px)'],
    transition: {
      duration: SLOT_DURATION,
      times: SLOT_TIMES,
      ease: ['linear', 'linear', SLOT_LAND],
    },
  },
};

// The official page hands off to a rounded sheet as the rollers release it.
const outgoingPageVariants: Variants = {
  normal: { visibility: 'visible' },
  animate: { visibility: ['visible', 'hidden'], transition: { duration: 0.02 } },
};

// Close the printer base only while neither output sheet covers the gap.
const printerBaseVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: {
    visibility: ['hidden', 'hidden', 'visible', 'hidden'],
    transition: { duration: SLOT_DURATION, ease: 'linear', times: [0, 0.12, 0.43, 0.44] },
  },
};

// Generated sheets take over from the source pages for the feed cycle and
// finish exactly on them.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: { visibility: 'visible', transition: { duration: 0 } },
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
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
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
                variants={feedVariants}
                custom={9}
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
                  variants={replacementVariants}
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
                  variants={feedVariants}
                  custom={17}
                  animate={controls}
                  initial="normal"
                />
                <motion.path
                  d={PRINTER_PAGE}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  variants={replacementVariants}
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
