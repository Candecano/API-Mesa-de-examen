import pool from "../Configuracion/db";

export async function guardarMesa(
  idProfesor: number,
  materia: string,
  fecha: string,
  modalidad: string
) {
  const [result] = await pool.execute(
    `INSERT INTO mesas_examen (idProfesor, materia, fecha, hora, modalidad)
     VALUES (?, ?, ?, ?, ?)`,
    [idProfesor, materia, fecha, modalidad]
  );

  return result;
}
