// src/Repositorios/MesaRepository.ts
import pool from "../Configuracion/db";

export class MesaRepository {
  async crearMesa(data: {
    id: number;
    materia: string;
    fecha: string;
    hora: string;
    modalidad: string;
  }): Promise<void> {
    const { id, materia, fecha, hora, modalidad } = data;
    //guarda la mesa en bdatos
    await pool.execute(
      `INSERT INTO mesas_examen (id, materia, fecha, hora, modalidad)
       VALUES (?, ?, ?, ?, ?)`,
      [id, materia, fecha, hora, modalidad]
    );
  }
}
