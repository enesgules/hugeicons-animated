// Hand-crafted animation specs — this file IS the design work.
// defs: Variants consts injected into the component.
// svg: variants const applied to the <svg> root. els: per-element variants by index.
//
// Design language:
// - name the verb first and decide whether the motion is productive (the
//   default) or expressive; animate only the part that communicates the action
// - keep the same SVG primitives mounted through every pose; transform their
//   geometry instead of swapping or crossfading whole icons
// - same-shape poses share coordinates and rotate as a group; if a pose needs
//   fewer primitives, collapse the unused ones to a point instead of removing
//   them
// - morph path data only when every pose has compatible commands; set explicit
//   transform origins for SVG elements and groups
// - animation-only rays, trails, echoes, particles, squash, stretch, and
//   wobble are expressive tools, not defaults; use them only when they clarify
//   the action at icon size and keep added geometry hidden at rest
// - hide travel with clipping or occlusion, not a fade
// - related states share geometry; rotated siblings keep the same shape
// - prefer one short, finite cycle; repeat: Infinity is reserved for a real
//   ongoing condition and must exit cleanly through 'normal' when it ends
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
// a launch and softer echo — the shaft follows the head and never disconnects
const shaftVariants: Variants = {
  normal: { d: 'M18.5 12L4.99997 12' },
  animate: {
    d: [
      'M18.5 12L4.99997 12',
      'M20.5 12L9.5 12',
      'M18.5 12L4.99997 12',
      'M19.3 12L7.5 12',
      'M18.5 12L4.99997 12',
    ],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(2px)', 'translateX(0px)', 'translateX(0.8px)', 'translateX(0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
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
    transition: { type: 'spring', duration: 0.6, bounce: 0 },
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
// a loading glyph is a wheel, so keep every spoke visible and rotate the set
const loaderVariants: Variants = {
  normal: { transform: 'rotate(0deg)', transition: { duration: 0.18 } },
  animate: {
    transform: 'rotate(360deg)',
    transition: { duration: 0.82, ease: 'linear', repeat: Infinity },
  },
};`,
    svg: 'loaderVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
  },
  {
    export: 'Search01Icon',
    defs: `
// the magnifier sweeps as one rigid tool, keeping the handle joined to the lens
const svgVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(-1.4px, 1px) rotate(-7deg)',
      'translate(1.2px, -0.8px) rotate(5deg)',
      'translate(-0.25px, 0.15px) rotate(-1deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: { duration: 0.62, ease: [0.77, 0, 0.175, 1], times: [0, 0.26, 0.56, 0.8, 1] },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '11px 11px' }`,
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
// the three rows reflow like a menu being scanned, without turning into another icon
const menuLineVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1)' },
  animate: (i: number) => ({
    transform: [
      'translateX(0px) scaleX(1)',
      i === 1 ? 'translateX(-0.9px) scaleX(1.08)' : 'translateX(0.9px) scaleX(0.9)',
      i === 1 ? 'translateX(0.25px) scaleX(0.98)' : 'translateX(-0.2px) scaleX(1.025)',
      'translateX(0px) scaleX(1)',
    ],
    transition: { duration: 0.46, delay: i * 0.055, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'menuLineVariants', custom: 0, style: `{ transformOrigin: '12px 5px' }` },
      1: { v: 'menuLineVariants', custom: 1, style: `{ transformOrigin: '12px 12px' }` },
      2: { v: 'menuLineVariants', custom: 2, style: `{ transformOrigin: '12px 19px' }` },
    },
  },
  {
    export: 'Copy01Icon',
    defs: `
// the front sheet stays anchored while the rear copy redraws behind it
const frontVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.975)', 'scale(1.01)', 'scale(1)'],
    transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] },
  },
};

const backVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0.15, 1],
    opacity: [0.35, 1],
    transition: { duration: 0.48, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
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
// new mail arrives: the envelope drops in and lands, and the flap fold
// redraws over it as it seals
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
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'flapVariants' } },
  },
  {
    export: 'StarIcon',
    defs: `
// catching the light, drawn by hand: the star's own points stretch out
// and settle through redrawn poses — no added elements, one clean beat
const STAR_REST =
  'M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z';
const STAR_STRETCH =
  'M13.745 3.356L15.204 7.409C15.392 7.903 15.987 8.322 16.538 8.357L20.176 8.551C22.877 8.696 23.439 10.289 21.339 11.888L18.321 14.274C17.871 14.653 17.689 15.441 17.901 16.053L19.192 19.665C20.362 22.993 18.923 24.087 16.198 21.947L12.955 19.397C12.427 18.992 11.578 18.992 11.041 19.397L7.796 21.949C5.082 24.087 3.632 22.980 4.801 19.666L6.093 16.054C6.306 15.442 6.123 14.654 5.673 14.275L2.654 11.888C0.567 10.289 1.115 8.695 3.817 8.550L7.457 8.356C7.998 8.320 8.594 7.901 8.782 7.407L10.240 3.355C11.161 0.744 12.834 0.744 13.745 3.356Z';
const STAR_GLIMMER =
  'M13.735 3.407L15.377 7.155C15.597 7.649 16.220 8.101 16.764 8.170L20.130 8.571C22.450 8.830 22.964 10.365 21.228 11.891L18.532 14.347C18.101 14.753 17.890 15.558 18.051 16.154L18.999 19.462C19.817 22.283 18.464 23.293 16.071 21.649L12.975 19.549C12.440 19.194 11.566 19.194 11.021 19.549L7.924 21.649C5.542 23.293 4.178 22.272 4.996 19.462L5.944 16.154C6.106 15.558 5.894 14.753 5.463 14.347L2.766 11.890C1.041 10.365 1.544 8.830 3.864 8.571L7.232 8.170C7.766 8.101 8.389 7.648 8.608 7.154L10.250 3.406C11.194 1.191 12.802 1.191 13.735 3.407Z';

const starVariants: Variants = {
  normal: { d: STAR_REST, transition: { duration: 0.25, ease: 'easeOut' } },
  animate: {
    d: [STAR_REST, STAR_STRETCH, STAR_REST, STAR_GLIMMER, STAR_REST],
    transition: { duration: 0.6, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.8, 1] },
  },
};`,
    els: { 0: { v: 'starVariants' } },
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
// a mark stamping into place: the combined glyph hands off to two
// hand-drawn strokes that each overshoot long, pinch short, and settle
const plusBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.2, delay: 0.05 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};

const stemVariants: Variants = {
  normal: { d: 'M12 4V20', opacity: 0, transition: { duration: 0.15 } },
  animate: {
    d: ['M12 4V20', 'M12 2.6V21.4', 'M12 4.6V19.4', 'M12 4V20'],
    opacity: 1,
    transition: {
      opacity: { duration: 0.08 },
      d: { duration: 0.5, ease: 'easeInOut', times: [0, 0.32, 0.68, 1] },
    },
  },
};

const armVariants: Variants = {
  normal: { d: 'M20 12H4', opacity: 0, transition: { duration: 0.15 } },
  animate: {
    d: ['M20 12H4', 'M21.4 12H2.6', 'M19.4 12H4.6', 'M20 12H4'],
    opacity: 1,
    transition: {
      opacity: { duration: 0.08 },
      d: { duration: 0.5, ease: 'easeInOut', times: [0, 0.32, 0.68, 1], delay: 0.05 },
    },
  },
};`,
    els: { 0: { v: 'plusBaseVariants' } },
    extra: `
          <motion.path
            d="M12 4V20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={stemVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M20 12H4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={armVariants}
            animate={controls}
            initial="normal"
          />`,
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
      'M3.5 12.002H14.5',
      'M5.5 12.002H19',
      'M4.7 12.002H16.5',
      'M5.5 12.002H19',
    ],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-2px)', 'translateX(0px)', 'translateX(-0.8px)', 'translateX(0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
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
      'M12 3.5V14.5',
      'M12 5.5V19',
      'M12 4.7V16.5',
      'M12 5.5V19',
    ],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-2px)', 'translateY(0px)', 'translateY(-0.8px)', 'translateY(0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
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
      'M12 20.502V9.5',
      'M12 18.502V5.00195',
      'M12 19.302V7.5',
      'M12 18.502V5.00195',
    ],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(2px)', 'translateY(0px)', 'translateY(0.8px)', 'translateY(0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
  },
};`,
    els: { 0: { v: 'shaftVariants' }, 1: { v: 'headVariants' } },
  },
  {
    export: 'RefreshIcon',
    defs: `
// rewinds slightly, then whips a full revolution; 360 ≡ 0 so the reset is
// invisible. Exit eases briefly instead of snapping mid-spin.
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.15, ease: 'easeOut' } },
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
// the binder responds once, then each date appears in reading order
const ringsVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1.1px)', 'translateY(0.25px)', 'translateY(0px)'],
    transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] },
  },
};

const sourceDaysVariants: Variants = {
  normal: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};

const dayVariants: Variants = {
  normal: { opacity: 0, transform: 'scale(0.9)' },
  animate: (i: number) => ({
    opacity: [0, 1, 1],
    transform: ['scale(0.9)', 'scale(1.16)', 'scale(1)'],
    transition: { duration: 0.3, delay: 0.08 + i * 0.065, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: { 0: { v: 'ringsVariants' }, 3: { v: 'sourceDaysVariants' } },
    extra: `
          ${[
            [7.5, 14],
            [12, 14],
            [16.5, 14],
            [7.5, 18],
            [12, 18],
          ]
            .map(
              ([cx, cy], i) => `<motion.circle cx="${cx}" cy="${cy}" r="0.72" fill="currentColor" variants={dayVariants} custom={${i}} animate={controls} initial="normal" style={{ transformOrigin: '${cx}px ${cy}px' }} />`
            )
            .join('\n          ')}`,
  },
  {
    export: 'Link01Icon',
    defs: `
// the complete chain flexes as one object, preserving the overlap geometry
const linkVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(0deg) scale(1)', 'rotate(-3deg) scale(0.97)', 'rotate(2deg) scale(1.02)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    svg: 'linkVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
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
      0: {
        v: 'pencilVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '2px 21px' }`,
      },
      1: {
        v: 'pencilVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '2px 21px' }`,
      },
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
// a bright solar breath: the core gathers energy, the rays burst outward,
// and both settle into a gentle living shimmer instead of a slow wobble
const coreVariants: Variants = {
  normal: { transform: 'scale(1)', transition: { duration: 0.2, ease: 'easeOut' } },
  animate: {
    transform: ['scale(1)', 'scale(0.9)', 'scale(1.16)', 'scale(1.02)', 'scale(1)'],
    transition: {
      duration: 1.15,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.12, 0.32, 0.58, 1],
      repeat: Infinity,
      repeatDelay: 0.18,
    },
  },
};

const raysVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)', transition: { duration: 0.2, ease: 'easeOut' } },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-7deg) scale(0.82)',
      'rotate(5deg) scale(1.18)',
      'rotate(-2deg) scale(1.04)',
      'rotate(0deg) scale(1)',
    ],
    opacity: [1, 0.62, 1, 0.9, 1],
    transition: {
      duration: 1.15,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.12, 0.34, 0.62, 1],
      repeat: Infinity,
      repeatDelay: 0.18,
    },
  },
};

`,
    els: {
      0: { v: 'coreVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'raysVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
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
// the cloud floats and gently changes volume instead of only translating
const svgVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scaleX(1) scaleY(1)',
      'translate(1.5px, -1px) scaleX(1.04) scaleY(0.98)',
      'translate(-1.2px, 0.2px) scaleX(0.985) scaleY(1.025)',
      'translate(0px, 0px) scaleX(1) scaleY(1)',
    ],
    transition: { duration: 1.7, ease: 'easeInOut', repeat: Infinity },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 14px' }`,
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
      0: {
        v: 'smallNoteVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: 'center' }`,
      },
      1: {
        v: 'headLeftVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: 'center' }`,
      },
      2: {
        v: 'headRightVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: 'center' }`,
      },
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
// the ribbon catches at the binding and lands with a visible saved-state fold
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(2.4px) scaleY(0.9)', 'translateY(-0.8px) scaleY(1.05)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1] },
  },
};

const foldVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(1.4px)', 'translateY(-0.2px)', 'translateY(0px)'],
    transition: { duration: 0.48, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
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
// the hour hand stays planted while only the minute hand advances
const CLOCK_REST = 'M12 8V12L14 14';

const handsVariants: Variants = {
  normal: { d: CLOCK_REST },
  animate: {
    d: [
      CLOCK_REST,
      'M12 8V12L12 14.828',
      'M12 8V12L10 14',
      'M12 8V12L9.172 12',
      'M12 8V12L10 10',
      'M12 8V12L12 9.172',
      'M12 8V12L14 10',
      'M12 8V12L14.828 12',
      CLOCK_REST,
    ],
    transition: {
      duration: 0.92,
      ease: 'linear',
      times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    },
  },
};`,
    els: { 1: { v: 'handsVariants' } },
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
// the signal physically expands from its source; opacity only supports the motion
const arcVariants: Variants = {
  normal: { opacity: 1, transform: 'translateY(0px) scale(1)', transition: { duration: 0.22 } },
  animate: (i: number) => ({
    opacity: [0.22, 1, 0.42],
    transform: [
      'translateY(0.8px) scale(0.82)',
      'translateY(0px) scale(1.06)',
      'translateY(0px) scale(1)',
    ],
    transition: {
      duration: 0.95,
      ease: [0.23, 1, 0.32, 1],
      repeat: Infinity,
      repeatDelay: 0.08,
      delay: i * 0.12,
    },
  }),
};

const sourceVariants: Variants = {
  normal: { transform: 'scale(1)', transition: { duration: 0.2 } },
  animate: {
    transform: ['scale(1)', 'scale(0.86)', 'scale(1.18)', 'scale(1)'],
    transition: { duration: 0.95, ease: [0.23, 1, 0.32, 1], repeat: Infinity, repeatDelay: 0.08 },
  },
};`,
    els: {
      0: { v: 'arcVariants', custom: 0, style: `{ transformOrigin: '12px 18px' }` },
      1: { v: 'arcVariants', custom: 1, style: `{ transformOrigin: '12px 18px' }` },
      2: { v: 'arcVariants', custom: 2, style: `{ transformOrigin: '12px 18px' }` },
      3: { v: 'sourceVariants', style: `{ transformOrigin: '12px 18px' }` },
    },
  },
  {
    export: 'VolumeHighIcon',
    defs: `
// sound pressure expands away from the speaker instead of blinking in place
const speakerVariants: Variants = {
  normal: { transform: 'scale(1)', transition: { duration: 0.22 } },
  animate: {
    transform: ['scale(1)', 'scale(0.97)', 'scale(1.055)', 'scale(1)'],
    transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1], repeat: Infinity, repeatDelay: 0.08 },
  },
};

const waveVariants: Variants = {
  normal: { opacity: 1, transform: 'translateX(0px) scale(1)', transition: { duration: 0.22 } },
  animate: (i: number) => ({
    opacity: [0.2, 1, 0.4],
    transform: [
      'translateX(-0.6px) scale(0.82)',
      'translateX(0px) scale(1.06)',
      'translateX(0px) scale(1)',
    ],
    transition: {
      duration: 0.9,
      ease: [0.23, 1, 0.32, 1],
      repeat: Infinity,
      repeatDelay: 0.08,
      delay: i * 0.14,
    },
  }),
};`,
    els: {
      0: { v: 'speakerVariants', style: `{ transformOrigin: '8px 12px' }` },
      1: { v: 'waveVariants', custom: 0, style: `{ transformOrigin: '14px 12px' }` },
      2: { v: 'waveVariants', custom: 1, style: `{ transformOrigin: '14px 12px' }` },
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
};

const exhaustVariants: Variants = {
  normal: { opacity: 0, scale: 0.4, translateX: 0, translateY: 0 },
  animate: (i: number) => ({
    opacity: [0, 0.9, 0],
    scale: [0.35, 1, 0.55],
    translateX: [0, -2.4 - i * 0.6],
    translateY: [0, 2.4 + i * 0.6],
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      delay: 0.08 + i * 0.12,
      repeat: 1,
    },
  }),
};`,
    els: {
      0: { v: 'shipVariants' },
      1: { v: 'streakVariants', custom: 0 },
      2: { v: 'streakVariants', custom: 1 },
      3: { v: 'streakVariants', custom: 2 },
      4: { v: 'shipVariants' },
    },
    extra: `
          <motion.circle
            cx="6.3"
            cy="17.7"
            r="0.7"
            fill="currentColor"
            variants={exhaustVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="8.2"
            cy="15.8"
            r="0.5"
            fill="currentColor"
            variants={exhaustVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />`,
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
// the bolt stores tension, discharges through its own outline, and settles
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-0.8px) scale(0.94)', 'translateY(0.45px) scale(1.12)', 'translateY(-0.12px) scale(0.99)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
  },
};

const boltVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0.2, 1, 1],
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    svg: 'svgVariants',
    els: { 0: { v: 'boltVariants' } },
  },
  {
    export: 'ThumbsUpIcon',
    defs: `
// the complete hand, including its wrist, makes one coherent approval gesture
const handVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: ['translateY(0px) rotate(0deg) scale(1)', 'translateY(-1.4px) rotate(-5deg) scale(1.035)', 'translateY(0.25px) rotate(1.2deg) scale(0.995)', 'translateY(0px) rotate(0deg) scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    svg: 'handVariants',
    svgStyle: `{ transformOrigin: '7px 18px' }`,
  },

  // ── drawn-signature batch 2 ─────────────────────────────────────────────
  {
    export: 'Coffee02Icon',
    defs: `
// preserve Hugeicons' three small resting steam strokes, then hand off to
// three independent S-trails that draw, rise, evaporate, and reset invisibly
const steamBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0 },
};

const steamFlowVariants: Variants = {
  normal: {
    pathLength: 0,
    pathOffset: 0,
    opacity: 0,
    transform: 'translateY(0px)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: (i: number) => {
    const duration = i === 0 ? 1.36 : i === 1 ? 1.74 : 1.52;
    const delay = i === 0 ? 0 : i === 1 ? -0.57 : -0.23;
    const rise = i === 0 ? 1.8 : i === 1 ? 2.2 : 1.6;
    const times =
      i === 0
        ? [0, 0.24, 0.38, 0.72, 0.84, 1]
        : i === 1
          ? [0, 0.3, 0.48, 0.76, 0.9, 1]
          : [0, 0.2, 0.34, 0.66, 0.8, 1];

    return {
      pathLength: [0, 1, 1, 0.18, 0, 0],
      pathOffset: [0, 0, 0, 0.82, 1, 0],
      opacity: [0, 1, 0.9, 0.68, 0, 0],
      transform: [
        'translateY(0px)',
        'translateY(0px)',
        'translateY(' + -rise * 0.12 + 'px)',
        'translateY(' + -rise * 0.72 + 'px)',
        'translateY(' + -rise + 'px)',
        'translateY(0px)',
      ],
      transition: {
        duration,
        delay,
        ease: 'linear',
        times,
        repeat: Infinity,
      },
    };
  },
};`,
    els: { 2: { v: 'steamBaseVariants' } },
    extra: `
          <motion.path
            d="M5.8 6.35C4.1 5.75 4.2 4.65 5.95 4.15C7.5 3.7 7.45 2.55 5.85 2.05C4.45 1.6 4.55 0.75 5.85 0.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamFlowVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M10.3 6.45C8.2 5.75 8.35 4.55 10.45 3.95C12.35 3.4 12.2 2.1 10.25 1.55C8.55 1.05 8.7 0.05 10.4 -0.45"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamFlowVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.8 6.35C16.5 5.75 16.4 4.65 14.65 4.15C13.1 3.7 13.15 2.55 14.75 2.05C16.15 1.6 16.05 0.75 14.75 0.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={steamFlowVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />`,
  },
  {
    export: 'UmbrellaIcon',
    defs: `
// drops reach the canopy and make a small connected splash at contact
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -5, 3.5, -1.5, 0],
    transition: { duration: 1.8, ease: 'easeInOut', repeat: Infinity },
  },
};

const dropVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: [0, 1, 1, 0],
    translateY: [0, 5, 10.5, 14],
    transition: {
      duration: 0.9,
      ease: 'easeIn',
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};

const impactVariants: Variants = {
  normal: { opacity: 0, transform: 'scale(0.3)' },
  animate: (i: number) => ({
    opacity: [0, 0, 0.9, 0],
    transform: ['scale(0.3)', 'scale(0.3)', 'scale(1)', 'scale(1.25)'],
    transition: { duration: 0.9, delay: i * 0.3, times: [0, 0.78, 0.88, 1], ease: [0.23, 1, 0.32, 1], repeat: Infinity },
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
          />
          <motion.path d="M4.5 11.7L5.5 10.9L6.5 11.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" variants={impactVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '5.5px 11.5px' }} />
          <motion.path d="M11 12.8L12 12L13 12.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" variants={impactVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '12px 12.5px' }} />
          <motion.path d="M17.5 11.7L18.5 10.9L19.5 11.7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" variants={impactVariants} custom={2} animate={controls} initial="normal" style={{ transformOrigin: '18.5px 11.5px' }} />`,
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
// while you hover, it's live — the grille bars pulse like an input meter
// and drawn sound arcs broadcast off both sides. The built-in grille (one
// path, two lockstep bars) hides during hover and hands off to two
// independently clocked bars, so the meter doesn't blink as one flat unit.
const grilleBaseVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3, delay: 0.1 } },
  animate: { opacity: 0, transition: { duration: 0.15 } },
};

