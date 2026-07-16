// Generates icons/*.tsx from hand-written animation specs in icon-specs.mjs.
// Usage: node scripts/gen-animated.mjs [ExportName ...]  (no args = all specs)
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { SPECS } from './icon-specs.mjs';

const OUT_DIR = path.join(import.meta.dirname, '..', 'icons');

const kebab = (exportName) =>
  exportName
    .replace(/Icon$/, '')
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
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
    el.custom !== undefined ? `custom={${el.custom}}` : null,
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
  const svgTag = spec.svg ? 'motion.svg' : 'svg';
  const svgExtra = spec.svg
    ? `\n          variants={${spec.svg}}\n          animate={controls}\n          initial="normal"${
        spec.svgStyle ? `\n          style={${spec.svgStyle}}` : ''
      }`
    : '';
  const body = elements.map((e, i) => renderElement(e, i, spec)).join('\n');

  return `'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
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
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

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
          fill="none"${svgExtra}
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
