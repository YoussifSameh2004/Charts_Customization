// normal chart using Recharts

// src/charts/BarChartRecharts.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Generic bar chart using Recharts.
 * props:
 *  - data: array of objects
 *  - xKey: string (field for x axis)
 *  - yKeys: array of strings (fields for bars)
 */
export default function BarChartRecharts({ data, xKey, yKeys }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {yKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            name={key}
            // simple color palette
            fill={["#2563eb", "#16a34a", "#f97316", "#dc2626"][i % 4]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
