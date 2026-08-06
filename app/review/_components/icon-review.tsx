'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { ICON_LIST } from '@/app/icons-manifest';
import { DISAPPROVED_ICON_NAMES } from '@/lib/icon-approval';
import type { AnimatedIconHandle } from '@/lib/use-icon-animation';

const DISAPPROVED_ICONS = ICON_LIST.map((icon, index) => ({
  ...icon,
  index,
})).filter(({ name }) => DISAPPROVED_ICON_NAMES.has(name));

/** List the animations that are hidden from the public gallery. */
export function IconReview() {
  const [query, setQuery] = useState('');
  const iconRefs = useRef<Array<AnimatedIconHandle | null>>([]);

  const visibleIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return DISAPPROVED_ICONS;

    return DISAPPROVED_ICONS.filter(({ name }) =>
      name.includes(normalizedQuery)
    );
  }, [query]);

  const clearSearch = () => setQuery('');

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
              are approved. Hover, focus, or select an icon to replay it.
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

              <p className="mt-6 font-mono text-xs font-medium text-[#777C74]">
                {query
                  ? `${visibleIcons.length} of ${DISAPPROVED_ICONS.length}`
                  : `${DISAPPROVED_ICONS.length} disapproved`}
              </p>

              {visibleIcons.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                  {visibleIcons.map(({ name, Icon, index }) => (
                    <button
                      key={name}
                      type="button"
                      aria-label={`Replay the ${name} animation`}
                      onClick={() =>
                        iconRefs.current[index]?.startAnimation()
                      }
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
                      className="group flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl bg-[#FFF1F2] px-3 py-4 text-center text-[#881337] shadow-[0_0_0_1px_#FECDD3,0_1px_2px_rgba(136,19,55,0.05)] transition-[background-color,box-shadow,scale] duration-150 hover:bg-[#FFF7F8] hover:shadow-[0_0_0_1px_#FECDD3,0_8px_24px_rgba(136,19,55,0.08)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9F1239]"
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
                    </button>
                  ))}
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
    </div>
  );
}
