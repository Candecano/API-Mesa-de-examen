

import { INotificacionStrategy } from "./INotificacionStrategy";
import NotificacionPushService, { MesaInfo } from "./NotificacionesPushObserver";

export class PushNotificationStrategy implements INotificacionStrategy {
  async enviarNotificacion(idProfesor: number, mensaje: string): Promise<void> {
    
    let mesa: MesaInfo;

    try {
      const parsed = JSON.parse(mensaje.split(": ")[1]);
      mesa = {
        profesor: idProfesor,
        Materia: parsed.materia || "Materia no especificada",
        fecha: parsed.fecha || new Date().toISOString(),
        Modalidad: parsed.modalidad || "Sin modalidad",
      };
    } catch {
      mesa = {
        profesor: idProfesor,
        Materia: "(Sin materia)",
        fecha: new Date().toISOString(),
        Modalidad: "(Sin modalidad)",
      };
    }

    // Notificacion a todos los suscriptores registrados 
    NotificacionPushService.notify(mesa);
  }
}