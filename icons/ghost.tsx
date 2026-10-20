'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface GhostIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GhostIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GHOST_BODY =
  'M12 2C8.20498 2 5.12851 5.13401 5.12851 9V10C2.9875 10 1.91699 10 1.63289 10.4961C1.55535 10.6315 1.51014 10.7836 1.50092 10.9401C1.46717 11.5135 2.35788 12.1184 4.13931 13.3282L4.79658 13.7746C5.00395 13.9154 5.12851 14.1525 5.12851 14.4064C5.12851 18.6002 8.46587 22 12.5827 22H19.7129C19.8323 22 19.892 22 19.9307 21.9969C20.6674 21.9374 21.0779 21.1012 20.6825 20.4651C20.6617 20.4317 20.6259 20.383 20.5543 20.2857C20.4436 20.1354 20.3879 20.0597 20.3355 19.985C19.4192 18.6789 18.9098 17.1221 18.8736 15.5172C18.8715 15.4253 18.8715 15.3311 18.8715 15.1429V14.6686C18.8715 14.5388 18.8715 14.4739 18.8788 14.413C18.9087 14.1661 19.0278 13.9394 19.2129 13.7771C19.2585 13.7372 19.3115 13.7011 19.4176 13.6291L19.8607 13.3282C21.6421 12.1184 22.5328 11.5135 22.4991 10.9401C22.4899 10.7836 22.4447 10.6315 22.3671 10.4961C22.083 10 21.0125 10 18.8715 10V9C18.8715 5.13401 15.795 2 12 2Z';

const BOO_TIMES = [0, 0.18, 0.38, 0.55, 0.72, 0.86, 1];

// "Boo!": the ghost shrinks down to gather itself, then swells toward you with
// both arms thrown up and eyes wide, and drifts back down as the arms fall
const svgVariants: Variants = {
  normal: { transform: 'translateY(0%) scale(1)' },
  animate: {
    transform: [
      'translateY(0%) scale(1)',
      'translateY(3%) scale(0.92)',
      'translateY(-6%) scale(1.12)',
      'translateY(-5%) scale(1.09)',
      'translateY(-2%) scale(1.02)',
      'translateY(1%) scale(0.99)',
      'translateY(0%) scale(1)',
    ],
    transition: { duration: 1.2, ease: 'easeInOut', times: BOO_TIMES },
  },
};

