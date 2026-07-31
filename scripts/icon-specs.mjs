// Hand-crafted animation specs — this file IS the design work.
// defs: Variants consts injected into the component.
// svg: variants const applied to the <svg> root. els: per-element variants by index.
//
// Design language:
// - name the verb first; animate the one part that performs it and leave the
//   rest anchored
// - rigid parts translate or rotate; morph paths only when the material bends
// - hide travel with clipping or occlusion, not a fade
// - related states share geometry; rotated siblings keep the same shape
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
// a rigid arrow travels in the direction it already names; neither the shaft
// nor the head deforms
const svgVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(2px)',
      'translateX(0px)',
    ],
    transition: {
      duration: 0.46,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.58, 1],
    },
  },
};`,
    svg: 'svgVariants',
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
// the lens sweeps, pauses on a find, and quietly zooms in
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
};`,
    svg: 'svgVariants',
    els: {
      1: {
        v: 'lensVariants',
        style: `{ transformBox: 'fill-box', transformOrigin: 'center' }`,
      },
    },
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
// three shared strokes make the state change legible: the outer bars become
// the X while the unused middle bar collapses to an invisible center line
const topLineVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(7px) rotate(45deg)',
      'translateY(7px) rotate(45deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.72,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.36, 0.64, 1],
    },
  },
};

const bottomLineVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-7px) rotate(-45deg)',
      'translateY(-7px) rotate(-45deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.72,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.36, 0.64, 1],
    },
  },
};

const midLineVariants: Variants = {
  normal: { opacity: 1, transform: 'scaleX(1)' },
  animate: {
    opacity: [1, 0, 0, 1],
    transform: ['scaleX(1)', 'scaleX(0.001)', 'scaleX(0.001)', 'scaleX(1)'],
    transition: {
      duration: 0.72,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.3, 0.7, 1],
    },
  },
};`,
    els: {
      0: {
        v: 'topLineVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 5px' }`,
      },
      1: {
        v: 'midLineVariants',
        style: `{ transformBox: 'view-box', transformOrigin: '12px 12px' }`,
      },
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
// the left arrow uses the same rigid travel as its rotation group
const svgVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(-2px)',
      'translateX(0px)',
    ],
    transition: {
      duration: 0.46,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.58, 1],
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'ArrowUp02Icon',
    defs: `
// the up arrow stays rigid and travels along its own axis
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(-2px)',
      'translateY(0px)',
    ],
    transition: {
      duration: 0.46,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.58, 1],
    },
  },
};`,
    svg: 'svgVariants',
  },
  {
    export: 'ArrowDown02Icon',
    defs: `
// the down arrow stays rigid and travels along its own axis
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [
      'translateY(0px)',
      'translateY(2px)',
      'translateY(0px)',
    ],
    transition: {
      duration: 0.46,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.58, 1],
    },
  },
};`,
    svg: 'svgVariants',
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
    opacity: [1, 0.25, 1],
    translateY: [0, 1.2, 0],
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.1, times: [0, 0.45, 1] },
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
    rotate: [0, -5, 3.5, -1.5, 0],
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
      0: { v: 'keyVariants', style: `{ transformOrigin: '6px 19.5px' }` },
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
  // ── expanded collection ────────────────────────────────────────────────
  {
    export: 'AirplaneTakeOff01Icon',
    defs: `
// a short taxi, nose-up rotation, and clean lift; the runway slips away
const planeVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    translateX: [0, -1, 0, 2.8, 0],
    translateY: [0, 0.3, 0, -2.6, 0],
    rotate: [0, 0, -3, -8, 0],
    transition: { duration: 1, times: [0, 0.18, 0.34, 0.7, 1], ease: 'easeInOut' },
  },
};

const runwayVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [1, 0.35, 1],
    opacity: [1, 0.45, 1],
    transition: { duration: 1, times: [0, 0.7, 1], ease: 'easeOut' },
  },
};

const windVariants: Variants = {
  normal: { opacity: 0, translateX: 0 },
  animate: (i: number) => ({
    opacity: [0, 0.75, 0],
    translateX: [2, -3],
    transition: { duration: 0.5, delay: 0.28 + i * 0.1, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'runwayVariants' },
      1: { v: 'planeVariants', style: `{ transformOrigin: '12px 9px' }` },
    },
    extra: `
          <motion.path d="M4 15.5H8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={windVariants} custom={0} animate={controls} initial="normal" />
          <motion.path d="M1.5 13.5H6.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={windVariants} custom={1} animate={controls} initial="normal" />`,
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
// the mark broadcasts once from its center and the side nodes answer
const markVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    scale: [1, 0.94, 1.08, 1],
    transition: { duration: 0.65, times: [0, 0.2, 0.62, 1], ease: 'easeOut' },
  },
};

