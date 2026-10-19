'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Link01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Link01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The chain is pulled taut: both links slide apart along their shared
// diagonal, where each tucked end glides along the other link's curve, then
// they snap back together and settle.
const LINK_DURATION = 0.9;
const LINK_TIMES = [0, 0.14, 0.42, 0.54, 0.7, 0.85, 1];
const LINK_EASE: Easing[] = [
  'easeOut',
  [0.23, 1, 0.32, 1],
  'linear',
  [0.55, 0, 0.75, 0.2],
  'easeOut',
  'easeInOut',
];
// Half of the relative slide per link, per axis, in viewBox units.
const SLIDE = [0, -0.15, 0.92, 0.92, -0.22, 0.08, 0];

const lowerLinkVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: SLIDE,
    translateY: SLIDE,
    transition: { duration: LINK_DURATION, ease: LINK_EASE, times: LINK_TIMES },
  },
};

const upperLinkVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: SLIDE.map((v) => -v),
    translateY: SLIDE.map((v) => -v),
    transition: { duration: LINK_DURATION, ease: LINK_EASE, times: LINK_TIMES },
  },
};

const Link01Icon = forwardRef<Link01IconHandle, Link01IconProps>(
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
            d="M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lowerLinkVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={upperLinkVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Link01Icon.displayName = 'Link01Icon';

export { Link01Icon };
