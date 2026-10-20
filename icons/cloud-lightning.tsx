'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CloudLightningIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CloudLightningIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WEATHER_DURATION = 1.1;
const WEATHER_TIMES = [0, 0.16, 0.4, 1];
const WEATHER_LAND = springEase(0.45, 0.35);
const BOLT_LAND = springEase(0.5, 0.3);

// Weather, shared by every cloud: the cloud gathers (it sinks and swells),
// releases with a lift, and settles on a spring. Here the bolt pulls up into
// the gathering cloud, strikes down in one fast stroke as the cloud lifts,
// flickers twice like real lightning, and springs back into place.
const cloudVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) scale(1)',
      'translateY(0.4px) scale(1.04)',
      'translateY(-0.9px) scale(0.98)',
      'translateY(0px) scale(1)',
    ],
    transition: {
      duration: WEATHER_DURATION,
      times: WEATHER_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], WEATHER_LAND],
    },
  },
};

const boltVariants: Variants = {
  normal: { transform: 'translateY(0px)', pathLength: 1, visibility: 'visible' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0px)', 'translateY(1.2px)', 'translateY(0px)'],
    pathLength: [1, 0, 0, 1, 1],
    // Hidden while retracted, then two short flickers after the strike.
    visibility: [
      'visible',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'hidden',
      'hidden',
      'visible',
      'visible',
      'hidden',
      'hidden',
      'visible',
    ],
    transition: {
      transform: {
        duration: WEATHER_DURATION,
        times: [0, 0.3, 0.4, 1],
        ease: ['linear', 'easeIn', BOLT_LAND],
      },
      pathLength: {
        duration: WEATHER_DURATION,
        times: [0, 0.16, 0.3, 0.4, 1],
        ease: ['easeIn', 'linear', 'easeIn', 'linear'],
      },
      visibility: {
        duration: WEATHER_DURATION,
        times: [0, 0.16, 0.3, 0.31, 0.46, 0.47, 0.5, 0.51, 0.55, 0.56, 0.59, 1],
        ease: 'linear',
      },
    },
  },
};

const CloudLightningIcon = forwardRef<CloudLightningIconHandle, CloudLightningIconProps>(
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
            d="M7 18C4.23858 18 2 15.7614 2 13C2 10.4003 3.98398 8.26407 6.52042 8.0227M17.5 18C19.9853 18 22 15.9853 22 13.5C22 11.0147 19.9853 9 17.5 9C17.4925 9 17.485 9.00002 17.4776 9.00005M16.9003 11C17.2119 10.3904 17.4131 9.71494 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.7111 8 8.38754 8.14845 9 8.41604"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cloudVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 10.5 / 24 }}
          />
          <motion.path
            d="M12.9994 13L11.1994 15.4C10.6758 16.0981 10.414 16.4472 10.5522 16.7236C10.6904 17 11.1267 17 11.9994 17C12.8721 17 13.3084 17 13.4466 17.2764C13.5848 17.5528 13.323 17.9019 12.7994 18.6L10.9994 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boltVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

CloudLightningIcon.displayName = 'CloudLightningIcon';

export { CloudLightningIcon };
