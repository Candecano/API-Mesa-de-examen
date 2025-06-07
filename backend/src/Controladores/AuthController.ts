import { Request, Response } from "express";
import { AuthService } from "../Servicios/AuthService";

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { usuario, clave } = req.body;

  try {
const userData = await authService.login(usuario, clave) as {
  usuario: string;
  idProfesor: number;
  token: string;
};

    if (!userData) {
      res.status(401).json({ mensaje: "Credenciales invalidas" });
      return;
    }

    //datos para el fornt
    res.json({
      usuario: userData.usuario,
      idProfesor: userData.idProfesor,
      token: userData.token
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
