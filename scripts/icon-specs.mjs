// Hand-crafted animation specs — this file IS the design work.
// defs: Variants consts injected into the component.
// svg: variants const applied to the <svg> root. els: per-element variants by index.
//
// Design language:
// - hover = a state, not a trigger, where the metaphor supports it: fire burns,
//   clouds float, phones ring, signals broadcast → repeat: Infinity loops that
//   exit cleanly through the 'normal' variant on mouse leave
// - anticipation before action: mechanisms wind up before they spin
// - cause and effect between paths: a lid that lands makes the bin react,
//   a launching arrow makes the tray recoil
export const SPECS = [
  // ── originals (migrated from hand-written files) ────────────────────────
  {
    export: 'Notification03Icon',
    defs: `
// decaying pendulum ring; the clapper swings counter-phase, dragged behind
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -14, 11, -8, 5, -2, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.18, 0.38, 0.56, 0.72, 0.87, 1],
    },
  },
};

const clapperVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 2.2, -1.8, 1.2, -0.7, 0.3, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.24, 0.44, 0.62, 0.78, 0.9, 1],
    },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: 'top center' }`,
    els: { 2: { v: 'clapperVariants' } },
  },
  {
    export: 'ArrowRight02Icon',
    defs: `
// a launch and a softer echo — the head leads, the shaft stretches after it
const shaftVariants: Variants = {
  normal: { d: 'M18.5 12L4.99997 12' },
  animate: {
    d: [
      'M18.5 12L4.99997 12',
      'M18.5 12L9.5 12',
      'M18.5 12L4.99997 12',
      'M18.5 12L7.5 12',
      'M18.5 12L4.99997 12',
    ],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.75, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 4, 0, 1.8, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.55, 0.75, 1] },
  },
};`,
    els: { 0: { v: 'shaftVariants' }, 1: { v: 'headVariants' } },
  },
  {
    export: 'Settings01Icon',
    defs: `
// a mechanism, not a decoration: winds back before it spins
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
  },
  animate: {
    rotate: [0, -18, 180],
    transition: { duration: 0.8, times: [0, 0.22, 1], ease: ['easeIn', 'easeOut'] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Delete02Icon',
    defs: `
// the hinged lid lifts and tilts; when it lands the bin takes the knock
const lidVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -2, -2, 0],
    rotate: [0, -7, -7, 0],
    transition: { duration: 0.7, ease: 'easeInOut', times: [0, 0.25, 0.6, 1] },
  },
};

const binVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.6, 0],
    transition: { duration: 0.2, ease: 'easeOut', delay: 0.66 },
  },
};

const lineVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.8, 0],
    transition: { duration: 0.55, ease: 'easeInOut', delay: 0.12 },
  },
};`,
    els: {
      0: { v: 'binVariants' },
      1: { v: 'lidVariants' },
      2: { v: 'lineVariants' },
      3: { v: 'lineVariants' },
    },
  },
  {
    export: 'FavouriteIcon',
    defs: `
// lub-dub with real squash-and-stretch: on each beat the heart doesn't just
// scale — its lobes bulge outward and the shape swells like a muscle
const HEART_REST =
  'M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z';
const HEART_BEAT =
  'M10.3 19.8C7.2 17.6 1.2 12.9 1.2 8.6C1.2 5.6 4 3.2 7 3.2C8.6 3.2 10.1 3.8 12 5.8C13.9 3.8 15.4 3.2 17 3.2C20 3.2 22.8 5.6 22.8 8.6C22.8 12.9 16.8 17.6 13.7 19.8C12.7 20.6 11.3 20.6 10.3 19.8Z';
const HEART_HALF =
  'M10.36 19.88C7.4 17.73 1.6 12.97 1.6 8.65C1.6 5.7 4.05 3.35 7 3.35C8.55 3.35 10.05 3.9 12 5.9C13.95 3.9 15.45 3.35 17 3.35C19.95 3.35 22.4 5.7 22.4 8.65C22.4 12.97 16.6 17.73 13.65 19.88C12.67 20.64 11.33 20.64 10.36 19.88Z';

