
import { INotificacionStrategy } from "./INotificacionStrategy";

export class NotificacionService {
  private estrategia: INotificacionStrategy;

  constructor(estrategia: INotificacionStrategy) {
    this.estrategia = estrategia;
  }

 
  setEstrategia(estrategia: INotificacionStrategy): void {
    this.estrategia = estrategia;
  }

  //  envío a la estrategia configurada
  async enviarNotificacion(titulo: string, payload: any): Promise<void> {
    const idProfesor = payload.profesor || payload.idProfesor;

    if (!idProfesor) {
      console.warn("⚠️ Profesor no especificado en el payload. No se puede enviar la notificación.");
      return;
    }

    const mensaje = `${titulo}: ${JSON.stringify(payload)}`;

    await this.estrategia.enviarNotificacion(idProfesor, mensaje);
  }
}
