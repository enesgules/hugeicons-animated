import {AbsoluteFill, interpolate, Loop, useCurrentFrame, useVideoConfig} from "remotion";
import {AnimatedSourceIcon, type ShowcaseIconKind} from "./components/ShowcaseIcons";

// 1200×630 link preview. Frame 0 is the still og:image, so every element is at rest there.
// Three bands of tiles scroll in turns up and down. Each band moves one full icon cycle
// over the video, so the last frame meets the first.
// Twelve different icons that play once and come to rest. Alarm, cloud-rain and magic-wand
// repeat on their own beat and would jump where the loop restarts, so they are left out.
const columns: ReadonlyArray<ReadonlyArray<ShowcaseIconKind>> = [
  ["notification", "settings", "gift", "search"],
  ["airplane", "diamond", "refresh", "github"],
  ["favourite", "play", "lock", "arrow-up-right"],
];
// Enough cycles to cover the tilted frame at any scroll position.
const cyclesPerBand = 4;

const tileSize = 132;
const tileGap = 14;
const cycleHeight = 4 * (tileSize + tileGap);
// Each icon plays once per wave; the wave runs diagonally from the top left.
const waveFrames = 90;
const waveStagger = 7;

const Mark: React.FC<{size: number}> = ({size}) => (
  <svg fill="none" height={size} stroke="#1D3208" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 32 32" width={size}>
    <g strokeWidth={2} transform="translate(1.5 4.5) rotate(-10 12 2.5)">
      <path d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011" />
      <path d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z" />
      <path d="M13 18.5H11" />
    </g>
    <path d="M24.4 5.6C25.3 7.5 25.6 9.7 25.1 11.8" strokeWidth={1.9} />
    <path d="M27.2 4C28.2 6.4 28.5 9.1 27.9 11.7" opacity={0.5} strokeWidth={1.9} />
  </svg>
);

export const OgCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const scroll = interpolate(frame, [0, durationInFrames], [0, cycleHeight]);

  return (
    <AbsoluteFill style={{backgroundColor: "#FFFFFF", flexDirection: "row", padding: "64px 72px"}}>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620}}>
        <div style={{alignItems: "center", display: "flex", gap: 16}}>
          <div
            style={{
              alignItems: "center",
              background: "#AFE67F",
              border: "2px solid #79BD3E",
              borderRadius: 15,
              display: "flex",
              height: 52,
              justifyContent: "center",
              width: 52,
            }}
          >
            <Mark size={40} />
          </div>
          <div style={{fontSize: 30}}>
            hugeicons <span style={{color: "#9DA19B"}}>animated</span>
          </div>
        </div>

        <div style={{fontSize: 72, letterSpacing: "-0.03em", lineHeight: 1.04}}>
          <div>Beautiful</div>
          <div>React icons.</div>
          <div style={{color: "#BFC2BD"}}>Now they move.</div>
        </div>

        <div style={{color: "#696D6E", fontSize: 24}}>hugeicons-animated.com</div>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: tileGap,
          position: "absolute",
          right: 64,
          rotate: "-8deg",
          top: "50%",
          translate: "0px -50%",
        }}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={column[0]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tileGap,
              // The middle band moves down, the outer bands move up.
              translate: `0px ${columnIndex === 1 ? scroll - cycleHeight / 2 : cycleHeight / 2 - scroll}px`,
            }}
          >
            {Array.from({length: cyclesPerBand}, () => column)
              .flat()
              .map((icon, index) => (
                <div
                  key={index}
                  style={{
                    alignItems: "center",
                    // Green and white alternate down each band and across the bands: a checkerboard.
                    background: (columnIndex + index) % 2 === 0 ? "#AFE67F" : "#F3F5F0",
                    border: "2px solid rgba(20,24,18,0.08)",
                    borderRadius: 32,
                    color: "#141812",
                    display: "flex",
                    height: tileSize,
                    justifyContent: "center",
                    width: tileSize,
                  }}
                >
                  <Loop durationInFrames={waveFrames} layout="none">
                    <AnimatedSourceIcon
                      delay={6 + (columnIndex + (index % column.length)) * waveStagger}
                      icon={icon}
                      size={70}
                    />
                  </Loop>
                </div>
              ))}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
