// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// /* ── Animated mesh network SVG ── */
// function MeshNetwork() {
//   const nodes = [
//     { x: 50, y: 50, active: true },
//     { x: 20, y: 30, active: true },
//     { x: 80, y: 25, active: false },
//     { x: 15, y: 70, active: false },
//     { x: 85, y: 70, active: true },
//     { x: 50, y: 85, active: false },
//     { x: 35, y: 15, active: false },
//     { x: 65, y: 60, active: true },
//   ];
//   const edges = [
//     [0, 1],
//     [0, 2],
//     [0, 4],
//     [0, 7],
//     [1, 3],
//     [1, 6],
//     [2, 4],
//     [2, 6],
//     [3, 5],
//     [4, 5],
//     [4, 7],
//     [5, 7],
//   ];

//   return (
//     <svg
//       viewBox="0 0 100 100"
//       className="w-full h-full"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <defs>
//         <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
//           <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
//         </radialGradient>
//         <filter id="glow">
//           <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
//           <feMerge>
//             <feMergeNode in="coloredBlur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>

//       {/* Edges */}
//       {edges.map(([a, b], i) => (
//         <line
//           key={i}
//           x1={nodes[a].x}
//           y1={nodes[a].y}
//           x2={nodes[b].x}
//           y2={nodes[b].y}
//           stroke="rgba(37,99,235,0.25)"
//           strokeWidth="0.4"
//           className="line-pulse"
//           style={{ animationDelay: `${i * 0.15}s` }}
//         />
//       ))}

//       {/* Nodes */}
//       {nodes.map((n, i) => (
//         <g key={i}>
//           {n.active && (
//             <>
//               <circle
//                 cx={n.x}
//                 cy={n.y}
//                 r="4"
//                 fill="rgba(37,99,235,0.15)"
//                 className="sos-ring"
//                 style={{ animationDelay: `${i * 0.3}s` }}
//               />
//               <circle
//                 cx={n.x}
//                 cy={n.y}
//                 r="4"
//                 fill="rgba(37,99,235,0.08)"
//                 className="sos-ring-delay"
//                 style={{ animationDelay: `${i * 0.3 + 0.3}s` }}
//               />
//             </>
//           )}
//           <circle
//             cx={n.x}
//             cy={n.y}
//             r="2"
//             fill={n.active ? "#2563eb" : "#163470"}
//             stroke={n.active ? "#60a5fa" : "#2563eb"}
//             strokeWidth="0.5"
//             filter="url(#glow)"
//           />
//         </g>
//       ))}

//       {/* SOS origin node highlight */}
//       <circle
//         cx="50"
//         cy="50"
//         r="3.5"
//         fill="#ef4444"
//         stroke="#fca5a5"
//         strokeWidth="0.5"
//         filter="url(#glow)"
//       />
//       <text
//         x="52"
//         y="46"
//         fontSize="3"
//         fill="#fca5a5"
//         fontFamily="JetBrains Mono"
//       >
//         SOS
//       </text>
//     </svg>
//   );
// }

// /* ── Counter animation ── */
// function AnimatedStat({ value, suffix, label }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (!entry.isIntersecting) return;
//       observer.disconnect();
//       let start = 0;
//       const duration = 1500;
//       const step = (timestamp) => {
//         if (!start) start = timestamp;
//         const progress = Math.min((timestamp - start) / duration, 1);
//         const eased = 1 - Math.pow(1 - progress, 3);
//         setCount(Math.floor(eased * value));
//         if (progress < 1) requestAnimationFrame(step);
//       };
//       requestAnimationFrame(step);
//     });
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [value]);

//   return (
//     <div ref={ref} className="text-center">
//       <div className="font-display font-800 text-4xl md:text-5xl text-white">
//         {count}
//         {suffix}
//       </div>
//       <div className="text-steel-400 text-sm mt-1 font-body">{label}</div>
//     </div>
//   );
// }

