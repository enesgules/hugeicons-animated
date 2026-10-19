'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface WavingHand01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface WavingHand01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A friendly wave from the wrist: two swings that lose energy, then rest. The
// motion mark pushes outward each time the hand swings toward it.
const WAVE_TIMES = [0, 0.18, 0.38, 0.58, 0.78, 1];

const handVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -16, 8, -14, 6, 0],
    transition: { duration: 1, ease: 'easeInOut', times: WAVE_TIMES },
  },
};

const markVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 0, 0.9, 0, 0.7, 0],
    translateY: [0, 0, -0.4, 0, -0.3, 0],
    transition: { duration: 1, delay: 0.04, ease: 'easeInOut', times: WAVE_TIMES },
  },
};

const WavingHand01Icon = forwardRef<WavingHand01IconHandle, WavingHand01IconProps>(
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
            d="M14.1245 5.74923C14.3983 4.99948 15.2302 4.6129 15.9825 4.88579C16.7348 5.15868 17.1227 5.98769 16.8489 6.73744L16.1878 8.5475M14.1245 5.74923L14.7855 3.93917C15.0594 3.18942 14.6715 2.3604 13.9192 2.08752C13.1668 1.81463 12.335 2.20121 12.0612 2.95096L11.5656 4.30857M14.1245 5.74923L12.3066 10.7269M11.5656 4.30857C11.839 3.55897 11.4511 2.73032 10.699 2.4575C9.94664 2.18461 9.11479 2.57119 8.84097 3.32094L6.04389 10.9791L5.1097 8.97429C4.69981 8.09467 3.61484 7.7678 2.78416 8.27368C2.14856 8.66075 1.85475 9.42786 2.06986 10.1386L3.81898 15.4859C4.15364 16.509 4.04527 17.8595 3.67597 18.8707M11.5656 4.30857L9.91291 8.83372M12.3032 22L12.6881 20.946C12.8639 20.4648 13.2266 20.0763 13.677 19.8297C14.1978 19.5445 14.8694 19.1322 15.2097 18.7412C15.7963 18.0673 16.1555 17.0838 16.8739 15.1169L18.9122 9.53572C19.186 8.78596 18.7981 7.95695 18.0458 7.68406C17.2935 7.41118 16.4616 7.79775 16.1878 8.5475M14.7004 12.6201L16.1878 8.5475"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '8px 21px' }}
          />
          <motion.path
            d="M20.8307 13C21.377 14.6354 20.5574 16.4263 19 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={markVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

WavingHand01Icon.displayName = 'WavingHand01Icon';

export { WavingHand01Icon };
