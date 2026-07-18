import { Link, NavLink } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#699f78] text-slate-900">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Top spotlight */}
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />

        {/* Right glow */}
        <div className="absolute -right-32 top-96 h-[500px] w-[500px] rounded-full bg-violet-300/10 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(148 163 184) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(148 163 184) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>
     <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl shadow-sm shadow-slate-200/50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white shadow-sm">
              QA
            </span>
            <div>
              <p className="text-sm font-bold leading-5 text-slate-950">
                Codebase QA
              </p>
              <p className="text-xs text-slate-500">with proof</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              Home
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
