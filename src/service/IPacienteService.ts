// src/service/IPacienteService.ts
// src/service/IPacienteService.ts
import type { Paciente, PacienteId } from "../domain/Paciente";

export interface IPacienteService {
  create(p: Paciente): Promise<PacienteId>;
  findById(id: PacienteId): Promise<Paciente | null>;
  update(id: PacienteId, p: Paciente): Promise<void>;
  remove(id: PacienteId): Promise<void>;
  search(text?: string): Promise<Paciente[]>;
}
