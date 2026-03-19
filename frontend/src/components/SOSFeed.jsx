// import { useState, useEffect } from "react";

// const MOCK_EVENTS = [
//   {
//     id: "msg-001",
//     origin: "device_9a3f",
//     type: "MANUAL_SOS",
//     location: { lat: 12.9716, lon: 77.5946, name: "Mallathahalli, Bengaluru" },
//     hops: 3,
//     ttl: 3600,
//     timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
//     status: "relayed",
//     relayedBy: ["device_b12c", "device_7e4a", "device_current"],
//   },
//   {
//     id: "msg-002",
//     origin: "device_c5d2",
//     type: "FALL_DETECTED",
//     location: { lat: 12.935, lon: 77.6101, name: "Rajajinagar, Bengaluru" },
//     hops: 1,
//     ttl: 3600,
//     timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
//     status: "forwarded",
//     relayedBy: ["device_c5d2"],
//   },
//   {
//     id: "msg-003",
//     origin: "device_ff01",
//     type: "MANUAL_SOS",
//     location: { lat: 12.9279, lon: 77.6271, name: "Indiranagar, Bengaluru" },
//     hops: 5,
//     ttl: 1800,
//     timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
//     status: "expired",
//     relayedBy: [
//       "device_a1",
//       "device_b2",
//       "device_c3",
//       "device_d4",
//       "device_ff01",
//     ],
//   },
// ];

// const STATUS_CONFIG = {
//   relayed: {
//     label: "Relaying",
//     color: "text-signal-glow",
//     bg: "bg-signal/10",
//     dot: "bg-signal",
//   },
//   forwarded: {
//     label: "Forwarded",
//     color: "text-safe",
//     bg: "bg-safe/10",
//     dot: "bg-safe",
//   },
//   expired: {
//     label: "Expired",
//     color: "text-steel-400",
//     bg: "bg-steel-400/10",
//     dot: "bg-steel-400",
//   },
// };

// const TYPE_LABEL = {
//   MANUAL_SOS: "Manual SOS",
//   FALL_DETECTED: "Fall Detected",
// };

// function timeAgo(iso) {
//   const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
//   if (diff < 60) return `${diff}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   return `${Math.floor(diff / 3600)}h ago`;
// }

// export default function SOSFeed({ compact = false }) {
//   const [events, setEvents] = useState(MOCK_EVENTS);
//   const [newAlert, setNewAlert] = useState(false);

//   // Simulate a new incoming SOS every 20 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const fakeEvent = {
//         id: `msg-${Date.now()}`,
//         origin: `device_${Math.random().toString(36).substring(2, 6)}`,
//         type: Math.random() > 0.4 ? "MANUAL_SOS" : "FALL_DETECTED",
//         location: {
//           lat: 12.97 + Math.random() * 0.05,
//           lon: 77.59 + Math.random() * 0.05,
//           name: "Nearby, Bengaluru",
//         },
//         hops: Math.floor(Math.random() * 4) + 1,
//         ttl: 3600,
//         timestamp: new Date().toISOString(),
//         status: "relayed",
//         relayedBy: ["device_new"],
//       };
//       setEvents((prev) => [fakeEvent, ...prev.slice(0, 9)]);
//       setNewAlert(true);
//       setTimeout(() => setNewAlert(false), 3000);
//     }, 20000);
//     return () => clearInterval(interval);
//   }, []);

//   const displayEvents = compact ? events.slice(0, 4) : events;

//   return (
//     <div className="flex flex-col gap-3">
//       {newAlert && (
//         <div className="glass glow-border-alert rounded-lg px-4 py-2.5 flex items-center gap-3 animate-slide-in-right">
//           <span className="w-2 h-2 rounded-full bg-alert animate-ping" />
//           <span className="text-sm font-mono text-alert">
//             New SOS packet received
//           </span>
//         </div>
//       )}

