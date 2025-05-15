//acceso a los datos de la bd
import pool from "../Configuracion/db";

export class MesaRepository {
  async crearMesa(data: {
    id: number;
    Materia: string;
    fecha: string;
    Modalidad: string;
  }): Promise<void> {
    const {  Materia, fecha, Modalidad } = data;
   
    //guarda la mesa en bdatos
    await pool.execute(
      `INSERT INTO mesadeexamen ( Materia, fecha,  Modalidad)
       VALUES (?, ?, ?)`,
      [ Materia, fecha, Modalidad]
    );
  }
}
