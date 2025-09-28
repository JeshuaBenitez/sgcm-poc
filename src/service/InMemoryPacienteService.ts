// src/service/InMemoryPacienteService.ts
import type { IPacienteService } from "./IPacienteService";
import type { Paciente, PacienteId } from "../domain/Paciente";

export class InMemoryPacienteService implements IPacienteService {
  private data: Map<PacienteId, Paciente> = new Map();
  private seq: PacienteId = 1;

  async create(p: Paciente): Promise<PacienteId> {
    const id = this.seq++;
    const nuevo = { ...p, id };
    this.data.set(id, nuevo);
    return id;
  }

  async findById(id: PacienteId): Promise<Paciente | null> {
    return this.data.get(id) ?? null;
  }

  async update(id: PacienteId, p: Paciente): Promise<void> {
    if (!this.data.has(id)) throw new Error("Paciente no encontrado");
    this.data.set(id, { ...p, id });
  }

  async remove(id: PacienteId): Promise<void> {
    this.data.delete(id);
  }

  async search(text = ""): Promise<Paciente[]> {
    const q = text.toLowerCase().trim();
    return [...this.data.values()].filter(p =>
      !q ||
      p.nombre.toLowerCase().includes(q) ||
      p.telefono.includes(q)
    );
  }
}
