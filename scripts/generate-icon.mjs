// Usage: node scripts/generate-icon.mjs Notification03Icon ArrowRight02Icon ...
// Generates icons/{kebab-name}.tsx from @hugeicons/core-free-icons data with a
// default draw-on-hover animation. Hand-tune the variants afterwards.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

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
    .join(' ');

const template = (name, elements) => {
  const paths = elements
    .map(
      ([tag, attrs], i) => `        <motion.${tag}
          ${attrsToJsx(attrs)}
          variants={pathVariants}
          custom={${i}}
          animate={controls}
          initial="normal"
        />`
    )
    .join('\n');

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

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: (i: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
${paths}
        </svg>
      </div>
    );
  }
);

${name}.displayName = '${name}';

export { ${name} };
`;
};

const names = process.argv.slice(2);
if (!names.length) {
  console.error('Usage: node scripts/generate-icon.mjs <ExportName> [...]');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

for (const name of names) {
  const { default: elements } = await import(
    `@hugeicons/core-free-icons/dist/esm/${name}`
  );
  const file = path.join(OUT_DIR, `${kebab(name)}.tsx`);
  await writeFile(file, template(name, elements));
  console.log(`✓ icons/${kebab(name)}.tsx`);
}
