// import { useState, useEffect, useRef } from "react";

// const EMERGENCY_TYPES = [
//   {
//     id: "MANUAL_SOS",
//     label: "Manual SOS",
//     icon: "⚠️",
//     desc: "General emergency trigger",
//   },
//   {
//     id: "MEDICAL",
//     label: "Medical Emergency",
//     icon: "🏥",
//     desc: "Injury, health crisis",
//   },
//   {
//     id: "FALL_DETECTED",
//     label: "Fall Detected",
//     icon: "📉",
//     desc: "Sensor-triggered fall",
//   },
//   {
//     id: "FIRE",
//     label: "Fire / Hazard",
//     icon: "🔥",
//     desc: "Fire or environmental danger",
//   },
// ];

// function generateUUID() {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0;
//     return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//   });
// }

// function buildPacket(type, location, payload) {
//   return {
//     message_id: generateUUID(),
//     origin_device_id: `device_${Math.random().toString(36).substring(2, 6)}`,
//     timestamp: new Date().toISOString(),
//     location: location || { lat: 12.9716, lon: 77.5946 },
//     ttl: 3600,
//     hop_count: 0,
//     emergency_type: type,
//     signature: `sha256:${Math.random().toString(36).substring(2, 30)}`,
//     payload: payload || `User triggered ${type}`,
//   };
// }

// // Simulated relay progress
// const RELAY_STEPS = [
//   { label: "Packet created & signed", icon: "✓", delay: 500 },
//   { label: "BLE advertising started", icon: "📡", delay: 1500 },
//   { label: "Received by device_b12c", icon: "📱", delay: 2800 },
//   { label: "Relayed by device_b12c → device_7e4a", icon: "↗", delay: 4200 },
//   { label: "device_7e4a has internet access", icon: "🌐", delay: 5500 },
//   { label: "Forwarded to emergency server", icon: "✓", delay: 6500 },
//   { label: "Emergency contacts notified", icon: "✓", delay: 7200 },
// ];

// export default function SendSOS() {
//   const [phase, setPhase] = useState("idle"); // idle | confirm | sending | success
//   const [selectedType, setSelectedType] = useState("MANUAL_SOS");
//   const [payload, setPayload] = useState("");
//   const [useLocation, setUseLocation] = useState(true);
//   const [packet, setPacket] = useState(null);
//   const [relaySteps, setRelaySteps] = useState([]);
//   const [holdProgress, setHoldProgress] = useState(0);
//   const holdTimer = useRef(null);
//   const holdInterval = useRef(null);

//   // Hold-to-send logic
//   const startHold = () => {
//     setHoldProgress(0);
//     const start = Date.now();
//     holdInterval.current = setInterval(() => {
//       const elapsed = Date.now() - start;
//       const pct = Math.min((elapsed / 1500) * 100, 100);
//       setHoldProgress(pct);
//       if (pct >= 100) {
//         clearInterval(holdInterval.current);
//         triggerSOS();
//       }
//     }, 30);
//   };

//   const cancelHold = () => {
//     clearInterval(holdInterval.current);
//     setHoldProgress(0);
//   };

//   const triggerSOS = () => {
//     const p = buildPacket(
//       selectedType,
//       useLocation ? { lat: 12.9716, lon: 77.5946 } : null,
//       payload
//     );
//     setPacket(p);
//     setPhase("sending");
//     setRelaySteps([]);

//     RELAY_STEPS.forEach((step, i) => {
//       setTimeout(() => {
//         setRelaySteps((prev) => [...prev, step]);
//         if (i === RELAY_STEPS.length - 1) {
//           setTimeout(() => setPhase("success"), 400);
//         }
//       }, step.delay);
//     });
//   };

//   const reset = () => {
//     setPhase("idle");
//     setPacket(null);
//     setRelaySteps([]);
//     setHoldProgress(0);
//     setPayload("");
//   };

//   return (
//     <div className="min-h-screen pt-20 pb-16 px-6 lg:px-10 max-w-5xl mx-auto">
//       {/* Header */}
//       <div className="mb-10 animate-slide-up">
//         <div className="flex items-center gap-2 mb-1">
//           <span className="w-2 h-2 rounded-full bg-alert animate-pulse" />
//           <span className="font-mono text-xs text-alert uppercase tracking-wider">
//             Emergency Interface
//           </span>
//         </div>
//         <h1 className="font-display font-700 text-3xl md:text-4xl text-white">
//           Send SOS
//         </h1>
//         <p className="text-steel-400 text-sm mt-1">
//           Trigger an emergency alert. The message will propagate through nearby
//           BLE devices.
//         </p>
//       </div>

