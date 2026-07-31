# hugeicons-animated

A curated collection of hand-animated [Hugeicons](https://hugeicons.com) built with [motion](https://motion.dev), distributed as copy-paste components via the shadcn CLI. Inspired by [pqoqubbw/icons](https://github.com/pqoqubbw/icons).

## Usage

```bash
npx shadcn@latest add @hugeicons-animated/notification-03
```

```tsx
import { Notification03Icon } from '@/components/ui/notification-03';

// hover animates automatically
<Notification03Icon size={28} />

// or control it imperatively
const ref = useRef<Notification03IconHandle>(null);
ref.current?.startAnimation();
```

Finite gestures finish their beat even if the pointer leaves halfway through.
Looping gestures stop and return to rest. Reduced-motion preferences are
respected automatically.

## Animation rules

- Start with the verb the icon performs.
- Move only the part that carries that action.
- Use squash, stretch, and wobble when they make the gesture clearer at icon size.
- Keep related states on shared geometry and rotate directional siblings.
- Every finite gesture returns to the original Hugeicon pose.

## Adding a new icon

1. Add an animation spec to `scripts/icon-specs.mjs` — the spec holds the
   hand-crafted `Variants` (svg-level and/or per-element). Export names come
   from [`@hugeicons/core-free-icons`](https://www.npmjs.com/package/@hugeicons/core-free-icons).

2. Generate the component (and regenerate the site manifest + registry):

   ```bash
   node scripts/gen-animated.mjs NewIconName
   pnpm registry:build
   ```

   The grid in `app/page.tsx` picks up new icons automatically via
   `app/icons-manifest.ts`.

   (`pnpm icon:gen <Name>` still exists for a quick skeleton with a default
   draw-on animation, if you'd rather tune the file directly.)

## Development

```bash
pnpm dev
```

## License

MIT. Icon shapes from the free Hugeicons set (`@hugeicons/core-free-icons`, MIT).
