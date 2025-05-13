//observer
//sujeto observado-notifica a los observadores cuando hay una nueva mesa
import { Observer } from "./IObserver";
import { PushSuscripcion } from "./PushSuscripcionObserver";
import { MesaInfo} from "./NotificacionesPushObserver";
export class NotificadorMesas {
//observadores registrados
  private observers: Observer[] = [];
//cuando se suscriben los profesores a la notificaciones
//por cada profe que se suscribe se genera un observador 
  attach(observer: Observer): void {
    this.observers.push(observer);
  }
//quitar observadores
  detach(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
//nuevo evento (mesa de examen)
//notifica a los observadores
  notify(mesa: MesaInfo): void {
    this.observers.forEach((observer) => observer.update(mesa));
  }
//si se suscribe un profe desde el front crea una nueva Pushsuscripcion 
//lo agrega a la lista de suscriptores (observadores)
  agregarSuscripcion(subscription: any): void {
    const suscriptor = new PushSuscripcion(subscription);
    this.attach(suscriptor);
  }
}