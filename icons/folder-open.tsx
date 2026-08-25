'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FolderOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderOpenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the front flap lifts from its bottom edge, revealing the contents before closing
const folderFlapVariants: Variants = {
  normal: {
    originX: '50%',
    originY: '100%',
    transform: 'translate(0px, 0px) rotate(0deg) scaleY(1)',
  },
  animate: {
    originX: '50%',
    originY: '100%',
    transform: [
      'translate(0px, 0px) rotate(0deg) scaleY(1)',
      'translate(0px, 0.35px) rotate(-1deg) scaleY(0.94)',
      'translate(0px, 1.35px) rotate(-2.5deg) scaleY(0.8)',
      'translate(0px, 1.35px) rotate(-2.5deg) scaleY(0.8)',
      'translate(0px, 0.35px) rotate(-1deg) scaleY(0.94)',
      'translate(0px, 0px) rotate(0deg) scaleY(1)',
    ],
    transition: {
      duration: 0.82,
      ease: [0.65, 0, 0.35, 1],
      times: [0, 0.16, 0.38, 0.56, 0.82, 1],
    },
  },
};

const paperRiseVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(-0.25px)',
      'translateY(-1.25px)',
      'translateY(-1.25px)',
      'translateY(-0.25px)',
      'translateY(0px)',
    ],
    transition: {
      duration: 0.82,
      ease: [0.65, 0, 0.35, 1],
      times: [0, 0.16, 0.38, 0.56, 0.82, 1],
    },
  },
};

const FolderOpenIcon = forwardRef<FolderOpenIconHandle, FolderOpenIconProps>(
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
          <path
            d="M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={folderFlapVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          />
          <motion.path
            d="M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={paperRiseVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

FolderOpenIcon.displayName = 'FolderOpenIcon';

export { FolderOpenIcon };
