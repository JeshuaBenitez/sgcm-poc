import { useEffect, useState } from "react";
import type { Paciente } from "../domain/Paciente";

type Props = { value?: Paciente | null; onCancel: () => void; onSubmit: (p: Paciente) => void; errors: string[] };

export default function PatientForm({ value, onCancel, onSubmit, errors }: Props) {
  const [form, setForm] = useState<Paciente>({ id: undefined, nombre: "", fechaNacimiento: "", telefono: "" });

  useEffect(() => { setForm(value ?? { id: undefined, nombre: "", fechaNacimiento: "", telefono: "" }); }, [value]);
  const change = (e: React.ChangeEvent<HTMLInputElement>) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));
  const submit = (e: React.FormEvent) => { e.preventDefault(); onSubmit(form); };

  return (
    <form onSubmit={submit} className="space-y-5">
      {errors.length > 0 && (
        <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          <ul className="list-disc pl-5">{errors.map((e,i)=><li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Nombre">
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-gray-100 placeholder:text-gray-400 focus:border-indigo-400"
            name="nombre" value={form.nombre} onChange={change}
            required minLength={2} maxLength={80} pattern="[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+" title="Solo letras y espacios" />
        </Field>
        <Field label="Fecha de nacimiento">
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-gray-100 placeholder:text-gray-400 focus:border-indigo-400"
            type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={change}
            required max={new Date().toISOString().slice(0,10)} />
        </Field>
        <Field label="Teléfono">
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-gray-100 placeholder:text-gray-400 focus:border-indigo-400"
            name="telefono" value={form.telefono} onChange={change}
            required inputMode="numeric" pattern="\+52\d{10}" maxLength={13} placeholder="+521234567890" />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-200 hover:bg-white/10">
          Cancelar
        </button>
        <button type="submit" className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-95">
          {form.id ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }:{ label:string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-300">{label}</span>
      {children}
    </label>
  );
}
