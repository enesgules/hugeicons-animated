'use client';

import Link from 'next/link';
import { useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { ICON_LIST } from '@/app/icons-manifest';
import { DEFAULT_DISAPPROVED_ICON_NAMES } from '@/lib/icon-approval';
import type { AnimatedIconHandle } from '@/lib/use-icon-animation';

const STORAGE_KEY = 'hugeicons-animated:review:v1';
const ICON_NAME_SET = new Set(ICON_LIST.map(({ name }) => name));
const selectionListeners = new Set<() => void>();

let currentSelection: ReadonlySet<string> = DEFAULT_DISAPPROVED_ICON_NAMES;
let currentSerializedSelection: string | null | undefined;

type ReviewFilter = 'all' | 'disapproved' | 'approved';

type StoredReviewSelection = {
  readonly version: 1;
  readonly disapproved: ReadonlyArray<string>;
};

function parseStoredSelection(raw: string): ReadonlySet<string> | null {
  let value: unknown;

  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }

  if (
    typeof value !== 'object' ||
    value === null ||
    !('version' in value) ||
    value.version !== 1 ||
    !('disapproved' in value) ||
    !Array.isArray(value.disapproved) ||
    !value.disapproved.every(
      (name) => typeof name === 'string' && ICON_NAME_SET.has(name)
    )
  ) {
    return null;
  }

  return new Set(value.disapproved);
}

function notifySelectionListeners() {
  selectionListeners.forEach((listener) => listener());
}

function getSelectionSnapshot(): ReadonlySet<string> {
  let serialized: string | null = null;

  try {
    serialized = localStorage.getItem(STORAGE_KEY);
  } catch {
    return currentSelection;
  }

  if (serialized === currentSerializedSelection) return currentSelection;

  currentSerializedSelection = serialized;
  currentSelection = serialized
    ? (parseStoredSelection(serialized) ?? DEFAULT_DISAPPROVED_ICON_NAMES)
    : DEFAULT_DISAPPROVED_ICON_NAMES;
  return currentSelection;
}

function subscribeToSelection(listener: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    currentSerializedSelection = undefined;
    listener();
  };

  selectionListeners.add(listener);
  window.addEventListener('storage', handleStorage);

  return () => {
    selectionListeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
  };
}

function saveSelection(disapproved: ReadonlySet<string>) {
  const stored: StoredReviewSelection = {
    version: 1,
    disapproved: ICON_LIST.filter(({ name }) => disapproved.has(name)).map(
      ({ name }) => name
    ),
  };
  const serialized = JSON.stringify(stored);

  currentSelection = new Set(disapproved);
  currentSerializedSelection = serialized;

  try {
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // The review still works in memory when storage is unavailable.
  }

  notifySelectionListeners();
}

const filterLabels: ReadonlyArray<{
  readonly value: ReviewFilter;
  readonly label: string;
}> = [
  { value: 'all', label: 'All' },
  { value: 'disapproved', label: 'Disapproved' },
  { value: 'approved', label: 'Approved' },
];

