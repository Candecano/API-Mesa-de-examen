//observer
//exporta una instancia 
import { NotificadorMesas } from "./NotificadorMesas";
export interface MesaInfo {
  //estructura de la mesa
  materia: string;
  fecha: string;
  hora: string;
  modalidad: string;
}

//instancia que maneja las suscripciones y notificaciones
const NotificacionPushService = new NotificadorMesas();
export default NotificacionPushService;