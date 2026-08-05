import type { Metadata } from 'next';
import { IconReview } from '@/app/review/_components/icon-review';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: `Animation review · ${SITE_NAME}`,
  description: 'Review every icon animation and keep a local disapproval list.',
  robots: { index: false, follow: false },
};

/** Render the private animation review workspace. */
export default function ReviewPage() {
  return <IconReview />;
}
