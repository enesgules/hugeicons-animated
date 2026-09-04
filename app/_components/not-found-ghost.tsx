'use client';

import { useRef } from 'react';
import { GhostIcon } from '@/icons/ghost';
import type { GhostIconHandle } from '@/icons/ghost';

export function NotFoundGhost() {
  const iconRef = useRef<GhostIconHandle | null>(null);

  const preview = () => iconRef.current?.startAnimation();
  const stopPreview = () => iconRef.current?.stopAnimation();

  return (
    <button
      type="button"
      aria-label="Replay the ghost animation"
      onClick={preview}
      onPointerEnter={preview}
      onPointerLeave={stopPreview}
      onFocus={preview}
      onBlur={stopPreview}
      className="group relative flex size-28 cursor-pointer items-center justify-center rounded-2xl border border-transparent bg-[#F5F5F4] text-[#141812] transition-[background-color,border-color,box-shadow,scale] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_8px_24px_rgba(20,24,18,0.08)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
    >
      <GhostIcon
        ref={iconRef}
        size={54}
        aria-hidden
        className="pointer-events-none text-[#141812]"
      />
    </button>
  );
}