//       {displayEvents.map((ev, idx) => {
//         const st = STATUS_CONFIG[ev.status];
//         return (
//           <div
//             key={ev.id}
//             className="glass rounded-xl p-4 hover:border-signal/30 transition-all duration-200 stagger-item"
//             style={{ animationDelay: `${idx * 60}ms` }}
//           >
//             <div className="flex items-start justify-between gap-3 mb-3">
//               <div className="flex items-center gap-2.5">
//                 <div
//                   className={`w-8 h-8 rounded-lg ${
//                     ev.type === "MANUAL_SOS"
//                       ? "bg-alert/10"
//                       : "bg-yellow-500/10"
//                   } flex items-center justify-center flex-shrink-0`}
//                 >
//                   {ev.type === "MANUAL_SOS" ? (
//                     <svg
//                       className="w-4 h-4 text-alert"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       className="w-4 h-4 text-yellow-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
//                       />
//                     </svg>
//                   )}
//                 </div>
//                 <div>
//                   <div className="font-display font-600 text-white text-sm">
//                     {TYPE_LABEL[ev.type] || ev.type}
//                   </div>
//                   <div className="font-mono text-xs text-steel-400">
//                     {ev.origin}
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${st.bg} flex-shrink-0`}
//               >
//                 <span
//                   className={`w-1.5 h-1.5 rounded-full ${st.dot} ${
//                     ev.status === "relayed" ? "animate-pulse" : ""
//                   }`}
//                 />
//                 <span className={`text-xs font-mono ${st.color}`}>
//                   {st.label}
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-3 text-xs">
//               <div>
//                 <div className="text-steel-400 mb-0.5">Location</div>
//                 <div className="text-steel-200 font-mono truncate">
//                   {ev.location.name}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-steel-400 mb-0.5">Hops</div>
//                 <div className="text-steel-200 font-mono">
//                   {ev.hops} / TTL {ev.ttl}s
//                 </div>
//               </div>
//               <div>
//                 <div className="text-steel-400 mb-0.5">Received</div>
//                 <div className="text-steel-200 font-mono">
//                   {timeAgo(ev.timestamp)}
//                 </div>
//               </div>
//             </div>

//             {!compact && ev.relayedBy.length > 0 && (
//               <div className="mt-3 pt-3 border-t border-signal/10">
//                 <div className="text-xs text-steel-400 mb-1.5">Relay chain</div>
//                 <div className="flex items-center gap-1.5 flex-wrap">
//                   {ev.relayedBy.map((d, i) => (
//                     <div key={d} className="flex items-center gap-1">
//                       <span className="bg-navy-800 border border-signal/20 rounded px-2 py-0.5 font-mono text-xs text-steel-300">
//                         {d}
//                       </span>
//                       {i < ev.relayedBy.length - 1 && (
//                         <svg
//                           className="w-3 h-3 text-signal/40"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M9 5l7 7-7 7"
//                           />
//                         </svg>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

const MOCK_EVENTS = [
  {
    id: "msg-001",
    origin: "device_9a3f",
    type: "MANUAL_SOS",
    location: { lat: 12.9716, lon: 77.5946, name: "Mallathahalli, Bengaluru" },
    hops: 3,
    ttl: 3600,
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    status: "relayed",
    relayedBy: ["device_b12c", "device_7e4a", "device_current"],
  },
  {
    id: "msg-002",
    origin: "device_c5d2",
    type: "FALL_DETECTED",
    location: { lat: 12.935, lon: 77.6101, name: "Rajajinagar, Bengaluru" },
    hops: 1,
    ttl: 3600,
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    status: "forwarded",
    relayedBy: ["device_c5d2"],
  },
  {
    id: "msg-003",
    origin: "device_ff01",
    type: "MANUAL_SOS",
    location: { lat: 12.9279, lon: 77.6271, name: "Indiranagar, Bengaluru" },
    hops: 5,
    ttl: 1800,
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    status: "expired",
    relayedBy: [
      "device_a1",
      "device_b2",
      "device_c3",
      "device_d4",
      "device_ff01",
    ],
  },
];

const STATUS_CONFIG = {
  relayed: {
    label: "Relaying",
    color: "text-signal-glow",
    bg: "bg-signal/10",
    dot: "bg-signal",
  },
  forwarded: {
    label: "Forwarded",
    color: "text-safe",
    bg: "bg-safe/10",
    dot: "bg-safe",
  },
  expired: {
    label: "Expired",
    color: "text-steel-400",
    bg: "bg-steel-400/10",
    dot: "bg-steel-400",
  },
};

const TYPE_LABEL = {
  MANUAL_SOS: "Manual SOS",
  FALL_DETECTED: "Fall Detected",
};

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function SOSFeed({ compact = false }) {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [newAlert, setNewAlert] = useState(false);

  // Simulate a new incoming SOS every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const fakeEvent = {
        id: `msg-${Date.now()}`,
        origin: `device_${Math.random().toString(36).substring(2, 6)}`,
        type: Math.random() > 0.4 ? "MANUAL_SOS" : "FALL_DETECTED",
        location: {
          lat: 12.97 + Math.random() * 0.05,
          lon: 77.59 + Math.random() * 0.05,
          name: "Nearby, Bengaluru",
        },
        hops: Math.floor(Math.random() * 4) + 1,
        ttl: 3600,
        timestamp: new Date().toISOString(),
        status: "relayed",
        relayedBy: ["device_new"],
      };
      setEvents((prev) => [fakeEvent, ...prev.slice(0, 9)]);
      setNewAlert(true);
      setTimeout(() => setNewAlert(false), 3000);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const displayEvents = compact ? events.slice(0, 4) : events;

  return (
    <div className="flex flex-col gap-3">
      {newAlert && (
        <div className="glass glow-border-alert rounded-lg px-4 py-2.5 flex items-center gap-3 animate-slide-in-right">
          <span className="w-2 h-2 rounded-full bg-alert animate-ping" />
          <span className="text-sm font-mono text-alert">
            New SOS packet received
          </span>
        </div>
      )}

      {displayEvents.map((ev, idx) => {
        const st = STATUS_CONFIG[ev.status];
        return (
          <div
            key={ev.id}
            className="glass rounded-lg p-3 hover:border-signal/30 transition-all duration-200 stagger-item"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg ${
                    ev.type === "MANUAL_SOS"
                      ? "bg-alert/10"
                      : "bg-yellow-500/10"
                  } flex items-center justify-center flex-shrink-0`}
                >
                  {ev.type === "MANUAL_SOS" ? (
                    <svg
                      className="w-3.5 h-3.5 text-alert"
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
                  ) : (
                    <svg
                      className="w-3.5 h-3.5 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-display font-600 text-white text-xs">
                    {TYPE_LABEL[ev.type] || ev.type}
                  </div>
                  <div className="font-mono text-xs text-steel-400">
                    {ev.origin}
                  </div>
                </div>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${st.bg} flex-shrink-0`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${st.dot} ${
                    ev.status === "relayed" ? "animate-pulse" : ""
                  }`}
                />
                <span className={`text-xs font-mono ${st.color}`}>
                  {st.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-steel-400 mb-0.5 text-xs">Location</div>
                <div className="text-steel-200 font-mono truncate text-xs">
                  {ev.location.name}
                </div>
              </div>
              <div>
                <div className="text-steel-400 mb-0.5 text-xs">Hops</div>
                <div className="text-steel-200 font-mono text-xs">
                  {ev.hops} / TTL {ev.ttl}s
                </div>
              </div>
              <div>
                <div className="text-steel-400 mb-0.5 text-xs">Received</div>
                <div className="text-steel-200 font-mono text-xs">
                  {timeAgo(ev.timestamp)}
                </div>
              </div>
            </div>

            {!compact && ev.relayedBy.length > 0 && (
              <div className="mt-2 pt-2 border-t border-signal/10">
                <div className="text-xs text-steel-400 mb-1">Relay chain</div>
                <div className="flex items-center gap-1 flex-wrap">
                  {ev.relayedBy.map((d, i) => (
                    <div key={d} className="flex items-center gap-0.5">
                      <span className="bg-navy-800 border border-signal/20 rounded px-1.5 py-0.5 font-mono text-xs text-steel-300">
                        {d}
                      </span>
                      {i < ev.relayedBy.length - 1 && (
                        <svg
                          className="w-2.5 h-2.5 text-signal/40"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
