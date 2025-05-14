
import { MesaRepository } from "../Servicios/MesaRepository";
import { RespuestaProfesorService } from "../Servicios/RespuestaProfesorService";
import { NotificacionService } from "./NotificacionService";
import { RespuestaProfesorService } from "./RespuestaProfesorService";
import { MesaInfo } from "./NotificacionesPush";
import { guardarMesa } from "./MesaRepository"; 
import pool from "../Configuracion/db";
class SistemaExamen {
  private notificador = new NotificacionService();
  private registro = new RespuestaProfesorService();

  async asignarMesa(mesa: MesaInfo): Promise<void> {
    try {
      // Enviar notificación al docente
      this.notificador.enviarNotificacion(mesa.profesor, mesa);

      // Guarda en la base de datos (MySQL)
      guardarMesa(
         mesa.profesor,
        mesa.materia,
         mesa.fecha,       
        mesa.modalidad);

    } catch (error) {
      console.error("Error en asignarMesa:", error);
    }
  }

  confirmarAistencia(idProfesor: string, idMesa: string): void {
    this.registro.registrar(idProfesor, idMesa, true);
  }

  public rechazarMesa(idMesa: string, profesorId: string): void {
    this.respuestaService.rechazar(idMesa, profesorId);
    this.notificador.enviarNotificacion("Mesa rechazada", { idMesa, profesorId });
  }

  // función para listar mesas desde la BD
  async listarMesas(idProfesor: number) {
    try {
      const mesas = await obtenerMesasPorProfesor(idProfesor);
      return mesas;
    } catch (error) {
      console.error("Error al listar mesas:", error);
      return [];
    }
  }
}

export default new SistemaExamen();