// /* ── Feature card ── */
// function FeatureCard({ icon, title, desc, delay }) {
//   return (
//     <div
//       className="card glow-border hover:border-signal/50 transition-all duration-300 group stagger-item"
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       <div className="w-12 h-12 rounded-lg bg-signal/10 flex items-center justify-center mb-4 group-hover:bg-signal/20 transition-colors duration-200">
//         {icon}
//       </div>
//       <h3 className="font-display font-600 text-white text-lg mb-2">{title}</h3>
//       <p className="text-steel-400 text-sm leading-relaxed">{desc}</p>
//     </div>
//   );
// }

// /* ── Step card for How It Works ── */
// function StepCard({ num, title, desc, delay }) {
//   return (
//     <div
//       className="relative flex gap-5 stagger-item"
//       style={{ animationDelay: `${delay}ms` }}
//     >
//       <div className="flex flex-col items-center">
//         <div className="w-10 h-10 rounded-full bg-signal/20 glow-border flex items-center justify-center flex-shrink-0">
//           <span className="font-mono font-600 text-signal-glow text-sm">
//             {String(num).padStart(2, "0")}
//           </span>
//         </div>
//         {num < 5 && (
//           <div className="w-px flex-1 mt-2 bg-gradient-to-b from-signal/30 to-transparent" />
//         )}
//       </div>
//       <div className="pb-8">
//         <h4 className="font-display font-600 text-white text-base mb-1">
//           {title}
//         </h4>
//         <p className="text-steel-400 text-sm leading-relaxed">{desc}</p>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    MAIN LANDING PAGE
// ══════════════════════════════════════════════════════ */
// export default function Landing() {
//   const [heroVisible, setHeroVisible] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setHeroVisible(true), 100);
//     return () => clearTimeout(t);
//   }, []);

//   const features = [
//     {
//       icon: (
//         <svg
//           className="w-6 h-6 text-signal-glow"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.8}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
//           />
//         </svg>
//       ),
//       title: "Zero Internet Required",
//       desc: "Messages propagate through Bluetooth peer-to-peer hops — no cellular, no Wi-Fi, no infrastructure needed.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-6 h-6 text-signal-glow"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.8}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
//           />
//         </svg>
//       ),
//       title: "Multi-Hop Relay",
//       desc: "SOS packets travel device-to-device. Each phone becomes a relay node extending the signal's reach exponentially.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-6 h-6 text-signal-glow"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.8}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
//           />
//         </svg>
//       ),
//       title: "Encrypted Packets",
//       desc: "Every SOS packet is digitally signed and AES-encrypted. Fake alerts are cryptographically rejected at every hop.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-6 h-6 text-signal-glow"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.8}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       ),
//       title: "TTL Flood Control",
//       desc: "Time-To-Live counters and message-ID caching prevent duplicate flooding. Every hop decrements the counter.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-6 h-6 text-signal-glow"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.8}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//           />
//         </svg>
//       ),
//       title: "GPS Location Tagging",
//       desc: "Packets carry GPS coordinates (when available) so responders know exactly where the distress originated.",
//     },
//     {
//       icon: (
//         <svg
//           className="w-6 h-6 text-signal-glow"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={1.8}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 15.75V21h5.25M3 8.25V3h5.25M21 15.75V21h-5.25M21 8.25V3h-5.25M9 12h6M12 9v6"
//           />
//         </svg>
//       ),
//       title: "Internet Escalation",
//       desc: "Once the message reaches an internet-connected relay, it's instantly pushed to emergency contacts and the central server.",
//     },
//   ];

//   const steps = [
//     {
//       title: "SOS Triggered",
//       desc: "User manually triggers SOS or sensors detect a fall. An encrypted packet is created with ID, timestamp, GPS, and TTL.",
//     },
//     {
//       title: "BLE Broadcast",
//       desc: "The device advertises the SOS packet over Bluetooth Low Energy. Nearby phones with the app discover it automatically.",
//     },
//     {
//       title: "Store & Forward",
//       desc: "Each receiving device checks its cache. If the message is new, it stores it, increments hop count, and rebroadcasts it.",
//     },
//     {
//       title: "Mesh Propagation",
//       desc: "The signal hops through the crowd, creating an opportunistic delay-tolerant network without any central server.",
//     },
//     {
//       title: "Internet Handoff",
//       desc: "When the packet reaches a device with connectivity, it's forwarded to the backend — notifying contacts and authorities.",
//     },
//   ];

