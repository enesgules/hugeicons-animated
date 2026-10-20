'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { ICON_LIST } from '@/app/icons-manifest';
import { Tick02Icon } from '@/icons/tick-02';
import { DISAPPROVED_ICON_NAMES } from '@/lib/icon-approval';
import type { AnimatedIconHandle } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

const DISAPPROVED_ICONS = ICON_LIST.map((icon, index) => ({
  ...icon,
  index,
})).filter(({ name }) => DISAPPROVED_ICON_NAMES.has(name));

/** List the animations that are hidden from the public gallery. */
export function IconReview() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const iconRefs = useRef<Array<AnimatedIconHandle | null>>([]);

  const visibleIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return DISAPPROVED_ICONS;

    return DISAPPROVED_ICONS.filter(({ name }) =>
      name.includes(normalizedQuery)
    );
  }, [query]);

  const clearSearch = () => setQuery('');

  const updateSelection = (
    change: (current: ReadonlySet<string>) => ReadonlySet<string>
  ) => {
    setCopied(false);
    setSelected(change);
  };

  const toggle = (name: string) =>
    updateSelection((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const selectShown = () =>
    updateSelection(
      (current) => new Set([...current, ...visibleIcons.map(({ name }) => name)])
    );

  // The owner pastes this line into chat to approve the selection.
  const copySelection = async () => {
    await navigator.clipboard.writeText(
      `approve: ${[...selected].sort().join(', ')}`
    );
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#141812]">
      <header className="sticky top-0 z-30 border-b border-[#141812]/8 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center rounded-lg px-2 text-sm font-bold transition-[background-color,scale] duration-150 hover:bg-[#F5F5F4] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
          >
            ← Gallery
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section aria-labelledby="review-heading">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#79BD3E]">
              Internal review
            </p>
            <h1
              id="review-heading"
              className="mt-3 text-balance text-4xl font-bold tracking-[-0.045em] sm:text-5xl"
            >
              Disapproved animations
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base font-medium leading-7 text-[#777C74]">
              These icons stay off the public gallery until their animations
              are approved. Hover or focus an icon to replay it. Click icons to
              select them, then copy their names to approve them.
            </p>
          </div>

          {DISAPPROVED_ICONS.length > 0 ? (
            <>
              <label className="mt-10 block w-full max-w-xl">
                <span className="mb-2 block text-sm font-bold">
                  Search disapproved icons
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${DISAPPROVED_ICONS.length} icons`}
                  className="min-h-12 w-full rounded-xl border border-[#DADDD7] bg-white px-4 text-base font-medium outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#A2A69F] focus:border-[#79BD3E] focus:shadow-[0_0_0_3px_rgba(175,230,127,0.3)]"
                />
              </label>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-mono text-xs font-medium text-[#777C74]">
                  {query
                    ? `${visibleIcons.length} of ${DISAPPROVED_ICONS.length}`
                    : `${DISAPPROVED_ICONS.length} disapproved`}
                </p>
                {visibleIcons.length > 0 && (
                  <button
                    type="button"
                    onClick={selectShown}
                    className="min-h-8 rounded-lg px-2 text-xs font-bold text-[#4C7A22] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                  >
                    Select all shown
                  </button>
                )}
              </div>

              {visibleIcons.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                  {visibleIcons.map(({ name, Icon, index }) => {
                    const isSelected = selected.has(name);
                    return (
                    <button
                      key={name}
                      id={name}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        toggle(name);
                        iconRefs.current[index]?.startAnimation();
                      }}
                      onPointerEnter={() =>
                        iconRefs.current[index]?.startAnimation()
                      }
                      onPointerLeave={() =>
                        iconRefs.current[index]?.stopAnimation()
                      }
                      onFocus={() =>
                        iconRefs.current[index]?.startAnimation()
                      }
                      onBlur={() =>
                        iconRefs.current[index]?.stopAnimation()
                      }
                      className={cn(
                        'group relative flex min-h-36 scroll-mt-24 flex-col items-center justify-center gap-3 rounded-2xl px-3 py-4 text-center transition-[background-color,box-shadow,scale] duration-150 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 target:shadow-[0_0_0_2px_#9F1239]',
                        isSelected
                          ? 'bg-[#EDF8DF] text-[#2C4A0F] shadow-[0_0_0_2px_#79BD3E] focus-visible:outline-[#4C7A22]'
                          : 'bg-[#FFF1F2] text-[#881337] shadow-[0_0_0_1px_#FECDD3,0_1px_2px_rgba(136,19,55,0.05)] hover:bg-[#FFF7F8] hover:shadow-[0_0_0_1px_#FECDD3,0_8px_24px_rgba(136,19,55,0.08)] focus-visible:outline-[#9F1239]'
                      )}
                    >
                      <Icon
                        ref={(handle: AnimatedIconHandle | null) => {
                          iconRefs.current[index] = handle;
                        }}
                        size={34}
                        aria-hidden
                        className="pointer-events-none"
                      />
                      <span className="min-w-0 max-w-full font-mono text-[11px] font-semibold leading-4 break-words">
                        {name}
                      </span>
                      {isSelected && (
                        <span className="absolute top-2 right-2 grid size-5 place-items-center rounded-full bg-[#79BD3E] text-white">
                          <Tick02Icon
                            size={13}
                            aria-hidden
                            className="pointer-events-none"
                          />
                        </span>
                      )}
                    </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-[#F7F7F5] px-6 py-14 text-center shadow-[0_0_0_1px_rgba(20,24,18,0.08)]">
                  <p className="text-lg font-bold">
                    No disapproved icons match &ldquo;{query.trim()}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-3 min-h-10 rounded-lg px-3 text-sm font-bold text-[#4C7A22] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-10 rounded-2xl bg-[#F7F7F5] px-6 py-14 text-center shadow-[0_0_0_1px_rgba(20,24,18,0.08)]">
              <p className="text-lg font-bold">All animations are approved.</p>
            </div>
          )}
        </section>
      </main>

      {selected.size > 0 && (
        <div className="sticky bottom-0 z-30 border-t border-[#141812]/8 bg-white/92 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-3 sm:px-8">
            <p className="mr-auto text-sm font-bold" aria-live="polite">
              {selected.size} selected
            </p>
            <button
              type="button"
              onClick={() => updateSelection(() => new Set())}
              className="min-h-10 rounded-lg px-3 text-sm font-bold text-[#696D6E] transition-[background-color,color,scale] duration-150 hover:bg-[#F7F7F5] hover:text-[#141812] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={copySelection}
              className="min-h-10 rounded-lg bg-[#AFE67F] px-4 text-sm font-bold text-[#1D3208] shadow-[0_0_0_1px_#79BD3E] transition-[background-color,scale] duration-150 hover:bg-[#A3DE6F] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
            >
              {copied ? 'Copied' : 'Copy names'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