// The arm tips rotate about each shoulder; the rest of the outline is unchanged.
const bodyVariants: Variants = {
  normal: { d: GHOST_BODY },
  animate: {
    d: [
      GHOST_BODY,
      'M12 2C8.20498 2 5.12851 5.13401 5.12851 9V10C2.8594 10.1551 1.7360 10.3463 1.5053 10.8693C1.4423 11.0121 1.4133 11.1681 1.4205 11.3247C1.4468 11.8985 2.3898 12.3728 4.1827 13.3573L4.8099 13.7769C5.00395 13.9154 5.12851 14.1525 5.12851 14.4064C5.12851 18.6002 8.46587 22 12.5827 22H19.7129C19.8323 22 19.892 22 19.9307 21.9969C20.6674 21.9374 21.0779 21.1012 20.6825 20.4651C20.6617 20.4317 20.6259 20.383 20.5543 20.2857C20.4436 20.1354 20.3879 20.0597 20.3355 19.985C19.4192 18.6789 18.9098 17.1221 18.8736 15.5172C18.8715 15.4253 18.8715 15.3311 18.8715 15.1429V14.6686C18.8715 14.5388 18.8715 14.4739 18.8788 14.413C18.9087 14.1661 19.0258 13.9396 19.1989 13.7796C19.2419 13.7406 19.2919 13.7058 19.3923 13.6369L19.8174 13.3573C21.6102 12.3728 22.5531 11.8985 22.5796 11.3247C22.5868 11.1681 22.5577 11.0121 22.4947 10.8693C22.2640 10.3463 21.1406 10.1551 18.8715 10V9C18.8715 5.13401 15.795 2 12 2Z',
      'M12 2C8.20498 2 5.12851 5.13401 5.12851 9V10C4.0759 9.2375 3.8900 8.3792 3.3535 8.5767C3.2070 8.6305 3.0746 8.7180 2.9670 8.8319C2.5725 9.2495 2.7396 10.4793 3.8750 13.1025L4.7082 13.7567C5.00395 13.9154 5.12851 14.1525 5.12851 14.4064C5.12851 18.6002 8.46587 22 12.5827 22H19.7129C19.8323 22 19.892 22 19.9307 21.9969C20.6674 21.9374 21.0779 21.1012 20.6825 20.4651C20.6617 20.4317 20.6259 20.383 20.5543 20.2857C20.4436 20.1354 20.3879 20.0597 20.3355 19.985C19.4192 18.6789 18.9098 17.1221 18.8736 15.5172C18.8715 15.4253 18.8715 15.3311 18.8715 15.1429V14.6686C18.8715 14.5388 18.8715 14.4739 18.8788 14.413C18.9087 14.1661 19.0410 13.9383 19.3054 13.7578C19.3682 13.7105 19.4408 13.6644 19.5828 13.5678L20.1250 13.1025C21.2604 10.4794 21.4274 9.2495 21.0330 8.8319C20.9254 8.7180 20.7930 8.6305 20.6465 8.5767C20.1100 8.3792 19.9241 9.2375 18.8715 10V9C18.8715 5.13401 15.795 2 12 2Z',
      'M12 2C8.20498 2 5.12851 5.13401 5.12851 9V10C3.8314 9.3477 3.4121 8.5861 2.9082 8.8562C2.7707 8.9300 2.6518 9.0350 2.5610 9.1628C2.2286 9.6312 2.5834 10.7833 3.9241 13.1518L4.7258 13.7606C5.00395 13.9154 5.12851 14.1525 5.12851 14.4064C5.12851 18.6002 8.46587 22 12.5827 22H19.7129C19.8323 22 19.892 22 19.9307 21.9969C20.6674 21.9374 21.0779 21.1012 20.6825 20.4651C20.6617 20.4317 20.6259 20.383 20.5543 20.2857C20.4436 20.1354 20.3879 20.0597 20.3355 19.985C19.4192 18.6789 18.9098 17.1221 18.8736 15.5172C18.8715 15.4253 18.8715 15.3311 18.8715 15.1429V14.6686C18.8715 14.5388 18.8715 14.4739 18.8788 14.413C18.9087 14.1661 19.0384 13.9386 19.2870 13.7620C19.3464 13.7164 19.4151 13.6725 19.5502 13.5813L20.0759 13.1518C21.4166 10.7833 21.7714 9.6312 21.4390 9.1628C21.3482 9.0350 21.2293 8.9299 21.0918 8.8562C20.5879 8.5861 20.1686 9.3477 18.8715 10V9C18.8715 5.13401 15.795 2 12 2Z',
      'M12 2C8.20498 2 5.12851 5.13401 5.12851 9V10C3.2747 9.7187 2.3822 9.3735 2.0012 9.7997C1.8972 9.9160 1.8214 10.0554 1.7798 10.2065C1.6276 10.7604 2.3648 11.6063 4.0553 13.2661L4.7700 13.7697C5.00395 13.9154 5.12851 14.1525 5.12851 14.4064C5.12851 18.6002 8.46587 22 12.5827 22H19.7129C19.8323 22 19.892 22 19.9307 21.9969C20.6674 21.9374 21.0779 21.1012 20.6825 20.4651C20.6617 20.4317 20.6259 20.383 20.5543 20.2857C20.4436 20.1354 20.3879 20.0597 20.3355 19.985C19.4192 18.6789 18.9098 17.1221 18.8736 15.5172C18.8715 15.4253 18.8715 15.3311 18.8715 15.1429V14.6686C18.8715 14.5388 18.8715 14.4739 18.8788 14.413C18.9087 14.1661 19.0318 13.9391 19.2408 13.7718C19.2916 13.7299 19.3506 13.6911 19.4678 13.6124L19.9447 13.2661C21.6351 11.6063 22.3724 10.7604 22.2202 10.2065C22.1787 10.0554 22.1028 9.9160 21.9988 9.7997C21.6178 9.3735 20.7253 9.7187 18.8715 10V9C18.8715 5.13401 15.795 2 12 2Z',
      GHOST_BODY,
      GHOST_BODY,
    ],
    transition: { duration: 1.2, ease: 'easeInOut', times: BOO_TIMES },
  },
};

const eyeVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.8)', 'scale(1.9)', 'scale(1.7)', 'scale(1.2)', 'scale(1)', 'scale(1)'],
    transition: { duration: 1.2, ease: 'easeInOut', times: BOO_TIMES },
  },
};

const GhostIcon = forwardRef<GhostIconHandle, GhostIconProps>(
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
          style={{ transformBox: 'fill-box' }}
        >
          <motion.path
            d={GHOST_BODY}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bodyVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15 10.125V10.25M15.25 10.25C15.25 10.3881 15.1381 10.5 15 10.5C14.8619 10.5 14.75 10.3881 14.75 10.25C14.75 10.1119 14.8619 10 15 10C15.1381 10 15.25 10.1119 15.25 10.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M9 10.125V10.25M9.25 10.25C9.25 10.3881 9.13807 10.5 9 10.5C8.86193 10.5 8.75 10.3881 8.75 10.25C8.75 10.1119 8.86193 10 9 10C9.13807 10 9.25 10.1119 9.25 10.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

GhostIcon.displayName = 'GhostIcon';

export { GhostIcon };
