'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

/** Imperative controls for the Image 01 icon animation. */
export interface Image01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Image01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PHOTO_DURATION = 0.58;
const PHOTO_TIMES = [0, 0.28, 0.68, 1];
const PHOTO_EASE = [0.23, 1, 0.32, 1] as const;

// The complete photo lifts as one object while its scene shifts with shallow
// parallax. Every layer begins and ends on the untouched Hugeicons artwork.
const photoVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(-0.75px) rotate(-2deg) scale(1.03)',
      'translateY(0.2px) rotate(0.55deg) scale(0.992)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: PHOTO_DURATION,
      ease: PHOTO_EASE,
      times: PHOTO_TIMES,
    },
  },
};

const sunVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0.75px, -0.9px) scale(0.96)',
      'translate(-0.15px, 0.2px) scale(1.06)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: PHOTO_DURATION,
      ease: PHOTO_EASE,
      times: [0, 0.34, 0.74, 1],
    },
  },
};

const landscapeVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(1.05px) scaleY(0.97)',
      'translateY(-0.3px) scaleY(1.015)',
      'translateY(0px) scaleY(1)',
    ],
    transition: {
      duration: PHOTO_DURATION,
      ease: PHOTO_EASE,
      times: [0, 0.38, 0.76, 1],
    },
  },
};

/** Animated Hugeicons Image 01 icon. */
const Image01Icon = forwardRef<Image01IconHandle, Image01IconProps>(
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
        <motion.div
          variants={photoVariants}
          animate={controls}
          initial="normal"
          style={{
            width: size,
            height: size,
            transformOrigin: '50% 50%',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            overflow="visible"
          >
            <motion.circle
              cx="7.5"
              cy="7.5"
              r="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={sunVariants}
              animate={controls}
              initial="normal"
              style={{
                transformBox: 'view-box',
                transformOrigin: '7.5px 7.5px',
              }}
            />
            <path
              d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.path
              d="M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={landscapeVariants}
              animate={controls}
              initial="normal"
            />
          </svg>
        </motion.div>
      </div>
    );
  }
);

Image01Icon.displayName = 'Image01Icon';

export { Image01Icon };
