// src/ccharts/HeatStripChart.jsx
// Custom Heat Strip Chart (pure SVG, not from Recharts)

export default function HeatStripChart({ data, width = 500, height = 300 }) {
  if (!data || data.length === 0) return <div>No data</div>;

  const margin = { top: 20, right: 20, bottom: 50, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const maxValue = Math.max(...data.map((d) => d.value || 0), 1);
  const barWidth = innerWidth / data.length;

  // map value → color (light → dark blue)
  const getColorForValue = (v) => {
    const t = v / maxValue; // 0 → 1
    const r = Math.round(219 - 60 * t); // 219 → ~159
    const g = Math.round(234 - 90 * t); // 234 → ~144
    const b = Math.round(254 - 140 * t); // 254 → ~114
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <svg width={width} height={height}>
      {/* background */}
      <rect width="100%" height="100%" fill="white" rx="12" />

      {/* title & max */}
      <text
        x={width / 2}
        y={margin.top}
        textAnchor="middle"
        fontSize="13"
        fill="#6b7280"
      >
        Heat Strip Chart (Custom)
      </text>
      <text
        x={width - margin.right}
        y={margin.top + 14}
        textAnchor="end"
        fontSize="10"
        fill="#9ca3af"
      >
        max: {maxValue}
      </text>

      {/* strips */}
      {data.map((d, i) => {
        const x = margin.left + i * barWidth;
        const color = getColorForValue(d.value || 0);

        return (
          <g key={d.name}>
            {/* colored bar */}
            <rect
              x={x}
              y={margin.top + 20}
              width={barWidth - 4}
              height={innerHeight - 40}
              rx={6}
              fill={color}
            />
            {/* value in middle */}
            <text
              x={x + (barWidth - 4) / 2}
              y={margin.top + innerHeight / 2}
              textAnchor="middle"
              fontSize="12"
              fill="#111827"
            >
              {d.value}
            </text>
            {/* label under bar */}
            <text
              x={x + (barWidth - 4) / 2}
              y={margin.top + innerHeight + 15}
              textAnchor="middle"
              fontSize="11"
              fill="#4b5563"
            >
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
