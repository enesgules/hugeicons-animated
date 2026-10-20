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
- Land with a real spring, not a hand-made overshoot. `springEase(bounce,
  visualDuration)` from `lib/use-icon-animation.ts` turns a Motion spring into
  the easing of one keyframe segment. Use `springEase(0.5, 0.3)` for small
  marks and `springEase(0.45, 0.35)` for whole objects.
- The standard gesture has three segments: a wind-up to `times` 0.16
  (`easeOut`), the action to 0.4 (`[0.4, 0, 0.2, 1]`), and a spring landing
  to 1. Use 0.8 s for single glyphs and up to 1.2 s for multi-part scenes.

## Motion families

Similar icons share one action, so the set reads as one system. A new icon
uses the action of its family; only geometry-driven values change.

| Family | Icons | Shared action |
| --- | --- | --- |
| Nudge | arrows, chevrons | Wind-up against the direction, dart 2.6 along it, spring back (reference: `arrow-down-02`). Double arrows offset the second chevron by 0.06 s. |
| Add | every icon with a plus mark | The plus winds back -16°, turns a quarter turn into place (90° looks like rest), and lands with a spring; the container dips and springs back. |
| Remove | every icon with a minus mark | The minus pinches to scaleX 0.45 and springs back; the container dips. |
| Check | ticks and check marks | The check erases fast, redraws with the pen, and lands with a spring pop; the container dips on landing. |
| Cancel | X marks | The strokes redraw in writing order and land with a spring; a single outlined X twists a quarter turn instead. |
| Info | info, alert, help | The stem crouches, the dot hops, and both land with a spring. |
| Pendulum | bells, hanging tags, bags, clips | A kick to one side, then `springEase(0.8, 0.45)` swings back and decays to rest (1.3 s); clappers and handles lag 0.06 s. |
| Ring | phones, alarm clock | A kick to -15°, then `springEase(0.7, 0.45)` rattles back (0.9 s); looping rings repeat it with a rest. |
| Eye | eye, view, view-off | The pupil glances, the lids blink by morphing the outline, and the eye reopens a little wide on a spring. |
| Slash off | eye-off, headphone-off, notification-off, volume-off | The slash winds up and leaves; the broken outline heals; a new slash darts in past its place and lands on a spring. |
| Sound | volume icons | The cone draws back and pushes; the waves gather toward the cone mouth and radiate past rest, the outer wave last. |
| Launch | sent, airplane take-off, rocket, external link, share | The object winds back and accelerates out (or darts along its diagonal); a replacement or the object lands on a spring. |
| Glint | star, sparkles, diamond, magic wand | A counter-turn with a squeeze, a turn with a pop past rest, and a spring landing; twinkles share one variant. |
| Weather | cloud icons, sun | The cloud body sinks and swells, lifts, and springs back; rain, lightning, and rays ride on it. |
| Layout | list, menu, grid, dashboard | Each item pulls in toward its anchor in reading order and springs back to full size. |
| Page | file, document, delete, bookmark, copy, clipboard, mail, printer | The sheet, lid, flap, or ribbon moves and lands on a spring while its container squashes and springs back. |
| Transfer | download, upload | Download: the arrow drops into the container, which squashes and springs back. Upload: the container compresses and launches the arrow, which springs back into place. |
| Turn | refresh, undo, redo, repeat, settings, history, compass | Wind-up against the turn, one turn (or a symmetric fraction), spring landing. |
| People | user icons | The head nods on the neck and the shoulders settle with a spring; extra marks follow their own family. |
| Media | play, pause, next, previous | The control compresses, releases forward, and lands with a spring. |
| Door | login, logout | The arrow pushes through and the door frame takes the hit with a spring. |
| Frame | full screen, minimize, maximize, zoom area | The corners contract for leverage, burst outward (or inward), and spring back. |

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
