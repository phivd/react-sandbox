// Inspired by https://codesandbox.io/p/sandbox/assignment-121-animate-checkmark-solution-jggkm
import { motion, useTransform } from "framer-motion"

function CircularProgress({ progress, mark }: any) {
  const circleLength = useTransform(progress, [0, 100], [0, 1])
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
  var color = "#FFFFFF";
  if (mark == 'check') {
    color = "#66BB66"
  } else if (mark == 'cross') {
    color = "#C24343";
  }
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#FFCC66", "#FFCC66", color]
)    

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 258 258"
    >
      {/* Check mark  */}
      {mark == 'check' && (
        <motion.path
            transform="translate(60 85)"
            d="M3 50L45 92L134 3"
            fill="transparent"
            stroke="#7BB86F"
            strokeWidth={8}
            style={{ pathLength: checkmarkPathLength }}
        />
      )}
      {/* Cross mark  */}
      {mark == 'cross' && (
        <motion.path
            transform="translate(60 85)"
            d="M15 0 
            L125 90
            M 125 0
            L15 90"
            fill="transparent"
            stroke="#C24343"
            strokeWidth={8}
            style={{ pathLength: checkmarkPathLength }}
        />
      )}
      {/* Circle */}
      <motion.path
        d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
        fill="transparent"
        strokeWidth="8"
        stroke={circleColor}
        style={{
          pathLength: circleLength
        }}
      />
    </motion.svg>
  )
}

export default CircularProgress;