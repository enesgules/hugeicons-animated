'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import { ICON_LIST } from '@/app/icons-manifest';
import { Notification03Icon } from '@/icons/notification-03';

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

const ICONS = ICON_LIST.map((icon, i) => ({
  ...icon,
  // diagonal shift so columns don't repeat the same hue row over row
  ...TINTS[(i + Math.floor(i / 6)) % TINTS.length],
}));

const installCommand = (name: string) =>
  `npx shadcn@latest add "${typeof window === 'undefined' ? '' : window.location.origin}/r/${name}.json"`;

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const refs = useRef<(IconHandle | null)[]>([]);
  const reduced = useReducedMotion();

  // signature: the grid is alive — icons take turns animating
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = setInterval(() => {
      const handle = refs.current[i % ICONS.length];
      handle?.startAnimation();
      const current = handle;
      setTimeout(() => current?.stopAnimation(), 1200);
      i++;
    }, 3200);
    return () => clearInterval(id);
  }, [reduced]);

  const copy = (name: string, id: string) => {
    navigator.clipboard.writeText(installCommand(name));
    setCopied(id);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-[#FAF8F3] text-[#1A1C16]">
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-6">
          <nav className="flex items-center justify-between py-6">
            <span className="flex items-center gap-2 [font-family:var(--font-baloo)] text-lg font-bold">
              <Notification03Icon size={20} aria-hidden />
              hugeicons animated
            </span>
            <a
              href="https://hugeicons.com"
              className="text-sm text-[#8A8D80] transition-colors hover:text-[#1A1C16]"
            >
              icons by Hugeicons ↗
            </a>
          </nav>

          <main className="flex flex-1 flex-col justify-center py-16">
            <h1 className="[font-family:var(--font-baloo)] text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Beautiful icons.
              <br />
              <span className="text-[#B4B7A9]">Now they move.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#6E7263]">
              Hand-animated{' '}
              <a href="https://hugeicons.com" className="underline underline-offset-4 decoration-[#C9D8A4]">
                Hugeicons
              </a>{' '}
              for React, built with motion. Each icon installs as plain source
              you own.
            </p>

            <button
              type="button"
              onClick={() => copy('notification-03', 'hero')}
              className="mt-8 w-fit cursor-pointer rounded-full border border-[#A8D94F] bg-[#C9EF7A] px-5 py-3 font-mono text-sm text-[#2A3413] transition-transform duration-[160ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]"
            >
              <span className="grid text-center">
                <span
                  aria-hidden={copied === 'hero'}
                  className={`col-start-1 row-start-1 transition-[opacity,filter] duration-200 ${
                    copied === 'hero' ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0'
                  }`}
                >
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
            </button>

            <p className="mt-3 text-sm text-[#8A8D80]">
              Hover any icon to preview — click it to copy its install command.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {ICONS.map(({ name, Icon, bg, border, ink }, i) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => copy(name, name)}
                  onMouseEnter={() => refs.current[i]?.startAnimation()}
                  onMouseLeave={() => refs.current[i]?.stopAnimation()}
                  onFocus={() => refs.current[i]?.startAnimation()}
                  onBlur={() => refs.current[i]?.stopAnimation()}
                  className="tile-enter group flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75894E]"
                  style={{
                    backgroundColor: bg,
                    borderColor: border,
                    color: ink,
                    // cap the cascade so late rows don't feel laggy
                    ['--tile-delay' as string]: `${Math.min(i * 30, 700)}ms`,
                  }}
                >
                  <Icon
                    size={34}
                    ref={(h: IconHandle | null) => {
                      refs.current[i] = h;
                    }}
                  />
                  <span className="px-1 font-mono text-[11px] opacity-80">
                    {copied === name ? 'copied!' : name}
                  </span>
                </button>
              ))}
            </div>
          </main>

          <footer className="flex flex-wrap items-center gap-x-2 gap-y-1 py-8 text-sm text-[#8A8D80]">
            <span>
              Free icons from{' '}
              <a
                href="https://www.npmjs.com/package/@hugeicons/core-free-icons"
                className="underline underline-offset-4"
              >
                @hugeicons/core-free-icons
              </a>{' '}
              (MIT)
            </span>
            <span aria-hidden>·</span>
            <span>
              inspired by{' '}
              <a
                href="https://github.com/pqoqubbw/icons"
                className="underline underline-offset-4"
              >
                pqoqubbw/icons
              </a>
            </span>
          </footer>
        </div>
      </div>
    </MotionConfig>
  );
}
