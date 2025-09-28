// src/domain/Paciente.ts
export type PacienteId = number;

export interface Paciente {
  id?: PacienteId;                  // undefined en creación
  nombre: string;                   // 2–80 chars
  fechaNacimiento: string;          // ISO yyyy-mm-dd
  telefono: string;                 // patrón local simple
}
