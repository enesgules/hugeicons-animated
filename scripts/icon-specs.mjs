// Hand-crafted animation specs — this file IS the design work.
// defs: Variants consts injected into the component.
// svg: variants const applied to the <svg> root. els: per-element variants by index.
export const SPECS = [
  {
    export: 'PlusSignIcon',
    defs: `
// a quarter turn with momentum — reads as "something is being added"
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { type: 'spring', duration: 0.5, bounce: 0.15 } },
  animate: { rotate: 90, transition: { type: 'spring', duration: 0.5, bounce: 0.25 } },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Cancel01Icon',
    defs: `
// the X winds up tighter then springs back — a firm "no"
const svgVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.5, bounce: 0.2 } },
  animate: { rotate: 90, scale: 1, transition: { type: 'spring', duration: 0.5, bounce: 0.25 } },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'ArrowLeft02Icon',
    defs: `
const shaftVariants: Variants = {
  normal: { d: 'M5.5 12.002H19' },
  animate: {
    d: ['M5.5 12.002H19', 'M5.5 12.002H14.5', 'M5.5 12.002H19'],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -3.5, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
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
    d: ['M12 5.5V19', 'M12 5.5V14.5', 'M12 5.5V19'],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -3.5, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
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
    d: ['M12 18.502V5.00195', 'M12 18.502V9.5', 'M12 18.502V5.00195'],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 3.5, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
  },
};`,
    els: { 0: { v: 'shaftVariants' }, 1: { v: 'headVariants' } },
  },
  {
    export: 'RefreshIcon',
    defs: `
// one full revolution with momentum; 360 ≡ 0 so the reset is invisible
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0 } },
  animate: { rotate: 360, transition: { type: 'spring', duration: 0.9, bounce: 0.1 } },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'UserIcon',
    defs: `
// a friendly nod — the head bobs first, shoulders follow
const headVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.5, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.35, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.8, 0],
    transition: { duration: 0.45, ease: 'easeInOut', delay: 0.08 },
  },
};`,
    els: { 0: { v: 'headVariants' }, 1: { v: 'bodyVariants' } },
  },
  {
    export: 'Calendar03Icon',
    defs: `
// the binder rings lift like pages being flipped; the body sways with them
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
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'ringsVariants' } },
  },
  {
    export: 'Link01Icon',
    defs: `
// the chain halves pull apart, then click back together
const lowerVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, -1.4, 0],
    translateY: [0, 1.4, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const upperVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 1.4, 0],
    translateY: [0, -1.4, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.4, 1] },
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
// the network lights up — nodes pulse outward from the source
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
// the plane banks and surges forward, then glides back to rest
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, 2.5, 0],
    translateY: [0, -2.5, 0],
    rotate: [0, 5, 0],
    transition: { duration: 0.65, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Sun03Icon',
    defs: `
// the rays wheel around the core with momentum — the core holds still
const raysVariants: Variants = {
  normal: { rotate: 0, transition: { type: 'spring', duration: 0.7, bounce: 0.1 } },
  animate: { rotate: 90, transition: { type: 'spring', duration: 0.7, bounce: 0.2 } },
};`,
    els: { 1: { v: 'raysVariants' } },
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
// drifting on a light breeze
const svgVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 2.2, -2.2, 0],
    transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.3, 0.7, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'MusicNote01Icon',
    defs: `
// the notes sway to the beat
const svgVariants: Variants = {
  normal: { rotate: 0, translateY: 0 },
  animate: {
    rotate: [0, -6, 4, 0],
    translateY: [0, -1.2, 0, 0],
    transition: { duration: 0.65, ease: 'easeInOut' },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Camera01Icon',
    defs: `
// focus pull: the lens breathes in, snaps sharp; the indicator blinks
const lensVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.85, 1.1, 1],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.35, 0.7, 1] },
  },
};

const dotVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.2, 1],
    transition: { duration: 0.4, ease: 'easeInOut', delay: 0.3 },
  },
};`,
    els: { 1: { v: 'lensVariants' }, 2: { v: 'dotVariants' } },
  },
  {
    export: 'Message01Icon',
    defs: `
// a reply being typed — the text lines redraw inside the bubble
const bubbleVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.5, ease: 'easeInOut' },
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
// incoming call — the handset rattles in its cradle and settles
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -12, 10, -8, 6, -3, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Bookmark01Icon',
    defs: `
// tucked in — the bookmark dips down as if sliding between pages
const svgVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 2, -0.6, 0],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'Clock01Icon',
    defs: `
// time flies — the hands sweep one full revolution around the fixed dial
const handsVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0 } },
  animate: { rotate: 360, transition: { duration: 0.9, ease: 'easeInOut' } },
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
// the pupil glances left, then right, then back to you
const pupilVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, -1.8, 1.8, 0],
    transition: { duration: 0.7, ease: 'easeInOut', times: [0, 0.3, 0.65, 1] },
  },
};`,
    els: { 2: { v: 'pupilVariants' } },
  },
  {
    export: 'Wifi01Icon',
    defs: `
// searching for signal — the arcs redraw outward from the smallest
const arcVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (i: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.12 },
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
// sound ripples out — waves redraw one after the other
const waveVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (i: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.05 + i * 0.14 },
  }),
};`,
    els: {
      1: { v: 'waveVariants', custom: 0 },
      2: { v: 'waveVariants', custom: 1 },
    },
  },
  {
    export: 'GiftIcon',
    defs: `
// a curious shake from the base — what's inside?
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -4, 4, -2, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '50% 90%' }`,
  },
  {
    export: 'Rocket01Icon',
    defs: `
// liftoff along the flight axis; the speed lines streak the other way
const shipVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 2, 0],
    translateY: [0, -2, 0],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const streakVariants: Variants = {
  normal: { translateX: 0, translateY: 0, opacity: 1 },
  animate: (i: number) => ({
    translateX: [0, -1.5, 0],
    translateY: [0, 1.5, 0],
    opacity: [1, 0.4, 1],
    transition: { duration: 0.5, ease: 'easeInOut', delay: i * 0.06 },
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
// the flame flickers from its base — never quite still
const svgVariants: Variants = {
  normal: { scale: 1, translateY: 0 },
  animate: {
    scale: [1, 1.06, 0.97, 1.04, 1],
    translateY: [0, -0.8, 0.4, -0.4, 0],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '50% 85%' }`,
  },
  {
    export: 'FlashIcon',
    defs: `
// a strike — the bolt blinks hard then steadies
const svgVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.25, 1, 0.6, 1],
    scale: [1, 1.08, 1, 1.04, 1],
    transition: { duration: 0.55, ease: 'easeOut', times: [0, 0.15, 0.35, 0.55, 1] },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'ThumbsUpIcon',
    defs: `
// approval — the whole hand rocks up from the wrist
const svgVariants: Variants = {
  normal: { rotate: 0, translateY: 0 },
  animate: {
    rotate: [0, -12, 0],
    translateY: [0, -1, 0],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '25% 80%' }`,
  },
];
