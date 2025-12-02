// central map of all charts


// src/chartRegistry.js
import BarChartRecharts from "./charts/BarChartRecharts";
import CustomGaugeChart from "./charts/CustomGaugeChart";

/**
 * Each chart has:
 *  - id
 *  - label
 *  - Component
 *  - defaultConfig: what props to pass if user doesn’t override
 */
export const chartRegistry = [
  {
    id: "bar",
    label: "Bar (Recharts)",
    Component: BarChartRecharts,
    defaultConfig: {
      xKey: "name",
      yKeys: ["value1", "value2"],
    },
  },
  {
    id: "gauge",
    label: "Custom Gauge",
    Component: CustomGaugeChart,
    defaultConfig: {
      min: 0,
      max: 100,
      label: "Score",
      // we’ll pass value separately
    },
  },
  // 👉 add more custom charts here later
];

// helpful function
export function getChartById(id) {
  return chartRegistry.find((c) => c.id === id);
}
