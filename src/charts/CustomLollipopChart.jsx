// src/charts/CustomLollipopChart.jsx
import React from "react";

/**
 * Custom Lollipop Chart (pure SVG, no Recharts)
 *
 * props:
 *  - data: [{ label: string, value: number }]
 *  - width?: number
 *  - height?: number
 *  - maxValue?: number (optional, otherwise computed from data)
 */
export default function CustomLollipopChart({
  data = [],
  width = 500,
  height = 260,
  maxValue,
}) {
  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  const margin = { top: 20, right: 20, bottom: 60, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const max = maxValue ?? Math.max(...data.map((d) => d.value || 0), 1);

  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : 0;

  const getX = (index) => margin.left + index * stepX;
  const getY = (value) =>
    margin.top + innerHeight - (value / max) * innerHeight;

  const baselineY = margin.top + innerHeight;

  return (
    <svg width={width} height={height}>
      {/* Background */}
      <rect width="100%" height="100%" fill="white" rx="12" />

      {/* Baseline */}
      <line
        x1={margin.left}
        y1={baselineY}
        x2={margin.left + innerWidth}
        y2={baselineY}
        stroke="#d1d5db"
        strokeWidth="2"
      />

      {/* Y axis ticks (simple 0, mid, max) */}
      {[0, 0.5, 1].map((t, i) => {
        const v = Math.round(max * t);
        const y = getY(v);
        return (
          <g key={i}>
            <line
              x1={margin.left - 5}
              y1={y}
              x2={margin.left}
              y2={y}
              stroke="#9ca3af"
              strokeWidth="1"
            />
            <text
              x={margin.left - 8}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="#6b7280"
            >
              {v}
            </text>
          </g>
        );
      })}

      {/* Lollipops */}
      {data.map((d, i) => {
        const x = getX(i);
        const y = getY(d.value || 0);
        return (
          <g key={i}>
            {/* Stem */}
            <line
              x1={x}
              y1={baselineY}
              x2={x}
              y2={y}
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Circle */}
            <circle
              cx={x}
              cy={y}
              r={7}
              fill="#ffffff"
              stroke="#2563eb"
              strokeWidth="3"
            />

            {/* Value text above */}
            <text
              x={x}
              y={y - 10}
              textAnchor="middle"
              fontSize="11"
              fill="#111827"
            >
              {d.value}
            </text>

            {/* Label text below */}
            <text
              x={x}
              y={baselineY + 18}
              textAnchor="middle"
              fontSize="11"
              fill="#4b5563"
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* Title (optional, you can remove) */}
      <text
        x={width / 2}
        y={margin.top}
        textAnchor="middle"
        fontSize="13"
        fill="#6b7280"
      >
        Custom Lollipop Chart
      </text>
    </svg>
  );
}
