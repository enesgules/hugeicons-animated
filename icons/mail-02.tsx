'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Mail02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Mail02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAP_CLOSED =
  'M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5';
const FLAP_EDGE_ON =
  'M7 8.5L9.94202 8.74C11.6572 8.91 12.3428 8.91 14.058 8.74L17 8.5';
const FLAP_OPEN =
  'M7 8.5L9.94202 6.6C11.6572 5.5 12.3428 5.5 14.058 6.6L17 8.5';
const FLAP_OPEN_OVERSHOOT =
  'M7 8.5L9.94202 6.45C11.6572 5.3 12.3428 5.3 14.058 6.45L17 8.5';
const FLAP_CLOSED_OVERSHOOT =
  'M7 8.5L9.94202 10.34C11.6572 11.4 12.3428 11.4 14.058 10.34L17 8.5';
const FLAP_ENTRY_LINE = 'M9.3 9.3C10.9 10 13.1 10 14.7 9.3';

// The flap turns edge-on, opens fully, then softly overshoots the closed position.
const flapVariants: Variants = {
  normal: { d: FLAP_CLOSED },
  animate: {
    d: [
      FLAP_CLOSED,
      FLAP_EDGE_ON,
      FLAP_OPEN,
      FLAP_OPEN_OVERSHOOT,
      FLAP_OPEN,
      FLAP_OPEN,
      FLAP_EDGE_ON,
      FLAP_CLOSED_OVERSHOOT,
      FLAP_CLOSED,
    ],
    transition: {
      duration: 0.94,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.13, 0.28, 0.38, 0.5, 0.62, 0.76, 0.9, 1],
    },
  },
};

const bodyVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0.12px) scaleX(1.008) scaleY(0.992)',
      'translateY(0.45px) scaleX(1.035) scaleY(0.958)',
      'translateY(-0.32px) scaleX(0.985) scaleY(1.022)',
      'translateY(0.12px) scaleX(1.008) scaleY(0.994)',
      'translateY(0px) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: 0.94,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.28, 0.38, 0.5, 0.68, 0.84, 1],
    },
  },
};

// The pocket line under the flap shows only while the flap is open.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: {
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: 0.94,
      ease: 'linear',
      times: [0, 0.26, 0.27, 0.66, 0.67, 1],
    },
  },
};

const Mail02Icon = forwardRef<Mail02IconHandle, Mail02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const flapMaskId = `mail-flap-${useId().replaceAll(':', '')}`;
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
            <mask
              id={flapMaskId}
              x="0"
              y="0"
              width="24"
              height="24"
              maskUnits="userSpaceOnUse"
            >
              <rect width="24" height="24" fill="white" />
              <motion.path
                d={FLAP_CLOSED}
                fill="black"
                variants={flapVariants}
                animate={controls}
                initial="normal"
              />
            </mask>
          </defs>
          <motion.g
            variants={bodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          >
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <path
                d={FLAP_ENTRY_LINE}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                mask={`url(#${flapMaskId})`}
              />
            </motion.g>
            <motion.path
              d={FLAP_CLOSED}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={flapVariants}
              animate={controls}
              initial="normal"
            />
            <path
              d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Mail02Icon.displayName = 'Mail02Icon';

export { Mail02Icon };