/** Interactive workspace for reviewing and marking icon animations. */
export function IconReview() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const disapproved = useSyncExternalStore(
    subscribeToSelection,
    getSelectionSnapshot,
    () => DEFAULT_DISAPPROVED_ICON_NAMES
  );
  const [status, setStatus] = useState('');
  const iconRefs = useRef<Array<AnimatedIconHandle | null>>([]);

  const visibleIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ICON_LIST.map((icon, index) => ({ ...icon, index })).filter(
      ({ name }) => {
        if (normalizedQuery && !name.includes(normalizedQuery)) return false;
        if (filter === 'disapproved') return disapproved.has(name);
        if (filter === 'approved') return !disapproved.has(name);
        return true;
      }
    );
  }, [disapproved, filter, query]);

  const toggleIcon = (name: string) => {
    const next = new Set(disapproved);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    saveSelection(next);
    setStatus('Selection saved in this browser.');
  };

  const resetSelection = () => {
    const next = new Set(DEFAULT_DISAPPROVED_ICON_NAMES);
    saveSelection(next);
    setStatus('Restored the source-controlled review list.');
  };

  const copySelection = async () => {
    const names = ICON_LIST.filter(({ name }) => disapproved.has(name)).map(
      ({ name }) => name
    );

    try {
      await navigator.clipboard.writeText(JSON.stringify(names, null, 2));
      setStatus(`Copied ${names.length} disapproved icon names.`);
    } catch {
      setStatus('Could not copy the list.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#141812]">
      <header className="sticky top-0 z-30 border-b border-[#141812]/8 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center rounded-lg px-2 text-sm font-bold transition-[background-color,scale] duration-150 hover:bg-[#F5F5F4] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
          >
            ← Gallery
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetSelection}
              className="min-h-10 rounded-lg px-3 text-sm font-bold text-[#62675F] transition-[background-color,scale] duration-150 hover:bg-[#F5F5F4] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={copySelection}
              className="min-h-10 rounded-lg bg-[#AFE67F] px-4 text-sm font-bold text-[#1D3208] shadow-[0_0_0_1px_#79BD3E,0_1px_2px_rgba(29,50,8,0.12)] transition-[background-color,box-shadow,scale] duration-150 hover:bg-[#A5DF74] hover:shadow-[0_0_0_1px_#6EAE38,0_2px_4px_rgba(29,50,8,0.14)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
            >
              Copy list
            </button>
          </div>
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
              Pick the animations that need another pass.
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base font-medium leading-7 text-[#777C74]">
              Hover or focus an icon to replay it. Click the tile to mark it as
              disapproved. Your selection stays in this browser.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <label className="block w-full max-w-xl">
              <span className="mb-2 block text-sm font-bold">Search icons</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${ICON_LIST.length} icons`}
                className="min-h-12 w-full rounded-xl border border-[#DADDD7] bg-white px-4 text-base font-medium outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#A2A69F] focus:border-[#79BD3E] focus:shadow-[0_0_0_3px_rgba(175,230,127,0.3)]"
              />
            </label>

            <div className="flex flex-wrap gap-2" aria-label="Filter icons">
              {filterLabels.map(({ value, label }) => {
                const isActive = filter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(value)}
                    className={`min-h-10 rounded-lg px-3.5 text-sm font-bold transition-[background-color,color,box-shadow,scale] duration-150 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22] ${
                      isActive
                        ? 'bg-[#141812] text-white shadow-[0_0_0_1px_#141812]'
                        : 'bg-[#F5F5F4] text-[#62675F] shadow-[0_0_0_1px_rgba(20,24,18,0.08)] hover:bg-[#ECEDEB]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs font-medium text-[#777C74]">
              {visibleIcons.length} shown · {disapproved.size} disapproved
            </p>
            <p role="status" className="min-h-5 text-sm font-semibold text-[#4C7A22]">
              {status}
            </p>
          </div>

          {visibleIcons.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {visibleIcons.map(({ name, Icon, index }) => {
                const isDisapproved = disapproved.has(name);
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={isDisapproved}
                    onClick={() => toggleIcon(name)}
                    onPointerEnter={() => iconRefs.current[index]?.startAnimation()}
                    onPointerLeave={() => iconRefs.current[index]?.stopAnimation()}
                    onFocus={() => iconRefs.current[index]?.startAnimation()}
                    onBlur={() => iconRefs.current[index]?.stopAnimation()}
                    className={`group flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl px-3 py-4 text-center shadow-[0_0_0_1px_rgba(20,24,18,0.08),0_1px_2px_rgba(20,24,18,0.04)] transition-[background-color,color,box-shadow,scale] duration-150 hover:shadow-[0_0_0_1px_rgba(20,24,18,0.12),0_8px_24px_rgba(20,24,18,0.08)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22] ${
                      isDisapproved
                        ? 'bg-[#FFF1F2] text-[#881337] shadow-[0_0_0_1px_#FECDD3,0_1px_2px_rgba(136,19,55,0.05)]'
                        : 'bg-[#F7F7F5] text-[#141812] hover:bg-white'
                    }`}
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
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isDisapproved
                          ? 'bg-[#FFE4E6] text-[#9F1239]'
                          : 'bg-[#E7F5D8] text-[#365314]'
                      }`}
                    >
                      {isDisapproved ? 'Disapproved' : 'Approved'}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-[#F7F7F5] px-6 py-14 text-center shadow-[0_0_0_1px_rgba(20,24,18,0.08)]">
              <p className="text-lg font-bold">No icons match this view.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilter('all');
                }}
                className="mt-3 min-h-10 rounded-lg px-3 text-sm font-bold text-[#4C7A22] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
