import { useEffect, useRef } from "react";
import * as d3 from "d3";

const COLORS = [
  "#f97316", "#facc15", "#22c55e", "#0ea5e9", "#3b82f6",
  "#2563eb", "#9333ea", "#dc2626", "#14b8a6", "#ec4899",
];

const DEFAULT_ITEMS = [
  // { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "👤" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "🏠" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💲" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💡" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💻" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💼" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "📱" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "✉️" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💲" },
  { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💡" },
  // { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💻" },
  // { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "💼" },
  // { title: "LOREM", text: "Lorem ipsum dolor sit amet.", icon: "📱" },
];

export default function RadialInfographic({ items = DEFAULT_ITEMS }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const N = items.length;
    const SIZE = 800;
    const CENTER = SIZE / 2;

    // ---- dynamic node radius so circles don’t overlap ----
    const MAX_NODE_RADIUS = 90;
    const MIN_NODE_RADIUS = 45;
    const baseRadius = SIZE / 2 - 150;
    const approxPerNode = (2 * Math.PI * baseRadius) / N;
    let nodeR = Math.min(MAX_NODE_RADIUS, approxPerNode / 2.3);
    nodeR = Math.max(MIN_NODE_RADIUS, nodeR);

    const OUTER_RADIUS = SIZE / 2 - nodeR - 40;
    const angleStep = (2 * Math.PI) / N;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${SIZE} ${SIZE}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto");

    svg.selectAll("*").remove();

    /* ------------------------------------------------------------------ */
    /* 1) PRECOMPUTE NODE POSITIONS (for bar placement)                    */
    /* ------------------------------------------------------------------ */
    const nodes = items.map((item, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = CENTER + OUTER_RADIUS * Math.cos(angle);
      const y = CENTER + OUTER_RADIUS * Math.sin(angle);
      return { x, y, angle, item, color: COLORS[i % COLORS.length] };
    });

    const minX = d3.min(nodes, (d) => d.x) ?? CENTER;
    const maxX = d3.max(nodes, (d) => d.x) ?? CENTER;
    const maxY = d3.max(nodes, (d) => d.y) ?? CENTER;

    // horizontal bar should be a bit wider & below all circles
    const barPaddingX = nodeR + 40;
    const barHeight = 12;

    const barX1 = Math.max(40, minX - barPaddingX);
    const barX2 = Math.min(SIZE - 40, maxX + barPaddingX);
    const barWidth = barX2 - barX1;

    const barY = maxY + nodeR + 35; // distance under the lowest circle

    /* ------------------------------------------------------------------ */
    /* 2) CENTER PIECE (same as before)                                   */
    /* ------------------------------------------------------------------ */

    // outer soft circle
    svg.append("circle")
      .attr("cx", CENTER)
      .attr("cy", CENTER)
      .attr("r", 175)
      .attr("fill", "#f3f4f6");

    // middle gray ring
    svg.append("circle")
      .attr("cx", CENTER)
      .attr("cy", CENTER)
      .attr("r", 150)
      .attr("fill", "#e5e7eb");

    // inner white disc
    svg.append("circle")
      .attr("cx", CENTER)
      .attr("cy", CENTER)
      .attr("r", 115)
      .attr("fill", "white")
      .attr("stroke", "#d1d5db")
      .attr("stroke-width", 3);

    // colored ticks
    const tickRadiusOuter = 150;
    const tickRadiusInner = 135;
    nodes.forEach((d, i) => {
      const a = d.angle;
      const x1 = CENTER + tickRadiusInner * Math.cos(a);
      const y1 = CENTER + tickRadiusInner * Math.sin(a);
      const x2 = CENTER + tickRadiusOuter * Math.cos(a);
      const y2 = CENTER + tickRadiusOuter * Math.sin(a);

      svg.append("line")
        .attr("x1", x1)
        .attr("y1", y1)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", COLORS[i % COLORS.length])
        .attr("stroke-width", 6)
        .attr("stroke-linecap", "round");
    });

    // center text
    svg.append("text")
      .attr("x", CENTER)
      .attr("y", CENTER - 8)
      .attr("text-anchor", "middle")
      .attr("font-size", 34)
      .attr("font-weight", 700)
      .attr("fill", "#111827")
      .text("INFO");

    svg.append("text")
      .attr("x", CENTER)
      .attr("y", CENTER + 24)
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .attr("letter-spacing", 2)
      .attr("fill", "#6b7280")
      .text("GRAPHICS");

    /* ------------------------------------------------------------------ */
    /* 3) HORIZONTAL BAR (NOW DYNAMIC & UNDER ALL CIRCLES)                */
    /* ------------------------------------------------------------------ */

    // vertical stand: from center disc down to bar
    const standWidth = 24;
    const standTopY = CENTER + 115;
    const standHeight = barY - standTopY;

    svg.append("rect")
      .attr("x", CENTER - standWidth / 2)
      .attr("y", standTopY)
      .attr("width", standWidth)
      .attr("height", standHeight)
      .attr("fill", "#9ca3af");

    // base bar itself
    svg.append("rect")
      .attr("x", barX1)
      .attr("y", barY)
      .attr("width", barWidth)
      .attr("height", barHeight)
      .attr("rx", 4)
      .attr("fill", "#6b7280");

    // diagonal hatch lines across the bar
    const hatchStep = 18;
    for (let x = barX1 + 6; x < barX1 + barWidth; x += hatchStep) {
      svg.append("line")
        .attr("x1", x)
        .attr("y1", barY)
        .attr("x2", x + 12)
        .attr("y2", barY + barHeight)
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 2);
    }

    /* ------------------------------------------------------------------ */
    /* 4) OUTER CIRCLES + CONNECTORS                                      */
    /* ------------------------------------------------------------------ */

    nodes.forEach((d, i) => {
      const { x, y, angle, item, color } = d;

      const hookRadius = 175;
      const hx = CENTER + hookRadius * Math.cos(angle);
      const hy = CENTER + hookRadius * Math.sin(angle);

      const midRadius = OUTER_RADIUS - nodeR - 10;
      const mx = CENTER + midRadius * Math.cos(angle);
      const my = CENTER + midRadius * Math.sin(angle);

      svg.append("line")
        .attr("x1", hx)
        .attr("y1", hy)
        .attr("x2", mx)
        .attr("y2", my)
        .attr("stroke", color)
        .attr("stroke-width", 3);

      svg.append("circle")
        .attr("cx", mx)
        .attr("cy", my)
        .attr("r", 6)
        .attr("fill", "white")
        .attr("stroke", color)
        .attr("stroke-width", 3);

      svg.append("line")
        .attr("x1", mx)
        .attr("y1", my)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", color)
        .attr("stroke-width", 3);

      // main circle
      svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", nodeR)
        .attr("fill", color);

      // icon circle
      svg.append("circle")
        .attr("cx", x)
        .attr("cy", y - nodeR * 0.4)
        .attr("r", nodeR * 0.26)
        .attr("fill", "white");

      svg.append("text")
        .attr("x", x)
        .attr("dy", "0.35em")
        .attr("y", y - nodeR * 0.40) 
        .attr("text-anchor", "middle")
        .attr("font-size", nodeR * 0.35)
        .attr("fill", "#111827")
        .text(item.icon ?? "●");

      // title
      svg.append("text")
        .attr("x", x)
        .attr("y", y + 4)
        .attr("text-anchor", "middle")
        .attr("font-size", nodeR * 0.23)
        .attr("font-weight", 700)
        .attr("fill", "white")
        .text(item.title ?? `Item ${i + 1}`);

      // description (simple wrap)
      const text = item.text ?? "";
      const words = text.split(" ");
      const lines = [];
      let current = "";

      words.forEach((w) => {
        if ((current + " " + w).length > 22) {
          lines.push(current);
          current = w;
        } else {
          current = current ? current + " " + w : w;
        }
      });
      if (current) lines.push(current);

      lines.slice(0, 3).forEach((line, li) => {
        svg.append("text")
          .attr("x", x)
          .attr("y", y + 24 + li * 14)
          .attr("text-anchor", "middle")
          .attr("font-size", nodeR * 0.16)
          .attr("fill", "white")
          .text(line);
      });
    });
  }, [items]);

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <svg ref={svgRef} />
    </div>
  );
}
