import {Easing, interpolate, useCurrentFrame} from "remotion";
import {TextSceneLayout} from "../components/TextSceneLayout";

const COMMAND = "npx shadcn add @hugeicons-animated/notification-03";
const COMMAND_PREFIX = "npx shadcn add";

const TypingCursor: React.FC<{frame: number}> = ({frame}) => (
  <span
    style={{
      backgroundColor: "#AFE67F",
      display: "inline-block",
      height: 72,
      marginLeft: 8,
      opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0,
      translate: "0px 11px",
      width: 6,
    }}
  />
);

export const InstallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typedCharacters = Math.floor(
    interpolate(frame, [23, 79], [0, COMMAND.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }),
  );
  const typedPrefix = COMMAND.slice(0, Math.min(typedCharacters, COMMAND_PREFIX.length));
  const typedPackage = COMMAND.slice(COMMAND_PREFIX.length + 1, typedCharacters);
  const typingPackage = typedCharacters > COMMAND_PREFIX.length;

  return (
    <TextSceneLayout
      backgroundColor="#141812"
      color="#FFFFFF"
      headline={
        <>
          add one icon.
          <br />
          <span style={{color: "rgba(255,255,255,0.42)"}}>own the source.</span>
        </>
      }
      headlineFontSize={92}
      name="Shadcn install"
    >
      <div
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 72,
          letterSpacing: "-0.04em",
          lineHeight: 1.15,
          whiteSpace: "nowrap",
        }}
      >
        <div>
          <span style={{color: "#79BD3E"}}>$</span> {typedPrefix}
          {typingPackage ? null : <TypingCursor frame={frame} />}
        </div>
        <div style={{marginLeft: 58, marginTop: 10}}>
          {typedPackage}
          {typingPackage ? <TypingCursor frame={frame} /> : null}
        </div>
      </div>
    </TextSceneLayout>
  );
};