//       {phase === "idle" && (
//         <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
//           {/* Left: Configuration */}
//           <div className="flex flex-col gap-5">
//             {/* Emergency type */}
//             <div className="glass rounded-xl p-5 glow-border">
//               <h2 className="font-display font-600 text-white text-sm mb-4 uppercase tracking-wide">
//                 Emergency Type
//               </h2>
//               <div className="grid grid-cols-2 gap-3">
//                 {EMERGENCY_TYPES.map((t) => (
//                   <button
//                     key={t.id}
//                     onClick={() => setSelectedType(t.id)}
//                     className={`rounded-lg p-3 text-left transition-all duration-200 border ${
//                       selectedType === t.id
//                         ? "border-alert bg-alert/10 glow-border-alert"
//                         : "border-signal/15 bg-navy-800/50 hover:border-signal/30"
//                     }`}
//                   >
//                     <div className="text-xl mb-1">{t.icon}</div>
//                     <div className="font-display font-600 text-white text-xs">
//                       {t.label}
//                     </div>
//                     <div className="text-steel-400 text-xs mt-0.5">
//                       {t.desc}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Optional message */}
//             <div className="glass rounded-xl p-5 glow-border">
//               <h2 className="font-display font-600 text-white text-sm mb-3 uppercase tracking-wide">
//                 Additional Info
//               </h2>
//               <textarea
//                 value={payload}
//                 onChange={(e) => setPayload(e.target.value)}
//                 placeholder="Optional: describe the emergency..."
//                 maxLength={200}
//                 rows={3}
//                 className="w-full bg-navy-900 border border-signal/20 rounded-lg px-4 py-3 text-steel-200 text-sm placeholder-steel-400/60 focus:outline-none focus:border-signal transition-colors font-body resize-none"
//               />
//               <div className="text-right text-xs font-mono text-steel-400 mt-1">
//                 {payload.length}/200
//               </div>
//             </div>

//             {/* Location toggle */}
//             <div className="glass rounded-xl p-5 glow-border">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="font-display font-600 text-white text-sm">
//                     Include GPS Location
//                   </h2>
//                   <p className="text-steel-400 text-xs mt-0.5">
//                     Attach your coordinates to the SOS packet
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setUseLocation((v) => !v)}
//                   className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
//                     useLocation
//                       ? "bg-signal"
//                       : "bg-navy-800 border border-signal/30"
//                   }`}
//                 >
//                   <span
//                     className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
//                       useLocation ? "left-5" : "left-0.5"
//                     }`}
//                   />
//                 </button>
//               </div>
//               {useLocation && (
//                 <div className="mt-3 font-mono text-xs text-steel-400 glass-light rounded-lg px-3 py-2">
//                   📍 12.9716° N, 77.5946° E — Mallathahalli, Bengaluru
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right: SOS button + preview */}
//           <div className="flex flex-col gap-5">
//             {/* The SOS button */}
//             <div className="glass rounded-xl p-8 glow-border flex flex-col items-center justify-center text-center">
//               <p className="text-steel-400 text-xs font-mono mb-8 uppercase tracking-widest">
//                 Hold to trigger
//               </p>

//               <div className="relative mb-8">
//                 {/* Outer rings */}
//                 <div
//                   className="absolute inset-0 rounded-full border-2 border-alert/20 animate-ping-slow"
//                   style={{ transform: "scale(1.4)" }}
//                 />
//                 <div
//                   className="absolute inset-0 rounded-full border border-alert/10 animate-ping-slow"
//                   style={{ transform: "scale(1.7)", animationDelay: "0.5s" }}
//                 />

//                 {/* Progress ring */}
//                 <svg
//                   className="absolute inset-0 w-full h-full -rotate-90"
//                   viewBox="0 0 100 100"
//                 >
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="46"
//                     fill="none"
//                     stroke="rgba(239,68,68,0.2)"
//                     strokeWidth="3"
//                   />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="46"
//                     fill="none"
//                     stroke="#ef4444"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeDasharray={`${2 * Math.PI * 46}`}
//                     strokeDashoffset={`${
//                       2 * Math.PI * 46 * (1 - holdProgress / 100)
//                     }`}
//                     className="transition-all duration-75"
//                   />
//                 </svg>

