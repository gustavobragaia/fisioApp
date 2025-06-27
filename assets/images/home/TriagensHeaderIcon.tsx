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
      width={41}
      height={40}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={0.5}
        width={40}
        height={40}
        rx={20}
        fill="#fff"
        fillOpacity={0.7}
      />
      <Rect
        x={1}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        stroke="url(#paint0_linear_1_725)"
        strokeOpacity={0.7}
      />
      <Path
        d="M28.615 14.415A4.86 4.86 0 0025.179 13a4.884 4.884 0 00-3.435 1.415l-.937.93-.936-.93A4.874 4.874 0 0016.436 13 4.874 4.874 0 0013 14.415a4.812 4.812 0 00-1.423 3.413c0 1.28.512 2.509 1.423 3.414l.936.93L20.807 29l6.872-6.828.936-.93a4.824 4.824 0 001.423-3.414 4.8 4.8 0 00-1.423-3.413z"
        fill="url(#paint1_linear_1_725)"
      />
      <ForeignObject
        x={-16.5}
        y={-8.30756}
        width={74}
        height={58}
      ></ForeignObject>
      <Path
        data-figma-bg-blur-radius={25}
        d="M18.5 24.692a.998.998 0 01-.865-.5l-1.705-3.064-1.09 1.634a1 1 0 01-.84.43H9.5a1 1 0 010-2h3.965l1.705-2.554a1 1 0 011.705.07l1.625 2.985 2.615-4.5a1 1 0 01.885-.5 1 1 0 01.86.5l2.395 4 1-.79a1 1 0 01.62-.21H31.5a1 1 0 010 2h-4.275L25.6 23.476a1 1 0 01-1.5-.27L22 19.663l-2.635 4.53a1 1 0 01-.865.5z"
        fill="#fff"
        fillOpacity={0.2}
      />
      <Defs>
        <ClipPath
          id="bgblur_0_1_725_clip_path"
        >
          <G transform="translate(16.5 8.308)" G>
            <Path d="M18.5 24.692a.998.998 0 01-.865-.5l-1.705-3.064-1.09 1.634a1 1 0 01-.84.43H9.5a1 1 0 010-2h3.965l1.705-2.554a1 1 0 011.705.07l1.625 2.985 2.615-4.5a1 1 0 01.885-.5 1 1 0 01.86.5l2.395 4 1-.79a1 1 0 01.62-.21H31.5a1 1 0 010 2h-4.275L25.6 23.476a1 1 0 01-1.5-.27L22 19.663l-2.635 4.53a1 1 0 01-.865.5z" />
          </G>
        </ClipPath>
        <LinearGradient
          id="paint0_linear_1_725"
          x1={31.5}
          y1={3}
          x2={7.5}
          y2={34.5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.2} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1_725"
          x1={11.5768}
          y1={20.4667}
          x2={29.5957}
          y2={20.5594}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF7070" />
          <Stop offset={1} stopColor="#FF7070" stopOpacity={0.65} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
