import { useEffect, useState } from "react";
import type { Paciente } from "../domain/Paciente";

type Props = {
  value?: Paciente | null;
  onCancel: () => void;
  onSubmit: (p: Paciente) => void;
  errors: string[];
};

export default function PatientForm({ value, onCancel, onSubmit, errors }: Props) {
  const [form, setForm] = useState<Paciente>({ id: undefined, nombre: "", fechaNacimiento: "", telefono: "" });

  useEffect(() => {
    if (value) setForm(value);
    else setForm({ id: undefined, nombre: "", fechaNacimiento: "", telefono: "" });
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulario de paciente">
      {errors.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          <ul className="list-disc pl-5">{errors.map((e,i)=><li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre">
        <input
          className="w-full rounded-xl border px-3 py-2 outline-none focus:border-teal-500"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required minLength={2} maxLength={80}
          pattern="[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+"
          title="Solo letras y espacios"
        />
        </Field>
        <Field label="Fecha de nacimiento">
          <input
            className="w-full rounded-xl border px-3 py-2 outline-none focus:border-teal-500"
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
            max={new Date().toISOString().slice(0,10)}  // 2) no futura
          />
        </Field>
        <Field label="Teléfono">
        <input
          className="w-full rounded-xl border px-3 py-2 outline-none focus:border-teal-500"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          required
          inputMode="numeric"
          pattern="\+52\d{10}"
          maxLength={13}
          placeholder="+521234567890"
          title="Formato: +52 seguido de 10 dígitos"
        />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
          Cancelar
        </button>
        <button type="submit" className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
          {form.id ? "Actualizar" : "Registrar"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }:{ label:string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}
