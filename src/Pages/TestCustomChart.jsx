// src/TestCustomChart.jsx
import React, { useState } from "react";
import CustomLollipopChart from "../charts/CustomLollipopChart";

const initialData = [
  { label: "A", value: 10 },
  { label: "B", value: 25 },
  { label: "C", value: 15 },
  { label: "D", value: 30 },
];

export default function TestCustomChart() {
  const [data, setData] = useState(initialData);

  const randomize = () => {
    setData((prev) =>
      prev.map((d) => ({
        ...d,
        value: Math.floor(Math.random() * 40) + 1,
      }))
    );
  };

  const handleChange = (index, field, value) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "value" ? Number(value) || 0 : value,
            }
          : item
      )
    );
  };

  const addPoint = () => {
    setData((prev) => [
      ...prev,
      { label: `L${prev.length + 1}`, value: 10 },
    ]);
  };

  const removePoint = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

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
      <h2 style={{ marginBottom: 8 }}>Test Custom Lollipop Chart</h2>
      <p style={{ marginBottom: 16, fontSize: 14, color: "#6b7280" }}>
        Edit the data below or randomize it. The custom SVG chart updates instantly.
      </p>

      {/* Data table */}
      <div style={{ marginBottom: 20 }}>
        {data.map((row, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 6,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={row.label}
              onChange={(e) => handleChange(idx, "label", e.target.value)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #d1d5db",
                width: 80,
              }}
              placeholder="Label"
            />
            <input
              type="number"
              value={row.value}
              onChange={(e) => handleChange(idx, "value", e.target.value)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "1px solid #d1d5db",
                width: 80,
              }}
              placeholder="Value"
            />
            <button
              onClick={() => removePoint(idx)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #ef4444",
                background: "#fee2e2",
                color: "#b91c1c",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ))}

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button
            onClick={addPoint}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #16a34a",
              background: "#16a34a",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Add point
          </button>
          <button
            onClick={randomize}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #2563eb",
              background: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Randomize values
          </button>
        </div>
      </div>

      {/* Chart area */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          padding: 12,
        }}
      >
        <CustomLollipopChart data={data} width={600} height={260} />
      </div>
    </div>
  );
}
