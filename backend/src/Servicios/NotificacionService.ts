import { INotificacionStrategy } from "./INotificacionStrategy";

export class NotificacionService {
  private estrategia: INotificacionStrategy;

  constructor(estrategia: INotificacionStrategy) {
    this.estrategia = estrategia;
  }

  setEstrategia(estrategia: INotificacionStrategy): void {
    this.estrategia = estrategia;
  }

  async enviarNotificacion(titulo: string, payload: any): Promise<void> {
    const idProfesor = payload.profesor || payload.idProfesor;

    if (!idProfesor) {
      console.warn("⚠️ Profesor no especificado en el payload. No se puede enviar la notificación.");
      return;
    }

    // ✅ Enviamos los campos con nombres correctos para el observer
    const mensaje = JSON.stringify({
      title: titulo,
      materia: payload.Materia || "Sin materia",
      fecha: payload.fecha || "Sin fecha",
      modalidad: payload.Modalidad || "Sin modalidad"
    });
    await this.estrategia.enviarNotificacion(idProfesor, mensaje);
  }
}
