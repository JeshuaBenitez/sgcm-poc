import type { Paciente } from "../domain/Paciente";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  items: Paciente[];
  onEdit: (p: Paciente) => void;
  onDelete: (id: number) => void;
};

export default function PatientTable({ items, onEdit, onDelete }: Props) {
  if (!items.length) {
    return (
      <div className="flex items-center justify-center rounded-2xl border bg-gray-50 py-10">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-700">Sin pacientes aún</div>
          <div className="mt-1 text-sm text-gray-500">Registra el primer paciente para comenzar.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead className="sticky top-px z-10">
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
            <th className="px-3">ID</th>
            <th className="px-3">Nombre</th>
            <th className="px-3">Nacimiento</th>
            <th className="px-3">Teléfono</th>
            <th className="px-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="bg-white shadow-sm transition hover:shadow-md">
              <td className="px-3 py-3 text-gray-500">{p.id}</td>
              <td className="px-3 py-3 font-medium">{p.nombre}</td>
              <td className="px-3 py-3">{p.fechaNacimiento}</td>
              <td className="px-3 py-3">{p.telefono}</td>
              <td className="px-3 py-3">
                <div className="flex gap-2">
                  <button className="rounded-lg border px-2.5 py-1.5 text-sm hover:bg-gray-50"
                          onClick={()=>onEdit(p)} aria-label="Editar">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg border px-2.5 py-1.5 text-sm text-red-700 hover:bg-red-50"
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
