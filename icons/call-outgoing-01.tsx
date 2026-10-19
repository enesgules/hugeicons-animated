'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CallOutgoing01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CallOutgoing01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ARROW = 'M18 10C18.6068 9.41016 21 7.84027 21 7C21 6.15973 18.6068 4.58984 18 4M20.5 7H13';
const DURATION = 1;

// The call goes out: the handset kicks, the arrow pulls back and shoots off the
// right edge, and a fresh arrow slides out of the handset into its place.
const handsetVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 3, -5, 2, 0],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      times: [0, 0.22, 0.45, 0.7, 1],
    },
  },
};

const departingArrowVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -1.4, 13, 13],
    transition: {
      duration: DURATION,
      ease: ['easeOut', 'easeIn', 'linear'],
      times: [0, 0.2, 0.42, 1],
    },
  },
};

const arrivingArrowVariants: Variants = {
  normal: { translateX: -11 },
  animate: {
    translateX: [-11, -11, 0.8, -0.25, 0],
    transition: {
      duration: DURATION,
      ease: ['linear', [0.23, 1, 0.32, 1], 'easeInOut', 'easeInOut'],
      times: [0, 0.44, 0.74, 0.88, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const CallOutgoing01Icon = forwardRef<CallOutgoing01IconHandle, CallOutgoing01IconProps>(
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
              <rect x="11.5" y="2" width="12.5" height="10" />
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

CallOutgoing01Icon.displayName = 'CallOutgoing01Icon';

export { CallOutgoing01Icon };
