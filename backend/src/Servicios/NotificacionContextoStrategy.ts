
//Contexto: NotificacionContext
//Strategy propone que esta clase no se encargue directamente de "como" notificar
// sino que delegue esa responsabilidad a una "estrategia" intercambiable.
//se puede cambiar de estrategia


import { INotificacionStrategy } from "./INotificacionStrategy";
export class NotificacionContext {
  constructor(private estrategia: INotificacionStrategy) {}

  setStrategy(estrategia: INotificacionStrategy) {
    this.estrategia = estrategia;
  }

  async enviar(idProfesor: number, mensaje: string): Promise<void> {
    await this.estrategia.enviarNotificacion(idProfesor, mensaje);
  }
}