import pool from "../Configuracion/db";

export class MesaRepository {
  async crearMesa(data: {
    id?: number; // lo hice opcional
    Materia: string;
    fecha: string;
    Modalidad: string;
    idProfesor?: number; // por si querés incluirlo también
  }): Promise<void> {
    const { Materia, fecha, Modalidad } = data;

    await pool.execute(
      `INSERT INTO mesadeexamen (Materia, fecha, Modalidad)
       VALUES (?, ?, ?)`,
      [Materia, fecha, Modalidad]
    );
  }

  async obtenerMesasPorProfesor(idProfesor: number): Promise<any[]> {
    const [rows] = await pool.execute(
      `SELECT * FROM mesadeexamen WHERE idProfesor = ?`,
      [idProfesor]
    );
    return rows as any[];
  }
}

