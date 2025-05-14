import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = "secreto123"; // o process.env.JWT_SECRET

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ mensaje: "Token no proporcionado" });
    return; 
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    res.status(403).json({ mensaje: "Token invalido" });
    return; 
  }
}
