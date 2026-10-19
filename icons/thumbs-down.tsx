'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ThumbsDownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ThumbsDownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A double "no" pump, mirrored from thumbs-up: the whole fist and cuff swing
// from the elbow above the wrist, winding back before each thrust of the thumb
// down, the second pump smaller, then settle.
const handVariants: Variants = {
  normal: { transform: 'translateY(0%) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0%) rotate(0deg) scale(1)',
      'translateY(-4%) rotate(11deg) scale(0.96)',
      'translateY(9%) rotate(-7deg) scale(1.05)',
      'translateY(-2%) rotate(5deg) scale(0.98)',
      'translateY(4%) rotate(-3deg) scale(1.02)',
      'translateY(0%) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 0.9,
      ease: ['easeOut', [0.23, 1, 0.32, 1], 'easeInOut', [0.23, 1, 0.32, 1], 'easeInOut'],
      times: [0, 0.18, 0.4, 0.6, 0.78, 1],
    },
  },
};

const ThumbsDownIcon = forwardRef<ThumbsDownIconHandle, ThumbsDownIconProps>(
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
          variants={handVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '18.75% 0%' }}
        >
          <path
            d="M2 11.5C2 12.6046 2.89543 13.5 4 13.5C5.65685 13.5 7 12.1569 7 10.5V6.5C7 4.84315 5.65685 3.5 4 3.5C2.89543 3.5 2 4.39543 2 5.5V11.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M15.4787 16.1937L15.2124 15.3337C14.9942 14.6289 14.8851 14.2765 14.969 13.9982C15.0369 13.7731 15.1859 13.579 15.389 13.4513C15.64 13.2935 16.0197 13.2935 16.7791 13.2935H17.1831C19.7532 13.2935 21.0382 13.2935 21.6452 12.5327C21.7145 12.4458 21.7762 12.3533 21.8296 12.2563C22.2965 11.4079 21.7657 10.2649 20.704 7.9789C19.7297 5.88111 19.2425 4.83222 18.338 4.21485C18.2505 4.15508 18.1605 4.0987 18.0683 4.04586C17.116 3.5 15.9362 3.5 13.5764 3.5H13.0646C10.2057 3.5 8.77628 3.5 7.88814 4.36053C7 5.22106 7 6.60607 7 9.37607V10.3497C7 11.8054 7 12.5332 7.25834 13.1994C7.51668 13.8656 8.01135 14.4134 9.00069 15.5089L13.0921 20.0394C13.1947 20.1531 13.246 20.2099 13.2913 20.2493C13.7135 20.6167 14.3652 20.5754 14.7344 20.1577C14.774 20.1129 14.8172 20.0501 14.9036 19.9245C15.0388 19.728 15.1064 19.6297 15.1654 19.5323C15.6928 18.6609 15.8524 17.6256 15.6108 16.6429C15.5838 16.5331 15.5488 16.4199 15.4787 16.1937Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

ThumbsDownIcon.displayName = 'ThumbsDownIcon';

export { ThumbsDownIcon };
