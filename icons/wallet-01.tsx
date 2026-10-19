'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Wallet01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Wallet01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WALLET_DURATION = 1.2;
const NOTE =
  'M9.5 1.5H14.5C15.0523 1.5 15.5 1.94772 15.5 2.5V10H8.5V2.5C8.5 1.94772 8.94772 1.5 9.5 1.5Z';
const NOTE_INSIDE = 10;

// The wallet squeezes and a banknote pops up out of the opening in front of
// the back flap (a mask cuts the flap behind it, a clip hides the part still
// in the pocket). After a beat the note slides back in and the wallet dips as
// it closes around it.
const walletVariants: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: [1, 0.94, 1.03, 1, 1, 0.97, 1],
    transition: {
      duration: WALLET_DURATION,
      times: [0, 0.12, 0.26, 0.38, 0.68, 0.78, 0.92],
      ease: 'easeInOut',
    },
  },
};

const noteVariants: Variants = {
  normal: { translateY: NOTE_INSIDE },
  animate: {
    translateY: [NOTE_INSIDE, NOTE_INSIDE, -2, -0.9, -1.2, -1.2, NOTE_INSIDE, NOTE_INSIDE],
    transition: {
      duration: WALLET_DURATION,
      times: [0, 0.12, 0.3, 0.4, 0.48, 0.6, 0.78, 1],
      ease: [
        'linear',
        [0.33, 1, 0.68, 1],
        'easeInOut',
        'easeInOut',
        'linear',
        [0.55, 0, 0.85, 0.35],
        'linear',
      ],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: WALLET_DURATION, times: [0, 0.78, 0.8] },
  },
};

const Wallet01Icon = forwardRef<Wallet01IconHandle, Wallet01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const maskId = useId();
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
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-2" y="-6" width="28" height="32">
              <rect x="-2" y="-6" width="28" height="32" fill="white" />
              <motion.path
                d={NOTE}
                fill="black"
                stroke="black"
                strokeWidth="3"
                strokeLinejoin="round"
                variants={noteVariants}
                animate={controls}
                initial="normal"
              />
            </mask>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <rect x="-2" y="-6" width="28" height="12.25" />
            </clipPath>
          </defs>
          <motion.g
            variants={walletVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 21 / 24 }}
          >
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
              clipPath={`url(#${clipId})`}
            >
              <motion.path
                d={NOTE}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={noteVariants}
                animate={controls}
                initial="normal"
              />
              <motion.path
                d="M11 4.1H13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={noteVariants}
                animate={controls}
                initial="normal"
              />
            </motion.g>
            <path
              d="M14 3H5C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7H18C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8117 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              mask={`url(#${maskId})`}
            />
            <path
              d="M3 5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M21 12H19C18.535 12 18.3025 12 18.1118 12.0511C17.5941 12.1898 17.1898 12.5941 17.0511 13.1118C17 13.3025 17 13.535 17 14C17 14.465 17 14.6975 17.0511 14.8882C17.1898 15.4059 17.5941 15.8102 18.1118 15.9489C18.3025 16 18.535 16 19 16H21"
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

Wallet01Icon.displayName = 'Wallet01Icon';

export { Wallet01Icon };