const heartVariants: Variants = {
  normal: { d: HEART_REST, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    d: [HEART_REST, HEART_BEAT, HEART_REST, HEART_HALF, HEART_REST],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.18, 0.42, 0.6, 1],
    },
  },
};`,
    els: { 0: { v: 'heartVariants' } },
  },
  {
    export: 'Loading03Icon',
    defs: `
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    rotate: 360,
    transition: { duration: 1, ease: 'linear', repeat: Infinity },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Search01Icon',
    defs: `
// the lens sweeps, pauses on a find, then settles
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, -2, -2, 2, 0],
    translateY: [0, 2, 2, -1.5, 0],
    rotate: [0, -4, -4, 4, 0],
    transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.25, 0.45, 0.7, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Home01Icon',
    defs: `
// a welcoming hop; the door "smile" redraws as it lands
const svgVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -2, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
  },
};

const smileVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 },
  },
};`,
    svg: 'svgVariants',
    els: { 1: { v: 'smileVariants' } },
  },
  {
    export: 'Menu01Icon',
    defs: `
// a wave through the stack — each line launches and springs back past zero
const lineVariants: Variants = {
  normal: { translateX: 0 },
  animate: (i: number) => ({
    translateX: [0, 4.5, -1, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      times: [0, 0.4, 0.75, 1],
      delay: i * 0.07,
    },
  }),
};`,
    els: {
      0: { v: 'lineVariants', custom: 0 },
      1: { v: 'lineVariants', custom: 1 },
      2: { v: 'lineVariants', custom: 2 },
    },
  },
  {
    export: 'Copy01Icon',
    defs: `
// the front sheet stamps onto the back one — squashing slightly on contact
const frontVariants: Variants = {
  normal: { translateX: 0, translateY: 0, scale: 1 },
  animate: {
    translateX: [0, -2.5, 0],
    translateY: [0, -2.5, 0],
    scale: [1, 0.96, 1],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const backVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 1, 0],
    translateY: [0, 1, 0],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};`,
    els: { 0: { v: 'frontVariants' }, 1: { v: 'backVariants' } },
  },
  {
    export: 'Tick02Icon',
    defs: `
