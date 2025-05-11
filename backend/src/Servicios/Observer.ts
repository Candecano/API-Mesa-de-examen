//patron observer
//metodo update mensaje que se recibiran los suscriptores del obj
import {MesaInfo} from "./NotificacionesPush";
export interface Observer {
    //esperar una notificacion
  update(mesa: MesaInfo): Promise<void>;
}
