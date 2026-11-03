import { ICON_LIST } from '@/app/icons-manifest';

/** Icons hidden from the public gallery until their animations are approved. */
export const DISAPPROVED_ICON_NAMES: ReadonlySet<string> = new Set([
  'arrow-reload-horizontal',
  'attachment',
  'calendar-01',
  'calendar-03',
  'code-xml',
  'crown',
  'database',
  'edit-02',
  'filter',
  'flower',
  'folder-open',
  'gift',
  'headphones',
  'home-01',
  'image-01',
  'inbox',
  'key-01',
  'leaf-01',
  'location-01',
  'lock',
  'mail-02',
  'mail-send-01',
  'message-01',
  'message-add-01',
  'mic-01',
  'mouse-left-click-01',
  'music-note-01',
  'paint-brush-02',
  'puzzle',
  'repeat',
  'save',
  'scissor-01',
  'share-01',
  'smile',
  'snow',
  'sparkles',
  'square-unlock-01',
  'thumbs-down',
  'thumbs-up',
  'waving-hand-01',
]);

/** Icons shown in the public gallery. */
export const PUBLIC_ICONS = ICON_LIST.filter(
  ({ name }) => !DISAPPROVED_ICON_NAMES.has(name)
);
