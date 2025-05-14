// src/Servicios/AuthService.ts
import jwt from "jsonwebtoken";

const SECRET = "secreto123"; // ponelo en .env después

// usuarios en memoria (simulación)
const usuarios = [
  { email: "profesor@ucp.edu.ar", password: "1234" },
];

export class AuthService {
  login(email: string, password: string): string | null {
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) return null;

    // crear token
    return jwt.sign({ email: usuario.email }, SECRET, { expiresIn: "1h" });
  }

  verificar(token: string): any | null {
    try {
      return jwt.verify(token, SECRET);
    } catch {
      return null;
    }
  }
}
