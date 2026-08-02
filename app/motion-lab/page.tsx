'use client';

import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

type VariantId = 'A' | 'B' | 'C';
type IconName =
  | 'alert-circle'
  | 'archive-02'
  | 'battery-charging-01'
  | 'bluetooth'
  | 'bug-01'
  | 'bulb';

interface MotionOption {
  id: VariantId;
  title: string;
  description: string;
}

interface IconDefinition {
  name: IconName;
  options: readonly MotionOption[];
}

const ICONS: readonly IconDefinition[] = [
  {
    name: 'alert-circle',
    options: [
      { id: 'A', title: 'Signal', description: 'Ring pulse with a sharp exclamation pop' },
      { id: 'B', title: 'Wobble', description: 'A quick warning shake that settles cleanly' },
      { id: 'C', title: 'Impact', description: 'Squash, rebound, then a firm center hit' },
    ],
  },
  {
    name: 'archive-02',
    options: [
      { id: 'A', title: 'Compress', description: 'The stack packs down and the handle clicks' },
      { id: 'B', title: 'Open', description: 'The drawer separates with five outward motion strokes' },
      { id: 'C', title: 'Settle', description: 'A weighted wobble from the bottom edge' },
    ],
  },
  {
    name: 'battery-charging-01',
    options: [
      { id: 'A', title: 'Surge', description: 'A bold bolt pulse with terminal sparks' },
      { id: 'B', title: 'Charge up', description: 'A clean energy fill sweeps across the battery' },
      { id: 'C', title: 'Jolt', description: 'The whole battery kicks when power lands' },
    ],
  },
  {
    name: 'bluetooth',
    options: [
      { id: 'A', title: 'Broadcast', description: 'Two visible signal rings travel outward' },
      { id: 'B', title: 'Resolve', description: 'The mark snaps into place from a twist' },
      { id: 'C', title: 'Connect', description: 'The side nodes squeeze in, then answer out' },
    ],
  },
  {
    name: 'bug-01',
    options: [
      { id: 'A', title: 'Scuttle', description: 'Fast sideways steps with active antennae' },
      { id: 'B', title: 'Hop', description: 'A playful squash, stretch, and landing' },
      { id: 'C', title: 'Startle', description: 'Antennae flare as the body recoils' },
    ],
  },
  {
    name: 'bulb',
    options: [
      { id: 'A', title: 'Burst', description: 'The idea lands and the rays fire outward' },
      { id: 'B', title: 'Idea pop', description: 'A bulb pop with seven long, radiating strokes' },
      { id: 'C', title: 'Flicker', description: 'The filament catches through a lively wobble' },
    ],
  },
];

const INITIAL_CHOICES: Record<IconName, VariantId | null> = {
  'alert-circle': null,
  'archive-02': null,
  'battery-charging-01': null,
  bluetooth: null,
  'bug-01': null,
  bulb: null,
};

const alertRingVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'scale(1)' },
    animate: {
      transform: ['scale(1)', 'scale(0.92)', 'scale(1.09)', 'scale(1)'],
      transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'rotate(0deg) scale(1)' },
    animate: {
      transform: [
        'rotate(0deg) scale(1)',
        'rotate(-8deg) scale(1.03)',
        'rotate(7deg) scale(1.03)',
        'rotate(-4deg) scale(1.01)',
        'rotate(2deg) scale(1)',
        'rotate(0deg) scale(1)',
      ],
      transition: { duration: 0.68, ease: 'easeInOut' },
    },
  },
  C: {
    normal: { transform: 'scaleX(1) scaleY(1)' },
    animate: {
      transform: [
        'scaleX(1) scaleY(1)',
        'scaleX(1.09) scaleY(0.91)',
        'scaleX(0.96) scaleY(1.08)',
        'scaleX(1) scaleY(1)',
      ],
      transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const alertStemVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'translateY(0px)' },
    animate: {
      transform: ['translateY(0px)', 'translateY(-2.4px)', 'translateY(0.7px)', 'translateY(0px)'],
      transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateX(0px)' },
    animate: {
      transform: ['translateX(0px)', 'translateX(-1.1px)', 'translateX(1.1px)', 'translateX(0px)'],
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  },
  C: {
    normal: { transform: 'translateY(0px) scaleY(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleY(1)',
        'translateY(2px) scaleY(0.72)',
        'translateY(-1px) scaleY(1.18)',
        'translateY(0px) scaleY(1)',
      ],
      transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const alertDotVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'scale(1)' },
    animate: {
      transform: ['scale(1)', 'scale(0.45)', 'scale(1.55)', 'scale(1)'],
      transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateX(0px)' },
    animate: {
      transform: ['translateX(0px)', 'translateX(1.3px)', 'translateX(-1px)', 'translateX(0px)'],
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  },
  C: {
    normal: { transform: 'translateY(0px) scale(1)' },
    animate: {
      transform: [
        'translateY(0px) scale(1)',
        'translateY(1.5px) scale(0.55)',
        'translateY(-0.8px) scale(1.5)',
        'translateY(0px) scale(1)',
      ],
      transition: { duration: 0.58, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const archiveLayerVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'translateY(0px)' },
    animate: (index: number) => ({
      transform: [
        'translateY(0px)',
        `translateY(${3 - index * 0.85}px)`,
        'translateY(-0.5px)',
        'translateY(0px)',
      ],
      transition: { duration: 0.68, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] },
    }),
  },
  B: {
    normal: { transform: 'translateY(0px)' },
    animate: (index: number) => ({
      transform: [
        'translateY(0px)',
        `translateY(${-3.2 - index * 1.7}px)`,
        `translateY(${-3.2 - index * 1.7}px)`,
        'translateY(0px)',
      ],
      transition: {
        duration: 0.86,
        delay: index * 0.05,
        ease: [0.77, 0, 0.175, 1],
        times: [0, 0.36, 0.62, 1],
      },
    }),
  },
  C: {
    normal: { transform: 'rotate(0deg) translateY(0px)' },
    animate: (index: number) => ({
      transform: [
        'rotate(0deg) translateY(0px)',
        `rotate(${index === 0 ? -5 : 5}deg) translateY(1px)`,
        `rotate(${index === 0 ? 3 : -3}deg) translateY(-0.4px)`,
        'rotate(0deg) translateY(0px)',
      ],
      transition: { duration: 0.72, delay: index * 0.05, ease: 'easeInOut' },
    }),
  },
};

const archiveDrawerVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleX(1) scaleY(1)',
        'translateY(1.8px) scaleX(1.08) scaleY(0.94)',
        'translateY(-0.6px) scaleX(0.98) scaleY(1.03)',
        'translateY(0px) scaleX(1) scaleY(1)',
      ],
      transition: { duration: 0.72, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateY(0px) scaleX(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleX(1)',
        'translateY(3.6px) scaleX(1.05)',
        'translateY(3.6px) scaleX(1.05)',
        'translateY(0px) scaleX(1)',
      ],
      transition: {
        duration: 0.86,
        ease: [0.77, 0, 0.175, 1],
        times: [0, 0.36, 0.62, 1],
      },
    },
  },
  C: {
    normal: { transform: 'rotate(0deg)' },
    animate: {
      transform: ['rotate(0deg)', 'rotate(-4deg)', 'rotate(3deg)', 'rotate(-1deg)', 'rotate(0deg)'],
      transition: { duration: 0.72, ease: 'easeInOut' },
    },
  },
};

const archiveHandleVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'scale(1)' },
    animate: {
      transform: ['scale(1)', 'scale(0.5)', 'scale(1.4)', 'scale(1)'],
      transition: { duration: 0.52, delay: 0.16, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateY(0px) scaleX(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleX(1)',
        'translateY(3.6px) scaleX(0.82)',
        'translateY(3.6px) scaleX(1.12)',
        'translateY(0px) scaleX(1)',
      ],
      transition: {
        duration: 0.86,
        ease: [0.77, 0, 0.175, 1],
        times: [0, 0.36, 0.62, 1],
      },
    },
  },
  C: {
    normal: { transform: 'scaleX(1)' },
    animate: {
      transform: ['scaleX(1)', 'scaleX(0.65)', 'scaleX(1.28)', 'scaleX(1)'],
      transition: { duration: 0.52, delay: 0.18, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const archiveOpenLineVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 0 },
    animate: { opacity: 0 },
  },
  B: {
    normal: { opacity: 0, transform: 'translate(0px, 0px)' },
    animate: (index: number) => {
      const startTransform = index === 3
        ? 'translate(1.5px, 0px)'
        : index === 4
          ? 'translate(-1.5px, 0px)'
          : 'translate(0px, 1.5px)';
      const outwardTransform = index === 3
        ? 'translate(-1px, 0px)'
        : index === 4
          ? 'translate(1px, 0px)'
          : 'translate(0px, -1px)';

      return {
        opacity: [0, 1, 0.85, 0],
        transform: [startTransform, outwardTransform, outwardTransform, 'translate(0px, 0px)'],
        transition: {
          duration: 0.56,
          delay: 0.08 + index * 0.035,
          ease: [0.23, 1, 0.32, 1],
          times: [0, 0.28, 0.62, 1],
        },
      };
    },
  },
  C: {
    normal: { opacity: 0 },
    animate: { opacity: 0 },
  },
};

const batteryBodyVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'scaleX(1)' },
    animate: {
      transform: ['scaleX(1)', 'scaleX(1.04)', 'scaleX(0.99)', 'scaleX(1)'],
      transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateY(0px) scaleY(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleY(1)',
        'translateY(0.8px) scaleY(0.94)',
        'translateY(-0.5px) scaleY(1.04)',
        'translateY(0px) scaleY(1)',
      ],
      transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1] },
    },
  },
  C: {
    normal: { transform: 'rotate(0deg)' },
    animate: {
      transform: ['rotate(0deg)', 'rotate(-6deg)', 'rotate(5deg)', 'rotate(-2deg)', 'rotate(0deg)'],
      transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const batteryBoltVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 1, transform: 'scale(1)' },
    animate: {
      opacity: [1, 0.45, 1],
      transform: ['scale(1)', 'scale(1.48)', 'scale(0.88)', 'scale(1)'],
      transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    animate: {
      opacity: [0.4, 1, 1, 1],
      transform: [
        'translateY(2.4px) scale(0.76)',
        'translateY(0px) scale(1.35)',
        'translateY(0px) scale(1.35)',
        'translateY(0px) scale(1)',
      ],
      transition: {
        duration: 0.82,
        ease: [0.23, 1, 0.32, 1],
        times: [0, 0.56, 0.74, 1],
      },
    },
  },
  C: {
    normal: { transform: 'rotate(0deg) scale(1)' },
    animate: {
      transform: ['rotate(0deg) scale(1)', 'rotate(-9deg) scale(1.32)', 'rotate(5deg) scale(0.94)', 'rotate(0deg) scale(1)'],
      transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const batterySparkVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 0, transform: 'translateY(2px) scale(0.5)' },
    animate: (index: number) => ({
      opacity: [0, 1, 0],
      transform: ['translateY(2px) scale(0.5)', 'translateY(-1px) scale(1.2)', 'translateY(-3px) scale(0.8)'],
      transition: { duration: 0.65, delay: 0.08 + index * 0.12, ease: 'easeOut' },
    }),
  },
  B: {
    normal: { opacity: 0 },
    animate: { opacity: 0 },
  },
  C: {
    normal: { opacity: 0, transform: 'scale(0.6)' },
    animate: (index: number) => ({
      opacity: [0, 1, 0],
      transform: ['scale(0.6)', 'scale(1.45)', 'scale(0.8)'],
      transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' },
    }),
  },
};

const batteryFillVariants: Record<VariantId, Variants> = {
  A: { normal: { opacity: 0 }, animate: { opacity: 0 } },
  B: {
    normal: { opacity: 0, transform: 'scaleX(0.12)' },
    animate: {
      opacity: [0, 0.18, 0.18, 0],
      transform: ['scaleX(0.12)', 'scaleX(1)', 'scaleX(1)', 'scaleX(1)'],
      transition: {
        duration: 0.82,
        ease: [0.23, 1, 0.32, 1],
        times: [0, 0.56, 0.74, 1],
      },
    },
  },
  C: { normal: { opacity: 0 }, animate: { opacity: 0 } },
};

const bluetoothMarkVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'scale(1)' },
    animate: {
      transform: ['scale(1)', 'scale(0.9)', 'scale(1.12)', 'scale(1)'],
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'rotate(0deg) scale(1)' },
    animate: {
      transform: [
        'rotate(0deg) scale(1)',
        'rotate(-11deg) scale(0.88)',
        'rotate(6deg) scale(1.12)',
        'rotate(0deg) scale(1)',
      ],
      transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1] },
    },
  },
  C: {
    normal: { transform: 'scaleX(1) scaleY(1)' },
    animate: {
      transform: [
        'scaleX(1) scaleY(1)',
        'scaleX(0.82) scaleY(1.08)',
        'scaleX(1.1) scaleY(0.96)',
        'scaleX(1) scaleY(1)',
      ],
      transition: { duration: 0.66, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const bluetoothNodeVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 1, transform: 'scale(1)' },
    animate: {
      opacity: [1, 0.25, 1],
      transform: ['scale(1)', 'scale(0.55)', 'scale(1.35)', 'scale(1)'],
      transition: { duration: 0.66, delay: 0.1, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'rotate(0deg)' },
    animate: {
      transform: ['rotate(0deg)', 'rotate(10deg)', 'rotate(-5deg)', 'rotate(0deg)'],
      transition: { duration: 0.62, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
    },
  },
  C: {
    normal: { transform: 'scaleX(1)' },
    animate: {
      transform: ['scaleX(1)', 'scaleX(0.52)', 'scaleX(1.3)', 'scaleX(1)'],
      transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const bluetoothSignalVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 0, transform: 'scale(0.45)' },
    animate: (index: number) => ({
      opacity: [0, 0.72, 0],
      transform: ['scale(0.45)', `scale(${1.18 + index * 0.32})`],
      transition: { duration: 0.72, delay: index * 0.12, ease: 'easeOut' },
    }),
  },
  B: { normal: { opacity: 0 }, animate: { opacity: 0 } },
  C: { normal: { opacity: 0 }, animate: { opacity: 0 } },
};

const bugBodyVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'translateX(0px) rotate(0deg)' },
    animate: {
      transform: [
        'translateX(0px) rotate(0deg)',
        'translateX(2.2px) rotate(2deg)',
        'translateX(-2.2px) rotate(-2deg)',
        'translateX(1.3px) rotate(1deg)',
        'translateX(-1px) rotate(-1deg)',
        'translateX(0px) rotate(0deg)',
      ],
      transition: { duration: 0.72, ease: 'easeInOut' },
    },
  },
  B: {
    normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleX(1) scaleY(1)',
        'translateY(1px) scaleX(1.12) scaleY(0.88)',
        'translateY(-3px) scaleX(0.9) scaleY(1.14)',
        'translateY(0.8px) scaleX(1.08) scaleY(0.93)',
        'translateY(0px) scaleX(1) scaleY(1)',
      ],
      transition: { duration: 0.78, ease: [0.23, 1, 0.32, 1] },
    },
  },
  C: {
    normal: { transform: 'rotate(0deg) scale(1)' },
    animate: {
      transform: [
        'rotate(0deg) scale(1)',
        'rotate(-6deg) scale(0.92)',
        'rotate(5deg) scale(1.1)',
        'rotate(-2deg) scale(0.98)',
        'rotate(0deg) scale(1)',
      ],
      transition: { duration: 0.72, ease: [0.23, 1, 0.32, 1] },
    },
  },
};

const bugAntennaVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'rotate(0deg)' },
    animate: (direction: number) => ({
      transform: [`rotate(0deg)`, `rotate(${direction * 24}deg)`, `rotate(${direction * -10}deg)`, 'rotate(0deg)'],
      transition: { duration: 0.7, ease: 'easeInOut' },
    }),
  },
  B: {
    normal: { transform: 'rotate(0deg)' },
    animate: (direction: number) => ({
      transform: ['rotate(0deg)', `rotate(${direction * 12}deg)`, 'rotate(0deg)'],
      transition: { duration: 0.5, delay: 0.18, ease: [0.23, 1, 0.32, 1] },
    }),
  },
  C: {
    normal: { transform: 'rotate(0deg)' },
    animate: (direction: number) => ({
      transform: [
        'rotate(0deg)',
        `rotate(${direction * 30}deg)`,
        `rotate(${direction * -14}deg)`,
        `rotate(${direction * 8}deg)`,
        'rotate(0deg)',
      ],
      transition: { duration: 0.8, ease: 'easeInOut' },
    }),
  },
};

