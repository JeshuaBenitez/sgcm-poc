import type { Paciente } from "../domain/Paciente";
import { Pencil, Trash2 } from "lucide-react";

type Props = { items: Paciente[]; onEdit: (p: Paciente) => void; onDelete: (id: number) => void; };

export default function PatientTable({ items, onEdit, onDelete }: Props) {
  if (!items.length) {
    return (
      <div className="grid place-items-center rounded-xl border border-white/10 bg-white/5 py-12 text-gray-300">
        Sin pacientes registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400">
            <th className="px-4">ID</th>
            <th className="px-4">Nombre</th>
            <th className="px-4">Nacimiento</th>
            <th className="px-4">Teléfono</th>
            <th className="px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="bg-white/5 transition hover:bg-white/10">
              <td className="px-4 py-3 text-gray-300">{p.id}</td>
              <td className="px-4 py-3 font-medium text-white">{p.nombre}</td>
              <td className="px-4 py-3 text-gray-200">{p.fechaNacimiento}</td>
              <td className="px-4 py-3 text-gray-200">{p.telefono}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 hover:bg-white/10"
                          onClick={()=>onEdit(p)} aria-label="Editar">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-sm text-red-200 hover:bg-red-500/20"
                          onClick={()=>p.id && onDelete(p.id)} aria-label="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
