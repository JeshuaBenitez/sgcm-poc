export interface IAgendaService {
    /**
     * Verifica disponibilidad para una fecha opcionalmente por médico.
     * Retorna true/false (stub de PoC).
     */
    verificarDisponibilidad(fechaISO: string, medicoId?: number): Promise<boolean>;
  }
  