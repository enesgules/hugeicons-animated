import {TransitionSeries} from "@remotion/transitions";
import {SpotlightEndScene} from "./scenes/spotlight/SpotlightEndScene";
import {SpotlightInstallScene} from "./scenes/spotlight/SpotlightInstallScene";
import {SpotlightIntroScene} from "./scenes/spotlight/SpotlightIntroScene";
import {SpotlightShowcaseScene} from "./scenes/spotlight/SpotlightShowcaseScene";

export const SpotlightLaunchVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75} name="Spotlight intro">
        <SpotlightIntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={105} name="Icon spotlight">
        <SpotlightShowcaseScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={90} name="Spotlight install">
        <SpotlightInstallScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={75} name="Spotlight end">
        <SpotlightEndScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
