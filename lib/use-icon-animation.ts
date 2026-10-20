'use client';

import type { LegacyAnimationControls } from 'motion/react';
import { spring, useReducedMotion } from 'motion/react';
import type {
  ForwardedRef,
  MouseEventHandler,
} from 'react';
import { useCallback, useImperativeHandle, useRef } from 'react';

/**
 * A damped spring as the easing of one keyframe segment: the value overshoots
 * its target and settles on it. Use it for landings so every icon shares the
 * same physical bounce. Higher `bounce` gives more oscillation.
 */
export function springEase(bounce = 0.45, visualDuration = 0.35) {
  const generator = spring({ keyframes: [0, 1], bounce, visualDuration });
  let settle = 0;
  while (!generator.next(settle).done && settle < 5000) settle += 10;
  return (progress: number) =>
    progress >= 1 ? 1 : generator.next(progress * settle).value;
}

/**
 * One wave of a looping wave train, like sound leaving a speaker. The wave
 * fades in at the first pose, moves through each pose at an even pace, fades
 * out at the last, and returns hidden to the first. Give each wave the pose it
 * rests on; waves on neighbouring poses then move as one train. All poses must
 * share the same path commands.
 */
export function waveTrain(poses: string[], rest: number, duration: number) {
  const last = poses.length - 1;
  const steps = [];
  for (let pose = rest; pose <= last; pose++) steps.push(pose);
  for (let pose = 0; rest > 0 && pose <= rest; pose++) steps.push(pose);
  return {
    d: steps.map((pose) => poses[pose]),
    opacity: steps.map((pose) => (pose === 0 || pose === last ? 0 : 1)),
    transition: {
      duration,
      ease: 'linear' as const,
      // The return from the last pose to the first is a hidden jump.
      times: steps.map((_, k) => {
        if (k <= last - rest) return k / last;
        return (k - 1) / last + (k === last - rest + 1 ? 0.001 : 0);
      }),
      repeat: Infinity,
    },
  };
}

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
