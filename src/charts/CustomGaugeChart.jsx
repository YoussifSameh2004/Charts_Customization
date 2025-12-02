// your own SVG chart

// src/charts/CustomGaugeChart.jsx
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = degToRad(angleDeg);
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

/**
 * Custom gauge chart (no Recharts).
 * props:
 *  - value: number
 *  - min: number
 *  - max: number
 *  - label: string
 */
export default function CustomGaugeChart({
  value = 65,
  min = 0,
  max = 100,
  label = "Value",
}) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2 + 20;
  const radius = 80;
  const startAngle = 180;
  const endAngle = 0;

  const v = Math.min(Math.max(value, min), max);
  const ratio = (v - min) / (max - min);
  const needleAngle = startAngle + (endAngle - startAngle) * ratio;

  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const arcPath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
  `;

  const needle = polarToCartesian(cx, cy, radius - 10, needleAngle);

  return (
    <svg width={size} height={size}>
      {/* background */}
      <rect width="100%" height="100%" fill="white" rx="16" />

      {/* grey arc */}
      <path d={arcPath} stroke="#e5e7eb" strokeWidth="14" fill="none" />

      {/* blue progress */}
      <path
        d={arcPath}
        stroke="#2563eb"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="220"
        strokeDashoffset={220 * (1 - ratio)}
      />

      {/* needle */}
      <line
        x1={cx}
        y1={cy}
        x2={needle.x}
        y2={needle.y}
        stroke="#111827"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="#111827" />

      {/* texts */}
      <text
        x={cx}
        y={cy + 30}
        textAnchor="middle"
        fontSize="18"
        fill="#111827"
      >
        {v}
      </text>
      <text
        x={cx}
        y={cy + 50}
        textAnchor="middle"
        fontSize="12"
        fill="#6b7280"
      >
        {label} / {max}
      </text>
    </svg>
  );
}
