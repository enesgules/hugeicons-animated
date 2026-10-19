'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Folder01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Folder01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A sheet drops into the folder from above and slips behind the front edge;
// the folder takes its weight with a short squash and rebound.
const DROP_DURATION = 1.1;

const folderVariants: Variants = {
  normal: { scaleX: 1, scaleY: 1 },
  animate: {
    scaleX: [1, 1, 1.05, 0.98, 1.005, 1],
    scaleY: [1, 1, 0.87, 1.04, 0.99, 1],
    transition: {
      duration: DROP_DURATION,
      ease: 'easeInOut',
      times: [0, 0.5, 0.62, 0.76, 0.88, 1],
    },
  },
};

const sheetVariants: Variants = {
  normal: { translateY: -7.5 },
  animate: {
    translateY: [-7.5, 7, 7],
    transition: {
      duration: DROP_DURATION,
      ease: [[0.55, 0, 0.9, 0.5], 'linear'],
      times: [0, 0.56, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: DROP_DURATION, times: [0, 0.58, 0.59] },
  },
};

const Folder01Icon = forwardRef<Folder01IconHandle, Folder01IconProps>(
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
              <rect x="12.8" y="-0.5" width="8.6" height="6.2" />
            </clipPath>
          </defs>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
            clipPath={`url(#${clipId})`}
          >
            <motion.rect
              x="14.25"
              y="0.35"
              width="5.5"
              height="5.6"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={sheetVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={folderVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 21 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

Folder01Icon.displayName = 'Folder01Icon';

export { Folder01Icon };
