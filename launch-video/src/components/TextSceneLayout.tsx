import type {ReactNode} from "react";
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from "remotion";

type TextSceneLayoutProps = {
  backgroundColor: string;
  children: ReactNode;
  color: string;
  headline: ReactNode;
  headlineFontSize: number;
  name: string;
};

export const TextSceneLayout: React.FC<TextSceneLayoutProps> = ({
  backgroundColor,
  children,
  color,
  headline,
  headlineFontSize,
  name,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        color,
        overflow: "hidden",
      }}
    >
      <Interactive.Div
        name={`${name} headline`}
        style={{
          fontSize: headlineFontSize,
          left: 84,
          letterSpacing: "-0.065em",
          lineHeight: 0.94,
          opacity: interpolate(frame, [5, 22], [0, 1], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          top: 152,
          translate: interpolate(frame, [5, 24], ["0px 38px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {headline}
      </Interactive.Div>
      <Interactive.Div
        name={`${name} content`}
        style={{
          left: 84,
          opacity: interpolate(frame, [22, 38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          position: "absolute",
          right: 84,
          top: 635,
          translate: interpolate(frame, [22, 42], ["0px 28px", "0px 0px"], {
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {children}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
