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
// a mechanism, not a decoration: winds back, spins past its stop, and the
// bore clicks the instant the gear catches
const svgVariants: Variants = {
  normal: {
    rotate: 0,
    transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
  },
  animate: {
    rotate: [0, -18, 196, 180],
    transition: {
      duration: 0.85,
      times: [0, 0.22, 0.82, 1],
      ease: ['easeIn', 'easeOut', 'easeOut'],
    },
  },
};

const boreVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.22, 0.92, 1],
    transition: { duration: 0.85, ease: 'easeOut', times: [0, 0.78, 0.85, 0.93, 1] },
  },
};`,
    svg: 'svgVariants',
    els: {
      1: {
        v: 'boreVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 12px' }`,
      },
    },
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
// the glyph is eight radial ticks — so run a real activity chase around
// them instead of rigidly spinning the whole svg
const rayVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [1, 0.15, 1],
    transition: { duration: 1, ease: 'easeInOut', repeat: Infinity, delay: i * 0.125 },
  }),
};`,
    els: {
      0: { v: 'rayVariants', custom: 0 },
      4: { v: 'rayVariants', custom: 1 },
      2: { v: 'rayVariants', custom: 2 },
      6: { v: 'rayVariants', custom: 3 },
      1: { v: 'rayVariants', custom: 4 },
      5: { v: 'rayVariants', custom: 5 },
      3: { v: 'rayVariants', custom: 6 },
      7: { v: 'rayVariants', custom: 7 },
    },
  },
  {
    export: 'Search01Icon',
    defs: `
// the lens sweeps, pauses on a find — and the find actually reads:
// the lens zooms in and a glint blinks at its center
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, -2, -2, 2, 0],
    translateY: [0, 2, 2, -1.5, 0],
    rotate: [0, -4, -4, 4, 0],
    transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.25, 0.45, 0.7, 1] },
  },
};

const lensVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.14, 1.14, 1],
    transition: { duration: 0.9, ease: 'easeInOut', times: [0, 0.25, 0.35, 0.45, 1] },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: [0, 0, 1, 0],
    scale: [0.5, 0.5, 1, 1.3],
    transition: { duration: 0.9, ease: 'easeOut', times: [0, 0.25, 0.35, 0.5] },
  },
};`,
    svg: 'svgVariants',
    els: {
      1: {
        v: 'lensVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: 'center' }`,
      },
    },
    extra: `
          <motion.path
            d="M11 8.4V9.6M11 12.4V13.6M8.4 11H9.6M12.4 11H13.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1"
            variants={glintVariants}
            animate={controls}
            initial="normal"
          />`,
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
// the hamburger teases what it becomes: top and bottom bars lean toward
// the X while the middle bar recedes, then it all settles back
const topLineVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, 3.2, 0],
    rotate: [0, 13, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.45, 1] },
  },
};

const bottomLineVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -3.2, 0],
    rotate: [0, -13, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.45, 1], delay: 0.03 },
  },
};

const midLineVariants: Variants = {
  normal: { opacity: 1, scaleX: 1 },
  animate: {
    opacity: [1, 0.15, 1],
    scaleX: [1, 0.5, 1],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.45, 1], delay: 0.03 },
  },
};`,
    els: {
      0: {
        v: 'topLineVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 5px' }`,
      },
      1: { v: 'midLineVariants' },
      2: {
        v: 'bottomLineVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 19px' }`,
      },
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
// new mail arrives: the envelope drops in and lands, the flap fold
// redraws, and a badge ping fires at the corner — "you've got mail"
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -2.5, 0.5, 0],
    rotate: [0, -2, 1, 0],
    transition: { duration: 0.55, ease: 'easeOut', times: [0, 0.3, 0.7, 1] },
  },
};

const flapVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0.4, 1],
    transition: { duration: 0.45, ease: 'easeOut', delay: 0.12 },
  },
};

const badgeVariants: Variants = {
  normal: { opacity: 0, scale: 0.4 },
  animate: {
    opacity: [0, 1, 1],
    scale: [0.4, 1.3, 1],
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.3, times: [0, 0.6, 1] },
  },
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'flapVariants' } },
    extra: `
          <motion.circle
            cx="20.5"
            cy="4"
            r="1.8"
            fill="currentColor"
            variants={badgeVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '20.5px 4px' }}
          />`,
  },
  {
    export: 'StarIcon',
    defs: `
