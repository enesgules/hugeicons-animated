import {TransitionSeries} from "@remotion/transitions";
import {EndScene} from "./scenes/EndScene";
import {IconWallScene} from "./scenes/IconWallScene";
import {InstallScene} from "./scenes/InstallScene";
import {IntroScene} from "./scenes/IntroScene";

export const LaunchVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90} name="Hugeicons intro">
        <IntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={105} name="Animated icons">
        <IconWallScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={105} name="Shadcn install">
        <InstallScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={90} name="Open source">
        <EndScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
