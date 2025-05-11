import WebPushConfig from "../Configuracion/WebPushConfig";
import { MesaInfo } from "./NotificacionesPush";

export class NotificacionService {
  async enviarNotificacion(profesor: any, mesa: MesaInfo): Promise<void> {
    const mensaje = `Mesa de ${mesa.materia} el ${mesa.fecha}`;
    const webpush = WebPushConfig.getinstance().getWebPush();

    if (profesor.suscripcionPush) {
      await webpush.sendNotification(
        profesor.suscripcionPush,
        JSON.stringify({ title: "Nueva Mesa Asignada", body: mensaje })
      );
    }
  }
}
