// GaugeChart.jsx
import React from "react";

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

export default function GaugeChart({ value = 65, min = 0, max = 100 }) {
  const size = 200;          // SVG size
  const cx = size / 2;
  const cy = size / 2;
  const radius = 80;
  const startAngle = 180;    // left
  const endAngle = 0;        // right

  // clamp value
  const v = Math.min(Math.max(value, min), max);
  const ratio = (v - min) / (max - min);
  const needleAngle = startAngle + (endAngle - startAngle) * ratio;

  // arc endpoints (semi-circle)
  const start = polarToCartesian(cx, cy, radius, startAngle);
  const end = polarToCartesian(cx, cy, radius, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  const arcPath = `
    M ${start.x} ${start.y}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
  `;

  // needle end
  const needle = polarToCartesian(cx, cy, radius - 10, needleAngle);

  return (
    <svg width={size} height={size / 1.1}>
      {/* background */}
      <rect width="100%" height="100%" fill="white" rx="16" />

      {/* semi-circle arc */}
      <path d={arcPath} stroke="#e5e7eb" strokeWidth="16" fill="none" />

      {/* colored progress (same path but shorten using strokeDasharray) */}
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

      {/* center circle */}
      <circle cx={cx} cy={cy} r="5" fill="#111827" />

      {/* value text */}
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
        / {max}
      </text>
    </svg>
  );
}
