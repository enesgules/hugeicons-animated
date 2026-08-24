import {AnimatedSourceIcon, type ShowcaseIconKind} from "./ShowcaseIcons";

type AlternativeIconCardProps = {
  backgroundColor: string;
  color: string;
  delay?: number;
  icon: ShowcaseIconKind;
  iconSize: number;
  size: number;
};

export const AlternativeIconCard: React.FC<AlternativeIconCardProps> = ({
  backgroundColor,
  color,
  delay = 0,
  icon,
  iconSize,
  size,
}) => {
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor,
        border: "2px solid rgba(20,24,18,0.14)",
        borderRadius: 999,
        color,
        display: "flex",
        flex: "0 0 auto",
        height: size,
        justifyContent: "center",
        width: size,
      }}
    >
      <AnimatedSourceIcon delay={delay} icon={icon} size={iconSize} />
    </div>
  );
};
