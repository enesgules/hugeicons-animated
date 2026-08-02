'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FilterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FilterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// two items enter wide and converge through the fixed funnel, making the filtering action literal
const particleVariants: Variants = {
  normal: { opacity: 0, transform: 'translate(0px, 0px) scale(0.75)' },
  animate: (direction: number) => ({
    opacity: [0, 1, 0],
    transform: [
      'translate(0px, 0px) scale(0.75)',
      `translate(${direction * 1.75}px, 4.5px) scale(1)`,
      `translate(${direction * 3.5}px, 9px) scale(0.7)`,
    ],
    transition: {
      duration: 0.28,
      delay: direction > 0 ? 0 : 0.035,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.28, 1],
    },
  }),
};

const FILTER_PARTICLES = [
  { cx: 8.5, direction: 1 },
  { cx: 15.5, direction: -1 },
] as const;

const FilterIcon = forwardRef<FilterIconHandle, FilterIconProps>(
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
        <path
          d="M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
        />
        {FILTER_PARTICLES.map(({ cx, direction }) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="4.5"
            r="0.6"
            fill="currentColor"
            variants={particleVariants}
            custom={direction}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: `${cx}px 4.5px` }}
          />
        ))}
        </svg>
      </div>
    );
  }
);

FilterIcon.displayName = 'FilterIcon';

export { FilterIcon };
