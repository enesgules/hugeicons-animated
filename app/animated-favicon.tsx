'use client';

import { useEffect } from 'react';

// Chrome renders SVG favicons as a static image, so the only way to animate
// one is swapping link[rel=icon] between pre-rendered frames — as canvas-made
// PNGs, since dynamic SVG-data-URI favicons don't reliably repaint in Chrome.
// These are the same decaying-pendulum keyframes as the header bell
// (notification-03): upright rest pose, ring, settle back upright.
const T = [0, 0.18, 0.38, 0.56, 0.72, 0.87, 1];
const ROT = [0, -14, 11, -8, 5, -2, 0];
const DX = [0, 2.2, -1.8, 1.2, -0.7, 0.3, 0];
const DURATION = 900;
const FRAME_MS = 75;
const RING_EVERY = 3000;

function sample(keys: number[], t: number) {
  let i = 1;
  while (T[i] < t) i++;
  const f = (t - T[i - 1]) / (T[i] - T[i - 1]);
  return Math.round((keys[i - 1] + (keys[i] - keys[i - 1]) * f) * 100) / 100;
}

// app/icon.svg with the bell-group rotation and clapper offset parameterized
const frame = (r: number, dx: number) =>
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#AFE67F"/><rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8.25" fill="none" stroke="#79BD3E" stroke-width="1.5"/><g fill="none" stroke="#1D3208" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(4 4) rotate(${r} 12 2.5)"><path d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011"/><path d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z"/><path d="M13 18.5H11" transform="translate(${dx} 0)"/></g></svg>`
  );

const SVG_FRAMES: string[] = [];
for (let ms = 0; ms <= DURATION; ms += FRAME_MS) {
  const t = ms / DURATION;
  SVG_FRAMES.push(frame(sample(ROT, t), sample(DX, t)));
}

// rasterize an SVG data URI to a 64×64 PNG data URI via canvas
function toPng(svgUri: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 64;
      canvas.getContext('2d')!.drawImage(img, 0, 0, 64, 64);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = svgUri;
  });
}

export function AnimatedFavicon() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Chrome scores icon candidates and an SVG with sizes="any" outranks a
    // PNG, so Next's own icon links are sidelined (rel unset) for the ring's
    // duration — re-checked every frame since Next injects links after mount.
    // Each frame inserts a fresh PNG link node (fresh nodes force a repaint);
    // restore removes it and hands the favicon back to Next's static SVG.
    let animLink: HTMLLinkElement | null = null;
    const paused = new Set<HTMLLinkElement>();
    const setFrame = (href: string) => {
      document
        .querySelectorAll<HTMLLinkElement>('link[rel="icon"]')
        .forEach((l) => {
          if (l !== animLink) {
            l.rel = 'icon-paused';
            paused.add(l);
          }
        });
      const l = document.createElement('link');
      l.rel = 'icon';
      l.type = 'image/png';
      l.href = href;
      animLink?.remove();
      animLink = l;
      document.head.appendChild(l);
    };
    const restore = () => {
      animLink?.remove();
      animLink = null;
      paused.forEach((l) => {
        l.rel = 'icon';
      });
      paused.clear();
    };
    let timers: number[] = [];
    let interval = 0;
    let cancelled = false;

    Promise.all(SVG_FRAMES.map(toPng)).then((frames) => {
      if (cancelled) return;

      let ringId = 0;
      const ring = () => {
        // fragment makes every ring's frame URLs unique — icon caches dedupe
        // by URL and would otherwise treat repeat rings as "nothing changed"
        const bust = `#r${ringId++}`;
        timers.forEach(clearTimeout);
        timers = frames.map((f, i) =>
          window.setTimeout(() => setFrame(f + bust), i * FRAME_MS)
        );
        timers.push(
          window.setTimeout(restore, frames.length * FRAME_MS)
        );
      };

      ring();
      // ponytail: fixed-interval ring; background tabs throttle timers so the
      // browser just coalesces frames — harmless, no visibility handling needed
      interval = window.setInterval(() => {
        if (!document.hidden) ring();
      }, RING_EVERY);
    }, () => {}); // rasterization failed — keep the static favicon

    return () => {
      cancelled = true;
      clearInterval(interval);
      timers.forEach(clearTimeout);
      restore();
    };
  }, []);

  return null;
}
