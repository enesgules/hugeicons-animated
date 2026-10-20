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

const NUMBER = /-?\d*\.?\d+/g;

/**
 * The path at position `t` along a row of poses that share the same path
 * commands: `t = 1` is the second pose, `t = 1.5` is halfway to the third.
 * Waves use it to move along their own curvature instead of scaling, so the
 * stroke keeps its width.
 */
export function pathAt(poses: string[], t: number) {
  const i = Math.min(Math.max(Math.floor(t), 0), poses.length - 2);
  const to = poses[i + 1].match(NUMBER) ?? [];
  let k = 0;
  return poses[i].replace(NUMBER, (from) => {
    const value = Number(from) + (Number(to[k++]) - Number(from)) * (t - i);
    return String(Math.round(value * 10000) / 10000);
  });
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
