// PushSuscripcionObserver.ts
// Observador que representa a un profesor suscripto a notificaciones push

import { Observer } from "./IObserver";
import { MesaInfo } from "./NotificacionesPushObserver";
import WebPushConfig from "../Configuracion/WebPushConfig";

const webpush = WebPushConfig.getInstance().getWebPush();

export class PushSuscripcion implements Observer {
  constructor(private subscription: any) {}

  async update(mesa: MesaInfo): Promise<void> {
    const payload = JSON.stringify({
      title: "🛎️ Nueva mesa asignada",
      body: "Se te ha asignado una nueva mesa de examen.",
    });

    try {
      console.log("Enviando notificacion a:", this.subscription?.endpoint || "(sin endpoint)");

      if (!this.subscription || !this.subscription.endpoint) {
        console.warn("Suscripcion invalida.");
        return;
      }

      await webpush.sendNotification(this.subscription, payload);
      console.log("Notificacion enviada correctamente.");
    } catch (error: any) {
      console.error("Error al enviar la notificacion:", error?.message || error);
    }
  }
}
