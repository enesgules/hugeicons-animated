'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface UmbrellaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UmbrellaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, it rains. Drawn drops fall from above and die on the
// canopy; the umbrella sways gently under them.
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -2.5, 2, -1, 0],
    transition: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
  },
};

const dropVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    translateY: [0, 3, 6.5, 8.5],
    transition: {
      duration: 0.9,
      ease: 'easeIn',
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};

const UmbrellaIcon = forwardRef<UmbrellaIconHandle, UmbrellaIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

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
          style={{ transformOrigin: '12px 14px' }}
        >
          <path
            d="M12 3.5V2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12 3.5C11.0608 3.5 7.52791 7.29323 6.97182 12.2037M12 3.5C12.9392 3.5 16.4721 7.29322 17.0282 12.2037M12 3.5C16.9367 3.5 21.0545 6.93552 22 11.5C20.6123 12.7 18.1073 12.4691 17.0282 12.2037M12 3.5C7.06333 3.5 2.94545 6.93552 2 11.5C3.38792 12.7 5.89285 12.4691 6.97182 12.2037M6.97182 12.2037C8.4559 13.0288 10.1718 13.5 12 13.5C13.8282 13.5 15.5441 13.0288 17.0282 12.2037"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M12 13.5V20.5C12 21.3284 11.3284 22 10.5 22C9.67157 22 9 21.3284 9 20.5V20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M5.5 -2.5V-0.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 -4V-2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.5 -2.5V-0.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

UmbrellaIcon.displayName = 'UmbrellaIcon';

export { UmbrellaIcon };
