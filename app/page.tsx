import { Home } from '@/app/home';
import { GITHUB_REPO } from '@/lib/site';

// Server-side with ISR: one GitHub API call per hour for all visitors, no
// client rate limit, and the count is in the HTML so the header does not shift.
async function getStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const { stargazers_count } = (await res.json()) as {
      stargazers_count: number;
    };
    return stargazers_count;
  } catch {
    return null;
  }
}

export default async function Page() {
  return <Home stars={await getStars()} />;
}
