'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MailSend01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailSend01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SEND_ARROW =
  'M22 17.5L14 17.5M22 17.5C22 16.7998 20.0057 15.4915 19.5 15M22 17.5C22 18.2002 20.0057 19.5085 19.5 20';

const SEND_DURATION = 1;

// The arrow draws back, shoots out past the right edge, and the envelope
// recoils. A fresh arrow then slides out of the envelope's open side.
const departingArrowVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(-0.9px)',
      'translateX(12px)',
      'translateX(12px)',
    ],
    transition: {
      duration: SEND_DURATION,
      times: [0, 0.2, 0.46, 1],
      ease: [[0.33, 0, 0.67, 1], [0.55, 0, 0.9, 0.5], 'linear'],
    },
  },
};

const arrivingArrowVariants: Variants = {
  normal: { transform: 'translateX(-11px)' },
  animate: {
    transform: [
      'translateX(-11px)',
      'translateX(-11px)',
      'translateX(0.6px)',
      'translateX(-0.15px)',
      'translateX(0px)',
    ],
    transition: {
      duration: SEND_DURATION,
      times: [0, 0.52, 0.84, 0.93, 1],
      ease: ['linear', [0.3, 0.6, 0.45, 1], 'easeInOut', 'easeInOut'],
    },
  },
};

const envelopeVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(0px)',
      'translateX(-0.7px)',
      'translateX(0.2px)',
      'translateX(0px)',
    ],
    transition: {
      duration: SEND_DURATION,
      times: [0, 0.22, 0.34, 0.48, 0.6],
      ease: 'easeOut',
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const MailSend01Icon = forwardRef<MailSend01IconHandle, MailSend01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const arrowWindowId = useId();
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
            <clipPath id={arrowWindowId} clipPathUnits="userSpaceOnUse">
              <rect x="12.3" y="13" width="12" height="9" />
            </clipPath>
          </defs>
          <motion.g
            clipPath={`url(#${arrowWindowId})`}
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={SEND_ARROW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingArrowVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.g
            variants={envelopeVariants}
            animate={controls}
            initial="normal"
          >
            <path
              d="M22 12.5C22 12.0086 21.9947 11.0172 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.7551 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08114 7.45882 2.01576 10.5243C1.99474 11.51 1.99475 12.4899 2.01577 13.4756C2.08114 16.5411 2.11383 18.0739 3.24496 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C9.90159 20.4836 10.7011 20.4954 11.5 20.4989"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M2 6L8.91302 9.92462C11.4387 11.3585 12.5613 11.3585 15.087 9.92462L22 6"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <g clipPath={`url(#${arrowWindowId})`}>
            <motion.path
              d={SEND_ARROW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={departingArrowVariants}
              animate={controls}
              initial="normal"
            />
          </g>
        </svg>
      </div>
    );
  }
);

MailSend01Icon.displayName = 'MailSend01Icon';

export { MailSend01Icon };
