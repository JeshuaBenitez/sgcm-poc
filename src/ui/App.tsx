import { useState } from "react";
import Layout, { Card, Badge } from "./Layout";
import PatientForm from "./PatientForm";
import PatientTable from "./PatientTable";
import type { Paciente } from "../domain/Paciente";
import { usePacienteController } from "../controller/usePacienteController";
// cambia a HttpPacienteService si ya conectaste backend
import { ConsoleNotifier } from "../service/ConsoleNotifier";
import { Plus, Search } from "lucide-react";
import { HttpPacienteService } from "../service/HttpPacienteService";

const service = new HttpPacienteService();
const notifier = new ConsoleNotifier();

export default function App() {
  const {
    items, query, setQuery,
    editing, setEditing, isEditing,
    errors, submit, remove
  } = usePacienteController(service, notifier);

  const [showForm, setShowForm] = useState(false);

  function startCreate() { setEditing(null); setShowForm(true); }
  function startEdit(p: Paciente) { setEditing(p); setShowForm(true); }

  return (
    <Layout>
      {/* KPIs */}
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-xs text-gray-500">Pacientes registrados</div>
          <div className="mt-1 text-2xl font-semibold">{items.length}</div>
          <div className="mt-2 text-xs text-gray-500">Datos en memoria (PoC)</div>
        </Card>
        <Card>
          <div className="text-xs text-gray-500">Cumplimiento</div>
          <div className="mt-1 text-2xl font-semibold">MVC</div>
          <div className="mt-2 space-x-1">
            <Badge>Interfaces</Badge>
            <Badge variant="subtle">Bajo acoplamiento</Badge>
          </div>
        </Card>
        <Card>
          <div className="text-xs text-gray-500">Reusabilidad</div>
          <div className="mt-1 text-2xl font-semibold">Notificador</div>
          <div className="mt-2 text-xs text-gray-500">Strategy-ready (Email/SMS/Push)</div>
        </Card>
      </div>

      {/* Buscador + acción */}
      <Card className="mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              className="w-full rounded-xl border bg-white px-9 py-2 outline-none ring-0 focus:border-teal-500"
              placeholder="Buscar por nombre o teléfono…"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              aria-label="Buscar"
            />
          </div>
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" /> Nuevo paciente
          </button>
        </div>
      </Card>

      {/* Tabla */}
      <Card>
        <PatientTable items={items} onEdit={startEdit} onDelete={remove}/>
      </Card>

      {/* Modal formulario */}
      {showForm && (
        <Modal onClose={()=>setShowForm(false)} title={isEditing ? "Actualizar paciente" : "Registrar paciente"}>
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

/* Modal accesible y elegante */
function Modal({ title, children, onClose }:{ title:string; children: React.ReactNode; onClose: ()=>void }) {
  return (
    <div role="dialog" aria-modal="true"
      className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-teal-800">{title}</h2>
          <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
