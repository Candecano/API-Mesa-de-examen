// PushSuscripcionObserver.ts
// El profesor acepta recibir notificaciones (observador del patrón Observer)

import webpush from "web-push";
import { Observer } from "./IObserver";
import { MesaInfo } from "./NotificacionesPushObserver";

export class PushSuscripcion implements Observer {
  constructor(private subscription: any) {}

  async update(mesa: MesaInfo): Promise<void> {
    const payload = JSON.stringify({
      title: "Nueva mesa asignada",
      body: `Materia: ${mesa.materia}\nFecha: ${mesa.fecha}\nModalidad: ${mesa.modalidad}`
    });

    try {
      await webpush.sendNotification(this.subscription, payload);
    } catch (error) {
      console.error("Error al enviar notificación push:", error);
    }
  }
}
