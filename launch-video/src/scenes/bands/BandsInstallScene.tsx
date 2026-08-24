import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";

const COMMAND = "npx shadcn add @hugeicons-animated/notification-03";

export const BandsInstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const visibleCharacters = Math.floor(
    interpolate(frame, [22, 76], [0, COMMAND.length], {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const commandStart = COMMAND.slice(0, Math.min(visibleCharacters, 14));
  const commandPackage = COMMAND.slice(15, visibleCharacters);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#AFE67F",
        color: "#141812",
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name="Bands install title"
        style={{
          fontSize: 94,
          left: 84,
          letterSpacing: "-0.065em",
          lineHeight: 0.94,
          opacity: interpolate(frame, [4, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          top: 92,
          translate: interpolate(frame, [4, 20], ["0px 30px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        add one icon. own the source.
      </Interactive.Div>

      <div
        style={{
          backgroundColor: "#141812",
          bottom: 82,
          color: "#FFFFFF",
          height: 650,
          left: 84,
          opacity: interpolate(frame, [12, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          padding: "92px 76px",
          position: "absolute",
          right: 84,
          translate: interpolate(frame, [12, 28], ["0px 48px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            color: "#AFE67F",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 34,
            letterSpacing: "0.08em",
            marginBottom: 56,
            textTransform: "uppercase",
          }}
        >
          $ install
        </div>
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 82,
            letterSpacing: "-0.045em",
            lineHeight: 1.14,
            whiteSpace: "nowrap",
          }}
        >
          <div>{commandStart}</div>
          <div style={{color: "rgba(255,255,255,0.62)", marginTop: 12}}>{commandPackage}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
