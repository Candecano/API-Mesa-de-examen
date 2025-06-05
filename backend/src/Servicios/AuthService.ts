import jwt from "jsonwebtoken";
import pool from "../Configuracion/db";

const SECRET = "secreto123";

export class AuthService {
  async login(usuario: string, clave: string): Promise<{ idProfesor: number; usuario: string; token: string } | null> {
    const [rows]: any = await pool.query(
      "SELECT idProfesor, usuario FROM profesor WHERE usuario = ? AND clave = ?",
      [usuario, clave]
    );

    if (rows.length === 0) return null;

    const profesor = rows[0];
    const token = jwt.sign({ idProfesor: profesor.idProfesor, usuario: profesor.usuario }, SECRET, { expiresIn: "1h" });

    return {
      idProfesor: profesor.idProfesor,
      usuario: profesor.usuario,
      token
    };
  }

  verificar(token: string): any | null {
    try {
      return jwt.verify(token, SECRET);
    } catch {
      return null;
    }
  }
}
