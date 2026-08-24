import {Easing, interpolate, useCurrentFrame} from "remotion";

type ShowcaseIconProps = {
  delay?: number;
  size?: number;
};

export type ShowcaseIconKind =
  | "airplane"
  | "alarm"
  | "arrow-up-right"
  | "cloud-rain"
  | "diamond"
  | "gift"
  | "github"
  | "magic-wand"
  | "notification"
  | "play"
  | "refresh"
  | "search"
  | "settings";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.5,
} satisfies React.SVGProps<SVGPathElement>;

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const frames = (start: number, duration: number, times: readonly number[]) =>
  times.map((time) => start + duration * time);

const cycle = (frame: number, duration: number) =>
  frame < 0 ? 0 : frame % duration;

export const NotificationShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const start = 8;

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <g
        style={{
          rotate: interpolate(
            frame,
            frames(start, 27, [0, 0.18, 0.38, 0.56, 0.72, 0.87, 1]),
            ["0deg", "-14deg", "11deg", "-8deg", "5deg", "-2deg", "0deg"],
            {...clamp, easing: Easing.inOut(Easing.ease)},
          ),
          transformBox: "fill-box",
          transformOrigin: "top center",
        }}
      >
        <path
          d="M20 18.5011L18.349 7.93407C17.8603 4.80601 15.166 2.5 12 2.5C8.83398 2.5 6.13971 4.80601 5.65098 7.93407L4 18.5011"
          {...stroke}
        />
        <path
          d="M20 18.5C20 16.8431 16.4183 15.5 12 15.5C7.58172 15.5 4 16.8431 4 18.5C4 20.1569 7.58172 21.5 12 21.5C16.4183 21.5 20 20.1569 20 18.5Z"
          {...stroke}
        />
        <path
          d="M13 18.5H11"
          {...stroke}
          style={{
            translate: interpolate(
              frame,
              frames(start, 27, [0, 0.24, 0.44, 0.62, 0.78, 0.9, 1]),
              ["0px 0px", "2.2px 0px", "-1.8px 0px", "1.2px 0px", "-0.7px 0px", "0.3px 0px", "0px 0px"],
              {...clamp, easing: Easing.inOut(Easing.ease)},
            ),
          }}
        />
      </g>
    </svg>
  );
};

export const RefreshShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;

  return (
    <svg
      fill="none"
      height={size}
      overflow="visible"
      viewBox="0 0 24 24"
      width={size}
      style={{
        rotate: interpolate(frame, frames(8, 27, [0, 0.2, 1]), ["0deg", "-25deg", "360deg"], {
          ...clamp,
          easing: Easing.inOut(Easing.ease),
        }),
        transformOrigin: "center",
      }}
    >
      <path
        d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
        {...stroke}
      />
    </svg>
  );
};

export const PlayShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const input = frames(9, 15.6, [0, 0.2, 0.52, 0.78, 1]);
  const easing = Easing.bezier(0.23, 1, 0.32, 1);
  const translateX = interpolate(frame, input, [0, -0.8, 2, -0.2, 0], {...clamp, easing});
  const scaleX = interpolate(frame, input, [1, 0.9, 1.1, 0.99, 1], {...clamp, easing});
  const scaleY = interpolate(frame, input, [1, 1.04, 0.97, 1.005, 1], {...clamp, easing});

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <path
        d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
        {...stroke}
        style={{
          transform: `translateX(${translateX}px) scaleX(${scaleX}) scaleY(${scaleY})`,
          transformBox: "fill-box",
          transformOrigin: "10px 12px",
        }}
      />
    </svg>
  );
};

