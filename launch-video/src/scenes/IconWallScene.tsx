import {Easing, interpolate, useCurrentFrame} from "remotion";
import {
  AnimatedSourceIcon,
  type ShowcaseIconKind,
} from "../components/ShowcaseIcons";

type IconPosition = {
  diameter: number;
  icon: ShowcaseIconKind;
  left: number;
  top: number;
};

const ICONS: IconPosition[] = [
  {diameter: 286, icon: "search", left: 190, top: 225},
  {diameter: 260, icon: "settings", left: 555, top: 205},
  {diameter: 288, icon: "arrow-up-right", left: 920, top: 235},
  {diameter: 266, icon: "diamond", left: 1285, top: 205},
  {diameter: 282, icon: "play", left: 1640, top: 235},
  {diameter: 300, icon: "alarm", left: 300, top: 745},
  {diameter: 270, icon: "airplane", left: 675, top: 720},
  {diameter: 292, icon: "cloud-rain", left: 1040, top: 760},
  {diameter: 268, icon: "magic-wand", left: 1405, top: 720},
  {diameter: 286, icon: "notification", left: 1750, top: 755},
];

const IconSpot: React.FC<IconPosition & {index: number}> = ({
  diameter,
  icon,
  index,
  left,
  top,
}) => {
  const frame = useCurrentFrame();
  const delay = index * 3;

  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        border: "2px solid #DDE3D8",
        borderRadius: 999,
        boxShadow: "0 18px 48px rgba(20,24,18,0.07)",
        color: "#141812",
        display: "flex",
        height: diameter,
        justifyContent: "center",
        left,
        opacity: interpolate(frame, [delay, delay + 10], [0, 1], {
          easing: Easing.bezier(0.23, 1, 0.32, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        position: "absolute",
        scale: interpolate(frame, [delay, delay + 14], [0.82, 1], {
          easing: Easing.spring({damping: 180}),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          output: "perceptual-scale",
        }),
        top,
        translate: "-50% -50%",
        width: diameter,
      }}
    >
      <AnimatedSourceIcon delay={index * 2} icon={icon} size={diameter * 0.6} />
    </div>
  );
};

export const IconWallScene: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#F3F5F0",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {ICONS.map((icon, index) => (
        <IconSpot key={`${icon.icon}-${index}`} {...icon} index={index} />
      ))}
    </div>
  );
};