const bulbBodyVariants: Record<VariantId, Variants> = {
  A: {
    normal: { transform: 'scale(1)' },
    animate: {
      transform: ['scale(1)', 'scale(0.9)', 'scale(1.14)', 'scale(1)'],
      transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
    animate: {
      transform: [
        'translateY(0px) scaleX(1) scaleY(1)',
        'translateY(1.2px) scaleX(1.13) scaleY(0.87)',
        'translateY(-4.2px) scaleX(0.88) scaleY(1.16)',
        'translateY(1px) scaleX(1.09) scaleY(0.92)',
        'translateY(0px) scaleX(1) scaleY(1)',
      ],
      transition: { duration: 0.84, ease: [0.23, 1, 0.32, 1] },
    },
  },
  C: {
    normal: { transform: 'rotate(0deg) scale(1)' },
    animate: {
      transform: [
        'rotate(0deg) scale(1)',
        'rotate(-6deg) scale(0.97)',
        'rotate(5deg) scale(1.06)',
        'rotate(-2deg) scale(1)',
        'rotate(0deg) scale(1)',
      ],
      transition: { duration: 0.75, ease: 'easeInOut' },
    },
  },
};

const bulbFilamentVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 1, transform: 'scale(1)' },
    animate: {
      opacity: [0.3, 1, 1],
      transform: ['scale(0.55)', 'scale(1.35)', 'scale(1)'],
      transition: { duration: 0.55, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
    },
  },
  B: {
    normal: { transform: 'translateY(0px) scale(1)' },
    animate: {
      transform: ['translateY(0px) scale(1)', 'translateY(-2px) scale(1.5)', 'translateY(0.5px) scale(0.92)', 'translateY(0px) scale(1)'],
      transition: { duration: 0.68, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
    },
  },
  C: {
    normal: { opacity: 1, transform: 'scale(1)' },
    animate: {
      opacity: [1, 0.18, 1, 0.35, 1],
      transform: ['scale(1)', 'scale(0.72)', 'scale(1.25)', 'scale(0.86)', 'scale(1)'],
      transition: { duration: 0.78, ease: 'easeInOut' },
    },
  },
};

const bulbRayVariants: Record<VariantId, Variants> = {
  A: {
    normal: { opacity: 0, transform: 'scale(0.35)' },
    animate: (index: number) => ({
      opacity: [0, 1, 0.75, 0],
      transform: ['scale(0.35)', 'scale(1.25)', 'scale(1)', 'scale(0.9)'],
      transition: { duration: 0.68, delay: 0.08 + index * 0.045, ease: 'easeOut' },
    }),
  },
  B: {
    normal: { opacity: 0, transform: 'scale(0.45)' },
    animate: (index: number) => ({
      opacity: [0, 1, 0.7, 0],
      transform: ['scale(0.45)', 'scale(1.25)', 'scale(1)', 'scale(0.9)'],
      transition: { duration: 0.72, delay: 0.1 + index * 0.035, ease: 'easeOut' },
    }),
  },
  C: {
    normal: { opacity: 0, transform: 'scale(0.7)' },
    animate: (index: number) => ({
      opacity: [0, 1, 0.2, 0.9, 0],
      transform: ['scale(0.7)', 'scale(1.1)', 'scale(0.85)', 'scale(1)', 'scale(0.9)'],
      transition: { duration: 0.8, delay: index * 0.035, ease: 'easeInOut' },
    }),
  },
};

const centerTransform: { transformBox: 'view-box'; transformOrigin: string } = {
  transformBox: 'view-box',
  transformOrigin: '12px 12px',
};

function AlertCircleGraphic({ variant }: { variant: VariantId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-14 overflow-visible">
      <motion.g variants={alertRingVariants[variant]} style={centerTransform}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <motion.path d="M12 8V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={alertStemVariants[variant]} style={centerTransform} />
        <motion.path d="M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={alertDotVariants[variant]} style={centerTransform} />
      </motion.g>
    </svg>
  );
}

