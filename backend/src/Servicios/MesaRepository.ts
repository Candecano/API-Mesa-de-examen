
import pool from "../Configuracion/db";
import { NotificacionService } from "./NotificacionService";
import { PushNotificationStrategy } from "./PushStrategyA";

const notificador = new NotificacionService(new PushNotificationStrategy());

export class MesaRepository {
  async crearMesa(data: {
    id?: number; 
    Materia: string;
    fecha: string;
    Modalidad: string;
    idProfesor?: number; 

  }): Promise<void> {
    const {  idProfesor, Materia, fecha, Modalidad } = data;

    await pool.execute(
      `INSERT INTO mesadeexamen (idProfesor,Materia, fecha, Modalidad)
       VALUES (?, ?, ?, ?)`,
      [idProfesor, Materia, fecha, Modalidad]
    );
    
     // Enviar notificación push
    await notificador.enviarNotificacion("Nueva mesa asignada", {
      idProfesor,
      Materia,
      fecha,
      Modalidad,
    });
  }

  async obtenerMesasPorProfesor(idProfesor: number): Promise<any[]> {
    const [rows] = await pool.execute(
      `SELECT * FROM mesadeexamen WHERE idProfesor = ?`,
      [idProfesor]
    );
    return rows as any[];
  }
}


