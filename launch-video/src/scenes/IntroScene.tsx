import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";
import {
  DiamondShowcaseIcon,
  NotificationShowcaseIcon,
  RefreshShowcaseIcon,
} from "../components/ShowcaseIcons";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#141812",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Hugeicons opening"
        style={{
          fontSize: 142,
          left: 82,
          letterSpacing: "-0.075em",
          lineHeight: 0.92,
          position: "absolute",
          top: 245,
        }}
      >
        <div
          style={{
            opacity: interpolate(frame, [7, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.23, 1, 0.32, 1),
            }),
            translate: interpolate(frame, [7, 26], ["0px 36px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.23, 1, 0.32, 1),
            }),
          }}
        >
          Hugeicons,
        </div>
        <div
          style={{
            color: "#AFE67F",
            opacity: interpolate(frame, [24, 43], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.23, 1, 0.32, 1),
            }),
            translate: interpolate(frame, [24, 45], ["0px 36px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.23, 1, 0.32, 1),
            }),
          }}
        >
          now animated.
        </div>
      </Interactive.Div>
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#AFE67F",
          borderRadius: 999,
          color: "#141812",
          display: "flex",
          height: 330,
          justifyContent: "center",
          opacity: interpolate(frame, [8, 22], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          right: 225,
          scale: interpolate(frame, [8, 25], [0.72, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({damping: 170}),
            output: "perceptual-scale",
          }),
          top: 105,
          width: 330,
        }}
      >
        <NotificationShowcaseIcon delay={0} size={205} />
      </div>
      <div
        style={{
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 999,
          display: "flex",
          height: 270,
          justifyContent: "center",
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          right: 500,
          top: 550,
          width: 270,
        }}
      >
        <RefreshShowcaseIcon delay={8} size={175} />
      </div>
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.45)",
          borderRadius: 999,
          color: "#141812",
          display: "flex",
          height: 245,
          justifyContent: "center",
          opacity: interpolate(frame, [22, 37], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          right: 120,
          top: 665,
          width: 245,
        }}
      >
        <DiamondShowcaseIcon delay={15} size={155} />
      </div>
    </AbsoluteFill>
  );
};
