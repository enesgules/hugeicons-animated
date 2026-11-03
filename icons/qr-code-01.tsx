'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface QrCode01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface QrCode01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
// The viewfinder corners close in on the code, a scan line sweeps down, each
// row of cells answers as the line passes it, and the corners snap back out
// past rest to confirm the read.
const QR_DURATION = 1.3;
const SCAN_START = 0.16;
const SCAN_END = 0.7;
const SCAN_TOP = 5.5;
const SCAN_BOTTOM = 18.5;

// When the line reaches a given height, in seconds.
const scannedAt = (y: number) =>
  QR_DURATION *
  (SCAN_START + ((y - SCAN_TOP) / (SCAN_BOTTOM - SCAN_TOP)) * (SCAN_END - SCAN_START));

const cellVariants: Variants = {
  normal: { scale: 1 },
  animate: (top: number) => ({
    scale: [1, 0.8, 1.08, 1],
    transition: {
      duration: 0.34,
      delay: scannedAt(top),
      times: [0, 0.3, 0.65, 1],
      ease: ['easeOut', [0.23, 1, 0.32, 1], 'easeInOut'],
    },
  }),
};

const cornerVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: ([x, y]: [number, number]) => ({
    translateX: [0, x, x, -0.4 * x, 0],
    translateY: [0, y, y, -0.4 * y, 0],
    transition: {
      duration: QR_DURATION,
      times: [0, SCAN_START, SCAN_END + 0.04, 0.84, 1],
      ease: [[0.23, 1, 0.32, 1], 'linear', [0.23, 1, 0.32, 1], 'easeInOut'],
    },
  }),
};

const scannerVariants: Variants = {
  normal: { visibility: 'hidden', translateY: SCAN_TOP - 12 },
  animate: {
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden'],
    translateY: [
      SCAN_TOP - 12,
      SCAN_TOP - 12,
      SCAN_TOP - 12,
      SCAN_BOTTOM - 12,
      SCAN_BOTTOM - 12,
    ],
    transition: {
      duration: QR_DURATION,
      times: [0, SCAN_START - 0.01, SCAN_START, SCAN_END, SCAN_END + 0.01],
      ease: 'linear',
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const CELLS = [
  {
    d: 'M6.79289 6.79289C6.5 7.08579 6.5 7.55719 6.5 8.5C6.5 9.44281 6.5 9.91421 6.79289 10.2071C7.08579 10.5 7.55719 10.5 8.5 10.5C9.44281 10.5 9.91421 10.5 10.2071 10.2071C10.5 9.91421 10.5 9.44281 10.5 8.5C10.5 7.55719 10.5 7.08579 10.2071 6.79289C9.91421 6.5 9.44281 6.5 8.5 6.5C7.55719 6.5 7.08579 6.5 6.79289 6.79289Z',
    center: [8.5, 8.5],
    top: 6.5,
  },
  {
    d: 'M13.5 10.5C14.4428 10.5 14.9142 10.5 15.2071 10.2071C15.5 9.91421 15.5 9.44281 15.5 8.5C15.5 7.55719 15.5 7.08579 15.7929 6.79289C16.0858 6.5 16.5572 6.5 17.5 6.5',
    center: [15.5, 8.5],
    top: 6.5,
  },
  {
    d: 'M6.5 13.5H8.5C9.44281 13.5 9.91421 13.5 10.2071 13.7929C10.5 14.0858 10.5 14.5572 10.5 15.5V17.5',
    center: [8.5, 15.5],
    top: 13.5,
  },
  {
    d: 'M6.875 17.25H6.75M7 17.25C7 17.3881 6.88807 17.5 6.75 17.5C6.61193 17.5 6.5 17.3881 6.5 17.25C6.5 17.1119 6.61193 17 6.75 17C6.88807 17 7 17.1119 7 17.25Z',
    center: [6.75, 17.25],
    top: 17,
  },
  {
    d: 'M13.7929 13.7929C13.5 14.0858 13.5 14.5572 13.5 15.5C13.5 16.4428 13.5 16.9142 13.7929 17.2071C14.0858 17.5 14.5572 17.5 15.5 17.5C16.4428 17.5 16.9142 17.5 17.2071 17.2071C17.5 16.9142 17.5 16.4428 17.5 15.5C17.5 14.5572 17.5 14.0858 17.2071 13.7929C16.9142 13.5 16.4428 13.5 15.5 13.5C14.5572 13.5 14.0858 13.5 13.7929 13.7929Z',
    center: [15.5, 15.5],
    top: 13.5,
  },
] as const;

// Each corner of the source frame, with the direction it closes in.
const CORNERS = [
  {
    d: 'M6.5 21.5C6.03563 21.5 5.80344 21.5 5.60812 21.478C3.98545 21.2952 2.70484 20.0145 2.52201 18.3919C2.5 18.1966 2.5 17.9644 2.5 17.5',
    inward: [1, -1],
  },
  {
    d: 'M17.5 21.5C17.9644 21.5 18.1966 21.5 18.3919 21.478C20.0145 21.2952 21.2952 20.0145 21.478 18.3919C21.5 18.1966 21.5 17.9644 21.5 17.5',
    inward: [-1, -1],
  },
  {
    d: 'M6.5 2.5C6.03563 2.5 5.80344 2.5 5.60812 2.52201C3.98545 2.70484 2.70484 3.98545 2.52201 5.60812C2.5 5.80344 2.5 6.03563 2.5 6.5',
    inward: [1, 1],
  },
  {
    d: 'M17.5 2.5C17.9644 2.5 18.1966 2.5 18.3919 2.52201C20.0145 2.70484 21.2952 3.98545 21.478 5.60812C21.5 5.80344 21.5 6.03563 21.5 6.5',
    inward: [-1, 1],
  },
] as const;

const QrCode01Icon = forwardRef<QrCode01IconHandle, QrCode01IconProps>(
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
          {CELLS.map(({ d, center, top }) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={cellVariants}
              custom={top}
              animate={controls}
              initial="normal"
              style={{
                transformBox: 'view-box',
                originX: center[0] / 24,
                originY: center[1] / 24,
              }}
            />
          ))}
          {CORNERS.map(({ d, inward }) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={cornerVariants}
              custom={inward}
              animate={controls}
              initial="normal"
            />
          ))}
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M5 12H19"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={scannerVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

QrCode01Icon.displayName = 'QrCode01Icon';

export { QrCode01Icon };
