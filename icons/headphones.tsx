'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HeadphonesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HeadphonesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a bass hit flexes the band and drives alternating ear-cup pulses
const bandVariants: Variants = {
  normal: { scaleY: 1, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    scaleY: [1, 0.94, 1.03, 1],
    translateY: [0, 0.5, -0.25, 0],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const cupVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: (direction: number) => ({
    scale: [1, 1.1, 0.96, 1.06, 1],
    rotate: [0, direction * 3, 0, direction * -2, 0],
    transition: { duration: 0.85, ease: 'easeInOut' },
  }),
};

const musicNoteVariants: Variants = {
  normal: { opacity: 0, translateY: 1, scale: 0.5 },
  animate: {
    opacity: [0, 0.8, 0],
    translateY: [1, -3],
    scale: [0.5, 1],
    transition: { duration: 0.9, delay: 0.18, ease: 'easeOut' },
  },
};

const HeadphonesIcon = forwardRef<HeadphonesIconHandle, HeadphonesIconProps>(
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
            d="M20.0849 17C20.5849 15.5 21 13.4368 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4368 3.41512 15.5 3.91512 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bandVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M8.97651 19.6043L7.23857 14.6127C7.05341 14.1466 6.4617 13.9131 5.97493 14.0297C4.46441 14.5333 3.6462 16.1718 4.14742 17.6895L4.58543 19.0158C5.08664 20.5334 6.71747 21.3555 8.22799 20.8519C8.68896 20.6556 9.10449 20.0897 8.97651 19.6043Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cupVariants}
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '6.5px 17.5px' }}
          />
          <motion.path
            d="M15.0235 19.6043L16.7614 14.6127C16.9466 14.1466 17.5383 13.9131 18.0251 14.0297C19.5356 14.5333 20.3538 16.1718 19.8526 17.6895L19.4146 19.0158C18.9134 20.5334 17.2825 21.3555 15.772 20.8519C15.311 20.6556 14.8955 20.0897 15.0235 19.6043Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cupVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17.5px 17.5px' }}
          />
          <motion.path d="M21 11V7.8L23 7.2V10.2M21 10.2C20.1 10.2 19.7 10.6 19.7 11.1C19.7 11.6 20.1 12 20.7 12C21.3 12 21.7 11.6 21.7 11.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" variants={musicNoteVariants} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

HeadphonesIcon.displayName = 'HeadphonesIcon';

export { HeadphonesIcon };
