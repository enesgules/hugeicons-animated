// Verifies that every animated icon returns to the untouched Hugeicons artwork
// in its normal state. Custom before/extra geometry is hidden by the generator;
// source elements may only use visually neutral normal-state values.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { SPECS } from './icon-specs.mjs';

const ROOT = path.join(import.meta.dirname, '..');

const kebab = (exportName) =>
  exportName
    .replace(/Icon$/, '')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Za-z])/g, '$1-$2')
    .toLowerCase();

const extractObject = (source, start) => {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (character === "'" || character === '"' || character === '`') {
      quote = character;
      continue;
    }
    if (character === '{') depth += 1;
    if (character === '}' && (depth -= 1) === 0) {
      return source.slice(start + 1, index);
    }
  }

  throw new Error('Unclosed object in icon animation spec');
};

const variantBody = (source, name) => {
  const match = new RegExp(`const\\s+${name}\\s*(?::\\s*Variants)?\\s*=\\s*\\{`).exec(
    source
  );
  return match ? extractObject(source, match.index + match[0].length - 1) : null;
};

const normalState = (body) => {
  if (!body) return null;
  const start = /normal\s*:/.exec(body);
  const end = /\banimate\s*:/.exec(body);
  if (!start || !end || end.index <= start.index) return null;
  return body.slice(start.index + start[0].length, end.index);
};

const identityTransform = (value) => {
  const tokens = value.match(/[a-zA-Z]+\([^)]*\)/g) ?? [];
  if (!tokens.length) return value.trim() === 'none';
  return tokens.every((token) => {
    const [name, rawArguments = ''] = token.split('(');
    const numbers = rawArguments.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
    if (name.startsWith('translate') || name.startsWith('rotate')) {
      return numbers.every((number) => number === 0);
    }
    if (name.startsWith('scale')) return numbers.every((number) => number === 1);
    if (name === 'perspective') return true;
    return false;
  });
};

const validateNormalState = ({ icon, name, normal, allowHidden = false }) => {
  if (!allowHidden && /opacity\s*:\s*0(?:\D|$)/.test(normal)) {
    failures.push(`${icon}.${name}: source geometry is hidden in normal state`);
  }
  if (!allowHidden && /pathLength\s*:\s*0(?:\D|$)/.test(normal)) {
    failures.push(`${icon}.${name}: source geometry has zero path length in normal state`);
  }

  for (const match of normal.matchAll(/transform\s*:\s*['"]([^'"]+)['"]/g)) {
    if (!identityTransform(match[1])) {
      failures.push(
        `${icon}.${name}: non-identity normal transform ${JSON.stringify(match[1])}`
      );
    }
  }

  for (const match of normal.matchAll(/\b(translateX|translateY|rotate)\s*:\s*(-?\d*\.?\d+)/g)) {
    if (Number(match[2]) !== 0) {
      failures.push(`${icon}.${name}: non-zero normal ${match[1]} ${match[2]}`);
    }
  }
  for (const match of normal.matchAll(/\b(scale|scaleX|scaleY)\s*:\s*(-?\d*\.?\d+)/g)) {
    if (Number(match[2]) !== 1) {
      failures.push(`${icon}.${name}: non-identity normal ${match[1]} ${match[2]}`);
    }
  }
};

const failures = [];
const specFiles = new Set();

for (const spec of SPECS) {
  const fileName = `${spec.file ?? kebab(spec.export)}.tsx`;
  specFiles.add(fileName);
  const generatedPath = path.join(
    ROOT,
    'icons',
    fileName
  );
  const generated = await readFile(generatedPath, 'utf8');

  if (spec.before || spec.extra) {
    const expectedLayers = Number(Boolean(spec.before)) + Number(Boolean(spec.extra));
    const actualLayers = generated.match(/variants=\{generatedGeometryVariants\}/g)?.length ?? 0;
    if (actualLayers !== expectedLayers) {
      failures.push(
        `${spec.export}: expected ${expectedLayers} hidden custom geometry layer(s), found ${actualLayers}`
      );
    }
  }

  const sourceVariants = new Set([
    spec.svg,
    ...Object.values(spec.els ?? {}).map((element) => element.v),
  ].filter(Boolean));

  for (const name of sourceVariants) {
    const normal = normalState(variantBody(spec.defs, name));
    if (!normal) continue;

    validateNormalState({ icon: spec.export, name, normal });
  }
}

const iconFiles = (await readdir(path.join(ROOT, 'icons'))).filter((file) =>
  file.endsWith('.tsx')
);

for (const fileName of iconFiles) {
  if (specFiles.has(fileName)) continue;

  const generated = await readFile(path.join(ROOT, 'icons', fileName), 'utf8');
  const exportName = /export interface (\w+)Handle/.exec(generated)?.[1];
  if (!exportName) {
    failures.push(`${fileName}: could not identify its Hugeicons export`);
    continue;
  }

  const hiddenAddition = generated.includes('rest-parity: hidden-added-geometry');
  const splitSourcePath = generated.includes('rest-parity: split-source-path');
  const usedVariants = new Set(
    [...generated.matchAll(/variants=\{(\w+)\}/g)].map((match) => match[1])
  );
  for (const name of usedVariants) {
    const normal = normalState(variantBody(generated, name));
    if (!normal) continue;
    const allowHidden =
      hiddenAddition && /opacity\s*:\s*0(?:\D|$)/.test(normal);
    validateNormalState({ icon: exportName, name, normal, allowHidden });
  }

  const { default: sourceElements } = await import(
    `@hugeicons/core-free-icons/dist/esm/${exportName}`
  );
  const generatedElements =
    generated.match(/<(?:motion\.)?(?:path|circle|rect|ellipse|line|polyline|polygon)\b/g)
      ?.length ?? 0;
  if (
    generatedElements !== sourceElements.length &&
    !hiddenAddition &&
    !splitSourcePath
  ) {
    failures.push(
      `${exportName}: expected ${sourceElements.length} source element(s), found ${generatedElements}`
    );
  }
  if (generatedElements !== sourceElements.length && hiddenAddition && !/opacity\s*:\s*0/.test(generated)) {
    failures.push(`${exportName}: added rest geometry is not hidden`);
  }
}

if (failures.length) {
  console.error('Rest-state parity check failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`✓ ${iconFiles.length} icons preserve their Hugeicons rest state`);
