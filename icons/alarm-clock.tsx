'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AlarmClockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the clock rattles while its two existing alarm bells sweep through a broad mirrored arc;
// no additional ringing marks are introduced
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -5, 4, -3, 2, -1, 0],
    transition: { duration: 0.62, ease: [0.77, 0, 0.175, 1], repeat: Infinity },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)', transition: { duration: 0.16 } },
  animate: (direction: number) => ({
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(' + direction * 2.6 + 'px, 0.9px) rotate(' + direction * -9 + 'deg)',
      'translate(' + direction * -0.45 + 'px, -0.25px) rotate(' + direction * 4 + 'deg)',
      'translate(' + direction * 2.1 + 'px, 0.65px) rotate(' + direction * -6 + 'deg)',
      'translate(' + direction * 0.35 + 'px, 0.1px) rotate(' + direction * -1 + 'deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.68,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.2, 0.42, 0.64, 0.82, 1],
      repeat: Infinity,
    },
  }),
};

const AlarmClockIcon = forwardRef<AlarmClockIconHandle, AlarmClockIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
          style={{ transformOrigin: '12px 13px' }}
        >
          <path
            d="M20.5 12.5C20.5 17.1944 16.6944 21 12 21C7.30558 21 3.5 17.1944 3.5 12.5C3.5 7.80558 7.30558 4 12 4C16.6944 4 20.5 7.80558 20.5 12.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.88 18.7031L3.5 21.0031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.14 18.668L20.5 20.998"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M5 3L2 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bellVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M22 6L19 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bellVariants}
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
          />
          <path
            d="M12 8V12.5L14 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

AlarmClockIcon.displayName = 'AlarmClockIcon';

export { AlarmClockIcon };