// the check draws itself with a small pop of confirmation at the end
const svgVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.08, 1],
    transition: { duration: 0.5, ease: 'easeOut', times: [0, 0.6, 0.8, 1] },
  },
};

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'pathVariants' } },
  },
  {
    export: 'Download01Icon',
    defs: `
// a conveyor: the arrow falls through, fades, and a new one drops in from
// above — the tray dips as each delivery lands
const arrowVariants: Variants = {
  normal: { translateY: 0, opacity: 1 },
  animate: {
    translateY: [0, 5, -5, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 0.7,
      times: [0, 0.42, 0.5, 1],
      ease: ['easeIn', 'linear', 'easeOut'],
    },
  },
};

const trayVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 1.2, 0],
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.32 },
  },
};`,
    els: { 0: { v: 'trayVariants' }, 1: { v: 'arrowVariants' } },
  },
  {
    export: 'Upload01Icon',
    defs: `
// the arrow launches off the top, and its replacement rises from the tray
const arrowVariants: Variants = {
  normal: { translateY: 0, opacity: 1 },
  animate: {
    translateY: [0, -5, 5, 0],
    opacity: [1, 0, 0, 1],
    transition: {
      duration: 0.7,
      times: [0, 0.42, 0.5, 1],
      ease: ['easeIn', 'linear', 'easeOut'],
    },
  },
};

const trayVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.9, 0],
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.08 },
  },
};`,
    els: { 0: { v: 'trayVariants' }, 1: { v: 'arrowVariants' } },
  },
  {
    export: 'Mail01Icon',
    defs: `
// new mail: the envelope perks up and the flap fold redraws
const svgVariants: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.06, 1],
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const flapVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0.4, 1],
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.12 },
  },
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'flapVariants' } },
  },
  {
    export: 'StarIcon',
    defs: `
// twinkle — a quick shake with a swell, like catching the light
const svgVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -10, 8, -4, 0],
    scale: [1, 1.1, 1.1, 1.04, 1],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'SquareLock01Icon',
    defs: `
// the shackle swings open on its hinge, hangs, then clicks shut;
// the body takes the click and the keyhole blinks
const shackleVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -2.2, -2.2, 0],
    rotate: [0, -14, -14, 0],
    transition: { duration: 0.75, ease: 'easeInOut', times: [0, 0.3, 0.62, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.7, 0],
    transition: { duration: 0.22, ease: 'easeOut', delay: 0.7 },
  },
};

const keyholeVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.2, 1],
    transition: { duration: 0.3, ease: 'easeInOut', delay: 0.72 },
  },
};`,
    els: {
      0: { v: 'bodyVariants' },
      1: {
        v: 'shackleVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: '85% 100%' }`,
      },
      2: { v: 'keyholeVariants' },
    },
  },

  // ── second batch ────────────────────────────────────────────────────────
  {
    export: 'PlusSignIcon',
    defs: `
// a quarter turn with momentum and a swell — something is being added
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', duration: 0.5, bounce: 0.15 },
  },
  animate: {
    rotate: 90,
    scale: [1, 1.15, 1],
    transition: {
      rotate: { type: 'spring', duration: 0.5, bounce: 0.25 },
      scale: { duration: 0.45, times: [0, 0.4, 1], ease: 'easeInOut' },
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Cancel01Icon',
    defs: `
// a firm headshake — "no", not a pirouette
const svgVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -2.8, 2.8, -1.8, 1.8, -0.8, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      times: [0, 0.15, 0.35, 0.55, 0.72, 0.88, 1],
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'ArrowLeft02Icon',
    defs: `
const shaftVariants: Variants = {
  normal: { d: 'M5.5 12.002H19' },
  animate: {
    d: [
      'M5.5 12.002H19',
      'M5.5 12.002H14.5',
      'M5.5 12.002H19',
      'M5.5 12.002H16.5',
      'M5.5 12.002H19',
    ],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.75, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -4, 0, -1.8, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.55, 0.75, 1] },
  },
};`,
    els: { 0: { v: 'shaftVariants' }, 1: { v: 'headVariants' } },
  },
  {
    export: 'ArrowUp02Icon',
    defs: `
const shaftVariants: Variants = {
  normal: { d: 'M12 5.5V19' },
  animate: {
    d: [
      'M12 5.5V19',
      'M12 5.5V14.5',
      'M12 5.5V19',
      'M12 5.5V16.5',
      'M12 5.5V19',
    ],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.75, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -4, 0, -1.8, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.55, 0.75, 1] },
  },
};`,
    els: { 0: { v: 'shaftVariants' }, 1: { v: 'headVariants' } },
  },
  {
    export: 'ArrowDown02Icon',
    defs: `
const shaftVariants: Variants = {
  normal: { d: 'M12 18.502V5.00195' },
  animate: {
    d: [
      'M12 18.502V5.00195',
      'M12 18.502V9.5',
      'M12 18.502V5.00195',
      'M12 18.502V7.5',
      'M12 18.502V5.00195',
    ],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.75, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 4, 0, 1.8, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.55, 0.75, 1] },
  },
};`,
    els: { 0: { v: 'shaftVariants' }, 1: { v: 'headVariants' } },
  },
  {
    export: 'RefreshIcon',
    defs: `
// rewinds slightly, then whips a full revolution; 360 ≡ 0 so the reset is invisible
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0 } },
  animate: {
    rotate: [0, -25, 360],
    transition: { duration: 0.9, times: [0, 0.2, 1], ease: ['easeIn', 'easeOut'] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'UserIcon',
    defs: `
// a double nod of greeting — the head leads, shoulders echo softer
const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.8, 0, -0.9, 0],
    transition: { duration: 0.75, ease: 'easeInOut', times: [0, 0.22, 0.5, 0.72, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.9, 0, -0.4, 0],
    transition: { duration: 0.75, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.78, 1] },
  },
};`,
    els: { 0: { v: 'headVariants' }, 1: { v: 'bodyVariants' } },
  },
  {
    export: 'Calendar03Icon',
    defs: `
