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

// five cells build to a shared full-charge surge, then hand the energy back to the bolt
type ChargeCell = { start: number; done: number };

const chargeCellVariants: Variants = {
  normal: { visibility: 'hidden', transform: 'scaleY(0.08)' },
  animate: ({ start, done }: ChargeCell) => ({
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'visible', 'visible', 'hidden', 'hidden'],
    transform: [
      'scaleY(0.08)',
      'scaleY(0.08)',
      'scaleY(1)',
      'scaleY(1)',
      'scaleY(1.18)',
      'scaleY(0.94)',
      'scaleY(0.12)',
      'scaleY(0.12)',
    ],
    transition: {
      duration: 1.18,
      ease: [0.23, 1, 0.32, 1],
      times: [0, start, done, 0.64, 0.7, 0.76, 0.86, 1],
    },
  }),
};

const chargedBatteryVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: [
      'scale(1)',
      'scale(1)',
      'scale(1.055)',
      'scale(0.985)',
      'scale(1)',
      'scale(1)',
    ],
    transition: {
      duration: 1.18,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.64, 0.7, 0.77, 0.86, 1],
    },
  },
};

const chargeBoltVariants: Variants = {
  normal: { visibility: 'visible', transform: 'scale(1)', filter: 'blur(0px)' },
  animate: {
    visibility: ['visible', 'visible', 'hidden', 'hidden', 'hidden', 'hidden', 'visible', 'visible'],
    transform: [
      'scale(1)',
      'scale(1)',
      'scale(1)',
      'scale(0.25)',
      'scale(0.25)',
      'scale(0.25)',
      'scale(1.14)',
      'scale(1)',
    ],
    filter: [
      'blur(0px)',
      'blur(0px)',
      'blur(4px)',
      'blur(4px)',
      'blur(4px)',
      'blur(4px)',
      'blur(0px)',
      'blur(0px)',
    ],
    transition: {
      duration: 1.18,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.03, 0.15, 0.64, 0.76, 0.82, 0.93, 1],
    },
  },
};
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
};


const BatteryCharging01Icon = forwardRef<BatteryCharging01IconHandle, BatteryCharging01IconProps>(
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
          variants={chargedBatteryVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '11px 12px' }}
        >
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.path
            d="M4 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.05, done: 0.28 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '4px 15px' }}
          />
          <motion.path
            d="M7.1 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.14, done: 0.37 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '7.1px 15px' }}
          />
          <motion.path
            d="M10.2 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.23, done: 0.46 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10.2px 15px' }}
          />
          <motion.path
            d="M13.3 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.32, done: 0.55 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '13.3px 15px' }}
          />
          <motion.path
            d="M16.4 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.41, done: 0.64 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '16.4px 15px' }}
          />
          </motion.g>
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
            variants={chargeBoltVariants}
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
