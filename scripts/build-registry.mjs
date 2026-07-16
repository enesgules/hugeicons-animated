// Regenerates registry.json from icons/*.tsx. Run before `shadcn build`.
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.join(import.meta.dirname, '..');
const files = (await readdir(path.join(root, 'icons'))).filter((f) =>
  f.endsWith('.tsx')
);

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'hugeicons-animated',
  homepage: 'https://hugeicons-animated.vercel.app',
  items: files.map((f) => {
    const name = f.replace('.tsx', '');
    return {
      name,
      type: 'registry:ui',
      title: name,
      description: `Animated ${name.replace(/-\d+$/, '').replace(/-/g, ' ')} icon`,
      dependencies: ['motion'],
      files: [{ path: `icons/${f}`, type: 'registry:ui' }],
    };
  }),
};

await writeFile(
  path.join(root, 'registry.json'),
  JSON.stringify(registry, null, 2) + '\n'
);
console.log(`✓ registry.json (${registry.items.length} icons)`);