// the binder rings flip like turning pages while the marked days flicker past
const ringsVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.5, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
  },
};

const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

const daysVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.25, 1, 0.25, 1],
    transition: { duration: 0.55, ease: 'easeInOut', delay: 0.15 },
  },
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'ringsVariants' }, 3: { v: 'daysVariants' } },
  },
  {
    export: 'Link01Icon',
    defs: `
// the chain halves pull apart and snap back past zero — a real click
const lowerVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, -1.6, 0.4, 0],
    translateY: [0, 1.6, -0.4, 0],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.4, 0.75, 1] },
  },
};

const upperVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 1.6, -0.4, 0],
    translateY: [0, -1.6, 0.4, 0],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.4, 0.75, 1] },
  },
};`,
    els: { 0: { v: 'lowerVariants' }, 1: { v: 'upperVariants' } },
  },
  {
    export: 'Edit02Icon',
    defs: `
// the pencil scribbles; the baseline redraws underneath as the written line
const pencilVariants: Variants = {
  normal: { rotate: 0, translateX: 0 },
  animate: {
    rotate: [0, -5, 3, -2, 0],
    translateX: [0, -1.5, 1, -0.5, 0],
    transition: { duration: 0.65, ease: 'easeInOut' },
  },
};

const lineVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
  },
};`,
    els: {
      0: { v: 'pencilVariants' },
      1: { v: 'pencilVariants' },
      2: { v: 'lineVariants' },
    },
  },
  {
    export: 'Share08Icon',
    defs: `
// the network lights up — the wires carry the signal, nodes pulse as it arrives
const nodeVariants: Variants = {
  normal: { scale: 1 },
  animate: (i: number) => ({
    scale: [1, 1.25, 1],
    transition: { duration: 0.45, ease: 'easeInOut', delay: i * 0.12 },
  }),
};

const wireVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'nodeVariants', custom: 1 },
      1: { v: 'nodeVariants', custom: 0 },
      2: { v: 'nodeVariants', custom: 2 },
      3: { v: 'wireVariants' },
    },
  },
  {
    export: 'SentIcon',
    defs: `
// the plane banks and surges; its fold line redraws like a speed streak
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, 2.5, 0],
    translateY: [0, -2.5, 0],
    rotate: [0, 5, 0],
    transition: { duration: 0.65, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const streakVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.15 },
  },
};`,
    svg: 'svgVariants',
    els: { 1: { v: 'streakVariants' } },
  },
  {
    export: 'Sun03Icon',
    defs: `
// the rays wheel with momentum while the core swells with warmth
const coreVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.12, 1],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

const raysVariants: Variants = {
  normal: { rotate: 0, transition: { type: 'spring', duration: 0.7, bounce: 0.1 } },
  animate: { rotate: 90, transition: { type: 'spring', duration: 0.7, bounce: 0.2 } },
};`,
    els: { 0: { v: 'coreVariants' }, 1: { v: 'raysVariants' } },
  },
  {
    export: 'Moon02Icon',
    defs: `
// a sleepy rock — the crescent sways and settles
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -14, 9, -4, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'CloudIcon',
    defs: `
// while you hover, the cloud simply floats — two drift frequencies so the
// path never feels scripted
const svgVariants: Variants = {
  normal: {
    translateX: 0,
    translateY: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  animate: {
    translateX: [0, 2.6, 0, -2.6, 0],
    translateY: [0, -1.1, 0],
    transition: {
      translateX: { duration: 3.6, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 1.9, ease: 'easeInOut', repeat: Infinity },
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'MusicNote01Icon',
    defs: `
