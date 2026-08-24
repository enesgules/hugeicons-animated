import {Easing, interpolate, useCurrentFrame} from "remotion";
import {AlternativeIconCard} from "../../components/AlternativeIconCard";
import type {ShowcaseIconKind} from "../../components/ShowcaseIcons";

type BandProps = {
  backgroundColor: string;
  direction: "left" | "right";
  icons: ShowcaseIconKind[];
  rotate: string;
  top: number;
};

const Band: React.FC<BandProps> = ({backgroundColor, direction, icons, rotate, top}) => {
  const frame = useCurrentFrame();
  const repeatedIcons = [...icons, ...icons, ...icons];

  return (
    <div
      style={{
        backgroundColor,
        height: 286,
        left: -130,
        overflow: "hidden",
        position: "absolute",
        rotate,
        top,
        width: 2180,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 76,
          height: "100%",
          left: 0,
          position: "absolute",
          translate: interpolate(
            frame,
            [0, 105],
            direction === "left" ? ["-40px 0px", "-760px 0px"] : ["-760px 0px", "-40px 0px"],
            {
              easing: Easing.linear,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        {repeatedIcons.map((icon, index) => (
          <AlternativeIconCard
            backgroundColor="#FFFFFF"
            color="#141812"
            delay={index * 1.5}
            icon={icon}
            iconSize={132}
            key={`${icon}-${index}`}
            size={204}
          />
        ))}
      </div>
    </div>
  );
};

export const BandsShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();

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
      <div
        style={{
          opacity: interpolate(frame, [0, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [0, 18], [0.96, 1], {
            easing: Easing.spring({damping: 180}),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
        }}
      >
        <Band
          backgroundColor="#AFE67F"
          direction="left"
          icons={["notification", "search", "settings", "arrow-up-right", "diamond"]}
          rotate="-2.5deg"
          top={-38}
        />
        <Band
          backgroundColor="#141812"
          direction="right"
          icons={["airplane", "cloud-rain", "magic-wand", "play", "alarm"]}
          rotate="2deg"
          top={390}
        />
        <Band
          backgroundColor="#DCE5D6"
          direction="left"
          icons={["gift", "github", "refresh", "diamond", "notification"]}
          rotate="-1.5deg"
          top={812}
        />
      </div>
    </div>
  );
};
