import Link from 'next/link';
import { Notification03Icon } from '@/icons/notification-03';

export function SiteHeader() {
  return (
    <header className="relative z-10">
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Hugeicons Animated home"
          className="group flex min-h-10 min-w-0 w-fit items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C7A22]"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-[9px] border border-[#79BD3E] bg-[#AFE67F] text-[#1D3208]">
            <Notification03Icon
              size={17}
              aria-hidden
              className="[&_path]:[stroke-width:1.8]"
            />
          </span>
          <span className="whitespace-nowrap text-[17px] font-bold leading-none tracking-[-0.025em]">
            hugeicons <span className="text-[#9DA19B]">animated</span>
          </span>
        </Link>
      </nav>
    </header>
  );
}
