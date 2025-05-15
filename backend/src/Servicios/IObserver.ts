//patron observer
//metodo update mensaje que se recibiran los suscriptores del obj
//Observer reacciona a eventos y ejecuta la notificacion
import {MesaInfo} from "./NotificacionesPushObserver";
export interface Observer {
    //esperar una notificacion
  update(mesa: MesaInfo): Promise<void>;
}
