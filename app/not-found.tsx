import Link from 'next/link';
import { GhostIcon } from '@/icons/ghost';
import { Home01Icon } from '@/icons/home-01';
import { Notification03Icon } from '@/icons/notification-03';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-[#141812]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] size-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(175,230,127,0.18),transparent_68%)]"
      />

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

      <main
        id="main"
        className="relative z-10 flex flex-1 items-center justify-center px-5 py-16 sm:px-8 sm:py-24"
      >
        <section
          aria-labelledby="not-found-heading"
          className="flex w-full max-w-xl flex-col items-center text-center"
        >
          <div className="relative mb-8">
            <div
              aria-hidden
              className="absolute inset-[-1.5rem] rounded-full bg-[#EDF8DF] blur-2xl"
            />
            <div className="relative grid size-28 place-items-center rounded-[2rem] border border-[#DDECCF] bg-[#EDF8DF] text-[#4C7A22] shadow-[0_12px_32px_rgba(44,74,15,0.1)]">
              <GhostIcon size={54} aria-hidden />
            </div>
          </div>

          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#79BD3E]">
            Error 404
          </p>
          <h1
            id="not-found-heading"
            className="mt-3 text-balance text-4xl font-bold tracking-[-0.045em] sm:text-5xl"
          >
            This page wandered off.
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base font-medium leading-7 text-[#777C74] sm:text-lg">
            We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you
            back to the gallery.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#AFE67F] px-5 text-sm font-bold text-[#1D3208] shadow-[0_0_0_1px_#79BD3E,0_2px_4px_rgba(44,74,15,0.1)] transition-[background-color,box-shadow,scale] duration-150 hover:bg-[#BDF096] hover:shadow-[0_0_0_1px_#79BD3E,0_8px_20px_rgba(44,74,15,0.14)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4C7A22]"
          >
            <Home01Icon size={19} aria-hidden />
            Back to homepage
          </Link>
        </section>
      </main>

      <footer className="relative z-10">
        <div
          aria-hidden
          className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[#E5E5E3] to-transparent"
        />
        <p className="mx-auto max-w-6xl px-5 py-8 text-sm font-medium text-[#9DA19B] sm:px-8">
          Hand-animated icons for React.
        </p>
      </footer>
    </div>
  );
}
