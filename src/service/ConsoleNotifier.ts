// src/service/ConsoleNotifier.ts
import type { INotifier } from "../modules/notifications/INotifier";

export class ConsoleNotifier implements INotifier {
  async send(to: string, message: string): Promise<void> {
    // PoC reutilizable: podría cambiarse por Email/SMS sin tocar la UI ni Controller
    console.log(`[Notifier] to=${to} :: ${message}`);
  }
}