export const AlarmShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = cycle(useCurrentFrame() - delay - 8, 20.4);
  const bellTransform = (direction: number) => {
    const input = frames(0, 20.4, [0, 0.2, 0.42, 0.64, 0.82, 1]);
    const easing = Easing.bezier(0.77, 0, 0.175, 1);
    const x = interpolate(frame, input, [0, direction * 2.6, direction * -0.45, direction * 2.1, direction * 0.35, 0], {...clamp, easing});
    const y = interpolate(frame, input, [0, 0.9, -0.25, 0.65, 0.1, 0], {...clamp, easing});
    const rotate = interpolate(frame, input, [0, direction * -9, direction * 4, direction * -6, direction * -1, 0], {...clamp, easing});
    return `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  };

  return (
    <svg
      fill="none"
      height={size}
      overflow="visible"
      viewBox="0 0 24 24"
      width={size}
      style={{
        rotate: interpolate(
          cycle(useCurrentFrame() - delay - 8, 18.6),
          frames(0, 18.6, [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1]),
          ["0deg", "-5deg", "4deg", "-3deg", "2deg", "-1deg", "0deg"],
          {...clamp, easing: Easing.bezier(0.77, 0, 0.175, 1)},
        ),
        transformOrigin: "12px 13px",
      }}
    >
      <path d="M20.5 12.5C20.5 17.1944 16.6944 21 12 21C7.30558 21 3.5 17.1944 3.5 12.5C3.5 7.80558 7.30558 4 12 4C16.6944 4 20.5 7.80558 20.5 12.5Z" {...stroke} />
      <path d="M5.88 18.7031L3.5 21.0031" {...stroke} />
      <path d="M18.14 18.668L20.5 20.998" {...stroke} />
      <path d="M5 3L2 6" {...stroke} style={{transform: bellTransform(1), transformBox: "fill-box", transformOrigin: "center"}} />
      <path d="M22 6L19 3" {...stroke} style={{transform: bellTransform(-1), transformBox: "fill-box", transformOrigin: "center"}} />
      <path d="M12 8V12.5L14 14.5" {...stroke} />
    </svg>
  );
};

const rainStyle = (frame: number, index: number) => {
  const rainFrame = cycle(frame - 8 - index * 5.4, 36);
  const length = interpolate(rainFrame, frames(0, 36, [0, 0.18, 0.46, 0.58, 0.64, 0.88, 1]), [1, 1, 0.18, 0, 0, 1, 1], clamp);
  const offset = interpolate(rainFrame, frames(0, 36, [0, 0.18, 0.46, 0.58, 0.64, 0.88, 1]), [0, 0, 0.82, 1, 0, 0, 0], clamp);
  return {opacity: length === 0 ? 0 : 1, strokeDasharray: `${length} 1`, strokeDashoffset: -offset};
};

export const CloudRainShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const cloudFrame = cycle(frame - 8, 48);

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <path
        d="M17.4776 9.00005C17.485 9.00002 17.4925 9 17.5 9C19.9853 9 22 11.0147 22 13.5C22 15.0602 21.206 16.435 20 17.2422M17.1251 10.5C17.3093 10.0282 17.4303 9.52476 17.4776 9.00005C17.4924 8.83536 17.5 8.66856 17.5 8.5C17.5 5.46243 15.0376 3 12 3C9.12324 3 6.76233 5.20862 6.52042 8.0227M6.52042 8.0227C3.98398 8.26407 2 10.4003 2 13C2 14.6358 2.78555 16.0882 4 17.0004M6.52042 8.0227C6.67826 8.00768 6.83823 8 7 8C7.7111 8 8.38754 8.14845 9 8.41604"
        {...stroke}
        style={{
          translate: interpolate(cloudFrame, frames(0, 48, [0, 0.5, 1]), ["0px 0px", "0px -1px", "0px 0px"], {
            ...clamp,
            easing: Easing.inOut(Easing.ease),
          }),
        }}
      />
      <path d="M16 14V19" pathLength={1} {...stroke} style={rainStyle(frame, 0)} />
      <path d="M8 14V19" pathLength={1} {...stroke} style={rainStyle(frame, 1)} />
      <path d="M12 16V21" pathLength={1} {...stroke} style={rainStyle(frame, 2)} />
    </svg>
  );
};

export const MagicWandShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const starStyle = (index: number) => {
    const starFrame = cycle(frame - 8 - index * 12, 33);
    return {
      rotate: interpolate(starFrame, frames(0, 33, [0, 1 / 3, 2 / 3, 1]), ["0deg", "45deg", "90deg", "90deg"], {...clamp, easing: Easing.inOut(Easing.ease)}),
      scale: interpolate(starFrame, frames(0, 33, [0, 1 / 3, 2 / 3, 1]), [1, 0.3, 1.3, 1], {...clamp, easing: Easing.inOut(Easing.ease)}),
      transformBox: "fill-box" as const,
      transformOrigin: "center",
    };
  };
  const sparkleStyle = (index: number) => {
    const sparkleFrame = cycle(frame - 14 - index * 15, 33);
    return {
      opacity: interpolate(sparkleFrame, frames(0, 33, [0, 0.5, 1]), [0, 1, 0], clamp),
      scale: interpolate(sparkleFrame, frames(0, 33, [0, 0.5, 1]), [0.4, 1, 0.6], {...clamp, easing: Easing.out(Easing.ease)}),
      transformBox: "fill-box" as const,
      transformOrigin: "center",
    };
  };

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <path
        d="M13.9258 12.7775L11.7775 10.6292C11.4847 10.3364 11.3383 10.19 11.1803 10.1117C10.8798 9.96277 10.527 9.96277 10.2264 10.1117C10.0685 10.19 9.92207 10.3364 9.62923 10.6292C9.33638 10.9221 9.18996 11.0685 9.11169 11.2264C8.96277 11.527 8.96277 11.8798 9.11169 12.1803C9.18996 12.3383 9.33638 12.4847 9.62923 12.7775L11.7775 14.9258M13.9258 12.7775L20.3708 19.2225C20.6636 19.5153 20.81 19.6617 20.8883 19.8197C21.0372 20.1202 21.0372 20.473 20.8883 20.7736C20.81 20.9315 20.6636 21.0779 20.3708 21.3708C20.0779 21.6636 19.9315 21.81 19.7736 21.8883C19.473 22.0372 19.1202 22.0372 18.8197 21.8883C18.6617 21.81 18.5153 21.6636 18.2225 21.3708L11.7775 14.9258M13.9258 12.7775L11.7775 14.9258"
        {...stroke}
        style={{
          rotate: interpolate(frame, frames(8, 21, [0, 0.3, 0.6, 1]), ["0deg", "-14deg", "8deg", "0deg"], {
            ...clamp,
            easing: Easing.inOut(Easing.ease),
          }),
          transformBox: "fill-box",
          transformOrigin: "20px 21px",
        }}
      />
      <path d="M17 2L17.2948 2.7966C17.6813 3.84117 17.8746 4.36345 18.2556 4.74445C18.6366 5.12545 19.1588 5.31871 20.2034 5.70523L21 6L20.2034 6.29477C19.1588 6.68129 18.6366 6.87456 18.2556 7.25555C17.8746 7.63655 17.6813 8.15883 17.2948 9.2034L17 10L16.7052 9.2034C16.3187 8.15884 16.1254 7.63655 15.7444 7.25555C15.3634 6.87455 14.8412 6.68129 13.7966 6.29477L13 6L13.7966 5.70523C14.8412 5.31871 15.3634 5.12545 15.7444 4.74445C16.1254 4.36345 16.3187 3.84117 16.7052 2.7966L17 2Z" {...stroke} style={starStyle(0)} />
      <path d="M6 4L6.22108 4.59745C6.51097 5.38087 6.65592 5.77259 6.94167 6.05834C7.22741 6.34408 7.61913 6.48903 8.40255 6.77892L9 7L8.40255 7.22108C7.61913 7.51097 7.22741 7.65592 6.94166 7.94167C6.65592 8.22741 6.51097 8.61913 6.22108 9.40255L6 10L5.77892 9.40255C5.48903 8.61913 5.34408 8.22741 5.05833 7.94167C4.77259 7.65592 4.38087 7.51097 3.59745 7.22108L3 7L3.59745 6.77892C4.38087 6.48903 4.77259 6.34408 5.05833 6.05833C5.34408 5.77259 5.48903 5.38087 5.77892 4.59745L6 4Z" {...stroke} style={starStyle(1)} />
      <path d="M3.5 15.5V17.5M2.5 16.5H4.5" {...stroke} style={sparkleStyle(0)} />
      <path d="M21 10.5V12.5M20 11.5H22" {...stroke} style={sparkleStyle(1)} />
    </svg>
  );
};

export const DiamondShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 570}) => {
  const frame = useCurrentFrame() - delay;
  const start = 7;

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <g
        style={{
          rotate: interpolate(frame, frames(start, 25.5, [0, 0.3, 0.5, 0.72, 1]), ["0deg", "-4.5deg", "2.5deg", "-0.75deg", "0deg"], {...clamp, easing: Easing.inOut(Easing.ease)}),
          scale: interpolate(frame, frames(start, 25.5, [0, 0.3, 0.5, 0.72, 1]), [1, 1.15, 0.985, 1.045, 1], {...clamp, easing: Easing.inOut(Easing.ease)}),
          transformBox: "fill-box",
          transformOrigin: "center",
          translate: interpolate(frame, frames(start, 25.5, [0, 0.3, 0.5, 0.72, 1]), ["0px 0px", "0px -1.1px", "0px 0.2px", "0px -0.35px", "0px 0px"], {...clamp, easing: Easing.inOut(Easing.ease)}),
        }}
      >
        <path d="M5.78223 4.18192C6.43007 3.68319 6.754 3.43383 7.12788 3.27323C7.29741 3.20041 7.47367 3.14158 7.65459 3.09741C8.0536 3 8.4767 3 9.32289 3H14.6771C15.5233 3 15.9464 3 16.3454 3.09741C16.5263 3.14158 16.7026 3.20041 16.8721 3.27323C17.246 3.43383 17.5699 3.68319 18.2178 4.18192C20.3644 5.83448 21.4378 6.66077 21.8057 7.73078C21.9694 8.20673 22.0305 8.70728 21.9858 9.20461C21.8852 10.3227 21.0379 11.346 19.3433 13.3925L15.3498 18.2153C13.8126 20.0718 13.044 21 12 21C10.956 21 10.1874 20.0718 8.65018 18.2153L4.65671 13.3925C2.96208 11.346 2.11476 10.3227 2.0142 9.20461C1.96947 8.70728 2.03064 8.20673 2.1943 7.73078C2.56224 6.66077 3.63557 5.83448 5.78223 4.18192Z" {...stroke} />
        <path
          d="M10 8.5H14"
          {...stroke}
          style={{
            scale: interpolate(frame, frames(start + 1.5, 21.6, [0, 0.24, 0.48, 0.72, 1]), ["1 1", "0.55 1", "1.55 1", "0.82 1", "1 1"], {...clamp, easing: Easing.inOut(Easing.ease)}),
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
        <path
          d="M19.1 1.9V6.7M16.7 4.3H21.5"
          {...stroke}
          opacity={interpolate(frame, frames(start + 2.4, 20.4, [0, 0.1, 0.78, 1]), [0, 1, 1, 0], clamp)}
          style={{
            rotate: interpolate(frame, frames(start + 2.4, 20.4, [0, 0.34, 0.62, 1]), ["-18deg", "0deg", "14deg", "26deg"], {...clamp, easing: Easing.inOut(Easing.ease)}),
            scale: interpolate(frame, frames(start + 2.4, 20.4, [0, 0.34, 0.62, 1]), [0.2, 1.35, 1.05, 0.45], {...clamp, easing: Easing.inOut(Easing.ease)}),
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      </g>
    </svg>
  );
};

const PLANE_PATH = "M3.82527 12.1661C3.55027 11.9661 3.30028 11.7161 3.00028 10.8411C2.91891 10.6241 2.61139 9.53619 2.35028 8.54109C2.13003 7.7017 1.93377 6.93555 2.02528 6.74109C2.10029 6.54109 2.20027 6.39109 2.52527 6.19109C2.72527 6.06802 3.75027 5.81609 3.95027 5.76609C4.15027 5.71609 4.42526 5.69109 4.65027 5.76609C5.07527 5.84109 5.95027 7.11609 6.17527 7.26609C6.27526 7.36609 6.60027 7.657 6.97527 7.69109C7.25027 7.71609 7.52527 7.64109 7.82528 7.51609C8.10027 7.40151 13.5253 4.76609 14.0253 4.54109C18.1003 2.84109 21.0603 5.63609 21.5103 6.23609C21.9753 6.81609 22.0753 6.99109 21.9503 7.49109C21.7887 8.01609 21.3503 8.11609 21.1003 8.19109C20.8503 8.26609 17.4003 9.19109 16.0503 9.56609C15.7554 9.6621 15.6114 9.85492 15.5753 9.89109C15.4003 10.1411 14.6053 11.8411 14.3803 12.2161C14.2253 12.6161 13.8003 13.1161 13.2503 13.3161C12.6753 13.5161 11.6753 13.7411 11.4503 13.8161C11.2253 13.8911 10.7003 14.0411 10.5253 13.9911C10.3003 13.9411 10.0853 13.7161 10.1853 13.3661C10.2853 13.0161 10.4753 12.0411 10.5003 11.8911C10.5253 11.7411 10.7753 11.1161 10.5003 11.0911C10.4503 11.0161 9.92527 11.2411 9.15027 11.4161C8.57449 11.5782 7.9715 11.7386 7.55027 11.8411C5.92527 12.3161 5.04521 12.4411 4.85027 12.4411C4.47527 12.4411 4.20027 12.3911 3.82527 12.1661Z";

export const AirplaneShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 570}) => {
  const frame = useCurrentFrame() - delay;
  const start = 5;
  const times = [0, 0.08, 0.18, 0.28, 0.37, 0.44, 0.49, 0.52, 1];
  const departingInput = frames(start, 51, times);
  const departingX = interpolate(frame, departingInput, [0, 3, 12, 28, 50, 76, 104, 122, 122], clamp);
  const departingY = interpolate(frame, departingInput, [0, -1, -7, -18, -33, -49, -65, -76, -76], clamp);
  const departingRotate = interpolate(frame, departingInput, [0, -0.5, -2, -4, -7, -8, -6, -4, -4], clamp);
  const arrivingInput = frames(start, 51, [0, 0.49, 0.53, 0.61, 0.7, 0.79, 0.88, 0.96, 1]);
  const arrivingX = interpolate(frame, arrivingInput, [-122, -122, -108, -82, -56, -32, -14, -3, 0], clamp);
  const arrivingY = interpolate(frame, arrivingInput, [-70, -70, -62, -48, -32, -17, -6, -0.8, 0], clamp);
  const arrivingRotate = interpolate(frame, arrivingInput, [7, 7, 6, 5, 3.5, 2, 0.8, 0.15, 0], clamp);

  return (
    <svg fill="none" height={size} overflow="hidden" viewBox="0 0 24 24" width={size}>
      <path d="M2.00031 20H18.0003" {...stroke} />
      <path
        d="M12.65 20L12.45 18.65C11.38 18.62 10.55 17.88 10.55 16.95C10.55 16.18 11.1 15.55 11.85 15.42C12.02 14.46 12.7 13.8 13.55 13.8C14.4 13.8 15.08 14.46 15.25 15.42C16 15.55 16.55 16.18 16.55 16.95C16.55 17.88 15.72 18.62 14.65 18.65L14.45 20H12.65Z"
        {...stroke}
        opacity={frame < start ? 0 : 1}
        style={{
          translate: interpolate(frame, frames(start, 51, [0, 0.08, 0.22, 0.4, 0.6, 0.78, 1]), ["15px 0px", "13px 0px", "8px 0px", "1px 0px", "-7px 0px", "-15px 0px", "-22px 0px"], clamp),
        }}
      />
      <path
        d={PLANE_PATH}
        {...stroke}
        style={{
          transform: `translate(${departingX}%, ${departingY}%) rotate(${departingRotate}deg)`,
          transformBox: "fill-box",
          transformOrigin: "12px 9px",
        }}
      />
      <path
        d={PLANE_PATH}
        {...stroke}
        opacity={frame < start ? 0 : 1}
        style={{
          transform: `translate(${arrivingX}%, ${arrivingY}%) rotate(${arrivingRotate}deg)`,
          transformBox: "fill-box",
          transformOrigin: "12px 9px",
        }}
      />
    </svg>
  );
};

export const SearchShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const input = frames(7, 37.2, [0, 0.32, 0.48, 0.64, 0.84, 1]);
  const translateX = interpolate(frame, input, [0, 1.25, 0.4, -0.65, -0.15, 0], clamp);
  const translateY = interpolate(frame, input, [0, -0.55, -0.8, 0.25, 0.1, 0], clamp);
  const rotate = interpolate(frame, input, [0, 14, 6, -8, -2.5, 0], clamp);
  const scale = interpolate(frame, input, [1, 0.78, 0.76, 0.8, 1.08, 1], clamp);

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <g
        style={{
          transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale})`,
          transformBox: "fill-box",
          transformOrigin: "11px 11px",
        }}
      >
        <path d="M17 17L21 21" {...stroke} />
        <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" {...stroke} />
      </g>
    </svg>
  );
};