// the star catches the light: a quick brightening pop, then glints keep
// flashing off its points while you hover — twinkling is a state
const svgVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.15, 0.97, 1.05, 1],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.3, 0.55, 0.8, 1] },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 0, scale: 0.4, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.4, 1, 0.6],
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.5,
      delay: 0.2 + i * 0.35,
    },
  }),
};`,
    svg: 'svgVariants',
    extra: `
          <motion.path
            d="M21.4 9L23.2 9M22.3 8.1L22.3 9.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '22.3px 9px' }}
          />
          <motion.path
            d="M3.1 21.3L4.9 21.3M4 20.4L4 22.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '4px 21.3px' }}
          />
          <motion.path
            d="M1.1 11.5L2.9 11.5M2 10.6L2 12.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '2px 11.5px' }}
          />`,
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
// each arm takes its turn growing — vertical stroke first, then horizontal —
// as if the plus is being built one line at a time
const svgVariants: Variants = {
  normal: { scaleY: 1, scaleX: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  animate: {
    scaleY: [1, 1.3, 1, 1, 1],
    scaleX: [1, 1, 1, 1.3, 1],
    transition: { duration: 0.6, ease: 'easeOut', times: [0, 0.25, 0.5, 0.75, 1] },
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
// a real nod — the head dips on its neck, the shoulders settle after
const headVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 16, -4, 0],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 0.7, 1] },
  },
};

const bodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0, 0.6, 0],
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
};`,
    els: {
      0: {
        v: 'headVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 13.5px' }`,
      },
      1: { v: 'bodyVariants' },
    },
  },
  {
    export: 'Calendar03Icon',
    defs: `
// the binder rings dip like a page turning, and the days scroll/flicker
// past underneath on the same beat
const ringsVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.6, 0.4, 0],
    transition: { duration: 0.55, ease: 'easeInOut', times: [0, 0.35, 0.7, 1] },
  },
};

const daysVariants: Variants = {
  normal: { opacity: 1, translateY: 0 },
  animate: {
    opacity: [1, 0.2, 1, 0.2, 1],
    translateY: [0, 1.2, 0, 1.2, 0],
    transition: { duration: 0.6, ease: 'easeInOut', delay: 0.1 },
  },
};`,
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
// while you hover, the sun keeps shining — the disc glows warm, the rays
// shimmer with heat, and a drawn halo of warmth blooms outward and fades
const coreVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity },
  },
};

const raysVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    rotate: [0, 6, -6, 0],
    scale: [1, 1.06, 1],
    transition: { duration: 2.2, ease: 'easeInOut', repeat: Infinity },
  },
};

const haloVariants: Variants = {
  normal: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  animate: {
    opacity: [0, 0.5, 0],
    scale: [0.9, 1.5],
    transition: { duration: 1.6, ease: 'easeOut', repeat: Infinity },
  },
};`,
    els: {
      0: { v: 'coreVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'raysVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
    extra: `
          <motion.circle
            cx="12"
            cy="12"
            r="6"
            stroke="currentColor"
            strokeWidth="1"
            variants={haloVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />`,
  },
  {
    export: 'Moon02Icon',
    defs: `
// the moon doesn't rock — it glows, and stars blink awake in the patch of
// sky its crescent opens onto
const svgVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const starVariants: Variants = {
  normal: { opacity: 0, scale: 0.4, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0.3, 1, 0],
    scale: [0.4, 1, 0.8, 1, 0.4],
    transition: {
      duration: 1.8,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.6,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    extra: `
          <motion.path
            d="M17.5 4.2V6.2M16.5 5.2H18.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1"
            variants={starVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '17.5px 5.2px' }}
          />
          <motion.circle
            cx="14.5"
            cy="8.5"
            r="0.6"
            fill="currentColor"
            variants={starVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '14.5px 8.5px' }}
          />`,
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
// a message arrives — the bubble unfurls from its speech-tail, then the
// reply writes itself in on top of it
const bubbleVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [0.85, 1.04, 1],
    transition: { duration: 0.4, ease: 'easeOut', times: [0, 0.7, 1] },
  },
};

const textVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.3 },
  },
};`,
    els: {
      0: { v: 'textVariants' },
      1: {
        v: 'bubbleVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: '10% 97%' }`,
      },
    },
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
// tucked in — the ribbon dips past the binding line, which pinches as it
// slides through, then the ribbon settles back proud
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, 2.2, -0.8, 0],
    rotate: [0, 3, -1, 0],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.4, 0.72, 1] },
  },
};

