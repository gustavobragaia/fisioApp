import * as React from "react";
import Svg, {
  ClipPath,
  Defs,
  ForeignObject,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

function SvgComponent(props: any) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={40} height={40} rx={20} fill="#fff" fillOpacity={0.7} />
      <Rect
        x={0.5}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        stroke="url(#paint0_linear_35_440)"
        strokeOpacity={0.7}
      />
      <Path
        d="M28.5 23.55a6 6 0 01-6 6c-3.314 0-4.778-3.236-4.778-6.55 0-3.314 1.464-5.45 4.778-5.45a6 6 0 016 6z"
        fill="url(#paint1_linear_35_440)"
      />
      <ForeignObject
        x={-12.5}
        y={-15}
        width={61.7352}
        height={70.2105}
      ></ForeignObject>
      <Path
        data-figma-bg-blur-radius={25}
        d="M12.5 12.887A2.887 2.887 0 0115.387 10h5.96a2.887 2.887 0 012.888 2.887v14.436a2.887 2.887 0 01-2.887 2.887h-5.96a2.887 2.887 0 01-2.888-2.887V12.887z"
        fill="#EDEDED"
        fillOpacity={0.37}
      />
      <Path
        d="M17.064 14.564a1.304 1.304 0 11-2.608 0 1.304 1.304 0 012.608 0zM21.627 14.564a1.304 1.304 0 11-2.608 0 1.304 1.304 0 012.608 0zM17.064 19.78a1.304 1.304 0 11-2.608 0 1.304 1.304 0 012.608 0zM21.627 19.78a1.304 1.304 0 11-2.608 0 1.304 1.304 0 012.608 0zM17.064 24.995a1.304 1.304 0 11-2.608 0 1.304 1.304 0 012.608 0zM21.627 24.995a1.304 1.304 0 11-2.608 0 1.304 1.304 0 012.608 0z"
        fill="#fff"
      />
      <Defs>
        <ClipPath id="bgblur_0_35_440_clip_path">
          <G transform="translate(12.5, 15)">
            <Path d="M12.5 12.887A2.887 2.887 0 0115.387 10h5.96a2.887 2.887 0 012.888 2.887v14.436a2.887 2.887 0 01-2.887 2.887h-5.96a2.887 2.887 0 01-2.888-2.887V12.887z" />
          </G>
        </ClipPath>
        <LinearGradient
          id="paint0_linear_35_440"
          x1={31}
          y1={3}
          x2={7}
          y2={34.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.2} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_35_440"
          x1={17.7222}
          y1={23.1509}
          x2={28.2418}
          y2={23.1931}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#AE86FF" />
          <Stop offset={1} stopColor="#7363FE" stopOpacity={0.65} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
