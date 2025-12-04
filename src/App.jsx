// import ChartSelector from "../src/Pages/ChartSelector";

// function App() {
//   return (
//     <div>
//       <ChartSelector />
//     </div>
//   );
// }

// export default App;


// import ChartDashboard from "../src/Components/ChartDashboard";

// function App() {
//   return (
//     <div>
//       <ChartDashboard />
//     </div>
//   );
// }

// export default App;


// import ChartPlayground from "../src/Pages/ChartPlayground";

// function App() {
//   return (
//     <div>
//       <ChartPlayground />
//     </div>
//   );
// }

// export default App;

// App.jsx
// import GaugeChart from "../src/Pages/GaugeChart";

// function App() {
//   return (
//     <div style={{ padding: 40 }}>
//       <h2>Custom Gauge Chart</h2>
//       <GaugeChart value={72} min={0} max={100} />
//     </div>
//   );
// }

// export default App;

// src/App.jsx
// import ChartPlayground from "./ChartPlayground";

// export default function App() {
//   return <ChartPlayground />;
// }

// import TestCustomChart from "../src/Pages/TestCustomChart";

// export default function App() {
//   return <TestCustomChart />;
// }

// App.jsx
// import RadialInfographic from "./Components/Dynamic RadialInfographic";

// function App() {
//   return (
//     <div>
//       <RadialInfographic />
//     </div>
//   );
// }

// export default App;


// import Chart3 from "../src/Components/Chart3";
// function App() {
//   return (
//     <div>
//       <Chart3 />
//     </div>
//   );
// }
// export default App;

import React from "react";
import Chart3 from "../src/Components/Chart3";

function App() {
  const steps = [
    {
      title: "Collect Requirements",
      text: "Talk to stakeholders, understand constraints and success metrics.",
      
    },
    {
      title: "Collect Requirements",
      text: "Talk to stakeholders, understand constraints and success metrics.",
      
    },
    // {
    //   title: "Collect Requirements",
    //   text: "Talk to stakeholders, understand constraints and success metrics.",
      
    // },
    // {
    //   title: "Collect Requirements",
    //   text: "Talk to stakeholders, understand constraints and success metrics.",
      
    // },
    // {
    //   title: "Collect Requirements",
    //   text: "Talk to stakeholders, understand constraints and success metrics.",
      
    // },
    {
      title: "Collect Requirements",
      text: "Talk to stakeholders, understand constraints and success metrics.",
      
    },
    {
      title: "Collect Requirements",
      text: "Talk to stakeholders, understand constraints and success metrics.",
      
    },
    {
      title: "Design Solution",
      text: "Sketch flows, chjhhhhhhhwgggsgsgsggggggggggghhhhhhjjjj",
    },
    {
      title: "Implement & Test",
      text: "Build iteratively, write tests, run code reviews.",
      
    },
    {
      title: "Deploy & Monitor",
      text: "Deploy, monitor KPIs, gather feedback for improvements.",
      
    },
  ];

  return (
    <div style={{ padding: 40 }}>
      <Chart3 items={steps} />
    </div>
  );
}

export default App;
