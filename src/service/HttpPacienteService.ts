// src/service/HttpPacienteService.ts
import type { IPacienteService } from "./IPacienteService";
import type { Paciente, PacienteId } from "../domain/Paciente";
const API = "http://localhost:3000";

export class HttpPacienteService implements IPacienteService {
  async create(p: Paciente): Promise<PacienteId> {
    const r = await fetch(`${API}/pacientes`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p)
    });
    const j = await r.json(); return j.id;
  }
  async findById(id: PacienteId) {
    const r = await fetch(`${API}/pacientes/${id}`); return r.json();
  }
  async update(id: PacienteId, p: Paciente) {
    await fetch(`${API}/pacientes/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p)
    });
  }
  async remove(id: PacienteId) {
    await fetch(`${API}/pacientes/${id}`, { method: "DELETE" });
  }
  async search(text?: string) {
    const qs = text ? `?query=${encodeURIComponent(text)}` : "";
    const r = await fetch(`${API}/pacientes${qs}`); return r.json();
  }
}
