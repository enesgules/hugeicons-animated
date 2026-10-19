'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SlidersHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SlidersHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Source rows: [left track, knob, right track]. Moving rows rebuild these
// from the knob position so both track ends follow the knob gap.
const ROWS = [
  ['M3.99963 5.00055L9.99963 5.00031', 'M9.99963 2.00031L9.99963 8.00031', 'M12.9996 5.00031L19.9996 5.00031'],
  ['M3.99963 12.0005L12.9996 12.0003', 'M15.9996 9.00031L15.9996 15.0003', 'M15.9996 12.0001L19.9996 12.0003'],
  ['M3.99963 19.0005L8.99963 19.0003', 'M11.9996 16.0003L11.9996 22.0003', 'M11.9996 19.0003L19.9996 19.0003'],
];
const KNOB_X = [10, 16, 12];
const ROW_Y = [5, 12, 19];
// Row 1 keeps its gap right of the knob; rows 2 and 3 keep it on the left.
const GAP_RIGHT = [true, false, false];
// Knob offsets per row: wind-up, first setting, opposite setting, settle.
const ROW_OFFSETS = [
  [-0.6, 2, -3, 0.4],
  [0.6, -2, 2, -0.4],
  [0.6, -3.5, 3.5, -0.4],
];

const rowPaths = (row: number, offset: number) => {
  const x = KNOB_X[row] + offset;
  const y = ROW_Y[row];
  const leftEnd = GAP_RIGHT[row] ? x : x - 3;
  const rightStart = GAP_RIGHT[row] ? x + 3 : x;
  return [`M4 ${y}L${leftEnd} ${y}`, `M${x} ${y - 3}L${x} ${y + 3}`, `M${rightStart} ${y}L20 ${y}`];
};

// Each knob slides to a new setting and back like a quick mixer adjustment;
// neighbouring rows move in opposite directions and the tracks follow the knob.
const sliderVariants: Variants = {
  normal: ({ row, part }: { row: number; part: number }) => ({
    d: ROWS[row][part],
  }),
  animate: ({ row, part }: { row: number; part: number }) => ({
    d: [
      ROWS[row][part],
      ...ROW_OFFSETS[row].map((offset) => rowPaths(row, offset)[part]),
      ROWS[row][part],
    ],
    transition: {
      duration: 1,
      delay: row === 0 ? 0 : 0.05,
      times: [0, 0.12, 0.4, 0.7, 0.86, 1],
      ease: 'easeInOut',
    },
  }),
};

const SlidersHorizontalIcon = forwardRef<SlidersHorizontalIconHandle, SlidersHorizontalIconProps>(
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
            d={ROWS[0][0]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 0, part: 0 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[0][1]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 0, part: 1 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[0][2]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 0, part: 2 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[1][0]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 1, part: 0 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[1][1]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 1, part: 1 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[1][2]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 1, part: 2 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[2][0]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 2, part: 0 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[2][1]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 2, part: 1 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={ROWS[2][2]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sliderVariants}
            custom={{ row: 2, part: 2 }}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

SlidersHorizontalIcon.displayName = 'SlidersHorizontalIcon';

export { SlidersHorizontalIcon };
