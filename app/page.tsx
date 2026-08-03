'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from 'motion/react';
import { ICON_LIST } from '@/app/icons-manifest';
import type { AnimatedIconHandle as IconHandle } from '@/lib/use-icon-animation';
import { GITHUB_URL } from '@/lib/site';
import { Copy01Icon } from '@/icons/copy-01';
import { FavouriteIcon } from '@/icons/favourite';
import { Notification03Icon } from '@/icons/notification-03';
import { Search01Icon } from '@/icons/search-01';
import { Tick02Icon } from '@/icons/tick-02';

// hugeicons.com palette — white ground, ink, one green
const GREEN = { bg: '#AFE67F', border: '#79BD3E', deep: '#1D3208' };
const COPIED_TINT = { bg: '#EDF8DF', border: '#AFE67F', ink: '#2C4A0F' };

const ICONS = ICON_LIST.map((icon, i) => ({
  ...icon,
  idx: i, // stable ref slot — survives filtering
}));

const matches = (query: string) => {
  const q = query.trim().toLowerCase();
  return q ? ICONS.filter(({ name }) => name.includes(q)) : ICONS;
};

const installCommand = (name: string) =>
  `npx shadcn add @hugeicons-animated/${name}`;

// shared link treatment for footer / header text links
const textLink =
  'rounded-sm text-[#696D6E] underline-offset-4 decoration-[#AFE67F] decoration-2 transition-colors hover:text-[#141812] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]';

const DEFAULT_HERO_ICON = 'notification-03';

type HeroSpecimenPlacement = {
  iconIndex: number;
  top: string;
  left: string;
  size: number;
  rotate: number;
  moveX: number;
  moveY: number;
  moveRotate: number;
  mediumHidden?: boolean;
};

const HERO_SPECIMEN_PLACEMENTS: HeroSpecimenPlacement[] = [
  { iconIndex: 3, top: '7%', left: '12%', size: 22, rotate: -10, moveX: -7, moveY: 6, moveRotate: -15 },
  { iconIndex: 9, top: '11%', left: '38%', size: 28, rotate: 7, moveX: 8, moveY: -7, moveRotate: 13 },
  { iconIndex: 14, top: '9%', left: '69%', size: 25, rotate: -5, moveX: -10, moveY: -3, moveRotate: -10 },
  { iconIndex: 20, top: '15%', left: '91%', size: 23, rotate: 11, moveX: 8, moveY: 8, moveRotate: 17 },
  { iconIndex: 27, top: '28%', left: '55%', size: 30, rotate: 6, moveX: -6, moveY: -9, moveRotate: 11, mediumHidden: true },
  { iconIndex: 32, top: '32%', left: '82%', size: 25, rotate: -11, moveX: 11, moveY: 4, moveRotate: -17 },
  { iconIndex: 38, top: '40%', left: '97%', size: 23, rotate: 9, moveX: -9, moveY: 8, moveRotate: 15 },
  { iconIndex: 42, top: '47%', left: '3%', size: 24, rotate: -7, moveX: 7, moveY: -7, moveRotate: -12, mediumHidden: true },
  { iconIndex: 46, top: '53%', left: '68%', size: 27, rotate: 13, moveX: -7, moveY: 7, moveRotate: 19 },
  { iconIndex: 51, top: '57%', left: '91%', size: 29, rotate: -4, moveX: 9, moveY: 8, moveRotate: -9 },
  { iconIndex: 57, top: '76%', left: '29%', size: 23, rotate: 8, moveX: 6, moveY: -8, moveRotate: 14 },
  { iconIndex: 63, top: '70%', left: '54%', size: 26, rotate: -9, moveX: -8, moveY: 5, moveRotate: -15, mediumHidden: true },
  { iconIndex: 69, top: '72%', left: '80%', size: 22, rotate: 5, moveX: 7, moveY: -6, moveRotate: 10 },
  { iconIndex: 76, top: '82%', left: '6%', size: 27, rotate: -12, moveX: -6, moveY: 7, moveRotate: -18 },
  { iconIndex: 84, top: '85%', left: '37%', size: 23, rotate: 10, moveX: 8, moveY: -6, moveRotate: 16 },
  { iconIndex: 92, top: '84%', left: '63%', size: 28, rotate: -5, moveX: -8, moveY: 8, moveRotate: -11 },
  { iconIndex: 104, top: '89%', left: '94%', size: 24, rotate: 9, moveX: 7, moveY: -7, moveRotate: 15 },
  { iconIndex: 115, top: '96%', left: '18%', size: 22, rotate: -8, moveX: -7, moveY: 6, moveRotate: -14 },
  { iconIndex: 127, top: '96%', left: '72%', size: 25, rotate: 6, moveX: 8, moveY: -6, moveRotate: 12 },
];

