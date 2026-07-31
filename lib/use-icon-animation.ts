'use client';

import type { LegacyAnimationControls } from 'motion/react';
import { useReducedMotion } from 'motion/react';
import type {
  ForwardedRef,
  MouseEventHandler,
} from 'react';
import { useCallback, useImperativeHandle, useRef } from 'react';

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface UseIconAnimationOptions {
  controls: LegacyAnimationControls;
  loops?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  ref: ForwardedRef<AnimatedIconHandle>;
}

export function useIconAnimation({
  controls,
  loops = false,
  onMouseEnter,
  onMouseLeave,
  ref,
}: UseIconAnimationOptions) {
  const shouldReduceMotion = useReducedMotion();
  const isControlledRef = useRef(false);
  const isPlayingRef = useRef(false);
  const runRef = useRef(0);

  const startAnimation = useCallback(() => {
    if (shouldReduceMotion || isPlayingRef.current) return;

    isPlayingRef.current = true;
    const run = ++runRef.current;
    controls.set('normal');
    void controls.start('animate').then(() => {
      if (runRef.current === run) isPlayingRef.current = false;
    });
  }, [controls, shouldReduceMotion]);

  const stopAnimation = useCallback(() => {
    if (!loops) return;

    runRef.current++;
    isPlayingRef.current = false;
    void controls.start('normal');
  }, [controls, loops]);

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
      if (!isControlledRef.current) stopAnimation();
    },
    [onMouseLeave, stopAnimation]
  );

  return { handleMouseEnter, handleMouseLeave };
}
