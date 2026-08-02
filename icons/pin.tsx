'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PinIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PinIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the pin lifts off its point, drives into place, and the needle takes the impact
const needleVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.035)', 'scale(0.88)', 'scale(1.02)', 'scale(1)'],
    transition: {
      duration: 0.44,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.22, 0.58, 0.82, 1],
    },
  },
};

const bodyVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0.45px, -0.45px) rotate(1deg)',
      'translate(-0.85px, 0.85px) rotate(-1deg)',
      'translate(0.12px, -0.12px) rotate(0.35deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.44,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.22, 0.58, 0.82, 1],
    },
  },
};

const PinIcon = forwardRef<PinIconHandle, PinIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
          d="M3 21L8 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={needleVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '3px 21px' }}
        />
        <motion.path
          d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={bodyVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '8px 16px' }}
        />
        </svg>
      </div>
    );
  }
);

PinIcon.displayName = 'PinIcon';

export { PinIcon };
