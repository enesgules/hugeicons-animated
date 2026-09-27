'use client';

import { useRef, useState } from 'react';
import { Copy01Icon } from '@/icons/copy-01';
import { Tick02Icon } from '@/icons/tick-02';
import type { AnimatedIconHandle } from '@/lib/use-icon-animation';

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copyIconRef = useRef<AnimatedIconHandle | null>(null);
  const tickIconRef = useRef<AnimatedIconHandle | null>(null);

  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    tickIconRef.current?.startAnimation();
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex min-h-13 w-full items-center gap-2 rounded-2xl border border-[#E5E5E3] bg-[#F7F7F5] p-1.5 pl-4 shadow-[0_1px_2px_rgba(20,24,18,0.04)]">
      <code className="min-w-0 flex-1 truncate font-mono text-[10px] leading-4 text-[#2C4A0F] sm:text-xs">
        <span className="text-[#696D6E]">$ </span>
        {command}
      </code>
      <button
        type="button"
        aria-label="Copy the install command"
        onClick={copy}
        onPointerEnter={() => copyIconRef.current?.startAnimation()}
        onFocus={() => copyIconRef.current?.startAnimation()}
        className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-[10px] bg-white text-[#2C4A0F] shadow-[0_0_0_1px_rgba(20,24,18,0.08),0_1px_2px_rgba(20,24,18,0.08)] transition-[background-color,box-shadow] duration-150 hover:bg-[#EDF8DF] hover:shadow-[0_0_0_1px_rgba(121,189,62,0.48),0_6px_16px_rgba(44,74,15,0.1)] active:bg-[#E3F4D2] focus-visible:bg-[#EDF8DF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
      >
        <span className="grid size-4 place-items-center" aria-hidden>
          <Copy01Icon
            size={16}
            ref={copyIconRef}
            className={`col-start-1 row-start-1 transition-[opacity,filter] duration-150 ${
              copied ? 'opacity-0 blur-[4px]' : 'opacity-100 blur-0'
            }`}
          />
          <Tick02Icon
            size={16}
            ref={tickIconRef}
            className={`col-start-1 row-start-1 transition-[opacity,filter] duration-150 ${
              copied ? 'opacity-100 blur-0' : 'opacity-0 blur-[4px]'
            }`}
          />
        </span>
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Install command copied.' : ''}
      </span>
    </div>
  );
}