// pathLength retract from the mic-body edge, like a VU bar
const grilleBarVariants: Variants = {
  normal: { pathLength: 1, opacity: 0, transition: { duration: 0.15 } },
  animate: (i: number) => ({
    opacity: 1,
    pathLength: [1, 0.3, 1],
    transition: {
      duration: 1 + i * 0.2,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.25,
    },
  }),
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
    els: { 1: { v: 'grilleBaseVariants' } },
    extra: `
          <motion.path
            d="M17 7H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={grilleBarVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17 11H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={grilleBarVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
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
// a current climbs the stem, energizes the filament, and flexes the glass
// before five well-spaced rays draw outward
const glassVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1, 1)' },
  animate: {
    transform: [
      'translateY(0px) scale(1, 1)',
      'translateY(0.35px) scale(0.97, 0.94)',
      'translateY(-0.55px) scale(1.045, 1.06)',
      'translateY(0.1px) scale(0.995, 0.99)',
      'translateY(0px) scale(1, 1)',
    ],
    transition: { duration: 0.58, delay: 0.08, ease: [0.23, 1, 0.32, 1], times: [0, 0.24, 0.52, 0.78, 1] },
  },
};

const filamentVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transform: 'scaleX(1)' },
  animate: {
    pathLength: [1, 0.35, 1, 1],
    opacity: [1, 0.45, 1, 1],
    transform: ['scaleX(1)', 'scaleX(0.78)', 'scaleX(1.14)', 'scaleX(1)'],
    transition: { duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 0.62, 1] },
  },
};

const currentVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [1, 0.12, 1, 1],
    opacity: [1, 0.3, 1, 1],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1], times: [0, 0.2, 0.7, 1] },
  },
};

type LightRay = { x: number; y: number; delay: number };

const rayVariants: Variants = {
  normal: ({ x, y }: LightRay) => ({
    opacity: 0,
    pathLength: 0,
    transform: 'translate(' + -x + 'px, ' + -y + 'px)',
  }),
  animate: ({ x, y, delay }: LightRay) => ({
    opacity: [0, 1, 1],
    pathLength: [0, 1, 1],
    transform: [
      'translate(' + -x + 'px, ' + -y + 'px)',
      'translate(0px, 0px)',
      'translate(' + x * 0.18 + 'px, ' + y * 0.18 + 'px)',
    ],
    transition: {
      duration: 0.48,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.68, 1],
      delay: 0.18 + delay,
    },
  }),
};`,
    els: {
      0: { v: 'glassVariants', style: `{ transformOrigin: '12px 14px' }` },
      1: { v: 'filamentVariants', style: `{ transformOrigin: '12px 10.5px' }` },
      4: { v: 'currentVariants' },
    },
    extra: `
          <motion.path
            d="M12 0V-1.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: 0, y: -0.8, delay: 0.08 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M5 2.2L3.7 0.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: -0.55, y: -0.55, delay: 0 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M19 2.2L20.3 0.9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: 0.55, y: -0.55, delay: 0.04 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2 9.8H0.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: -0.75, y: 0, delay: 0.12 }}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M22 9.8H23.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={rayVariants}
            custom={{ x: 0.75, y: 0, delay: 0.16 }}
            animate={controls}
            initial="normal"
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
// the clock rattles while its two existing alarm bells sweep through a broad mirrored arc;
// no additional ringing marks are introduced
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -5, 4, -3, 2, -1, 0],
    transition: { duration: 0.62, ease: [0.77, 0, 0.175, 1], repeat: Infinity },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)', transition: { duration: 0.16 } },
  animate: (direction: number) => ({
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(' + direction * 2.6 + 'px, 0.9px) rotate(' + direction * -9 + 'deg)',
      'translate(' + direction * -0.45 + 'px, -0.25px) rotate(' + direction * 4 + 'deg)',
      'translate(' + direction * 2.1 + 'px, 0.65px) rotate(' + direction * -6 + 'deg)',
      'translate(' + direction * 0.35 + 'px, 0.1px) rotate(' + direction * -1 + 'deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.68,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.2, 0.42, 0.64, 0.82, 1],
      repeat: Infinity,
    },
  }),
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 13px' }`,
    els: {
      3: { v: 'bellVariants', custom: 1, style: `{ transformBox: 'fill-box', transformOrigin: '50% 50%' }` },
      4: { v: 'bellVariants', custom: -1, style: `{ transformBox: 'fill-box', transformOrigin: '50% 50%' }` },
    },
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
// the dart strikes and the inner target ring expands into the next ring
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
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: i === 0
      ? ['scale(1)', 'scale(1)', 'scale(1.06)', 'scale(1)']
      : ['scale(1)', 'scale(1)', 'scale(1.58)', 'scale(1)'],
    transition: { duration: 0.86, times: [0, 0.58, 0.76, 1], ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'ringVariants', custom: 0, style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'ringVariants', custom: 1, style: `{ transformOrigin: '12px 12px' }` },
      2: { v: 'dartVariants' },
    },
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
    transition: {
      duration: 0.55,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.35,
    },
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
      repeatDelay: 0.35,
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
      repeatDelay: 0.35,
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
// the bow, tooth, and keyhole move as one rigid key during insertion
const keyVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(1.2px, -1.2px) rotate(-8deg)',
      'translate(-0.35px, 0.35px) rotate(3deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    svg: 'keyVariants',
    svgStyle: `{ transformOrigin: '15.5px 8.5px' }`,
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
// the gem opens wide enough to read, then its center facet catches up
const svgVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(0deg) scale(1)', 'rotate(-5deg) scale(1.13)', 'rotate(3deg) scale(0.985)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
  },
};

const facetVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.55)', 'scaleX(1.28)', 'scaleX(1)'],
    transition: { duration: 0.5, delay: 0.07, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: { 1: { v: 'facetVariants', style: `{ transformOrigin: '12px 8.5px' }` } },
  },
  {
    export: 'Leaf01Icon',
    defs: `
// while you hover, the breeze holds — the leaf sways from its stem and
// drawn wind lines drift through the gap it leans away from
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.4 } },
  animate: {
    rotate: [0, 6, -5, 0],
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
// the brush tip loads paint, then lays a short stroke directly from the tip
const svgVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-8deg)', 'rotate(5deg)', 'rotate(-1deg)', 'rotate(0deg)'],
    transition: { duration: 0.58, ease: [0.77, 0, 0.175, 1] },
  },
};

const strokeVariants: Variants = {
  normal: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1, 1],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1], delay: 0.1 },
  },
};`,
    svg: 'svgVariants',
    svgStyle: `{ transformOrigin: '13.5px 21px' }`,
    extra: `
          <motion.path
            d="M14.5 21.5C16.2 21 18.1 20.8 20 21.4"
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
// mirrored left and right leg groups move in opposite physical directions while
// the shell shifts its weight over each planted side
const bugVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px) rotate(0deg)',
    transition: { type: 'spring', duration: 0.32, bounce: 0 },
  },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0.45px, -0.4px) rotate(-1.2deg)',
      'translate(0px, 0px) rotate(0deg)',
      'translate(-0.45px, -0.4px) rotate(1.2deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.86,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  },
};

const antennaVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: (phase: -1 | 1) => ({
    transform: [
      'rotate(0deg)',
      'rotate(' + phase * 9 + 'deg)',
      'rotate(0deg)',
      'rotate(' + phase * -9 + 'deg)',
      'rotate(0deg)',
    ],
    transition: {
      duration: 0.86,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  }),
};

const legVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(28deg)',
      'rotate(0deg)',
      'rotate(-28deg)',
      'rotate(0deg)',
    ],
    transition: {
      duration: 0.86,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  },
};`,
    svg: 'bugVariants',
    svgStyle: `{ transformBox: 'view-box', originX: 0.5, originY: 12.5 / 24 }`,
    els: {
      0: {
        v: 'antennaVariants',
        custom: -1,
        style: `{ transformBox: 'view-box', originX: 6.5 / 24, originY: 8.4 / 24 }`,
      },
      1: {
        v: 'antennaVariants',
        custom: 1,
        style: `{ transformBox: 'view-box', originX: 17.6 / 24, originY: 8.4 / 24 }`,
      },
      2: {
        v: 'legVariants',
        style: `{ transformBox: 'view-box', originX: 17.6 / 24, originY: 17.4 / 24 }`,
      },
      3: {
        v: 'legVariants',
        style: `{ transformBox: 'view-box', originX: 6.45 / 24, originY: 17.47 / 24 }`,
      },
      5: {
        v: 'legVariants',
        style: `{ transformBox: 'view-box', originX: 5.95 / 24, originY: 12.9 / 24 }`,
      },
      6: {
        v: 'legVariants',
        style: `{ transformBox: 'view-box', originX: 18.12 / 24, originY: 12.9 / 24 }`,
      },
    },
  },
  {
    export: 'BatteryCharging01Icon',
    defs: `
// five cells build to a shared full-charge surge, then hand the energy back to the bolt
type ChargeCell = { start: number; done: number };

const chargeCellVariants: Variants = {
  normal: { opacity: 0, transform: 'scaleY(0.08)' },
  animate: ({ start, done }: ChargeCell) => ({
    opacity: [0, 0, 1, 1, 1, 1, 0, 0],
    transform: [
      'scaleY(0.08)',
      'scaleY(0.08)',
      'scaleY(1)',
      'scaleY(1)',
      'scaleY(1.18)',
      'scaleY(0.94)',
      'scaleY(0.12)',
      'scaleY(0.12)',
    ],
    transition: {
      duration: 1.18,
      ease: [0.23, 1, 0.32, 1],
      times: [0, start, done, 0.64, 0.7, 0.76, 0.86, 1],
    },
  }),
};

const chargedBatteryVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: [
      'scale(1)',
      'scale(1)',
      'scale(1.055)',
      'scale(0.985)',
      'scale(1)',
      'scale(1)',
    ],
    transition: {
      duration: 1.18,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.64, 0.7, 0.77, 0.86, 1],
    },
  },
};

const chargeBoltVariants: Variants = {
  normal: { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' },
  animate: {
    opacity: [1, 1, 0, 0, 0, 0, 1, 1],
    transform: [
      'scale(1)',
      'scale(1)',
      'scale(1)',
      'scale(0.25)',
      'scale(0.25)',
      'scale(0.25)',
      'scale(1.14)',
      'scale(1)',
    ],
    filter: [
      'blur(0px)',
      'blur(0px)',
      'blur(4px)',
      'blur(4px)',
      'blur(4px)',
      'blur(4px)',
      'blur(0px)',
      'blur(0px)',
    ],
    transition: {
      duration: 1.18,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.03, 0.15, 0.64, 0.76, 0.82, 0.93, 1],
    },
  },
};`,
    before: `
          <motion.path
            d="M4 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.05, done: 0.28 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '4px 15px' }}
          />
          <motion.path
            d="M7.1 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.14, done: 0.37 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '7.1px 15px' }}
          />
          <motion.path
            d="M10.2 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.23, done: 0.46 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10.2px 15px' }}
          />
          <motion.path
            d="M13.3 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.32, done: 0.55 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '13.3px 15px' }}
          />
          <motion.path
            d="M16.4 15V9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2.2"
            variants={chargeCellVariants}
            custom={{ start: 0.41, done: 0.64 }}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '16.4px 15px' }}
          />`,
    svg: 'chargedBatteryVariants',
    svgStyle: `{ transformOrigin: '11px 12px' }`,
    els: {
      1: { v: 'chargeBoltVariants', style: `{ transformOrigin: '10.2px 12px' }` },
    },
  },
  {
    export: 'SleepingIcon',
    defs: `
// the Z marks drift farther from the face so they never crowd its outline
const zVariants: Variants = {
  normal: { opacity: 1, translateX: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    opacity: [1, 1, 0, 0, 1],
    translateY: [0, -3.2, -4.8, 0, 0],
    translateX: [0, 1.6, 2.6, 0, 0],
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
    translateY: [0, -4],
    translateX: [1, 3],
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
            d="M16 -0.5H18.2L16 1.7H18.2"
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
    extra: `
          <path d="M7 14H17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />`,
  },
  // ── expanded collection ────────────────────────────────────────────────
  {
    export: 'AirplaneTakeOff01Icon',
    overflow: 'hidden',
    defs: `
// one solid plane fully clears the frame before a second solid plane enters
// and decelerates into the same runway slot
const departingPlaneVariants: Variants = {
  normal: {
    opacity: 1,
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    opacity: 1,
    transform: [
      'translate(0%, 0%) rotate(0deg)',
      'translate(3%, -1%) rotate(-0.5deg)',
      'translate(12%, -7%) rotate(-2deg)',
      'translate(28%, -18%) rotate(-4deg)',
      'translate(50%, -33%) rotate(-7deg)',
      'translate(76%, -49%) rotate(-8deg)',
      'translate(104%, -65%) rotate(-6deg)',
      'translate(122%, -76%) rotate(-4deg)',
      'translate(122%, -76%) rotate(-4deg)',
    ],
    transition: {
      duration: 1.7,
      ease: 'linear',
      times: [0, 0.08, 0.18, 0.28, 0.37, 0.44, 0.49, 0.52, 1],
    },
  },
};

const arrivingPlaneVariants: Variants = {
  normal: {
    opacity: 1,
    transform: 'translate(-122%, -70%) rotate(7deg)',
    transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
  animate: {
    opacity: 1,
    transform: [
      'translate(-122%, -70%) rotate(7deg)',
      'translate(-122%, -70%) rotate(7deg)',
      'translate(-108%, -62%) rotate(6deg)',
      'translate(-82%, -48%) rotate(5deg)',
      'translate(-56%, -32%) rotate(3.5deg)',
      'translate(-32%, -17%) rotate(2deg)',
      'translate(-14%, -6%) rotate(0.8deg)',
      'translate(-3%, -0.8%) rotate(0.15deg)',
      'translate(0%, 0%) rotate(0deg)',
    ],
    transition: {
      duration: 1.7,
      ease: 'linear',
      times: [0, 0.49, 0.53, 0.61, 0.7, 0.79, 0.88, 0.96, 1],
    },
  },
};

const runwayLightsVariants: Variants = {
  normal: { opacity: 0, transform: 'translateX(0px)' },
  animate: {
    opacity: [0, 0.9, 1, 1, 0.75, 0, 0],
    transform: [
      'translateX(0px)',
      'translateX(-0.8px)',
      'translateX(-3px)',
      'translateX(-6.2px)',
      'translateX(-9.4px)',
      'translateX(-12px)',
      'translateX(-12px)',
    ],
    transition: { duration: 1.7, ease: 'linear', times: [0, 0.06, 0.22, 0.48, 0.74, 0.94, 1] },
  },
};`,
    els: {
      1: { v: 'departingPlaneVariants', style: `{ transformOrigin: '12px 9px' }` },
    },
    extra: `
          <motion.path
            d="M4.5 20V19.1M9 20V19.1M13.5 20V19.1M18 20V19.1"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.2"
            variants={runwayLightsVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3.82527 12.1661C3.55027 11.9661 3.30027 11.7161 3.00028 10.8411C2.91891 10.6241 2.61139 9.53619 2.35028 8.54109C2.13003 7.7017 1.93377 6.93555 2.02528 6.74109C2.10029 6.54109 2.20027 6.39109 2.52527 6.19109C2.72527 6.06802 3.75027 5.81609 3.95027 5.76609C4.15027 5.71609 4.42526 5.69109 4.65027 5.76609C5.07527 5.84109 5.95027 7.11609 6.17527 7.26609C6.27526 7.36609 6.60027 7.657 6.97527 7.69109C7.25027 7.71609 7.52527 7.64109 7.82528 7.51609C8.10027 7.40151 13.5253 4.76609 14.0253 4.54109C18.1003 2.84109 21.0603 5.63609 21.5103 6.23609C21.9753 6.81609 22.0753 6.99109 21.9503 7.49109C21.7887 8.01609 21.3503 8.11609 21.1003 8.19109C20.8503 8.26609 17.4003 9.19109 16.0503 9.56609C15.7554 9.6621 15.6114 9.85492 15.5753 9.89109C15.4003 10.1411 14.6053 11.8411 14.3803 12.2161C14.2253 12.6161 13.8003 13.1161 13.2503 13.3161C12.6753 13.5161 11.6753 13.7411 11.4503 13.8161C11.2253 13.8911 10.7003 14.0411 10.5253 13.9911C10.3003 13.9411 10.0853 13.7161 10.1853 13.3661C10.2853 13.0161 10.4753 12.0411 10.5003 11.8911C10.5253 11.7411 10.7753 11.1161 10.5003 11.0911C10.4503 11.0161 9.92527 11.2411 9.15027 11.4161C8.57449 11.5782 7.9715 11.7386 7.55027 11.8411C5.92527 12.3161 5.04521 12.4411 4.85027 12.4411C4.47527 12.4411 4.20027 12.3911 3.82527 12.1661Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={arrivingPlaneVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 9px' }}
          />`,
  },
  {
    export: 'AttachmentIcon',
    defs: `
// the paperclip winds open, catches, then springs into its nested shape
const clipVariants: Variants = {
  normal: { pathLength: 1, rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    pathLength: [1, 0.72, 1],
    rotate: [0, -5, 2, 0],
    scale: [1, 0.94, 1.03, 1],
    transition: { duration: 0.8, times: [0, 0.28, 0.68, 1], ease: 'easeInOut' },
  },
};`,
    els: {
      0: { v: 'clipVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
  },
  {
    export: 'BluetoothIcon',
    defs: `
// the two connection nodes orbit the fixed mark and exchange sides at mid-cycle
const BLUETOOTH_ORBIT_TIMES = [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1];

const leftNodeVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(0.75px, -6.8px)',
      'translate(6.75px, -10.2px)',
      'translate(12.75px, -6.8px)',
      'translate(13.5px, 0px)',
      'translate(12.75px, 6.8px)',
      'translate(6.75px, 10.2px)',
      'translate(0.75px, 6.8px)',
      'translate(0px, 0px)',
    ],
    transition: { duration: 0.84, ease: 'linear', times: BLUETOOTH_ORBIT_TIMES },
  },
};

const rightNodeVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.75px, 6.8px)',
      'translate(-6.75px, 10.2px)',
      'translate(-12.75px, 6.8px)',
      'translate(-13.5px, 0px)',
      'translate(-12.75px, -6.8px)',
      'translate(-6.75px, -10.2px)',
      'translate(-0.75px, -6.8px)',
      'translate(0px, 0px)',
    ],
    transition: { duration: 0.84, ease: 'linear', times: BLUETOOTH_ORBIT_TIMES },
  },
};

const nodeSourceVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};`,
    before: `
          <motion.path
            d="M5.37952 12H5.25452M5.50452 12C5.50452 12.1381 5.39259 12.25 5.25452 12.25C5.11645 12.25 5.00452 12.1381 5.00452 12C5.00452 11.8619 5.11645 11.75 5.25452 11.75C5.39259 11.75 5.50452 11.8619 5.50452 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={leftNodeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.8795 12H18.7545M19.0045 12C19.0045 12.1381 18.8926 12.25 18.7545 12.25C18.6164 12.25 18.5045 12.1381 18.5045 12C18.5045 11.8619 18.6164 11.75 18.7545 11.75C18.8926 11.75 19.0045 11.8619 19.0045 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={rightNodeVariants}
            animate={controls}
            initial="normal"
          />`,
    els: {
      1: { v: 'nodeSourceVariants' },
    },
  },
  {
    export: 'CloudLightningIcon',
    defs: `
// pressure gathers in the cloud before a bright, double-hit strike
const stormCloudVariants: Variants = {
  normal: { translateY: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  animate: {
    translateY: [0, -0.7, 0.25, 0],
    scale: [1, 1.025, 0.99, 1],
    transition: { duration: 1.2, times: [0, 0.35, 0.72, 1], ease: 'easeInOut' },
  },
};

const boltVariants: Variants = {
  normal: { opacity: 1, pathLength: 1, scale: 1 },
  animate: {
    opacity: [1, 0.15, 1, 0.2, 1],
    pathLength: [1, 0.1, 1, 0.35, 1],
    scale: [1, 0.9, 1.12, 0.95, 1],
    transition: { duration: 0.85, times: [0, 0.18, 0.3, 0.55, 0.7], ease: 'easeOut' },
  },
};

const flashRayVariants: Variants = {
  normal: { opacity: 0, scale: 0.4 },
  animate: (i: number) => ({
    opacity: [0, 0.9, 0],
    scale: [0.4, 1],
    transition: { duration: 0.3, delay: 0.22 + i * 0.04, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'stormCloudVariants', style: `{ transformOrigin: '12px 10px' }` },
      1: { v: 'boltVariants', style: `{ transformOrigin: '12px 17px' }` },
    },
    extra: `
          <motion.path d="M7.6 18.2L6.3 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={flashRayVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '12px 17px' }} />
          <motion.path d="M16.4 18.2L17.7 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={flashRayVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '12px 17px' }} />`,
  },
  {
    export: 'CodeXmlIcon',
    defs: `
// the brackets breathe apart to make room while the slash writes through
const slashVariants: Variants = {
  normal: { pathLength: 1, translateY: 0 },
  animate: {
    pathLength: [0, 1],
    translateY: [-1, 0],
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const bracketVariants: Variants = {
  normal: { translateX: 0, transition: { type: 'spring', duration: 0.4, bounce: 0 } },
  animate: (direction: number) => ({
    translateX: [0, direction * 1.5, direction * 1.5, 0],
    transition: { duration: 0.75, times: [0, 0.22, 0.62, 1], ease: 'easeInOut' },
  }),
};`,
    els: {
      0: { v: 'slashVariants' },
      1: { v: 'bracketVariants', custom: -1 },
      2: { v: 'bracketVariants', custom: 1 },
    },
  },
  {
    export: 'CursorPointer01Icon',
    defs: `
// the pointer commits to a click; the built-in rings collapse into the tip
const pointerVariants: Variants = {
  normal: { translateX: 0, translateY: 0, scale: 1, transition: { type: 'spring', duration: 0.4, bounce: 0 } },
  animate: {
    translateX: [0, -1.5, -1.5, 0],
    translateY: [0, -1.5, -1.5, 0],
    scale: [1, 1, 0.92, 1],
    transition: { duration: 0.75, times: [0, 0.28, 0.48, 1], ease: 'easeOut' },
  },
};

const clickRingVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: (i: number) => ({
    opacity: [1, 0.2, 0.85, 0],
    scale: [1, 0.72, 1.08 + i * 0.08, 1.18 + i * 0.1],
    transition: { duration: 0.75, times: [0, 0.32, 0.55, 1], ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'pointerVariants', style: `{ transformOrigin: '16px 16px' }` },
      1: { v: 'clickRingVariants', custom: 0, style: `{ transformOrigin: '8.5px 8.5px' }` },
      2: { v: 'clickRingVariants', custom: 1, style: `{ transformOrigin: '8.5px 8.5px' }` },
    },
  },
  {
    export: 'DatabaseIcon',
    defs: `
// a write compresses each platter in order, travelling down the stack
const platterVariants: Variants = {
  normal: { transform: 'scaleX(1)', pathLength: 1 },
  animate: (i: number) => ({
    transform: ['scaleX(1)', 'scaleX(0.72)', 'scaleX(1.08)', 'scaleX(1)'],
    pathLength: [1, 0.35, 1, 1],
    transition: { duration: 0.42, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] },
  }),
};

const databaseShellVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(0.96)', 'scaleY(1.025)', 'scaleY(1)'],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'platterVariants', custom: 0 },
      1: { v: 'platterVariants', custom: 1 },
      2: { v: 'platterVariants', custom: 2 },
      3: { v: 'platterVariants', custom: 3 },
      4: { v: 'databaseShellVariants', style: `{ transformOrigin: '12px 13px' }` },
    },
  },
  {
    export: 'EarthIcon',
    defs: `
// the globe turns around its own axis; no detached orbit is added
const earthVariants: Variants = {
  normal: { transform: 'perspective(100px) rotateY(0deg) scale(1)' },
  animate: {
    transform: [
      'perspective(100px) rotateY(0deg) scale(1)',
      'perspective(100px) rotateY(70deg) scale(1.035)',
      'perspective(100px) rotateY(180deg) scale(0.98)',
      'perspective(100px) rotateY(290deg) scale(1.025)',
      'perspective(100px) rotateY(360deg) scale(1)',
    ],
    transition: { duration: 0.95, times: [0, 0.22, 0.5, 0.78, 1], ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'earthVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
  },
  {
    export: 'FlowerIcon',
    defs: `
// the bloom unfurls around a softly breathing center
const bloomVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, -5, 7, 0],
    scale: [1, 0.94, 1.06, 1],
    transition: { duration: 1.1, times: [0, 0.25, 0.7, 1], ease: 'easeInOut' },
  },
};

const flowerCenterVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.75, 1.18, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'flowerCenterVariants', style: `{ transformOrigin: '12px 12.5px' }` },
      1: { v: 'bloomVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
  },
  {
    export: 'FolderOpenIcon',
    defs: `
// the front flap hinges toward the viewer, revealing the contents before closing
const folderBackVariants: Variants = {
  normal: { transform: 'translateY(0px)', transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(-0.2px)',
      'translateY(-0.55px)',
      'translateY(-0.7px)',
      'translateY(-0.55px)',
      'translateY(-0.2px)',
      'translateY(0px)',
    ],
    transition: { duration: 0.84, ease: [0.77, 0, 0.175, 1], times: [0, 0.14, 0.34, 0.5, 0.66, 0.86, 1] },
  },
};

const folderFlapVariants: Variants = {
  normal: {
    originX: 0.5,
    originY: 1,
    transform: 'perspective(70px) translateY(0px) rotateX(0deg) scaleY(1)',
    transition: { type: 'spring', duration: 0.55, bounce: 0 },
  },
  animate: {
    originX: 0.5,
    originY: 1,
    transform: [
      'perspective(70px) translateY(0px) rotateX(0deg) scaleY(1)',
      'perspective(70px) translateY(0.25px) rotateX(-10deg) scaleY(0.99)',
      'perspective(70px) translateY(0.9px) rotateX(-28deg) scaleY(0.94)',
      'perspective(70px) translateY(1.25px) rotateX(-36deg) scaleY(0.9)',
      'perspective(70px) translateY(0.9px) rotateX(-28deg) scaleY(0.94)',
      'perspective(70px) translateY(0.25px) rotateX(-10deg) scaleY(0.99)',
      'perspective(70px) translateY(0px) rotateX(0deg) scaleY(1)',
    ],
    transition: { duration: 0.84, ease: [0.77, 0, 0.175, 1], times: [0, 0.14, 0.34, 0.5, 0.66, 0.86, 1] },
  },
};

const paperRiseVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(-0.25px)',
      'translateY(-0.9px)',
      'translateY(-1.35px)',
      'translateY(-0.9px)',
      'translateY(-0.25px)',
      'translateY(0px)',
    ],
    transition: { duration: 0.84, ease: [0.77, 0, 0.175, 1], times: [0, 0.14, 0.34, 0.5, 0.66, 0.86, 1] },
  },
};`,
    els: {
      0: { v: 'folderBackVariants' },
      1: { v: 'folderFlapVariants', style: `{ transformBox: 'fill-box', transformStyle: 'preserve-3d' }` },
      2: { v: 'paperRiseVariants' },
    },
  },
  {
    export: 'HeadphonesIcon',
    defs: `
// a bass hit stays inside the headphones: the band flexes and both cups answer
const bandVariants: Variants = {
  normal: { scaleY: 1, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    scaleY: [1, 0.94, 1.03, 1],
    translateY: [0, 0.5, -0.25, 0],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const cupVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: (direction: number) => ({
    scale: [1, 1.1, 0.96, 1.06, 1],
    rotate: [0, direction * 3, 0, direction * -2, 0],
    transition: { duration: 0.85, ease: 'easeInOut' },
  }),
};
`,
    els: {
      0: { v: 'bandVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'cupVariants', custom: -1, style: `{ transformOrigin: '6.5px 17.5px' }` },
      2: { v: 'cupVariants', custom: 1, style: `{ transformOrigin: '17.5px 17.5px' }` },
    },
  },
  {
    export: 'MouseLeftClick01Icon',
    defs: `
// the left shell physically depresses while the wheel and divider stay anchored
const leftClickVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(0.9px) scaleY(0.88)', 'translateY(-0.15px) scaleY(1.02)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

const mouseBodyVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(0.985)', 'scaleY(1)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      1: { v: 'leftClickVariants', style: `{ transformOrigin: '5px 6px' }` },
      3: { v: 'mouseBodyVariants', style: `{ transformOrigin: '13.5px 12px' }` },
    },
  },
  {
    export: 'PartyIcon',
    defs: `
// the popper recoils and the existing confetti emerges from inside its cone
const popperVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    translateX: [0, -1, 0.5, 0],
    translateY: [0, 1, -0.5, 0],
    rotate: [0, -6, 2, 0],
    transition: { duration: 0.75, times: [0, 0.25, 0.62, 1], ease: 'easeOut' },
  },
};

const confettiVariants: Variants = {
  normal: { opacity: 1, transform: 'translate(0px, 0px) rotate(0deg) scale(1)' },
  animate: (i: number) => ({
    opacity: [0, 1, 1],
    transform: [
      'translate(-7px, 7px) rotate(0deg) scale(0.2)',
      'translate(' + (0.7 + (i % 2) * 0.7) + 'px, ' + (-1.2 - (i % 3) * 0.45) + 'px) rotate(' + ((i % 2 === 0 ? 1 : -1) * (14 + i * 2)) + 'deg) scale(1.05)',
      'translate(0px, 0px) rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.62, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'popperVariants', style: `{ transformOrigin: '5px 19px' }` },
      1: { v: 'popperVariants', style: `{ transformOrigin: '5px 19px' }` },
      2: { v: 'confettiVariants', custom: 0 },
      3: { v: 'confettiVariants', custom: 1 },
      4: { v: 'confettiVariants', custom: 2 },
      5: { v: 'confettiVariants', custom: 3 },
      6: { v: 'confettiVariants', custom: 4 },
      7: { v: 'confettiVariants', custom: 5 },
      8: { v: 'confettiVariants', custom: 6 },
    },
  },
  {
    export: 'PauseIcon',
    defs: `
// the two bars settle like damped audio meters
const pauseBarVariants: Variants = {
  normal: { scaleY: 1, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: (i: number) => ({
    scaleY: [1, i === 0 ? 0.72 : 0.88, i === 0 ? 0.92 : 0.68, 1],
    translateY: [0, i === 0 ? 2 : 1, i === 0 ? 0.7 : 2.4, 0],
    transition: { duration: 0.8, times: [0, 0.28, 0.58, 1], ease: 'easeInOut' },
  }),
};`,
    els: {
      0: { v: 'pauseBarVariants', custom: 0, style: `{ transformOrigin: '7px 12px' }` },
      1: { v: 'pauseBarVariants', custom: 1, style: `{ transformOrigin: '17px 12px' }` },
    },
  },
  {
    export: 'PlayIcon',
    defs: `
// the play shape compresses, releases forward, and settles without decoration
const playVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleX(1) scaleY(1)',
      'translateX(-0.8px) scaleX(0.9) scaleY(1.04)',
      'translateX(2px) scaleX(1.1) scaleY(0.97)',
      'translateX(-0.2px) scaleX(0.99) scaleY(1.005)',
      'translateX(0px) scaleX(1) scaleY(1)',
    ],
    transition: { duration: 0.52, times: [0, 0.2, 0.52, 0.78, 1], ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'playVariants', style: `{ transformOrigin: '10px 12px' }` },
    },
  },
  {
    export: 'PuzzleIcon',
    defs: `
// the piece tests its fit while neighboring pieces briefly approach its open sides
const puzzleVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    translateX: [0, 1.1, -0.45, 0],
    translateY: [0, -1.2, 0.45, 0],
    rotate: [0, 4, -2, 0],
    scale: [1, 0.96, 1.04, 1],
    transition: { duration: 0.85, times: [0, 0.3, 0.66, 1], ease: 'easeInOut' },
  },
};

const neighborPieceVariants: Variants = {
  normal: { opacity: 0, scale: 0.25 },
  animate: (i: number) => ({
    opacity: [0, 0.8, 0.8, 0],
    scale: [0.55, 1, 1, 0.8],
    translateX: i === 0 ? [1.5, 0, 0, 1.5] : [-1.5, 0, 0, -1.5],
    transition: { duration: 0.74, times: [0, 0.3, 0.68, 1], delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'puzzleVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
    extra: `
          <motion.path d="M18.5 5H21V7.5C20.7 7.4 20.4 7.35 20.1 7.35C19.25 7.35 18.55 8.05 18.55 8.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" variants={neighborPieceVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '19.75px 6.8px' }} />
          <motion.path d="M5.5 19H3V16.5C3.3 16.6 3.6 16.65 3.9 16.65C4.75 16.65 5.45 15.95 5.45 15.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" variants={neighborPieceVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '4.25px 17.2px' }} />`,
  },
  {
    export: 'QrCode01Icon',
    defs: `
// a scanner line travels down while the code cells answer in sequence
const qrCellVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: (i: number) => ({
    opacity: [1, 0.3, 1],
    scale: [1, 0.82, 1],
    transition: { duration: 0.42, delay: 0.12 + i * 0.07, ease: 'easeOut' },
  }),
};

const qrFrameVariants: Variants = {
  normal: { scale: 1, transition: { type: 'spring', duration: 0.4, bounce: 0 } },
  animate: {
    scale: [1, 1.03, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const scannerVariants: Variants = {
  normal: { opacity: 0, translateY: -7 },
  animate: {
    opacity: [0, 0.85, 0.85, 0],
    translateY: [-7, 7],
    transition: { duration: 1, times: [0, 0.12, 0.88, 1], ease: 'easeInOut' },
  },
};`,
    els: {
      0: { v: 'qrCellVariants', custom: 0, style: `{ transformOrigin: '8.5px 8.5px' }` },
      1: { v: 'qrCellVariants', custom: 1 },
      2: { v: 'qrCellVariants', custom: 2 },
      3: { v: 'qrCellVariants', custom: 3 },
      4: { v: 'qrCellVariants', custom: 4, style: `{ transformOrigin: '15.5px 15.5px' }` },
      5: { v: 'qrFrameVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
    extra: `
          <motion.path d="M4 12H20" stroke="currentColor" strokeLinecap="round" strokeWidth="1" variants={scannerVariants} animate={controls} initial="normal" />`,
  },
  {
    export: 'Robot01Icon',
    defs: `
// the antenna tunes in, the face tilts, and the eyes blink in response
const robotHeadVariants: Variants = {
  normal: { rotate: 0, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    rotate: [0, -5, 4, 0],
    translateY: [0, -0.6, 0],
    transition: { duration: 1, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' },
  },
};

const robotEyeVariants: Variants = {
  normal: { scaleY: 1 },
  animate: (i: number) => ({
    scaleY: [1, 0.1, 1, 1, 0.1, 1],
    transition: { duration: 0.9, times: [0, 0.12, 0.24, 0.58, 0.7, 0.82], delay: i * 0.03 },
  }),
};

const antennaVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -15, 12, -5, 0],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const robotSmileVariants: Variants = {
  normal: { opacity: 0, pathLength: 0 },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: { duration: 0.35, delay: 0.35, ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'antennaVariants', style: `{ transformOrigin: '12px 4px' }` },
      2: { v: 'robotEyeVariants', custom: 0, style: `{ transformOrigin: '9.25px 8.25px' }` },
      3: { v: 'robotEyeVariants', custom: 1, style: `{ transformOrigin: '14.75px 8.25px' }` },
      4: { v: 'robotHeadVariants', style: `{ transformOrigin: '12px 9px' }` },
    },
    extra: `
          <motion.path d="M9.5 11C10.2 11.7 11 12 12 12C13 12 13.8 11.7 14.5 11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={robotSmileVariants} animate={controls} initial="normal" />`,
  },
  {
    export: 'SaveIcon',
    defs: `
// the disk presses into place while its own slots write in without crossing the shell
const saveBodyVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(0.45px) scale(0.98)', 'translateY(-0.15px) scale(1.015)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
  },
};

const saveSlotVariants: Variants = {
  normal: { pathLength: 1, transform: 'scaleX(1)' },
  animate: (i: number) => ({
    pathLength: [0.25, 1],
    transform: ['scaleX(0.82)', 'scaleX(1.035)', 'scaleX(1)'],
    transition: { duration: 0.42, delay: 0.04 + i * 0.08, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    svg: 'saveBodyVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: {
      1: { v: 'saveSlotVariants', custom: 0, style: `{ transformOrigin: '12px 6px' }` },
      2: { v: 'saveSlotVariants', custom: 1, style: `{ transformOrigin: '12px 17px' }` },
    },
  },
  {
    export: 'Shield02Icon',
    defs: `
// the shield itself absorbs the impact and passes the force into its core
const shieldVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(0.7px) scale(0.94)', 'translateY(-0.25px) scale(1.05)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const shieldCoreVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.72)', 'scale(1.2)', 'scale(1)'],
    transition: { duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'shieldVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'shieldCoreVariants', style: `{ transformOrigin: '12px 11px' }` },
    },
  },
  {
    export: 'SnowIcon',
    defs: `
// the connected flake turns as one object and returns exactly to rest
const snowVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(-0.55px) rotate(60deg) scale(1.055)',
      'translateY(0.2px) rotate(120deg) scale(0.99)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    svg: 'snowVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
  },
  {
    export: 'SparklesIcon',
    defs: `
// two stars trade brightness so the twinkle feels continuous, not simultaneous
const sparkleVariants: Variants = {
  normal: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: (i: number) => ({
    scale: [1, i === 0 ? 1.18 : 0.72, i === 0 ? 0.78 : 1.2, 1],
    rotate: [0, i === 0 ? 8 : -10, 0],
    opacity: [1, i === 0 ? 1 : 0.45, i === 0 ? 0.5 : 1, 1],
    transition: { duration: 1, times: [0, 0.32, 0.7, 1], ease: 'easeInOut' },
  }),
};

const glintVariants: Variants = {
  normal: { opacity: 0, scale: 0.25 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0.25, 1.1],
    transition: { duration: 0.45, delay: 0.18 + i * 0.16, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'sparkleVariants', custom: 0, style: `{ transformOrigin: '15px 9px' }` },
      1: { v: 'sparkleVariants', custom: 1, style: `{ transformOrigin: '7px 17px' }` },
    },
    extra: `
          <motion.path d="M5 4V2.4M4.2 3.2H5.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={glintVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '5px 3.2px' }} />
          <motion.path d="M19.5 19.5V17.9M18.7 18.7H20.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={glintVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '19.5px 18.7px' }} />`,
  },
  {
    export: 'Video01Icon',
    defs: `
// the camera stays anchored while its side lens opens away from the body
const cameraBodyVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.985)', 'scale(1.015)', 'scale(1)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const cameraWingVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1)' },
  animate: {
    transform: ['translateX(0px) scaleX(1)', 'translateX(0.8px) scaleX(1.08)', 'translateX(-0.12px) scaleX(0.99)', 'translateX(0px) scaleX(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const recordDotVariants: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 0.72, 1.16, 1],
    opacity: [1, 0.65, 1, 1],
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'cameraBodyVariants', style: `{ transformOrigin: '9.5px 12px' }` },
      1: { v: 'cameraWingVariants', style: `{ transformOrigin: '17px 12px' }` },
      2: { v: 'recordDotVariants', style: `{ transformOrigin: '11.5px 9.5px' }` },
    },
  },
  {
    export: 'Archive02Icon',
    defs: `
// the empty sheet extrudes from the moving top seam of the bottom drawer
const ARCHIVE_DOCUMENT =
  'M8.5 11V6.4C8.5 5.85 8.95 5.4 9.5 5.4H14.5C15.05 5.4 15.5 5.85 15.5 6.4V11Z';

const ARCHIVE_DURATION = 0.92;

const ARCHIVE_TIMES = [
  0, 0.06, 0.11, 0.15, 0.19, 0.24, 0.3, 0.36, 0.43, 0.5,
  0.58, 0.66, 0.72, 0.78, 0.84, 0.9, 0.95, 0.98, 1,
];

const archiveDrawerVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(0.12px)',
      'translateY(0.28px)',
      'translateY(0.48px)',
      'translateY(0.7px)',
      'translateY(0.9px)',
      'translateY(1.06px)',
      'translateY(1.16px)',
      'translateY(1.2px)',
      'translateY(1.18px)',
      'translateY(1.12px)',
      'translateY(1.02px)',
      'translateY(0.88px)',
      'translateY(0.7px)',
      'translateY(0.5px)',
      'translateY(0.32px)',
      'translateY(0.17px)',
      'translateY(0.06px)',
      'translateY(0px)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveBackVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: [
      'scaleY(1)',
      'scaleY(1.015)',
      'scaleY(1.04)',
      'scaleY(1.07)',
      'scaleY(1.11)',
      'scaleY(1.16)',
      'scaleY(1.21)',
      'scaleY(1.24)',
      'scaleY(1.25)',
      'scaleY(1.245)',
      'scaleY(1.23)',
      'scaleY(1.2)',
      'scaleY(1.17)',
      'scaleY(1.135)',
      'scaleY(1.1)',
      'scaleY(1.065)',
      'scaleY(1.035)',
      'scaleY(1.012)',
      'scaleY(1)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveBackSourceVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};

const archiveBackBridgeVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};

const archiveDocumentVariants: Variants = {
  normal: { opacity: 0, transform: 'translateY(0px) scaleY(0.02)' },
  animate: {
    opacity: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    transform: [
      'translateY(0px) scaleY(0.02)',
      'translateY(0.12px) scaleY(0.02)',
      'translateY(0.28px) scaleY(0.03)',
      'translateY(0.48px) scaleY(0.05)',
      'translateY(0.7px) scaleY(0.09)',
      'translateY(0.9px) scaleY(0.16)',
      'translateY(1.06px) scaleY(0.27)',
      'translateY(1.16px) scaleY(0.42)',
      'translateY(1.2px) scaleY(0.59)',
      'translateY(1.18px) scaleY(0.76)',
      'translateY(1.12px) scaleY(0.88)',
      'translateY(1.02px) scaleY(0.96)',
      'translateY(0.88px) scaleY(0.98)',
      'translateY(0.7px) scaleY(0.94)',
      'translateY(0.5px) scaleY(0.82)',
      'translateY(0.32px) scaleY(0.64)',
      'translateY(0.17px) scaleY(0.42)',
      'translateY(0.06px) scaleY(0.18)',
      'translateY(0px) scaleY(0.02)',
    ],
    transition: {
      duration: ARCHIVE_DURATION,
      ease: 'linear',
      times: ARCHIVE_TIMES,
    },
  },
};`,
    before: `
          <motion.path
            d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H8.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveBackVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 7 / 24 }}
          />
          <motion.path
            d="M8.5 7H15.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={archiveBackBridgeVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15.5 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveBackVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 7 / 24 }}
          />
          <motion.path
            d={ARCHIVE_DOCUMENT}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={archiveDocumentVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 11 / 24 }}
          />`,
    els: {
      0: { v: 'archiveDrawerVariants', style: `{ transformOrigin: '12px 16px' }` },
      1: { v: 'archiveBackSourceVariants' },
      3: { v: 'archiveDrawerVariants', style: `{ transformOrigin: '12px 16px' }` },
    },
  },
  // ── curated growth batch: common product actions ────────────────────────────
  {
    export: 'AddCircleIcon',
    defs: `
// the boundary makes room, then the add mark resolves at its center
const circleVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.97)', 'scale(1.075)', 'scale(0.995)', 'scale(1)'],
    transition: { duration: 0.82, ease: [0.23, 1, 0.32, 1], times: [0, 0.18, 0.48, 0.74, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-18deg) scale(0.64)',
      'rotate(5deg) scale(1.18)',
      'rotate(-1.5deg) scale(0.98)',
      'rotate(0deg) scale(1)',
    ],
    transition: { duration: 0.86, delay: 0.03, ease: [0.23, 1, 0.32, 1], times: [0, 0.2, 0.5, 0.74, 1] },
  },
};`,
    els: {
      0: { v: 'circleVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'plusVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
  },
  {
    export: 'MinusSignCircleIcon',
    defs: `
