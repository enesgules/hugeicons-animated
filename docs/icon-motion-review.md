# Icon motion approval queue

This is the current review list. Each entry stays here until it is approved, then it can be removed.

## Rest-pose parity audit

Audited all 164 icons against this strict contract:

- The untouched icon is the idle `normal` pose.
- The first explicit animation keyframe matches that pose, so triggering the animation does not replace the icon with a different starting drawing.
- The final keyframe matches that pose, including generated paths, masks, visibility, transforms, and loop boundaries.
- Opacity may soften a generated effect that already moves, scales, or draws, but it never acts as the animation itself and never conceals clipping or line collisions. Structural geometry stays readable.

The current `scripts/check-rest-parity.mjs` check only validates the idle `normal` state. It does not compare the first or final animation keyframes. Under the full contract, 51 icons need work and 113 pass.

### Final-pose and loop-boundary mismatches

- [ ] `bulb`: the generated light rays finish at full path length while their parent group stays visible. The icon ends with rays that are absent from the untouched artwork.
- [ ] `calendar-03`: the source date dots finish hidden and the larger generated circles stay visible. The final dates do not match the original dot geometry.
- [ ] `copy-01`: the generated occlusion mask stays active after the sheets settle, so it continues cutting the rear sheet instead of restoring the untouched overlap.
- [ ] `cursor-pointer-01`: both click rings finish at an expanded scale instead of returning to their rest size.
- [ ] `database`: the generated record group stays visible. Its round-capped record paths finish at `pathLength: 0`, which can leave small cap dots or fragments.
- [ ] `eye-off`: the generated continuation group stays visible after the replacement slash arrives. Zero-length round-capped continuation paths can leave small dots instead of a clean untouched eye.
- [ ] `headphone-off`: the generated continuation group stays visible after the replacement slash arrives. Zero-length round-capped paths can leave endpoint dots.
- [ ] `notification-off-01`: the generated continuation group stays visible after the replacement slash arrives. Zero-length round-capped paths can leave endpoint dots.
- [ ] `robot-01`: the generated smile finishes at full path length while its group remains visible, adding a mouth that is absent from the untouched robot.
- [ ] `settings-01`: the gear finishes at `rotate: 180` instead of the `rotate: 0` rest transform.
- [ ] `smile`: the mouth morph has a single animate target and finishes on the wider smile path instead of the original mouth path.
- [ ] `volume-high`: each looping wave starts and ends on transformed geometry rather than its untouched position. The loop neither starts nor closes at rest.
- [ ] `volume-mute-01`: the generated continuation group stays visible after the replacement slash arrives. Its zero-length round-capped wave path can leave an endpoint dot.
- [ ] `wallet-01`: the generated banknote returns to `translateY(0px)` while its parent stays visible, so the note remains in the wallet after the animation.
- [ ] `wifi-01`: each looping arc starts and ends on transformed geometry rather than its untouched position. The loop neither starts nor closes at rest.

### First-keyframe mismatches

These icons return to rest at the end, but the first explicit keyframe differs from `normal`.

- [ ] `calendar-add-01`: the plus starts at `rotate(-15deg) scale(0.5)` instead of `rotate(0deg) scale(1)`.
- [ ] `call-incoming-01`: the incoming arrow starts translated `2.8px` right instead of at `translateX(0px)`.
- [ ] `call-outgoing-01`: the outgoing arrow starts translated `1.2px` left instead of at `translateX(0px)`.
- [ ] `circle-check`: the check starts at `pathLength: 0` instead of fully drawn.
- [ ] `cloud-download`: the arrow starts translated `2.5px` upward instead of at `translateY(0px)`.
- [ ] `cloud-upload`: the arrow starts translated `2.4px` downward instead of at `translateY(0px)`.
- [ ] `code-xml`: the slash starts at `pathLength: 0` and `translateY: -1` instead of fully drawn at `translateY: 0`.
- [ ] `credit-card`: the card starts at `translateX(-2.2px) rotate(-2deg)` instead of the identity transform.
- [ ] `dashboard-square-01`: each tile starts at `translateY(1.4px) scale(0.74)` instead of the full rest tile.
- [ ] `edit-02`: the edited line starts at `pathLength: 0` instead of the fully drawn rest line.
- [ ] `file-add`: the file starts at `translateY(-1.8px) scaleY(1.02)`, and the plus starts at `rotate(-12deg) scale(0.5)`, instead of their rest transforms.
- [ ] `file-download`: the arrow starts translated `2.4px` upward instead of at `translateY(0px)`.
- [ ] `file-upload`: the arrow starts translated `1.5px` downward instead of at `translateY(0px)`.
- [ ] `flash`: the bolt starts at `pathLength: 0.2` instead of the fully drawn `pathLength: 1` rest outline.
- [ ] `folder-add`: the plus starts at `rotate(-18deg) scale(0.5)` instead of `rotate(0deg) scale(1)`.
- [ ] `grid-view`: each cell starts at `scale(0.72) rotate(-5deg)` instead of the full rest cell.
- [ ] `home-01`: the smile starts at `pathLength: 0` instead of fully drawn.
- [ ] `inbox`: the tray starts translated `1.6px` upward instead of at `translateY(0px)`.
- [ ] `lock`: the keyhole starts at `translateY(-0.6px) scaleY(0.92)` instead of its identity transform.
- [ ] `message-01`: the bubble starts at `scale: 0.85` and its text starts at `pathLength: 0`, rather than the complete rest icon.
- [ ] `message-add-01`: the plus starts at `rotate(-14deg) scale(0.48)` instead of `scale(1)` with no rotation.
- [ ] `party`: the source confetti starts translated `-7px, 7px` and scaled to `0.2` instead of matching the rest artwork.
- [ ] `save`: both disk slots start at `pathLength: 0.25` and `scaleX(0.82)` instead of fully drawn at `scaleX(1)`.
- [ ] `share-08`: the connector starts at `pathLength: 0` instead of the fully drawn rest connector.
- [ ] `shopping-cart-add-01`: the plus starts at `scale(0.5)` instead of `scale(1)`.
- [ ] `sort-by-down-01`: the arrow starts translated `1.8px` upward instead of at `translateY(0px)`.
- [ ] `sort-by-up-01`: the arrow starts translated `1.8px` downward instead of at `translateY(0px)`.
- [ ] `tick-02`: the check starts at `pathLength: 0` instead of the fully drawn rest check.
- [ ] `user-add-01`: the plus starts at `rotate(-16deg) scale(0.5)` instead of `rotate(0deg) scale(1)`.
- [ ] `user-check-01`: the check starts at `scale(0.72)` and `pathLength: 0` instead of fully drawn at `scale(1)`.
- [ ] `user-multiple-02`: the primary profile starts shifted `0.7px` left and the secondary profile starts shifted `0.7px` right instead of both starting at `translateX(0px)`.
- [ ] `user-remove-01`: the minus starts at `rotate(-10deg) scale(0.58)` instead of `rotate(0deg) scale(1)`.

