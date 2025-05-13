import pool from "../Configuracion/db";

export async function guardarMesa(
  id: number,
  materia: string,
  fecha: string,
  modalidad: string
) {
  const [result] = await pool.execute(
    `INSERT INTO mesas_examen (id, materia, fecha, hora, modalidad)
     VALUES (?, ?, ?, ?, ?)`,
    [id, materia, fecha, modalidad]
  );

  return result;
}
