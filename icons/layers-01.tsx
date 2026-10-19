'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Layers01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Layers01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TOP =
  'M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z';
const MIDDLE =
  'M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972';
const BOTTOM =
  'M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661';

// A new sheet drops in from the top and pushes the stack down one slot. The
// old top sheet slides under it and a clip trims it to the middle-layer
// shape, the middle sheet becomes the bottom one, and the bottom sheet drops
// out. At the end each sheet sits on its rest shape, so the swap is invisible.
const LAYER_DURATION = 1.1;
const LAYER_TIMES = [0, 0.26, 0.42, 0.56, 0.7, 0.84, 0.999, 1];
const LAYER_EASE: Easing[] = [
  'easeIn',
  [0.23, 1, 0.32, 1],
  'easeInOut',
  'easeInOut',
  'easeInOut',
  'linear',
  'linear',
];
const SLOT = 4.95;
// The landing pushes the stack past its slot, then it springs back and settles.
const SPRING = [0.9, -0.35, 0.12, 0];

// The clip rect's top edge follows the falling sheet, so the old top sheet is
// only trimmed where the new sheet covers it. Its bottom edge stays fixed.
const CLIP_BOTTOM = 70;
const CLIP_HEIGHT = 110;
const CLIP_REST_TOP = CLIP_BOTTOM - CLIP_HEIGHT;
const CLIP_TOPS = [-0.35, 6.49, ...SPRING.map((o) => SLOT + o + 5.75), 10.7, CLIP_REST_TOP];

const newSheetVariants: Variants = {
  normal: { translateY: -13 },
  animate: {
    translateY: [-13, -SLOT, ...SPRING, 0, 0],
    transition: { duration: LAYER_DURATION, ease: LAYER_EASE, times: LAYER_TIMES },
  },
};

const topVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0, ...SPRING.map((o) => SLOT + o), SLOT, 0],
    transition: { duration: LAYER_DURATION, ease: LAYER_EASE, times: LAYER_TIMES },
  },
};

const clipVariants: Variants = {
  normal: { attrY: CLIP_REST_TOP, height: CLIP_HEIGHT },
  animate: {
    attrY: CLIP_TOPS,
    height: CLIP_TOPS.map((top) => CLIP_BOTTOM - top),
    transition: { duration: LAYER_DURATION, ease: LAYER_EASE, times: LAYER_TIMES },
  },
};

const middleVariants: Variants = {
  normal: { d: MIDDLE, translateY: 0 },
  animate: {
    d: [MIDDLE, MIDDLE, BOTTOM, BOTTOM, BOTTOM, BOTTOM, BOTTOM, MIDDLE],
    translateY: [0, 0, ...SPRING, 0, 0],
    transition: { duration: LAYER_DURATION, ease: LAYER_EASE, times: LAYER_TIMES },
  },
};

const bottomVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(4.5px) rotate(-6deg) scale(0)',
      'translateY(4.5px) rotate(-6deg) scale(0)',
      'translateY(4.5px) rotate(-6deg) scale(0)',
      'translateY(4.5px) rotate(-6deg) scale(0)',
      'translateY(4.5px) rotate(-6deg) scale(0)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: { duration: LAYER_DURATION, ease: LAYER_EASE, times: LAYER_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: LAYER_DURATION, times: [0, 0.999, 1] },
  },
};

const Layers01Icon = forwardRef<Layers01IconHandle, Layers01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const clipId = useId();
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
          overflow="hidden"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <motion.rect
                x="-5"
                y={CLIP_REST_TOP}
                width="34"
                height={CLIP_HEIGHT}
                variants={clipVariants}
                animate={controls}
                initial="normal"
              />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <motion.path
              d={TOP}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={topVariants}
              animate={controls}
              initial="normal"
            />
          </g>
          <motion.path
            d={MIDDLE}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={middleVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d={BOTTOM}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bottomVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={TOP}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={newSheetVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Layers01Icon.displayName = 'Layers01Icon';

export { Layers01Icon };