//                 <button
//                   onMouseDown={startHold}
//                   onMouseUp={cancelHold}
//                   onMouseLeave={cancelHold}
//                   onTouchStart={startHold}
//                   onTouchEnd={cancelHold}
//                   className="relative w-36 h-36 rounded-full bg-alert/10 border-2 border-alert/40 flex items-center justify-center flex-col gap-1 cursor-pointer select-none active:scale-95 transition-transform duration-100 hover:bg-alert/15 hover:border-alert/60"
//                   style={{
//                     boxShadow:
//                       holdProgress > 0
//                         ? `0 0 ${holdProgress / 3}px rgba(239,68,68,0.5)`
//                         : undefined,
//                   }}
//                 >
//                   <svg
//                     className="w-12 h-12 text-alert"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={1.5}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//                     />
//                   </svg>
//                   <span className="font-display font-700 text-alert text-sm tracking-wider">
//                     SOS
//                   </span>
//                 </button>
//               </div>

//               <p className="text-steel-400 text-xs font-mono">
//                 {holdProgress > 0
//                   ? `Triggering... ${Math.round(holdProgress)}%`
//                   : "Hold the button for 1.5 seconds to send"}
//               </p>
//             </div>

//             {/* Packet preview */}
//             <div className="glass rounded-xl p-5 glow-border">
//               <div className="font-display font-600 text-white text-sm mb-3 uppercase tracking-wide">
//                 Packet Preview
//               </div>
//               <pre className="font-mono text-xs text-steel-300 leading-5 overflow-x-auto">
//                 {JSON.stringify(
//                   {
//                     message_id: "uuid-will-generate",
//                     origin_device_id: "device_xxxx",
//                     timestamp: new Date().toISOString(),
//                     location: useLocation
//                       ? { lat: 12.9716, lon: 77.5946 }
//                       : null,
//                     ttl: 3600,
//                     hop_count: 0,
//                     emergency_type: selectedType,
//                     payload: payload || `User triggered ${selectedType}`,
//                   },
//                   null,
//                   2
//                 )}
//               </pre>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── SENDING PHASE ── */}
//       {(phase === "sending" || phase === "success") && (
//         <div className="max-w-2xl mx-auto animate-fade-in">
//           <div className="glass rounded-2xl p-8 glow-border-alert text-center mb-6">
//             {phase === "sending" ? (
//               <>
//                 <div className="relative w-20 h-20 mx-auto mb-6">
//                   <div className="absolute inset-0 rounded-full border-2 border-alert/30 sos-ring" />
//                   <div className="absolute inset-0 rounded-full border-2 border-alert/20 sos-ring-delay" />
//                   <div className="w-20 h-20 rounded-full bg-alert/10 border-2 border-alert/50 flex items-center justify-center">
//                     <svg
//                       className="w-10 h-10 text-alert animate-pulse"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={1.5}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <h2 className="font-display font-700 text-2xl text-white mb-2">
//                   Broadcasting SOS
//                 </h2>
//                 <p className="text-steel-400 text-sm">
//                   Propagating through nearby BLE devices…
//                 </p>
//               </>
//             ) : (
//               <>
//                 <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-safe/10 border-2 border-safe/50 flex items-center justify-center">
//                   <svg
//                     className="w-10 h-10 text-safe"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth={2}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h2 className="font-display font-700 text-2xl text-white mb-2">
//                   SOS Delivered
//                 </h2>
//                 <p className="text-steel-400 text-sm">
//                   Emergency contacts have been notified via relay network.
//                 </p>
//               </>
//             )}
//           </div>