const foldVariants: Variants = {
  normal: { scaleX: 1, translateY: 0 },
  animate: {
    scaleX: [1, 0.82, 1],
    translateY: [0, 0.8, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.5, 1], delay: 0.12 },
  },
};`,
    svg: 'svgVariants',
    els: {
      1: {
        v: 'foldVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: '50% 50%' }`,
      },
    },
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
    scale: [1, 1.08, 1],
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
// the thumb flicks up from the fist's actual hinge — a decisive nod, not
// a whole-icon wave; the fist takes a small compressive reaction
const thumbVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -20, 6, -10, 3, 0],
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
      times: [0, 0.22, 0.48, 0.66, 0.84, 1],
    },
  },
};

const fistVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1, 1.05, 1],
    transition: { duration: 0.75, ease: 'easeOut', times: [0, 0.22, 0.4, 0.7] },
  },
};`,
    els: {
      0: { v: 'fistVariants', style: `{ transformOrigin: '4.5px 15.5px' }` },
      1: { v: 'thumbVariants', style: `{ transformOrigin: '7px 15px' }` },
    },
  },

  // ── drawn-signature batch 2 ─────────────────────────────────────────────
  {
    export: 'Coffee02Icon',
    defs: `
// while you hover, the cup stays hot. The icon's own steam is one path
// with three lockstep subpaths, so on hover it hands off to three
// independent wisps that each rise on their own clock.
const steamBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  animate: { opacity: 0, transition: { duration: 0.15 } },
};

const steamVariants: Variants = {
  normal: { opacity: 0, translateY: 0, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    translateY: [0.8, -0.5, i === 1 ? -2.2 : -1.6, i === 1 ? -3.6 : -2.6],
    transition: {
      duration: 1.3 + i * 0.25,
      ease: 'easeOut',
      times: [0, 0.25, 0.7, 1],
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};`,
    els: { 2: { v: 'steamBaseVariants' } },
    extra: `
          <motion.path
            d="M7.53971 4C7.53971 4 7 4.5 7 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M11.3089 2.5C10.7622 2.83861 10.0012 4 10.0012 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.0012 4C13.7279 4.1693 13.5 5 13.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'UmbrellaIcon',
    defs: `
// while you hover, it rains. Drawn drops fall from above and die on the
// canopy; the umbrella sways gently under them.
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -2.5, 2, -1, 0],
    transition: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
  },
};

const dropVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    translateY: [0, 3, 6.5, 8.5],
    transition: {
      duration: 0.9,
      ease: 'easeIn',
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 14px' }`,
    extra: `
          <motion.path
            d="M5.5 -2.5V-0.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M12 -4V-2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.5 -2.5V-0.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={dropVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'Location01Icon',
    defs: `
// the pin lifts, drops back onto the map, and the landing draws a ripple
const svgVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -5, 0, -1.6, 0],
    transition: {
      duration: 0.85,
      times: [0, 0.32, 0.6, 0.8, 1],
      ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn'],
    },
  },
};

// drawn landing ring — invisible at rest, spreads at the moment of touchdown
const rippleVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.2 } },
  animate: {
    opacity: [0, 0.5, 0],
    scale: [0.4, 1.2, 1.7],
    transition: { duration: 0.55, ease: 'easeOut', delay: 0.48 },
  },
};`,
    svg: 'svgVariants',
    extra: `
          <motion.ellipse
            cx="12"
            cy="21.7"
            rx="3.5"
            ry="1"
            stroke="currentColor"
            strokeWidth="1"
            variants={rippleVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 21.7px' }}
          />`,
  },
  {
    export: 'Mic01Icon',
    defs: `
// while you hover, it's live — the grille lines flicker like an input
// meter, and drawn sound arcs broadcast off both sides
const grilleVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.2 } },
  animate: {
    opacity: [1, 0.3, 1, 0.5, 1],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  },
};

