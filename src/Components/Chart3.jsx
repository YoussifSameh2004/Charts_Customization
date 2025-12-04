import React from "react";

const PALETTE = [
  "#00bcd4",
  "#f7b500",
  "#039be5",
  "#ff6f1e",
  "#4caf50",
  "#ab47bc",
];

// darken helper for accent shading
function darken(hex, factor = 0.78) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = Math.floor(((num >> 16) & 255) * factor);
  const g = Math.floor(((num >> 8) & 255) * factor);
  const b = Math.floor((num & 255) * factor);
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function ArrowSteps({ items }) {
  const data = items && items.length ? items : [];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 2000,
        margin: "0 auto",
        padding: "40px 150px 48px",
        boxSizing: "border-box",
        fontFamily: "'Poppins', 'Inter', 'Segoe UI', system-ui, sans-serif",
        // subtle dark backdrop with glow
        background:
          "radial-gradient(circle at top, #0b1020 0, #020617 42%, #020617 100%)",
        borderRadius: 28,
        boxShadow: "0 22px 70px rgba(15,23,42,0.75)",
        position: "relative",
        // overflow: "hidden",
        color: "#e2e8f0",
      }}
    >
      {/* soft vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.06) 0, transparent 55%), radial-gradient(circle at bottom right, rgba(251,191,36,0.06) 0, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* vertical spine line */}
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 34,
          bottom: 34,
          width: 2,
          background:
            "linear-gradient(180deg, rgba(148,163,184,0.08), rgba(148,163,184,0.25), rgba(148,163,184,0.08))",
          opacity: 0.8,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 26,
          zIndex: 1,
        }}
      >
        {data.map((step, index) => {
          const color = PALETTE[index % PALETTE.length];
          const accent = darken(color, 0.88);
          const isEvenStep = (index + 1) % 2 === 0;
          const shift = isEvenStep ? 60 : 0; // even numbers pushed further right

          return (
            <div
              key={index}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "88px 1fr",
                gap: 18,
                alignItems: "stretch",
                transform: `translateX(${shift}px)`,
                transition: "transform 0.25s ease",
              }}
            >
              {/* step badge */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* glow behind badge */}
                <div
                  style={{
                    position: "absolute",
                    width: 130,
                    height: 130,
                    background: `${color}2e`,
                    filter: "blur(32px)",
                    zIndex: 0,
                  }}
                />

                {/* inner badge */}
                <div
                  style={{
                    position: "relative",
                    width: 76,
                    height: 76,
                    minWidth: 76,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${color}, ${accent})`,
                    color: "#020617",
                    fontSize: 22,
                    fontWeight: 700,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 18px 40px ${color}66, inset 0 1px 0 rgba(255,255,255,0.8)`,
                    border: "2px solid rgba(15,23,42,0.65)",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: 1.4,
                      textTransform: "uppercase",
                      opacity: 0.9,
                    }}
                  >
                    Step
                  </span>
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                </div>
              </div>

              {/* content card */}
                <div style={{ position: "relative" }}>
                <div
                    style={{
                    position: "relative",
                    borderRadius: 18,
                    padding: "18px 100px 20px 56px",

                    // ✨ FULLY FLEXIBLE HEIGHT (auto grows with text)
                    background:
                        "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",

                    border: "1px solid rgba(148,163,184,0.24)",
                    boxShadow:
                        "0 16px 34px rgba(15,23,42,0.76), 0 0 0 1px rgba(15,23,42,0.9)",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "#e2e8f0",
                    overflow: "visible",   // ← IMPORTANT: lets arrow adjust without cropping
                    backdropFilter: "blur(14px)",
                    minHeight: "90px",     // keeps shape consistent but expandable
                    }}
                >
                    {/* vertical accent bar */}
                    <div
                    style={{
                        position: "absolute",
                        left: 18,
                        top: 12,
                        bottom: 12, // ← expands with the container automatically
                        width: 8,
                        borderRadius: 999,
                        background: `linear-gradient(180deg, ${accent}, ${color})`,
                        opacity: 0.96,
                        boxShadow: `0 0 18px ${color}55`,
                    }}
                    />

                    {/* text container (flexible height) */}
                    <div
                    style={{
                        position: "relative",
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                    >
                    <div
                        style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#f9fafb",
                        letterSpacing: 0.25,
                        whiteSpace: "normal",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        }}
                    >
                        {step.title}
                    </div>
                    <div
                        style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: "#cbd5f5",
                        whiteSpace: "normal",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        }}
                    >
                        {step.text}
                    </div>
                    </div>
                </div>

                {/* arrow accent (ALWAYS stays centered vertically based on content height) */}
                <div
                    style={{
                    position: "absolute",
                    top: "50%",
                    right: -18,
                    transform: "translateY(-50%) rotate(45deg)",
                    width: 46,
                    height: 46,
                    background: `linear-gradient(135deg, ${color}, ${accent})`,
                    borderRadius: 14,
                    boxShadow: `0 10px 28px ${color}66`,
                    zIndex: 3,
                    }}
                />
                </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