//           {/* Relay trace */}
//           <div className="glass rounded-2xl p-6 glow-border mb-6">
//             <h3 className="font-display font-600 text-white text-sm mb-4 uppercase tracking-wide">
//               Relay Trace
//             </h3>
//             <div className="flex flex-col gap-2">
//               {relaySteps.map((step, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-3 stagger-item"
//                   style={{ animationDelay: `${i * 30}ms` }}
//                 >
//                   <div className="w-6 h-6 rounded-full bg-safe/10 border border-safe/30 flex items-center justify-center text-xs flex-shrink-0">
//                     {step.icon}
//                   </div>
//                   <span className="text-steel-300 text-sm font-mono">
//                     {step.label}
//                   </span>
//                 </div>
//               ))}
//               {phase === "sending" && (
//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 rounded-full bg-signal/10 border border-signal/30 flex items-center justify-center">
//                     <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
//                   </div>
//                   <span className="text-steel-400 text-sm font-mono">
//                     Propagating…
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Generated packet */}
//           {packet && (
//             <div className="glass rounded-2xl p-5 glow-border mb-6">
//               <h3 className="font-display font-600 text-white text-sm mb-3 uppercase tracking-wide">
//                 Generated Packet
//               </h3>
//               <pre className="font-mono text-xs text-steel-300 leading-5 overflow-x-auto">
//                 {JSON.stringify(packet, null, 2)}
//               </pre>
//             </div>
//           )}

//           {phase === "success" && (
//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={reset}
//                 className="border border-signal/30 hover:border-signal text-steel-300 hover:text-white font-display font-500 px-8 py-3 rounded-lg transition-all duration-200 hover:bg-signal/10"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={() => (window.location.href = "/dashboard")}
//                 className="bg-signal hover:bg-signal-light text-white font-display font-600 px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-signal/30"
//               >
//                 View Dashboard
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef } from "react";