//   return (
//     <main className="min-h-screen">
//       {/* ── HERO ── */}
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
//         {/* Background layers */}
//         <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
//         <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-signal/5 rounded-full blur-3xl pointer-events-none" />

//         <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
//           {/* Left: text */}
//           <div>
//             {/* Badge */}
//             <div
//               className={`inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-8 transition-all duration-700 ${
//                 heroVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-4"
//               }`}
//             >
//               <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
//               <span className="text-steel-300 text-xs font-mono tracking-wider uppercase">
//                 Decentralized Emergency Network
//               </span>
//             </div>

//             <h1
//               className={`font-display font-800 text-5xl md:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-100 ${
//                 heroVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-6"
//               }`}
//             >
//               <span className="text-white">When networks</span>
//               <br />
//               <span className="text-white">fail,</span>{" "}
//               <span className="text-gradient">people</span>
//               <br />
//               <span className="text-gradient">shouldn't.</span>
//             </h1>

//             <p
//               className={`text-steel-400 text-lg leading-relaxed mb-10 max-w-md transition-all duration-700 delay-200 ${
//                 heroVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-6"
//               }`}
//             >
//               SOS Relay uses Bluetooth mesh networking to propagate emergency
//               signals through nearby devices — no internet, no cellular, no
//               infrastructure required.
//             </p>

//             <div
//               className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
//                 heroVisible
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-6"
//               }`}
//             >
//               <Link
//                 to="/sos"
//                 className="relative inline-flex items-center gap-2 bg-alert hover:bg-red-600 text-white font-display font-600 px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-alert/30 active:scale-95 text-base"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//                   />
//                 </svg>
//                 Send Emergency SOS
//               </Link>
//               <Link
//                 to="/dashboard"
//                 className="inline-flex items-center gap-2 border border-signal/30 hover:border-signal text-steel-300 hover:text-white font-display font-500 px-8 py-4 rounded-lg transition-all duration-200 hover:bg-signal/10 text-base"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
//                   />
//                 </svg>
//                 View Dashboard
//               </Link>
//             </div>
//           </div>

//           {/* Right: animated mesh diagram */}
//           <div
//             className={`relative transition-all duration-1000 delay-400 ${
//               heroVisible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-10"
//             }`}
//           >
//             <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
//               {/* Outer ring */}
//               <div className="absolute inset-0 rounded-full border border-signal/10" />
//               <div className="absolute inset-8 rounded-full border border-signal/10" />
//               {/* Glow */}
//               <div className="absolute inset-16 rounded-full bg-signal/5 blur-2xl" />
//               {/* Network SVG */}
//               <div className="absolute inset-0 p-8">
//                 <MeshNetwork />
//               </div>
//               {/* Label */}
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-light rounded-full px-4 py-1.5">
//                 <span className="text-xs font-mono text-steel-400">
//                   Live BLE Mesh Simulation
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
//           <span className="text-xs font-mono text-steel-400">scroll</span>
//           <svg
//             className="w-4 h-4 text-steel-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </div>
//       </section>

//       {/* ── STATS ── */}
//       <section className="py-20 border-y border-signal/10 bg-navy-900/40">
//         <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
//           <AnimatedStat value={50} suffix="m" label="Bluetooth range per hop" />
//           <AnimatedStat value={10} suffix="+" label="Device hops supported" />
//           <AnimatedStat value={3600} suffix="s" label="Default message TTL" />
//           <AnimatedStat
//             value={100}
//             suffix="%"
//             label="Internet-free operation"
//           />
//         </div>
//       </section>

