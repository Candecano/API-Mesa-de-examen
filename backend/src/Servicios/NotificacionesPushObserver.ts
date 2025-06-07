//observer
//exporta una instancia 
//informacion que se le pasa a los observadores cuando ocurre un evento
import { NotificadorMesas } from "./NotificadorMesasObserver";

// Informacion que se le pasa a los observadores cuando ocurre un evento
export interface MesaInfo {
  profesor: number;
  materia: string;
  fecha: string;
  modalidad: string;
}

// Sujeto observado  maneja las suscripciones y notificaciones
const NotificacionPushService = new NotificadorMesas();
export default NotificacionPushService;