// custom: [direction, delay] — arcs drift outward as they fade
const waveVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (c: [number, number]) => ({
    opacity: [0, 1, 0],
    translateX: [0, c[0] * 1.6],
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      repeat: Infinity,
      delay: c[1],
    },
  }),
};`,
    els: { 1: { v: 'grilleVariants' } },
    extra: `
          <motion.path
            d="M4.8 3.2C3.9 4.4 3.4 5.9 3.4 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[-1, 0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M19.2 3.2C20.1 4.4 20.6 5.9 20.6 7.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[1, 0]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2.6 1.4C1.5 2.9 0.9 4.9 0.9 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[-1, 0.35]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21.4 1.4C22.5 2.9 23.1 4.9 23.1 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={waveVariants}
            custom={[1, 0.35]}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'BulbIcon',
    defs: `
// the light turns on: the filament draws itself, the bulb pops, and drawn
// rays burst outward and hold their glow while you hover
const svgVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const filamentVariants: Variants = {
  normal: { pathLength: 1, transition: { duration: 0.3 } },
  animate: {
    pathLength: [0, 1],
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

// rays scale up from the view center, so they read as bursting off the glass
const rayVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0.75, 1],
    scale: [0.4, 1.15, 1, 1],
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      times: [0, 0.4, 0.7, 1],
      delay: 0.12 + i * 0.05,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: { 1: { v: 'filamentVariants' } },
    extra: `
          <motion.path
            d="M12 0.2V-1.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M6.3 4.2L5 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M17.7 4.2L19 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M3.4 9.9H1.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={3}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />
          <motion.path
            d="M20.6 9.9H22.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={4}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 10px' }}
          />`,
  },
  {
    export: 'MagicWand01Icon',
    defs: `
// a flick of the wrist, and the magic keeps happening — the built-in stars
// twinkle in turn while drawn mini-sparkles pop in the empty corners
const wandVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -14, 8, 0],
    transition: { duration: 0.7, ease: 'easeInOut', times: [0, 0.3, 0.6, 1] },
  },
};

const starVariants: Variants = {
  normal: { scale: 1, rotate: 0, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    scale: [1, 0.3, 1.3, 1],
    rotate: [0, 45, 90, 90],
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.4,
    },
  }),
};

const sparkleVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.4, 1, 0.6],
    transition: {
      duration: 1.1,
      ease: 'easeOut',
      repeat: Infinity,
      delay: 0.2 + i * 0.5,
    },
  }),
};`,
    els: {
      0: { v: 'wandVariants', style: `{ transformOrigin: '20px 21px' }` },
      1: { v: 'starVariants', custom: 0, style: `{ transformOrigin: '17px 6px' }` },
      2: { v: 'starVariants', custom: 1, style: `{ transformOrigin: '6px 7px' }` },
    },
    extra: `
          <motion.path
            d="M3.5 15.5V17.5M2.5 16.5H4.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkleVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '3.5px 16.5px' }}
          />
          <motion.path
            d="M21 10.5V12.5M20 11.5H22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkleVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '21px 11.5px' }}
          />`,
  },
  {
    export: 'AlarmClockIcon',
    defs: `
// while you hover, the alarm is going off — the whole clock rattles on its
// feet and drawn ring ticks flash beside the bells
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -7, 6, -5, 4, -2, 0],
    transition: { duration: 0.6, ease: 'easeInOut', repeat: Infinity },
  },
};

const tickVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.15,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 13px' }`,
    extra: `
          <motion.path
            d="M1.5 3.5L0.3 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22.5 3.5L23.7 2.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3.4 0.8L2.5 -0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20.6 0.8L21.5 -0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={tickVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'CloudRainIcon',
    defs: `
// while you hover, the shower keeps falling — each drop accelerates,
// dies low, and is reborn above; the cloud drifts on the updraft
const cloudVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -0.7, 0],
    transition: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
  },
};

const dropVariants: Variants = {
  normal: { opacity: 1, translateY: 0, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [-1.5, 1, 3.5],
    transition: {
      duration: 0.9,
      ease: 'easeIn',
      repeat: Infinity,
      delay: i * 0.28,
    },
  }),
};`,
    els: {
      0: { v: 'cloudVariants' },
      1: { v: 'dropVariants', custom: 0 },
      2: { v: 'dropVariants', custom: 1 },
      3: { v: 'dropVariants', custom: 2 },
    },
  },
  {
    export: 'Target01Icon',
    defs: `
