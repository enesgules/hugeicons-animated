import type { Metadata } from 'next';
import { IconReview } from '@/app/review/_components/icon-review';

export const metadata: Metadata = {
  title: 'Animation review',
  description: 'Review animations that are hidden from the public gallery.',
  robots: { index: false, follow: false },
};

/** Render the animation review list. */
export default function ReviewPage() {
  return <IconReview />;
}
