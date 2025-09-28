export interface IAdminService {
    /**
     * Devuelve métricas simples del sistema (stub de PoC).
     */
    obtenerEstadisticas(): Promise<{
      pacientesRegistrados: number;
      version: string;
    }>;
  }
  