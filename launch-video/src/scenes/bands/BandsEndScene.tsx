import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";

export const BandsEndScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#AFE67F",
        color: "#1D3208",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Bands website"
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
          top: 126,
          translate: interpolate(frame, [4, 20], ["0px 34px", "0px 0px"], {
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
          backgroundColor: "#141812",
          bottom: 92,
          color: "#FFFFFF",
          display: "flex",
          gap: 82,
          height: 450,
          left: 0,
          opacity: interpolate(frame, [20, 34], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          padding: "0 84px",
          position: "absolute",
          right: 0,
          translate: interpolate(frame, [20, 38], ["0px 80px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AlternativeIconCard backgroundColor="#FFFFFF" color="#141812" delay={30} icon="gift" iconSize={112} size={180} />
        <div style={{fontSize: 104, letterSpacing: "-0.06em"}}>free</div>
        <div style={{height: 180, width: 2, backgroundColor: "rgba(255,255,255,0.2)"}} />
        <AlternativeIconCard backgroundColor="#FFFFFF" color="#141812" delay={38} icon="github" iconSize={112} size={180} />
        <div style={{fontSize: 104, letterSpacing: "-0.06em"}}>open source</div>
      </div>
    </AbsoluteFill>
  );
};