//       {/* ── FEATURES ── */}
//       <section className="py-24 relative">
//         <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />
//         <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
//           <div className="text-center mb-16">
//             <span className="font-mono text-xs text-signal-glow tracking-widest uppercase">
//               Core Capabilities
//             </span>
//             <h2 className="font-display font-700 text-4xl md:text-5xl text-white mt-3 mb-4">
//               Built for the{" "}
//               <span className="text-gradient-blue">worst case.</span>
//             </h2>
//             <p className="text-steel-400 max-w-lg mx-auto text-base">
//               Every design decision optimizes for reliability, not convenience.
//               Because when it matters, there's no second chance.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {features.map((f, i) => (
//               <FeatureCard key={i} {...f} delay={i * 80} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── HOW IT WORKS ── */}
//       <section className="py-24 bg-navy-900/50 border-y border-signal/10">
//         <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
//           <div>
//             <span className="font-mono text-xs text-signal-glow tracking-widest uppercase">
//               Protocol
//             </span>
//             <h2 className="font-display font-700 text-4xl md:text-5xl text-white mt-3 mb-6">
//               How the <span className="text-gradient-blue">relay works</span>
//             </h2>
//             <p className="text-steel-400 text-base leading-relaxed mb-10">
//               SOS Relay implements a Delay-Tolerant Network (DTN) using an
//               opportunistic store-and-forward model over BLE. Phones act as
//               autonomous relay nodes — no pairing, no configuration, no
//               coordination required.
//             </p>

//             {/* Packet structure preview */}
//             <div className="glass rounded-xl p-5 font-mono text-xs text-steel-300 glow-border">
//               <div className="text-steel-400 mb-2 text-xs uppercase tracking-wider">
//                 SOS Packet Structure
//               </div>
//               <pre className="leading-6 overflow-x-auto">{`{
//   "message_id": "uuid-v4",
//   "origin_device_id": "device_xyz",
//   "timestamp": "2026-03-18T10:20:00Z",
//   "location": { "lat": 12.97, "lon": 77.59 },
//   "ttl": 3600,
//   "hop_count": 2,
//   "emergency_type": "MANUAL_SOS",
//   "signature": "sha256:...",
//   "payload": "User triggered SOS"
// }`}</pre>
//             </div>
//           </div>

