'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface BatteryCharging01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BatteryCharging01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// charge travels left to right; the bolt catches at the crest, then the
// battery settles with the stored energy
const bodyVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(0.8px) scaleY(0.94)',
      'translateY(-0.5px) scaleY(1.04)',
      'translateY(0px) scaleY(1)',
    ],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1] },
  },
};

const boltVariants: Variants = {
  normal: { opacity: 1, transform: 'translateY(0px) scale(1)' },
  animate: {
    opacity: [0.4, 1, 1, 1],
    transform: [
      'translateY(2.4px) scale(0.76)',
      'translateY(0px) scale(1.35)',
      'translateY(0px) scale(1.35)',
      'translateY(0px) scale(1)',
    ],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1], times: [0, 0.56, 0.74, 1] },
  },
};

const fillVariants: Variants = {
  normal: { opacity: 0, transform: 'scaleX(0.08)' },
  animate: {
    opacity: [0, 0.14, 0.14, 0],
    transform: ['scaleX(0.08)', 'scaleX(1)', 'scaleX(1)', 'scaleX(1)'],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1], times: [0, 0.56, 0.74, 1] },
  },
};

const BatteryCharging01Icon = forwardRef<BatteryCharging01IconHandle, BatteryCharging01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={bodyVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        >
          <motion.rect
            x="3.6"
            y="7.6"
            width="14.2"
            height="8.8"
            rx="2.2"
            fill="currentColor"
            variants={fillVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '3.6px 12px' }}
          />
          <path
            d="M2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H13C15.8284 6 17.2426 6 18.1213 6.87868C19 7.75736 19 9.17157 19 12C19 14.8284 19 16.2426 18.1213 17.1213C17.2426 18 15.8284 18 13 18H8C5.17157 18 3.75736 18 2.87868 17.1213C2 16.2426 2 14.8284 2 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M10.8282 9L9.08572 11.1749C8.89899 11.4079 9.03283 11.7433 9.33733 11.8053L11.1627 12.1773C11.4873 12.2434 11.6111 12.6147 11.3842 12.8413L9.22216 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boltVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10.2px 12px' }}
          />
          <path
            d="M19 9.5L20.0272 9.6712C20.7085 9.78475 21.0491 9.84152 21.3076 10.0067C21.5618 10.1691 21.7612 10.4044 21.8796 10.6819C22 10.964 22 11.3093 22 12C22 12.6907 22 13.036 21.8796 13.3181C21.7612 13.5956 21.5618 13.8309 21.3076 13.9933C21.0491 14.1585 20.7085 14.2153 20.0272 14.3288L19 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

BatteryCharging01Icon.displayName = 'BatteryCharging01Icon';

export { BatteryCharging01Icon };
