import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";
import type {ShowcaseIconKind} from "../../components/ShowcaseIcons";

type SpotlightCardProps = {
  backgroundColor: string;
  color: string;
  delay: number;
  height: number;
  icon: ShowcaseIconKind;
  iconSize: number;
  left: number;
  top: number;
  width: number;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  backgroundColor,
  color,
  delay,
  height,
  icon,
  iconSize,
  left,
  top,
  width,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor,
        display: "flex",
        height,
        justifyContent: "center",
        left,
        opacity: interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        overflow: "hidden",
        position: "absolute",
        scale: interpolate(frame, [delay, delay + 18], [0.88, 1], {
          easing: Easing.spring({damping: 180}),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          output: "perceptual-scale",
        }),
        top,
        translate: interpolate(frame, [delay, delay + 18], ["0px 54px", "0px 0px"], {
          easing: Easing.bezier(0.23, 1, 0.32, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        width,
      }}
    >
      <AlternativeIconCard backgroundColor="#FFFFFF" color={color} delay={delay + 5} icon={icon} iconSize={iconSize} size={iconSize * 1.55} />
    </div>
  );
};

export const SpotlightShowcaseScene: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#141812", overflow: "hidden"}}>
      <SpotlightCard backgroundColor="#AFE67F" color="#141812" delay={0} height={600} icon="magic-wand" iconSize={260} left={0} top={0} width={800} />
      <SpotlightCard backgroundColor="#F3F5F0" color="#141812" delay={5} height={600} icon="airplane" iconSize={250} left={820} top={0} width={1100} />
      <SpotlightCard backgroundColor="#FFFFFF" color="#141812" delay={10} height={460} icon="alarm" iconSize={190} left={0} top={620} width={560} />
      <SpotlightCard backgroundColor="#DCE5D6" color="#141812" delay={15} height={460} icon="settings" iconSize={190} left={580} top={620} width={640} />
      <SpotlightCard backgroundColor="#AFE67F" color="#141812" delay={20} height={460} icon="diamond" iconSize={190} left={1240} top={620} width={680} />
    </AbsoluteFill>
  );
};
