// src/Servicios/NotificacionServiceFacade.ts
 
import webpush from "web-push";

import { subscripciones } from "../subscripciones"; // ruta correcta segun tu estructura
export class NotificacionService {
  async enviarNotificacion(titulo: string, payload: any): Promise<void> {
    const cuerpo = {
      title: titulo,
      body: JSON.stringify(payload),
    };

    for (const sub of subscripciones) {
      try {
        await webpush.sendNotification(sub, JSON.stringify(cuerpo));
      } catch (error) {
        console.error("Error enviando notificación:", error);
      }
    }
  }
}
