// 2. ConcreteStrategies: PushStrategy A
import { INotificacionStrategy } from "./INotificacionStrategy";
import NotificacionPushService, { MesaInfo } from "./NotificacionesPushObserver";

export class PushNotificationStrategy implements INotificacionStrategy {
  async enviarNotificacion(idProfesor: number, mensaje: string): Promise<void> {
    
    const mesa: MesaInfo = {
      profesor: idProfesor,
      materia: "Matematica Discreta",
      fecha: new Date().toISOString(),
      modalidad: "Virtual",
    };

    // Notificacion a todos los suscriptores registrados (con observer)
    NotificacionPushService.notify(mesa);
  }
}