// subtraction compresses the mark while the containing circle absorbs it
const minusVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.48)', 'scaleX(1.08)', 'scaleX(1)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

const circleVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.96)', 'scale(1)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'minusVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'circleVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
  },
  {
    export: 'Folder01Icon',
    defs: `
// the folder perks up from the desk, tips forward, and lands with weight
const folderVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: ['translateY(0px) rotate(0deg)', 'translateY(-2.2px) rotate(-3deg)', 'translateY(0.55px) rotate(1deg)', 'translateY(0px) rotate(0deg)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1], times: [0, 0.42, 0.72, 1] },
  },
};`,
    els: { 0: { v: 'folderVariants', style: `{ transformOrigin: '12px 18px' }` } },
  },
  {
    export: 'FolderAddIcon',
    defs: `
// the folder leans into the action and the add mark snaps firmly into place
const folderVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) rotate(0deg)', 'translateY(-1.7px) rotate(-2deg)', 'translateY(0.4px) rotate(0.7deg)', 'translateY(0px) rotate(0deg)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-18deg) scale(0.5)', 'rotate(5deg) scale(1.22)', 'rotate(-2deg) scale(0.97)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'folderVariants', style: `{ transformOrigin: '11px 18px' }` },
      1: { v: 'plusVariants', style: `{ transformOrigin: '18px 17px' }` },
    },
  },
  {
    export: 'FileAddIcon',
    defs: `
// a new sheet drops into the stack while the add mark stamps the corner
const fileVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1.8px) scaleY(1.02)', 'translateY(1px) scaleY(0.96)', 'translateY(-0.25px) scaleY(1.01)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['rotate(-12deg) scale(0.5)', 'rotate(4deg) scale(1.22)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.48, delay: 0.07, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'fileVariants', style: `{ transformOrigin: '12px 14px' }` },
      1: { v: 'plusVariants', style: `{ transformOrigin: '8px 6px' }` },
    },
  },
  {
    export: 'UserAdd01Icon',
    defs: `
// the profile gives a buoyant nod and the add mark answers beside it
const personVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-1.5px) scale(1.03)', 'translateY(0.5px) scale(0.98)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-16deg) scale(0.5)', 'rotate(5deg) scale(1.2)', 'rotate(-2deg) scale(0.98)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'personVariants', style: `{ transformOrigin: '10px 10px' }` },
      1: { v: 'plusVariants', style: `{ transformOrigin: '17.5px 17.5px' }` },
      2: { v: 'personVariants', style: `{ transformOrigin: '10px 18px' }` },
    },
  },
  {
    export: 'UserRemove01Icon',
    defs: `
// the profile recoils from a decisive remove mark, then both settle cleanly
const personVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px) scale(1)', 'translateX(-1.5px) scale(0.97)', 'translateX(0.35px) scale(1.01)', 'translateX(0px) scale(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const removeVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-10deg) scale(0.58)', 'rotate(12deg) scale(1.2)', 'rotate(-3deg) scale(0.98)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'personVariants', style: `{ transformOrigin: '9.5px 8px' }` },
      1: { v: 'removeVariants', style: `{ transformOrigin: '18.5px 18px' }` },
      2: { v: 'personVariants', style: `{ transformOrigin: '9.5px 18px' }` },
    },
  },
  {
    export: 'MailOpenIcon',
    defs: `
// the letter rises behind the envelope lip so every crossing is naturally occluded
const envelopeVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(0.45px) scaleY(0.98)', 'translateY(-0.1px) scaleY(1.01)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const letterVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-2.1px)', 'translateY(-2.1px)', 'translateY(0.2px)', 'translateY(0px)'],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1], times: [0, 0.34, 0.56, 0.84, 1] },
  },
};

const sourceLetterVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};`,
    before: `
          <motion.path d="M4.99998 12V6C4.99998 4.11438 4.99998 3.17157 5.58577 2.58579C6.17156 2 7.11437 2 8.99998 2H15C16.8856 2 17.8284 2 18.4142 2.58579C19 3.17157 19 4.11438 19 6V12" stroke="currentColor" strokeWidth="1.5" variants={letterVariants} animate={controls} initial="normal" />
          <motion.path d="M10 10H14M10 6H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={letterVariants} animate={controls} initial="normal" />`,
    els: {
      0: { v: 'envelopeVariants', style: `{ transformOrigin: '12px 18px' }` },
      1: { v: 'envelopeVariants', style: `{ transformOrigin: '12px 10px' }` },
      2: { v: 'sourceLetterVariants' },
      3: { v: 'sourceLetterVariants' },
    },
  },
  {
    export: 'MessageAdd01Icon',
    defs: `
// the conversation inhales and the add mark pops into the open corner
const messageVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(0.7px) scale(0.96)', 'translateY(-1px) scale(1.025)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['rotate(-14deg) scale(0.48)', 'rotate(5deg) scale(1.22)', 'rotate(-2deg) scale(0.98)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.07, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'messageVariants', style: `{ transformOrigin: '11px 14px' }` },
      1: { v: 'messageVariants', style: `{ transformOrigin: '12px 12px' }` },
      2: { v: 'plusVariants', style: `{ transformOrigin: '18.5px 5.5px' }` },
    },
  },
  {
    export: 'CallIncoming01Icon',
    defs: `
// the incoming arrow gathers outside, drives toward the handset, and makes it answer
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(4deg)', 'rotate(-5deg)', 'rotate(1deg)', 'rotate(0deg)'],
    transition: { duration: 0.56, delay: 0.1, ease: [0.23, 1, 0.32, 1] },
  },
};

const incomingVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(2.8px)', 'translateX(-2.5px)', 'translateX(0.45px)', 'translateX(0px)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};`,
    els: {
      0: { v: 'handsetVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'incomingVariants', style: `{ transformOrigin: '17px 7px' }` },
    },
  },
  {
    export: 'CallOutgoing01Icon',
    defs: `
// the handset kicks the outgoing arrow into motion and answers its departure
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-4deg)', 'rotate(5deg)', 'rotate(-1deg)', 'rotate(0deg)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const outgoingVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-1.2px)', 'translateX(3.2px)', 'translateX(-0.35px)', 'translateX(0px)'],
    transition: { duration: 0.56, delay: 0.05, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};`,
    els: {
      0: { v: 'handsetVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'outgoingVariants', style: `{ transformOrigin: '17px 7px' }` },
    },
  },
  {
    export: 'CalendarAdd01Icon',
    defs: `
// the calendar flips forward on its rings and the add mark stamps the new day
const calendarVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(-1.2px) scaleY(0.96)', 'translateY(0.65px) scaleY(1.03)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-15deg) scale(0.5)', 'rotate(5deg) scale(1.22)', 'rotate(-2deg) scale(0.98)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'calendarVariants', style: `{ transformOrigin: '12px 4px' }` },
      1: { v: 'calendarVariants', style: `{ transformOrigin: '12px 13px' }` },
      2: { v: 'calendarVariants', style: `{ transformOrigin: '12px 10px' }` },
      3: { v: 'plusVariants', style: `{ transformOrigin: '17.5px 18.5px' }` },
    },
  },
  {
    export: 'LocationAdd01Icon',
    defs: `
// the pin hops, drops onto its point, and the add mark ripples from the landing
const pinVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(-2.6px) scaleY(1.04)', 'translateY(1.1px) scaleY(0.93)', 'translateY(-0.35px) scaleY(1.02)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1], times: [0, 0.34, 0.58, 0.78, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.5)', 'scale(1.24)', 'scale(0.94)', 'scale(1)'],
    transition: { duration: 0.5, delay: 0.16, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'pinVariants', style: `{ transformOrigin: '12px 22px' }` },
      1: { v: 'plusVariants', style: `{ transformOrigin: '12px 11px' }` },
    },
  },
  {
    export: 'CreditCardIcon',
    defs: `
// the card swipes through a reader; its stripe and details lag with inertia
const cardVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-2.2px) rotate(-2deg)', 'translateX(2.6px) rotate(1.5deg)', 'translateX(-0.35px) rotate(-0.3deg)', 'translateX(0px) rotate(0deg)'],
    transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1], times: [0, 0.52, 0.8, 1] },
  },
};

const detailVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.48)', 'scaleX(1.08)', 'scaleX(1)'],
    transition: { duration: 0.48, delay: 0.1, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'cardVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'detailVariants', style: `{ transformOrigin: '10.75px 16px' }` },
      2: { v: 'detailVariants', style: `{ transformOrigin: '16.25px 16px' }` },
      3: { v: 'cardVariants', style: `{ transformOrigin: '12px 9px' }` },
    },
  },
  {
    export: 'Wallet01Icon',
    defs: `
// a banknote rises through the opening while the wallet and clasp stay coherent
const walletVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.98)', 'scaleX(1.01)', 'scaleX(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const claspVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.34)', 'scaleX(1.08)', 'scaleX(1)'],
    transition: { duration: 0.52, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};

const banknoteVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-3.8px)', 'translateY(-3.8px)', 'translateY(0.25px)', 'translateY(0px)'],
    transition: { duration: 0.68, ease: [0.23, 1, 0.32, 1], times: [0, 0.34, 0.56, 0.84, 1] },
  },
};`,
    before: `
          <motion.path d="M7.5 7V5.4C7.5 4.85 7.95 4.4 8.5 4.4H15.5C16.05 4.4 16.5 4.85 16.5 5.4V7M10.5 5.7H13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" variants={banknoteVariants} animate={controls} initial="normal" />`,
    els: {
      0: { v: 'walletVariants', style: `{ transformOrigin: '12px 7px' }` },
      1: { v: 'walletVariants', style: `{ transformOrigin: '12px 14px' }` },
      2: { v: 'claspVariants', style: `{ transformOrigin: '21px 14px' }` },
    },
  },
  {
    export: 'ShoppingCartAdd01Icon',
    defs: `
// the plus lands in place while the cart absorbs the weight without crossing it
const wheelVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-1px) scale(1.14)', 'translateY(0.45px) scale(0.96)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.54, ease: [0.23, 1, 0.32, 1] },
  },
};

const cartVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(0.96)', 'scaleY(1.025)', 'scaleY(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.5)', 'scale(1.22)', 'scale(0.96)', 'scale(1)'],
    transition: { duration: 0.5, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'wheelVariants', style: `{ transformOrigin: '9.75px 20.25px' }` },
      1: { v: 'wheelVariants', style: `{ transformOrigin: '18.25px 20.25px' }` },
      2: { v: 'cartVariants', style: `{ transformOrigin: '12px 13px' }` },
      3: { v: 'plusVariants', style: `{ transformOrigin: '19px 6px' }` },
    },
  },
  {
    export: 'ExternalLinkIcon',
    defs: `
// the arrow loads inside the frame, breaks free, and pulls the window after it
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(-0.7px, 0.7px)', 'translate(3px, -3px)', 'translate(-0.35px, 0.35px)', 'translate(0px, 0px)'],
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.95)', 'scale(1.025)', 'scale(1)'],
    transition: { duration: 0.56, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'arrowVariants', style: `{ transformOrigin: '16px 8px' }` },
      1: { v: 'windowVariants' },
    },
  },
  {
    export: 'FullScreenIcon',
    defs: `
// all four corners contract for leverage, burst outward, and settle together
const fullScreenVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.86)', 'scale(1.18)', 'scale(0.98)', 'scale(1)'],
    transition: { duration: 0.58, ease: [0.77, 0, 0.175, 1], times: [0, 0.18, 0.5, 0.78, 1] },
  },
};`,
    els: { 0: { v: 'fullScreenVariants', style: `{ transformOrigin: '12px 12px' }` } },
  },
  {
    export: 'DashboardSquare01Icon',
    defs: `
// dashboard tiles assemble in reading order with a crisp diagonal ripple
const tileVariants: Variants = {
  normal: { transform: 'scale(1)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['translateY(1.4px) scale(0.74)', 'translateY(-0.4px) scale(1.1)', 'translateY(0px) scale(1)'],
    opacity: [0.4, 1, 1],
    transition: { duration: 0.48, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'tileVariants', custom: 3, style: `{ transformOrigin: '17.25px 17.25px' }` },
      1: { v: 'tileVariants', custom: 1, style: `{ transformOrigin: '17.25px 6.75px' }` },
      2: { v: 'tileVariants', custom: 2, style: `{ transformOrigin: '6.75px 17.25px' }` },
      3: { v: 'tileVariants', custom: 0, style: `{ transformOrigin: '6.75px 6.75px' }` },
    },
  },
  {
    export: 'ListViewIcon',
    defs: `
// rows sweep in from the leading edge and align in a quick reading-order cascade
const rowVariants: Variants = {
  normal: { transform: 'translateX(0px)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['translateX(-3px) scaleX(0.86)', 'translateX(0.65px) scaleX(1.03)', 'translateX(0px) scaleX(1)'],
    opacity: [0.4, 1, 1],
    transition: { duration: 0.48, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'rowVariants', custom: 1, style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'rowVariants', custom: 0, style: `{ transformOrigin: '12px 4px' }` },
      2: { v: 'rowVariants', custom: 2, style: `{ transformOrigin: '12px 20px' }` },
    },
  },
  {
    export: 'DocumentAttachmentIcon',
    defs: `
// the paperclip swings hard into the page and its text lines answer the impact
const documentVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) rotate(0deg)', 'translateY(-0.8px) rotate(-1deg)', 'translateY(0.45px) rotate(0.5deg)', 'translateY(0px) rotate(0deg)'],
    transition: { duration: 0.58, ease: [0.23, 1, 0.32, 1] },
  },
};

const lineVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.5)', 'scaleX(1.1)', 'scaleX(1)'],
    transition: { duration: 0.48, delay: 0.12, ease: [0.23, 1, 0.32, 1] },
  },
};

const clipVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg) translateY(0px)', 'rotate(-22deg) translateY(-1px)', 'rotate(7deg) translateY(0.35px)', 'rotate(-2deg) translateY(0px)', 'rotate(0deg) translateY(0px)'],
    transition: { duration: 0.62, ease: [0.77, 0, 0.175, 1] },
  },
};`,
    els: {
      0: { v: 'documentVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'lineVariants', style: `{ transformOrigin: '7.5px 7px' }` },
      2: { v: 'lineVariants', style: `{ transformOrigin: '7.5px 12px' }` },
      3: { v: 'clipVariants', style: `{ transformOrigin: '17.5px 18px' }` },
    },
  },
  {
    export: 'UndoIcon',
    defs: `
// a complete backward turn reads as undo; the wind-up makes direction immediate
const undoVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)', pathLength: 1 },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(16deg) scale(0.97)',
      'rotate(-360deg) scale(1)',
      'rotate(-352deg) scale(1.01)',
      'rotate(-360deg) scale(1)',
    ],
    pathLength: [1, 0.82, 1, 1, 1],
    transition: { duration: 0.82, ease: [0.77, 0, 0.175, 1], times: [0, 0.1, 0.68, 0.84, 1] },
    transitionEnd: { transform: 'rotate(0deg) scale(1)' },
  },
};`,
    els: { 0: { v: 'undoVariants', style: `{ transformOrigin: '12px 12px' }` } },
  },
  {
    export: 'RedoIcon',
    defs: `
// a complete forward turn mirrors undo and settles in the same visual state
const redoVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)', pathLength: 1 },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-16deg) scale(0.97)',
      'rotate(360deg) scale(1)',
      'rotate(352deg) scale(1.01)',
      'rotate(360deg) scale(1)',
    ],
    pathLength: [1, 0.82, 1, 1, 1],
    transition: { duration: 0.82, ease: [0.77, 0, 0.175, 1], times: [0, 0.1, 0.68, 0.84, 1] },
    transitionEnd: { transform: 'rotate(0deg) scale(1)' },
  },
};`,
    els: { 0: { v: 'redoVariants', style: `{ transformOrigin: '12px 12px' }` } },
  },
  {
    export: 'Scissor01Icon',
    defs: `
// the blades wind open, snap shut, and make the surrounding frame answer
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.015)', 'scale(0.965)', 'scale(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.55, 1] },
  },
};

const scissorVariants: Variants = {
  normal: { transform: 'rotate(0deg) scaleX(1)' },
  animate: {
    transform: [
      'rotate(0deg) scaleX(1)',
      'rotate(5deg) scaleX(1.08)',
      'rotate(-8deg) scaleX(0.72)',
      'rotate(2deg) scaleX(1.03)',
      'rotate(0deg) scaleX(1)',
    ],
    transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1], times: [0, 0.25, 0.5, 0.76, 1] },
  },
};`,
    els: {
      0: { v: 'frameVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'scissorVariants', style: `{ transformOrigin: '10.6px 12px' }` },
    },
  },
  {
    export: 'ClipboardPasteIcon',
    defs: `
// the paste arrow drives into the board; the clip absorbs the impact
const pasteVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-2.8px)', 'translateX(1.2px)', 'translateX(-0.35px)', 'translateX(0px)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.76, 1] },
  },
};

const clipVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1)' },
  animate: {
    transform: ['translateY(0px) scaleX(1)', 'translateY(0.8px) scaleX(0.9)', 'translateY(-0.25px) scaleX(1.04)', 'translateY(0px) scaleX(1)'],
    transition: { duration: 0.44, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'pasteVariants', style: `{ transformOrigin: '15px 13px' }` },
      1: { v: 'pasteVariants', style: `{ transformOrigin: '18px 13px' }` },
      2: { v: 'clipVariants', style: `{ transformOrigin: '11.5px 3.5px' }` },
    },
  },
  {
    export: 'FileDownloadIcon',
    defs: `
// the download arrow falls decisively into the document and the page catches it
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-2.4px)', 'translateY(1.8px)', 'translateY(-0.35px)', 'translateY(0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};

const fileVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(0px) scaleY(1)', 'translateY(0.7px) scaleY(0.96)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.42, 0.62, 1] },
  },
};`,
    els: {
      0: { v: 'arrowVariants', style: `{ transformOrigin: '7px 6px' }` },
      1: { v: 'fileVariants', style: `{ transformOrigin: '12px 14px' }` },
    },
  },
  {
    export: 'FileUploadIcon',
    defs: `