const HERO_SPECIMENS = HERO_SPECIMEN_PLACEMENTS.map((specimen) => ({
  ...specimen,
  icon: ICONS[specimen.iconIndex % ICONS.length],
}));

type HeroFieldStyle = CSSProperties & {
  '--hero-spot-x': string;
  '--hero-spot-y': string;
};

const HERO_FIELD_STYLE: HeroFieldStyle = {
  '--hero-spot-x': '78%',
  '--hero-spot-y': '40%',
};

type SpecimenStyle = CSSProperties & {
  '--specimen-rotate': string;
  '--specimen-move-x': string;
  '--specimen-move-y': string;
  '--specimen-move-rotate': string;
};

function RollingIconName({
  name,
  reduced,
}: {
  name: string;
  reduced: boolean;
}) {
  return (
    <>
      <span
        aria-hidden
        className="relative inline-grid h-4 w-[10.75rem] max-w-[48vw] shrink-0 overflow-hidden align-bottom"
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={name}
            initial={
              reduced
                ? { opacity: 0, color: COPIED_TINT.ink }
                : {
                    opacity: 0,
                    color: GREEN.border,
                    filter: 'blur(2px)',
                    transform: 'translateY(100%)',
                  }
            }
            animate={{
              opacity: 1,
              color: COPIED_TINT.ink,
              filter: 'blur(0px)',
              transform: 'translateY(0%)',
            }}
            exit={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    filter: 'blur(2px)',
                    transform: 'translateY(-100%)',
                  }
            }
            transition={
              reduced
                ? { duration: 0.15, ease: 'easeOut' }
                : {
                    opacity: { duration: 0.16, ease: 'easeOut' },
                    color: { duration: 0.55, ease: 'easeOut' },
                    filter: { duration: 0.2, ease: 'easeOut' },
                    transform: {
                      type: 'spring',
                      duration: 0.3,
                      bounce: 0,
                    },
                  }
            }
            className="col-start-1 row-start-1 block truncate font-semibold"
          >
            {name}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">{name}</span>
    </>
  );
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.11c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.38 2.9-.39.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.13v3.16c0 .31.21.66.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [copiedCommandName, setCopiedCommandName] = useState<string | null>(null);
  const [heroIconName, setHeroIconName] = useState(DEFAULT_HERO_ICON);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const refs = useRef<(IconHandle | null)[]>([]);
  const copyIconRef = useRef<IconHandle | null>(null);
  const favouriteIconRef = useRef<IconHandle | null>(null);
  const heroIconRefs = useRef<(IconHandle | null)[]>([]);
  const heroRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<IconHandle | null>(null);
  const searchIconRef = useRef<IconHandle | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const tickIconRef = useRef<IconHandle | null>(null);
  const reduced = useReducedMotion();

  // A short introduction makes the grid feel alive. Hover and focus handle
  // continued exploration without leaving decorative motion running forever.
  useEffect(() => {
    if (reduced) return;
    const visible = matches(query);
    if (visible.length === 0) return;

    const stopTimers: ReturnType<typeof setTimeout>[] = [];
    const previewTimers = [800, 2800].map((delay, index) =>
      setTimeout(() => {
        const icon = visible[index % visible.length];
        refs.current[icon.idx]?.startAnimation();
        stopTimers.push(
          setTimeout(
            () => refs.current[icon.idx]?.stopAnimation(),
            1200
          )
        );
      }, delay)
    );

    return () => {
      previewTimers.forEach(clearTimeout);
      stopTimers.forEach(clearTimeout);
    };
  }, [reduced, query]);

  // header only develops its material once the top sentinel scrolls away
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting)
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copy = (name: string, id: string) => {
    navigator.clipboard.writeText(installCommand(name));
    setCopied(id);
    setCopiedCommandName(name);
    setTimeout(() => {
      setCopied(null);
      setCopiedCommandName(null);
    }, 1600);
    if (id === 'hero') {
      setHeroIconName('tick-02');
      if (!reduced) tickIconRef.current?.startAnimation();
    }
  };

  const filtered = matches(query);

  const previewSpecimen = (
    specimenIndex: number,
    name: string,
    left: string,
    top: string
  ) => {
    setHeroIconName(name);
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty('--hero-spot-x', left);
    hero.style.setProperty('--hero-spot-y', top);
    hero.dataset.specimenActive = 'true';
    if (!reduced) heroIconRefs.current[specimenIndex]?.startAnimation();
  };

  const stopSpecimenPreview = (specimenIndex: number) => {
    if (heroRef.current) heroRef.current.dataset.specimenActive = 'false';
    heroIconRefs.current[specimenIndex]?.stopAnimation();
  };

  const previewCommandIcon = (
    name: string,
    handle: IconHandle | null
  ) => {
    setHeroIconName(name);
    if (!reduced) handle?.startAnimation();
  };

  const stopCommandIcon = (handle: IconHandle | null) => {
    handle?.stopAnimation();
  };

  const previewMove = (active: boolean) => {
    if (heroRef.current) {
      heroRef.current.dataset.moveActive = active ? 'true' : 'false';
    }
    if (reduced) return;
    heroIconRefs.current.forEach((handle) => {
      if (active) handle?.startAnimation();
      else handle?.stopAnimation();
    });
  };

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: 'spring', duration: 0.45, bounce: 0 }}
    >
      <div
        id="top"
        className="relative flex min-h-screen w-full flex-col overflow-x-clip bg-white text-[#141812]"
      >
        {/* scroll sentinel for the header material */}
        <div ref={sentinelRef} aria-hidden className="absolute top-0 h-px w-px" />

        <header
          className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200 ${
            scrolled
              ? 'border-[#141812]/8 bg-white/88 backdrop-blur-xl'
              : 'border-transparent bg-white/0'
          }`}
        >
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
            <a
              href="#top"
              onPointerEnter={() =>
                previewCommandIcon('notification-03', logoRef.current)
              }
              onPointerLeave={() => stopCommandIcon(logoRef.current)}
              onFocus={() =>
                previewCommandIcon('notification-03', logoRef.current)
              }
              onBlur={() => stopCommandIcon(logoRef.current)}
              className="group flex min-h-10 min-w-0 w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C7A22]"
            >
              <span
                className="grid size-8 shrink-0 place-items-center rounded-[9px] border"
                style={{
                  backgroundColor: GREEN.bg,
                  borderColor: GREEN.border,
                  color: GREEN.deep,
                }}
              >
                <Notification03Icon
                  size={17}
                  aria-hidden
                  ref={(h: IconHandle | null) => {
                    logoRef.current = h;
                  }}
                />
              </span>
              <span className="whitespace-nowrap text-[17px] font-bold leading-none tracking-[-0.025em]">
                hugeicons <span className="text-[#9DA19B]">animated</span>
              </span>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View hugeicons-animated on GitHub"
              className="flex size-10 items-center justify-center gap-2 rounded-lg bg-white text-sm font-bold text-[#141812] shadow-[0_0_0_1px_rgba(20,24,18,0.1),0_1px_2px_rgba(20,24,18,0.08)] transition-[background-color,box-shadow,scale] duration-150 hover:bg-[#F7F7F5] hover:shadow-[0_0_0_1px_rgba(20,24,18,0.14),0_2px_4px_rgba(20,24,18,0.08)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22] sm:w-auto sm:px-3.5"
            >
              <GitHubMark className="size-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
          <section
            ref={heroRef}
            className="hero-random-hero relative pt-12 pb-14 sm:pt-20"
            style={HERO_FIELD_STYLE}
            data-move-active="false"
            data-specimen-active="false"
          >
            <div className="hero-random-field hidden lg:block">
              <div aria-hidden className="hero-random-glow" />
              {HERO_SPECIMENS.map(
                (
                  {
                    icon: { name, Icon },
                    top,
                    left,
                    size,
                    rotate,
                    moveX,
                    moveY,
                    moveRotate,
                    mediumHidden,
                  },
                  specimenIndex
                ) => {
                  const specimenStyle: SpecimenStyle = {
                    top,
                    left,
                    '--specimen-rotate': `${rotate}deg`,
                    '--specimen-move-x': `${moveX}px`,
                    '--specimen-move-y': `${moveY}px`,
                    '--specimen-move-rotate': `${moveRotate}deg`,
                  };
                  return (
                    <button
                      type="button"
                      aria-label={`Use ${name} in the install command`}
                      className={`hero-specimen${
                        mediumHidden ? ' hero-specimen-medium-hidden' : ''
                      }`}
                      style={specimenStyle}
                      key={name}
                      onClick={() => previewSpecimen(specimenIndex, name, left, top)}
                      onPointerEnter={() =>
                        previewSpecimen(specimenIndex, name, left, top)
                      }
                      onPointerLeave={() => stopSpecimenPreview(specimenIndex)}
                      onFocus={() =>
                        previewSpecimen(specimenIndex, name, left, top)
                      }
                      onBlur={() => stopSpecimenPreview(specimenIndex)}
                    >
                      <Icon
                        size={size}
                        ref={(handle: IconHandle | null) => {
                          heroIconRefs.current[specimenIndex] = handle;
                        }}
                      />
                    </button>
                  );
                }
              )}
            </div>

            <h1 className="relative z-10 w-fit text-balance text-[clamp(2.6rem,7.5vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
              Beautiful icons.
              <br />
              <span className="text-[#BFC2BD]">
                Now they{' '}
                <button
                  type="button"
                  className="hero-move-trigger"
                  onPointerEnter={() => previewMove(true)}
                  onPointerLeave={() => previewMove(false)}
                  onFocus={() => previewMove(true)}
                  onBlur={() => previewMove(false)}
                >
                  move
                </button>
                .
              </span>
            </h1>

            <p className="relative z-10 mt-6 max-w-md text-pretty text-lg font-medium leading-[1.6] text-[#696D6E]">
              Icons from{' '}
              <a
                href="https://hugeicons.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#141812] underline decoration-[#AFE67F] decoration-2 underline-offset-4"
              >
                Hugeicons
              </a>
              , animated by hand for React. Install each one as source code you
              own. No package or lock-in.
            </p>

            <div className="relative z-10 mt-8 max-w-[34rem]">
              <p className="mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#9DA19B]">
                Install an icon
              </p>
              <div
                className="flex min-h-13 w-full items-center gap-2 rounded-2xl border border-[#E5E5E3] bg-[#F7F7F5] p-1.5 pl-4 shadow-[0_1px_2px_rgba(20,24,18,0.04)]"
              >
                <code className="flex min-w-0 flex-1 items-baseline whitespace-nowrap font-mono text-[10px] leading-4 text-[#2C4A0F] sm:text-xs">
                  <span className="min-w-0 truncate text-[#696D6E]">
                    $ npx shadcn add @hugeicons-animated/
                  </span>
                  <RollingIconName
                    name={heroIconName}
                    reduced={Boolean(reduced)}
                  />
                </code>

                <button
                  type="button"
                  aria-label={`Copy the ${heroIconName} install command`}
                  onClick={() => copy(heroIconName, 'hero')}
                  onPointerEnter={() =>
                    previewCommandIcon('copy-01', copyIconRef.current)
                  }
                  onPointerLeave={() => stopCommandIcon(copyIconRef.current)}
                  onFocus={() =>
                    previewCommandIcon('copy-01', copyIconRef.current)
                  }
                  onBlur={() => stopCommandIcon(copyIconRef.current)}
                  className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-[10px] bg-white text-[#2C4A0F] shadow-[0_0_0_1px_rgba(20,24,18,0.08),0_1px_2px_rgba(20,24,18,0.08)] transition-[background-color,box-shadow] duration-150 hover:bg-[#EDF8DF] hover:shadow-[0_0_0_1px_rgba(121,189,62,0.48),0_6px_16px_rgba(44,74,15,0.1)] active:bg-[#E3F4D2] focus-visible:bg-[#EDF8DF] focus-visible:shadow-[0_0_0_1px_rgba(121,189,62,0.48),0_6px_16px_rgba(44,74,15,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                >
                  <span className="grid size-4 place-items-center" aria-hidden>
                    <Copy01Icon
                      size={16}
                      ref={(handle: IconHandle | null) => {
                        copyIconRef.current = handle;
                      }}
                      className={`col-start-1 row-start-1 transition-[opacity,filter] duration-150 ${
                        copied === 'hero'
                          ? 'opacity-0 blur-[4px]'
                          : 'opacity-100 blur-0'
                      }`}
                    />
                    <Tick02Icon
                      size={16}
                      ref={(handle: IconHandle | null) => {
                        tickIconRef.current = handle;
                      }}
                      className={`col-start-1 row-start-1 transition-[opacity,filter] duration-150 ${
                        copied === 'hero'
                          ? 'opacity-100 blur-0'
                          : 'opacity-0 blur-[4px]'
                      }`}
                    />
                  </span>
                </button>
                <span role="status" className="sr-only">
                  {copied === 'hero' && copiedCommandName
                    ? `${copiedCommandName} install command copied.`
                    : ''}
                </span>
              </div>
            </div>
          </section>

          <section aria-labelledby="icon-library-heading" className="pb-16">
            <div className="grid gap-5 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] sm:items-end">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2
                    id="icon-library-heading"
                    className="text-balance text-2xl font-bold tracking-[-0.02em] sm:text-3xl"
                  >
                    Pick an icon.
                  </h2>
                  <span
                    className="font-mono text-xs text-[#9DA19B]"
                    aria-live="polite"
                  >
                    {filtered.length === ICONS.length
                      ? `${ICONS.length} icons`
                      : `${filtered.length} of ${ICONS.length}`}
                  </span>
                </div>
                <p className="mt-1 text-pretty text-sm font-medium text-[#9DA19B]">
                  Hover to preview. Click any icon to copy its install command.
                </p>
              </div>

              <label
                className="group relative w-full"
                onPointerEnter={() =>
                  previewCommandIcon('search-01', searchIconRef.current)
                }
                onPointerLeave={() => stopCommandIcon(searchIconRef.current)}
                onFocusCapture={() =>
                  previewCommandIcon('search-01', searchIconRef.current)
                }
                onBlurCapture={() => stopCommandIcon(searchIconRef.current)}
              >
                <span className="sr-only">Search icons</span>
                <span
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#79BD3E] transition-colors duration-150 group-hover:text-[#4C7A22] group-focus-within:text-[#1D3208]"
                >
                  <Search01Icon
                    size={17}
                    aria-hidden
                    ref={(handle: IconHandle | null) => {
                      searchIconRef.current = handle;
                    }}
                  />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${ICONS.length} icons…`}
                  className="w-full rounded-xl border border-[#E5E5E3] bg-white py-3 pl-10 pr-4 text-[15px] font-medium text-[#141812] shadow-[0_1px_2px_rgba(20,24,18,0.04)] transition-[background-color,border-color,box-shadow] duration-150 placeholder:text-[#BFC2BD] hover:border-[#AFE67F] hover:bg-[#FBFCFA] hover:shadow-[0_2px_6px_rgba(20,24,18,0.06)] focus:outline-none focus-visible:border-[#79BD3E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                />
              </label>
            </div>

            <div
              aria-hidden
              className="h-px bg-gradient-to-r from-[#E5E5E3] via-[#E5E5E3] to-transparent"
            />

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <p className="font-medium text-[#696D6E]">
                  No icons match &ldquo;{query.trim()}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="min-h-10 cursor-pointer rounded-[10px] border border-[#E5E5E3] px-4 py-2 text-sm font-bold text-[#696D6E] transition-[color,border-color,scale] hover:border-[#79BD3E] hover:text-[#141812] active:scale-[0.96]"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
                {filtered.map(({ name, Icon, idx }, pos) => {
                  const isCopied = copied === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => copy(name, name)}
                      onPointerEnter={() => refs.current[idx]?.startAnimation()}
                      onPointerLeave={() => refs.current[idx]?.stopAnimation()}
                      onFocus={() => refs.current[idx]?.startAnimation()}
                      onBlur={() => refs.current[idx]?.stopAnimation()}
                      className="tile-enter group relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border transition-[transform,background-color,border-color] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                      style={{
                        backgroundColor: isCopied ? COPIED_TINT.bg : '#F5F5F4',
                        borderColor: isCopied
                          ? COPIED_TINT.border
                          : 'transparent',
                        color: isCopied ? COPIED_TINT.ink : '#141812',
                        // cap the cascade so late rows don't feel laggy
                        ['--tile-delay' as string]: `${Math.min(pos * 22, 360)}ms`,
                      }}
                    >
                      <span
                        aria-hidden
                        className={`absolute right-1.5 top-1.5 rounded-full bg-white px-2 py-0.5 font-mono text-[9px] text-[#696D6E] shadow-[0_1px_3px_rgba(20,24,18,0.08)] transition-opacity duration-150 ${
                          isCopied
                            ? 'opacity-0'
                            : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        copy
                      </span>
                      <Icon
                        size={32}
                        ref={(h: IconHandle | null) => {
                          refs.current[idx] = h;
                        }}
                      />
                      <span className="max-w-full truncate px-2 font-mono text-[10px] leading-none opacity-50 transition-opacity duration-150 group-hover:opacity-100">
                        {isCopied ? 'copied!' : name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </main>

        <footer className="mt-auto">
          {/* soft hairline instead of a hard border */}
          <div
            aria-hidden
            className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[#E5E5E3] to-transparent"
          />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div className="max-w-sm space-y-3 text-sm font-medium leading-relaxed text-[#696D6E]">
              <p>
                Base icons come from{' '}
                <a
                  href="https://hugeicons.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={textLink}
                >
                  Hugeicons
                </a>
                &apos;{' '}
                <a
                  href="https://www.npmjs.com/package/@hugeicons/core-free-icons"
                  className={textLink}
                >
                  core-free-icons package
                </a>
                . Animations use{' '}
                <a href="https://motion.dev" className={textLink}>
                  motion
                </a>
                . The{' '}
                <a href="https://ui.shadcn.com/docs/cli" className={textLink}>
                  shadcn CLI
                </a>{' '}
                installs each icon as source.
              </p>
              <button
                type="button"
                onPointerEnter={() =>
                  previewCommandIcon('favourite', favouriteIconRef.current)
                }
                onPointerLeave={() => stopCommandIcon(favouriteIconRef.current)}
                onFocus={() =>
                  previewCommandIcon('favourite', favouriteIconRef.current)
                }
                onBlur={() => stopCommandIcon(favouriteIconRef.current)}
                className="flex min-h-10 w-fit items-center gap-2 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
              >
                <FavouriteIcon
                  size={15}
                  aria-hidden
                  className="shrink-0"
                  ref={(handle: IconHandle | null) => {
                    favouriteIconRef.current = handle;
                  }}
                />
                <span className="sm:whitespace-nowrap">
                  Every icon on this page is hoverable. Even this one.
                </span>
              </button>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                <li>
                  <a href={GITHUB_URL} className={textLink}>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={`${GITHUB_URL}/blob/main/README.md`} className={textLink}>
                    MIT license
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
