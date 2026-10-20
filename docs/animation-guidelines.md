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
- Approved icons use hand-tuned keyframes with an anticipation, an overshoot,
  and a settle, usually with the ease-out `[0.23, 1, 0.32, 1]` over 0.4 to 1 s.
  That character is the house style; keep it when you add a family member.
  `springEase(bounce, visualDuration)` in `lib/use-icon-animation.ts` is
  available for scenes such as `party`, but it is not the default.

## Motion families

Similar icons share one action, so the set reads as one system. Each family's
approved icons are the reference: a new member copies their keyframes, timing,
easing, and flourishes, and changes only what its geometry forces.

| Family | Reference | Shared action |
| --- | --- | --- |
| Chevron | `chevron-*`, `arrow-*-02` | The chevron darts along its direction and narrows, recoils a little past rest, makes a softer second push, and settles. Double arrows run it on both chevrons, the front one first. |
| Add | `file-add`, `add-circle`, `calendar-add-01` | The container gives a short, heavy bounce (a drop, a lift, or a rattle) while the plus winds back small, stamps in past full size, and settles. |
| Remove | `minus-sign-circle` | The minus pinches to half its width and snaps back a little past full width; the frame squeezes and rebounds. |
| Check | `tick-02`, `circle-check` | The pen erases the tick from its tail, writes it again with a rest at the corner, and lifts off with a small flick; a frame gives as the pen touches down. |
| Cancel | `cancel-01`, `circle-x` | The pen erases both strikes and writes them again in order with a flick off each end; a ring gives as the pen touches down. A solid X winds back small, swings past its rest angle, and settles. |
| Info | `alert-circle`, `information-circle` | One quick beat: the frame breathes, the stem or hook stretches and settles, and the dot dips then pops with a small overshoot. |
| People | `user` | Each head nods forward on its neck and rocks back; the shoulders settle. In groups each person nods a beat after the one in front. |
| Pendulum | `notification-03`, `tag-01` | The object hangs from one point and swings in a decaying pendulum; a loose inner part (clapper, handle) drags behind out of phase. |
| Phone | `call-02` | The handset rattles side to side with a decay and keeps ringing while hovered; an arrow or end mark moves with each ring. |
| Media | `play`, `pause`, `next` | The control compresses back, releases forward with a stretch, and settles; pause bars squeeze together then apart. Rings stay still. |
| Transfer | `file-download`, `file-upload` | The arrow moves decisively in the transfer direction (falls into the container, or is loaded like a spring and launched); the container squashes a little. |
| Door | `login-01`, `logout-01` | The arrow pulls back, slides through the doorway past its spot, and settles while the door takes the push. |
| Frame | `full-screen`, `minimize-screen` | The window or area pulls in for leverage, bursts toward its target size, and clicks into place; arrows dart along their direction. |
| Turn | `undo`, `redo`, `refresh`, `settings-01` | A wind-up against the turn, one turn (the gear: half a turn), a small fall-back, and a settle. |
| Eye | `eye`, `eye-off` | The pupil darts left and right, the lids meet in a blink, and the eye reopens a little wide before it settles. |
| Slash off | `eye-off`, `headphone-off` | The slash leaves to the bottom right, the outline heals across its breaks, and a new slash returns from the top left as the breaks reopen. |
| Sound | `volume-high` | The cone draws back and pushes; the waves (or the mute cross) gather near the cone mouth and swell past rest before they settle. |
| Launch | `sent`, `external-link` | The object pulls back and breaks free along its heading; a replacement follows the same route, or the object settles back while its frame dips. |
| Glint | `magic-wand-01`, `star` | Each star shrinks as it turns to the diagonal and pops as it lands on the next quarter turn; small plus sparkles appear in empty corners. |
| Weather | `cloud-rain` | The cloud bobs; what falls from it drains out and redraws from the cloud. Lightning redraws faster and flickers twice. |
| Clock | `clock-01` | The hands race around the dial (long hand twice, short hand once) in the direction of the dial's arrow and ease back to rest. |
| Layout | `dashboard-square-01`, `list-view` | Items move in reading order: tiles dip small and pop past full size; rows pull in from alternating edges and spring back. |
| Page | `file-01`, `document-attachment`, `delete-02`, `bookmark-01`, `copy-01`, `mail-01` | The sheet lifts and settles or drops into the stack; its mark swings or stamps into place. Lids, flaps, and ribbons open or catch with an overshoot while the container squashes. |

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
