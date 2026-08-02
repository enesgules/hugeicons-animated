// Generates icons/*.tsx from hand-written animation specs in icon-specs.mjs.
// Usage: node scripts/gen-animated.mjs [ExportName ...]  (no args = all specs)
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { SPECS } from './icon-specs.mjs';

const OUT_DIR = path.join(import.meta.dirname, '..', 'icons');

const kebab = (exportName) =>
  exportName
    .replace(/Icon$/, '')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Za-z])/g, '$1-$2')
    .toLowerCase();

const attrsToJsx = (attrs) =>
  Object.entries(attrs)
    .filter(([k]) => k !== 'key')
    .map(([k, v]) => `${k}="${v}"`)
    .join('\n            ');

const renderElement = ([tag, attrs], i, spec) => {
  const el = spec.els?.[i];
  if (!el) {
    return `          <${tag}\n            ${attrsToJsx(attrs)}\n          />`;
  }
  const extra = [
    `variants={${el.v}}`,
    el.custom !== undefined ? `custom={${JSON.stringify(el.custom)}}` : null,
    'animate={controls}',
    'initial="normal"',
    el.style ? `style={${el.style}}` : null,
  ]
    .filter(Boolean)
    .join('\n            ');
  return `          <motion.${tag}\n            ${attrsToJsx(attrs)}\n            ${extra}\n          />`;
};

const template = (spec, elements) => {
  const name = spec.export;
  const animationLoops = spec.defs.includes('repeat: Infinity');
  const loopsOption = animationLoops ? '\n      loops: true,' : '';
  const svgTag = spec.svg ? 'motion.svg' : 'svg';
  const svgExtra = spec.svg
    ? `\n          variants={${spec.svg}}\n          animate={controls}\n          initial="normal"${
        spec.svgStyle ? `\n          style={${spec.svgStyle}}` : ''
      }`
    : '';
  // before/extra: raw JSX for animation-only elements that sit behind/in
  // front of the source geometry (fills, particles, sparks…).
  const sourceBody = elements.map((e, i) => renderElement(e, i, spec)).join('\n');
  const body =
    (spec.before ? spec.before.replace(/^\n+|\s+$/g, '') + '\n' : '') +
    sourceBody +
    (spec.extra ? '\n' + spec.extra.replace(/^\n+|\s+$/g, '') : '');

  return `'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ${name}Handle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ${name}Props extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

${spec.defs.trim()}

const ${name} = forwardRef<${name}Handle, ${name}Props>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,${loopsOption}
      onMouseEnter,
      onMouseLeave,
      ref,
    });

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <${svgTag}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"${svgExtra}
        >
${body}
        </${svgTag}>
      </div>
    );
  }
);

${name}.displayName = '${name}';

export { ${name} };
`;
};

const only = process.argv.slice(2);
const specs = only.length ? SPECS.filter((s) => only.includes(s.export)) : SPECS;

await mkdir(OUT_DIR, { recursive: true });

for (const spec of specs) {
  const { default: elements } = await import(
    `@hugeicons/core-free-icons/dist/esm/${spec.export}`
  );
  const file = path.join(OUT_DIR, `${spec.file ?? kebab(spec.export)}.tsx`);
  await writeFile(file, template(spec, elements));
  console.log(`✓ icons/${spec.file ?? kebab(spec.export)}.tsx`);
}