// the page loads the arrow like a spring and launches it cleanly upward
const fileVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(0.7px) scaleY(0.96)', 'translateY(-0.25px) scaleY(1.02)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.24, 0.58, 1] },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(1.5px)', 'translateY(1.5px)', 'translateY(-2.8px)', 'translateY(0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 0.64, 1] },
  },
};`,
    els: {
      0: { v: 'fileVariants', style: `{ transformOrigin: '12px 14px' }` },
      1: { v: 'arrowVariants', style: `{ transformOrigin: '7px 6px' }` },
    },
  },
  {
    export: 'CloudDownloadIcon',
    defs: `
// the cloud compresses under a decisive downward transfer, then floats back
const cloudVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(-0.4px) scaleY(1.02)', 'translateY(0.8px) scaleY(0.96)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 0.58, 1] },
  },
};

const downloadVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-2.5px)', 'translateY(2.2px)', 'translateY(-0.4px)', 'translateY(0px)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};`,
    els: {
      0: { v: 'cloudVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'downloadVariants', style: `{ transformOrigin: '12px 17px' }` },
    },
  },
  {
    export: 'CloudUploadIcon',
    defs: `
// the arrow loads beneath the cloud, surges upward, and gives it a buoyant lift
const cloudVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) scaleY(1)', 'translateY(0.45px) scaleY(0.98)', 'translateY(-1px) scaleY(1.03)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1], times: [0, 0.2, 0.56, 1] },
  },
};

const uploadVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(2.4px)', 'translateY(-2.2px)', 'translateY(0.35px)', 'translateY(0px)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};`,
    els: {
      0: { v: 'cloudVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'uploadVariants', style: `{ transformOrigin: '12px 17px' }` },
    },
  },
  {
    export: 'InboxIcon',
    defs: `
// the tray rises to catch incoming weight, then the whole inbox settles
const inboxVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(1.025)', 'scaleY(0.94)', 'scaleY(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 1] },
  },
};

const trayVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1.6px)', 'translateY(1.15px)', 'translateY(-0.25px)', 'translateY(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.5, 0.78, 1] },
  },
};`,
    els: {
      0: { v: 'inboxVariants', style: `{ transformOrigin: '12px 18px' }` },
      1: { v: 'trayVariants', style: `{ transformOrigin: '12px 14px' }` },
    },
  },
  {
    export: 'NotificationOff01Icon',
    defs: `
// a complete bell settles first, then the slash crosses it as a separate action
const slashVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 0, 1],
    transition: { duration: 0.52, delay: 0.08, ease: [0.23, 1, 0.32, 1], times: [0, 0.22, 1] },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(-4deg)', 'rotate(2deg)', 'rotate(0deg)'],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const sourceOffBellVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.08 } },
  animate: { opacity: 0, transition: { duration: 0.08 } },
};`,
    before: `
          <motion.g variants={bellVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 3px' }}>
            <path d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M13 18.5H11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
          </motion.g>`,
    els: {
      0: { v: 'sourceOffBellVariants' },
      1: { v: 'slashVariants', style: `{ transformOrigin: '12px 12px' }` },
      2: { v: 'sourceOffBellVariants' },
    },
  },
  {
    export: 'UserCheck01Icon',
    defs: `
// the profile nods while the confirmation stroke draws and lands beside it
const userVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1.1px)', 'translateY(0.45px)', 'translateY(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const checkVariants: Variants = {
  normal: { transform: 'scale(1)', pathLength: 1 },
  animate: {
    transform: ['scale(0.72)', 'scale(1.13)', 'scale(0.97)', 'scale(1)'],
    pathLength: [0, 1, 1, 1],
    transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'userVariants', style: `{ transformOrigin: '10px 8px' }` },
      1: { v: 'userVariants', style: `{ transformOrigin: '10px 18px' }` },
      2: { v: 'checkVariants', style: `{ transformOrigin: '17px 18px' }` },
    },
  },
  {
    export: 'UserMultiple02Icon',
    defs: `
// two readable profiles gather toward one another without completing or overlapping
const primaryVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-0.7px)', 'translateX(0.18px)', 'translateX(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const secondaryVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0.7px)', 'translateX(-0.18px)', 'translateX(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'primaryVariants', style: `{ transformOrigin: '9px 7px' }` },
      1: { v: 'secondaryVariants', style: `{ transformOrigin: '15px 7px' }` },
      2: { v: 'primaryVariants', style: `{ transformOrigin: '9px 19px' }` },
      3: { v: 'secondaryVariants', style: `{ transformOrigin: '18px 19px' }` },
    },
  },
  {
    export: 'SortByUp01Icon',
    defs: `
// the arrow pulls the ordering upward while the values trade visual weight
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(1.8px)', 'translateY(-2.2px)', 'translateY(0.35px)', 'translateY(0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.48, 0.78, 1] },
  },
};

const valueVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['translateY(0px) scale(1)', i === 0 ? 'translateY(0.7px) scale(0.9)' : 'translateY(-0.7px) scale(1.08)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.46, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'arrowVariants', style: `{ transformOrigin: '18px 11px' }` },
      1: { v: 'valueVariants', custom: 0, style: `{ transformOrigin: '6.5px 6.5px' }` },
      2: { v: 'valueVariants', custom: 1, style: `{ transformOrigin: '6.5px 17.5px' }` },
    },
  },
  {
    export: 'SortByDown01Icon',
    defs: `
// the arrow pulls the ordering downward while the values trade visual weight
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1.8px)', 'translateY(2.2px)', 'translateY(-0.35px)', 'translateY(0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1], times: [0, 0.48, 0.78, 1] },
  },
};

const valueVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['translateY(0px) scale(1)', i === 0 ? 'translateY(0.7px) scale(1.08)' : 'translateY(-0.7px) scale(0.9)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.46, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'arrowVariants', style: `{ transformOrigin: '18px 13px' }` },
      1: { v: 'valueVariants', custom: 0, style: `{ transformOrigin: '6.5px 6.5px' }` },
      2: { v: 'valueVariants', custom: 1, style: `{ transformOrigin: '6.5px 17.5px' }` },
    },
  },
  {
    export: 'GridViewIcon',
    defs: `
// the four cells wake in a diagonal ripple and overshoot into alignment
const cellVariants: Variants = {
  normal: { transform: 'scale(1)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['scale(0.72) rotate(-5deg)', 'scale(1.1) rotate(2deg)', 'scale(1) rotate(0deg)'],
    opacity: [0.45, 1, 1],
    transition: { duration: 0.46, delay: i * 0.055, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      0: { v: 'cellVariants', custom: 0, style: `{ transformOrigin: '6.5px 6.5px' }` },
      1: { v: 'cellVariants', custom: 1, style: `{ transformOrigin: '17.5px 6.5px' }` },
      2: { v: 'cellVariants', custom: 2, style: `{ transformOrigin: '6.5px 17.5px' }` },
      3: { v: 'cellVariants', custom: 3, style: `{ transformOrigin: '17.5px 17.5px' }` },
    },
  },
  {
    export: 'PanelLeftIcon',
    defs: `
// the frame compresses as the sidebar opens wide, then both settle together
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scaleX(0.97) scaleY(1.02)', 'scale(1)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const dividerVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.5px)', 'translateX(2.5px)', 'translateX(-0.3px)', 'translateX(0px)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'frameVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'dividerVariants', style: `{ transformOrigin: '9px 12px' }` },
    },
  },
  {
    export: 'MaximizeScreenIcon',
    defs: `
// the window gathers momentum and expands decisively toward the outer frame
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(-0.5px, 0.5px)', 'translate(2.2px, -2.2px)', 'translate(-0.25px, 0.25px)', 'translate(0px, 0px)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.94)', 'scale(1.12)', 'scale(0.99)', 'scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'arrowVariants', style: `{ transformOrigin: '13px 11px' }` },
      1: { v: 'windowVariants', style: `{ transformOrigin: '6.5px 17.5px' }` },
    },
  },
  {
    export: 'MinimizeScreenIcon',
    defs: `
// the window yields inward toward the target frame, then clicks into place
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(0.5px, -0.5px)', 'translate(-2.2px, 2.2px)', 'translate(0.25px, -0.25px)', 'translate(0px, 0px)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.06)', 'scale(0.86)', 'scale(1.01)', 'scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'arrowVariants', style: `{ transformOrigin: '11px 13px' }` },
      1: { v: 'windowVariants', style: `{ transformOrigin: '17.5px 6.5px' }` },
    },
  },
  {
    export: 'HistoryIcon',
    defs: `
// the history frame stays fixed while only the minute hand runs backward
const HISTORY_REST = 'M12.9319 7V12L15.9319 14';

const handVariants: Variants = {
  normal: { d: HISTORY_REST },
  animate: {
    d: [
      HISTORY_REST,
      'M12.9319 7V12L15.5319 9.6',
      'M12.9319 7V12L10.3319 9.6',
      'M12.9319 7V12L10.3319 14.4',
      HISTORY_REST,
    ],
    transition: { duration: 0.76, ease: [0.77, 0, 0.175, 1], times: [0, 0.22, 0.48, 0.72, 1] },
  },
};`,
    els: { 1: { v: 'handVariants' } },
  },
  {
    export: 'SlidersHorizontalIcon',
    defs: `
// each control snaps to a new setting in a quick three-beat mix
const knobVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: (i: number) => ({
    transform: [
      'translateX(0px)',
      i === 0 ? 'translateX(-2.8px)' : i === 1 ? 'translateX(3px)' : 'translateX(-2.4px)',
      i === 0 ? 'translateX(0.45px)' : i === 1 ? 'translateX(-0.45px)' : 'translateX(0.4px)',
      'translateX(0px)',
    ],
    transition: { duration: 0.48, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      2: { v: 'knobVariants', custom: 0, style: `{ transformOrigin: '16px 12px' }` },
      3: { v: 'knobVariants', custom: 1, style: `{ transformOrigin: '10px 5px' }` },
      4: { v: 'knobVariants', custom: 2, style: `{ transformOrigin: '12px 19px' }` },
    },
  },
];
