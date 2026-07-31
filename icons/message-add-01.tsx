'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MessageAdd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MessageAdd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the conversation rises as a new message action appears
const messageVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.7px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.7)', 'scale(1.13)', 'scale(1)'],
    transition: { duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
  },
};

const MessageAdd01Icon = forwardRef<MessageAdd01IconHandle, MessageAdd01IconProps>(
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <motion.path
            d="M12.5 3.00372C11.6049 2.99039 10.7047 3.01289 9.8294 3.07107C5.64639 3.34913 2.31441 6.72838 2.04024 10.9707C1.98659 11.8009 1.98659 12.6607 2.04024 13.4909C2.1401 15.036 2.82343 16.4666 3.62791 17.6746C4.09501 18.5203 3.78674 19.5758 3.30021 20.4978C2.94941 21.1626 2.77401 21.495 2.91484 21.7351C3.05568 21.9752 3.37026 21.9829 3.99943 21.9982C5.24367 22.0285 6.08268 21.6757 6.74868 21.1846C7.1264 20.9061 7.31527 20.7668 7.44544 20.7508C7.5756 20.7348 7.83177 20.8403 8.34401 21.0513C8.8044 21.2409 9.33896 21.3579 9.8294 21.3905C11.2536 21.4852 12.7435 21.4854 14.1706 21.3905C18.3536 21.1125 21.6856 17.7332 21.9598 13.4909C22.0021 12.836 22.011 12.1627 21.9866 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={messageVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '11px 14px' }}
          />
          <motion.path
            d="M8.5 15H15.5M8.5 10H12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={messageVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M15 5.5H22M18.5 2L18.5 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18.5px 5.5px' }}
          />
        </svg>
      </div>
    );
  }
);

MessageAdd01Icon.displayName = 'MessageAdd01Icon';

export { MessageAdd01Icon };
