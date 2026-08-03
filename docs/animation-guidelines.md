# Animation guidelines

Icon motion should explain an action, state, or relationship. A still icon is
the default; animation earns its place by making the icon easier to understand.

## Choose the motion tier

- **Productive motion** is the default for installed icons: one quick,
  unobtrusive cycle for feedback or state change. Aim for roughly 120–300 ms
  when the action remains readable at that speed.
- **Expressive motion** is for the gallery, rare success moments, or an action
  whose meaning needs a fuller beat. Keep most sequences within 300–900 ms.
- **Indefinite motion** is only for a genuinely ongoing condition, such as
  loading or active audio. Stop it when the condition ends and return cleanly
  to the resting pose.

Duration follows distance and visual complexity. Frequent and small movements
should be faster than large or unusual ones.

## Preserve geometry

- Keep the original Hugeicons primitives mounted through every pose.
- Animate the smallest part that carries the action; keep the rest anchored.
- Reuse identical coordinates and rotate a group for directional siblings or
  same-shape poses.
- Collapse an unused primitive to a point instead of mounting and unmounting it.
- Morph path data only when every pose has the same command types and parameter
  counts. Otherwise use transforms or line drawing.
- Set transform origins explicitly on animated SVG elements and groups.
- Do not crossfade whole icons. Extra rays, trails, echoes, and particles must
  clarify the action, remain subordinate, and disappear at rest.

The exact three-line constraint in *Morphing icons with Claude* is a useful
architecture for a universal cross-icon morph component. Hugeicons Animated
contains standalone icons with different native structures, so the transferable
rule is persistent, compatible geometry rather than a universal node count.

## Timing and easing

- Use ease-out for direct feedback that settles into place.
- Use ease-in-out for movement or morphing that stays on screen.
- Use linear easing only for constant-rate motion such as a progress rotation.
- Reserve ease-in for an object that physically accelerates out of view.
- Avoid ornamental bounce, squash, or wobble in productive motion. They are
  expressive tools and should make the action clearer at icon size.

## Playback and accessibility

- Prefer a discrete cycle over a loop.
- Nonessential automatic motion must stop within five seconds or offer a way to
  pause it.
- Respect `prefers-reduced-motion` and preserve a clear static state.
- Never make motion the only way to communicate a result or status.
- Re-triggering, hover exit, focus exit, and interruption must leave the icon in
  a valid pose.

## Performance

- Move or scale the whole icon with an SVG transform when the entire icon moves.
- Internal path, stroke, and attribute animation is appropriate for these small
  paint areas, but avoid animating more geometry than the action needs.
- Inspect the rendered icon at its installed size, not only in an enlarged
  editor view.

## Review workflow

1. Write the verb and choose productive, expressive, or indefinite motion.
2. Verify that each animated primitive has a semantic job.
3. Check path compatibility and explicit transform origins.
4. Compare related icons side by side and inspect the sequence at quarter speed
   and frame by frame.
5. Test start, interruption, hover/focus exit, repeated triggering, and reduced
   motion.
6. Run `pnpm registry:build`, `pnpm lint`, and `pnpm exec tsc --noEmit`.

## Sources

- [Morphing icons with Claude](https://benji.org/morphing-icons-with-claude)
- [Apple Human Interface Guidelines: SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols)
- [Fluent 2: Motion](https://fluent2.microsoft.design/motion)
- [Carbon Design System: Motion](https://carbondesignsystem.com/elements/motion/overview/)
- [Motion: SVG animation](https://motion.dev/docs/react-svg-animation)
- [Android: Animate drawable graphics](https://developer.android.com/develop/ui/views/animations/drawable-animation)
- [WCAG 2.2: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [WCAG 2.2: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
