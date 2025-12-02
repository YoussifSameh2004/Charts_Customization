// main page with selector

// src/ChartPlayground.jsx
import { useState } from "react";
import { chartRegistry, getChartById } from "./chartRegistry";

// simple sample data (you can replace later)
const sampleData = [
  { name: "A", value1: 10, value2: 6 },
  { name: "B", value1: 15, value2: 9 },
  { name: "C", value1: 8, value2: 12 },
  { name: "D", value1: 20, value2: 5 },
  { name: "E", value1: 18, value2: 14 },
];

export default function ChartPlayground() {
  const [selectedChartId, setSelectedChartId] = useState("bar");

  const chartDef = getChartById(selectedChartId);
  const ChartComponent = chartDef.Component;

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
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <h2 style={{ marginBottom: 4 }}>Custom Chart Playground</h2>
      <p style={{ marginBottom: 16, fontSize: 14, color: "#6b7280" }}>
        Pick any chart (Recharts or your own SVG) and visualize the same data.
      </p>

      {/* chart selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {chartRegistry.map((chart) => (
          <button
            key={chart.id}
            onClick={() => setSelectedChartId(chart.id)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #d1d5db",
              fontSize: 13,
              cursor: "pointer",
              background:
                selectedChartId === chart.id ? "#2563eb" : "#ffffff",
              color: selectedChartId === chart.id ? "#ffffff" : "#111827",
              fontWeight: selectedChartId === chart.id ? 600 : 400,
            }}
          >
            {chart.label}
          </button>
        ))}
      </div>

      {/* chart area */}
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
        {selectedChartId === "gauge" ? (
          // gauge uses single value (you can choose how you map data)
          <ChartComponent
            value={72}                 // for example: computed from data
            {...chartDef.defaultConfig}
          />
        ) : (
          // normal charts that use data array
          <ChartComponent
            data={sampleData}
            {...chartDef.defaultConfig}
          />
        )}
      </div>
    </div>
  );
}
