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

- Name the action and animate only the geometry that communicates it.
- Preserve SVG primitives between poses. Rotate shared shapes and morph only
  paths with compatible commands; do not crossfade whole icons.
- Prefer a short, discrete, productive gesture. Use expressive or indefinite
  motion only when it communicates an important or genuinely ongoing state.
- Respect reduced-motion preferences. Nonessential autoplay must finish within
  five seconds or provide a pause control.
- Every finite gesture returns to the original Hugeicon pose.

The full [animation guidelines](docs/animation-guidelines.md) combine the
geometry approach from
[Morphing icons with Claude](https://benji.org/morphing-icons-with-claude) with
platform motion and accessibility guidance. The article's exact three-line
constraint is for a cross-icon morphing system; standalone Hugeicons preserve
the native primitives needed by each icon instead.

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