// while you hover, the band plays: the sheet sways, the two note heads
// pulse on alternating beats, and the small note bobs its own eighth-note
// rhythm on top
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  animate: {
    rotate: [0, -4, 3.5, -4, 3.5, 0],
    translateY: [0, -0.8, 0, -0.8, 0],
    transition: {
      rotate: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
    },
  },
};

// downbeat — left head lands on 1 and 3
const headLeftVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.22, 1],
    transition: { duration: 0.45, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.45 },
  },
};

// backbeat — right head answers on 2 and 4
const headRightVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.22, 1],
    transition: {
      duration: 0.45,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.45,
      delay: 0.45,
    },
  },
};

// the little grace note noodles over the top in eighth notes
const smallNoteVariants: Variants = {
  normal: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    rotate: [0, -9, 7, 0],
    translateY: [0, -1.5, 0, -0.8, 0],
    transition: {
      rotate: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
    },
  },
};

// tiny notes escape the tune, float up, and dissolve — one per bar
const floatNoteVariants: Variants = {
  normal: { opacity: 0, translateY: 0, rotate: 0, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [1.5, -3.5],
    rotate: [0, i === 0 ? -12 : 12],
    transition: {
      duration: 1.4,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.4,
      delay: i * 0.9,
    },
  }),
};`,
    svg: 'svgVariants',
    els: {
      0: { v: 'smallNoteVariants' },
      1: { v: 'headLeftVariants' },
      2: { v: 'headRightVariants' },
    },
    extra: `
          <motion.g
            variants={floatNoteVariants}
            custom={0}
            animate={controls}
            initial="normal"
          >
            <circle cx="15.2" cy="4.6" r="0.8" fill="currentColor" />
            <path d="M16 4.6V2.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
          </motion.g>
          <motion.g
            variants={floatNoteVariants}
            custom={1}
            animate={controls}
            initial="normal"
          >
            <circle cx="18.8" cy="3.2" r="0.65" fill="currentColor" />
            <path d="M19.45 3.2V1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
          </motion.g>`,
  },
  {
    export: 'Camera01Icon',
    defs: `
// focus pull, then the shot: lens breathes, body snaps, indicator flashes
const lensVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.85, 1.1, 1],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.35, 0.7, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.05, 1],
    transition: { duration: 0.65, ease: 'easeInOut', times: [0, 0.55, 0.72, 1] },
  },
};

const dotVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.15, 1, 0.15, 1],
    transition: { duration: 0.35, ease: 'linear', delay: 0.35 },
  },
};`,
    svg: 'bodyVariants',
    els: { 1: { v: 'lensVariants' }, 2: { v: 'dotVariants' } },
  },
  {
    export: 'Message01Icon',
    defs: `
// a reply being typed — the bubble rocks as the text lines redraw inside it
const bubbleVariants: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.05, 1],
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.55, ease: 'easeInOut' },
  },
};

const textVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.12 },
  },
};`,
    els: { 0: { v: 'textVariants' }, 1: { v: 'bubbleVariants' } },
  },
  {
    export: 'Call02Icon',
    defs: `
// while you hover, the phone keeps ringing — rattle, rest, rattle again
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    rotate: [0, -12, 10, -8, 6, -3, 0],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
      repeat: Infinity,
      repeatDelay: 0.55,
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Bookmark01Icon',
    defs: `
// tucked in — dips between the pages with a small tilt, then settles proud
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, 2.2, -0.8, 0],
    rotate: [0, 3, -1, 0],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 0.72, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Clock01Icon',
    defs: `
