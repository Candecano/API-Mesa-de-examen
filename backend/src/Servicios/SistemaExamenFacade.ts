// src/Servicios/SistemaExamenFacade.ts

import { NotificacionService } from "./NotificacionService";
import { RespuestaProfesorService } from "./RespuestaProfesorService";
import { MesaInfo } from "./NotificacionesPush";

class SistemaExamen {
  private notificador = new NotificacionService();
  private registro = new RespuestaProfesorService();

  asignarMesa(mesa: MesaInfo): void {
    // Enviar notificación al docente
    this.notificador.enviarNotificacion(mesa.profesor, mesa);
  }

  confirmarAistencia(idProfesor: string, idMesa: string): void {
    this.registro.registrar(idProfesor, idMesa, true);
  }

  rechazarAsistencia(idProfesor: string, idMesa: string): void {
    this.registro.registrar(idProfesor, idMesa, false);
  }

  obtenerRespuesta(idProfesor: string, idMesa: string): boolean | undefined {
    return this.registro.obtener(idProfesor, idMesa);
  }
}

export default new SistemaExamen();
