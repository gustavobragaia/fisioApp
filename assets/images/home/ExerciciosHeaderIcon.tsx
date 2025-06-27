import * as React from "react"
import Svg, {
  Circle,
  ClipPath,
  Defs,
  ForeignObject,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop
} from "react-native-svg"

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
        stroke="url(#paint0_linear_34_428)"
        strokeOpacity={0.7}
      />
      <Circle cx={19.5} cy={21} r={9.00001} fill="url(#paint1_linear_34_428)" />
      <ForeignObject
        x={-4.49951}
        y={-15}
        width={60}
        height={60}
      ></ForeignObject>
      <Path
        data-figma-bg-blur-radius={25}
        d="M30.5 20a10 10 0 00-10-10v10h10z"
        fill="#fff"
        fillOpacity={0.5}
      />
      <Defs>
        <ClipPath id="bgblur_0_34_428_clip_path">
          <G transform="translate(4.5 15)">
            <Path d="M30.5 20a10 10 0 00-10-10v10h10z" />
          </G>
        </ClipPath>
        <LinearGradient
          id="paint0_linear_34_428"
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
          id="paint1_linear_34_428"
          x1={10.5}
          y1={20.4}
          x2={28.0686}
          y2={20.4784}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#47C2FF" />
          <Stop offset={1} stopColor="#63CBFE" stopOpacity={0.65} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
