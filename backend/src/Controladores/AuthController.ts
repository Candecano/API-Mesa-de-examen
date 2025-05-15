//controladores de inicio de sesion
//autenticaion de los profes
import { Request, Response } from "express";
import { AuthService } from "../Servicios/AuthService";

const authService = new AuthService();

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  const token = authService.login(email, password);

  if (!token) {
    res.status(401).json({ mensaje: "Credenciales invalidas" });
    return;
  }

  res.json({ token });
};
