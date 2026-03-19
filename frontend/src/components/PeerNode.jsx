// import { useState, useEffect } from "react";

// const INITIAL_PEERS = [
//   {
//     id: "device_b12c",
//     rssi: -58,
//     hops: 1,
//     hasInternet: true,
//     lastSeen: 4,
//     relayed: 2,
//   },
//   {
//     id: "device_7e4a",
//     rssi: -72,
//     hops: 1,
//     hasInternet: false,
//     lastSeen: 12,
//     relayed: 5,
//   },
//   {
//     id: "device_9f3d",
//     rssi: -45,
//     hops: 1,
//     hasInternet: false,
//     lastSeen: 1,
//     relayed: 0,
//   },
//   {
//     id: "device_cc01",
//     rssi: -85,
//     hops: 2,
//     hasInternet: false,
//     lastSeen: 30,
//     relayed: 1,
//   },
// ];

// function rssiToStrength(rssi) {
//   if (rssi >= -60) return { bars: 3, label: "Strong", color: "text-safe" };
//   if (rssi >= -75)
//     return { bars: 2, label: "Medium", color: "text-yellow-400" };
//   return { bars: 1, label: "Weak", color: "text-alert" };
// }

// function SignalBars({ bars, color }) {
//   return (
//     <div className={`flex items-end gap-0.5 ${color}`}>
//       {[1, 2, 3].map((b) => (
//         <div
//           key={b}
//           className={`rounded-sm w-1.5 transition-all ${
//             b <= bars ? "opacity-100" : "opacity-20"
//           }`}
//           style={{ height: `${b * 4 + 2}px`, backgroundColor: "currentColor" }}
//         />
//       ))}
//     </div>
//   );
// }

// export default function PeerNode() {
//   const [peers, setPeers] = useState(INITIAL_PEERS);
//   const [scanning, setScanning] = useState(true);

//   // Simulate BLE scan updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPeers((prev) =>
//         prev.map((p) => ({
//           ...p,
//           rssi: p.rssi + Math.floor(Math.random() * 6 - 3),
//           lastSeen: Math.max(1, p.lastSeen + Math.floor(Math.random() * 3 - 1)),
//         }))
//       );
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // Occasionally add/remove a peer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const shouldAdd = Math.random() > 0.5;
//       if (shouldAdd && peers.length < 6) {
//         setPeers((prev) => [
//           ...prev,
//           {
//             id: `device_${Math.random().toString(36).substring(2, 6)}`,
//             rssi: -50 - Math.floor(Math.random() * 40),
//             hops: 1,
//             hasInternet: Math.random() > 0.7,
//             lastSeen: 1,
//             relayed: 0,
//           },
//         ]);
//       } else if (!shouldAdd && peers.length > 2) {
//         setPeers((prev) => prev.slice(0, -1));
//       }
//     }, 12000);
//     return () => clearInterval(interval);
//   }, [peers.length]);

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Scan header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span
//             className={`w-2 h-2 rounded-full ${
//               scanning ? "bg-signal animate-pulse" : "bg-steel-400"
//             }`}
//           />
//           <span className="text-xs font-mono text-steel-400">
//             {scanning ? "BLE Scanning…" : "Scan paused"}
//           </span>
//         </div>
//         <button
//           onClick={() => setScanning((s) => !s)}
//           className="text-xs font-mono text-signal-glow hover:text-white transition-colors"
//         >
//           {scanning ? "Pause" : "Resume"}
//         </button>
//       </div>

//       {peers.map((peer, idx) => {
//         const sig = rssiToStrength(peer.rssi);
//         return (
//           <div
//             key={peer.id}
//             className="glass rounded-xl p-4 hover:border-signal/30 transition-all duration-200 stagger-item"
//             style={{ animationDelay: `${idx * 50}ms` }}
//           >
//             <div className="flex items-center justify-between mb-3">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-8 h-8 rounded-lg bg-navy-800 border border-signal/20 flex items-center justify-center">
//                   <svg
//                     className="w-4 h-4 text-signal-glow"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={1.8}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="font-mono text-xs text-white">{peer.id}</div>
//                   <div className="text-xs text-steel-400">
//                     Hop {peer.hops} • {peer.lastSeen}s ago
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <SignalBars bars={sig.bars} color={sig.color} />
//                 {peer.hasInternet && (
//                   <div
//                     className="w-5 h-5 rounded bg-safe/10 flex items-center justify-center"
//                     title="Has internet"
//                   >
//                     <svg
//                       className="w-3 h-3 text-safe"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"
//                       />
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex items-center justify-between text-xs">
//               <span className={`font-mono ${sig.color}`}>
//                 {peer.rssi} dBm • {sig.label}
//               </span>
//               <span className="text-steel-400 font-mono">
//                 {peer.relayed} packets relayed
//               </span>
//             </div>
//           </div>
//         );
//       })}

