// PushSuscripcionObserver.ts
// Observador que representa a un profesor suscripto a notificaciones push

import webpush from "web-push";
import { Observer } from "./IObserver";
import { MesaInfo } from "./NotificacionesPushObserver";

export class PushSuscripcion implements Observer {
  constructor(private subscription: any) {}

  async update(mesa: MesaInfo): Promise<void> {
    const payload = JSON.stringify({
      title: " Nueva mesa asignada",
      body: `Materia: ${mesa.materia}\nFecha: ${mesa.fecha}\nModalidad: ${mesa.modalidad}`
    });

    try {
      console.log(" Enviando notificacion a:", this.subscription?.endpoint || "(sin endpoint)");

      // validar que exista la suscripción antes de enviar
      if (!this.subscription || !this.subscription.endpoint) {
        console.warn("Suscripcion invalida, no se envia notificacion.");
        return;
      }

      //  notificación con web-push
      await webpush.sendNotification(this.subscription, payload);

      console.log(" Notificacion enviada correctamente");
    } catch (error: any) {
      console.error(" Error al enviar la notificacion:", error?.message || error);
    }
  }
}

