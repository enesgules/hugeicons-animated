import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";

export const SpotlightIntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F3F5F0",
        color: "#141812",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#AFE67F",
          height: 1080,
          position: "absolute",
          right: 0,
          top: 0,
          translate: interpolate(frame, [0, 25], ["720px 0px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          width: 720,
        }}
      />

      <Interactive.Div
        name="Spotlight title"
        style={{
          fontSize: 156,
          left: 84,
          letterSpacing: "-0.078em",
          lineHeight: 0.88,
          opacity: interpolate(frame, [4, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          top: 170,
          translate: interpolate(frame, [4, 21], ["0px 44px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        hugeicons,
        <br />
        now animated.
      </Interactive.Div>

      <div
        style={{
          position: "absolute",
          right: 92,
          scale: interpolate(frame, [12, 32], [0.62, 1], {
            easing: Easing.spring({damping: 150}),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
          top: 270,
        }}
      >
        <AlternativeIconCard backgroundColor="#FFFFFF" color="#141812" delay={8} icon="notification" iconSize={330} size={500} />
      </div>
    </AbsoluteFill>
  );
};
