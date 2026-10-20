'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Copy02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Copy02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const COPY_DURATION = 0.86;
const COPY_TIMES = [0, 0.1, 0.34, 0.46, 0.56, 0.76, 0.88, 1];
const COPY_EASING: Easing[] = [
  [0.23, 1, 0.32, 1],
  [0.77, 0, 0.175, 1],
  [0.23, 1, 0.32, 1],
  'linear',
  [0.77, 0, 0.175, 1],
  [0.23, 1, 0.32, 1],
  [0.23, 1, 0.32, 1],
];

// The dashed front sheet grows to cover the rear panel, pauses, then returns.
const frontVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)', strokeWidth: 1.5 },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0.45px, 0.45px) scale(0.97)',
      'translate(-6.2px, -6.2px) scale(1.2)',
      'translate(-6px, -6px) scale(1.14)',
      'translate(-6px, -6px) scale(1.14)',
      'translate(0.65px, 0.65px) scale(0.96)',
      'translate(-0.25px, -0.25px) scale(1.03)',
      'translate(0px, 0px) scale(1)',
    ],
    strokeWidth: [1.5, 1.5 / 0.97, 1.5 / 1.2, 1.5 / 1.14, 1.5 / 1.14, 1.5 / 0.96, 1.5 / 1.03, 1.5],
    transition: { duration: COPY_DURATION, ease: COPY_EASING, times: COPY_TIMES },
  },
};

// The invisible mask grows during the overlap so the rear panel is fully hidden.
// Mask content moves through its attributes, not CSS transforms.
const occlusionVariants: Variants = {
  normal: { attrX: 9, attrY: 9, width: 13, height: 13, rx: 2.5 },
  animate: {
    attrX: [9, 9.645, 1.24, 1.83, 1.83, 9.26, 8.555, 9],
    attrY: [9, 9.645, 1.24, 1.83, 1.83, 9.26, 8.555, 9],
    width: [13, 12.61, 16.12, 15.34, 15.34, 13.78, 13.39, 13],
    height: [13, 12.61, 16.12, 15.34, 15.34, 13.78, 13.39, 13],
    rx: [2.5, 2.425, 3.1, 2.95, 2.95, 2.65, 2.575, 2.5],
    transition: { duration: COPY_DURATION, ease: COPY_EASING, times: COPY_TIMES },
  },
};

// The occlusion mask is only active while the sheets overlap; at rest it would
// trim the ends of the rear panel.
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: COPY_DURATION, times: [0, 0.999, 1] },
  },
};

const Copy02Icon = forwardRef<Copy02IconHandle, Copy02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const occlusionMaskId = useId();
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
              id={occlusionMaskId}
              maskUnits="userSpaceOnUse"
              x="-4"
              y="-4"
              width="32"
              height="32"
            >
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2.5"
                  fill="black"
                  stroke="black"
                  strokeWidth="2.5"
                  variants={occlusionVariants}
                  animate={controls}
                  initial="normal"
                />
              </motion.g>
            </mask>
          </defs>
          <motion.path
            d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={frontVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15.5 / 24, originY: 15.5 / 24 }}
          />
          <path
            d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            mask={`url(#${occlusionMaskId})`}
          />
        </svg>
      </div>
    );
  }
);

Copy02Icon.displayName = 'Copy02Icon';

export { Copy02Icon };
