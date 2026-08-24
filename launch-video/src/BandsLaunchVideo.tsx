import {TransitionSeries} from "@remotion/transitions";
import {BandsEndScene} from "./scenes/bands/BandsEndScene";
import {BandsInstallScene} from "./scenes/bands/BandsInstallScene";
import {BandsIntroScene} from "./scenes/bands/BandsIntroScene";
import {BandsShowcaseScene} from "./scenes/bands/BandsShowcaseScene";

export const BandsLaunchVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={75} name="Bands intro">
        <BandsIntroScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={105} name="Moving icon bands">
        <BandsShowcaseScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={90} name="Bands install">
        <BandsInstallScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={75} name="Bands end">
        <BandsEndScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
