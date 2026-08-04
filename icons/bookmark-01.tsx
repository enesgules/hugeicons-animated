'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Bookmark01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Bookmark01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the ribbon catches at the binding and lands with a visible saved-state fold
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(2.4px) scaleY(0.9)', 'translateY(-0.8px) scaleY(1.05)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1] },
  },
};

const foldVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(1.4px)', 'translateY(-0.2px)', 'translateY(0px)'],
    transition: { duration: 0.48, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};

const Bookmark01Icon = forwardRef<Bookmark01IconHandle, Bookmark01IconProps>(
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
          variants={svgVariants}
          animate={controls}
          initial="normal"
        >
          <path
            d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M4 7H20"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={foldVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
          />
        </motion.svg>
      </div>
    );
  }
);

Bookmark01Icon.displayName = 'Bookmark01Icon';

export { Bookmark01Icon };
