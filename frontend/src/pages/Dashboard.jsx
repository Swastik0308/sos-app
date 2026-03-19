// import { useState } from "react";
// import SOSFeed from "../components/SOSFeed";
// import SOSMap from "../components/SOSMap";
// import PeerNode from "../components/PeerNode";

// function StatCard({ label, value, sub, icon, color = "signal" }) {
//   const colorMap = {
//     signal: "border-signal/20 bg-signal/5 text-signal-glow",
//     alert: "border-alert/20 bg-alert/5 text-alert",
//     safe: "border-safe/20 bg-safe/5 text-safe",
//     steel: "border-steel-400/20 bg-steel-400/5 text-steel-300",
//   };
//   return (
//     <div className={`glass rounded-xl p-5 border ${colorMap[color]}`}>
//       <div className="flex items-start justify-between mb-3">
//         <span className="text-steel-400 text-xs font-mono uppercase tracking-wider">
//           {label}
//         </span>
//         <div
//           className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[color]}`}
//         >
//           {icon}
//         </div>
//       </div>
//       <div className="font-display font-700 text-2xl text-white">{value}</div>
//       {sub && (
//         <div className="text-xs text-steel-400 mt-0.5 font-mono">{sub}</div>
//       )}
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [tab, setTab] = useState("feed");

//   return (
//     <div className="min-h-screen pt-20 pb-16 px-6 lg:px-10 max-w-7xl mx-auto">
//       {/* Page header */}
//       <div className="mb-8 animate-slide-up">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="w-2 h-2 rounded-full bg-alert animate-ping" />
//           <span className="font-mono text-xs text-alert uppercase tracking-wider">
//             Live Network Feed
//           </span>
//         </div>
//         <h1 className="font-display font-700 text-3xl md:text-4xl text-white">
//           SOS Relay Dashboard
//         </h1>
//         <p className="text-steel-400 text-sm mt-1">
//           Real-time overview of mesh relay activity, peer nodes, and propagated
//           SOS events.
//         </p>
//       </div>

//       {/* Stats row */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up animate-delay-100">
//         <StatCard
//           label="Active Peers"
//           value="4"
//           sub="3 offline relay, 1 online"
//           color="signal"
//           icon={
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3"
//               />
//             </svg>
//           }
//         />
//         <StatCard
//           label="SOS Events"
//           value="3"
//           sub="2 active, 1 expired"
//           color="alert"
//           icon={
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//               />
//             </svg>
//           }
//         />
//         <StatCard
//           label="Packets Forwarded"
//           value="8"
//           sub="1 reached internet"
//           color="safe"
//           icon={
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
//               />
//             </svg>
//           }
//         />
//         <StatCard
//           label="Max Hop Count"
//           value="5"
//           sub="avg 2.6 hops/message"
//           color="steel"
//           icon={
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
//               />
//             </svg>
//           }
//         />
//       </div>

//       {/* Main grid */}
//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Left: Map + Tabs */}
//         <div className="lg:col-span-2 flex flex-col gap-6 animate-slide-up animate-delay-200">
//           {/* Map */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="font-display font-600 text-white text-lg">
//                 Mesh Topology
//               </h2>
//               <span className="text-xs font-mono text-steel-400">
//                 Simulated BLE network
//               </span>
//             </div>
//             <SOSMap />
//           </div>

//           {/* SOS Feed with tabs */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="font-display font-600 text-white text-lg">
//                 Event Log
//               </h2>
//               <div className="flex gap-1 glass-light rounded-lg p-1">
//                 {["feed", "raw"].map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setTab(t)}
//                     className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
//                       tab === t
//                         ? "bg-signal text-white"
//                         : "text-steel-400 hover:text-white"
//                     }`}
//                   >
//                     {t === "feed" ? "Events" : "Raw Packets"}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {tab === "feed" ? (
//               <SOSFeed />
//             ) : (
//               <div className="glass rounded-xl p-5 font-mono text-xs text-steel-300 glow-border max-h-96 overflow-y-auto">
//                 <div className="text-steel-400 mb-3 text-xs uppercase tracking-wider">
//                   Raw packet log
//                 </div>
//                 {[
//                   { time: "10:20:01", id: "msg-001", hop: 3, ttl: 3597 },
//                   { time: "10:18:44", id: "msg-001", hop: 2, ttl: 3598 },
//                   { time: "10:17:22", id: "msg-001", hop: 1, ttl: 3599 },
//                   { time: "10:12:05", id: "msg-002", hop: 1, ttl: 3599 },
//                   { time: "10:06:11", id: "msg-003", hop: 5, ttl: 1792 },
//                 ].map((r, i) => (
//                   <div
//                     key={i}
//                     className="flex gap-4 py-1.5 border-b border-signal/5 last:border-0"
//                   >
//                     <span className="text-steel-400 w-16">{r.time}</span>
//                     <span className="text-signal-glow">[RECV]</span>
//                     <span className="text-white">{r.id}</span>
//                     <span className="text-steel-400">hop={r.hop}</span>
//                     <span className="text-steel-400">ttl={r.ttl}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right: Peer list */}
//         <div className="flex flex-col gap-4 animate-slide-up animate-delay-300">
//           <div className="flex items-center justify-between">
//             <h2 className="font-display font-600 text-white text-lg">
//               Nearby Peers
//             </h2>
//             <span className="text-xs font-mono text-steel-400">
//               BLE radius ~50m
//             </span>
//           </div>

//           <PeerNode />

