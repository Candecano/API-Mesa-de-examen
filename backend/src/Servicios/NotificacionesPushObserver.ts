//observer
//exporta una instancia 
//informacion que se le pasa a los observadores cuando ocurre un evento
import { NotificadorMesas } from "./NotificadorMesasObserver";
export interface MesaInfo {
  //estructura de la mesa
 profesor: number; 
  materia: string;
  fecha: string;
  modalidad: string;
}

//instancia que maneja las suscripciones de los profes y notificaciones
const NotificacionPushService = new NotificadorMesas();
export default NotificacionPushService;