//       {peers.length === 0 && (
//         <div className="glass rounded-xl p-8 text-center">
//           <div className="text-steel-400 font-mono text-sm">
//             No peers discovered
//           </div>
//           <div className="text-steel-400 text-xs mt-1">
//             Scanning for BLE devices…
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

const INITIAL_PEERS = [
  {
    id: "device_b12c",
    rssi: -58,
    hops: 1,
    hasInternet: true,
    lastSeen: 4,
    relayed: 2,
  },
  {
    id: "device_7e4a",
    rssi: -72,
    hops: 1,
    hasInternet: false,
    lastSeen: 12,
    relayed: 5,
  },
  {
    id: "device_9f3d",
    rssi: -45,
    hops: 1,
    hasInternet: false,
    lastSeen: 1,
    relayed: 0,
  },
  {
    id: "device_cc01",
    rssi: -85,
    hops: 2,
    hasInternet: false,
    lastSeen: 30,
    relayed: 1,
  },
];

function rssiToStrength(rssi) {
  if (rssi >= -60) return { bars: 3, label: "Strong", color: "text-safe" };
  if (rssi >= -75)
    return { bars: 2, label: "Medium", color: "text-yellow-400" };
  return { bars: 1, label: "Weak", color: "text-alert" };
}

function SignalBars({ bars, color }) {
  return (
    <div className={`flex items-end gap-0.5 ${color}`}>
      {[1, 2, 3].map((b) => (
        <div
          key={b}
          className={`rounded-sm w-1.5 transition-all ${
            b <= bars ? "opacity-100" : "opacity-20"
          }`}
          style={{ height: `${b * 4 + 2}px`, backgroundColor: "currentColor" }}
        />
      ))}
    </div>
  );
}

export default function PeerNode() {
  const [peers, setPeers] = useState(INITIAL_PEERS);
  const [scanning, setScanning] = useState(true);

  // Simulate BLE scan updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPeers((prev) =>
        prev.map((p) => ({
          ...p,
          rssi: p.rssi + Math.floor(Math.random() * 6 - 3),
          lastSeen: Math.max(1, p.lastSeen + Math.floor(Math.random() * 3 - 1)),
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Occasionally add/remove a peer
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldAdd = Math.random() > 0.5;
      if (shouldAdd && peers.length < 6) {
        setPeers((prev) => [
          ...prev,
          {
            id: `device_${Math.random().toString(36).substring(2, 6)}`,
            rssi: -50 - Math.floor(Math.random() * 40),
            hops: 1,
            hasInternet: Math.random() > 0.7,
            lastSeen: 1,
            relayed: 0,
          },
        ]);
      } else if (!shouldAdd && peers.length > 2) {
        setPeers((prev) => prev.slice(0, -1));
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [peers.length]);

  return (
    <div className="flex flex-col gap-3">
      {/* Scan header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              scanning ? "bg-signal animate-pulse" : "bg-steel-400"
            }`}
          />
          <span className="text-xs font-mono text-steel-400">
            {scanning ? "BLE Scanning…" : "Scan paused"}
          </span>
        </div>
        <button
          onClick={() => setScanning((s) => !s)}
          className="text-xs font-mono text-signal-glow hover:text-white transition-colors"
        >
          {scanning ? "Pause" : "Resume"}
        </button>
      </div>

      {peers.map((peer, idx) => {
        const sig = rssiToStrength(peer.rssi);
        return (
          <div
            key={peer.id}
            className="glass rounded-lg p-3 hover:border-signal/30 transition-all duration-200 stagger-item"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-navy-800 border border-signal/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-signal-glow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-mono text-xs text-white leading-tight">
                    {peer.id}
                  </div>
                  <div className="text-xs text-steel-400">
                    Hop {peer.hops} · {peer.lastSeen}s ago
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <SignalBars bars={sig.bars} color={sig.color} />
                {peer.hasInternet && (
                  <div
                    className="w-4 h-4 rounded bg-safe/10 flex items-center justify-center"
                    title="Has internet"
                  >
                    <svg
                      className="w-2.5 h-2.5 text-safe"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={`font-mono ${sig.color}`}>
                {peer.rssi} dBm · {sig.label}
              </span>
              <span className="text-steel-400 font-mono">
                {peer.relayed} relayed
              </span>
            </div>
          </div>
        );
      })}

      {peers.length === 0 && (
        <div className="glass rounded-xl p-8 text-center">
          <div className="text-steel-400 font-mono text-sm">
            No peers discovered
          </div>
          <div className="text-steel-400 text-xs mt-1">
            Scanning for BLE devices…
          </div>
        </div>
      )}
    </div>
  );
}
