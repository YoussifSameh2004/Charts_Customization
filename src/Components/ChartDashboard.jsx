import { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  ScatterChart, Scatter, XAxis, YAxis, ZAxis,
  CartesianGrid, Tooltip, Legend
} from "recharts";

// Simple sample data (you can replace with real data later)
const monthlyData = [
  { name: "Jan", valueA: 40, valueB: 24 },
  { name: "Feb", valueA: 30, valueB: 13 },
  { name: "Mar", valueA: 20, valueB: 98 },
  { name: "Apr", valueA: 27, valueB: 39 },
  { name: "May", valueA: 18, valueB: 48 },
  { name: "Jun", valueA: 23, valueB: 38 },
];

const pieData = [
  { name: "CS", value: 35 },
  { name: "IS", value: 25 },
  { name: "DS", value: 20 },
  { name: "AI", value: 20 },
];

const scatterData = [
  { x: 10, y: 30, z: 200 },
  { x: 20, y: 50, z: 260 },
  { x: 30, y: 45, z: 280 },
  { x: 40, y: 70, z: 200 },
  { x: 50, y: 60, z: 250 },
];

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626", "#7c3aed"];

const chartOptions = [
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "area", label: "Area Chart" },
  { value: "pie", label: "Pie Chart" },
  { value: "radar", label: "Radar Chart" },
  { value: "radialBar", label: "Radial Bar Chart" },
  { value: "scatter", label: "Scatter Chart" },
];

export default function ChartDashboard() {
  const [chartType, setChartType] = useState("bar");

  const commonSize = { width: 600, height: 320 };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        padding: 24,
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
        background: "#ffffff",
      }}
    >
      <h2 style={{ marginBottom: 8 }}>Analytics Charts</h2>
      <p style={{ marginBottom: 16, color: "#6b7280", fontSize: 14 }}>
        Choose a chart type to visualize the sample data.
      </p>

      {/* Chart selector */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 8, fontSize: 14 }}>Chart type:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
            fontSize: 14,
          }}
        >
          {chartOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart container */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          background: "#f9fafb",
          overflowX: "auto",
        }}
      >
        {chartType === "bar" && (
          <BarChart {...commonSize} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valueA" fill="#2563eb" name="Registered Students" />
            <Bar dataKey="valueB" fill="#f97316" name="Graduated Students" />
          </BarChart>
        )}

        {chartType === "line" && (
          <LineChart {...commonSize} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="valueA"
              stroke="#2563eb"
              strokeWidth={3}
              name="Requests"
            />
            <Line
              type="monotone"
              dataKey="valueB"
              stroke="#16a34a"
              strokeWidth={3}
              name="Approved"
            />
          </LineChart>
        )}

        {chartType === "area" && (
          <AreaChart {...commonSize} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="valueA"
              name="Attendance"
              stroke="#2563eb"
              fill="#bfdbfe"
            />
            <Area
              type="monotone"
              dataKey="valueB"
              name="Absence"
              stroke="#f97316"
              fill="#fed7aa"
            />
          </AreaChart>
        )}

        {chartType === "pie" && (
          <PieChart {...commonSize}>
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
        )}

        {chartType === "radar" && (
          <RadarChart
            outerRadius={120}
            width={commonSize.width}
            height={commonSize.height}
            data={pieData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="Department Load"
              dataKey="value"
              stroke="#2563eb"
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        )}

        {chartType === "radialBar" && (
          <RadialBarChart
            width={commonSize.width}
            height={commonSize.height}
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={18}
            data={pieData}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
            >
              {pieData.map((entry, index) => (
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
        )}

        {chartType === "scatter" && (
          <ScatterChart
            width={commonSize.width}
            height={commonSize.height}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="GPA" />
            <YAxis type="number" dataKey="y" name="Hours Studied" />
            <ZAxis type="number" dataKey="z" name="Students" range={[60, 400]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="Students" data={scatterData} fill="#2563eb" />
          </ScatterChart>
        )}
      </div>
    </div>
  );
}
