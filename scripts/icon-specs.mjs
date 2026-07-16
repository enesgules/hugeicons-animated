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
// lub-dub — a real pulse: strong beat, quick fall, softer beat, long rest
const svgVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.22, 1, 1.14, 1],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.18, 0.42, 0.6, 1],
    },
  },
};`,
    svg: 'svgVariants',
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
// while you hover, the notes keep time — swaying on the beat
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  animate: {
    rotate: [0, -6, 5, -6, 5, 0],
    translateY: [0, -1.2, 0, -1.2, 0],
    transition: {
      rotate: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
    },
  },
};`,
    svg: 'svgVariants',
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
// while you hover, it burns: the flame licks — stretch and squash run at
// different frequencies from the base so no two moments look alike
const svgVariants: Variants = {
  normal: {
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    translateY: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  animate: {
    scaleY: [1, 1.09, 0.96, 1.12, 0.95, 1.06, 1],
    scaleX: [1, 0.95, 1.05, 0.93, 1.06, 0.96, 1],
    rotate: [0, -2.5, 2, -3, 1.5, -1, 0],
    translateY: [0, -0.6, 0.3, -0.9, 0.2, -0.4, 0],
    transition: {
      scaleY: { duration: 1.15, ease: 'easeInOut', repeat: Infinity },
      scaleX: { duration: 0.95, ease: 'easeInOut', repeat: Infinity },
      rotate: { duration: 1.35, ease: 'easeInOut', repeat: Infinity },
      translateY: { duration: 0.85, ease: 'easeInOut', repeat: Infinity },
    },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '50% 88%' }`,
  },
  {
    export: 'FlashIcon',
    defs: `
// a strike: the bolt draws in fast, flashes hard, then steadies
const svgVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.15, 1, 0.35, 1],
    scale: [1, 1.12, 1, 1.05, 1],
    transition: { duration: 0.5, ease: 'easeOut', times: [0, 0.12, 0.3, 0.5, 1] },
  },
};

const boltVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'boltVariants' } },
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