//           {/* Network health */}
//           <div className="glass rounded-xl p-5 glow-border mt-2">
//             <div className="font-display font-600 text-white text-sm mb-4">
//               Network Health
//             </div>
//             <div className="flex flex-col gap-3">
//               {[
//                 { label: "BLE Connectivity", val: 92, color: "bg-safe" },
//                 { label: "Relay Efficiency", val: 78, color: "bg-signal" },
//                 { label: "Packet Delivery Rate", val: 85, color: "bg-signal" },
//                 { label: "Duplicate Suppression", val: 100, color: "bg-safe" },
//               ].map((m) => (
//                 <div key={m.label}>
//                   <div className="flex justify-between text-xs mb-1">
//                     <span className="text-steel-400 font-mono">{m.label}</span>
//                     <span className="text-white font-mono font-500">
//                       {m.val}%
//                     </span>
//                   </div>
//                   <div className="h-1.5 bg-navy-800 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full ${m.color} rounded-full transition-all duration-1000`}
//                       style={{ width: `${m.val}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import SOSFeed from "../components/SOSFeed";
import SOSMap from "../components/SOSMap";
import PeerNode from "../components/PeerNode";

function StatCard({ label, value, sub, icon, color = "signal" }) {
  const colorMap = {
    signal: "border-signal/20 bg-signal/5 text-signal-glow",
    alert: "border-alert/20 bg-alert/5 text-alert",
    safe: "border-safe/20 bg-safe/5 text-safe",
    steel: "border-steel-400/20 bg-steel-400/5 text-steel-300",
  };
  return (
    <div className={`glass rounded-xl p-4 border ${colorMap[color]}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-steel-400 text-xs font-mono uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>
      </div>
      <div className="font-display font-700 text-xl text-white">{value}</div>
      {sub && (
        <div className="text-xs text-steel-400 mt-0.5 font-mono">{sub}</div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [tab, setTab] = useState("feed");

  return (
    <div className="min-h-screen pt-20 pb-12 px-5 lg:px-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-alert animate-ping" />
          <span className="font-mono text-xs text-alert uppercase tracking-wider">
            Live Network Feed
          </span>
        </div>
        <h1 className="font-display font-700 text-2xl md:text-3xl text-white">
          SOS Relay Dashboard
        </h1>
        <p className="text-steel-400 text-xs mt-0.5">
          Real-time overview of mesh relay activity, peer nodes, and propagated
          SOS events.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 animate-slide-up animate-delay-100">
        <StatCard
          label="Active Peers"
          value="4"
          sub="3 offline relay, 1 online"
          color="signal"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3"
              />
            </svg>
          }
        />
        <StatCard
          label="SOS Events"
          value="3"
          sub="2 active, 1 expired"
          color="alert"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          }
        />
        <StatCard
          label="Packets Forwarded"
          value="8"
          sub="1 reached internet"
          color="safe"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
              />
            </svg>
          }
        />
        <StatCard
          label="Max Hop Count"
          value="5"
          sub="avg 2.6 hops/message"
          color="steel"
          icon={
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          }
        />
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left: Map + Tabs */}
        <div className="lg:col-span-2 flex flex-col gap-4 animate-slide-up animate-delay-200">
          {/* Map */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-600 text-white text-sm">
                Mesh Topology
              </h2>
              <span className="text-xs font-mono text-steel-400">
                Simulated BLE network
              </span>
            </div>
            <SOSMap />
          </div>

          {/* SOS Feed with tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-600 text-white text-sm">
                Event Log
              </h2>
              <div className="flex gap-1 glass-light rounded-lg p-1">
                {["feed", "raw"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      tab === t
                        ? "bg-signal text-white"
                        : "text-steel-400 hover:text-white"
                    }`}
                  >
                    {t === "feed" ? "Events" : "Raw Packets"}
                  </button>
                ))}
              </div>
            </div>

            {tab === "feed" ? (
              <SOSFeed />
            ) : (
              <div className="glass rounded-xl p-4 font-mono text-xs text-steel-300 glow-border max-h-80 overflow-y-auto">
                <div className="text-steel-400 mb-2 text-xs uppercase tracking-wider">
                  Raw packet log
                </div>
                {[
                  { time: "10:20:01", id: "msg-001", hop: 3, ttl: 3597 },
                  { time: "10:18:44", id: "msg-001", hop: 2, ttl: 3598 },
                  { time: "10:17:22", id: "msg-001", hop: 1, ttl: 3599 },
                  { time: "10:12:05", id: "msg-002", hop: 1, ttl: 3599 },
                  { time: "10:06:11", id: "msg-003", hop: 5, ttl: 1792 },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-1.5 border-b border-signal/5 last:border-0"
                  >
                    <span className="text-steel-400 w-16">{r.time}</span>
                    <span className="text-signal-glow">[RECV]</span>
                    <span className="text-white">{r.id}</span>
                    <span className="text-steel-400">hop={r.hop}</span>
                    <span className="text-steel-400">ttl={r.ttl}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Peer list */}
        <div className="flex flex-col gap-3 animate-slide-up animate-delay-300">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-600 text-white text-sm">
              Nearby Peers
            </h2>
            <span className="text-xs font-mono text-steel-400">
              BLE radius ~50m
            </span>
          </div>

          <PeerNode />

          {/* Network health */}
          <div className="glass rounded-xl p-4 glow-border">
            <div className="font-display font-600 text-white text-xs mb-3 uppercase tracking-wide">
              Network Health
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "BLE Connectivity", val: 92, color: "bg-safe" },
                { label: "Relay Efficiency", val: 78, color: "bg-signal" },
                { label: "Packet Delivery Rate", val: 85, color: "bg-signal" },
                { label: "Duplicate Suppression", val: 100, color: "bg-safe" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-steel-400 font-mono">{m.label}</span>
                    <span className="text-white font-mono font-500">
                      {m.val}%
                    </span>
                  </div>
                  <div className="h-1 bg-navy-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${m.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${m.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
