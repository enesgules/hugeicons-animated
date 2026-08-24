import {Easing, interpolate, useCurrentFrame} from "remotion";
import {AnimatedSourceIcon, type ShowcaseIconKind} from "../components/ShowcaseIcons";
import {TextSceneLayout} from "../components/TextSceneLayout";

type EndFeatureProps = {
  delay: number;
  icon: ShowcaseIconKind;
  label: string;
};

const EndFeature: React.FC<EndFeatureProps> = ({delay, icon, label}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: 30,
        opacity: interpolate(frame, [delay, delay + 12], [0, 1], {
          easing: Easing.bezier(0.23, 1, 0.32, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [delay, delay + 15], ["34px 0px", "0px 0px"], {
          easing: Easing.bezier(0.23, 1, 0.32, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          border: "2px solid rgba(29,50,8,0.18)",
          borderRadius: 999,
          display: "flex",
          flex: "0 0 auto",
          height: 136,
          justifyContent: "center",
          width: 136,
        }}
      >
        <AnimatedSourceIcon delay={delay} icon={icon} size={80} />
      </div>
      <div
        style={{
          fontSize: 104,
          letterSpacing: "-0.065em",
          lineHeight: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const EndScene: React.FC = () => {
  return (
    <TextSceneLayout
      backgroundColor="#A3E263"
      color="#1D3208"
      headline="hugeicons-animated.com"
      headlineFontSize={126}
      name="Open source"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <EndFeature delay={30} icon="gift" label="free" />
        <EndFeature delay={38} icon="github" label="open source" />
      </div>
    </TextSceneLayout>
  );
};
