'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface InboxIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface InboxIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A letter drops in through the top and lands in the tray, which sinks under
// the weight and springs back. The clip window follows the tray so the
// letter always slips behind its front edge.
const INBOX_DURATION = 1.1;
const TRAY_TIMES = [0, 0.44, 0.6, 0.74, 0.87, 1];
const TRAY_OFFSET = [0, 0, 1.3, -0.4, 0.12, 0];
const CLIP_HEIGHT = 8.8;

const trayVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: TRAY_OFFSET,
    transition: { duration: INBOX_DURATION, ease: 'easeInOut', times: TRAY_TIMES },
  },
};

const clipVariants: Variants = {
  normal: { height: CLIP_HEIGHT },
  animate: {
    height: TRAY_OFFSET.map((offset) => CLIP_HEIGHT + offset),
    transition: { duration: INBOX_DURATION, ease: 'easeInOut', times: TRAY_TIMES },
  },
};

const letterVariants: Variants = {
  normal: { translateY: -7.5 },
  animate: {
    translateY: [-7.5, 10.5, 10.5],
    transition: {
      duration: INBOX_DURATION,
      ease: [[0.55, 0, 0.9, 0.5], 'linear'],
      times: [0, 0.6, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: INBOX_DURATION, times: [0, 0.62, 0.63] },
  },
};

const InboxIcon = forwardRef<InboxIconHandle, InboxIconProps>(
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
                x="4"
                y="3.6"
                width="16"
                height={CLIP_HEIGHT}
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
            <motion.rect
              x="8.5"
              y="4.5"
              width="7"
              height="5.5"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={letterVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <path
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={trayVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

InboxIcon.displayName = 'InboxIcon';

export { InboxIcon };
