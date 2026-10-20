'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MailOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailOpenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MAIL_LETTER =
  'M4.99998 12V6C4.99998 4.11438 4.99998 3.17157 5.58577 2.58579C6.17156 2 7.11437 2 8.99998 2H15C16.8856 2 17.8284 2 18.4142 2.58579C19 3.17157 19 4.11438 19 6V12';
const MAIL_LETTER_CLOSED =
  'M4.99998 12V6C4.99998 4.11438 4.99998 3.17157 5.58577 2.58579C6.17156 2 7.11437 2 8.99998 2H15C16.8856 2 17.8284 2 18.4142 2.58579C19 3.17157 19 4.11438 19 6V12H4.99998Z';
const MAIL_TEXT = 'M10 10H14M10 6H14';

const MAIL_DURATION = 0.92;
const MAIL_TIMES = [0, 0.08, 0.16, 0.26, 0.38, 0.5, 0.62, 0.72, 0.82, 0.9, 0.96, 1];

const bodyVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0.12px) scaleX(1.006) scaleY(0.994)',
      'translateY(0.28px) scaleX(1.018) scaleY(0.982)',
      'translateY(0.5px) scaleX(1.035) scaleY(0.958)',
      'translateY(0.2px) scaleX(1.014) scaleY(0.986)',
      'translateY(-0.36px) scaleX(0.985) scaleY(1.022)',
      'translateY(0.14px) scaleX(1.008) scaleY(0.994)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: MAIL_DURATION,
      ease: 'linear',
      times: MAIL_TIMES,
    },
  },
};

// The current letter keeps its full visibility as it clears the top edge.
const outgoingLetterVariants: Variants = {
  normal: {
    transform: 'translateY(0px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(-0.8px)',
      'translateY(-2.4px)',
      'translateY(-5.5px)',
      'translateY(-9.5px)',
      'translateY(-14px)',
      'translateY(-18px)',
      'translateY(-18px)',
      'translateY(-18px)',
      'translateY(-18px)',
      'translateY(-18px)',
      'translateY(-18px)',
    ],
    transition: {
      duration: MAIL_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: MAIL_TIMES,
    },
  },
};

// A replacement follows from below, passes behind the envelope lip, and settles.
const incomingLetterVariants: Variants = {
  normal: {
    transform: 'translateY(13px)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translateY(13px)',
      'translateY(12px)',
      'translateY(10px)',
      'translateY(7px)',
      'translateY(3.5px)',
      'translateY(0.5px)',
      'translateY(-0.3px)',
      'translateY(-0.35px)',
      'translateY(0.15px)',
      'translateY(0px)',
      'translateY(0px)',
      'translateY(0px)',
    ],
    transition: {
      duration: MAIL_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: MAIL_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0, delay: 0.18 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// Once the source clears the lip, it hands off to a complete document outline.
const outgoingSourceVariants: Variants = {
  normal: { visibility: 'visible', transition: { duration: 0, delay: 0.18 } },
  animate: { visibility: 'hidden', transition: { duration: 0, delay: 0.15 } },
};

const outgoingClosedVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0, delay: 0.15 } },
};

const MailOpenIcon = forwardRef<MailOpenIconHandle, MailOpenIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const letterWindowId = useId();
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
            <clipPath id={letterWindowId} clipPathUnits="userSpaceOnUse">
              <path d="M0 0H24V10L12 15.5014L0 10V0Z" />
            </clipPath>
          </defs>
          <motion.path
            d="M5.00035 7L3.78154 7.81253C2.90783 8.39501 2.47097 8.68625 2.23422 9.13041C1.99747 9.57457 1.99923 10.0966 2.00273 11.1406C2.00696 12.3975 2.01864 13.6782 2.05099 14.9741C2.12773 18.0487 2.16611 19.586 3.29651 20.7164C4.42691 21.8469 5.98497 21.8858 9.10108 21.9637C11.0397 22.0121 12.9611 22.0121 14.8996 21.9637C18.0158 21.8858 19.5738 21.8469 20.7042 20.7164C21.8346 19.586 21.873 18.0487 21.9497 14.9741C21.9821 13.6782 21.9937 12.3975 21.998 11.1406C22.0015 10.0966 22.0032 9.57456 21.7665 9.13041C21.5297 8.68625 21.0929 8.39501 20.2191 7.81253L19.0003 7"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 15px' }}
          />
          <motion.g
            clipPath={`url(#${letterWindowId})`}
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.g
              variants={incomingLetterVariants}
              animate={controls}
              initial="normal"
            >
              <path d={MAIL_LETTER} stroke="currentColor" strokeWidth="1.5" />
              <path
                d={MAIL_TEXT}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </motion.g>
          </motion.g>
          <motion.g
            clipPath={`url(#${letterWindowId})`}
            variants={outgoingLetterVariants}
            animate={controls}
            initial="normal"
          >
            <motion.g
              variants={outgoingSourceVariants}
              animate={controls}
              initial="normal"
            >
              <path d={MAIL_LETTER} stroke="currentColor" strokeWidth="1.5" />
              <path
                d={MAIL_TEXT}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </motion.g>
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.g
                variants={outgoingClosedVariants}
                animate={controls}
                initial="normal"
              >
                <path
                  d={MAIL_LETTER_CLOSED}
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d={MAIL_TEXT}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </motion.g>
            </motion.g>
          </motion.g>
          <motion.path
            d="M2 10L8.91302 14.1478C10.417 15.0502 11.169 15.5014 12 15.5014C12.831 15.5014 13.583 15.0502 15.087 14.1478L22 10"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 15px' }}
          />
        </svg>
      </div>
    );
  }
);

MailOpenIcon.displayName = 'MailOpenIcon';

export { MailOpenIcon };
