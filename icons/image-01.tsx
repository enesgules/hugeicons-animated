'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Image01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Image01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the frame holds steady while the sun lifts and the ridge settles beneath it
const sunVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(-0.3px, -0.35px) scale(1.06)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1], times: [0, 0.45, 1] },
  },
};

const ridgeVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.45px)', 'translateY(0px)'],
    transition: { duration: 0.24, delay: 0.025, ease: [0.23, 1, 0.32, 1] },
  },
};

const Image01Icon = forwardRef<Image01IconHandle, Image01IconProps>(
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
        <motion.circle
          cx="7.5" cy="7.5" r="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={sunVariants}
          animate={controls}
          initial="normal"
          style={{ transformBox: 'view-box', transformOrigin: '7.5px 7.5px' }}
        />
        <path
          d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5"
        />
        <motion.path
          d="M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424" stroke="currentColor" strokeWidth="1.5"
          variants={ridgeVariants}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

Image01Icon.displayName = 'Image01Icon';

export { Image01Icon };