//           <div className="flex flex-col">
//             {steps.map((s, i) => (
//               <StepCard key={i} num={i + 1} {...s} delay={i * 100} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── USE CASES ── */}
//       <section className="py-24">
//         <div className="max-w-7xl mx-auto px-6 lg:px-10">
//           <div className="text-center mb-16">
//             <span className="font-mono text-xs text-signal-glow tracking-widest uppercase">
//               Applications
//             </span>
//             <h2 className="font-display font-700 text-4xl md:text-5xl text-white mt-3">
//               Who needs this?
//             </h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {[
//               { label: "Women's Safety", icon: "🛡️" },
//               { label: "Disaster Zones", icon: "🌪️" },
//               { label: "Remote Trekking", icon: "🏔️" },
//               { label: "Campus Security", icon: "🏫" },
//               { label: "Rural Areas", icon: "🌾" },
//             ].map((u, i) => (
//               <div
//                 key={i}
//                 className="card text-center hover:glow-border transition-all duration-300 stagger-item"
//                 style={{ animationDelay: `${i * 80}ms` }}
//               >
//                 <div className="text-3xl mb-3">{u.icon}</div>
//                 <div className="font-display font-500 text-steel-200 text-sm">
//                   {u.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section className="py-24 border-t border-signal/10">
//         <div className="max-w-3xl mx-auto px-6 text-center">
//           <div className="relative inline-block mb-8">
//             <div className="absolute inset-0 bg-alert/20 blur-3xl rounded-full" />
//             <div className="relative w-20 h-20 rounded-full bg-alert/10 glow-border-alert flex items-center justify-center mx-auto">
//               <svg
//                 className="w-10 h-10 text-alert"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={1.5}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
//                 />
//               </svg>
//             </div>
//           </div>
//           <h2 className="font-display font-800 text-4xl md:text-5xl text-white mb-4">
//             Ready to test the prototype?
//           </h2>
//           <p className="text-steel-400 text-lg mb-10">
//             Simulate an emergency, watch the mesh relay live, and see exactly
//             how your SOS packet travels across nodes.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link
//               to="/sos"
//               className="bg-alert hover:bg-red-600 text-white font-display font-600 px-10 py-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-alert/30 active:scale-95 text-base"
//             >
//               Launch SOS Simulator
//             </Link>
//             <Link
//               to="/dashboard"
//               className="border border-signal/30 hover:border-signal text-steel-300 hover:text-white font-display font-500 px-10 py-4 rounded-lg transition-all duration-200 hover:bg-signal/10 text-base"
//             >
//               Open Dashboard
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-signal/10 py-8">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="font-display font-600 text-base">
//             <span className="text-white">SOS</span>
//             <span className="text-signal">Relay</span>
//           </div>
//           <div className="text-steel-400 text-xs font-mono text-center">
//             Dr. AIT — ISE Dept — Major Project 2026–27
//           </div>
//           <div className="flex items-center gap-2 text-xs font-mono text-steel-400">
//             <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
//             Prototype v0.1.0
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── Animated mesh network SVG ── */
function MeshNetwork() {
  const nodes = [
    { x: 50, y: 50, active: true },
    { x: 20, y: 30, active: true },
    { x: 80, y: 25, active: false },
    { x: 15, y: 70, active: false },
    { x: 85, y: 70, active: true },
    { x: 50, y: 85, active: false },
    { x: 35, y: 15, active: false },
    { x: 65, y: 60, active: true },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [0, 4],
    [0, 7],
    [1, 3],
    [1, 6],
    [2, 4],
    [2, 6],
    [3, 5],
    [4, 5],
    [4, 7],
    [5, 7],
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(37,99,235,0.25)"
          strokeWidth="0.4"
          className="line-pulse"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.active && (
            <>
              <circle
                cx={n.x}
                cy={n.y}
                r="4"
                fill="rgba(37,99,235,0.15)"
                className="sos-ring"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="4"
                fill="rgba(37,99,235,0.08)"
                className="sos-ring-delay"
                style={{ animationDelay: `${i * 0.3 + 0.3}s` }}
              />
            </>
          )}
          <circle
            cx={n.x}
            cy={n.y}
            r="2"
            fill={n.active ? "#2563eb" : "#163470"}
            stroke={n.active ? "#60a5fa" : "#2563eb"}
            strokeWidth="0.5"
            filter="url(#glow)"
          />
        </g>
      ))}

      {/* SOS origin node highlight */}
      <circle
        cx="50"
        cy="50"
        r="3.5"
        fill="#ef4444"
        stroke="#fca5a5"
        strokeWidth="0.5"
        filter="url(#glow)"
      />
      <text
        x="52"
        y="46"
        fontSize="3"
        fill="#fca5a5"
        fontFamily="JetBrains Mono"
      >
        SOS
      </text>
    </svg>
  );
}

/* ── Counter animation ── */
function AnimatedStat({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const duration = 1500;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-800 text-3xl md:text-4xl text-white">
        {count}
        {suffix}
      </div>
      <div className="text-steel-400 text-xs mt-1 font-body">{label}</div>
    </div>
  );
}

/* ── Feature card ── */
function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div
      className="glass glow-border rounded-xl p-4 hover:border-signal/50 transition-all duration-300 group stagger-item"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-8 h-8 rounded-lg bg-signal/10 flex items-center justify-center mb-3 group-hover:bg-signal/20 transition-colors duration-200 flex-shrink-0">
        {icon}
      </div>
      <h3 className="font-display font-600 text-white text-sm mb-1.5">
        {title}
      </h3>
      <p className="text-steel-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

