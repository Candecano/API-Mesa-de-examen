// NotificadorMesas.ts
// Sujeto observado que notifica a suscriptores cuando se crea una nueva mesa

import { Observer } from "./IObserver";
import { PushSuscripcion } from "./PushSuscripcionObserver";
import { MesaInfo } from "./NotificacionesPushObserver";

export class NotificadorMesas {
  private observers: Observer[] = [];

  
  attach(observer: Observer): void {
    this.observers.push(observer);
    console.log("Observador agregado. Total de observadores nuevos:", this.observers.length);
  }


  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
    console.log("Observador eliminado. Total de observadores que quedan:", this.observers.length);
  }

  // Notificar a todos los observadores de una nueva mesa
  notify(mesa: MesaInfo): void {
    if (this.observers.length === 0) {
      console.warn("No hay observadores registrados para notificar.");
      return;
    }

    console.log("Notificando a", this.observers.length, "observadores...");

    this.observers.forEach((observer, index) => {
      console.log(`Notificando observador ${index + 1}`);
      observer.update(mesa);
    });
  }

 
  agregarSuscripcion(subscription: any): void {
    const suscriptor = new PushSuscripcion(subscription);
    this.attach(suscriptor);

    const endpoint = subscription?.endpoint || "(sin endpoint)";
    console.log("Nueva suscripcion agregada:", endpoint);
  }
}
