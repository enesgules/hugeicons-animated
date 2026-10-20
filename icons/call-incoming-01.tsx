'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CallIncoming01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CallIncoming01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW =
  'M16 10C15.3932 9.41016 13 7.84027 13 7C13 6.15973 15.3932 4.58984 16 4M13.5 7H21';
const RING = springEase(0.7, 0.45);
const RING_DURATION = 0.9;
const RING_TIMES = [0, 0.16, 1];
const ARROW_DURATION = 1.1;
const ARROW_LAND = springEase(0.5, 0.3);

// The call comes in: the arrow winds back and dives into the handset, the
// handset rings on the hit, and a fresh arrow springs in from the right edge.
// Ring, shared by every phone icon: the handset kicks to one side, then a
// high-bounce spring rattles it back through rest until it settles.
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-15deg)', 'rotate(0deg)'],
    transition: {
      duration: RING_DURATION,
      delay: 0.26,
      times: RING_TIMES,
      ease: ['easeOut', RING],
    },
  },
};

const departingArrowVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(1.4px)', 'translateX(-13px)', 'translateX(-13px)'],
    transition: {
      duration: ARROW_DURATION,
      times: [0, 0.16, 0.36, 1],
      ease: ['easeOut', 'easeIn', 'linear'],
    },
  },
};

const arrivingArrowVariants: Variants = {
  normal: { transform: 'translateX(12px)' },
  animate: {
    transform: ['translateX(12px)', 'translateX(12px)', 'translateX(0px)'],
    transition: {
      duration: ARROW_DURATION,
      times: [0, 0.4, 1],
      ease: ['linear', ARROW_LAND],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const CallIncoming01Icon = forwardRef<CallIncoming01IconHandle, CallIncoming01IconProps>(
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
          overflow="visible"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <rect x="10" y="2" width="14" height="10" />
            </clipPath>
          </defs>
          <motion.path
            d="M4.91186 10.5413L7.55229 7.90088C8.09091 7.36227 8.27728 6.56642 8.05944 5.83652C7.8891 5.26577 7.69718 4.57964 7.56961 3.99292C7.45162 3.45027 6.97545 3 6.42012 3H4.91186C3.8012 3 2.88911 3.90384 3.01094 5.0078C3.93709 13.3996 10.6004 20.0629 18.9922 20.9891C20.0962 21.1109 21 20.1988 21 19.0881V17.5799C21 17.0246 20.5479 16.569 20.0015 16.4696C19.3988 16.36 18.7611 16.1804 18.2276 16.0103C17.4611 15.7659 16.6091 15.9377 16.0403 16.5065L13.4587 19.0881"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handsetVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <g clipPath={`url(#${clipId})`}>
            <motion.path
              d={ARROW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={departingArrowVariants}
              animate={controls}
              initial="normal"
            />
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.path
                d={ARROW}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={arrivingArrowVariants}
                animate={controls}
                initial="normal"
              />
            </motion.g>
          </g>
        </svg>
      </div>
    );
  }
);

CallIncoming01Icon.displayName = 'CallIncoming01Icon';

export { CallIncoming01Icon };
