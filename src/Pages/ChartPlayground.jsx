import { useState } from "react";
import {
  // cartesian / common
  AreaChart, Area,
  BarChart, Bar,
  LineChart, Line,
  ComposedChart,
  ScatterChart, Scatter,
  XAxis, YAxis, ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,

  // pie / polar
  PieChart, Pie, Cell,
  RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,

  // radial
  RadialBarChart, RadialBar,

  // advanced
  FunnelChart, Funnel, LabelList,
  Treemap,
  Sankey,
} from "recharts";

// ---------- SAMPLE DATA ----------

// Simple XY data for line / bar / area / composed
const xyData = [
  { name: "A", uv: 400, pv: 240, amt: 240 },
  { name: "B", uv: 300, pv: 139, amt: 221 },
  { name: "C", uv: 200, pv: 980, amt: 229 },
  { name: "D", uv: 278, pv: 390, amt: 200 },
  { name: "E", uv: 189, pv: 480, amt: 218 },
  { name: "F", uv: 239, pv: 380, amt: 250 },
];

// Pie / radar / radial data
const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const radialData = [
  { name: "18-24", value: 31 },
  { name: "25-34", value: 26 },
  { name: "35-44", value: 20 },
  { name: "45-54", value: 14 },
  { name: "55+",   value: 9  },
];

// Scatter data
const scatterData = [
  { x: 10, y: 20, z: 200 },
  { x: 20, y: 30, z: 180 },
  { x: 30, y: 25, z: 220 },
  { x: 40, y: 35, z: 260 },
  { x: 50, y: 30, z: 240 },
];

// Funnel data
const funnelData = [
  { name: "Visited", value: 1200 },
  { name: "Signed Up", value: 900 },
  { name: "Activated", value: 600 },
  { name: "Paid", value: 300 },
];

// Treemap data (hierarchical)
const treemapData = [
  {
    name: "Root",
    children: [
      { name: "A", size: 400 },
      { name: "B", size: 300 },
      {
        name: "C",
        children: [
          { name: "C1", size: 100 },
          { name: "C2", size: 80 },
        ],
      },
    ],
  },
];

// Sankey data
const sankeyData = {
  nodes: [
    { name: "Source 1" },
    { name: "Source 2" },
    { name: "Stage 1" },
    { name: "Stage 2" },
  ],
  links: [
    { source: 0, target: 2, value: 30 },
    { source: 1, target: 2, value: 15 },
    { source: 2, target: 3, value: 35 },
  ],
};

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#7c3aed"];

// For buttons
const chartOptions = [
  { value: "line",      label: "LineChart" },
  { value: "area",      label: "AreaChart" },
  { value: "bar",       label: "BarChart" },
  { value: "composed",  label: "ComposedChart" },
  { value: "pie",       label: "PieChart" },
  { value: "radar",     label: "RadarChart" },
  { value: "radialBar", label: "RadialBarChart" },
  { value: "scatter",   label: "ScatterChart" },
  { value: "funnel",    label: "FunnelChart" },
  { value: "treemap",   label: "Treemap" },
  { value: "sankey",    label: "Sankey" },
];

export default function ChartPlayground() {
  const [chartType, setChartType] = useState("line");

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 24,
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(15,23,42,0.12)",
        background: "#ffffff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 4 }}>Recharts – All Chart Types Demo</h2>
      <p style={{ marginBottom: 16, fontSize: 14, color: "#6b7280" }}>
        Click a button to switch between chart types using the same simple data.
      </p>

      {/* Buttons to choose chart */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {chartOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setChartType(opt.value)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #d1d5db",
              fontSize: 13,
              cursor: "pointer",
              background: chartType === opt.value ? "#2563eb" : "#ffffff",
              color: chartType === opt.value ? "#ffffff" : "#111827",
              fontWeight: chartType === opt.value ? 600 : 400,
              transition: "background 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Chart container */}
      <div
        style={{
          width: "100%",
          height: 360,
          padding: 16,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        {/* LINE */}
        {chartType === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={xyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uv" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="pv" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {/* AREA */}
        {chartType === "area" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={xyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="uv" stroke="#2563eb" fill="#bfdbfe" />
              <Area type="monotone" dataKey="pv" stroke="#f97316" fill="#fed7aa" />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* BAR */}
        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={xyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" name="UV" fill="#2563eb" />
              <Bar dataKey="pv" name="PV" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* COMPOSED */}
        {chartType === "composed" && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={xyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amt" fill="#e5e7eb" stroke="#9ca3af" />
              <Bar dataKey="pv" barSize={20} fill="#2563eb" />
              <Line type="monotone" dataKey="uv" stroke="#16a34a" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {/* PIE */}
        {chartType === "pie" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* RADAR */}
        {chartType === "radar" && (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radialData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                name="Value"
                dataKey="value"
                stroke="#2563eb"
                fill="#93c5fd"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}

        {/* RADIAL BAR */}
        {chartType === "radialBar" && (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="20%"
              outerRadius="90%"
              data={radialData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
              >
                {radialData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </RadialBar>
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        )}

        {/* SCATTER */}
        {chartType === "scatter" && (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <ZAxis type="number" dataKey="z" range={[60, 400]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Points" data={scatterData} fill="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        )}

        {/* FUNNEL */}
        {chartType === "funnel" && (
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
              >
                <LabelList
                  position="right"
                  fill="#111827"
                  stroke="none"
                  dataKey="name"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        )}

        {/* TREEMAP */}
        {chartType === "treemap" && (
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="size"
              nameKey="name"
              aspectRatio={4 / 3}
              stroke="#ffffff"
            />
          </ResponsiveContainer>
        )}

        {/* SANKEY */}
        {chartType === "sankey" && (
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={sankeyData}
              nodePadding={40}
              margin={{ left: 40, right: 40, top: 20, bottom: 20 }}
            >
              <Tooltip />
            </Sankey>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
