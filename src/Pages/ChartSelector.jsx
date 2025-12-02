import { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";

// 🧵 custom charts (your own SVG ones)
import LollipopChart from "../charts/CustomLollipopChart";
import HeatStripChart from "../charts/HeatStripChart";

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 70 },
  { name: "May", value: 50 }
];

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#7c3aed"];

export default function ChartSelector() {
  const [chartType, setChartType] = useState("bar");

  return (
    <div style={{ width: "650px", margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 8 }}>Choose Chart</h2>

      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
        style={{ padding: 8, marginBottom: 20, minWidth: 260 }}
      >
        <option value="bar">Bar Chart (Recharts)</option>
        <option value="line">Line Chart (Recharts)</option>
        <option value="pie">Pie Chart (Recharts)</option>
        <option value="lollipop">Lollipop Chart (Custom)</option>
        <option value="heat">Heat Strip Chart (Custom)</option>
      </select>

      {/* Recharts: Bar */}
      {chartType === "bar" && (
        <BarChart width={550} height={320} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Value" fill="#2563eb" />
        </BarChart>
      )}

      {/* Recharts: Line */}
      {chartType === "line" && (
        <LineChart width={550} height={320} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Value"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      )}

      {/* Recharts: Pie */}
      {chartType === "pie" && (
        <PieChart width={550} height={320}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}

      {/* Custom: Lollipop */}
      {chartType === "lollipop" && (
        <LollipopChart data={data} width={550} height={320} />
      )}

      {/* Custom: Heat Strip */}
      {chartType === "heat" && (
        <HeatStripChart data={data} width={550} height={320} />
      )}
    </div>
  );
}
