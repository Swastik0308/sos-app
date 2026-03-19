import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`relative font-display text-sm font-medium tracking-wide transition-all duration-200 px-1 py-1
        ${active ? "text-white" : "text-steel-400 hover:text-steel-200"}
      `}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-signal rounded-full" />
      )}
    </Link>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Hide on landing if user prefers clean hero
  const isLanding = pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLanding ? "bg-transparent" : "glass border-b border-signal/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9">
              <div className="absolute inset-0 rounded-lg bg-signal/20 group-hover:bg-signal/30 transition-colors duration-200" />
              <svg
                className="w-5 h-5 text-signal-glow relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                />
              </svg>
            </div>
            <span className="font-display font-700 text-lg tracking-tight">
              <span className="text-white">SOS</span>
              <span className="text-signal">Relay</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/sos">Send SOS</NavLink>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-safe">
              <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
              Network Active
            </div>
            <Link
              to="/sos"
              className="bg-alert hover:bg-red-600 text-white text-sm font-display font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-alert/30 active:scale-95"
            >
              Emergency SOS
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-steel-400 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-signal/10 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <Link
            to="/"
            className="text-steel-300 hover:text-white font-display text-sm py-2"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-steel-300 hover:text-white font-display text-sm py-2"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/sos"
            className="text-steel-300 hover:text-white font-display text-sm py-2"
            onClick={() => setOpen(false)}
          >
            Send SOS
          </Link>
          <Link
            to="/sos"
            onClick={() => setOpen(false)}
            className="bg-alert text-white text-sm font-display font-semibold px-5 py-3 rounded-lg text-center"
          >
            Emergency SOS
          </Link>
        </div>
      )}
    </nav>
  );
}
