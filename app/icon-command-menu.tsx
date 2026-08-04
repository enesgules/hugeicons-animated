'use client';

import { useEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { ICON_LIST } from '@/app/icons-manifest';
import { Copy01Icon } from '@/icons/copy-01';
import { Search01Icon } from '@/icons/search-01';
import type { AnimatedIconHandle as IconHandle } from '@/lib/use-icon-animation';

type IconCommandMenuProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onSelectIcon: (name: string) => void;
  showTrigger: boolean;
};

export function IconCommandMenu({
  query,
  onQueryChange,
  onSelectIcon,
  showTrigger,
}: IconCommandMenuProps) {
  const [open, setOpen] = useState(false);
  const iconRefs = useRef<(IconHandle | null)[]>([]);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || (!event.metaKey && !event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      setOpen((isOpen) => {
        if (!isOpen && document.activeElement instanceof HTMLElement) {
          restoreFocusRef.current = document.activeElement;
        }
        return !isOpen;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) return;
    iconRefs.current.forEach((handle) => handle?.stopAnimation());

    const restoreFocusTimer = setTimeout(() => {
      restoreFocusRef.current?.focus();
    });

    return () => clearTimeout(restoreFocusTimer);
  }, [open]);

  const selectIcon = (name: string) => {
    onSelectIcon(name);
    setOpen(false);
  };

  return (
    <>
      {showTrigger ? (
        <button
          type="button"
          aria-label="Open icon search"
          aria-keyshortcuts="Meta+K Control+K"
          onClick={(event) => {
            restoreFocusRef.current = event.currentTarget;
            setOpen(true);
          }}
          className="absolute right-2 top-1/2 flex min-h-8 min-w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-[#F7F7F5] px-2 font-mono text-[10px] font-semibold text-[#696D6E] shadow-[0_0_0_1px_rgba(20,24,18,0.08)] transition-[background-color,color,scale] duration-150 hover:bg-[#EDF8DF] hover:text-[#2C4A0F] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
        >
          <span aria-hidden>⌘K</span>
        </button>
      ) : null}

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search animated icons"
        loop
        overlayClassName="fixed inset-0 z-50 bg-[#141812]/20 backdrop-blur-[2px]"
        contentClassName="fixed left-1/2 top-[min(18vh,9rem)] z-50 w-[calc(100%-2rem)] max-w-[34rem] -translate-x-1/2 overflow-hidden rounded-[20px] bg-white text-[#141812] shadow-[0_24px_80px_rgba(20,24,18,0.22),0_0_0_1px_rgba(20,24,18,0.08)] outline-none"
      >
        <div className="flex items-center gap-3 border-b border-[#E5E5E3] px-4">
          <Search01Icon
            size={19}
            aria-hidden
            className="shrink-0 text-[#79BD3E]"
          />
          <Command.Input
            value={query}
            onValueChange={onQueryChange}
            aria-label="Search animated icons"
            placeholder={`Search ${ICON_LIST.length} icons…`}
            className="h-14 min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[#BFC2BD]"
          />
          <kbd className="hidden rounded-md bg-[#F7F7F5] px-2 py-1 font-mono text-[10px] font-semibold text-[#9DA19B] shadow-[0_0_0_1px_rgba(20,24,18,0.08)] sm:block">
            ESC
          </kbd>
        </div>

        <Command.List
          label="Animated icons"
          className="max-h-[min(25rem,60vh)] scroll-py-2 overflow-y-auto overscroll-contain p-2"
        >
          <Command.Empty className="px-4 py-12 text-center text-sm font-medium text-[#696D6E]">
            No icons found.
          </Command.Empty>
          <Command.Group
            heading="Icons"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-[#9DA19B]"
          >
            {ICON_LIST.map(({ name, Icon }, index) => (
              <Command.Item
                key={name}
                value={name}
                onSelect={selectIcon}
                onPointerEnter={() => iconRefs.current[index]?.startAnimation()}
                onPointerLeave={() => iconRefs.current[index]?.stopAnimation()}
                className="group flex min-h-11 cursor-pointer select-none items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#696D6E] outline-none transition-[background-color,color] duration-100 data-[selected=true]:bg-[#EDF8DF] data-[selected=true]:text-[#1D3208]"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#F7F7F5] text-[#141812] shadow-[0_0_0_1px_rgba(20,24,18,0.06)] transition-[background-color,color] duration-100 group-data-[selected=true]:bg-white group-data-[selected=true]:text-[#2C4A0F]">
                  <Icon
                    size={19}
                    aria-hidden
                    ref={(handle: IconHandle | null) => {
                      iconRefs.current[index] = handle;
                    }}
                  />
                </span>
                <span className="min-w-0 flex-1 truncate font-mono text-xs">
                  {name}
                </span>
                <Copy01Icon
                  size={16}
                  aria-hidden
                  className="shrink-0 opacity-0 transition-opacity duration-100 group-data-[selected=true]:opacity-60"
                />
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-t border-[#E5E5E3] px-4 py-2.5 font-mono text-[10px] font-medium text-[#9DA19B]">
          <span>Enter to copy</span>
          <span>↑↓ to navigate</span>
        </div>
      </Command.Dialog>
    </>
  );
}
