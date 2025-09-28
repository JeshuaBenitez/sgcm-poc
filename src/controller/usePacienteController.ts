// src/controller/usePacienteController.ts
import { useMemo, useState, useEffect } from "react";
import type { Paciente, PacienteId } from "../domain/Paciente";
import type { IPacienteService } from "./IPacienteService";
import type { INotifier } from "../modules/notifications/INotifier";

// Validaciones simples (autodescriptivas/tolerancia a errores - ISO 9241)
function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;     // 3) solo letras y espacios
const PHONE_RE = /^\+52\d{10}$/;                  // 1) +52 + 10 dígitos

function validate(p: Paciente): string[] {
  const errs: string[] = [];
  const nombre = (p.nombre ?? "").trim();
  const tel = (p.telefono ?? "").trim();
  const fn = (p.fechaNacimiento ?? "").trim();

  // 3) Nombre solo letras/espacios
  if (!nombre || nombre.length < 2 || nombre.length > 80 || !NAME_RE.test(nombre)) {
    errs.push("El nombre debe tener 2–80 caracteres y solo letras y espacios (sin números ni símbolos).");
  }

  // 1) Teléfono MX +52 + 10 dígitos
  if (!PHONE_RE.test(tel)) {
    errs.push("El teléfono debe tener el formato +52########## (10 dígitos después de +52).");
  }

  // 2) Fecha en formato YYYY-MM-DD y no futura
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fn)) {
    errs.push("La fecha de nacimiento debe tener formato YYYY-MM-DD.");
  } else if (fn > todayISO()) {
    errs.push("La fecha de nacimiento no puede ser posterior a hoy.");
  }

  return errs;
}

export function usePacienteController(
  service: IPacienteService,
  notifier: INotifier
) {
  const [items, setItems] = useState<Paciente[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Paciente | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const isEditing = useMemo(() => !!editing?.id, [editing]);

  async function refresh() {
    setItems(await service.search(query));
  }

  async function submit(p: Paciente) {
    const errs = validate(p);
    setErrors(errs);
    if (errs.length) return;

    if (p.id) {
      await service.update(p.id, p);
      await notifier.send(p.telefono, `Tus datos han sido actualizados, ${p.nombre}.`);
    } else {
      const id = await service.create(p);
      await notifier.send(p.telefono, `Bienvenido/a, ${p.nombre}. ID asignado: ${id}`);
    }
    setEditing(null);
    await refresh();
  }

  async function remove(id: PacienteId) {
    await service.remove(id);
    await refresh();
  }

  useEffect(() => { refresh(); }, [query]);

  return {
    items, query, setQuery,
    editing, setEditing, isEditing,
    errors, submit, remove, refresh
  };
}
