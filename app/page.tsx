'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { ICON_LIST } from '@/app/icons-manifest';
import { GITHUB_URL } from '@/lib/site';
import { FavouriteIcon } from '@/icons/favourite';
import { Notification03Icon } from '@/icons/notification-03';
import { Search01Icon } from '@/icons/search-01';

interface IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

// pastel tints (bg / border / stroke), echoing hugeicons.com's card strip
const TINTS = [
  { bg: '#F8F1E4', border: '#EBDDBF', ink: '#A5793A' }, // amber
  { bg: '#EAF0FA', border: '#D4E0F2', ink: '#5878B5' }, // blue
  { bg: '#EEF2E3', border: '#DCE4C7', ink: '#75894E' }, // sage
  { bg: '#F9ECEA', border: '#EFD6D2', ink: '#B26A5C' }, // rose
  { bg: '#F9EAF1', border: '#F0D2E1', ink: '#BE5B8D' }, // pink
  { bg: '#EFECF8', border: '#DED8F0', ink: '#75629F' }, // violet
];

// copied-state tint — the lime accent, so feedback reads as "brand said yes"
const COPIED_TINT = { bg: '#E9F7C8', border: '#A8D94F', ink: '#4A5D1E' };

const ICONS = ICON_LIST.map((icon, i) => ({
  ...icon,
  idx: i, // stable ref slot — survives filtering
  // diagonal shift so columns don't repeat the same hue row over row
  ...TINTS[(i + Math.floor(i / 6)) % TINTS.length],
}));

const matches = (query: string) => {
  const q = query.trim().toLowerCase();
  return q ? ICONS.filter(({ name }) => name.includes(q)) : ICONS;
};

const installCommand = (name: string) =>
  `npx shadcn@latest add "${typeof window === 'undefined' ? '' : window.location.origin}/r/${name}.json"`;

