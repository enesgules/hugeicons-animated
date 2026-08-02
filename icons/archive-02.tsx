'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Archive02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Archive02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the drawer opens decisively, separating the stack while five motion marks
// flare into the newly opened space
const archiveLayerVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: (i: number) => ({
    transform: [
      'translateY(0px)',
      `translateY(${-3.2 - i * 1.7}px)`,
      `translateY(${-3.2 - i * 1.7}px)`,
      'translateY(0px)',
    ],
    transition: { duration: 0.86, delay: i * 0.05, ease: [0.77, 0, 0.175, 1], times: [0, 0.36, 0.62, 1] },
  }),
};

const archiveDrawerVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1)',
      'translateY(3.6px) scaleX(1.05)',
      'translateY(3.6px) scaleX(1.05)',
      'translateY(0px) scaleX(1)',
    ],
    transition: { duration: 0.86, ease: [0.77, 0, 0.175, 1], times: [0, 0.36, 0.62, 1] },
  },
};

const archiveHandleVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1)',
      'translateY(3.6px) scaleX(0.82)',
      'translateY(3.6px) scaleX(1.12)',
      'translateY(0px) scaleX(1)',
    ],
    transition: { duration: 0.86, ease: [0.77, 0, 0.175, 1], times: [0, 0.36, 0.62, 1] },
  },
};

const archiveOpenLineVariants: Variants = {
  normal: { opacity: 0, transform: 'translate(0px, 0px)' },
  animate: (i: number) => {
    const start = i === 3 ? 'translate(1.5px, 0px)' : i === 4 ? 'translate(-1.5px, 0px)' : 'translate(0px, 1.5px)';
    const outward = i === 3 ? 'translate(-1px, 0px)' : i === 4 ? 'translate(1px, 0px)' : 'translate(0px, -1px)';
    return {
      opacity: [0, 1, 0.85, 0],
      transform: [start, outward, outward, 'translate(0px, 0px)'],
      transition: { duration: 0.56, delay: 0.08 + i * 0.035, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.62, 1] },
    };
  },
};

const Archive02Icon = forwardRef<Archive02IconHandle, Archive02IconProps>(
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
            d="M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveDrawerVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 16px' }}
          />
          <motion.path
            d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveLayerVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveLayerVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveHandleVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 16px' }}
          />
          <motion.path d="M5.8 2.6L4.2 0.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" variants={archiveOpenLineVariants} custom={0} animate={controls} initial="normal" />
          <motion.path d="M12 0.5V-2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" variants={archiveOpenLineVariants} custom={1} animate={controls} initial="normal" />
          <motion.path d="M18.2 2.6L19.8 0.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" variants={archiveOpenLineVariants} custom={2} animate={controls} initial="normal" />
          <motion.path d="M1.2 11H-1.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" variants={archiveOpenLineVariants} custom={3} animate={controls} initial="normal" />
          <motion.path d="M22.8 11H25.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" variants={archiveOpenLineVariants} custom={4} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

Archive02Icon.displayName = 'Archive02Icon';

export { Archive02Icon };
