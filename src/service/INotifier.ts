// src/service/INotifier.ts
export interface INotifier {
    send(to: string, message: string): Promise<void>;
  }
  