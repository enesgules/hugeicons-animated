'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AttachmentIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AttachmentIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the paperclip hangs from its top bend and swings there like a decaying pendulum
const clipVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 14, -10, 6, -3, 1, 0],
    transition: {
      duration: 0.95,
      ease: 'easeInOut',
      times: [0, 0.18, 0.38, 0.56, 0.72, 0.87, 1],
    },
  },
};

const AttachmentIcon = forwardRef<AttachmentIconHandle, AttachmentIconProps>(
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
            d="M19.5 12.0001V13.5001C19.5 17.6422 16.1421 21.0001 12 21.0001C7.85786 21.0001 4.5 17.6422 4.5 13.5001V8C4.5 5.23858 6.73858 3 9.5 3C12.2614 3 14.5 5.23858 14.5 8V13.5C14.5 14.8807 13.3807 16 12 16C10.6193 16 9.5 14.8807 9.5 13.5V9.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={clipVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 9.5 / 24, originY: 3 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

AttachmentIcon.displayName = 'AttachmentIcon';

export { AttachmentIcon };