function ArchiveGraphic({ variant }: { variant: VariantId }) {
  const openLines = [
    'M5.8 2.6L4.2 0.6',
    'M12 0.5V-2',
    'M18.2 2.6L19.8 0.6',
    'M1.2 11H-1.3',
    'M22.8 11H25.3',
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-14 overflow-visible">
      {openLines.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.35"
          variants={archiveOpenLineVariants[variant]}
          custom={index}
          style={centerTransform}
        />
      ))}
      <motion.path d="M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={archiveDrawerVariants[variant]} style={centerTransform} />
      <motion.path d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={archiveLayerVariants[variant]} custom={0} style={centerTransform} />
      <motion.path d="M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={archiveLayerVariants[variant]} custom={1} style={centerTransform} />
      <motion.path d="M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={archiveHandleVariants[variant]} style={centerTransform} />
    </svg>
  );
}

function BatteryGraphic({ variant }: { variant: VariantId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-14 overflow-visible">
      <motion.g variants={batteryBodyVariants[variant]} style={centerTransform}>
        <motion.rect
          x="4"
          y="8"
          width="13"
          height="8"
          rx="2"
          fill="currentColor"
          variants={batteryFillVariants[variant]}
          style={{ transformBox: 'view-box', transformOrigin: '4px 12px' }}
        />
        <path d="M2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H13C15.8284 6 17.2426 6 18.1213 6.87868C19 7.75736 19 9.17157 19 12C19 14.8284 19 16.2426 18.1213 17.1213C17.2426 18 15.8284 18 13 18H8C5.17157 18 3.75736 18 2.87868 17.1213C2 16.2426 2 14.8284 2 12Z" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <motion.path d="M10.8282 9L9.08572 11.1749C8.89899 11.4079 9.03283 11.7433 9.33733 11.8053L11.1627 12.1773C11.4873 12.2434 11.6111 12.6147 11.3842 12.8413L9.22216 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={batteryBoltVariants[variant]} style={centerTransform} />
        <path d="M19 9.5L20.0272 9.6712C20.7085 9.78475 21.0491 9.84152 21.3076 10.0067C21.5618 10.1691 21.7612 10.4044 21.8796 10.6819C22 10.964 22 11.3093 22 12C22 12.6907 22 13.036 21.8796 13.3181C21.7612 13.5956 21.5618 13.8309 21.3076 13.9933C21.0491 14.1585 20.7085 14.2153 20.0272 14.3288L19 14.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </motion.g>
      <motion.path d="M21 6.6V8.4M20.1 7.5H21.9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" variants={batterySparkVariants[variant]} custom={0} style={centerTransform} />
      <motion.path d="M22 15.2V17M21.1 16.1H22.9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.25" variants={batterySparkVariants[variant]} custom={1} style={centerTransform} />
    </svg>
  );
}

function BluetoothGraphic({ variant }: { variant: VariantId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-14 overflow-visible">
      <motion.circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="0.9" variants={bluetoothSignalVariants[variant]} custom={0} style={centerTransform} />
      <motion.circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="0.75" variants={bluetoothSignalVariants[variant]} custom={1} style={centerTransform} />
      <motion.path d="M12.4742 12L16.2428 9.05534C17.3189 8.21451 17.857 7.79409 17.9716 7.24865C18.0144 7.04517 18.0154 6.83493 17.9748 6.63101C17.8657 6.08438 17.332 5.65832 16.2645 4.8062C14.6552 3.52156 13.8505 2.87924 13.1738 3.01878C12.9267 3.06975 12.6962 3.18351 12.504 3.34942C11.9779 3.80362 11.9779 4.84315 11.9779 6.92221V11.6122M12.4742 12L11.9779 12.3877M12.4742 12L16.2428 14.9446C17.319 15.7855 17.857 16.2059 17.9716 16.7513C18.0144 16.9548 18.0155 17.165 17.9748 17.369C17.8658 17.9156 17.332 18.3417 16.2645 19.1938C14.6552 20.4784 13.8505 21.1208 13.1738 20.9812C12.9266 20.9302 12.6962 20.8165 12.504 20.6506C11.9779 20.1964 11.9779 19.1568 11.9779 17.0778V12.3877M12.4742 12L11.9779 11.6122M11.9779 12.3877L6.00452 17.055M11.9779 12.3877V11.6122M11.9779 11.6122L6.00452 6.94494" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={bluetoothMarkVariants[variant]} style={centerTransform} />
      <motion.path d="M5.37952 12H5.25452M18.8795 12H18.7545M5.50452 12C5.50452 12.1381 5.39259 12.25 5.25452 12.25C5.11645 12.25 5.00452 12.1381 5.00452 12C5.00452 11.8619 5.11645 11.75 5.25452 11.75C5.39259 11.75 5.50452 11.8619 5.50452 12ZM19.0045 12C19.0045 12.1381 18.8926 12.25 18.7545 12.25C18.6164 12.25 18.5045 12.1381 18.5045 12C18.5045 11.8619 18.6164 11.75 18.7545 11.75C18.8926 11.75 19.0045 11.8619 19.0045 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={bluetoothNodeVariants[variant]} style={centerTransform} />
    </svg>
  );
}