export const SettingsShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <path
        d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"
        {...stroke}
        style={{
          rotate: interpolate(frame, frames(7, 27.6, [0, 0.72, 0.9, 1]), ["0deg", "202deg", "177.5deg", "180deg"], {
            ...clamp,
            easing: Easing.inOut(Easing.ease),
          }),
          transformBox: "view-box",
          transformOrigin: "12px 12px",
        }}
      />
      <path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z" {...stroke} />
    </svg>
  );
};

export const ArrowUpRightShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const input = frames(7, 15, [0, 0.25, 0.5, 0.75, 1]);
  const translateX = interpolate(frame, input, [0, 2.1, -0.25, 0.4, 0], {...clamp, easing: Easing.bezier(0.23, 1, 0.32, 1)});
  const translateY = interpolate(frame, input, [0, -2.1, 0.25, -0.4, 0], {...clamp, easing: Easing.bezier(0.23, 1, 0.32, 1)});
  const scale = interpolate(frame, input, [1, 0.97, 1.01, 0.995, 1], {...clamp, easing: Easing.bezier(0.23, 1, 0.32, 1)});

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <g
        style={{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
          transformBox: "fill-box",
          transformOrigin: "12px 12px",
        }}
      >
        <path d="M16.5 7.5L6.5 17.5" {...stroke} />
        <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15" {...stroke} />
      </g>
    </svg>
  );
};