// a mechanical sweep: the hands tick around the dial, each jump overshooting
// its stop like a real escapement
const handsVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0 } },
  animate: {
    rotate: [0, 97, 90, 187, 180, 277, 270, 360],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      times: [0, 0.13, 0.2, 0.38, 0.45, 0.63, 0.7, 1],
    },
  },
};`,
    els: {
      1: {
        v: 'handsVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 12px' }`,
      },
    },
  },
  {
    export: 'EyeIcon',
    defs: `
// the pupil glances left, then right — then the eye blinks
const pupilVariants: Variants = {
  normal: { translateX: 0, opacity: 1 },
  animate: {
    translateX: [0, -1.8, 1.8, 0, 0],
    opacity: [1, 1, 1, 0, 1],
    transition: {
      translateX: { duration: 0.6, ease: 'easeInOut', times: [0, 0.3, 0.65, 0.9, 1] },
      opacity: { duration: 0.95, times: [0, 0.68, 0.72, 0.82, 1], ease: 'linear' },
    },
  },
};

const lidVariants: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: [1, 1, 0.12, 1],
    transition: { duration: 0.95, ease: 'easeInOut', times: [0, 0.68, 0.8, 1] },
  },
};`,
    els: {
      1: { v: 'lidVariants' },
      2: { v: 'pupilVariants' },
    },
  },
  {
    export: 'Wifi01Icon',
    defs: `
// while you hover, the signal keeps broadcasting — pulses ripple outward
const arcVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    opacity: [0.25, 1, 0.25],
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.22,
    },
  }),
};`,
    els: {
      0: { v: 'arcVariants', custom: 0 },
      1: { v: 'arcVariants', custom: 1 },
      2: { v: 'arcVariants', custom: 2 },
    },
  },
  {
    export: 'VolumeHighIcon',
    defs: `
// while you hover, sound is playing — waves ripple away from the speaker
const speakerVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.04, 1],
    transition: { duration: 0.45, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.45 },
  },
};

const waveVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    opacity: [0.2, 1, 0.2],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.22,
    },
  }),
};`,
    els: {
      0: { v: 'speakerVariants' },
      1: { v: 'waveVariants', custom: 0 },
      2: { v: 'waveVariants', custom: 1 },
    },
  },
  {
    export: 'GiftIcon',
    defs: `
// what's inside? — the box shakes from the base while the bows flutter loose
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -4, 4, -2.5, 2.5, 0],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};

const bowLeftVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 10, -6, 3, 0],
    transition: { duration: 0.7, ease: 'easeInOut', delay: 0.08 },
  },
};

const bowRightVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -10, 6, -3, 0],
    transition: { duration: 0.7, ease: 'easeInOut', delay: 0.12 },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '50% 90%' }`,
    els: { 2: { v: 'bowLeftVariants' }, 3: { v: 'bowRightVariants' } },
  },
  {
    export: 'Rocket01Icon',
    defs: `
// liftoff with engine shudder; the speed lines streak past twice
const shipVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 0.4, -0.3, 2.2, 0],
    translateY: [0, -0.4, 0.3, -2.2, 0],
    transition: { duration: 0.75, ease: 'easeInOut', times: [0, 0.15, 0.3, 0.6, 1] },
  },
};

const streakVariants: Variants = {
  normal: { translateX: 0, translateY: 0, opacity: 1 },
  animate: (i: number) => ({
    translateX: [0, -2, 0],
    translateY: [0, 2, 0],
    opacity: [1, 0.3, 1],
    transition: { duration: 0.35, ease: 'easeInOut', delay: i * 0.07, repeat: 1 },
  }),
};`,
    els: {
      0: { v: 'shipVariants' },
      1: { v: 'streakVariants', custom: 0 },
      2: { v: 'streakVariants', custom: 1 },
      3: { v: 'streakVariants', custom: 2 },
      4: { v: 'shipVariants' },
    },
  },
  {
    export: 'FireIcon',
    defs: `
// while you hover, it burns — for real: the flame OUTLINE morphs between
// poses (lick left, straighten, lick right), the whole body bobs on the
// heat, and embers break loose, wander up, and wink out
const svgVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  animate: {
    translateY: [0, -0.5, 0.2, 0],
    transition: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
  },
};

// three poses of the same 9-segment path — tips and tongues move, base stays put
const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LEFT =
  'M13.8561 22C26.0783 19.5 18.9 7.2 9.9 2.4C9.1 5.8 8.2 6.8 5.2 10.4C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.2 18.7 7.8 16.3C8.4 15.2 9.4 14.2 8.9 12.6C9.7 13 11.5 13.4 11.9 15.9C12.7 14.8 13.3 12.8 12.5 10.6C18.4 14.9 16.2 19.2 13.8561 22Z';
const FLAME_RIGHT =
  'M13.8561 22C26.0783 18.6 19.6 6.6 12.1 1.7C10.4 5.2 8.8 6.2 5.9 9.6C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 5.9 19.1 7.3 15.7C7.8 14.8 8.7 13.7 8.2 11.5C9.3 12.1 11.5 12.7 12.1 15.1C12.9 14.1 13.9 12 13.2 9.5C19.5 14.1 16.8 18.8 13.8561 22Z';

const flameVariants: Variants = {
  normal: { d: FLAME_REST, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    d: [FLAME_REST, FLAME_LEFT, FLAME_REST, FLAME_RIGHT, FLAME_REST],
    transition: { duration: 1.7, ease: 'easeInOut', repeat: Infinity },
  },
};

// embers: born at the flame's shoulder, they wander up, shrink, and wink out
const emberVariants: Variants = {
  normal: { opacity: 0, translateY: 0, translateX: 0, scale: 1, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [0.5, -4.5],
    translateX: [0, i % 2 === 0 ? -0.9 : 0.9],
    scale: [1, 0.65],
    transition: {
      duration: 1.1,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.3,
      delay: i * 0.45,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '50% 88%' }`,
    els: { 0: { v: 'flameVariants' } },
    extra: `
          <motion.circle
            cx="8.5"
            cy="7"
            r="0.9"
            fill="currentColor"
            variants={emberVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="15.5"
            cy="8.5"
            r="0.7"
            fill="currentColor"
            variants={emberVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="12"
            cy="4.5"
            r="0.6"
            fill="currentColor"
            variants={emberVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'FlashIcon',
    defs: `
// while you hover, the storm keeps striking. The strike fires the moment
// you enter — instant response — and the bolt only re-draws during the dark
// beat, where the cut is invisible. One shared 1.9s timeline keeps every
// element in sync.
const svgVariants: Variants = {
  normal: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    //        strike──flash──strike──hold      dark      redraw    settle
    opacity: [1, 0.25, 1, 0.2, 1, 1, 0.3, 0.3, 1],
    scale: [1, 1.1, 1.02, 1.08, 1, 1, 0.97, 0.97, 1],
    transition: {
      duration: 1.9,
      ease: 'easeOut',
      times: [0, 0.05, 0.12, 0.18, 0.26, 0.55, 0.66, 0.78, 0.92],
      repeat: Infinity,
    },
  },
};

