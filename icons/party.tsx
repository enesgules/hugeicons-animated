'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PartyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PartyIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the popper recoils and the existing confetti emerges from inside its cone
const popperVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    translateX: [0, -1, 0.5, 0],
    translateY: [0, 1, -0.5, 0],
    rotate: [0, -6, 2, 0],
    transition: { duration: 0.75, times: [0, 0.25, 0.62, 1], ease: 'easeOut' },
  },
};

const confettiVariants: Variants = {
  normal: { visibility: 'visible', transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
  animate: (i: number) => ({
    visibility: ['hidden', 'visible', 'visible'],
    transform: [
      'translate(-7px, 7px) rotate(0deg) scale(0.2)',
      'translate(' + (0.7 + (i % 2) * 0.7) + 'px, ' + (-1.2 - (i % 3) * 0.45) + 'px) rotate(' + ((i % 2 === 0 ? 1 : -1) * (14 + i * 2)) + 'deg) scale(1.05)',
      'translate(0px, 0px) rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.62, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
  }),
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
            style={{ transformOrigin: '5px 19px' }}
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
            style={{ transformOrigin: '5px 19px' }}
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
