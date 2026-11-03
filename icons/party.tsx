'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PartyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PartyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A party pop: the old confetti drifts down and fades while the popper winds
// back. Then the popper recoils down-left as new confetti shoots out of the
// cone mouth, slows against the air past its place, and flutters down into it.
const POP_DURATION = 1.4;
const WIND = 0.2;
const LAUNCH = 0.24;
const FLUTTER = 0.8;
const MOUTH = [12.6, 11.4];
// Confetti piece centres, in source order.
const PIECES = [
  [17.5, 6.5],
  [21.75, 6],
  [20.75, 13.25],
  [18, 2.25],
  [11, 3.25],
  [13.6, 4],
  [20, 10.4],
];
const FARTHEST = Math.max(
  ...PIECES.map(([x, y]) => Math.hypot(x - MOUTH[0], y - MOUTH[1]))
);

const popperVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg) scale(1)',
      'translate(0px, 0px) rotate(-6deg) scale(0.94)',
      'translate(-0.6px, 0.6px) rotate(5deg) scale(1.07)',
      'translate(0px, 0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: POP_DURATION,
      times: [0, WIND, WIND + 0.07, 1],
      ease: ['easeInOut', [0.23, 1, 0.32, 1], springEase(0.5, 0.3)],
    },
  },
};

const confettiVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
  animate: (i: number) => {
    const [x, y] = PIECES[i];
    const inX = MOUTH[0] - x;
    const inY = MOUTH[1] - y;
    const side = i % 2 === 0 ? 1 : -1;
    const spin = side * (40 + i * 8);
    // Farther pieces take longer to slow down.
    const apex = 0.44 + 0.08 * (Math.hypot(inX, inY) / FARTHEST);
    return {
      transform: [
        'translate(0px, 0px) rotate(0deg) scale(1)',
        `translate(0px, 1.8px) rotate(${side * 25}deg) scale(0)`,
        `translate(${inX}px, ${inY}px) rotate(0deg) scale(0)`,
        `translate(${-inX * 0.18}px, ${-inY * 0.18 - 0.8}px) rotate(${spin}deg) scale(1.1)`,
        `translate(${-inX * 0.06 + side * 0.4}px, ${-inY * 0.06 - 0.25}px) rotate(${-spin * 0.3}deg) scale(1)`,
        'translate(0px, 0px) rotate(0deg) scale(1)',
      ],
      transition: {
        duration: POP_DURATION,
        delay: (i % 3) * 0.02,
        times: [0, WIND, LAUNCH, apex, FLUTTER, 1],
        ease: [
          [0.55, 0, 1, 0.45],
          'linear',
          [0.12, 0.9, 0.3, 1],
          [0.37, 0, 0.63, 1],
          [0.37, 0, 0.63, 1],
        ],
      },
    };
  },
};

const PartyIcon = forwardRef<PartyIconHandle, PartyIconProps>(
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
            d="M5.65784 11.0022L4.18747 14.3105C2.3324 18.4844 1.40486 20.5713 2.41719 21.5837C3.42951 22.596 5.51646 21.6685 9.69037 19.8134L12.9987 18.343C15.5161 17.2242 16.7748 16.6647 16.9751 15.586C17.1754 14.5073 16.2014 13.5333 14.2535 11.5854L12.4155 9.7474C10.4675 7.79944 9.49353 6.82546 8.41482 7.02575C7.33611 7.22604 6.77669 8.48475 5.65784 11.0022Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={popperVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 2.6 / 24, originY: 21.4 / 24 }}
          />
          <motion.path
            d="M6.50085 10.5L13.5009 17.5M4.50085 15.5L8.50085 19.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={popperVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 2.6 / 24, originY: 21.4 / 24 }}
          />
          <motion.path
            d="M16.0009 8L19.0009 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21.8759 6H21.7509M22.0009 6C22.0009 6.13807 21.8889 6.25 21.7509 6.25C21.6128 6.25 21.5009 6.13807 21.5009 6C21.5009 5.86193 21.6128 5.75 21.7509 5.75C21.8889 5.75 22.0009 5.86193 22.0009 6Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20.8759 13.25H20.7509M21.0009 13.25C21.0009 13.3881 20.8889 13.5 20.7509 13.5C20.6128 13.5 20.5009 13.3881 20.5009 13.25C20.5009 13.1119 20.6128 13 20.7509 13C20.8889 13 21.0009 13.1119 21.0009 13.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.1259 2.25H18.0009M18.2509 2.25C18.2509 2.38807 18.1389 2.5 18.0009 2.5C17.8628 2.5 17.7509 2.38807 17.7509 2.25C17.7509 2.11193 17.8628 2 18.0009 2C18.1389 2 18.2509 2.11193 18.2509 2.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={3}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M11.1259 3.25H11.0009M11.2509 3.25C11.2509 3.38807 11.1389 3.5 11.0009 3.5C10.8628 3.5 10.7509 3.38807 10.7509 3.25C10.7509 3.11193 10.8628 3 11.0009 3C11.1389 3 11.2509 3.11193 11.2509 3.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={4}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.1981 2C14.5972 2.66667 14.9165 4.4 13.0009 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={5}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22.0009 9.80274C21.3342 9.40365 19.6009 9.08438 18.0009 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={confettiVariants}
            custom={6}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

PartyIcon.displayName = 'PartyIcon';

export { PartyIcon };