// the dart pulls back along its own line, strikes home, and the rings
// flinch outward from the impact — a drawn shockwave carries it
const dartVariants: Variants = {
  normal: { translateX: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateX: [0, 2.4, 2.4, 0],
    translateY: [0, -2.4, -2.4, 0],
    transition: {
      duration: 1,
      times: [0, 0.3, 0.45, 0.58],
      ease: ['easeOut', 'linear', 'easeIn'],
    },
  },
};

const ringVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    scale: [1, 1, i === 0 ? 1.05 : 1.1, 1],
    transition: { duration: 1, times: [0, 0.58, 0.72, 0.95], ease: 'easeOut' },
  }),
};

const shockVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.2 } },
  animate: {
    opacity: [0, 0, 0.7, 0],
    scale: [0.5, 0.5, 1.6, 2.3],
    transition: { duration: 1, times: [0, 0.56, 0.75, 1], ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'ringVariants', custom: 0, style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'ringVariants', custom: 1, style: `{ transformOrigin: '12px 12px' }` },
      2: { v: 'dartVariants' },
    },
    extra: `
          <motion.circle
            cx="12"
            cy="12"
            r="2"
            stroke="currentColor"
            strokeWidth="1"
            variants={shockVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />`,
  },
  {
    export: 'SmileIcon',
    defs: `
// recognition: a small head tilt, the smile widens, and it blinks —
// the eyes are drawn shut and open again via scaleY at their own height
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -6, -6, 0],
    transition: { duration: 1.1, ease: 'easeInOut', times: [0, 0.25, 0.75, 1] },
  },
};

const mouthVariants: Variants = {
  normal: {
    d: 'M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    d: 'M7.6 14.6C8.7 16.6 10.3 17.7 12 17.7C13.7 17.7 15.3 16.6 16.4 14.6',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const eyeVariants: Variants = {
  normal: { scaleY: 1, transition: { duration: 0.2 } },
  animate: {
    scaleY: [1, 0.15, 1, 1, 0.15, 1],
    transition: {
      duration: 1.1,
      times: [0, 0.12, 0.24, 0.5, 0.62, 0.74],
      ease: 'easeInOut',
    },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: {
      1: { v: 'mouthVariants' },
      2: { v: 'eyeVariants', style: `{ transformOrigin: '12px 8.7px' }` },
    },
  },

  // ── drawn-signature batch 3 ─────────────────────────────────────────────
  {
    export: 'GhostIcon',
    defs: `
// while you hover, it haunts — a weightless bob with shifty eyes that
// glance one way, then the other
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -1.8, 0],
    rotate: [0, -3, 3, 0],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const eyeVariants: Variants = {
  normal: { translateX: 0, transition: { duration: 0.3 } },
  animate: {
    translateX: [0, -0.9, -0.9, 0.9, 0.9, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.15, 0.4, 0.55, 0.85, 1],
      repeat: Infinity,
    },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: { 1: { v: 'eyeVariants' }, 2: { v: 'eyeVariants' } },
  },
  {
    export: 'ShoppingCart01Icon',
    defs: `
// while you hover, the cart is mid-dash — rattling over the floor while
// drawn speed lines whip past behind it
const svgVariants: Variants = {
  normal: { rotate: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -1.6, 1.2, -0.8, 0],
    translateY: [0, -0.5, 0, -0.3, 0],
    transition: { duration: 0.55, ease: 'easeInOut', repeat: Infinity },
  },
};

// the groceries bounce a beat behind the chassis
const itemsVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, -0.9, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: 0.08,
    },
  },
};

const speedVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateX: [2, -2.5],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.22,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 18px' }`,
    els: { 3: { v: 'itemsVariants' } },
    extra: `
          <motion.path
            d="M-2 9.5H0.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={speedVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M-2 13.5H-0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={speedVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'Key01Icon',
    defs: `
// the key turns in an unseen lock, holds against the pins, and springs
// back — drawn click ticks flash at the moment it gives
const keyVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -40, -40, 6, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.3, 0.5, 0.78, 1],
    },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3 } },
  animate: {
    opacity: [1, 0.2, 0.2, 1],
    transition: { duration: 0.9, times: [0, 0.3, 0.6, 0.85] },
  },
};

const clickVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: {
    opacity: [0, 0, 1, 0],
    transition: { duration: 0.9, times: [0, 0.5, 0.62, 0.85], ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'keyVariants', style: `{ transformOrigin: '15.5px 8.5px' }` },
      1: { v: 'glintVariants' },
    },
    extra: `
          <motion.path
            d="M22.6 4.6L23.6 3.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={clickVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M23.2 8.5H24.6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={clickVariants}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'CrownIcon',
    defs: `
// a real bow: the crown dips with the weight of ceremony, then lifts and
// tips forward as it's raised — anticipation before the presentation.
// The jewel gleams and drawn glints twinkle over the points.
const svgVariants: Variants = {
  normal: { translateY: 0, rotate: 0, scale: 1, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, 1.4, -2.6, -1.6, 0],
    rotate: [0, 3, -4, 1.5, 0],
    scale: [1, 0.97, 1.06, 1.02, 1],
    transition: {
      duration: 0.85,
      ease: 'easeInOut',
      times: [0, 0.22, 0.58, 0.8, 1],
    },
  },
};

const jewelVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.7, 1],
    transition: { duration: 1.2, ease: 'easeInOut', repeat: Infinity },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.4, 1, 0.6],
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      repeat: Infinity,
      delay: 0.15 + i * 0.55,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 21px' }`,
    els: {
      1: { v: 'jewelVariants', style: `{ transformOrigin: '12px 12.75px' }` },
    },
    extra: `
          <motion.path
            d="M5.5 0.2V2M4.6 1.1H6.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '5.5px 1.1px' }}
          />
          <motion.path
            d="M18.5 -0.5V1.3M17.6 0.4H19.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18.5px 0.4px' }}
          />`,
  },
  {
    export: 'Diamond02Icon',
    defs: `
// brilliance — the stone rocks to catch the light and drawn glints
// flash off its corners in turn
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -4, 4, 0],
    transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity },
  },
};

const glintVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.4, 1.05, 0.5],
    transition: {
      duration: 1.6,
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.55,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    extra: `
          <motion.path
            d="M3.4 4.5V6.5M2.4 5.5H4.4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '3.4px 5.5px' }}
          />
          <motion.path
            d="M21 11.5V13.5M20 12.5H22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '21px 12.5px' }}
          />
          <motion.path
            d="M6.5 20V21.6M5.7 20.8H7.3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glintVariants}
            custom={2}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '6.5px 20.8px' }}
          />`,
  },
  {
    export: 'Leaf01Icon',
    defs: `
// while you hover, the breeze holds — the leaf sways from its stem and
// drawn wind lines drift through the gap it leans away from
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.4 } },
  animate: {
    rotate: [0, 7, -2, 5, 0],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const windVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateX: [-3, 2.5],
    transition: {
      duration: 1,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.45,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '3px 21px' }`,
    extra: `
          <motion.path
            d="M2 3H6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={windVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M1 6H4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={windVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'CompassIcon',
    defs: `
// finding north: the needle whips a full turn, overshoots, and settles
// with a navigator's confidence
const needleVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.4 } },
  animate: {
    rotate: [0, 150, 340, 375, 360],
    transition: {
      duration: 1.4,
      ease: 'easeInOut',
      times: [0, 0.3, 0.62, 0.82, 1],
    },
  },
};`,
    els: {
      3: { v: 'needleVariants', style: `{ transformOrigin: '12px 13px' }` },
    },
  },
  {
    export: 'PaintBrush02Icon',
    defs: `
// the brush swipes from the wrist and leaves a drawn stroke of paint
// behind on the ground it just crossed
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -12, 8, -4, 0],
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
      times: [0, 0.25, 0.55, 0.8, 1],
    },
  },
};

const strokeVariants: Variants = {
  normal: { pathLength: 0, opacity: 0, transition: { duration: 0.3 } },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.15 },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '13.5px 21px' }`,
    extra: `
          <motion.path
            d="M5.5 23.8C8.5 22.6 15.5 22.6 18.5 23.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={strokeVariants}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'Bug01Icon',
    defs: `
// while you hover, it's alive — the body scuttles in place and the
// antennae feel around, each on its own beat
const svgVariants: Variants = {
  normal: { translateX: 0, transition: { duration: 0.3 } },
  animate: {
    translateX: [0, 0.9, -0.9, 0.6, -0.6, 0],
    transition: { duration: 0.55, ease: 'easeInOut', repeat: Infinity },
  },
};

const antennaVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    rotate: [0, i * 16, 0, i * 9, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i === 1 ? 0.2 : 0,
    },
  }),
};