const EMERGENCY_TYPES = [
  {
    id: "MANUAL_SOS",
    label: "Manual SOS",
    icon: "⚠️",
    desc: "General emergency trigger",
  },
  {
    id: "MEDICAL",
    label: "Medical Emergency",
    icon: "🏥",
    desc: "Injury, health crisis",
  },
  {
    id: "FALL_DETECTED",
    label: "Fall Detected",
    icon: "📉",
    desc: "Sensor-triggered fall",
  },
  {
    id: "FIRE",
    label: "Fire / Hazard",
    icon: "🔥",
    desc: "Fire or environmental danger",
  },
];

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function buildPacket(type, location, payload) {
  return {
    message_id: generateUUID(),
    origin_device_id: `device_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    location: location || { lat: 12.9716, lon: 77.5946 },
    ttl: 3600,
    hop_count: 0,
    emergency_type: type,
    signature: `sha256:${Math.random().toString(36).substring(2, 30)}`,
    payload: payload || `User triggered ${type}`,
  };
}

// Simulated relay progress
const RELAY_STEPS = [
  { label: "Packet created & signed", icon: "✓", delay: 500 },
  { label: "BLE advertising started", icon: "📡", delay: 1500 },
  { label: "Received by device_b12c", icon: "📱", delay: 2800 },
  { label: "Relayed by device_b12c → device_7e4a", icon: "↗", delay: 4200 },
  { label: "device_7e4a has internet access", icon: "🌐", delay: 5500 },
  { label: "Forwarded to emergency server", icon: "✓", delay: 6500 },
  { label: "Emergency contacts notified", icon: "✓", delay: 7200 },
];

export default function SendSOS() {
  const [phase, setPhase] = useState("idle"); // idle | confirm | sending | success
  const [selectedType, setSelectedType] = useState("MANUAL_SOS");
  const [payload, setPayload] = useState("");
  const [useLocation, setUseLocation] = useState(true);
  const [packet, setPacket] = useState(null);
  const [relaySteps, setRelaySteps] = useState([]);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdInterval = useRef(null);

  // Hold-to-send logic
  const startHold = () => {
    setHoldProgress(0);
    const start = Date.now();
    holdInterval.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / 1500) * 100, 100);
      setHoldProgress(pct);
      if (pct >= 100) {
        clearInterval(holdInterval.current);
        triggerSOS();
      }
    }, 30);
  };

  const cancelHold = () => {
    clearInterval(holdInterval.current);
    setHoldProgress(0);
  };

  const triggerSOS = () => {
    const p = buildPacket(
      selectedType,
      useLocation ? { lat: 12.9716, lon: 77.5946 } : null,
      payload
    );
    setPacket(p);
    setPhase("sending");
    setRelaySteps([]);

    RELAY_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setRelaySteps((prev) => [...prev, step]);
        if (i === RELAY_STEPS.length - 1) {
          setTimeout(() => setPhase("success"), 400);
        }
      }, step.delay);
    });
  };

  const reset = () => {
    setPhase("idle");
    setPacket(null);
    setRelaySteps([]);
    setHoldProgress(0);
    setPayload("");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-5 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-alert animate-pulse" />
          <span className="font-mono text-xs text-alert uppercase tracking-wider">
            Emergency Interface
          </span>
        </div>
        <h1 className="font-display font-700 text-2xl md:text-3xl text-white">
          Send SOS
        </h1>
        <p className="text-steel-400 text-xs mt-0.5">
          Trigger an emergency alert. The message will propagate through nearby
          BLE devices.
        </p>
      </div>

      {phase === "idle" && (
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-5 animate-fade-in">
          {/* Left: Configuration */}
          <div className="flex flex-col gap-3.5">
            {/* Emergency type */}
            <div className="glass rounded-xl p-3.5 sm:p-4 glow-border">
              <h2 className="font-display font-600 text-white text-xs mb-3 uppercase tracking-wide">
                Emergency Type
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {EMERGENCY_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`rounded-lg px-3 py-2.5 text-left transition-all duration-200 border min-h-[106px] flex flex-col items-start ${
                      selectedType === t.id
                        ? "border-alert bg-alert/10 glow-border-alert"
                        : "border-signal/15 bg-navy-800/50 hover:border-signal/30"
                    }`}
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-navy-900/80 text-sm leading-none">
                      {t.icon}
                    </div>
                    <div className="font-display font-600 text-white text-xs leading-tight">
                      {t.label}
                    </div>
                    <div className="mt-1 text-steel-400 text-[11px] leading-snug">
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional message */}
            <div className="glass rounded-xl p-3.5 sm:p-4 glow-border">
              <h2 className="font-display font-600 text-white text-xs mb-2 uppercase tracking-wide">
                Additional Info
              </h2>
              <textarea
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                placeholder="Optional: describe the emergency..."
                maxLength={200}
                rows={3}
                className="w-full bg-navy-900 border border-signal/20 rounded-lg px-3 py-2.5 text-xs leading-relaxed text-steel-200 placeholder-steel-400/60 focus:outline-none focus:border-signal transition-colors font-body resize-none"
              />
              <div className="text-right text-xs font-mono text-steel-400 mt-0.5">
                {payload.length}/200
              </div>
            </div>

            {/* Location toggle */}
            <div className="glass rounded-xl p-3.5 sm:p-4 glow-border">
              <div className="flex items-start justify-between gap-3">
                <div className="pr-2">
                  <h2 className="font-display font-600 text-white text-xs">
                    Include GPS Location
                  </h2>
                  <p className="text-steel-400 text-xs mt-0.5 leading-relaxed">
                    Attach your coordinates to the SOS packet
                  </p>
                </div>
                <button
                  onClick={() => setUseLocation((v) => !v)}
                  className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${
                    useLocation
                      ? "bg-signal"
                      : "bg-navy-800 border border-signal/30"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
                      useLocation ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
              {useLocation && (
                <div className="mt-2.5 font-mono text-xs text-steel-400 glass-light rounded-lg px-3 py-2 leading-relaxed">
                  📍 12.9716° N, 77.5946° E — Mallathahalli, Bengaluru
                </div>
              )}
            </div>
          </div>

          {/* Right: SOS button + preview */}
          <div className="flex flex-col gap-3.5">
            {/* The SOS button */}
            <div className="glass rounded-xl px-4 py-5 sm:px-5 sm:py-6 glow-border flex flex-col items-center justify-center text-center">
              <p className="text-steel-400 text-[11px] font-mono mb-4 uppercase tracking-[0.24em]">
                Hold to trigger
              </p>

              <div className="relative mb-4">
                {/* Outer rings */}
                <div
                  className="absolute inset-0 rounded-full border-2 border-alert/20 animate-ping-slow"
                  style={{ transform: "scale(1.4)" }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-alert/10 animate-ping-slow"
                  style={{ transform: "scale(1.7)", animationDelay: "0.5s" }}
                />

                {/* Progress ring */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(239,68,68,0.2)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 46 * (1 - holdProgress / 100)
                    }`}
                    className="transition-all duration-75"
                  />
                </svg>

                <button
                  onMouseDown={startHold}
                  onMouseUp={cancelHold}
                  onMouseLeave={cancelHold}
                  onTouchStart={startHold}
                  onTouchEnd={cancelHold}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-alert/10 border-2 border-alert/40 flex items-center justify-center flex-col gap-1 cursor-pointer select-none active:scale-95 transition-transform duration-100 hover:bg-alert/15 hover:border-alert/60"
                  style={{
                    boxShadow:
                      holdProgress > 0
                        ? `0 0 ${holdProgress / 3}px rgba(239,68,68,0.5)`
                        : undefined,
                  }}
                >
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-alert"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <span className="font-display font-700 text-alert text-[11px] sm:text-xs tracking-[0.2em]">
                    SOS
                  </span>
                </button>
              </div>

              <p className="max-w-[18rem] text-steel-400 text-xs leading-relaxed font-mono">
                {holdProgress > 0
                  ? `Triggering... ${Math.round(holdProgress)}%`
                  : "Hold the button for 1.5 seconds to send"}
              </p>
            </div>

            {/* Packet preview */}
            <div className="glass rounded-xl p-3.5 sm:p-4 glow-border">
              <div className="font-display font-600 text-white text-xs mb-2 uppercase tracking-wide">
                Packet Preview
              </div>
              <pre className="font-mono text-xs text-steel-300 leading-5 overflow-x-auto">
                {JSON.stringify(
                  {
                    message_id: "uuid-will-generate",
                    origin_device_id: "device_xxxx",
                    timestamp: new Date().toISOString(),
                    location: useLocation
                      ? { lat: 12.9716, lon: 77.5946 }
                      : null,
                    ttl: 3600,
                    hop_count: 0,
                    emergency_type: selectedType,
                    payload: payload || `User triggered ${selectedType}`,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ── SENDING PHASE ── */}
      {(phase === "sending" || phase === "success") && (
        <div className="max-w-xl mx-auto animate-fade-in">
          <div className="glass rounded-xl p-4 sm:p-5 glow-border-alert text-center mb-4">
            {phase === "sending" ? (
              <>
                <div className="relative w-14 h-14 mx-auto mb-3.5">
                  <div className="absolute inset-0 rounded-full border-2 border-alert/30 sos-ring" />
                  <div className="absolute inset-0 rounded-full border-2 border-alert/20 sos-ring-delay" />
                  <div className="w-14 h-14 rounded-full bg-alert/10 border-2 border-alert/50 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-alert animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="font-display font-700 text-lg text-white mb-1">
                  Broadcasting SOS
                </h2>
                <p className="text-steel-400 text-xs leading-relaxed">
                  Propagating through nearby BLE devices…
                </p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-safe/10 border-2 border-safe/50 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-safe"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="font-display font-700 text-lg text-white mb-1">
                  SOS Delivered
                </h2>
                <p className="text-steel-400 text-xs leading-relaxed">
                  Emergency contacts have been notified via relay network.
                </p>
              </>
            )}
          </div>

          {/* Relay trace */}
          <div className="glass rounded-xl p-3.5 sm:p-4 glow-border mb-4">
            <h3 className="font-display font-600 text-white text-xs mb-3 uppercase tracking-wide">
              Relay Trace
            </h3>
            <div className="flex flex-col gap-2">
              {relaySteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 glass-light stagger-item"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-safe/10 border border-safe/30 flex items-center justify-center text-[11px] flex-shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-steel-300 text-xs leading-relaxed font-mono">
                    {step.label}
                  </span>
                </div>
              ))}
              {phase === "sending" && (
                <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 glass-light">
                  <div className="w-6 h-6 rounded-full bg-signal/10 border border-signal/30 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-ping" />
                  </div>
                  <span className="text-steel-400 text-xs leading-relaxed font-mono">
                    Propagating…
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Generated packet */}
          {packet && (
            <div className="glass rounded-xl p-3.5 sm:p-4 glow-border mb-4">
              <h3 className="font-display font-600 text-white text-xs mb-2 uppercase tracking-wide">
                Generated Packet
              </h3>
              <pre className="font-mono text-xs text-steel-300 leading-5 overflow-x-auto">
                {JSON.stringify(packet, null, 2)}
              </pre>
            </div>
          )}

          {phase === "success" && (
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={reset}
                className="border border-signal/30 hover:border-signal text-steel-300 hover:text-white font-display font-500 px-6 py-2 rounded-lg transition-all duration-200 hover:bg-signal/10 text-sm"
              >
                Back
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-signal hover:bg-signal-light text-white font-display font-600 px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-signal/30 text-sm"
              >
                View Dashboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
