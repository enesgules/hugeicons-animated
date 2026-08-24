import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";
import type {ShowcaseIconKind} from "../../components/ShowcaseIcons";

const INTRO_ICONS: ShowcaseIconKind[] = [
  "notification",
  "search",
  "diamond",
  "magic-wand",
  "alarm",
  "github",
];

export const BandsIntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#141812",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Bands title"
        style={{
          fontSize: 146,
          left: 84,
          letterSpacing: "-0.075em",
          lineHeight: 0.9,
          opacity: interpolate(frame, [5, 20], [0, 1], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          top: 132,
          translate: interpolate(frame, [5, 23], ["0px 42px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          zIndex: 2,
        }}
      >
        hugeicons
        <br />
        <span style={{color: "#AFE67F"}}>now animated.</span>
      </Interactive.Div>

      <div
        style={{
          backgroundColor: "#AFE67F",
          bottom: 90,
          height: 260,
          left: -120,
          overflow: "hidden",
          position: "absolute",
          rotate: "-3deg",
          width: 2240,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 74,
            height: "100%",
            left: 0,
            position: "absolute",
            translate: interpolate(frame, [0, 75], ["-70px 0px", "-510px 0px"], {
              easing: Easing.linear,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[...INTRO_ICONS, ...INTRO_ICONS].map((icon, index) => (
            <AlternativeIconCard
              backgroundColor="#FFFFFF"
              color="#141812"
              delay={index * 2}
              icon={icon}
              iconSize={118}
              key={`${icon}-${index}`}
              size={184}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
