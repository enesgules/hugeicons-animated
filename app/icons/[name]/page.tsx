import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/app/_components/site-header';
import { CopyCommand } from '@/app/icons/[name]/copy-command';
import { PUBLIC_ICONS } from '@/lib/icon-approval';
import { installCommand, SITE_NAME } from '@/lib/site';

type Props = { params: Promise<{ name: string }> };

const words = (name: string) =>
  name.split('-').map((word) => word[0].toUpperCase() + word.slice(1));

const RELATED_OFFSETS = [-4, -3, -2, -1, 1, 2, 3, 4];

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLIC_ICONS.map(({ name }) => ({ name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const title = `Animated ${words(name).join(' ')} Icon for React`;
  const description = `A hand-animated ${words(name).join(' ')} icon for React, built with Motion. Install it as source code with ${installCommand(name)}.`;
  return {
    title,
    description,
    alternates: { canonical: `/icons/${name}` },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: `/icons/${name}`,
      title,
      description,
      // a page-level openGraph replaces the root opengraph-image, so name it again
      images: '/opengraph-image',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: '/opengraph-image',
    },
  };
}

export default async function IconPage({ params }: Props) {
  const { name } = await params;
  const index = PUBLIC_ICONS.findIndex((icon) => icon.name === name);
  if (index === -1) notFound();

  const { Icon } = PUBLIC_ICONS[index];
  const title = words(name).join(' ');
  const component = `${words(name).join('')}Icon`;
  // ponytail: alphabetical neighbours share name prefixes, so they read as related
  const related = RELATED_OFFSETS.map(
    (offset) =>
      PUBLIC_ICONS[(index + offset + PUBLIC_ICONS.length) % PUBLIC_ICONS.length]
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#141812]">
      <SiteHeader />

      <main
        id="main"
        className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14"
      >
        <Link
          href="/"
          className="inline-flex min-h-10 items-center rounded-lg text-sm font-bold text-[#696D6E] transition-colors duration-150 hover:text-[#141812] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
        >
          ← All icons
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:items-start">
          <div className="grid aspect-square place-items-center rounded-3xl bg-[#F5F5F4]">
            <Icon size={96} />
          </div>

          <div className="min-w-0">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#79BD3E]">
              {name}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
              Animated {title} icon
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base font-medium leading-7 text-[#777C74]">
              A hand-animated Hugeicons icon for React, built with Motion. Hover
              the preview to play it. Install it as source code you own.
            </p>

            <h2 className="mt-10 mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#9DA19B]">
              Install
            </h2>
            <CopyCommand command={installCommand(name)} />

            <h2 className="mt-8 mb-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[#9DA19B]">
              Usage
            </h2>
            <pre className="overflow-x-auto rounded-2xl border border-[#E5E5E3] bg-[#F7F7F5] p-4 font-mono text-xs leading-5 text-[#2C4A0F]">
              <code>{`import { ${component} } from '@/components/ui/${name}';

// hover animates automatically
<${component} size={28} />`}</code>
            </pre>
          </div>
        </div>

        <section aria-labelledby="related-heading" className="mt-16">
          <h2
            id="related-heading"
            className="text-2xl font-bold tracking-[-0.02em]"
          >
            Related icons
          </h2>
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
            {related.map(({ name: relatedName, Icon: RelatedIcon }) => (
              <li key={relatedName}>
                <Link
                  href={`/icons/${relatedName}`}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-[#F5F5F4] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(20,24,18,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C7A22]"
                >
                  <RelatedIcon size={32} aria-hidden />
                  <span className="max-w-full truncate px-2 font-mono text-[10px] leading-none text-[#696D6E]">
                    {relatedName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-[#AFE67F] px-5 text-sm font-bold text-[#1D3208] shadow-[0_0_0_1px_#79BD3E,0_2px_4px_rgba(44,74,15,0.1)] transition-[background-color,box-shadow,scale] duration-150 hover:bg-[#BDF096] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4C7A22]"
          >
            Browse all {PUBLIC_ICONS.length} icons
          </Link>
        </section>
      </main>
    </div>
  );
}
