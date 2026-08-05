'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Mail01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Mail01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MAIL_CLOSED =
  'M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6';
const MAIL_EDGE_ON =
  'M2 6L8.91302 6.55C11.4616 6.8 12.5384 6.8 15.087 6.55L22 6';
const MAIL_OPEN =
  'M2 6L8.91302 1.6C11.4616 -0.05 12.5384 -0.05 15.087 1.6L22 6';
const MAIL_OPEN_OVERSHOOT =
  'M2 6L8.91302 1.25C11.4616 -0.45 12.5384 -0.45 15.087 1.25L22 6';
const MAIL_CLOSED_OVERSHOOT =
  'M2 6L8.91302 10.15C11.4616 11.65 12.5384 11.65 15.087 10.15L22 6';
const MAIL_REAR_EDGE =
  'M3.24496 4.79066C4.37608 3.65523 5.95033 3.61568 9.09882 3.53656C11.0393 3.48781 12.9607 3.48781 14.9012 3.53657C18.0497 3.61568 19.6239 3.65523 20.7551 4.79066';
const MAIL_ENTRY_LINE =
  'M5.2 7.4C8.7 9.1 15.3 9.1 18.8 7.4';

// The flap turns edge-on, opens fully, then softly overshoots the closed position.
const flapVariants: Variants = {
  normal: { d: MAIL_CLOSED },
  animate: {
    d: [
      MAIL_CLOSED,
      MAIL_EDGE_ON,
      MAIL_OPEN,
      MAIL_OPEN_OVERSHOOT,
      MAIL_OPEN,
      MAIL_OPEN,
      MAIL_EDGE_ON,
      MAIL_CLOSED_OVERSHOOT,
      MAIL_CLOSED,
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

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: {
    visibility: [
      'hidden',
      'hidden',
      'visible',
      'visible',
      'hidden',
      'hidden',
    ],
    transition: {
      duration: 0.94,
      ease: 'linear',
      times: [0, 0.26, 0.27, 0.66, 0.67, 1],
    },
  },
};

const Mail01Icon = forwardRef<Mail01IconHandle, Mail01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const maskId = `mail-rear-edge-${useId().replaceAll(':', '')}`;
    const flapMaskId = `mail-flap-${useId().replaceAll(':', '')}`;
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
              id={maskId}
              x="0"
              y="0"
              width="24"
              height="24"
              maskUnits="userSpaceOnUse"
            >
              <rect width="24" height="24" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <path
                  d={MAIL_REAR_EDGE}
                  stroke="black"
                  strokeLinecap="round"
                  strokeWidth="2.2"
                />
              </motion.g>
            </mask>
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
                d={MAIL_CLOSED}
                fill="black"
                variants={flapVariants}
                animate={controls}
                initial="normal"
              />
            </mask>
          </defs>
          <motion.path
            d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flapVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={bodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <path
              d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              mask={`url(#${maskId})`}
            />
            <path
              d={MAIL_ENTRY_LINE}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              mask={`url(#${flapMaskId})`}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Mail01Icon.displayName = 'Mail01Icon';

export { Mail01Icon };
