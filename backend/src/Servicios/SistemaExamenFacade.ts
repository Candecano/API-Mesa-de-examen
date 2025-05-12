import { NotificacionService } from "./NotificacionService";
import { RespuestaProfesorService } from "./RespuestaProfesorService";
import { MesaInfo } from "./NotificacionesPush";
import { guardarMesa, obtenerMesasPorProfesor } from "./MesaRepository"; // ✅ importamos también obtenerMesasPorProfesor
import pool from "../Configuracion/db";

class SistemaExamen {
  private notificador = new NotificacionService();
  private registro = new RespuestaProfesorService();

  async asignarMesa(mesa: MesaInfo): Promise<void> {
    try {
      // Enviar notificación al docente
      this.notificador.enviarNotificacion(mesa.profesor, mesa);

      // Guardar en la base de datos (MySQL)
      await guardarMesa(
        mesa.profesor,
        mesa.materia,
        mesa.fecha, 
        mesa.modalidad
      );
    } catch (error) {
      console.error("Error en asignarMesa:", error);
    }
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
