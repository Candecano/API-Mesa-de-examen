
//Contexto: NotificacionContext

import { INotificacionStrategy } from "./INotificacionStrategy";
export class NotificacionContext {
  constructor(private estrategia: INotificacionStrategy) {}

  setStrategy(estrategia: INotificacionStrategy) {
    this.estrategia = estrategia;
  }

  async enviar(idProfesor: number, mensaje: string): Promise<void> {
    await this.estrategia.enviarNotificacion(idProfesor, mensaje);
  }
}