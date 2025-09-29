import { useState } from "react";
import Layout from "./Layout";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";
import type { Paciente } from "../domain/Paciente";
import { usePacienteController } from "../controller/usePacienteController";
import { HttpPacienteService } from "../service/HttpPacienteService"; // o InMemory si aún estás en demo
import { ConsoleNotifier } from "../service/ConsoleNotifier";
import { Plus, Search } from "lucide-react";

const service = new HttpPacienteService();
const notifier = new ConsoleNotifier();

export default function App() {
  const {
    items, query, setQuery,
    editing, setEditing, isEditing,
    errors, submit, remove
  } = usePacienteController(service, notifier);

  const [showForm, setShowForm] = useState(false);

  return (
    <Layout>
      {/* KPIs */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi title="Pacientes" value={items.length.toString()} hint="Registros en BD" />
        <Kpi title="Arquitectura" value="MVC" hint="Capas y contratos" />
        <Kpi title="Reusabilidad" value="Notificador" hint="Strategy-ready" />
      </section>

      {/* Acciones */}
      <section className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            className="w-full rounded-xl border border-white/10 bg-white/5 px-9 py-2 text-gray-100 outline-none ring-0 placeholder:text-gray-400 focus:border-indigo-400"
            placeholder="Buscar por nombre o teléfono…"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
          />
        </div>
        <button
          onClick={()=>{ setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> Nuevo paciente
        </button>
      </section>

      {/* Tabla */}
      <section className="mt-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow">
          <PatientTable
            items={items}
            onEdit={(p: Paciente)=>{ setEditing(p); setShowForm(true); }}
            onDelete={remove}
          />
        </div>
      </section>

      {/* Modal */}
      {showForm && (
        <Modal
          title={isEditing ? "Actualizar paciente" : "Registrar paciente"}
          onClose={()=>setShowForm(false)}
        >
          <PatientForm
            value={editing}
            errors={errors}
            onCancel={()=>setShowForm(false)}
            onSubmit={(p)=>{ submit(p); setShowForm(false); }}
          />
        </Modal>
      )}
    </Layout>
  );
}

function Kpi({ title, value, hint }:{ title:string; value:string; hint:string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
      <div className="text-xs uppercase tracking-wide text-gray-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] text-gray-400">{hint}</div>
    </div>
  );
}

function Modal({ title, children, onClose }:{ title:string; children: React.ReactNode; onClose: ()=>void }) {
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f1730]/90 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-300 hover:bg-white/10" aria-label="Cerrar">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
