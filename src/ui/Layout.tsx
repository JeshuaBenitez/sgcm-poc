import type { ReactNode } from "react";
import { Stethoscope, Users } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <LogoHospital />
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-teal-800">
                Hospital Regional — SGCM
              </h1>
              <p className="text-xs text-gray-500">Sistema de Gestión de Clínicas Médicas</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-teal-700">
              <Stethoscope className="h-4 w-4" />
              <span className="text-sm font-medium">Calidad ISO 25010</span>
            </span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-12">
        {/* SIDEBAR */}
        <aside className="md:col-span-3">
          <nav className="sticky top-[68px] space-y-2">
            <Section title="Módulos" />
            <NavItem icon={<Users className="h-4 w-4" />} label="Pacientes" active />
            <NavItem label="Agenda Médica" />
            <NavItem label="Notificaciones" />
            <NavItem label="Administración" />
            <Section title="Cumplimiento" />
            <Card className="space-y-2">
              <Badge>ISO/IEC 25010</Badge>
              <Badge variant="subtle">ISO 9241</Badge>
              <p className="text-xs text-gray-500">
                MVC, bajo acoplamiento e interfaces internas.
              </p>
            </Card>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="md:col-span-9">{children}</main>
      </div>

      <footer className="border-t bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 text-xs text-gray-500">
          © {new Date().getFullYear()} Hospital Regional. PoC académica.
        </div>
      </footer>
    </div>
  );
}

function LogoHospital() {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-600 text-white shadow">
      {/* cruz médica simple */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
      </svg>
    </div>
  );
}

function Section({ title }: { title: string }) {
  return <div className="mb-1 mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</div>;
}

function NavItem({ label, icon, active }: { label: string; icon?: ReactNode; active?: boolean }) {
  return (
    <button
      className={
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition " +
        (active
          ? "bg-teal-600 text-white shadow hover:bg-teal-700"
          : "bg-white text-gray-700 hover:bg-gray-50 border")
      }
      type="button"
    >
      {icon ?? <span className="h-4 w-4 rounded bg-gray-200" />}
      {label}
    </button>
  );
}

/* UI primitives */
export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-2xl border bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}
export function Badge({ children, variant = "solid" }: { children: ReactNode; variant?: "solid" | "subtle" }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs " +
        (variant === "solid"
          ? "bg-teal-100 text-teal-800"
          : "bg-gray-100 text-gray-700")
      }
    >
      {children}
    </span>
  );
}
