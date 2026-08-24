import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";

const COMMAND = "npx shadcn add @hugeicons-animated/notification-03";

export const SpotlightInstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typedCharacters = Math.floor(
    interpolate(frame, [20, 76], [0, COMMAND.length], {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <AbsoluteFill style={{backgroundColor: "#FFFFFF", color: "#141812", overflow: "hidden"}}>
      <Interactive.Div
        name="Spotlight install title"
        style={{
          fontSize: 126,
          left: 84,
          letterSpacing: "-0.072em",
          lineHeight: 0.9,
          opacity: interpolate(frame, [4, 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          top: 110,
          translate: interpolate(frame, [4, 21], ["0px 38px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        add one icon.
        <br />
        own the source.
      </Interactive.Div>

      <div
        style={{
          bottom: 70,
          left: 84,
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          translate: interpolate(frame, [15, 34], ["0px 48px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <AlternativeIconCard backgroundColor="#AFE67F" color="#141812" delay={20} icon="notification" iconSize={160} size={250} />
      </div>

      <div
        style={{
          backgroundColor: "#141812",
          bottom: 70,
          color: "#FFFFFF",
          height: 390,
          left: 390,
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          padding: "64px 66px",
          position: "absolute",
          right: 84,
          translate: interpolate(frame, [15, 34], ["0px 48px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 64,
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{color: "#AFE67F"}}>$</span> {COMMAND.slice(0, Math.min(typedCharacters, 14))}
          <br />
          <span style={{marginLeft: 50}}>{COMMAND.slice(15, typedCharacters)}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
