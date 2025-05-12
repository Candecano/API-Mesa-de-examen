import pool from "../Configuracion/db";

// Guardar una nueva mesa de examen
export async function guardarMesa(
  idProfesor: number,
  materia: string,
  fecha: string, 
  modalidad: string
) {
  const [result] = await pool.execute(
    `INSERT INTO mesadeexamen (idProfesor, materia, fecha, modalidad)
     VALUES (?, ?, ?, ?)`,
    [idProfesor, materia, fecha, modalidad]
  );

  return result;
}


export async function obtenerMesasPorProfesor(idProfesor: number) {
  const [rows] = await pool.execute(
    `SELECT * FROM mesadeexamen WHERE idProfesor = ?`,
    [idProfesor]
  );
  return rows;
}