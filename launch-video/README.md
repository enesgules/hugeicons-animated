# Hugeicons Animated launch video

A set of 1920×1080 Remotion videos for the launch of
[hugeicons-animated.com](https://hugeicons-animated.com).

The project includes three compositions. The original uses a calm circle layout.
The bands version moves many icons across the frame. The spotlight version uses
large icon cards and bold color blocks. All three use the approved source
animations and show the shadcn CLI, free access, and open-source status.

## Preview

```sh
npm install
npm run dev
```

Open one of these compositions in Remotion Studio:

- `HugeiconsAnimatedLaunch`
- `HugeiconsAnimatedBands`
- `HugeiconsAnimatedSpotlight`

## Render

```sh
npm run render
npm run render:bands
npm run render:spotlight
```

Run `npm run render:all` to render all three MP4 files.

## Link preview

`OgCard` is the 1200×630 link preview. Its first frame is the og:image.

```sh
npm run render:og
```

This writes `public/og-image.png` and `public/og-video.mp4` in the site.
