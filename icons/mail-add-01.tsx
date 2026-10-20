'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MailAdd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailAdd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a new letter drops into the inbox while the add mark stamps the corner
const containerVariants: Variants = {
  normal: { y: 0, scaleY: 1 },
  animate: {
    y: [0, -1.8, 1, -0.25, 0],
    scaleY: [1, 1.02, 0.96, 1.01, 1],
    transition: { duration: 0.62, times: [0, 0.16, 0.5, 0.76, 1], ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -12, 4, 0],
    scale: [1, 0.5, 1.22, 1],
    transition: { duration: 0.56, delay: 0.04, times: [0, 0.2, 0.62, 1], ease: [0.23, 1, 0.32, 1] },
  },
};

const MailAdd01Icon = forwardRef<MailAdd01IconHandle, MailAdd01IconProps>(
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
          <motion.g
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 11.5 / 24 }}
          >
            <path
              d="M2 5.5L8.91302 9.42462C11.4387 10.8585 12.5613 10.8585 15.087 9.42462L22 5.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M11.5 20C11.5 20 10.0691 19.9878 9.09883 19.9634C5.95033 19.8843 4.37608 19.8448 3.24496 18.7094C2.11383 17.5739 2.08114 16.0412 2.01577 12.9756C1.99475 11.9899 1.99474 11.0101 2.01576 10.0244C2.08114 6.95885 2.11382 5.42608 3.24495 4.29065C4.37608 3.15521 5.95033 3.11566 9.09882 3.03656C11.0393 2.98781 12.9607 2.98781 14.9012 3.03657C18.0497 3.11568 19.6239 3.15523 20.7551 4.29066C21.8862 5.42609 21.9189 6.95886 21.9842 10.0244C21.9918 10.3812 21.9967 10.9995 21.9988 11.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M14 17H22M18 21L18 13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 18 / 24, originY: 17 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

MailAdd01Icon.displayName = 'MailAdd01Icon';

export { MailAdd01Icon };
