import { useState, useEffect } from "react";

// Static node positions (% of viewbox 0–100)
const NODES = [
  { id: "origin", x: 50, y: 50, type: "origin", label: "SOS Origin" },
  { id: "r1", x: 30, y: 35, type: "relay", label: "device_b12c" },
  { id: "r2", x: 70, y: 30, type: "relay", label: "device_7e4a" },
  { id: "r3", x: 20, y: 65, type: "relay", label: "device_9f3d" },
  { id: "r4", x: 75, y: 65, type: "relay", label: "device_cc01" },
  { id: "r5", x: 50, y: 20, type: "relay", label: "device_ff3a" },
  { id: "inet", x: 15, y: 40, type: "internet", label: "Gateway (Internet)" },
];

const EDGES = [
  ["origin", "r1"],
  ["origin", "r2"],
  ["origin", "r3"],
  ["origin", "r4"],
  ["r1", "inet"],
  ["r1", "r5"],
  ["r2", "r5"],
  ["r3", "r4"],
];

// Animated "packet" traveling along an edge
function PacketDot({ x1, y1, x2, y2, delay }) {
  return (
    <circle r="2" fill="#60a5fa" opacity="0.9" filter="url(#dotGlow)">
      <animateMotion
        dur="2.5s"
        repeatCount="indefinite"
        begin={`${delay}s`}
        path={`M${x1},${y1} L${x2},${y2}`}
      />
    </circle>
  );
}

export default function SOSMap() {
  const [activeEdge, setActiveEdge] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEdge((e) => (e + 1) % EDGES.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getNode = (id) => NODES.find((n) => n.id === id);

  const nodeColor = {
    origin: { fill: "#7f1d1d", stroke: "#ef4444", glow: "#ef4444" },
    relay: { fill: "#0d2040", stroke: "#2563eb", glow: "#2563eb" },
    internet: { fill: "#064e3b", stroke: "#10b981", glow: "#10b981" },
  };

  return (
    <div className="relative w-full aspect-[4/3] glass rounded-xl overflow-hidden glow-border">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />

      <svg
        viewBox="0 0 100 75"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = getNode(a);
          const nb = getNode(b);
          const isActive = i === activeEdge;
          return (
            <g key={i}>
              <line
                x1={na.x}
                y1={na.y * 0.75}
                x2={nb.x}
                y2={nb.y * 0.75}
                stroke={
                  isActive ? "rgba(37,99,235,0.7)" : "rgba(37,99,235,0.2)"
                }
                strokeWidth={isActive ? "0.6" : "0.3"}
                strokeDasharray={isActive ? "none" : "2,2"}
                className="transition-all duration-500"
              />
              {isActive && (
                <PacketDot
                  x1={na.x}
                  y1={na.y * 0.75}
                  x2={nb.x}
                  y2={nb.y * 0.75}
                  delay={0}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const c = nodeColor[node.type];
          const y = node.y * 0.75;
          return (
            <g key={node.id} filter="url(#nodeGlow)">
              {/* Pulse rings for origin */}
              {node.type === "origin" && (
                <>
                  <circle
                    cx={node.x}
                    cy={y}
                    r="6"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="0.5"
                    opacity="0.4"
                    className="sos-ring"
                  />
                  <circle
                    cx={node.x}
                    cy={y}
                    r="6"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="0.5"
                    opacity="0.3"
                    className="sos-ring-delay"
                  />
                </>
              )}
              {/* Internet gateway glow */}
              {node.type === "internet" && (
                <circle
                  cx={node.x}
                  cy={y}
                  r="5"
                  fill="rgba(16,185,129,0.08)"
                  className="animate-pulse-slow"
                />
              )}
              <circle
                cx={node.x}
                cy={y}
                r={
                  node.type === "origin"
                    ? 4
                    : node.type === "internet"
                    ? 3.5
                    : 2.5
                }
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth="0.6"
              />
              {/* Icon dot */}
              <circle cx={node.x} cy={y} r="1" fill={c.stroke} opacity="0.9" />
              {/* Label */}
              <text
                x={node.x}
                y={y + (node.type === "origin" ? 7 : 5.5)}
                textAnchor="middle"
                fontSize="3"
                fill="rgba(184,201,220,0.8)"
                fontFamily="JetBrains Mono"
              >
                {node.type === "origin"
                  ? "⚠ SOS"
                  : node.type === "internet"
                  ? "🌐 Online"
                  : node.id.substring(0, 8)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-alert border border-red-400" />
          <span className="text-xs font-mono text-steel-400">SOS Origin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-navy-800 border border-signal" />
          <span className="text-xs font-mono text-steel-400">Relay Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-safe-muted border border-safe" />
          <span className="text-xs font-mono text-steel-400">
            Internet Gateway
          </span>
        </div>
      </div>

      {/* Live badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 glass-light rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-alert animate-ping" />
        <span className="text-xs font-mono text-alert">LIVE</span>
      </div>
    </div>
  );
}