// shared link treatment for footer / header text links
const textLink =
  'rounded-sm text-[#6E7263] underline-offset-4 decoration-[#C9D8A4] transition-colors hover:text-[#1A1C16] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]';

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.11c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.38 2.9-.39.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.13v3.16c0 .31.21.66.8.55A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const refs = useRef<(IconHandle | null)[]>([]);
  const heroBell = useRef<IconHandle | null>(null);
  const logoRef = useRef<IconHandle | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // signature: the grid is alive — visible icons take turns animating
  useEffect(() => {
    if (reduced) return;
    const visible = matches(query);
    if (visible.length === 0) return;
    let i = 0;
    const id = setInterval(() => {
      const handle = refs.current[visible[i % visible.length].idx];
      handle?.startAnimation();
      setTimeout(() => handle?.stopAnimation(), 1200);
      i++;
    }, 3200);
    return () => clearInterval(id);
  }, [reduced, query]);

  // the headline demos the product: the inline bell rings on load,
  // then again every few seconds, offset from the grid's wave
  useEffect(() => {
    if (reduced) return;
    const ring = () => {
      heroBell.current?.startAnimation();
      setTimeout(() => heroBell.current?.stopAnimation(), 1200);
    };
    const greet = setTimeout(ring, 900);
    const id = setInterval(ring, 6400);
    return () => {
      clearTimeout(greet);
      clearInterval(id);
    };
  }, [reduced]);

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
    setTimeout(() => setCopied(null), 1600);
    // the logo bell rings whenever something is copied
    if (!reduced) {
      logoRef.current?.startAnimation();
      setTimeout(() => logoRef.current?.stopAnimation(), 1200);
    }
  };

  const filtered = matches(query);

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="relative flex min-h-screen w-full flex-col bg-[#FAF8F3] text-[#1A1C16]"
      >
        {/* scroll sentinel for the header material */}
        <div ref={sentinelRef} aria-hidden className="absolute top-0 h-px w-px" />

        <header
          className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? 'bg-[#FAF8F3]/80 backdrop-blur-md [box-shadow:0_1px_0_rgba(26,28,22,0.06),0_12px_32px_-24px_rgba(26,28,22,0.35)]'
              : 'bg-transparent'
          }`}
        >
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
            <a
              href="#top"
              onMouseEnter={() => logoRef.current?.startAnimation()}
              onMouseLeave={() => logoRef.current?.stopAnimation()}
              onFocus={() => logoRef.current?.startAnimation()}
              onBlur={() => logoRef.current?.stopAnimation()}
              className="flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75894E]"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-xl border border-[#A8D94F] bg-[#C9EF7A] text-[#2A3413]">
                <Notification03Icon
                  size={17}
                  aria-hidden
                  ref={(h: IconHandle | null) => {
                    logoRef.current = h;
                  }}
                />
              </span>
              <span className="[font-family:var(--font-display)] text-lg font-semibold leading-none tracking-[-0.01em]">
                hugeicons <span className="text-[#8A8D80]">animated</span>
              </span>
            </a>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={GITHUB_URL}
                aria-label="Star hugeicons-animated on GitHub"
                className="flex items-center gap-1.5 rounded-full border border-[#E7E3D5] bg-white/50 px-3 py-1.5 text-sm text-[#3D4034] transition-colors hover:border-[#A8D94F] hover:bg-[#C9EF7A]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]"
              >
                <GitHubMark className="size-4" />
                <span className="hidden sm:inline">Star</span>
              </a>
              <a
                href="https://hugeicons.com"
                className={`hidden text-sm md:inline ${textLink}`}
              >
                Hugeicons ↗
              </a>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
          <section className="pt-10 pb-12 sm:pt-16">
            <h1 className="[font-family:var(--font-display)] text-[clamp(2.6rem,7.5vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.025em]">
              Beautiful icons.
              <br />
              <span className="text-[#ADB0A2]">
                Now they{' '}
                <span className="mx-[0.06em] inline-grid size-[0.95em] translate-y-[0.14em] place-items-center rounded-[0.26em] border border-[#A8D94F] bg-[#C9EF7A] text-[#3A4A16] [&_svg]:size-[0.58em] [&>div]:flex">
                  <Notification03Icon
                    aria-hidden
                    size={24}
                    ref={(h: IconHandle | null) => {
                      heroBell.current = h;
                    }}
                  />
                </span>{' '}
                move.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-[1.6] text-[#6E7263]">
              Hand-animated{' '}
              <a
                href="https://hugeicons.com"
                className="underline decoration-[#C9D8A4] underline-offset-4"
              >
                Hugeicons
              </a>{' '}
              for React, built with motion. Each icon installs as plain source
              you own — no package, no lock-in.
            </p>

            <button
              type="button"
              onClick={() => copy('notification-03', 'hero')}
              className="group mt-8 flex w-fit cursor-pointer items-center gap-3 rounded-2xl border border-[#A8D94F] bg-[#C9EF7A] py-3 pr-3 pl-4 transition-transform duration-[160ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]"
            >
              <span className="grid text-left font-mono text-sm text-[#2A3413]">
                <span
                  aria-hidden={copied === 'hero'}
                  className={`col-start-1 row-start-1 transition-[opacity,filter] duration-200 ${
                    copied === 'hero' ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0'
                  }`}
                >
                  <span className="opacity-50">$ </span>
                  npx shadcn@latest add …/r/notification-03.json
                </span>
                <span
                  aria-hidden={copied !== 'hero'}
                  className={`col-start-1 row-start-1 transition-[opacity,filter] duration-200 ${
                    copied === 'hero' ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'
                  }`}
                >
                  copied to clipboard!
                </span>
              </span>
              <span className="rounded-lg bg-[#2A3413]/10 px-2 py-1 font-mono text-[11px] text-[#2A3413] transition-colors group-hover:bg-[#2A3413]/15">
                {copied === 'hero' ? '✓' : 'copy'}
              </span>
            </button>
          </section>

          {/* toolbar: search + count + the hover/copy hint */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
            <label className="relative w-full max-w-xs">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8D80]">
                <Search01Icon size={16} aria-hidden />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search icons…"
                aria-label="Search icons"
                className="w-full rounded-full border border-[#E5E1D5] bg-white/70 py-2.5 pl-9 pr-4 text-sm text-[#1A1C16] placeholder:text-[#B4B7A9] focus:outline-none focus-visible:border-[#A8D94F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]"
              />
            </label>
            <span className="font-mono text-xs text-[#8A8D80]" aria-live="polite">
              {filtered.length === ICONS.length
                ? `${ICONS.length} icons`
                : `${filtered.length} of ${ICONS.length}`}
            </span>
            <span className="ml-auto hidden text-sm text-[#8A8D80] sm:block">
              Hover to preview — click to copy the install command.
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <p className="text-[#6E7263]">
                No icons match &ldquo;{query.trim()}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="cursor-pointer rounded-full border border-[#E5E1D5] px-4 py-2 text-sm text-[#6E7263] transition-colors hover:border-[#A8D94F] hover:text-[#1A1C16]"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-2 pb-16 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
              {filtered.map(({ name, Icon, idx, bg, border, ink }, pos) => {
                const isCopied = copied === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => copy(name, name)}
                    onMouseEnter={() => refs.current[idx]?.startAnimation()}
                    onMouseLeave={() => refs.current[idx]?.stopAnimation()}
                    onFocus={() => refs.current[idx]?.startAnimation()}
                    onBlur={() => refs.current[idx]?.stopAnimation()}
                    className="tile-enter group relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border transition-[transform,background-color,border-color] duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]"
                    style={{
                      backgroundColor: isCopied ? COPIED_TINT.bg : bg,
                      borderColor: isCopied ? COPIED_TINT.border : border,
                      color: isCopied ? COPIED_TINT.ink : ink,
                      // cap the cascade so late rows don't feel laggy
                      ['--tile-delay' as string]: `${Math.min(pos * 30, 600)}ms`,
                    }}
                  >
                    <span
                      aria-hidden
                      className={`absolute right-1.5 top-1.5 rounded-full bg-white/70 px-2 py-0.5 font-mono text-[9px] text-[#6E7263] transition-opacity duration-150 ${
                        isCopied ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
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
                    <span className="max-w-full truncate px-2 font-mono text-[10px] leading-none opacity-60 transition-opacity duration-150 group-hover:opacity-100">
                      {isCopied ? 'copied!' : name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </main>

        <footer className="mt-auto">
          {/* soft hairline instead of a hard border */}
          <div
            aria-hidden
            className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[#E3DFCF] to-transparent"
          />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div className="max-w-sm space-y-3 text-sm leading-relaxed text-[#6E7263]">
              <p>
                Icons by{' '}
                <a href="https://hugeicons.com" className={textLink}>
                  Hugeicons
                </a>
                , hand-animated with{' '}
                <a href="https://motion.dev" className={textLink}>
                  motion
                </a>
                , distributed as source via the{' '}
                <a href="https://ui.shadcn.com/docs/cli" className={textLink}>
                  shadcn CLI
                </a>
                .
              </p>
              <div className="flex items-center gap-2">
                <FavouriteIcon size={15} aria-hidden className="shrink-0" />
                <span>Every icon on this page is hoverable — even this one.</span>
              </div>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
                <li>
                  <a href="https://github.com/pqoqubbw/icons" className={textLink}>
                    pqoqubbw/icons
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/@hugeicons/core-free-icons"
                    className={textLink}
                  >
                    core-free-icons
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
