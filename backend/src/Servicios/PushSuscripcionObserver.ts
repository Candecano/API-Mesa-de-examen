//observer- profesor suscripto a las notif (observador)
//el profesor acepta recibir las notificaciones
//el notificador de mesas (objeto) le avisa cuando hay un cambio o algo nuevo


import webpush from "web-push";
import { Observer } from "./IObserver";
import { MesaInfo} from "./NotificacionesPushObserver";
export class PushSuscripcion implements Observer {
  //suscripcion del navegador
    constructor(private subscription: any) {}
//cada vez que el sujeto observado llame a su metodo notify se ejecuta este metodo
  async update(mesa: MesaInfo): Promise<void> {
    //mensaje de la notif
    const payload = JSON.stringify({
      title: "Nueva mesa asignada",
      ...mesa,
    });
//envio de la notificacion a la suscripcion 
    try {
      await webpush.sendNotification(this.subscription, payload);
    } catch (error) {
      console.error("Error al enviar notificación:", error);
    }
  }
}