const nodeVariants: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: {
    opacity: [1, 0.25, 1, 0.5, 1],
    scale: [1, 0.7, 1, 0.8, 1],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const signalVariants: Variants = {
  normal: { opacity: 0, scale: 0.35 },
  animate: (i: number) => ({
    opacity: [0, 0.65, 0],
    scale: [0.35, 1.1 + i * 0.25],
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'markVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'nodeVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
    extra: `
          <motion.circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" variants={signalVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }} />
          <motion.circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="0.8" variants={signalVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }} />`,
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
// a write travels through the stack from the top platter to the bottom
const platterVariants: Variants = {
  normal: { translateY: 0, opacity: 1 },
  animate: (i: number) => ({
    translateY: [0, i % 2 === 0 ? 0.7 : -0.45, 0],
    opacity: [1, 0.45, 1],
    transition: { duration: 0.65, delay: i * 0.09, ease: 'easeInOut' },
  }),
};

const databaseShellVariants: Variants = {
  normal: { scaleY: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    scaleY: [1, 0.96, 1.02, 1],
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const dataDotVariants: Variants = {
  normal: { opacity: 0, translateY: -4 },
  animate: {
    opacity: [0, 1, 1, 0],
    translateY: [-4, 0, 4],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};`,
    els: {
      0: { v: 'platterVariants', custom: 0 },
      1: { v: 'platterVariants', custom: 1 },
      2: { v: 'platterVariants', custom: 2 },
      3: { v: 'platterVariants', custom: 3 },
      4: { v: 'databaseShellVariants', style: `{ transformOrigin: '12px 13px' }` },
    },
    extra: `
          <motion.circle cx="12" cy="8.5" r="0.7" fill="currentColor" variants={dataDotVariants} animate={controls} initial="normal" />`,
  },
  {
    export: 'EarthIcon',
    defs: `
// a gentle globe turn with a satellite tracing the near orbit
const earthVariants: Variants = {
  normal: { rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, -5, 4, 0],
    scale: [1, 1.025, 1],
    transition: { duration: 1.5, times: [0, 0.32, 0.75, 1], ease: 'easeInOut' },
  },
};

const orbitVariants: Variants = {
  normal: { opacity: 0, pathLength: 0.2, rotate: 0 },
  animate: {
    opacity: [0, 0.55, 0],
    pathLength: [0.2, 1],
    rotate: [0, 18],
    transition: { duration: 1.25, ease: 'easeInOut' },
  },
};

const satelliteVariants: Variants = {
  normal: { opacity: 0, translateX: -5, translateY: 2 },
  animate: {
    opacity: [0, 1, 1, 0],
    translateX: [-5, 0, 5],
    translateY: [2, -2, 1],
    transition: { duration: 1.25, ease: 'easeInOut' },
  },
};`,
    els: {
      0: { v: 'earthVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
    extra: `
          <motion.ellipse cx="12" cy="12" rx="11" ry="5.5" stroke="currentColor" strokeWidth="0.9" variants={orbitVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }} />
          <motion.circle cx="12" cy="6.5" r="0.8" fill="currentColor" variants={satelliteVariants} animate={controls} initial="normal" />`,
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
// the folder rocks open and the top sheet rises into view
const folderBackVariants: Variants = {
  normal: { translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    translateY: [0, -0.7, 0],
    transition: { duration: 0.65, ease: 'easeOut' },
  },
};

const folderFlapVariants: Variants = {
  normal: { rotate: 0, translateY: 0, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, -5, 2, 0],
    translateY: [0, 1.2, 0.6, 0],
    transition: { duration: 0.8, times: [0, 0.32, 0.68, 1], ease: 'easeInOut' },
  },
};

const paperRiseVariants: Variants = {
  normal: { translateY: 0, opacity: 1 },
  animate: {
    translateY: [0, -2, -2, 0],
    opacity: [1, 0.35, 1, 1],
    transition: { duration: 0.8, times: [0, 0.35, 0.58, 1], ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'folderBackVariants' },
      1: { v: 'folderFlapVariants', style: `{ transformOrigin: '12px 20px' }` },
      2: { v: 'paperRiseVariants' },
    },
  },
  {
    export: 'HeadphonesIcon',
    defs: `
// a bass hit flexes the band and drives alternating ear-cup pulses
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

const musicNoteVariants: Variants = {
  normal: { opacity: 0, translateY: 1, scale: 0.5 },
  animate: {
    opacity: [0, 0.8, 0],
    translateY: [1, -3],
    scale: [0.5, 1],
    transition: { duration: 0.9, delay: 0.18, ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'bandVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'cupVariants', custom: -1, style: `{ transformOrigin: '6.5px 17.5px' }` },
      2: { v: 'cupVariants', custom: 1, style: `{ transformOrigin: '17.5px 17.5px' }` },
    },
    extra: `
          <motion.path d="M21 11V7.8L23 7.2V10.2M21 10.2C20.1 10.2 19.7 10.6 19.7 11.1C19.7 11.6 20.1 12 20.7 12C21.3 12 21.7 11.6 21.7 11.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" variants={musicNoteVariants} animate={controls} initial="normal" />`,
  },
  {
    export: 'MouseLeftClick01Icon',
    defs: `
// the finger button depresses and two drawn ticks mark the click
const mouseButtonVariants: Variants = {
  normal: { scaleY: 1, translateY: 0, transition: { type: 'spring', duration: 0.35, bounce: 0 } },
  animate: {
    scaleY: [1, 0.7, 1],
    translateY: [0, 0.7, 0],
    transition: { duration: 0.42, times: [0, 0.38, 1], ease: 'easeOut' },
  },
};

const mouseBodyVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.45, 0],
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const clickTickVariants: Variants = {
  normal: { opacity: 0, pathLength: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    pathLength: [0, 1],
    transition: { duration: 0.45, delay: 0.16 + i * 0.06, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'mouseButtonVariants', style: `{ transformOrigin: '13.5px 6px' }` },
      1: { v: 'clickTickVariants', custom: 0 },
      2: { v: 'mouseButtonVariants', style: `{ transformOrigin: '13.5px 8px' }` },
      3: { v: 'mouseBodyVariants' },
    },
    extra: `
          <motion.path d="M8.2 3.6L6.8 2.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={clickTickVariants} custom={1} animate={controls} initial="normal" />
          <motion.path d="M9.8 1.8L9.4 0.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={clickTickVariants} custom={2} animate={controls} initial="normal" />`,
  },
  {
    export: 'PartyIcon',
    defs: `
// the popper recoils while each piece of confetti gets its own trajectory
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
  normal: { opacity: 1, translateX: 0, translateY: 0, rotate: 0 },
  animate: (i: number) => ({
    opacity: [1, 1, 0, 1],
    translateX: [0, 0.6 + (i % 2) * 0.8, 0],
    translateY: [0, -1.5 - (i % 3) * 0.5, 0],
    rotate: [0, (i % 2 === 0 ? 1 : -1) * (16 + i * 3), 0],
    transition: { duration: 0.9, delay: i * 0.025, ease: 'easeOut' },
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
// anticipation, release, and a small motion trail make playback feel immediate
const playVariants: Variants = {
  normal: { translateX: 0, scaleX: 1, scaleY: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    translateX: [0, -1, 2.2, 0],
    scaleX: [1, 0.88, 1.12, 1],
    scaleY: [1, 1.05, 0.96, 1],
    transition: { duration: 0.7, times: [0, 0.22, 0.55, 1], ease: 'easeOut' },
  },
};

const playTrailVariants: Variants = {
  normal: { opacity: 0, translateX: 0, pathLength: 0 },
  animate: (i: number) => ({
    opacity: [0, 0.65, 0],
    translateX: [-1, 2.5],
    pathLength: [0, 1],
    transition: { duration: 0.42, delay: 0.25 + i * 0.07, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'playVariants', style: `{ transformOrigin: '10px 12px' }` },
    },
    extra: `
          <motion.path d="M1.5 9H3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={playTrailVariants} custom={0} animate={controls} initial="normal" />
          <motion.path d="M0.8 12H3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={playTrailVariants} custom={1} animate={controls} initial="normal" />
          <motion.path d="M1.5 15H3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" variants={playTrailVariants} custom={2} animate={controls} initial="normal" />`,
  },
  {
    export: 'PuzzleIcon',
    defs: `
// the piece tests its fit, clicks down, and sends a tiny confirmation spark
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

const fitSparkVariants: Variants = {
  normal: { opacity: 0, scale: 0.25 },
  animate: (i: number) => ({
    opacity: [0, 0, 0.9, 0],
    scale: [0.25, 0.25, 1, 1.35],
    transition: { duration: 0.85, times: [0, 0.58, 0.75, 1], delay: i * 0.04, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'puzzleVariants', style: `{ transformOrigin: '12px 12px' }` },
    },
    extra: `
          <motion.path d="M19.5 6V3.8M18.4 4.9H20.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={fitSparkVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '19.5px 4.9px' }} />
          <motion.path d="M4 20V18.4M3.2 19.2H4.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={fitSparkVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '4px 19.2px' }} />`,
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
// the disk presses into place, then a drawn check confirms the write
const saveBodyVariants: Variants = {
  normal: { scale: 1, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    scale: [1, 0.97, 1.025, 1],
    translateY: [0, 0.5, 0],
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const saveSlotVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 1.2, 0],
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const saveCheckVariants: Variants = {
  normal: { opacity: 0, pathLength: 0, scale: 0.5 },
  animate: {
    opacity: [0, 0, 1],
    pathLength: [0, 0, 1],
    scale: [0.5, 0.5, 1],
    transition: { duration: 0.75, times: [0, 0.48, 1], ease: 'easeOut' },
  },
};`,
    svg: 'saveBodyVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: {
      1: { v: 'saveSlotVariants' },
      2: { v: 'saveSlotVariants' },
    },
    extra: `
          <motion.path d="M9.4 16.8L11.1 18.3L14.8 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" variants={saveCheckVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 17px' }} />`,
  },
  {
    export: 'Shield02Icon',
    defs: `
// the shield absorbs an impact and its center sends back a calm scan
const shieldVariants: Variants = {
  normal: { scale: 1, translateY: 0, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    scale: [1, 0.94, 1.055, 1],
    translateY: [0, 0.7, -0.35, 0],
    transition: { duration: 0.8, times: [0, 0.22, 0.6, 1], ease: 'easeOut' },
  },
};

const shieldCoreVariants: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 0.65, 1.3, 1],
    opacity: [1, 0.35, 0.8, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const shieldScanVariants: Variants = {
  normal: { opacity: 0, scale: 0.4 },
  animate: (i: number) => ({
    opacity: [0, 0.55, 0],
    scale: [0.4, 1.65 + i * 0.35],
    transition: { duration: 0.75, delay: 0.16 + i * 0.08, ease: 'easeOut' },
  }),
};`,
    els: {
      0: { v: 'shieldVariants', style: `{ transformOrigin: '12px 12px' }` },
      1: { v: 'shieldCoreVariants', style: `{ transformOrigin: '12px 11px' }` },
    },
    extra: `
          <motion.circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="0.9" variants={shieldScanVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '12px 11px' }} />
          <motion.circle cx="12" cy="11" r="4.5" stroke="currentColor" strokeWidth="0.7" variants={shieldScanVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '12px 11px' }} />`,
  },
  {
    export: 'SnowIcon',
    defs: `
// a drifting snowflake turns with tiny independent flex through its arms
const snowVariants: Variants = {
  normal: { rotate: 0, scale: 1, translateY: 0, transition: { type: 'spring', duration: 0.55, bounce: 0 } },
  animate: {
    rotate: [0, 60, 120],
    scale: [1, 1.06, 1],
    translateY: [0, 0.7, 0],
    transition: { duration: 1.6, ease: 'easeInOut' },
  },
};

const snowArmVariants: Variants = {
  normal: { opacity: 1 },
  animate: (i: number) => ({
    opacity: [1, 0.5, 1],
    transition: { duration: 0.65, delay: i * 0.08, ease: 'easeInOut' },
  }),
};`,
    svg: 'snowVariants',
    svgStyle: `{ transformOrigin: '12px 12px' }`,
    els: {
      0: { v: 'snowArmVariants', custom: 0 },
      1: { v: 'snowArmVariants', custom: 1 },
      2: { v: 'snowArmVariants', custom: 2 },
    },
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
// the camera eases into record, the lens blinks, and the side gate opens
const cameraBodyVariants: Variants = {
  normal: { translateX: 0, scale: 1, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    translateX: [0, -0.7, 0.4, 0],
    scale: [1, 0.98, 1.02, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const cameraWingVariants: Variants = {
  normal: { rotate: 0, scaleX: 1, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    rotate: [0, 7, -2, 0],
    scaleX: [1, 1.08, 1],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const recordDotVariants: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 0.45, 1.25, 1],
    opacity: [1, 0.3, 1, 1],
    transition: { duration: 0.7, ease: 'easeOut' },
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
// the archive stack compresses and its front drawer answers with a click
const archiveLayerVariants: Variants = {
  normal: { translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: (i: number) => ({
    translateY: [0, 1.2 - i * 0.45, 0],
    transition: { duration: 0.65, delay: i * 0.07, ease: 'easeOut' },
  }),
};

const archiveDrawerVariants: Variants = {
  normal: { translateY: 0, scaleX: 1 },
  animate: {
    translateY: [0, 1, -0.35, 0],
    scaleX: [1, 1.04, 1],
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const archiveHandleVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.72, 1.18, 1],
    transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' },
  },
};`,
    els: {
      0: { v: 'archiveDrawerVariants', style: `{ transformOrigin: '12px 16px' }` },
      1: { v: 'archiveLayerVariants', custom: 0 },
      2: { v: 'archiveLayerVariants', custom: 1 },
      3: { v: 'archiveHandleVariants', style: `{ transformOrigin: '12px 16px' }` },
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
    transform: ['scale(1)', 'scale(1.06)', 'scale(1)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-12deg) scale(0.72)', 'rotate(3deg) scale(1.12)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
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
// the folder lifts from the desk and settles back into place
const folderVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: ['translateY(0px) rotate(0deg)', 'translateY(-1.2px) rotate(-1deg)', 'translateY(0px) rotate(0deg)'],
    transition: { duration: 0.46, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: { 0: { v: 'folderVariants', style: `{ transformOrigin: '12px 18px' }` } },
  },
  {
    export: 'FolderAddIcon',
    defs: `
// the folder acknowledges the action before the plus locks into place
const folderVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.8px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-10deg) scale(0.7)', 'rotate(2deg) scale(1.12)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.42, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
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
// a new sheet settles in as its add mark stamps into the corner
const fileVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.8px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.7)', 'scale(1.14)', 'scale(1)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
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
// the person rises in acknowledgement and the add mark follows
const personVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.8px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-10deg) scale(0.72)', 'rotate(2deg) scale(1.12)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.42, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
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
// the profile recedes slightly as the remove mark closes decisively
const personVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.7px)', 'translateX(0px)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const removeVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(0deg) scale(0.76)', 'rotate(8deg) scale(1.1)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.42, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
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
// the letter rises from the envelope while the folded edge gives way
const envelopeVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.5px)', 'translateY(0px)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const letterVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1.5px)', 'translateY(-0.2px)', 'translateY(0px)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'envelopeVariants', style: `{ transformOrigin: '12px 18px' }` },
      1: { v: 'envelopeVariants', style: `{ transformOrigin: '12px 10px' }` },
      2: { v: 'letterVariants', style: `{ transformOrigin: '12px 12px' }` },
      3: { v: 'letterVariants', style: `{ transformOrigin: '12px 8px' }` },
    },
  },
  {
    export: 'MessageAdd01Icon',
    defs: `
// the conversation rises as a new message action appears
const messageVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.7px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.7)', 'scale(1.13)', 'scale(1)'],
    transition: { duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
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
// the arrow travels toward the handset to make the direction unmistakable
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-2deg)', 'rotate(0deg)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const incomingVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-2px)', 'translateX(0px)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
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
// the arrow leaves the handset to communicate an outgoing call
const handsetVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(2deg)', 'rotate(0deg)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const outgoingVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(2px)', 'translateX(0px)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
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
// the calendar settles like a turned page before the add mark lands
const calendarVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.7px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-10deg) scale(0.72)', 'rotate(2deg) scale(1.12)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.42, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
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
// the pin drops into place and the add mark confirms the destination
const pinVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-1px)', 'translateY(0.5px)', 'translateY(0px)'],
    transition: { duration: 0.48, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.72)', 'scale(1.14)', 'scale(1)'],
    transition: { duration: 0.4, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
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
// the card slides through a reader and its details follow a fraction later
const cardVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(1.2px)', 'translateX(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const detailVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.7)', 'scaleX(1)'],
    transition: { duration: 0.38, delay: 0.06, ease: [0.23, 1, 0.32, 1] },
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
// the wallet steadies while its clasp opens and returns
const walletVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.6px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const claspVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(1.4px)', 'translateX(0px)'],
    transition: { duration: 0.4, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'walletVariants', style: `{ transformOrigin: '12px 7px' }` },
      1: { v: 'walletVariants', style: `{ transformOrigin: '12px 14px' }` },
      2: { v: 'claspVariants', style: `{ transformOrigin: '19px 14px' }` },
    },
  },
  {
    export: 'ShoppingCartAdd01Icon',
    defs: `
// the added item nudges the cart forward and the wheels answer underneath
const wheelVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-0.6px) scale(1.1)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
};

const cartVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(1.1px)', 'translateX(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.72)', 'scale(1.13)', 'scale(1)'],
    transition: { duration: 0.4, delay: 0.03, ease: [0.23, 1, 0.32, 1] },
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
// the arrow exits the frame while the source window remains anchored
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(1.5px, -1.5px)', 'translate(0px, 0px)'],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0.72, 1],
    transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] },
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
// all four corners expand away from the center and settle at full size
const fullScreenVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.09)', 'scale(1)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: { 0: { v: 'fullScreenVariants', style: `{ transformOrigin: '12px 12px' }` } },
  },
  {
    export: 'DashboardSquare01Icon',
    defs: `
// dashboard tiles populate in reading order rather than pulsing as one block
const tileVariants: Variants = {
  normal: { transform: 'scale(1)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['scale(0.88)', 'scale(1.04)', 'scale(1)'],
    opacity: [0.55, 1, 1],
    transition: { duration: 0.38, delay: i * 0.045, ease: [0.23, 1, 0.32, 1] },
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
// rows settle from top to bottom to communicate ordered content
const rowVariants: Variants = {
  normal: { transform: 'translateX(0px)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['translateX(-1.5px)', 'translateX(0.4px)', 'translateX(0px)'],
    opacity: [0.55, 1, 1],
    transition: { duration: 0.38, delay: i * 0.055, ease: [0.23, 1, 0.32, 1] },
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
// the document holds steady while the paperclip swings into attachment
const documentVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.5px)', 'translateY(0px)'],
    transition: { duration: 0.44, ease: [0.23, 1, 0.32, 1] },
  },
};

const lineVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(0.68)', 'scaleX(1.04)', 'scaleX(1)'],
    transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] },
  },
};

const clipVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(-8deg)', 'rotate(3deg)', 'rotate(0deg)'],
    transition: { duration: 0.46, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
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
// the history loop rewinds toward its arrowhead
const undoVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-16deg)', 'rotate(0deg)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: { 0: { v: 'undoVariants', style: `{ transformOrigin: '12px 12px' }` } },
  },
  {
    export: 'RedoIcon',
    defs: `
// the history loop advances toward its arrowhead
const redoVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(16deg)', 'rotate(0deg)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: { 0: { v: 'redoVariants', style: `{ transformOrigin: '12px 12px' }` } },
  },
  {
    export: 'Scissor01Icon',
    defs: `
// the blades close for one restrained snip inside their frame
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.985)', 'scale(1)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const scissorVariants: Variants = {
  normal: { transform: 'rotate(0deg) scaleX(1)' },
  animate: {
    transform: ['rotate(0deg) scaleX(1)', 'rotate(-3deg) scaleX(0.9)', 'rotate(0deg) scaleX(1)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// pasted content moves into the clipboard while the clip acknowledges it
const pasteVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-1.2px)', 'translateX(0.8px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const clipVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.5px)', 'translateY(0px)'],
    transition: { duration: 0.26, delay: 0.02, ease: [0.23, 1, 0.32, 1] },
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
// the download arrow enters the document and the page absorbs the motion
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1px)', 'translateY(1.2px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const fileVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.4px)', 'translateY(0px)'],
    transition: { duration: 0.26, delay: 0.02, ease: [0.23, 1, 0.32, 1] },
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
// the upload arrow leaves the document and the page recoils softly
const fileVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.4px)', 'translateY(0px)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(1px)', 'translateY(-1.2px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// the cloud settles as the transfer arrow drops through it
const cloudVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.35px)', 'translateY(0px)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const downloadVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-1px)', 'translateY(1.3px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// the transfer arrow rises into the cloud and lifts it a fraction
const cloudVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.35px)', 'translateY(0px)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const uploadVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(1px)', 'translateY(-1.3px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// the tray receives an item and settles under its weight
const inboxVariants: Variants = {
  normal: { transform: 'scaleY(1)' },
  animate: {
    transform: ['scaleY(1)', 'scaleY(0.98)', 'scaleY(1)'],
    transition: { duration: 0.27, ease: [0.23, 1, 0.32, 1] },
  },
};

const trayVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-0.5px)', 'translateY(0.7px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// the bell tries one muted shake before the slash quiets it
const clapperVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.6px)', 'translateX(0.4px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const slashVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(0.84)', 'scaleX(1.04)', 'scaleX(1)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-2deg)', 'rotate(1deg)', 'rotate(0deg)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'clapperVariants', style: `{ transformOrigin: '12px 18px' }` },
      1: { v: 'slashVariants', style: `{ transformOrigin: '12px 12px' }` },
      2: { v: 'bellVariants', style: `{ transformOrigin: '12px 3px' }` },
    },
  },
  {
    export: 'UserCheck01Icon',
    defs: `
// the profile acknowledges selection before the check lands
const userVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(-0.5px)', 'translateY(0px)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const checkVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(0.78)', 'scale(1.08)', 'scale(1)'],
    transition: { duration: 0.28, delay: 0.02, ease: [0.23, 1, 0.32, 1] },
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
// two profiles separate just enough to clarify the group
const primaryVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.6px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const secondaryVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(0.7px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// the direction arrow rises as the two values trade visual emphasis
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0.8px)', 'translateY(-1px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const valueVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['scale(1)', i === 0 ? 'scale(0.94)' : 'scale(1.04)', 'scale(1)'],
    transition: { duration: 0.26, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
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
// the direction arrow drops as the two values trade visual emphasis
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(-0.8px)', 'translateY(1px)', 'translateY(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const valueVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['scale(1)', i === 0 ? 'scale(1.04)' : 'scale(0.94)', 'scale(1)'],
    transition: { duration: 0.26, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
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
// grid cells populate in reading order with a restrained stagger
const cellVariants: Variants = {
  normal: { transform: 'scale(1)', opacity: 1 },
  animate: (i: number) => ({
    transform: ['scale(0.92)', 'scale(1.03)', 'scale(1)'],
    opacity: [0.65, 1, 1],
    transition: { duration: 0.24, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
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
// the sidebar divider opens the panel and returns to rest
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.99)', 'scale(1)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};

const dividerVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(1.2px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
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
// the active window travels toward the available frame
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(1px, -1px)', 'translate(0px, 0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.04)', 'scale(1)'],
    transition: { duration: 0.27, ease: [0.23, 1, 0.32, 1] },
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
// the active window travels inward toward the smaller frame
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(-1px, 1px)', 'translate(0px, 0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const windowVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.96)', 'scale(1)'],
    transition: { duration: 0.27, ease: [0.23, 1, 0.32, 1] },
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
// time rewinds briefly while the clock hand follows behind
const historyVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-10deg)', 'rotate(0deg)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const handVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-24deg)', 'rotate(0deg)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(-0.5px, -0.4px)', 'translate(0px, 0px)'],
    transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
  },
};`,
    els: {
      0: { v: 'historyVariants', style: `{ transformOrigin: '13px 12px' }` },
      1: { v: 'handVariants', style: `{ transformOrigin: '12.93px 12px' }` },
      2: { v: 'arrowVariants', style: `{ transformOrigin: '4.5px 8.5px' }` },
    },
  },
  {
    export: 'SlidersHorizontalIcon',
    defs: `
// each control moves along its own track, one after another
const knobVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: (i: number) => ({
    transform: [
      'translateX(0px)',
      i === 0 ? 'translateX(-1.6px)' : i === 1 ? 'translateX(1.7px)' : 'translateX(-1.2px)',
      'translateX(0px)',
    ],
    transition: { duration: 0.25, delay: i * 0.025, ease: [0.23, 1, 0.32, 1] },
  }),
};`,
    els: {
      2: { v: 'knobVariants', custom: 0, style: `{ transformOrigin: '16px 12px' }` },
      3: { v: 'knobVariants', custom: 1, style: `{ transformOrigin: '10px 5px' }` },
      4: { v: 'knobVariants', custom: 2, style: `{ transformOrigin: '12px 19px' }` },
    },
  },
];
