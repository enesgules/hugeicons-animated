'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';
import { useCallback } from 'react';

const folderPaths = {
  back: 'M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5',
  edge: 'M18.5 11.5V20.2',
  flap: 'M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.1795 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13811 12.1877 4.89924 12.7966 4.42028 14.0144Z',
  arrow: 'M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3',
};

const flapVariants: Record<string, Variants> = {
  sweep: {
    normal: { originX: '3px', originY: '20.8px', rotate: 0, scaleY: 1 },
    animate: {
      originX: '3px',
      originY: '20.8px',
      rotate: [0, 13, 18, 11, 0],
      scaleY: [1, 0.995, 0.985, 0.995, 1],
      transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1], times: [0, 0.3, 0.55, 0.78, 1] },
    },
  },
  ripple: {
    normal: { originX: '3px', originY: '20.8px', rotate: 0, scaleX: 1, scaleY: 1 },
    animate: {
      originX: '3px',
      originY: '20.8px',
      rotate: [0, 8, 17, 14, 0],
      scaleX: [1, 0.99, 1.015, 1.005, 1],
      scaleY: [1, 0.975, 0.95, 0.985, 1],
      transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1], times: [0, 0.2, 0.48, 0.74, 1] },
    },
  },
  glide: {
    normal: { originX: '3px', originY: '20.8px', rotate: 0, scaleY: 1 },
    animate: {
      originX: '3px',
      originY: '20.8px',
      rotate: [0, 6, 15, 8, 0],
      scaleY: [1, 0.99, 0.965, 0.99, 1],
      transition: { duration: 1.2, ease: 'easeInOut', times: [0, 0.24, 0.52, 0.8, 1] },
    },
  },
};

const arrowVariants: Record<string, Variants> = {
  sweep: {
    normal: { originX: '11.5px', originY: '4.5px', rotate: 0 },
    animate: {
      originX: '11.5px',
      originY: '4.5px',
      rotate: [0, 3, 7, 3, 0],
      transition: { duration: 0.9, delay: 0.04, ease: [0.33, 1, 0.68, 1], times: [0, 0.3, 0.55, 0.78, 1] },
    },
  },
  ripple: {
    normal: { originX: '11.5px', originY: '4.5px', rotate: 0 },
    animate: {
      originX: '11.5px',
      originY: '4.5px',
      rotate: [0, 2, 6, 3, 0],
      transition: { duration: 1.05, delay: 0.07, ease: [0.22, 1, 0.36, 1], times: [0, 0.2, 0.48, 0.74, 1] },
    },
  },
  glide: {
    normal: { originX: '11.5px', originY: '4.5px', rotate: 0 },
    animate: {
      originX: '11.5px',
      originY: '4.5px',
      rotate: [0, 1, 5, 2, 0],
      transition: { duration: 1.2, delay: 0.1, ease: 'easeInOut', times: [0, 0.24, 0.52, 0.8, 1] },
    },
  },
};

const edgeVariants: Record<string, Variants> = {
  sweep: {
    normal: { opacity: 0 },
    animate: { opacity: [0, 1, 1, 1, 0], transition: { duration: 0.9, times: [0, 0.12, 0.5, 0.88, 1] } },
  },
  ripple: {
    normal: { opacity: 0 },
    animate: { opacity: [0, 1, 1, 1, 0], transition: { duration: 1.05, times: [0, 0.12, 0.5, 0.88, 1] } },
  },
  glide: {
    normal: { opacity: 0 },
    animate: { opacity: [0, 1, 1, 1, 0], transition: { duration: 1.35, times: [0, 0.12, 0.5, 0.88, 1] } },
  },
};

function usePreviewControls() {
  const controls = useAnimation();
  const reducedMotion = useReducedMotion();
  const play = useCallback(() => {
    if (reducedMotion) return;
    controls.set('normal');
    void controls.start('animate');
  }, [controls, reducedMotion]);

  return { controls, play };
}

function FolderPreview({ name, description }: { name: string; description: string }) {
  const { controls, play } = usePreviewControls();
  const maskId = `folder-front-mask-${name}`;

  return (
    <button
      type="button"
      onClick={play}
      onMouseEnter={play}
      className="flex flex-col items-center gap-5 rounded-3xl border border-[#BFDBFE] bg-[#EFF6FF] px-8 py-10 text-[#1D4ED8] shadow-sm transition hover:shadow-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 24 24" fill="none" overflow="visible" aria-hidden>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="white" />
            <motion.path
              d={folderPaths.flap}
              fill="black"
              stroke="black"
              strokeWidth="2.4"
              variants={flapVariants[name]}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', transformOrigin: '3px 20.8px' }}
            />
          </mask>
        </defs>
        <path d={folderPaths.back} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <motion.path
          d={folderPaths.edge}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          mask={`url(#${maskId})`}
          variants={edgeVariants[name]}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d={folderPaths.flap}
          stroke="currentColor"
          strokeWidth="1.5"
          variants={flapVariants[name]}
          animate={controls}
          initial="normal"
          style={{ transformBox: 'view-box', transformOrigin: '3px 20.8px' }}
        />
        <motion.path
          d={folderPaths.arrow}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          variants={arrowVariants[name]}
          animate={controls}
          initial="normal"
          style={{ transformBox: 'view-box', transformOrigin: '11.5px 4.5px' }}
        />
      </svg>
      <span className="font-mono text-base font-bold">{name}</span>
      <span className="max-w-64 text-center text-sm leading-6 text-[#52688C]">{description}</span>
    </button>
  );
}

export default function FolderAlternatives() {
  return (
    <main className="min-h-screen bg-white px-10 py-16 text-[#141812]">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#2563EB]">Internal review</p>
      <h1 className="mt-3 text-5xl font-bold tracking-[-0.045em]">Folder-open alternatives</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#777C74]">
        Try each option through this temporary proxy preview. The back edge continues only where the moving front flap does not cover it.
      </p>
      <div className="mt-14 grid max-w-6xl grid-cols-3 gap-8">
        <FolderPreview name="sweep" description="A clean, continuous hinge sweep carries the flap through the opening and back." />
        <FolderPreview name="ripple" description="A soft compression travels through the flap before it releases into the close." />
        <FolderPreview name="glide" description="A quiet, slow page glide opens, breathes at the top, and settles closed." />
      </div>
    </main>
  );
}
