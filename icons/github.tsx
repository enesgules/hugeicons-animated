'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

/** Imperative controls for the GitHub icon animation. */
export interface GithubIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GithubIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const tailRestPath =
  'M10 20.5675C8.28572 21.1462 6.71429 21.1462 5.35715 20.5556C4.00001 19.965 2.85715 18.7838 2 17';

const tailBaseLeadPath =
  'M10 20.5675C8.35 21.32 6.82 21.48 5.42 20.88C4.02 20.28 2.78 18.92 1.92 17.08';

const tailTipFollowPath =
  'M10 20.5675C8.18 21.24 6.48 21.04 4.86 19.94C3.05 18.7 1.08 16.05 0.36 13.6';

const tailHighSweepPath =
  'M10 20.5675C8.2 21.18 6.34 20.72 4.68 19.26C2.82 17.62 0.48 14.65 0.82 12.55';

const tailCounterLeadPath =
  'M10 20.5675C8.3 21.42 6.58 21.72 5.02 21.28C3.42 20.83 1.58 19.52 0.62 18.35';

const tailTipSettlePath =
  'M10 20.5675C8.28 21.08 6.68 21.02 5.32 20.46C3.95 19.9 2.7 18.5 1.88 16.72';

const tailVariants: Variants = {
  normal: { d: tailRestPath },
  animate: {
    d: [
      tailRestPath,
      tailBaseLeadPath,
      tailTipFollowPath,
      tailHighSweepPath,
      tailCounterLeadPath,
      tailTipSettlePath,
      tailRestPath,
    ],
    transition: {
      duration: 0.92,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.14, 0.34, 0.52, 0.7, 0.86, 1],
    },
  },
};

const githubBodyPath =
  'M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22';

const githubLeftEarRaisedPath = githubBodyPath
  .replaceAll('6.39322 2.02823', '6.12 1.64')
  .replace('7.27042 1.74242', '7.12 1.5');

const githubRightEarRaisedPath = githubBodyPath
  .replaceAll('20.6068 2.02823', '20.88 1.64')
  .replace('19.7296 1.74242', '19.88 1.5');

const githubBothEarsRaisedPath = githubLeftEarRaisedPath
  .replaceAll('20.6068 2.02823', '20.88 1.64')
  .replace('19.7296 1.74242', '19.88 1.5');

const bodyVariants: Variants = {
  normal: { d: githubBodyPath },
  animate: {
    d: [
      githubBodyPath,
      githubLeftEarRaisedPath,
      githubBothEarsRaisedPath,
      githubRightEarRaisedPath,
      githubBothEarsRaisedPath,
      githubBodyPath,
      githubBodyPath,
    ],
    transition: {
      duration: 0.92,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.16, 0.34, 0.54, 0.7, 0.88, 1],
    },
  },
};

const catVariants: Variants = {
  normal: {
    transform: 'none',
    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    transform: [
      'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)',
      'translate3d(0px, 0.1px, 0px) rotate(-0.25deg) scale(1)',
      'translate3d(0.12px, -0.22px, 0px) rotate(0.45deg) scale(1.006)',
      'translate3d(-0.08px, -0.32px, 0px) rotate(-0.4deg) scale(1.008)',
      'translate3d(0.06px, -0.12px, 0px) rotate(0.2deg) scale(1.003)',
      'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: 0.92,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.16, 0.38, 0.6, 0.82, 1],
    },
  },
};

/** Animated GitHub icon with imperative hover controls. */
const GithubIcon = forwardRef<GithubIconHandle, GithubIconProps>(
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
          <motion.g
            variants={catVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.56, originY: 0.54 }}
          >
            <motion.path
              d={tailRestPath}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={tailVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={githubBodyPath}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={bodyVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

GithubIcon.displayName = 'GithubIcon';

export { GithubIcon };
