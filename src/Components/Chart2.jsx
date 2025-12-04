// src/charts/D3Infographic.jsx
import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

const DEFAULT_ITEMS = [
  { title: "OPTION A", icon: "👤", text: "Lorem ipsum dolor sit amet." },
  { title: "OPTION B", icon: "⚖️", text: "Tempor incididunt labore." },
  { title: "OPTION C", icon: "📊", text: "Ut enim ad minim veniam." },
//   { title: "OPTION D", icon: "💡", text: "Duis aute irure dolor." },
//   { title: "OPTION E", icon: "🧠", text: "Sed do eiusmod tempor." },
//   { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
//   { title: "OPTION C", icon: "📊", text: "Ut enim ad minim veniam." },
//   { title: "OPTION D", icon: "💡", text: "Duis aute irure dolor." },
//   { title: "OPTION E", icon: "🧠", text: "Sed do eiusmod tempor." },
//   { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
//   { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
//   { title: "OPTION C", icon: "📊", text: "Ut enim ad minim veniam." },
//   { title: "OPTION D", icon: "💡", text: "Duis aute irure dolor." },
//   { title: "OPTION E", icon: "🧠", text: "Sed do eiusmod tempor." },
//   { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
  { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
  { title: "OPTION C", icon: "📊", text: "Ut enim ad minim veniam." },
  { title: "OPTION D", icon: "💡", text: "Duis aute irure dolor." },
  { title: "OPTION E", icon: "🧠", text: "Sed do eiusmod tempor." },
  { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
  { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
  { title: "OPTION C", icon: "📊", text: "Ut enim ad minim veniam." },
  { title: "OPTION D", icon: "💡", text: "Duis aute irure dolor." },
  { title: "OPTION E", icon: "🧠", text: "Sed do eiusmod tempor." },
//   { title: "OPTION F", icon: "👥", text: "Excepteur sint occaecat cupidatat." },
];

const PALETTE = [
  "#f97316", // orange
  "#facc15", // yellow
  "#22c55e", // green
  "#2dd4bf", // teal
  "#3b82f6", // blue
  "#6b7280", // slate
//   "#f30000ff", // orange
//   "#615217ff", // yellow
//   "#22c55e", // green
//   "#2dd4bf", // teal
//   "#3b82f6", // blue
//   "#6b7280", // slate
];

export default function D3Infographic({ items }) {
  const svgRef = useRef();

  const data = useMemo(
    () =>
      (items && items.length ? items : DEFAULT_ITEMS).map((d, i) => ({
        ...d,
        color: d.color || PALETTE[i % PALETTE.length],
      })),
    [items]
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1200;
    const N = data.length;

    // ---- layout + sizes ----
    const baseCardH = 90;
    const baseGap = 26;
    const cardH = N <= 6 ? baseCardH : Math.max(60, baseCardH - (N - 6) * 4);
    const cardGap = N <= 6 ? baseGap : Math.max(12, baseGap - (N - 6) * 2);

    const cardsBlockH = N * cardH + (N - 1) * cardGap;
    const dialBlockH = 320;
    const height = Math.max(cardsBlockH, dialBlockH) + 160;

    const cx = 260;
    const cy = height / 2;
    const dialOuterR = 120;
    const dialInnerR = 95;

    // 🔴 IMPORTANT: card layout is defined BEFORE data.forEach
    const cardX = 520;
    const cardWidth = 520;
    const startY = cy - cardsBlockH / 2;

    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // ---- NO BACKGROUND ----
    const defs = svg.append("defs");

    // ---------------- CENTER DIAL ----------------
    // shadow
    svg
      .append("circle")
      .attr("cx", cx + 18)
      .attr("cy", cy + 24)
      .attr("r", dialOuterR + 6)
      .attr("fill", "black")
      .attr("opacity", 0.35);

    // outer ring
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", dialOuterR + 4)
      .attr("fill", "#e5e7eb");

    // soft edge ring
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", dialOuterR - 8)
      .attr("fill", "#cbd5f5");

    // inner face gradient
    const dialFaceGradient = defs
      .append("radialGradient")
      .attr("id", "dialFaceGradient")
      .attr("cx", "35%")
      .attr("cy", "25%")
      .attr("r", "80%");
    dialFaceGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f9fafb");
    dialFaceGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#e5e7eb");

    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", dialInnerR)
      .attr("fill", "url(#dialFaceGradient)")
      .attr("stroke", "#d1d5db")
      .attr("stroke-width", 2);

    // stacked squares icon
    const iconSize = 28;
    const iconOffset = 12;
    const iconGroup = svg.append("g").attr("transform", `translate(${cx},${cy})`);

    iconGroup
      .append("rect")
      .attr("x", -iconSize - iconOffset)
      .attr("y", -iconSize / 2)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .attr("rx", 4)
      .attr("fill", "#f97316");

    iconGroup
      .append("rect")
      .attr("x", -iconSize / 2)
      .attr("y", -iconSize / 2)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .attr("rx", 4)
      .attr("fill", "#0ea5e9");

    iconGroup
      .append("rect")
      .attr("x", iconOffset)
      .attr("y", -iconSize / 2)
      .attr("width", iconSize)
      .attr("height", iconSize)
      .attr("rx", 4)
      .attr("fill", "#6b7280");

    // title around dial
    svg
      .append("text")
      .attr("x", cx)
      .attr("y", cy - dialInnerR + 26)
      .attr("text-anchor", "middle")
      .attr("fill", "#4b5563")
      .attr("font-size", 13)
      .attr("letter-spacing", 3)
    //   .text("CREATIVE PROCESS");

    // ---------------- CARDS + CONNECTORS ----------------
    data.forEach((d, i) => {
      const cardY = startY + i * (cardH + cardGap);
      const iconCx = cardX + 80;
      const iconCy = cardY + cardH / 2;
      const rightBadgeCx = cardX + cardWidth - 50;

      // gradient per card
      const base = d3.color(d.color) || d3.color("#4b5563");
      const lighter = base.brighter(0.9);
      const softer = base.brighter(1.6);
      const gradId = `cardGrad-${i}`;

      const grad = defs
        .append("linearGradient")
        .attr("id", gradId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      grad.append("stop").attr("offset", "0%").attr("stop-color", base.toString());
      grad
        .append("stop")
        .attr("offset", "55%")
        .attr("stop-color", lighter.toString());
      grad
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", softer.toString());

      // card shadow
      svg
        .append("rect")
        .attr("x", cardX + 8)
        .attr("y", cardY + 10)
        .attr("width", cardWidth)
        .attr("height", cardH)
        .attr("rx", cardH / 2)
        .attr("fill", "black")
        .attr("opacity", 0.28);

      // card body
      svg
        .append("rect")
        .attr("x", cardX)
        .attr("y", cardY)
        .attr("width", cardWidth)
        .attr("height", cardH)
        .attr("rx", cardH / 2)
        .attr("fill", `url(#${gradId})`);

      // left icon circle
      svg
        .append("circle")
        .attr("cx", iconCx)
        .attr("cy", iconCy)
        .attr("r", 30)
        .attr("fill", "#f9fafb")
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 2);

      svg
        .append("text")
        .attr("x", iconCx)
        .attr("y", iconCy + 8)
        .attr("text-anchor", "middle")
        .attr("font-size", 24)
        .text(d.icon || "●");

      // right badge
      svg
        .append("circle")
        .attr("cx", rightBadgeCx)
        .attr("cy", iconCy)
        .attr("r", 20)
        .attr("fill", "#f9fafb")
        .attr("stroke", "#e5e7eb")
        .attr("stroke-width", 2);

      svg
        .append("text")
        .attr("x", rightBadgeCx)
        .attr("y", iconCy + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#4b5563")
        .attr("font-size", 18)
        .attr("font-weight", 700)
        .text(d.badge || "+");

      // title
      svg
        .append("text")
        .attr("x", cardX + 140)
        .attr("y", cardY + 32)
        .attr("fill", "#f9fafb")
        .attr("font-size", 18)
        .attr("font-weight", 700)
        .text(d.title || `OPTION ${i + 1}`);

      // description text
      const maxLen = 48;
      const text = d.text || "";
      const words = text.split(" ");
      const lines = [];
      let line = "";

      words.forEach((w) => {
        if ((line + " " + w).length > maxLen) {
          lines.push(line);
          line = w;
        } else {
          line = line ? line + " " + w : w;
        }
      });
      if (line) lines.push(line);

      lines.slice(0, 2).forEach((ln, li) => {
        svg
          .append("text")
          .attr("x", cardX + 140)
          .attr("y", cardY + 54 + li * 16)
          .attr("fill", "#e5e7eb")
          .attr("font-size", 13)
          .text(ln);
      });

      // -------- CONNECTOR from dial to card --------
      const endX = cardX; // left edge of card
      const endY = iconCy;

      const angle = Math.atan2(endY - cy, endX - cx);
      const startR = dialInnerR + 60;

      const startX = cx + startR * Math.cos(angle);
      const startYLine = cy + startR * Math.sin(angle); // renamed to avoid confusion

      const midX = (startX + endX) / 2;

      svg
        .append("path")
        .attr("d", `M${startX},${startYLine} L${midX},${endY} L${endX},${endY}`)
        .attr("stroke", "#6b7280")
        .attr("stroke-width", 2.4)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
        .attr("opacity", 0.6);

      // single white node on the connector
      const t = 0.55;
      const nodeX = startX + (midX - startX) * t;
      const nodeY = startYLine + (endY - startYLine) * t;

      svg
        .append("circle")
        .attr("cx", startX)
        .attr("cy", startYLine)
        .attr("r", 6)
        .attr("fill", "#f9fafb");

      // circle at the end of the line (where it meets the card)
      svg
        .append("circle")
        .attr("cx", endX)
        .attr("cy", endY)
        .attr("r", 6)
        .attr("fill", "#f9fafb");
    });
  }, [data]);

  return (
    <div style={{ width: "100%", maxWidth: 1300, margin: "0 auto" }}>
      <svg
        ref={svgRef}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}
