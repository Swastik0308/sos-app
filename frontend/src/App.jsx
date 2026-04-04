import './App.css'
import { useState, useEffect, useRef } from "react";

function App() {


// ── Icons (inline SVG paths to avoid external deps) ──────────────────────────
const Icon = ({ path, size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);
const ICONS = {
  sos: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
  bluetooth: "M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z",
  wifi: "M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01",
  wifiOff: "M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55 M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M7 11V7a5 5 0 0110 0v4",
  radio: "M12 1a3 3 0 100 6 3 3 0 000-6z M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14",
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 01-14 0v-2 M12 19v4 M8 23h8",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
};

// ── Pulse Ring Animation Component ───────────────────────────────────────────
const PulseRing = ({ active, danger }) => (
  <div className={`absolute inset-0 rounded-full ${active ? (danger ? "animate-ping" : "animate-pulse") : ""} ${danger ? "bg-red-500/20" : "bg-cyan-500/20"}`} />
);

// ── Status Dot ────────────────────────────────────────────────────────────────
const StatusDot = ({ active, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-2 h-2 rounded-full ${active ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-zinc-600"}`} />
    <span className="text-xs text-zinc-400 font-mono">{label}</span>
  </div>
);

// ── Peer Node Card ────────────────────────────────────────────────────────────
const PeerCard = ({ name, distance, relay, signal, avatar }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-900 transition-colors">
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-900 to-blue-950 flex items-center justify-center text-cyan-300 font-mono text-sm font-bold border border-cyan-800/40">{avatar}</div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-zinc-200 font-medium truncate">{name}</p>
      <p className="text-xs text-zinc-500 font-mono">{distance} · {relay ? "Can relay" : "No internet"}</p>
    </div>
    <div className="flex flex-col items-end gap-1">
      <div className={`flex gap-0.5 items-end h-4`}>
        {[1,2,3,4].map(i => (
          <div key={i} className={`w-1 rounded-sm ${i <= signal ? "bg-cyan-400" : "bg-zinc-700"}`} style={{height: `${i*3+4}px`}} />
        ))}
      </div>
      {relay && <span className="text-[10px] text-emerald-400 font-mono">RELAY</span>}
    </div>
  </div>
);

// ── Alert Log Item ────────────────────────────────────────────────────────────
const AlertItem = ({ type, time, msg, status }) => {
  const colors = { danger: "text-red-400 border-red-900/50 bg-red-950/30", warn: "text-amber-400 border-amber-900/50 bg-amber-950/30", info: "text-cyan-400 border-cyan-900/50 bg-cyan-950/20" };
  return (
    <div className={`p-3 rounded-xl border text-xs font-mono ${colors[type]} flex items-start gap-3`}>
      <Icon path={type === "danger" ? ICONS.alert : type === "warn" ? ICONS.zap : ICONS.check} size={14} className="mt-0.5 shrink-0" />
      <div className="flex-1">
        <p className="text-zinc-300">{msg}</p>
        <p className="text-zinc-600 mt-1">{time}</p>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[10px] border ${colors[type]}`}>{status}</span>
    </div>
  );
};

// ── Sensor Gauge ──────────────────────────────────────────────────────────────
const SensorGauge = ({ label, value, max, unit, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color === "cyan" ? "bg-cyan-500" : color === "amber" ? "bg-amber-500" : "bg-emerald-500";
  const glowColor = color === "cyan" ? "shadow-[0_0_8px_rgba(6,182,212,0.6)]" : color === "amber" ? "shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "shadow-[0_0_8px_rgba(52,211,153,0.6)]";
  return (
    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{label}</span>
        <span className={`text-sm font-mono font-bold ${color === "cyan" ? "text-cyan-400" : color === "amber" ? "text-amber-400" : "text-emerald-400"}`}>{value}<span className="text-xs text-zinc-600 ml-1">{unit}</span></span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${barColor} ${glowColor}`} style={{width: `${pct}%`}} />
      </div>
    </div>
  );
};

// ── Contact Card ──────────────────────────────────────────────────────────────
const ContactCard = ({ name, relation, phone, notified }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-mono text-sm font-bold">{name[0]}</div>
    <div className="flex-1">
      <p className="text-sm text-zinc-200 font-medium">{name}</p>
      <p className="text-xs text-zinc-500">{relation} · {phone}</p>
    </div>
    {notified && <span className="text-[10px] text-emerald-400 font-mono px-2 py-1 rounded-full bg-emerald-950/50 border border-emerald-900/40">NOTIFIED</span>}
  </div>
);

// ── Mesh Visualizer (animated SVG) ───────────────────────────────────────────
const MeshVisualizer = ({ active }) => {
  const nodes = [
    { x: 120, y: 80, label: "YOU", primary: true },
    { x: 240, y: 50, label: "Node A", relay: true },
    { x: 290, y: 140, label: "Node B" },
    { x: 60, y: 160, label: "Node C" },
    { x: 190, y: 190, label: "Node D", relay: true },
    { x: 330, y: 60, label: "SERVER", server: true },
  ];
  const edges = [[0,1],[0,3],[1,2],[1,5],[2,4],[3,4],[1,4]];
  return (
    <svg viewBox="0 0 390 240" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#06b6d4" opacity="0.6" />
        </marker>
      </defs>
      {edges.map(([a,b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={active ? "#06b6d4" : "#27272a"} strokeWidth="1" strokeOpacity={active ? 0.4 : 0.3}
          strokeDasharray={active ? "4 3" : "none"} markerEnd={active ? "url(#arr)" : "none"} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.primary && active && (
            <circle cx={n.x} cy={n.y} r="22" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4">
              <animate attributeName="r" values="18;28;18" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          {n.relay && active && (
            <circle cx={n.x} cy={n.y} r="16" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5">
              <animate attributeName="r" values="14;20;14" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={n.x} cy={n.y} r={n.primary ? 14 : n.server ? 12 : 10}
            fill={n.primary ? "#7f1d1d" : n.server ? "#134e4a" : "#1c1917"}
            stroke={n.primary ? "#ef4444" : n.relay ? "#06b6d4" : n.server ? "#10b981" : "#3f3f46"}
            strokeWidth={n.primary ? 2 : 1.5} />
          <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
            fontSize={n.primary ? "7" : "6"} fill={n.primary ? "#fca5a5" : n.server ? "#6ee7b7" : n.relay ? "#67e8f9" : "#a1a1aa"}
            fontFamily="monospace" fontWeight="bold">
            {n.primary ? "SOS" : n.server ? "NET" : ""}
          </text>
          <text x={n.x} y={n.y + (n.primary ? 22 : 18)} textAnchor="middle" fontSize="7" fill="#71717a" fontFamily="monospace">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────
  const [tab, setTab] = useState("dashboard");
  const [sosActive, setSosActive] = useState(false);
  const [sosHold, setSosHold] = useState(0);
  const [meshActive, setMeshActive] = useState(true);
  const [fallDetect, setFallDetect] = useState(true);
  const [audioDetect, setAudioDetect] = useState(false);
  const [ttl, setTtl] = useState(5);
  const [alerts, setAlerts] = useState([
    { type: "info", msg: "Mesh network initialized. 4 peers discovered.", time: "14:32:01", status: "OK" },
    { type: "warn", msg: "Sudden acceleration detected. Manual confirm skipped.", time: "14:28:44", status: "WATCH" },
    { type: "danger", msg: "SOS broadcast sent. TTL=5. Relay via Node A.", time: "14:22:10", status: "SENT" },
  ]);
  const holdRef = useRef(null);
  const [accel, setAccel] = useState(2.1);
  const [gyro, setGyro] = useState(34);
  const [battery, setBattery] = useState(78);
  const [peerCount, setPeerCount] = useState(4);

  // Simulate sensor fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setAccel(v => +(v + (Math.random() - 0.5) * 0.4).toFixed(1));
      setGyro(v => Math.max(0, Math.min(180, +(v + (Math.random() - 0.5) * 5).toFixed(1))));
      setBattery(v => Math.max(10, v - 0.05));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // SOS hold logic
  useEffect(() => {
    if (sosHold > 0 && sosHold < 100) {
      holdRef.current = setTimeout(() => setSosHold(h => h + 10), 80);
    } else if (sosHold >= 100) {
      setSosActive(true);
      setSosHold(0);
      setAlerts(a => [{ type: "danger", msg: "SOS broadcast initiated. Mesh relay active.", time: new Date().toLocaleTimeString(), status: "ACTIVE" }, ...a]);
    }
    return () => clearTimeout(holdRef.current);
  }, [sosHold]);

  const cancelSOS = () => {
    setSosActive(false);
    setAlerts(a => [{ type: "info", msg: "SOS cancelled by user.", time: new Date().toLocaleTimeString(), status: "CANCELLED" }, ...a]);
  };

  const tabs = [
    { id: "dashboard", icon: ICONS.home, label: "Dashboard" },
    { id: "mesh", icon: ICONS.bluetooth, label: "Mesh" },
    { id: "sensors", icon: ICONS.activity, label: "Sensors" },
    { id: "contacts", icon: ICONS.users, label: "Contacts" },
    { id: "log", icon: ICONS.bell, label: "Log" },
    { id: "settings", icon: ICONS.settings, label: "Settings" },
  ];

  const peers = [
    { name: "Vivekanand R", distance: "12m", relay: true, signal: 4, avatar: "VR" },
    { name: "Swastik S", distance: "38m", relay: false, signal: 3, avatar: "SS" },
    { name: "Karthik M", distance: "65m", relay: true, signal: 2, avatar: "KM" },
    { name: "Unknown_4F2A", distance: "91m", relay: false, signal: 1, avatar: "??" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-mono flex flex-col" style={{fontFamily: "'JetBrains Mono', 'Fira Code', monospace"}}>

      {/* Top Bar */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-950 border border-red-800/60 flex items-center justify-center">
            <Icon path={ICONS.shield} size={14} className="text-red-400" />
          </div>
          <span className="text-sm font-bold text-zinc-200 tracking-tight">MESH<span className="text-red-400">SOS</span></span>
        </div>
        <div className="flex items-center gap-3">
          <StatusDot active={meshActive} label="BLE" />
          <StatusDot active={sosActive} label={sosActive ? "SOS ACTIVE" : "STANDBY"} />
          <span className="text-xs text-zinc-600 font-mono">{Math.round(battery)}%</span>
        </div>
      </div>

      {/* SOS Active Banner */}
      {sosActive && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-red-950/60 border border-red-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span className="text-red-300 text-xs font-bold tracking-widest">SOS BROADCASTING · TTL={ttl} · {peerCount} PEERS</span>
          </div>
          <button onClick={cancelSOS} className="text-xs text-red-400 border border-red-800 px-3 py-1 rounded-lg hover:bg-red-900/40 transition-colors">
            CANCEL
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* DASHBOARD TAB */}
        {tab === "dashboard" && (
          <>
            {/* SOS Button */}
            <div className="flex flex-col items-center py-6">
              <div className="relative w-40 h-40">
                {sosActive && <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping" />}
                {sosActive && <div className="absolute inset-2 rounded-full bg-red-500/10 animate-pulse" />}
                <button
                  className={`relative w-full h-full rounded-full border-4 flex flex-col items-center justify-center gap-1 transition-all duration-200 select-none ${sosActive ? "bg-red-900/80 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)]" : "bg-zinc-900 border-zinc-700 hover:border-red-800 hover:bg-red-950/30 active:scale-95"}`}
                  onMouseDown={() => !sosActive && setSosHold(10)}
                  onMouseUp={() => setSosHold(0)}
                  onTouchStart={() => !sosActive && setSosHold(10)}
                  onTouchEnd={() => setSosHold(0)}
                  onClick={sosActive ? cancelSOS : undefined}
                >
                  {sosHold > 0 && sosHold < 100 && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="68" fill="none" stroke="#ef4444" strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 68 * sosHold / 100} 999`} />
                    </svg>
                  )}
                  <Icon path={ICONS.alert} size={36} className={sosActive ? "text-red-300" : "text-zinc-400"} />
                  <span className={`text-lg font-black tracking-widest ${sosActive ? "text-red-300" : "text-zinc-400"}`}>
                    {sosActive ? "ACTIVE" : "SOS"}
                  </span>
                  <span className="text-[9px] text-zinc-600">{sosActive ? "CLICK TO CANCEL" : "HOLD TO ACTIVATE"}</span>
                </button>
              </div>
              {sosHold > 0 && <p className="mt-3 text-xs text-amber-400 animate-pulse">Hold... {Math.round(sosHold)}%</p>}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-600 mb-1">PEERS</p>
                <p className="text-xl font-bold text-cyan-400">{peerCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-600 mb-1">TTL HOP</p>
                <p className="text-xl font-bold text-violet-400">{ttl}</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <p className="text-[10px] text-zinc-600 mb-1">RANGE</p>
                <p className="text-xl font-bold text-emerald-400">~{peerCount * 30}m</p>
              </div>
            </div>

            {/* Mini sensor preview */}
            <div className="grid grid-cols-2 gap-2">
              <SensorGauge label="Accel" value={+accel.toFixed(1)} max={20} unit="m/s²" color="cyan" />
              <SensorGauge label="Gyro" value={+gyro.toFixed(0)} max={180} unit="°/s" color="amber" />
            </div>

            {/* Recent Alerts */}
            <div>
              <p className="text-[10px] text-zinc-600 mb-2 tracking-widest uppercase">Recent Events</p>
              <div className="space-y-2">
                {alerts.slice(0, 3).map((a, i) => <AlertItem key={i} {...a} />)}
              </div>
            </div>
          </>
        )}

        {/* MESH TAB */}
        {tab === "mesh" && (
          <>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">BLE MESH TOPOLOGY</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${meshActive ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/40" : "bg-zinc-800 text-zinc-600"}`}>
                  {meshActive ? "ACTIVE" : "OFF"}
                </span>
              </div>
              <div className="h-52">
                <MeshVisualizer active={meshActive} />
              </div>
            </div>

            <div>
              <p className="text-[10px] text-zinc-600 mb-2 tracking-widest uppercase">Discovered Peers ({peers.length})</p>
              <div className="space-y-2">
                {peers.map((p, i) => <PeerCard key={i} {...p} />)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-[10px] text-zinc-600 mb-3 tracking-widest uppercase">Packet Info</p>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between"><span>Encryption</span><span className="text-cyan-400">AES-256</span></div>
                <div className="flex justify-between"><span>Signature</span><span className="text-cyan-400">RSA Digital Sig</span></div>
                <div className="flex justify-between"><span>Max TTL</span><span className="text-violet-400">{ttl} hops</span></div>
                <div className="flex justify-between"><span>Packet includes</span><span className="text-zinc-300">ID · Time · GPS · Type</span></div>
              </div>
            </div>
          </>
        )}

        {/* SENSORS TAB */}
        {tab === "sensors" && (
          <>
            <div className="space-y-2">
              <p className="text-[10px] text-zinc-600 mb-2 tracking-widest uppercase">Live Sensor Data</p>
              <SensorGauge label="Accelerometer" value={+accel.toFixed(1)} max={20} unit="m/s²" color="cyan" />
              <SensorGauge label="Gyroscope" value={+gyro.toFixed(0)} max={180} unit="°/s" color="amber" />
              <SensorGauge label="Battery" value={Math.round(battery)} max={100} unit="%" color="green" />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <p className="text-[10px] text-zinc-600 tracking-widest uppercase">Detection Modules</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-200">Fall Detection</p>
                  <p className="text-[10px] text-zinc-600">Accel + Gyro threshold</p>
                </div>
                <button onClick={() => setFallDetect(v => !v)} className={`w-11 h-6 rounded-full transition-colors relative ${fallDetect ? "bg-cyan-600" : "bg-zinc-700"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${fallDetect ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-200">Sudden Impact</p>
                  <p className="text-[10px] text-zinc-600">High accel burst detect</p>
                </div>
                <button className="w-11 h-6 rounded-full bg-cyan-600 relative">
                  <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-200">Audio / Scream Detect</p>
                  <p className="text-[10px] text-zinc-600">Microphone classification</p>
                </div>
                <button onClick={() => setAudioDetect(v => !v)} className={`w-11 h-6 rounded-full transition-colors relative ${audioDetect ? "bg-cyan-600" : "bg-zinc-700"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${audioDetect ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40">
              <div className="flex items-center gap-2 mb-1">
                <Icon path={ICONS.alert} size={13} className="text-amber-400" />
                <span className="text-xs text-amber-300 font-bold">Detection Thresholds</span>
              </div>
              <p className="text-[11px] text-amber-600">Fall: accel &gt; 14 m/s² + post-impact stillness · Impact: burst &gt; 18 m/s² · Audio: &gt; 0.82 confidence</p>
            </div>
          </>
        )}

        {/* CONTACTS TAB */}
        {tab === "contacts" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-zinc-600 tracking-widest uppercase">Emergency Contacts</p>
              <button className="flex items-center gap-1 text-xs text-cyan-400 border border-cyan-900/50 px-2 py-1 rounded-lg hover:bg-cyan-950/30">
                <Icon path={ICONS.plus} size={12} /> Add
              </button>
            </div>
            <div className="space-y-2">
              <ContactCard name="Amma" relation="Mother" phone="+91 98450 XXXXX" notified={sosActive} />
              <ContactCard name="Neetha Ma'am" relation="Guide" phone="+91 98440 XXXXX" notified={false} />
              <ContactCard name="Emergency SOS" relation="Campus Security" phone="080-2323-XXXX" notified={sosActive} />
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-[10px] text-zinc-600 mb-3 tracking-widest uppercase">Escalation Flow</p>
              <div className="space-y-2 text-xs">
                {["SOS triggered on device", "BLE broadcast to mesh peers", "Relay via internet-connected peer", "SMS + Push to emergency contacts", "Dashboard notification logged"].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-500 shrink-0">{i+1}</span>
                    <span className="text-zinc-400">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* LOG TAB */}
        {tab === "log" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-zinc-600 tracking-widest uppercase">Event Log</p>
              <span className="text-[10px] text-zinc-600">{alerts.length} entries</span>
            </div>
            <div className="space-y-2">
              {alerts.map((a, i) => <AlertItem key={i} {...a} />)}
            </div>
          </>
        )}

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <p className="text-[10px] text-zinc-600 tracking-widest uppercase">System Config</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-200">Bluetooth Mesh</p>
                  <p className="text-[10px] text-zinc-600">BLE peer-to-peer relay</p>
                </div>
                <button onClick={() => setMeshActive(v => !v)} className={`w-11 h-6 rounded-full transition-colors relative ${meshActive ? "bg-cyan-600" : "bg-zinc-700"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${meshActive ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-zinc-200">TTL (Max Hops)</span>
                  <span className="text-sm text-violet-400 font-bold">{ttl}</span>
                </div>
                <input type="range" min={1} max={10} value={ttl} onChange={e => setTtl(+e.target.value)} className="w-full accent-violet-500" />
                <p className="text-[10px] text-zinc-600 mt-1">Higher TTL = wider relay, more traffic</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <p className="text-[10px] text-zinc-600 tracking-widest uppercase">Security</p>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Icon path={ICONS.lock} size={14} className="text-emerald-400" />
                <span>AES-256 packet encryption enabled</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Icon path={ICONS.shield} size={14} className="text-emerald-400" />
                <span>RSA digital signature per packet</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Icon path={ICONS.eye} size={14} className="text-zinc-600" />
                <span>Location sharing: GPS if available</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-600 space-y-1">
              <p className="text-zinc-400 font-bold mb-2">About</p>
              <p>Decentralized Bluetooth Mesh SOS System</p>
              <p>Dr. AIT — ISE Dept · Batch 2023–27</p>
              <p>Guide: Neetha Natesh, Asst. Prof</p>
              <p className="text-zinc-700 pt-1">v1.0.0 · Built on BLE + Android Sensors</p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-zinc-900 bg-zinc-950 px-2 py-2 grid grid-cols-6 gap-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors ${tab === t.id ? "bg-zinc-900 text-cyan-400" : "text-zinc-600 hover:text-zinc-400"}`}>
            <Icon path={t.icon} size={18} />
            <span className="text-[8px] tracking-wider">{t.label.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}



export default App
