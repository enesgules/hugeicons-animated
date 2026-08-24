import {Composition, Folder} from "remotion";
import {BandsLaunchVideo} from "./BandsLaunchVideo";
import {LaunchVideo} from "./LaunchVideo";
import {SpotlightLaunchVideo} from "./SpotlightLaunchVideo";
import {EndScene} from "./scenes/EndScene";
import {IconWallScene} from "./scenes/IconWallScene";
import {InstallScene} from "./scenes/InstallScene";
import {IntroScene} from "./scenes/IntroScene";

export const MyComposition: React.FC = () => {
  return (
    <>
      <Folder name="Hugeicons-Launch-Scenes">
        <Composition id="IntroScene" component={IntroScene} durationInFrames={90} fps={30} width={1920} height={1080} />
        <Composition id="IconWallScene" component={IconWallScene} durationInFrames={105} fps={30} width={1920} height={1080} />
        <Composition id="InstallScene" component={InstallScene} durationInFrames={105} fps={30} width={1920} height={1080} />
        <Composition id="EndScene" component={EndScene} durationInFrames={90} fps={30} width={1920} height={1080} />
      </Folder>
      <Composition
        id="HugeiconsAnimatedLaunch"
        component={LaunchVideo}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HugeiconsAnimatedBands"
        component={BandsLaunchVideo}
        durationInFrames={345}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HugeiconsAnimatedSpotlight"
        component={SpotlightLaunchVideo}
        durationInFrames={345}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
