'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Copy02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Copy02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The dashed slot outline joined through its gaps, clockwise from the top-left
// corner. It runs exactly over every source dash.
const SLOT_OUTLINE =
  'M11.4873 9.02455L14.0283 9.02455L16.994 8.98193L19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488L21.9716 14.0221L21.9436 16.9818L22.0025 19.9726C21.6685 21.6894 20.3296 21.8223 19.4946 21.9586L16.9799 21.9586L14.0143 22.0013L11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344L8.98236 16.9953L9.01033 14.0357L9.01033 11.0488C9.31781 9.32713 10.6545 9.17371 11.4873 9.02455Z';

const COPY_DURATION = 1.1;

// The rear sheet presses like a stamp, a solid copy traces around the dashed
// slot, holds as a finished sheet, then clears back into the dashed slot.
const rearSheetVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.92, 1.03, 1],
    transition: {
      duration: 0.5,
      times: [0, 0.3, 0.65, 1],
      ease: [[0.23, 1, 0.32, 1], [0.77, 0, 0.175, 1], 'easeInOut'],
    },
  },
};

const traceVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0 },
  animate: {
    pathLength: [0, 0, 1, 1, 0],
    pathOffset: [0, 0, 0, 0, 1],
    transition: {
      duration: COPY_DURATION,
      times: [0, 0.12, 0.5, 0.74, 0.96],
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['hidden', 'visible', 'visible', 'hidden'],
    transition: {
      duration: COPY_DURATION,
      ease: 'linear',
      times: [0, 0.12, 0.96, 1],
    },
  },
};

const Copy02Icon = forwardRef<Copy02IconHandle, Copy02IconProps>(
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
          <motion.path
            d="M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C15.892 3.25546 15.7067 3.07019 15.5047 2.90436C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C3.255 3.07018 3.06971 3.25546 2.90387 3.45753C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C3.0697 15.7063 3.255 15.8916 3.45708 16.0574C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={rearSheetVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9.5 / 24, originY: 9.5 / 24 }}
          />
          <path
            d="M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={SLOT_OUTLINE}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={traceVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Copy02Icon.displayName = 'Copy02Icon';

export { Copy02Icon };
