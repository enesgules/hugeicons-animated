'use client';

import { useAnimate, useReducedMotion } from 'motion/react';
import type { HTMLAttributes, MouseEventHandler } from 'react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import { cn } from '@/lib/utils';

export interface Search01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Search01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const Search01Icon = forwardRef<Search01IconHandle, Search01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const shouldReduceMotion = useReducedMotion();
    const isControlledRef = useRef(false);
    const isPlayingRef = useRef(false);

    const startAnimation = useCallback(() => {
      if (shouldReduceMotion || isPlayingRef.current) return;

      const target = scope.current?.querySelector<HTMLElement>(
        '[data-search-icon]'
      );
      if (!target) return;

      isPlayingRef.current = true;
      void (async () => {
        await animate(
          target,
          {
            transform: [
              'translate(0px, 0px) rotate(0deg) scale(1)',
              'translate(1.25px, -0.55px) rotate(14deg) scale(0.78)',
              'translate(0.4px, -0.8px) rotate(6deg) scale(0.76)',
              'translate(-0.65px, 0.25px) rotate(-8deg) scale(0.8)',
              'translate(-0.15px, 0.1px) rotate(-2.5deg) scale(1.08)',
              'translate(0px, 0px) rotate(0deg) scale(1)',
            ],
          },
          {
            duration: 1.24,
            times: [0, 0.32, 0.48, 0.64, 0.84, 1],
            ease: [
              [0.77, 0, 0.175, 1],
              'linear',
              'linear',
              [0.77, 0, 0.175, 1],
              [0.23, 1, 0.32, 1],
            ],
          }
        );
        isPlayingRef.current = false;
      })();
    }, [animate, scope, shouldReduceMotion]);

    const stopAnimation = useCallback(() => {}, []);

    useImperativeHandle(
      ref,
      () => {
        isControlledRef.current = true;
        return { startAnimation, stopAnimation };
      },
      [startAnimation, stopAnimation]
    );

    const handleMouseEnter = useCallback<MouseEventHandler<HTMLDivElement>>(
      (event) => {
        onMouseEnter?.(event);
        if (!isControlledRef.current) startAnimation();
      },
      [onMouseEnter, startAnimation]
    );

    const handleMouseLeave = useCallback<MouseEventHandler<HTMLDivElement>>(
      (event) => {
        onMouseLeave?.(event);
      },
      [onMouseLeave]
    );

    return (
      <div
        ref={scope}
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span
          data-search-icon
          style={{ display: 'inline-flex', transformOrigin: '11px 11px' }}
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
              d="M17 17L21 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
      </div>
    );
  }
);

Search01Icon.displayName = 'Search01Icon';

export { Search01Icon };
