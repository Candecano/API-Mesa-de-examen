// ConcreteStrategy: PushNotificationStrategy

import { INotificacionStrategy } from "./INotificacionStrategy";
import NotificacionPushService, { MesaInfo } from "./NotificacionesPushObserver";

export class PushNotificationStrategy implements INotificacionStrategy {
  async enviarNotificacion(idProfesor: number, mensaje: string): Promise<void> {
    //  se trata de reconstruir los datos desde el mensaje JSON si es posible
    let mesa: MesaInfo;

    try {
      const parsed = JSON.parse(mensaje.split(": ")[1]);
      mesa = {
        profesor: idProfesor,
        materia: parsed.materia || "Materia no especificada",
        fecha: parsed.fecha || new Date().toISOString(),
        modalidad: parsed.modalidad || "Sin modalidad",
      };
    } catch {
      mesa = {
        profesor: idProfesor,
        materia: "(Sin materia)",
        fecha: new Date().toISOString(),
        modalidad: "(Sin modalidad)",
      };
    }

    // Notificacion a todos los suscriptores registrados 
    NotificacionPushService.notify(mesa);
  }
}