## Direction and interaction

- [ ] `bluetooth` — swap the two side nodes once along opposing half-circle arcs, with slightly different arc heights and acceleration.
- [ ] `loading-03` — rotate the complete loader instead of chasing individual segments.
- [ ] `list-view` — contract the existing rows from alternating anchored edges in reading order, without fading, then restore the exact default list.
- [ ] `maximize-screen` — expand the original solid window into the dashed outer frame, hold the replacement at center, and hand it invisibly to the reset source square without retreating to its entrance corner.
- [ ] `menu-01` — replace the menu-to-X morph with a compact row response.
- [ ] `mouse-left-click-01` — make the left shell visibly depress.
- [ ] `panel-left` — keep the frame fixed while the divider closes into the left wall, pauses, and reopens.
- [ ] `search-01` — move and enlarge the complete magnifier like a physical zoom-in, hold briefly, then restore the exact default pose.

## Status and system

- [ ] `crown` — keep the center jewel fixed, add a restrained lift to the crown outline, and place small twinkles inside the crown rather than around it.
- [ ] `database` — keep the stack fixed while a short read head scans each platter and record fragments write into the active layers.
- [ ] `lock` — slow and soften the shackle close.
- [ ] `save` — keep the disk geometry continuous and remove clipping.
- [ ] `shield-02` — remove the decorative circle and use a shield-native response.
- [ ] `target-01` — make the impact ring become part of the target instead of floating above it.

## Objects and transfers

- [ ] `attachment` — redesign the restored whole-paperclip animation from scratch; do not reuse the failed split-tongue and paper-threading direction.
- [ ] `credit-card` — replace the generic movement with a recognizable payment gesture, such as passing through a temporary reader slot and settling back.
- [ ] `folder-open` — hinge the front flap toward the viewer around its bottom edge, then close it cleanly.
- [ ] `key-01` — remove the stationary dot and animate the whole key coherently.
- [ ] `link-01` — preserve the chain overlap without line collisions.
- [ ] `paint-brush-02` — roll the complete tool forward while a connected paint mark grows from its trailing edge, then collect the mark on the return pass.
- [ ] `pin` — remove internal line clipping during the pin action.
- [ ] `puzzle` — lift the complete piece, align it above its slot, then seat it with a small compression and rebound.
- [ ] `shopping-cart-add-01` — keep the plus and cart geometry from crossing.
- [ ] `thumbs-up` — move the full hand and wrist together.
- [ ] `wallet-01` — add a small banknote that exits and returns through the opening.

## Nature, energy, and media

- [ ] `fire` — animate drawn flame frames instead of moving a rigid outline.
- [ ] `flash` — remove the bottom lines and redesign the energy discharge.
- [ ] `headphones` — replace the detached music-note particle with a response in the cups.
- [ ] `leaf-01` — replace the whole-icon rotation and detached wind strokes with a more natural stem-anchored leaf response.
- [ ] `rocket-01` — let each thrust line stretch, lag, and burn away independently as the first rocket accelerates, then rebuild fresh exhaust from the replacement rocket's nozzle.
- [ ] `sleeping` — move the Z marks farther from the head.
- [ ] `snow` — keep every arm connected and return the flake cleanly to rest.
- [ ] `umbrella` — add small contact splashes where rain hits the canopy.
- [ ] `video-01` — keep the lens from crossing the camera body.

## Brand

- [ ] `github` — use a slower base-led tail sweep with delayed tip follow-through, alternating ear perks, and a restrained whole-cat weight shift.

## Gallery behavior

- [ ] Icon tile hover boundary — keep the hit area fixed so edge hovering cannot retrigger an up-and-down loop.