function BugGraphic({ variant }: { variant: VariantId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-14 overflow-visible">
      <motion.g variants={bugBodyVariants[variant]} style={centerTransform}>
        <motion.path d="M3.01309 4.99084C2.89323 6.05084 3.55249 8.42285 6.48923 8.42285" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" variants={bugAntennaVariants[variant]} custom={-1} style={{ transformBox: 'view-box', transformOrigin: '6.5px 8.4px' }} />
        <motion.path d="M17.5951 8.38081C18.8357 8.57881 21.1132 7.49881 20.9957 5.00281" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" variants={bugAntennaVariants[variant]} custom={1} style={{ transformBox: 'view-box', transformOrigin: '17.6px 8.4px' }} />
        <path d="M20.9928 20.9989C21.0528 19.9429 20.1777 17.5549 17.599 17.4229" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M6.45163 17.4708C5.65013 17.2308 3.01306 18.3348 3.01306 20.9988" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M9.3299 6.11884C9.35388 5.09884 9.84533 2.99884 12.0029 2.99884C13.9208 2.99884 14.5861 4.61884 14.676 6.11884M6.26131 9.41884C6.38118 8.63884 7.29216 6.81484 9.36586 6.63484C11.4635 6.55564 14.3403 6.58684 14.8797 6.67084C15.5869 6.73377 17.2951 7.43884 17.7506 9.41884C17.9124 10.4388 17.8285 11.8788 17.8524 12.7188C17.8165 13.5588 17.9207 15.2623 17.7565 16.1388C17.6367 17.0988 16.9894 18.4668 16.1024 19.3068C14.7838 20.7228 11.1639 22.2108 8.03534 19.4508C6.41713 17.8908 6.30925 16.3788 6.18939 15.7788C6.15725 15.4571 6.15875 13.8763 6.16541 12.3588C6.14144 11.046 6.17235 9.78063 6.26131 9.41884Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.01306 12.8988H5.9498" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M20.9929 12.8988L18.1161 12.8988" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M12.0033 16.4988L12.0033 20.2788" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

function BulbGraphic({ variant }: { variant: VariantId }) {
  const rays = [
    'M12 1.5V-1.3',
    'M6.5 4.3L4.1 1.9',
    'M17.5 4.3L19.9 1.9',
    'M3.5 9.9H0.5',
    'M20.5 9.9H23.5',
    'M4.8 14.8L2.5 17.1',
    'M19.2 14.8L21.5 17.1',
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-14 overflow-visible">
      <motion.g variants={bulbBodyVariants[variant]} style={centerTransform}>
        <path d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <motion.path d="M14 10C13.3875 10.6432 12.7111 11 12 11C11.2889 11 10.6125 10.6432 10 10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" variants={bulbFilamentVariants[variant]} style={centerTransform} />
        <path d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 21.8994 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 15.5V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </motion.g>
      {rays.map((path, index) => (
        <motion.path key={path} d={path} stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" variants={bulbRayVariants[variant]} custom={index} style={centerTransform} />
      ))}
    </svg>
  );
}

function IconGraphic({ name, variant }: { name: IconName; variant: VariantId }) {
  switch (name) {
    case 'alert-circle':
      return <AlertCircleGraphic variant={variant} />;
    case 'archive-02':
      return <ArchiveGraphic variant={variant} />;
    case 'battery-charging-01':
      return <BatteryGraphic variant={variant} />;
    case 'bluetooth':
      return <BluetoothGraphic variant={variant} />;
    case 'bug-01':
      return <BugGraphic variant={variant} />;
    case 'bulb':
      return <BulbGraphic variant={variant} />;
    default: {
      const exhaustive: never = name;
      return exhaustive;
    }
  }
}

export default function MotionLabPage() {
  const [choices, setChoices] = useState(INITIAL_CHOICES);
  const [copied, setCopied] = useState(false);
  const choiceCount = Object.values(choices).filter(Boolean).length;

  const copyChoices = () => {
    const summary = ICONS.flatMap(({ name }) => {
      const choice = choices[name];
      return choice ? [`${name}: ${choice}`] : [];
    }).join('\n');

    void navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <main className="min-h-screen bg-white text-[#141812]">
      <header className="sticky top-0 z-20 border-b border-[#E5E5E3] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="rounded-md text-sm font-bold hover:text-[#4C7A22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C7A22]">
            ← hugeicons animated
          </Link>
          <span className="font-mono text-xs text-[#696D6E]">{choiceCount}/6 picked</span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4C7A22]">Motion lab</p>
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-[-0.035em] sm:text-6xl">Pick the motion that reads.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#696D6E] sm:text-lg">
            Hover or focus a card to replay it. Pick one direction per icon; the production icons stay unchanged until you choose.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {ICONS.map(({ name, options }) => (
            <section key={name} aria-labelledby={`${name}-title`}>
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#E5E5E3] pb-3">
                <h2 id={`${name}-title`} className="font-mono text-sm font-semibold">{name}</h2>
                <span className="text-xs text-[#9DA19B]">Choose A, B, or C</span>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {options.map((option) => {
                  const selected = choices[name] === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      initial="normal"
                      whileHover="animate"
                      whileFocus="animate"
                      whileTap="animate"
                      onClick={() => setChoices((current) => ({ ...current, [name]: option.id }))}
                      aria-pressed={selected}
                      className="group relative min-h-56 overflow-hidden rounded-2xl border p-5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                      style={{
                        borderColor: selected ? '#79BD3E' : '#E5E5E3',
                        backgroundColor: selected ? '#EDF8DF' : '#F7F7F5',
                        boxShadow: selected ? '0 0 0 1px #79BD3E, 0 12px 30px -22px rgba(29,50,8,.45)' : 'none',
                      }}
                    >
                      <span className="absolute left-4 top-4 grid size-7 place-items-center rounded-full border border-[#E5E5E3] bg-white font-mono text-xs font-semibold text-[#696D6E] group-aria-pressed:border-[#79BD3E] group-aria-pressed:bg-[#AFE67F] group-aria-pressed:text-[#1D3208]">
                        {option.id}
                      </span>
                      <span className="flex h-28 items-center justify-center text-[#141812]">
                        <IconGraphic name={name} variant={option.id} />
                      </span>
                      <span className="block text-base font-bold">{option.title}</span>
                      <span className="mt-1 block text-sm leading-5 text-[#696D6E]">{option.description}</span>
                    </motion.button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-[#E5E5E3] bg-[#F7F7F5] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <h2 className="font-bold">Your picks</h2>
            <p className="mt-1 text-sm text-[#696D6E]">
              {choiceCount === 6 ? 'All six are ready to hand back.' : `${6 - choiceCount} icon${6 - choiceCount === 1 ? '' : 's'} left to choose.`}
            </p>
          </div>
          <button
            type="button"
            onClick={copyChoices}
            disabled={choiceCount === 0}
            className="mt-4 min-h-11 rounded-xl border border-[#79BD3E] bg-[#AFE67F] px-5 py-2.5 text-sm font-bold text-[#1D3208] transition-transform duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 sm:mt-0"
          >
            {copied ? 'Copied picks' : 'Copy picks'}
          </button>
        </section>
      </div>
    </main>
  );
}