// legs scrabble in an alternating tripod gait, synced to the body shiver.
// custom: [rotation amplitude, phase delay]
const legVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: (c: [number, number]) => ({
    rotate: [0, c[0], -c[0] * 0.5, 0],
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: c[1],
    },
  }),
};`,
    svg: 'svgVariants',
    els: {
      0: {
        v: 'antennaVariants',
        custom: -1,
        style: `{ transformOrigin: '6.5px 8.4px' }`,
      },
      1: {
        v: 'antennaVariants',
        custom: 1,
        style: `{ transformOrigin: '17.6px 8.4px' }`,
      },
      2: {
        v: 'legVariants',
        custom: [16, 0.12],
        style: `{ transformOrigin: '17.6px 17.4px' }`,
      },
      3: {
        v: 'legVariants',
        custom: [-16, 0],
        style: `{ transformOrigin: '6.45px 17.47px' }`,
      },
      5: {
        v: 'legVariants',
        custom: [-22, 0],
        style: `{ transformOrigin: '5.95px 12.9px' }`,
      },
      6: {
        v: 'legVariants',
        custom: [22, 0.12],
        style: `{ transformOrigin: '18.12px 12.9px' }`,
      },
      7: {
        v: 'legVariants',
        custom: [14, 0.06],
        style: `{ transformOrigin: '12px 16.5px' }`,
      },
    },
  },
  {
    export: 'BatteryCharging01Icon',
    defs: `
// while you hover, it's plugged in — the bolt pulses with each surge and
// drawn charge sparks float up off the terminal
const boltVariants: Variants = {
  normal: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.55, 1],
    transition: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
  },
};

const sparkVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [1.5, -2.5],
    transition: {
      duration: 1.1,
      ease: 'easeOut',
      repeat: Infinity,
      delay: i * 0.45,
    },
  }),
};`,
    els: {
      1: { v: 'boltVariants', style: `{ transformOrigin: '10.2px 12px' }` },
    },
    extra: `
          <motion.path
            d="M23 7.5V9.5M22 8.5H24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M23.5 12.5V14.5M22.5 13.5H24.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={sparkVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'SleepingIcon',
    defs: `
// deep sleep — the big Z drifts off and is reborn, a drawn little z
// trails higher, and the mouth puffs with each snore
const zVariants: Variants = {
  normal: { opacity: 1, translateX: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    opacity: [1, 1, 0, 0, 1],
    translateY: [0, -2, -3.2, 0, 0],
    translateX: [0, 0.8, 1.4, 0, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.5, 0.68, 0.7, 1],
      repeat: Infinity,
    },
  },
};

const littleZVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: {
    opacity: [0, 1, 0],
    translateY: [1.5, -2.5],
    translateX: [0, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity, delay: 0.6 },
  },
};

const snoreVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};`,
    els: {
      2: { v: 'snoreVariants', style: `{ transformOrigin: '12px 16px' }` },
      3: { v: 'zVariants' },
    },
    extra: `
          <motion.path
            d="M13 0.5H15.2L13 2.7H15.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={littleZVariants}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'PrinterIcon',
    defs: `
// while you hover, it prints — the page feeds out in stepped advances
// like a real printer, and the status light blinks busy
const paperVariants: Variants = {
  normal: { translateY: 0, opacity: 1, transition: { duration: 0.3 } },
  animate: {
    translateY: [0, 1, 1, 2, 2, 3],
    opacity: [1, 1, 1, 1, 1, 0],
    transition: {
      duration: 1.2,
      ease: 'linear',
      times: [0, 0.2, 0.4, 0.6, 0.78, 1],
      repeat: Infinity,
    },
  },
};

const lightVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3 } },
  animate: {
    opacity: [1, 0.2, 1],
    transition: { duration: 0.6, ease: 'easeInOut', repeat: Infinity },
  },
};`,
    els: {
      2: { v: 'paperVariants' },
      3: { v: 'lightVariants' },
    },
  },
];
