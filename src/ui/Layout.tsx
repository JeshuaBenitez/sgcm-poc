import type { ReactNode } from "react";
import { Building2, ShieldCheck } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1220] text-gray-100">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b1220]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Hospital Regional — SGCM</h1>
              <p className="text-[11px] text-gray-400">Sistema de Gestión de Clínicas Médicas</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[12px] text-indigo-200">
              <ShieldCheck className="h-4 w-4" />
              Calidad ISO 25010 · 9241
            </span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        {children}
      </main>

      <footer className="border-t border-white/10 px-6 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Hospital Regional · PoC académica.
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg">
      <Building2 className="h-5 w-5" />
    </div>
  );
}
