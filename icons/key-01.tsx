'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Key01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Key01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Unlock with a key: the whole key draws back, slides in along its shaft,
// turns about the shaft axis (seen as a foreshortened key), turns back, and
// withdraws. The shaft runs from the bow center at 135 degrees, so static
// groups rotate the turn into a 45-degree frame around the bow center.
const KEY_DURATION = 1.1;
const KEY_TIMES = [0, 0.14, 0.36, 0.54, 0.64, 0.8, 1];
const KEY_EASE: Easing[] = ['easeOut', [0.5, 0, 0.2, 1], 'easeInOut', 'linear', 'easeInOut', [0.23, 1, 0.32, 1]];

const insertVariants: Variants = {
  normal: { transform: 'translate(0%, 0%)' },
  animate: {
    transform: [
      'translate(0%, 0%)',
      'translate(2.5%, -2.5%)',
      'translate(-7%, 7%)',
      'translate(-7%, 7%)',
      'translate(-7%, 7%)',
      'translate(-7%, 7%)',
      'translate(0%, 0%)',
    ],
    transition: { duration: KEY_DURATION, ease: KEY_EASE, times: KEY_TIMES },
  },
};

const turnVariants: Variants = {
  normal: { scaleX: 1 },
  animate: {
    scaleX: [1, 1, 1, 0.58, 0.58, 1, 1],
    transition: { duration: KEY_DURATION, ease: KEY_EASE, times: KEY_TIMES },
  },
};

const Key01Icon = forwardRef<Key01IconHandle, Key01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={insertVariants}
          animate={controls}
          initial="normal"
        >
          <g transform="rotate(45 15.5 8.5)">
            <motion.g
              variants={turnVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 15.5 / 24, originY: 8.5 / 24 }}
            >
              <g transform="rotate(-45 15.5 8.5)">
                <path
                  d="M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5 6.5L16.5 7.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </motion.g>
          </g>
        </motion.svg>
      </div>
    );
  }
);

Key01Icon.displayName = 'Key01Icon';

export { Key01Icon };
