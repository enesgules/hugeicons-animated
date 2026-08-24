import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";

export const SpotlightEndScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: "#141812", color: "#FFFFFF", overflow: "hidden"}}>
      <div
        style={{
          backgroundColor: "#AFE67F",
          bottom: 0,
          height: 340,
          left: 0,
          position: "absolute",
          right: 0,
          translate: interpolate(frame, [18, 36], ["0px 340px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <Interactive.Div
        name="Spotlight website"
        style={{
          fontSize: 126,
          left: 84,
          letterSpacing: "-0.068em",
          lineHeight: 1,
          opacity: interpolate(frame, [4, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          top: 190,
          translate: interpolate(frame, [4, 21], ["0px 42px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        hugeicons-animated.com
      </Interactive.Div>

      <div
        style={{
          alignItems: "center",
          bottom: 62,
          color: "#1D3208",
          display: "flex",
          gap: 36,
          left: 84,
          opacity: interpolate(frame, [30, 43], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          translate: interpolate(frame, [30, 46], ["0px 36px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AlternativeIconCard backgroundColor="#FFFFFF" color="#141812" delay={32} icon="gift" iconSize={100} size={160} />
        <div style={{fontSize: 96, letterSpacing: "-0.06em"}}>free</div>
        <div style={{marginLeft: 62}} />
        <AlternativeIconCard backgroundColor="#FFFFFF" color="#141812" delay={38} icon="github" iconSize={100} size={160} />
        <div style={{fontSize: 96, letterSpacing: "-0.06em"}}>open source</div>
      </div>
    </AbsoluteFill>
  );
};