/* ── Step card for How It Works ── */
function StepCard({ num, title, desc, delay }) {
  return (
    <div
      className="relative flex gap-4 stagger-item"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-signal/20 glow-border flex items-center justify-center flex-shrink-0">
          <span className="font-mono font-600 text-signal-glow text-xs">
            {String(num).padStart(2, "0")}
          </span>
        </div>
        {num < 5 && (
          <div className="w-px flex-1 mt-1.5 bg-gradient-to-b from-signal/30 to-transparent" />
        )}
      </div>
      <div className="pb-6">
        <h4 className="font-display font-600 text-white text-sm mb-0.5">
          {title}
        </h4>
        <p className="text-steel-400 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════════════════════ */
export default function Landing() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const features = [
    {
      icon: (
        <svg
          className="w-4 h-4 text-signal-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
      title: "Zero Internet Required",
      desc: "Messages propagate through Bluetooth peer-to-peer hops — no cellular, no Wi-Fi, no infrastructure needed.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-signal-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
      title: "Multi-Hop Relay",
      desc: "SOS packets travel device-to-device. Each phone becomes a relay node extending the signal's reach exponentially.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-signal-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: "Encrypted Packets",
      desc: "Every SOS packet is digitally signed and AES-encrypted. Fake alerts are cryptographically rejected at every hop.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-signal-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "TTL Flood Control",
      desc: "Time-To-Live counters and message-ID caching prevent duplicate flooding. Every hop decrements the counter.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-signal-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      title: "GPS Location Tagging",
      desc: "Packets carry GPS coordinates (when available) so responders know exactly where the distress originated.",
    },
    {
      icon: (
        <svg
          className="w-4 h-4 text-signal-glow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15.75V21h5.25M3 8.25V3h5.25M21 15.75V21h-5.25M21 8.25V3h-5.25M9 12h6M12 9v6"
          />
        </svg>
      ),
      title: "Internet Escalation",
      desc: "Once the message reaches an internet-connected relay, it's instantly pushed to emergency contacts and the central server.",
    },
  ];

  const steps = [
    {
      title: "SOS Triggered",
      desc: "User manually triggers SOS or sensors detect a fall. An encrypted packet is created with ID, timestamp, GPS, and TTL.",
    },
    {
      title: "BLE Broadcast",
      desc: "The device advertises the SOS packet over Bluetooth Low Energy. Nearby phones with the app discover it automatically.",
    },
    {
      title: "Store & Forward",
      desc: "Each receiving device checks its cache. If the message is new, it stores it, increments hop count, and rebroadcasts it.",
    },
    {
      title: "Mesh Propagation",
      desc: "The signal hops through the crowd, creating an opportunistic delay-tolerant network without any central server.",
    },
    {
      title: "Internet Handoff",
      desc: "When the packet reaches a device with connectivity, it's forwarded to the backend — notifying contacts and authorities.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-signal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 glass-light rounded-full px-3 py-1 mb-5 transition-all duration-700 ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
              <span className="text-steel-300 text-xs font-mono tracking-wider uppercase">
                Decentralized Emergency Network
              </span>
            </div>

            <h1
              className={`font-display font-800 text-4xl md:text-5xl xl:text-6xl leading-[1.08] tracking-tight mb-4 transition-all duration-700 delay-100 ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-white">When networks</span>
              <br />
              <span className="text-white">fail,</span>{" "}
              <span className="text-gradient">people</span>
              <br />
              <span className="text-gradient">shouldn't.</span>
            </h1>

            <p
              className={`text-steel-400 text-sm leading-relaxed mb-7 max-w-md transition-all duration-700 delay-200 ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              SOS Relay uses Bluetooth mesh networking to propagate emergency
              signals through nearby devices — no internet, no cellular, no
              infrastructure required.
            </p>

            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                to="/sos"
                className="relative inline-flex items-center gap-2 bg-alert hover:bg-red-600 text-white font-display font-600 px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-alert/30 active:scale-95 text-sm"
              >
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
                Send Emergency SOS
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 border border-signal/30 hover:border-signal text-steel-300 hover:text-white font-display font-500 px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-signal/10 text-sm"
              >
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
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Right: animated mesh diagram */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              heroVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-signal/10" />
              <div className="absolute inset-8 rounded-full border border-signal/10" />
              {/* Glow */}
              <div className="absolute inset-16 rounded-full bg-signal/5 blur-2xl" />
              {/* Network SVG */}
              <div className="absolute inset-0 p-8">
                <MeshNetwork />
              </div>
              {/* Label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-light rounded-full px-4 py-1.5">
                <span className="text-xs font-mono text-steel-400">
                  Live BLE Mesh Simulation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <span className="text-xs font-mono text-steel-400">scroll</span>
          <svg
            className="w-4 h-4 text-steel-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 border-y border-signal/10 bg-navy-900/40">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatedStat value={50} suffix="m" label="Bluetooth range per hop" />
          <AnimatedStat value={10} suffix="+" label="Device hops supported" />
          <AnimatedStat value={3600} suffix="s" label="Default message TTL" />
          <AnimatedStat
            value={100}
            suffix="%"
            label="Internet-free operation"
          />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-14 relative">
        <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-signal-glow tracking-widest uppercase">
              Core Capabilities
            </span>
            <h2 className="font-display font-700 text-3xl md:text-4xl text-white mt-2 mb-2">
              Built for the{" "}
              <span className="text-gradient-blue">worst case.</span>
            </h2>
            <p className="text-steel-400 max-w-lg mx-auto text-sm">
              Every design decision optimizes for reliability, not convenience.
              Because when it matters, there's no second chance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 bg-navy-900/50 border-y border-signal/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="font-mono text-xs text-signal-glow tracking-widest uppercase">
              Protocol
            </span>
            <h2 className="font-display font-700 text-3xl md:text-4xl text-white mt-2 mb-3">
              How the <span className="text-gradient-blue">relay works</span>
            </h2>
            <p className="text-steel-400 text-sm leading-relaxed mb-6">
              SOS Relay implements a Delay-Tolerant Network (DTN) using an
              opportunistic store-and-forward model over BLE. Phones act as
              autonomous relay nodes — no pairing, no configuration, no
              coordination required.
            </p>

            {/* Packet structure preview */}
            <div className="glass rounded-xl p-4 font-mono text-xs text-steel-300 glow-border">
              <div className="text-steel-400 mb-2 text-xs uppercase tracking-wider">
                SOS Packet Structure
              </div>
              <pre className="leading-5 overflow-x-auto">{`{
  "message_id": "uuid-v4",
  "origin_device_id": "device_xyz",
  "timestamp": "2026-03-18T10:20:00Z",
  "location": { "lat": 12.97, "lon": 77.59 },
  "ttl": 3600,
  "hop_count": 2,
  "emergency_type": "MANUAL_SOS",
  "signature": "sha256:...",
  "payload": "User triggered SOS"
}`}</pre>
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((s, i) => (
              <StepCard key={i} num={i + 1} {...s} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-signal-glow tracking-widest uppercase">
              Applications
            </span>
            <h2 className="font-display font-700 text-3xl md:text-4xl text-white mt-2">
              Who needs this?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "Women's Safety", icon: "🛡️" },
              { label: "Disaster Zones", icon: "🌪️" },
              { label: "Remote Trekking", icon: "🏔️" },
              { label: "Campus Security", icon: "🏫" },
              { label: "Rural Areas", icon: "🌾" },
            ].map((u, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 text-center hover:glow-border transition-all duration-300 stagger-item"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-2xl mb-2">{u.icon}</div>
                <div className="font-display font-500 text-steel-200 text-xs">
                  {u.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 border-t border-signal/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="relative inline-block mb-5">
            <div className="absolute inset-0 bg-alert/20 blur-3xl rounded-full" />
            <div className="relative w-14 h-14 rounded-full bg-alert/10 glow-border-alert flex items-center justify-center mx-auto">
              <svg
                className="w-7 h-7 text-alert"
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
            </div>
          </div>
          <h2 className="font-display font-800 text-3xl md:text-4xl text-white mb-3">
            Ready to test the prototype?
          </h2>
          <p className="text-steel-400 text-sm mb-7">
            Simulate an emergency, watch the mesh relay live, and see exactly
            how your SOS packet travels across nodes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/sos"
              className="bg-alert hover:bg-red-600 text-white font-display font-600 px-7 py-2.5 rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-alert/30 active:scale-95 text-sm"
            >
              Launch SOS Simulator
            </Link>
            <Link
              to="/dashboard"
              className="border border-signal/30 hover:border-signal text-steel-300 hover:text-white font-display font-500 px-7 py-2.5 rounded-lg transition-all duration-200 hover:bg-signal/10 text-sm"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-signal/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-display font-600 text-sm">
            <span className="text-white">SOS</span>
            <span className="text-signal">Relay</span>
          </div>
          <div className="text-steel-400 text-xs font-mono text-center">
            Dr. AIT — ISE Dept — Major Project 2026–27
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-steel-400">
            <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
            Prototype v0.1.0
          </div>
        </div>
      </footer>
    </main>
  );
}
