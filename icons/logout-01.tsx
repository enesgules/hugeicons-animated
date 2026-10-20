'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Logout01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Logout01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: { visibility: 'visible', transform: 'translateX(0)' },
  animate: (i: number) =>
    i === 0
      ? {
          transform: ['translateX(0px) scaleX(1)', 'translateX(-0.7px) scaleX(0.96)', 'translateX(0.2px) scaleX(1.01)', 'translateX(0px) scaleX(1)'],
          transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
        }
      : {
          transform: ['translateX(-1px)', 'translateX(3.2px)', 'translateX(-0.35px)', 'translateX(0px)'],
          transition: { duration: 0.58, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
        },
};

const Logout01Icon = forwardRef<Logout01IconHandle, Logout01IconProps>(
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
          d="M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77536 13.0944 4.52064 10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.49998" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={1}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

Logout01Icon.displayName = 'Logout01Icon';

export { Logout01Icon };