export const GiftShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const start = 7;

  return (
    <svg
      fill="none"
      height={size}
      overflow="visible"
      viewBox="0 0 24 24"
      width={size}
      style={{
        rotate: interpolate(frame, frames(start, 21, [0, 0.2, 0.4, 0.6, 0.8, 1]), ["0deg", "-4deg", "4deg", "-2.5deg", "2.5deg", "0deg"], {
          ...clamp,
          easing: Easing.inOut(Easing.ease),
        }),
        transformOrigin: "50% 90%",
      }}
    >
      <path d="M4 11V15C4 18.2998 4 19.9497 5.02513 20.9749C6.05025 22 7.70017 22 11 22H13C16.2998 22 17.9497 22 18.9749 20.9749C20 19.9497 20 18.2998 20 15V11" {...stroke} />
      <path d="M3 9C3 8.25231 3 7.87846 3.20096 7.6C3.33261 7.41758 3.52197 7.26609 3.75 7.16077C4.09808 7 4.56538 7 5.5 7H18.5C19.4346 7 19.9019 7 20.25 7.16077C20.478 7.26609 20.6674 7.41758 20.799 7.6C21 7.87846 21 8.25231 21 9C21 9.74769 21 10.1215 20.799 10.4C20.6674 10.5824 20.478 10.7339 20.25 10.8392C19.9019 11 19.4346 11 18.5 11H5.5C4.56538 11 4.09808 11 3.75 10.8392C3.52197 10.7339 3.33261 10.5824 3.20096 10.4C3 10.1215 3 9.74769 3 9Z" {...stroke} />
      <path
        d="M6 3.78571C6 2.79949 6.79949 2 7.78571 2H8.14286C10.2731 2 12 3.7269 12 5.85714V7H9.21429C7.43908 7 6 5.56091 6 3.78571Z"
        {...stroke}
        style={{
          rotate: interpolate(frame, frames(start + 2.4, 21, [0, 0.25, 0.5, 0.75, 1]), ["0deg", "10deg", "-6deg", "3deg", "0deg"], {
            ...clamp,
            easing: Easing.inOut(Easing.ease),
          }),
          transformBox: "fill-box",
          transformOrigin: "right bottom",
        }}
      />
      <path
        d="M18 3.78571C18 2.79949 17.2005 2 16.2143 2H15.8571C13.7269 2 12 3.7269 12 5.85714V7H14.7857C16.5609 7 18 5.56091 18 3.78571Z"
        {...stroke}
        style={{
          rotate: interpolate(frame, frames(start + 3.6, 21, [0, 0.25, 0.5, 0.75, 1]), ["0deg", "-10deg", "6deg", "-3deg", "0deg"], {
            ...clamp,
            easing: Easing.inOut(Easing.ease),
          }),
          transformBox: "fill-box",
          transformOrigin: "left bottom",
        }}
      />
      <path d="M12 11L12 22" {...stroke} />
    </svg>
  );
};

