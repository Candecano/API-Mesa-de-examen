import { INotificacionStrategy } from "./INotificacionStrategy";

export class NotificacionService {
  private estrategia: INotificacionStrategy;

  constructor(estrategia: INotificacionStrategy) {
    this.estrategia = estrategia;
  }

  setEstrategia(estrategia: INotificacionStrategy) {
    this.estrategia = estrategia;
  }

  async enviarNotificacion(titulo: string, payload: any): Promise<void> {
    const idProfesor = payload.profesor || payload.profesorId;

    const mensaje = `${titulo}: ${JSON.stringify(payload)}`;

    await this.estrategia.enviarNotificacion(idProfesor, mensaje);
  }
}