// drawn through the strike; vanishes and re-draws inside the dark beat
const boltVariants: Variants = {
  normal: { pathLength: 1, transition: { duration: 0.2 } },
  animate: {
    pathLength: [1, 1, 0, 0, 1, 1],
    transition: {
      duration: 1.9,
      times: [0, 0.64, 0.66, 0.7, 0.85, 1],
      ease: 'easeOut',
      repeat: Infinity,
    },
  },
};

// sparks pop off the tip at the moment of impact, then vanish
const sparkVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0.8, 0, 0],
    transition: {
      duration: 1.9,
      times: [0, 0.06, 0.14, 0.24, 1],
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.04,
    },
  }),
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'boltVariants' } },
    extra: `
          <motion.path
            d="M7.6 20.4L6.2 21.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.4 20.6L15.8 21.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M11.4 23L11.1 24.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'ThumbsUpIcon',
    defs: `
// approval with enthusiasm — a double pump from the wrist
const svgVariants: Variants = {
  normal: { rotate: 0, translateY: 0 },
  animate: {
    rotate: [0, -14, 0, -8, 0],
    translateY: [0, -1.2, 0, -0.6, 0],
    transition: { duration: 0.75, ease: 'easeInOut', times: [0, 0.22, 0.5, 0.72, 1] },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '25% 80%' }`,
  },
];