const GITHUB_TAIL_PATH = "M10 20.5675C8.28572 21.1462 6.71429 21.1462 5.35715 20.5556C4.00001 19.965 2.85715 18.7838 2 17";
const GITHUB_BODY_PATH = "M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22";

export const GithubShowcaseIcon: React.FC<ShowcaseIconProps> = ({delay = 0, size = 560}) => {
  const frame = useCurrentFrame() - delay;
  const input = frames(7, 21.6, [0, 0.18, 0.42, 0.64, 0.82, 1]);
  const translateY = interpolate(frame, input, [0, 0.9, -1.2, 0.4, -0.15, 0], clamp);
  const rotate = interpolate(frame, input, [0, 0, -2, 0.75, -0.2, 0], clamp);
  const scaleX = interpolate(frame, input, [1, 1.04, 0.97, 1.02, 0.995, 1], clamp);
  const scaleY = interpolate(frame, input, [1, 0.9, 1.08, 0.97, 1.01, 1], clamp);

  return (
    <svg fill="none" height={size} overflow="visible" viewBox="0 0 24 24" width={size}>
      <g
        style={{
          transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`,
          transformBox: "fill-box",
          transformOrigin: "13.5px 21px",
        }}
      >
        <path d={GITHUB_TAIL_PATH} {...stroke} />
        <path d={GITHUB_BODY_PATH} {...stroke} />
      </g>
    </svg>
  );
};

const ICONS: Record<ShowcaseIconKind, React.FC<ShowcaseIconProps>> = {
  airplane: AirplaneShowcaseIcon,
  alarm: AlarmShowcaseIcon,
  "arrow-up-right": ArrowUpRightShowcaseIcon,
  "cloud-rain": CloudRainShowcaseIcon,
  diamond: DiamondShowcaseIcon,
  gift: GiftShowcaseIcon,
  github: GithubShowcaseIcon,
  "magic-wand": MagicWandShowcaseIcon,
  notification: NotificationShowcaseIcon,
  play: PlayShowcaseIcon,
  refresh: RefreshShowcaseIcon,
  search: SearchShowcaseIcon,
  settings: SettingsShowcaseIcon,
};

export const AnimatedSourceIcon: React.FC<ShowcaseIconProps & {icon: ShowcaseIconKind}> = ({icon, ...props}) => {
  const Icon = ICONS[icon];
  return <Icon {...props} />;
};
