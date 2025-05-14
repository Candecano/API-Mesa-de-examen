//observer
//exporta una instancia 
import { NotificadorMesas } from "./NotificadorMesasObserver";
export interface MesaInfo {
  //estructura de la mesa
 profesor: number; 
  materia: string;
  fecha: string;
  modalidad: string;
}

//instancia que maneja las suscripciones y notificaciones
const NotificacionPushService = new NotificadorMesas();
export default NotificacionPushService;